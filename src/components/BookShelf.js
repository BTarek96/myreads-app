import React from "react";
import Book from "./Book";

const BookShelf = ({ shelfBooks, shelfName, changeShelf }) => {
  // I used this way to use the same shelfName for both the books current shelf and the shelf's title
  const currShelf = shelfName.charAt(0).toLowerCase() + shelfName.slice(1);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.map((book) => {
            return (
              <li key={book.id}>
                <Book
                  book={book}
                  currentShelf={currShelf.replace(/\s/g, "")}
                  changeShelf={changeShelf}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
