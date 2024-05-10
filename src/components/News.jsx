"use client";

import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

const News = () => {
  const [news, setNews] = useState([]);
  const [articleNum, setArticlesNum] = useState(3);
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);

  async function loadNews() {
    setError("");
    setSpinner(true);
    try {
      const response = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch the news!");
      }
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      setError(error.message);
    } finally {
      setSpinner(false);
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2">
      <h4 className="font-bold text-lg px-4">Whats happening...</h4>

      {spinner && <ImSpinner9 className="animate-spin text-blue-300 w-full" />}
      {error ? <p className="text-red-300 text-sm px-4">{error}</p> : ""}

      {news.slice(0, articleNum).map((article) => (
        <div key={article.url}>
          <a href={article.url} target="_blank">
            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
              <div className="space-y-0.5">
                <h6 className="text-sm font-bold">{article.title}</h6>
                <p className="text-xs font-medium text-gray-500">
                  {article.source.name}
                </p>
              </div>
              {/* eslint-disable-next-line */}
              <img src={article.urlToImage} width={70} className="rounded-xl" />
            </div>
          </a>
        </div>
      ))}

      {error ? (
        <button
          onClick={() => loadNews()}
          className="text-red-300 hover:text-red-400 text-sm pl-4 pb-3 flex gap-1 items-center"
        >
          Reload <ImSpinner9 />
        </button>
      ) : (
        <button
          onClick={() => setArticlesNum(articleNum + 3)}
          className="text-blue-300 hover:text-blue-400 text-sm pl-4 pb-3"
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default News;
