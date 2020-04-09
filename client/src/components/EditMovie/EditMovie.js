import React, { Component } from 'react'
import styles from './EditMovie.module.css';


class EditMovie extends Component {

  state = {
    type: 1,
    error: false,
    errorMsg: ""
  }
  
  editMovieClicked = () => {
      
      if(this.state.name === "" || this.state.name === undefined){

        this.setState({error: true, errorMsg: "Input value must not be empty"});

      }else{

        const name = this.state.name;
        const type = this.state.type;
        const id = this.props.item.id;

        this.props.editMovieClicked(name,type,id);
      }
      
  }

  handleInputChange = (e) =>{
    this.setState({ name: e.target.value });
  }

  handleSelectChange = (e) =>{
    this.setState({ type: e.target.value });
  }


  render (){

    let errorElem = "";

    if(this.state.error){
      errorElem = <div className={styles.ErrorMsg}>* {this.state.errorMsg}</div>
    }

  return (
    
    <div>

    <table id={styles.customers}>
        <tbody>
          <tr>
             <td>Name</td>
            <td>
              <input type="TEXT" placeholder="Enter Movie Name" defaultValue={this.props.item.movie_name} onChange={ this.handleInputChange }/>
              {errorElem}
            </td>
          </tr>
          <tr>
             <td>Type</td>
            <td>
                <select id="movie_type" defaultValue={this.props.item.type} onChange={ this.handleSelectChange }>
                  <option value="1">New Releases</option>
                  <option value="2">Regular Films</option>
                  <option value="3">Old Films</option>
                </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td><button onClick={()=>this.editMovieClicked()}>Update Movie</button></td>
          </tr>
        </tbody>
      </table>
      </div>
  )

}

}

export default EditMovie;
