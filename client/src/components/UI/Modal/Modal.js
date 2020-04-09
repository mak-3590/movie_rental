import React, {Component} from 'react';
import styles from './Modal.module.css';
//import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
	
	/*shouldComponentUpdate(nextProps, nextState){
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	componentWillUpdate(){
		console.log("[Modal] will Update");
	}*/

	render (){

		console.log("modal show",this.props)

		return (

			<div>
				<Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
				<div 
					style={{
						transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: this.props.show ? '1' : '0'
					}}
					className={styles.Modal}>
					{this.props.children}
				</div>
			</div>

		);
	}
	

};

export default Modal