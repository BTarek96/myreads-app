import React, { useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksLibraryAPI from "./BooksAPI";

const SearchPage = ({ books, changeShelf }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    let trimmedQuery = e.target.value.trim();
    setSearchQuery(e.target.value);
    fetchSearchResults(trimmedQuery);
  };

  const fetchSearchResults = (query) => {
    if (!query || query.length === 0) {
      setSearchResults([]);
      return;
    }
    BooksLibraryAPI.search(query).then((res) => {
      if (res.error) {
        setSearchResults([]);
      } else {
        setSearchResults(res);
      }
    });
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.length !== 0 ? (
              searchResults.map((result) => {
                let shelf = "none";
                books.map((book) => {
                  if (book.id !== result.id) {
                    result.shelf = "none";
                  } else {
                    shelf = book.shelf;
                  }
                });
                return (
                  <li key={result.id}>
                    <Book
                      book={result}
                      changeShelf={changeShelf}
                      currentShelf={shelf}
                    />
                  </li>
                );
              })
            ) : (
              <li></li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
