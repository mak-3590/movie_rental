import React, { Component } from 'react';
import styles from './CustomerOrders.module.css';
import axios from 'axios';
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import CustomerOrders from '../../components/CustomerOrders/CustomerOrders';
import AddMovie from '../../components/AddMovie/AddMovie';
import EditMovie from '../../components/EditMovie/EditMovie';
import Modal from '../../components/UI/Modal/Modal';
import { withRouter } from "react-router";
import Aux from '../../hoc/Aux';

class CustomerOrdersView extends Component {

    state = {

    }

  getMoviesHandler = () => {

        const id = this.props.match.params.id;
        axios.get(process.env.REACT_APP_API_DOMAIN+'/v1/user/'+id+'/orders')
          .then((resp) => {
            console.log(resp.data)
            this.setState({items: resp.data});
          })
          .catch((err) => {
            console.log(err);
          });
  }


  componentDidMount(){
      this.getMoviesHandler();
  }
  s
  render (){

      let moviesList = "";
      
      if(this.state.items){
        moviesList = <CustomerOrders itemsList={this.state.items}/>;
      }

      return (
          <Aux>
          <HeaderAdmin/>
          {moviesList}
          </Aux>
      )

  }

}

export default CustomerOrdersView;