import React, { Component } from 'react';
import styles from './Admin.module.css';
import axios from 'axios';
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import MoviesAdmin from '../../components/MoviesAdmin/MoviesAdmin';
import AddMovie from '../../components/AddMovie/AddMovie';
import EditMovie from '../../components/EditMovie/EditMovie';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Aux';

class Admin extends Component {

    state = {
        
        openAddModal: false,
        openEditModal: false,

    }

  itemDeleteHandler = (id,key) =>{
    let parent = this;
    let newState = { ...this.state};


    axios.delete(process.env.REACT_APP_API_DOMAIN+'/v1/movie/'+id).then((resp) => {

            // Remove the deleted element from state.

            newState.items.data.forEach((item,index, object)=>{

                if(item.id === id){
                  object.splice(index, 1);
                }

            });
            newState.items = newState.items;
            parent.setState(newState);
          })
          .catch((err) => {
            console.log(err);
          });

  }


  itemEditHandler = (id,key) => {
      let newState = { ...this.state};
      newState.openEditModal = true;
      newState.ctEditItem = newState.items.data[key];
      console.log(newState.ctEditItem)
      this.setState(newState);

  }

  itemAddHandler = (id,key) => {
      let newState = { ...this.state};
      newState.openAddModal = true;
      this.setState(newState);

  }


  editMovieHandler = (name,type,id) => {

    let data = new FormData();
    data.append('name', name);
    data.append('type', type);
    data.append('id', id);

     axios.put(process.env.REACT_APP_API_DOMAIN+'/v1/movie/'+id, data)
          .then((resp) => {
            this.getMoviesHandler();
            this.editModalClosed();
          })
          .catch((err) => {
            console.log(err);
          });

  }

  addMovieHandler = (name, type) => {

      let data = new FormData();
      data.append('name', name);
      data.append('type', type);
      data.append('rented', 0);

      axios.post(process.env.REACT_APP_API_DOMAIN+'/v1/movies',data)
          .then((resp) => {
            this.getMoviesHandler();
            this.modalClosed();
        })
        .catch((err) => {
          console.log(err);
        });

  }

  modalClosed = () => {
          
    let newState = {...this.state};
    newState.openAddModal = false;
    this.setState(newState);

  }

  editModalClosed = () => {
          
    let newState = {...this.state};
    newState.openEditModal = false;
    this.setState(newState);

  }


  getMoviesHandler = () => {

        axios.get(process.env.REACT_APP_API_DOMAIN+'/v1/movies')
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

    
    render (){

        let moviesList = "";
        let addMovie = "";
        let editMovie = "";
        
        if(this.state.items){
          moviesList = <MoviesAdmin
                          itemsList={this.state.items.data}
                          editClicked={this.itemEditHandler.bind(this)}
                          deleteClicked={this.itemDeleteHandler.bind(this)}
                        />;
        }


        if(this.state.openAddModal){
              addMovie = <AddMovie 
                      addMovieClicked={this.addMovieHandler.bind(this)}
                  />
        }

        if(this.state.openEditModal){
                  editMovie = <EditMovie
                                  item = {this.state.ctEditItem} 
                                  editMovieClicked={this.editMovieHandler.bind(this)}
                              />
        }

        return (
            <Aux>
            <HeaderAdmin/>
             <Button btnType="AddMovie" clicked={this.itemAddHandler}> + Add Movie</Button>
             <Modal
                show={this.state.openAddModal}
                modalClosed={this.modalClosed}
              >
              {addMovie}
            </Modal>

            <Modal
                show={this.state.openEditModal}
                modalClosed={this.editModalClosed}

            >
              {editMovie}

            </Modal>
            
            {moviesList}

            </Aux>
        )

    }

}

export default Admin;