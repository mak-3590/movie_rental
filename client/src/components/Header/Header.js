import React,{ Component } from 'react';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Button from '../UI/Button/Button';
//import firebase from '../../Firebase';

class Header extends Component { 

  
    render (){

      let loginElem = <Button btnType="Login" clicked={this.props.loginClicked}>Login</Button>;
      let nameElem = ""
      
      if(this.props.loggedIn){

        loginElem = <Button btnType="Login" clicked={this.props.logoutClicked}>Logout</Button>;


        if(this.props.userData.name){

          nameElem = <div className={styles.UserName}>{this.props.userData.name}</div>;
        }

      }
      
      return (
          <nav className={styles.topnav}>
            <NavLink
              exact
              activeClassName={styles.active}
              className="navbar__link"
              to="/"
            >
              Home
            </NavLink>
            {loginElem}
            {nameElem}
          </nav>
      );
      }
  //}
}

export default Header;
