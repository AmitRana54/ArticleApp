import React, { useEffect, useState } from "react";
import ArticleLayout from "../component/ArticleLayout";
import Loader from "../component/Loader";

function Home() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchApi = async () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - 1); // Subtract one day
      const formattedDate = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
      const API_URL = `https://newsapi.org/v2/everything?q=tesla&from=${formattedDate}&to=${formattedDate}&sortBy=popularity&apiKey=ce024b9699f847119692fddeb2abfbac`;

      try {
        const response = await fetch(API_URL ,{
          method: 'GET',
        headers: {
            'Upgrade': 'https',
            'Connection': 'Upgrade'
        }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setArticles(data?.articles || []);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchApi();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handleSearchResults = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Subtract one day
    const formattedDate = currentDate.toISOString().slice(0, 10); // Format: YYYY-MM-DD
    const API_URL = `https://newsapi.org/v2/everything?q=${search}&from=${formattedDate}&to=${formattedDate}&sortBy=popularity&apiKey=ce024b9699f847119692fddeb2abfbac`;

    try {
      const response = await fetch(API_URL ,{
        method: 'GET',
        headers: {
            'Upgrade': 'h2c',
            'Connection': 'Upgrade'
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setArticles(data?.articles || []);
      setSearch("");
    } catch (error) {
      console.error('Error fetching search results:', error.message);
    }
  };

  if (articles.length < 1) {
    return <Loader />;
  }

  return (
    
    <div className="main h-auto w-auto ">
      <div className="flex justify-end items-center h-20 mb-6 mr-6">
        <form onSubmit={handleSearchResults} className="flex items-center rounded-lg border border-gray-300 overflow-hidden">
          <input
            type="text"
            placeholder="Search for articles..."
            className="px-4 rounded-lg py-2 w-80 focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="submit" className="px-4  py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none">Search</button>
        </form>
      </div>

      <div className="h-auto w-full grid grid-cols-3 p-6 gap-6">
        {currentArticles &&
          currentArticles.map((article, index) => (
            <ArticleLayout
              key={index}
              imageUrl={article?.urlToImage}
              title={article?.title}
              article={article}
              summary={article?.description}
              link={article?.url}
            />
          ))}
      </div>

      <div className="flex justify-center gap-10 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indexOfLastArticle >= articles.length}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      </div>
    
  );
}

export default Home;

