import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategoryId, resetFilters } from '../../store/slices/productsSlice';
import styles from '../ProductListPage.module.css';
import { useProductsFilter } from '../../hooks/useProductsFilter';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductCard from '../../components/ProductCard/ProductCard';
import FiltersPanel from '../../components/FiltersPanel/FiltersPanel';

export default function ProductsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { currentCategoryProducts: list, category, status, error } = useSelector(state => state.products);
    
    useEffect(() => {
        if (id) { dispatch(fetchProductsByCategoryId(id)) }
        return () => { dispatch(resetFilters()) }
    }, [id, dispatch]);

    const filteredAndSortedProducts = useProductsFilter(list);

    const breadcrumbPaths = [
        { label: 'Main Page', path: '/' },
        { label: 'Categories', path: '/categories' },
        { label: category?.title, path: `/categories/${id}` },
    ];

    return (
        <div className={styles.products_page}>
            <div className={styles.container}>
                {status === 'succeeded' && category && (
                    <>
                        <Breadcrumbs paths={breadcrumbPaths} />
                        <h1>{category.title}</h1>
                    </>
                )}
                <FiltersPanel />
                {status === 'loading' && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <div className={styles.products_grid}>
                    {status === 'succeeded' && filteredAndSortedProducts.length > 0 ? (
                        filteredAndSortedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        status === 'succeeded' && <p>No products found matching your criteria.</p>
                    )}
                </div>
            </div>
        </div>
    );
}