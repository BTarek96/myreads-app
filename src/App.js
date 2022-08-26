import "./App.css";
import SearchPage from "./components/SearchPage";
import * as BooksLibraryAPI from "./components/BooksAPI";
import { useState, useEffect } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import NotFound from "./components/NotFound";

function App() {
  const [books, setBooks] = useState([]);

  // to re-render the app everytime it gets new data from the api
  useEffect(() => {
    BooksLibraryAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, [books]);

  // updates the books position in the main page
  const changeShelf = (book, shelf) => {
    BooksLibraryAPI.update(book, shelf);

    BooksLibraryAPI.getAll().then((books) => {
      setBooks(books);
    });
  };

  return (
    <Routes>
      <Route
        exact
        path="/search"
        element={<SearchPage books={books} changeShelf={changeShelf} />}
      />
      <Route
        exact
        path="/"
        element={
          <div className="app">
            <MainPage books={books} changeShelf={changeShelf} />
          </div>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
