// import logo from './logo.svg';
import React, { Component } from 'react';
import classes from './App.module.css'; //you can call 'classes' any name u want like 'styles'
// import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';



//Initial component that came with create react app
// function App() {
//   return (
//     <div className="App">
//         <h1>We Share</h1>
//         <h3>Oya Come make We Go! </h3>
//         <button>Switch Name</button>
//         <Person name="Seyi" age="28"/>
//         <Person name="Funmi" age="25" > Hobby: Racing</Person>
//         <Person name="Gbemi" age="23"/>
//     </div>
//   );

//   // return React.createElement('div', {className:'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
// }


//Another way of defining a React component

/**
 * the component below was commented out so 
 *  as not to forget how it was run
 * to uncomment..uncomment from line 25 - 112
 */

// class App extends Component{

//   /** 'state' shd be used only for components used by extending Component imported
//   from react and not available for function components...
//     ** props are set and pass from outside, state is managed from inside a components
//   **/
 
//   state = {
//     persons: [
//       {name:'Tunde', age: 23},
//       {name:'Remi', age: 28},
//       {name:'Mike', age: 45}
//     ]
//   }

//   switchNameHandler = (newName) => {
//     // console.log('Was clicked'); //this works
//     //Dont do THIS: "this.state.persons[0].name = 'OluwaTunde' ";
//     this.setState({persons: [ 
//       {name: newName, age: 23},
//       {name:'Remi', age: 28},
//       {name:'Mike', age: 43}
//       ]
//     })
//   }

//   nameChangeHandler = (event) => {
//     this.setState({ 
//      persons: [ 
//         {name: 'Tunde', age: 23},
//         {name: event.target.value, age: 28},
//         {name:'Mike', age: 43}
//         ]
//     })
//   }

//   //Testing a function handler
//  /**  reduceAgeHandler = () => {
//     this.setState({persons: [ 
//       {name:'Oluwatunde', age: 23},
//       {name:'Remi', age: 28},
//       {name:'Mike', age: 43-10}
//       ]
//     })
//   } */
  
//   render(){

//     /**Using inline css styling
//     1- create a new constant called 'style' remember the name is up to you(line 80-85)
//     2 - create a style property and pass the style const created to it line 92
//     */

//     const style = {
//       backgroundColor: 'white',
//       font: 'inherit',
//       border: '1px solid blue',
//       padding: '8px',
//       cursor: 'pointer'
//     };

//     return (
//       <div className="App">
//           <h1>We Share</h1>
//           <h3>Oya Come make We Go! </h3>
//           <button 
//           style={style}
//           onClick={() => this.switchNameHandler('Seyi Majek')}>Switch Name</button>
//           <Person 
//           name={this.state.persons[0].name} 
//           age={this.state.persons[0].age}/>
//           <Person 
//           name={this.state.persons[1].name} 
//           age={this.state.persons[1].age}
//           click = {this.switchNameHandler.bind(this, 'Imole!!')}
//           changed = {this.nameChangeHandler}> Hobby: Racing
//           </Person>
//           <Person 
//           name={this.state.persons[2].name} 
//           age={this.state.persons[2].age} />

//       </div>
//     );
//   }
// } 

/**
 * The app component below is a continuation of the commented
 * out app component above......
 * the below component continues from the next module(chapt 4 & above)
 */
class App extends Component{
 
  state = {
    persons: [
      {id:'fdfgr', name:'Tunde', age: 23},
      {id: 'gjdhf',name:'Remi', age: 28},
      {id:'dfkjs', name:'Mike', age: 45}
    ],
    showPersons: false
  }

  // switchNameHandler = (newName) => {
  //   this.setState({persons: [ 
  //     {name: newName, age: 23},
  //     {name:'Remi', age: 28},
  //     {name:'Mike', age: 43}
  //     ]
  //   })
  // }

  //handler that deletes a person
  deletePersonHandler = (personIndex) => {
      //Javascript way of getting data from an array or object and storing into a new container/variable
      // const persons = this.state.persons.slice();
      //ESX way of getting data from an array or object and storing into a new container/variable
      const persons = [...this.state.persons];
      persons.splice(personIndex, 1);
      this.setState({persons: persons})
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    //Alternative approach to avoid mutating the state directly
    // const person = Object.assign({},this.state.persons[personIndex])
      
    //to update the person
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  //handler that changes the state of showPersons from either false to true or vice-versa
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }
  
  render(){

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = 
      (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
                click = {() => this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age} 
                key={person.id}
                changed={(event) => this.nameChangeHandler(event, person.id)}/>;
          })}
        </div>
      );
          btnClass = classes.Red;
    }
    //adding style(css) classes to a variable(steps to setting Class Names dynamically)
    //let classes = ['red', 'bold'].join(' '); //this transforms to "red bold"

    //setting css class dynamically base on conditions
    let assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red); //classes = ['red']
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold); //classes = ['red', 'bold']
    }
  

    return (
      
        <div className={classes.App}>
            <h1>We Share</h1>
            <h3 className={assignedClasses.join(' ')}>Oya Come make We Go! </h3>
            <button 
            className = {btnClass}
            onClick={this.togglePersonsHandler}>Toggle Persons</button> 
            {persons}
        </div>
      
    );
  }
} 

export default App;   
