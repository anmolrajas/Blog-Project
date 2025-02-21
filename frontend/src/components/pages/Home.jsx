import React, { useEffect, useState } from 'react';
import blogService from '../../service/blogService'; // Assuming this is your API service

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getBlogs();
        console.log('This is response in frontend all blogs:', response);
        setBlogs(response);
      } catch (error) {
        setError('Failed to fetch blogs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div className='max-w-7xl mx-auto text-center py-10'>LOADING DATA...</div>;
  }

  if (error) {
    return <div className='max-w-7xl mx-auto text-center py-10 text-red-500'>{error}</div>;
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-6'>
      <h1 className='text-3xl font-bold mb-6'>All Blogs</h1>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {blogs?.map((blog) => (
          <div key={blog._id} className="bg-[#f8f9fa] text-gray-800 shadow-md rounded-lg p-6 border border-gray-300">

            {/* Header Section with Title */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-2">
              {blog.title}
            </h2>

            {/* Description Section */}
            <p className="text-gray-600 mb-4">
              <strong className="text-gray-700">Description: </strong>{blog.desc}
            </p>

            {/* Categories Section */}
            <div className="mb-3">
              <strong className="text-gray-500 block mb-1">Categories:</strong>
              <div className="flex flex-wrap gap-2">
                {blog.categories.map((category, index) => {
                  const categoryColors = ["bg-[#d4e6f1]", "bg-[#d1f2eb]", "bg-[#f9e79f]", "bg-[#fadbd8]"];
                  const categoryColor = categoryColors[index % categoryColors.length];
                  return (
                    <span
                      key={index}
                      className={`${categoryColor} text-gray-900 text-xs px-3 py-1 rounded-l-full relative`}
                      style={{
                        clipPath: "polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)"
                      }}
                    >
                      {category}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Tags Section */}
            <div>
              <strong className="text-gray-500 block mb-1">Tags:</strong>
              <div className="flex flex-wrap gap-2">
                {blog.tags[0]?.split(',').map((tag, index) => {
                  const tagColors = ["bg-[#e9ecef]", "bg-[#dee2e6]", "bg-[#ced4da]"];
                  const tagColor = tagColors[index % tagColors.length];
                  return (
                    <span
                      key={index}
                      className={`${tagColor} text-gray-700 text-xs px-3 py-1 rounded-md`}
                    >
                      #{tag.trim()}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;
