import React from 'react'
import SearchBar from '../SearchBar'
import classes from './navbar.module.css'
import {AiOutlineHeart} from 'react-icons/ai';
import {FiEdit} from 'react-icons/fi'

const Nav = () => {
    return (
        <div className={classes.navContainer}>
            <div className={classes.firstPart}>

            <h3>Logo</h3>
            <SearchBar />
            </div>
            <div className={classes.addPart} >
                <p><FiEdit className={classes.navIcon} /> Add Recipe</p>
                <p><AiOutlineHeart className={classes.navIcon} /> Favourites</p>
            </div>
        </div>
    )
}

export default Nav
