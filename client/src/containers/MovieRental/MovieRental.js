import React, { Component } from 'react';
import styles from './MovieRental.module.css';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Movies from '../../components/Movies/Movies';
import Rent from '../../components/Rent/Rent';
import Modal from '../../components/UI/Modal/Modal';
import firebase from '../../Firebase';
import Aux from '../../hoc/Aux';

class MovieRental extends Component {

    state = {
        
        openModal: false,
        currentItem: {},
        loggedIn: false,
        userData: {},
        orderDone: false
    }

    addUserHandler = (id,name,email_id) => {

        var data = new FormData();
        data.append('id', id);
        data.append('name', name);
        data.append('email_id', email_id);

        axios.post(process.env.REACT_APP_API_DOMAIN+'/v1/users',data)
          .then((resp) => {
            if(resp.data.inserted === 1){

                let newState = {...this.state};
                newState.loggedIn = true;
                newState.userData = {
                  id: id,
                  name: name,
                  email_id: email_id,
                  points: 0
                }
                this.setState(newState);

            }else{

                const data = resp.data.data[0];
                let newState = {...this.state};
                newState.loggedIn = true;
                newState.userData = {
                  id: data.id,
                  name: data.name,
                  email_id: data.email_id,
                  points: data.points
                }
                this.setState(newState);


            }

          })
          .catch((err) => {
            console.log(err);

          });

    }


    loginHandler = () =>{

      const state = this;

      let provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function(result) {
        
        const token = result.credential.accessToken;
        const user = result.user;
        const id = user.uid;
        const name = user.displayName;
        const email_id = user.email;
        state.addUserHandler(id,name,email_id);
        state.setState({loggedIn:true});
        ;
        // ...
      }).catch(function(error) {
          console.log(error);
      });
    }

    logoutHandler = () => {

      console.log("logged out clicked")

        const state = this;
        firebase.auth().signOut().then(function() {

          console.log("Logged Out");

          state.setState(
            {
              loggedIn:false,
              userData:{}
            }
            );
          // Sign-out successful.
        }, function(error) {
          console.log(error);
          // An error happened.
        });
        

    }

    authStateChanged = () => {
        const state = this;

          firebase.auth().onAuthStateChanged(function(user) {
            if(user){
              state.setState({loggedIn:true});
              state.getUserHandler(user.uid);
            
            }else{
              state.setState({loggedIn:false});
              
            }

        });

    }


    componentDidMount(){
        
        this.getMoviesHandler();
        //this.logoutHandler();
        this.authStateChanged();
        this.setState({orderDone: true});
          
      }

      getUserHandler = (id) =>{

          axios.get(process.env.REACT_APP_API_DOMAIN+'/v1/user/'+id)
          .then((resp) => {

              this.setState({userData: resp.data[0]});

          })
          .catch((err) => {
            console.log(err);
          });


      }


      getMoviesHandler = () => {

          axios.get(process.env.REACT_APP_API_DOMAIN+'/v1/movies?rented=0')
          .then((resp) => {
            this.setState({items: resp.data});
          })
          .catch((err) => {
            console.log(err);
          });

      }


      modalClosed = () => {

        let newState = {...this.state};
        newState.openModal = false;
        this.setState(newState);
        this.getUserHandler(this.state.userData.id);

      }

      rentOutHandler = (item)=>{

        let newState = {...this.state};

        if(!newState.loggedIn){

          alert("Please Login")

        }else{
          newState.openModal = true;
          newState.currentItem = item;
          this.setState(newState);
        }

        
      }

      orderDoneHandler = (id) => {

          let newState = {...this.state};

          
          newState.items.data.forEach((item,index, object)=>{
                
                if(item.id === id){
                  object.splice(index, 1);
                }

          });
          newState.items = newState.items;
          newState.orderDone = true;

          this.setState(newState);



      }



    
    render (){

        let moviesList = "";
        let rentList = "";


        if(this.state.items){
           moviesList = <Movies 
                      clicked={this.rentOutHandler.bind(this)}
                      items={this.state.items}
                    />;
        }
                  

        

        if(this.state.openModal ){
          rentList = <Rent 
                        item={this.state.currentItem}
                        closeModalClicked={this.modalClosed}
                        orderDoneClicked={this.orderDoneHandler}
                        userData={this.state.userData}
                      />;   

        }



        return (
            <Aux>
            <Header 
                loggedIn={this.state.loggedIn}
                userData = {this.state.userData}
                logoutClicked={this.logoutHandler}
                loginClicked={this.loginHandler}
             />
            <Modal
                show={this.state.openModal}
                modalClosed={this.modalClosed}
            >
              {rentList}
            </Modal>
              {moviesList}
            </Aux>
           
            

        )

    }

}

export default MovieRental;