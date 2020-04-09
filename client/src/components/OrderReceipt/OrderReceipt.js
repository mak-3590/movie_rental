import React from 'react'
import styles from './OrderReceipt.module.css';
import Aux from '../../hoc/Aux';

const OrderReceipt = (props) => {
	
  let paymentType = "Cash";

	if(props.paymentType === 2){
      paymentType = "Points";
  }

  return (
		
		<Aux>
		
    <div>Thanks for Ordering!!</div>

		<div>Your Order Receipt:</div>

		<table id={styles.customers}>
        <tbody>
          <tr>
             <td>Order Id</td>
            <td>{props.orderId}</td>
          </tr>
          <tr>
             <td>Movie Name</td>
            <td>{props.item.movie_name}</td>
          </tr>
          <tr>
             <td>Days</td>
             <td>{props.days}</td>
          </tr>
           <tr>
             <td>Price</td>
             <td>{props.price}</td>
           </tr>
          <tr>
             <td>Payment Type</td>
             <td>{paymentType}</td>
          </tr>
        </tbody>
      </table>
      </Aux>
	)

}

export default OrderReceipt
