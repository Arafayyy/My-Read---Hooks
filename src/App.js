import React , {useState , useEffect} from 'react'
import { Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import SearchBook from './components/search'
import './css/App.css'
import * as BooksAPI from './BooksAPI'
const App = (props) => {
    // const [state, setState] = useState({
    //     myReads: [],
    //     searchedBooks: []
    // });
    const [myReads,setMyReads] = useState([]);
    const [searchedBooks,setSearchedBooks] = useState([])
    //added array of books to the state
     useEffect(()=> {
        BooksAPI.getAll().then(myReads => {
            setMyReads(myReads)
        })
    })
    const emptybooks = () => setSearchedBooks([])

    const searchQuery = (event) => {
        const query = event.target.value
        if (query !== '') { 
          BooksAPI.search(query).then(searchResults => {
            if (!searchResults || searchResults.error) {
              setSearchedBooks(query)
              return
            }
            // sync books by mapping over searchResults, and
            // iterating over this.props.books      
            const adjustedBooks = searchResults.map(searchResult => {
                myReads.forEach(book => {
                if (book.id === searchResult.id) searchResult.shelf = book.shelf
              })
              return searchResult
            })
      
            // finally, setState
            setSearchedBooks(adjustedBooks)
      
          })
        } else {
            setSearchedBooks([])
        }
      }

    const updateShelf = (book, shelf) => {
        
        if (shelf === 'none') {
            const updatedBooks = myReads.filter(currentBook => currentBook.id !== book.id);
        setMyReads(updatedBooks)
        }
        if (book.shelf !== shelf) {
            BooksAPI.update(book, shelf).then(() => {
                // const {myReads} = setMyReads
                // const {searchedBooks} = setSearchedBooks
                // const { myReads, searchedBooks } = state
                const myReadsIds = myReads.map(b => b.id)
                const searchedBooksIds = myReads.map(b => b.id)
                let myNewReads = [] //if book already on shelf: reshelf; otherwise, add to myReads
                let newSearchedBooks = []

                if (myReadsIds.includes(book.id) || searchedBooksIds.includes(book.id)) {
                    myNewReads = myReads.map(b => b.id === book.id ? { ...b, shelf } : b)
                    newSearchedBooks = searchedBooks.map(b => b.id === book.id ? { ...b, shelf } : b)

                } else {
                    book.shelf = shelf
                    myNewReads = [...myReads, book]
                    newSearchedBooks = [...searchedBooks, book]
                }
                setMyReads(myNewReads)
                setSearchedBooks(newSearchedBooks)

            })
        }
    }

        return (
            <div className="app">
                <Route path="/search" exact render={() => (
                    <SearchBook emptybooks={emptybooks} searchQuery={searchQuery} updateShelf={updateShelf} books={searchedBooks} />
                )} />
                <Route path="/" exact render={() => (
                    <HomePage updateShelf={updateShelf} books={myReads} />
                )} />

            </div>
        )
    }

export default App