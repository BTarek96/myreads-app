import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";

const MainPage = ({ books, changeShelf }) => {
  // filtering the books into three different categories
  const currentlyReadingShelf = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const wantToReadShelf = books.filter((book) => book.shelf === "wantToRead");
  const readShelf = books.filter((book) => book.shelf === "read");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            shelfBooks={currentlyReadingShelf}
            // to keep one book shelf component just with different titles based on the shelfName property
            shelfName="Currently Reading"
            changeShelf={changeShelf}
          />
          <BookShelf
            shelfBooks={wantToReadShelf}
            shelfName="Want To Read"
            changeShelf={changeShelf}
          />
          <BookShelf
            shelfBooks={readShelf}
            shelfName="Read"
            changeShelf={changeShelf}
          />
        </div>
      </div>
      {/*link to the search page that has a route defined in the App.js fileS*/}
      <Link to="/search" className="open-search"></Link>
    </div>
  );
};

export default MainPage;
