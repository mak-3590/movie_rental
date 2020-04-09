import React, { Component } from 'react'
import styles from './AddMovie.module.css';


class AddMovie extends Component {

  state = {
    type:1,
    error: false,
    errorMsg: ""
  }
	
	addMovieClicked = () => {
      
      if(this.state.name === "" || this.state.name === undefined){

        this.setState({error: true, errorMsg: "Input value must not be empty"});

      }else{

        this.setState({error: false,errorMsg: ""});

        const name = this.state.name;
        const type = this.state.type;

        this.props.addMovieClicked(name,type);
      }
  }

  handleInputChange = (e) =>{
    this.setState({ name: e.target.value });
  }

  handleSelectChange = (e) =>{
    this.setState({ type: e.target.value });
  }

  inputValidationHandler = (val) =>{

  }


  render (){

    let errorElem = "";

    if(this.state.error){
      errorElem = <div className={styles.ErrorMsg}>* {this.state.errorMsg}</div>
    }

  return (

		<table id={styles.customers}>
        <tbody>
          <tr>
             <td>Name</td>
             <td>
                <input type="TEXT" placeholder="Enter Movie Name" onChange={ this.handleInputChange }/>
                {errorElem}
             </td>

          </tr>
          <tr>
             <td>Type</td>
            <td>
                <select id="movie_type" onChange={ this.handleSelectChange }>
                  <option default value="1">New Releases</option>
                  <option value="2">Regular Films</option>
                  <option value="3">Old Films</option>
                </select>
            </td>
          </tr>
          <tr>
            <td></td>
            <td><button onClick={()=>this.addMovieClicked()}>Add Movie</button></td>
          </tr>
        </tbody>
      </table>
	)

}

}

export default AddMovie;
