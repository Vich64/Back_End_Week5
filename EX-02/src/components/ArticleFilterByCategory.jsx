import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:3000/articles');
      setArticles(res.data);
    } catch (err) {
      console.error('Error fetching articles:', err);
    }
  };

  const fetchCategories = async () => {
    // Fetch categories from the API
    try {
      const res = await axios.get('http://localhost:3000/category');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select id="categoryFilter">
          <option value="">All Categories</option>
          {/* Options for categories */}
          {categories.map(c => 
              <option key={c.id} value={c.id}>{c.name}</option>
            )}
        </select>

        <button
          onClick={() => {
            // Logic to apply filters
            console.log('Apply clicked'); 
              // Logic to apply filters
              (async ( )=> {
                const params = new URLSearchParams();
                if (selectedCategory) {
                  params.append('categoryId', selectedCategory);
                }
                try {
                  const res = await axios.get(`http://localhost:3000/articles?${params.toString()}`);
                  setArticles(res.data);
                } catch (err) {
                  console.error('Error applying filters:', err);
                }
                
              })();

          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            // Logic to reset filters
            setSelectedCategory('');
            fetchArticles(); // Fetch all articles again
          }}
        >Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}