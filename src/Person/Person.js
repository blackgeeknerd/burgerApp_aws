import React from 'react';
// import Radium from 'radium';


//We need to import our created css so webpack can help add it to our html file
import classes from './Person.module.css';


const person = (props) => {

    return (
        <div className={classes.Person} >
            <p onClick={props.click} >I am {props.name} and i am {props.age} years old </p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
}

export default person;