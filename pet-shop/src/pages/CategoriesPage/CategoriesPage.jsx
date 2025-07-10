import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../store/slices/categoriesSlice';
import styles from './CategoriesPage.module.css';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';


export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { list: categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const breadcrumbPaths = [
    { label: 'Main page', path: '/' },
    { label: 'Categories', path: '/categories' }, 
  ];

  return (
    <div className={styles.categories_page}>
      <div className={styles.container}>
        <Breadcrumbs paths={breadcrumbPaths} />
        
        <h1>Categories</h1>
        
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className={styles.categories_grid}>
          {status === 'succeeded' && categories.map(category => (
            <Link to={`/categories/${category.id}`} key={category.id} className={styles.category_card}>
              <img src={`${import.meta.env.VITE_API_BASE_URL}${category.image}`} alt={category.title} />
              <p>{category.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}