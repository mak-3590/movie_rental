import React,{ Component } from 'react';
import axios from 'axios';
import styles from './Movies.module.css';
import Button from '../UI/Button/Button';
import Aux from '../../hoc/Aux';
//import firebase from '../../Firebase';

class Movies extends Component {
  
  clicked = (item) => {
    this.props.clicked(item);
  }
  


  render (){

      let itemsList = Object.keys(this.props.items.data)
      .map(key => {
        let item = this.props.items.data[key];
      return <tr key={key}>
              <td>{item.movie_name}</td>
              <td>{item.mtype_name}</td>
              <td><Button btnType="Success" clicked={()=>this.clicked(item)}>Rent</Button></td>
             </tr>;
      });


    return (
      
      <Aux>

        <table id={styles.customers}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {itemsList}
        
        </tbody>
      </table>
      </Aux>
    );
  }
}

export default Movies;
