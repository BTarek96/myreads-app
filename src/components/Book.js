import React from "react";
const Book = ({ book, currentShelf, changeShelf }) => {
  // to check if the book doesn't have an image Link */
  let imgURL = "";
  if (book.imageLinks && book.imageLinks.thumbnail) {
    imgURL = book.imageLinks.thumbnail;
  }

  // to change the current shelf of the book based on the user selection from the drop down list
  const handleChange = (e) => {
    changeShelf(book, e.target.value);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            background: `url(${imgURL})`,
          }}
        />
        <div className="book-shelf-changer">
          <select onChange={handleChange} value={currentShelf || "none"}>
            <option value="nope" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {book.authors && book.authors.join(", ")}
      </div>
    </div>
  );
};

export default Book;
