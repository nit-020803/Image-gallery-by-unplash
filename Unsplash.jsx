import axios from "axios";
import React, { useState } from "react";
import "../App.css"

const Unsplash = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = (newSearch = false) => {
    if (!search.trim()) return;

    axios
      .get(
        `https://api.unsplash.com/search/photos?page=${page}&per_page=12&query=${search}`,
        {
          headers: {
            Authorization: "Client-ID 1wCpYnM2jGYM5-S-TOLjnOW7ioljXnkfNFSJ-rdA2D0",
          },
        }
      )
      .then((response) => {
        const images = response.data.results;
        setResult((prev) => (newSearch ? images : [...prev, ...images]));
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = () => {
    setPage(1);
    fetchImages(true);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    axios
      .get(
        `https://api.unsplash.com/search/photos?page=${nextPage}&per_page=12&query=${search}`,
        {
          headers: {
            Authorization: "Client-ID 1wCpYnM2jGYM5-S-TOLjnOW7ioljXnkfNFSJ-rdA2D0",
          },
        }
      )
      .then((response) => {
        setResult((prev) => [...prev, ...response.data.results]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-dark mb-4 fw-bold display-5 fst-italic shadow-sm">
        📸 Explore Image Gallery
      </h2>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6 d-flex gap-2">
          <input
            type="text"
            className="form-control shadow-sm"
            placeholder="Type a keyword like nature, cars, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-dark" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="row g-4">
        {result.map((item, index) => (
          <div className="col-md-4 col-sm-6" key={index}>
            <div className="card shadow-sm border-0 h-100">
              <img
                src={item.urls.regular}
                alt={item.alt_description}
                className="card-img-top"
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body">
                <p className="card-text text-muted text-center">
                  {item.alt_description || "Beautiful Image"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {result.length > 0 && (
        <div className="text-center my-4">
          <button className="btn btn-outline-dark" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}

      {result.length === 0 && (
        <p className="text-center mt-5 text-dark">No images found yet. Try searching something!</p>
      )}
    </div>
  );
};

export default Unsplash;
