import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Headlines.css';

const Headlines = () => {
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=bad86217a3c94531b8417cde183d01f2');
        setHeadlines(response.data.articles);
      } catch (err) {
        setError('Failed to fetch headlines. Please try again later.');
      }
    };

    fetchHeadlines();
  }, []);

  const topHeadlines = headlines.slice(0, 8);

  return (
    <div className="headlines-section">
      <h2>Latest Headlines</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="headlines-container">
          {topHeadlines.map((headline, index) => (
            <a href={headline.url} target="_blank" rel="noopener noreferrer" key={index} className="headline-card">
              {headline.urlToImage && <img src={headline.urlToImage} alt={headline.title} className="headline-image" />}
              <div className="headline-content">
                <h3 className="headline-title">{headline.title}</h3>
                <p className="headline-source">Source: {headline.source.name}</p>
                <p className="headline-date">Published on: {new Date(headline.publishedAt).toLocaleDateString()}</p>
                <p className="headline-description">{headline.description}</p>
              </div>
            </a>
          ))}
          <a href="https://www.bbc.com/news" target="_blank" rel="noopener noreferrer" className="view-more-link">View More</a>
        </div>
      )}
    </div>
  );
};

export default Headlines;
