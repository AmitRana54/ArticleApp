import React, { useState } from "react";

function ArticleLayout({ title, imageUrl, summary, link }) {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div className="article ">
      <div className="article-image md:col-span-6">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-80 h-40 rounded-lg"
        />
      </div>
      <div className="article-content md:col-span-6 flex flex-col justify-between p-4">
        <div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p
            className={`text-gray-700 ${
              isExpand ? "line-clamp-none" : "line-clamp-1"
            }`}
          >
            {summary}
          </p>
          <button
            onClick={() => setIsExpand(!isExpand)}
            className="mt-2 py-1 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            {isExpand ? "Read Less" : "Read More"}
          </button>
        </div>
        <a
          href={link}
          className="mt-2 py-1 px-4 underline bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-center"
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default ArticleLayout;
