import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UpdateArticleForm() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });


  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    const fetchArticle  = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/articles/${id}`);
        setForm(res.data);
      } catch (err) {
        console.error('Error fetching article:', err);
        // alert('Failed to fetch article. Please try again.');
      }
    }
    fetchArticle();
  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try {
      await axios.put(`http://localhost:3000/articles/${id}`, form);
      alert('Article updated successfully!');
    } catch (err) {
      console.error('Error updating article:', err);
      alert('Failed to update article. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
