import React,{ Component } from 'react';
import styles from './HeaderAdmin.module.css';
import { NavLink } from 'react-router-dom';
//import firebase from '../../Firebase';

class HeaderAdmin extends Component { 

  
    render (){

      return (
          <nav className={styles.topnav}>
            <NavLink
              exact
              activeClassName={styles.active}
              className="navbar__link"
              to="/admin"
            >
              Home
            </NavLink>
            <NavLink
              exact
              activeClassName={styles.active}
              className="navbar__link"
              to="/admin/customers"
            >
              Customers
            </NavLink>
          </nav>
      );
      }
  //}
}

export default HeaderAdmin;
