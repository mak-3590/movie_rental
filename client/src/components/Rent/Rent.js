import React,{ Component } from 'react';
import axios from 'axios';
import styles from './Rent.module.css';
import Order from '../Order/Order'
import OrderReceipt from '../OrderReceipt/OrderReceipt'
import Button from '../UI/Button/Button'
import Aux from '../../hoc/Aux';
//import firebase from '../../Firebase';

class Rent extends Component {
  
  /*

   state = {
      itemRentDays: 1,
      itemRented: false,
      itemId: 1,
      itemPaymentType:1,
      itemType:1,
      itemFee:40,
      itemFinalPrice:50,
      itemPriceAfterPoints:0,
      totalPoints:65,
      remainingPoints:10,
      itemOrderId:1
  }
  */


  state = {
      
      itemId: this.props.item.id,
      itemType: this.props.item.id,
      itemRentDays: 1,
      itemPaymentType: 1,
      itemRented: false,
      itemFinalPrice: this.props.item.price,
      totalPoints: this.props.userData.points

  }

  orderHandler = () => {

      //let parent = this;

      let newState = {
                      ...this.state
                    };

      if(newState.itemPaymentType === 2){
        newState.totalPoints = newState.remainingPoints;
        newState.remainingPoints = 0;
      }

      if(newState.itemType === 1){
        newState.totalPoints = newState.totalPoints+2;
      }else{
        newState.totalPoints = newState.totalPoints+1;
      }

      this.setState(newState);

      var data = new FormData();
      data.append('user_id', this.props.userData.id);
      data.append('movie_id', this.state.itemId);
      data.append('payment_type', this.state.itemPaymentType);
      data.append('points', newState.totalPoints);

      axios.post(process.env.REACT_APP_API_DOMAIN+'/v1/orders',data)
          .then((resp) => {
            console.log(resp);
            const newState = {
                              ...this.state,
                              itemRented: true,
                              orderId: resp.data.orderId
                           };
            this.props.orderDoneClicked(this.state.itemId);
            this.setState(newState);

          })
          .catch((err) => {
            console.log(err);

          });


  }

  changeDays = (event) => {

    let total_price = this.props.item.price;
    let days = event.target.value;

    if(this.props.item.type === 1){
      
      total_price =  this.props.item.price*event.target.value;

    }else if(this.props.item.type === 2 && days > 3){

      days = days-2;
      total_price = this.props.item.price*days;

    }else if(this.props.item.type === 3 && days > 5){

      days = days-4;
      total_price = this.props.item.price*event.target.value;

    }

    if(this.state.itemPaymentType === 2){

        const {newPrice, points} = this.calculatePrice(total_price);

        
        this.setState(
        {
          itemRentDays: parseInt(days),
          itemFinalPrice: total_price,
          itemPriceAfterPoints: newPrice,
          remainingPoints: points
        }
        );

    }else{

      this.setState(
      {
        itemRentDays: parseInt(days),
        itemFinalPrice: total_price
      }
      );

    }

  }


  calculatePrice = (itemFinalPrice) =>{

      let points = this.state.totalPoints;
      const days = this.state.itemRentDays;
      const price = this.props.item.price;
      let total_price = this.state.itemFinalPrice;

      if(itemFinalPrice){
        total_price = itemFinalPrice;
      }

      const pointsToDays = Math.floor(points/25);
      let maxUsable = days;
      if(days > pointsToDays){
          maxUsable = pointsToDays;
      }
      points = points-(25*maxUsable);

      const newPrice = total_price-(price*maxUsable);

      return {
               newPrice: newPrice,
               points: points

            }
  }


  changePayment = (event) => {

   const {newPrice, points} = this.calculatePrice();

    this.setState(
      {
        itemPaymentType: parseInt(event.target.value),
        itemPriceAfterPoints: newPrice,
        remainingPoints: points
      }
      );
  }


  render (){

    let modalContent = <Order
                            changeDays={this.changeDays.bind(this)}
                            changePayment={this.changePayment.bind(this)}
                            item={this.props.item}
                            days={this.state.itemRentDays}
                            total_price={this.state.itemFinalPrice}
                            paymentType={this.state.itemPaymentType}
                            points={this.state.totalPoints}
                            remainingPoints={this.state.remainingPoints}
                            newPrice={this.state.itemPriceAfterPoints}
                        />

    let button =  <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>

    if(this.state.orderId){

           modalContent = <OrderReceipt
                            days={this.state.itemRentDays}
                            item={this.props.item}
                            orderId={this.state.orderId}
                            price={this.state.itemFinalPrice}
                            paymentType={this.state.itemPaymentType}
                            newPrice={this.state.itemPriceAfterPoints}

                      />


            button = <Button clicked={this.props.closeModalClicked} btnType="Success">DONE</Button>

    }

    

    return (
      
      <Aux>

        {modalContent}

        {button}


      </Aux>
    );
  }
}

export default Rent;
