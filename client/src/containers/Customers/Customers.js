import React, { Component } from 'react';
import styles from './Customers.module.css';
import axios from 'axios';
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import Customers from '../../components/Customer/Customer';
import AddMovie from '../../components/AddMovie/AddMovie';
import EditMovie from '../../components/EditMovie/EditMovie';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux';

class Admin extends Component {

    state = {

    }

  getMoviesHandler = () => {

        axios.get(process.env.REACT_APP_API_DOMAIN+'/v1/users')
          .then((resp) => {
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

      let customers = "";
      
      if(this.state.items){
        customers = <Customers itemsList={this.state.items}/>;
      }

      return (
          <Aux>
          <HeaderAdmin type="customer"/>
          {customers}
          </Aux>
      )

  }

}

export default Admin;