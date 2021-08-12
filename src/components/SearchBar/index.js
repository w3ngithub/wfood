import React, {useState} from 'react'
import {FaSearch} from 'react-icons/fa'
import classes from './searchbar.module.css'
import {useDispatch} from 'react-redux'
import {searchedData} from '../../redux/actions/action'

const Search = () => {
    const[searchedValue, setSearchedValue] = useState(null)
    const[s, setS] = useState(null)

    const dispatch = useDispatch()

    async function fetchData(value,e){
        e.preventDefault()
        const response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${value}`)
        const data = await response.json()
        dispatch(searchedData(data.recipes))
    } 

    return (
        <form onSubmit={(e) => fetchData(searchedValue,e)} className={classes.searchContainer}>
            <input type="text" placeholder='Search recipes...' className={classes.input} onChange={(e) => setSearchedValue(e.target.value)} />
            <FaSearch className={classes.searchIcon} onClick={() => fetchData(searchedValue)} />
        </form>
    )
}

export default Search
