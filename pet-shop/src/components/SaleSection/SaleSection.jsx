import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../store/slices/productsSlice'; 
import ProductCard from '../ProductCard/ProductCard';
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './SaleSection.module.css';

export default function SaleSection() {
  const dispatch = useDispatch();
  
  const { allProducts: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [products.length, dispatch]);

  const saleProducts = products
    .filter(product => product.discont_price !== null)
    .slice(0, 4);

  return (
    <section className={styles.sale_section}>
      <SectionHeader 
        title="Sale" 
        buttonText="All sales" 
        linkTo="/sales" 
      />

      
      {status === 'loading' && products.length === 0 && <p>Loading...</p>}

      <div className={styles.products_grid}>
        {saleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}