import React, { useState} from 'react';
import { postTransaction, updateUser } from '../api/api';
import { useHistory } from 'react-router-dom';
import "./style.css"
export default function Admin({ loggedUser, users }) {
	const [ input, setInput ] = useState({
		first: '',
		second: '',
		number:0
	});
	const[message,setMessage]=useState("")

	const select1 = (e) => {
		const temp = { ...input };
		temp['first'] = e;
		setInput(temp);
	};
	const select2 = (e) => {
		const temp = { ...input };
		temp['second'] = e;
		setInput(temp);
	};
	const select3 = (e) => {
		const temp = { ...input };
		temp['number'] = e;
		setInput(temp);
	};
	const createTransaction = (get, price, reason, name, id) => {
		return {
			cash: parseInt(price), 
			get: get,
			secondUserName:name,
			date: new Date(),
			transReason: reason,
			userId: id
		};
	};
	let history=useHistory();
	const handelSubmit=async ()=>{
		console.log(typeof(parseInt(input.number)));

		if(input.first===input.second||parseInt(input.number)<=0||!input.first||!input.second){
			setMessage("invaled request")
			setTimeout(() => {
				setMessage("")
			}, 2000);
			return
		}
		console.log(typeof(parseInt(input.number)));
		setMessage(123);
		let [user1]=users.filter(u=>input['first']===u.id)
		let [user2]=users.filter(u=>u.id===input['second'])
		await updateUser(user1.id,{balance:user1.balance-input["number"]})
		await updateUser(user2.id,{balance:user2.balance+input["number"]})
		let transFrom=createTransaction(false,parseInt(input.number),"Admin",user2.name,user1.id)//id of user1
		let transTo=createTransaction(true,parseInt(input.number),"Admin",user1.name,user2.id)
		await postTransaction(user1.id,transFrom);
		await postTransaction(user2.id,transTo);
		history.push("/")
	
	}

	return (
		<div className="final">
			{console.log(input)}
			<div className="container-trans">
				<h2>Welcome {loggedUser.name}</h2>
				<h4>from:</h4><select name="2" id="2" onClick={(e) => select1(e.target.value)}>
					{users.map((loggedUser) => {
						return (
							<option key={loggedUser.id} value={loggedUser.id}>
								{loggedUser.name}
							</option>
						);
					})}
				</select>
				<h4>to:</h4> <select name="2" id="2" onClick={(e) => select2(e.target.value)}>
					{users.map((loggedUser) => {
						return (
							<option key={loggedUser.id} value={loggedUser.id}>
								{loggedUser.name}
							</option>
						);
					})}
				</select>
                <input type="number" value={input["number"]} placeholder="price" onChange={(e)=>select3(e.target.value)}/>
                <input type="submit" value="Done" onClick={()=>handelSubmit()}/>
				<h3>{message===123?<div className="loader"/>:message}</h3>
			</div>
		</div>
	);
}
