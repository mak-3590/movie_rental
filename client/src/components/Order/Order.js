import React,{Component} from 'react'
import styles from './Order.module.css';
import Price from '../Price/Price'
import NewPrice from '../NewPrice/NewPrice'
import PaymentType from '../PaymentType/PaymentType'
import Aux from '../../hoc/Aux';

class Order extends Component {

  changeDays = (event) => {
      this.props.changeDays(event);
  }

	
	render(){

    let newPrice = "";
    if(this.props.paymentType === 2 ){
      newPrice =  <NewPrice
                      days={this.props.days}
                      points={this.props.points}
                      remainingPoints={this.props.remainingPoints}
                      newPrice={this.props.newPrice}
                  />
    }

    let paymentRow = "";

    if(this.props.points > 25 && this.props.item.type === 1){

        paymentRow = <PaymentType
                          changePayment={this.props.changePayment}
                      />

    }



    return (
      <Aux>
  		<table id={styles.customers}>
        <tbody>
          <tr>
             <td>Movie Name</td>
            <td>{this.props.item.movie_name}</td>
          </tr>
          <tr>
             <td>Movie Type</td>
            <td>{this.props.item.mtype_name}</td>
          </tr>
          <tr>
             <td>Days</td>
            <td>
              <select id="days" onChange={this.changeDays}>
                  <option default value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>

                </select>
            </td>
          </tr>
           <tr>
             <td>Price</td>
             <Price 
                  price={this.props.item.price}
                  days={this.props.days}
                  type={this.props.item.type}
                  total_price = {this.props.total_price}
              />
           </tr>
           {paymentRow}
           {newPrice}
        </tbody>
      </table>
      </Aux>
  	)
  }

}

export default Order
