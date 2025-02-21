import React, { useState } from 'react';
import blogService from '../../service/blogService'

const Create = () => {
  const [blog, setBlog] = useState({
    title: '',
    desc: '',
    categories: [],
    tags: '',
    created_by: {
      author_name: "Anmol Rajas",
      author_image: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg?t=st=1739900394~exp=1739903994~hmac=e71e748283ac599066d69d3f4d1999df81c2ae9cb358f19ab8a0e41679c365ea&w=740"
    }
  });

  const [categories] = useState(['Technology', 'Lifestyle', 'Education']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setBlog((prevBlog) => ({
      ...prevBlog,
      categories: prevBlog.categories.includes(value)
        ? prevBlog.categories.filter((cat) => cat !== value)
        : [...prevBlog.categories, value],
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Blog Created:', blog);

    setLoading(true);
    setError(null);
    
    try {
      const response = await blogService.addBlog(blog);
      console.log('Blog Created Successfully:', response);
      alert('Blog Created Successfully!');
      
      // Reset form after successful submission
      setBlog({
        title: '',
        desc: '',
        categories: [],
        tags: '',
        created_by: blog.created_by
      });
    } catch (error) {
      setError('Failed to create blog. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto my-auto p-4 mt-10 bg-white shadow-md rounded-md'>
      <h2 className='text-3xl font-bold mb-4'>Create Blog</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type='text'
          name='title'
          value={blog.title}
          onChange={handleChange}
          placeholder='Blog Title'
          className='w-full p-2 border rounded'
        />
        <textarea
          name='desc'
          value={blog.desc}
          onChange={handleChange}
          placeholder='Blog Description'
          className='w-full p-2 border rounded'
          rows={8}
        />
        <div className='space-y-2'>
          <label className='block font-medium'>Select Categories:</label>
          {categories.map((category, index) => (
            <div key={index} className='flex items-center'>
              <input
                type='checkbox'
                value={category}
                checked={blog.categories.includes(category)}
                onChange={handleCategoryChange}
                className='mr-2'
              />
              <span>{category}</span>
            </div>
          ))}
        </div>
        <input
          type='text'
          name='tags'
          value={blog.tags}
          onChange={handleChange}
          placeholder='Tags (comma-separated)'
          className='w-full p-2 border rounded'
        />
        <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded' disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default Create;
