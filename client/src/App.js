import React,{ Component } from 'react';
import Layout from './components/Layout/Layout'
import { Route, Switch } from 'react-router-dom';
import MovieRental from './containers/MovieRental/MovieRental'
import Admin from './containers/Admin/Admin'
import Customers from './containers/Customers/Customers'
import CustomerOrders from './containers/CustomerOrders/CustomerOrders'
import './App.css';

class App extends Component {
  
  render(){
      return (
        <div>
        <Layout>
          <Switch>
            <Route path="/admin/customers/:id/orders" component={CustomerOrders} />
            <Route path="/admin/customers" component={Customers} />
            <Route path="/admin" component={Admin} />
	          <Route path="/" component={MovieRental} />
          </Switch>
        </Layout>
        </div>
    );  
  }

  
}

export default App;
