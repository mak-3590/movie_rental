import React,{ Component } from 'react';
import axios from 'axios';
import styles from './MoviesAdmin.module.css';
import Button from '../UI/Button/Button';
//import firebase from '../../Firebase';

class MoviesAdmin extends Component {
  

  deleteClicked = (item,key) => {
      this.props.deleteClicked(item,key);
  }

  editClicked = (item,key) => {
      this.props.editClicked(item,key);
  }

  render (){

    let items = <tr></tr>;
    if(this.props.itemsList){

      items = Object.keys(this.props.itemsList)
      .map(key => {

        let item = this.props.itemsList[key];

        let availability = "Available";

        if(item.rented === 1){
          availability = "Rented";
        }

        return <tr key={key}>
                <td>{item.movie_name}</td>
                <td>{item.mtype_name}</td>
                <td>{availability}</td>
                <td>
                  <Button btnType="Danger" clicked={()=>this.props.deleteClicked(item.id,key)}>Delete</Button>

                  <Button btnType="Success" clicked={()=>this.props.editClicked(item,key)}>Edit</Button>
                </td>
               </tr>;
        });
    }

    return (

      <div>
         
        <table id={styles.customers}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Availability</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
      </div>

    );
  }
}

export default MoviesAdmin;
