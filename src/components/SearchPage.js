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
      searchResults.map((book) => {
        const bookOnShelf = books.find((b) => b.id === book.id);
        if (bookOnShelf) {
          book.shelf = bookOnShelf.shelf;
        }
        return book;
      });
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
              searchResults.map((book) => {
                return (
                  <li key={book.id}>
                    <Book book={book} changeShelf={changeShelf} />
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
