import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// const BASE_URL = 'http://localhost:3000'; 
export default function ArticleList() {
const [articles, setArticles] = useState([]);
const navigate = useNavigate();
  // Fetch all articles when component mounts
  useEffect(() => {
    axios.get('http://localhost:3000/articles')
      .then (res => setArticles(res.data))
      .catch (err => console.error('Error fetching articles:', err));
    // fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    try {
      const res = await axios.get('http://localhost:3000/articles');
      setArticles(res.data);
    } catch (err) {
      console.error('Error fetching articles:', err)
    }
  };

  const deleteArticle = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/articles/${id}`);
    // Refresh the article list after deletion
    fetchArticles();
  } catch (err) {
    console.error('Error deleting article:', err);
  }
}; 

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>📄 View Articles</Link>
        <Link to="/add"> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => navigate(`/update/${article.id}`)}>Update</button>
            <button onClick={() => navigate(`/articles/${article.id}`)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}