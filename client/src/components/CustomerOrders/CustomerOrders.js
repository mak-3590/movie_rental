import React,{ Component } from 'react';
import axios from 'axios';
import styles from './CustomerOrders.module.css';
//import firebase from '../../Firebase';

class CustomerOrders extends Component {
  

  render (){

    let items = <tr></tr>;
    if(this.props.itemsList){

      items = Object.keys(this.props.itemsList)
      .map(key => {

        console.log(key)

        let item = this.props.itemsList[key];

        return <tr key={key}>
                <td>{item.order_id}</td>
                <td>{item.uname}</td>
                <td>{item.email_id}</td>
                <td>{item.name}</td>
                <td>{item.payment_name}</td>
                <td>{item.movie_type}</td>

               </tr>;
        });
    }

    return (

      <div>
         
        <table id={styles.customers}>
        <thead>
          <tr>
              <th>Order Id</th>
              <th>Name</th>
              <th>Email Id</th>
              <th>Movie Name</th>
              <th>Payment Type</th>
              <th>Movie Type</th>
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

export default CustomerOrders;
