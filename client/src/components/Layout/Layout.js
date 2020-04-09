import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
//import styles from './layout.module.css';

class Layout extends Component {
	
	render(){
		return (

			<Aux>
                <main>
                    {this.props.children}
                </main>
            </Aux>

		)
	}
}

export default Layout