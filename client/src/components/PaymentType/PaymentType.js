import React,{Component} from 'react'

class PaymentType extends Component {
	
	changePayment = (event) => {
	      this.props.changePayment(event);
	}

  render(){

		return (

			<tr>
	             <td>Payment Type</td>
	            <td>
	                <select id="payment_type" onChange={this.changePayment}>
	                  <option default value="1">Cash</option>
	                  <option value="2">Points</option>
	                </select>
	            </td>
	          </tr>
		)
	}

}

export default PaymentType