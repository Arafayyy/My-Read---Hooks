import React , {useEffect}  from 'react'
import { Link } from 'react-router-dom'
import DebounceInput from 'react-debounce-input'
import BookShelf from './BookShelf'

const SearchBook = prop => {
    useEffect(() => {
       prop.emptybooks()
    },[])
        //console.log(this.state.returnedBooks)
        return( <div className="search-books">
            <div className="search-books-bar">


                <Link
                    className="close-search"
                    to="/">
                    Close
                    </Link>
                <div className="search-books-input-wrapper">
                    <DebounceInput
                        debounceTimeout={325}
                        element="input"
                        type="text"
                        value={prop.books.string}
                        onChange={prop.searchQuery}
                        placeholder="Search by title or author"
                    />

                </div>
            </div>
            <div className="search-books-results">
                <BookShelf updateShelf={prop.updateShelf} shelf="Search Results" books={prop.books} />
            </div>
        </div>
        )};

export default SearchBook;