import React from 'react'

const Price = (props) => {
	
	return (
		<td> 
			{props.price} * {props.days} = {props.total_price}
		</td>
	)

}

export default Price
