import React from 'react'

const NewPrice = (props) => {
	
	return (

		<tr> 
			<td>New Price</td>
			<td>You have {props.points} points in total. Your new price is {props.newPrice}. Remaining points: {props.remainingPoints} </td>
		</tr>
	)

}

export default NewPrice