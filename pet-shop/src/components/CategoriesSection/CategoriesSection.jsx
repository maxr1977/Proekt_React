import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../store/slices/categoriesSlice'; 
import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './CategoriesSection.module.css';


export default function CategoriesSection() {
  const dispatch = useDispatch();
  
    const { list: categories, status, error } = useSelector((state) => state.categories);

  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  
  
  const displayedCategories = categories.slice(0, 4);

  return (
    <section className={styles.categories_section}>
      <SectionHeader 
        title="Categories" 
        buttonText="All categories" 
        linkTo="/categories" 
      />

      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className={styles.categories_grid}>
        {status === 'succeeded' && displayedCategories.map(category => (
          <Link to={`/categories/${category.id}`} key={category.id} className={styles.category_card}>
            <img src={`${import.meta.env.VITE_API_BASE_URL}${category.image}`} alt={category.title} />
            <p>{category.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}