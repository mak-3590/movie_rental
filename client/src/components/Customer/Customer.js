import React,{ Component } from 'react';
import axios from 'axios';
import styles from './Customer.module.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
//import firebase from '../../Firebase';

class Customer extends Component {
  

  render (){

    let items = <tr></tr>;
    if(this.props.itemsList){

      items = Object.keys(this.props.itemsList)
      .map(key => {

        console.log(key)

        let item = this.props.itemsList[key];

        return <tr key={key}>
                <td><Link to={`/admin/customers/${item.id}/orders`}>{item.name}</Link></td>
                <td>{item.email_id}</td>
                <td>{item.points}</td>
               </tr>;
        });
    }

    return (
         
        <table id={styles.customers}>
        <thead>
          <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>

    );
  }
}

export default Customer;
