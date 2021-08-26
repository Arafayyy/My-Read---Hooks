import React from 'react'
import { Link } from 'react-router-dom'
//import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'
//import SearchBook from './search'

const HomePage = props => {
        return( <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf updateShelf={props.updateShelf} shelf="Currently Reading" books={props.books.filter(book => book.shelf === 'currentlyReading')} />,
                <BookShelf updateShelf={props.updateShelf} shelf="Want to Read" books={props.books.filter(book => book.shelf === 'wantToRead')} />,
                <BookShelf updateShelf={props.updateShelf} shelf="Read" books={props.books.filter(book => book.shelf === 'read')} />

            </div>


            <div className="open-search">
                <Link
                    to="/search">
                    Add a book
                </Link>
            </div>
        </div>
        )}


export default HomePage;