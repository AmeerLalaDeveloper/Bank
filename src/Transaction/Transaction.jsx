import React, {  useState } from 'react';
import './transaction.css';
import Contacts from './Contacts';
import Input from './Input';
import { postTransaction, getSingleUser, updateUser } from '../api/api';
import { useHistory } from 'react-router-dom';

export default function Transaction({ returnedUser, user, users }) {
	const [ selectValue, setSelectValue ] = useState(users[0]?users[0].id:"");
    const [clicked,setClicked]=useState(false);
    const [message,setMessage]=useState("")

	let history = useHistory();
	const validateInput = (value) => !/\D/.test(value);

	const createTransaction = (get, price, reason, name, id = user.id) => {
		return {
			cash: parseInt(price) - 10, //10 to the admin
			get: get,
			secondUserName: get ? user.name : name,
			date: new Date(),
			transReason: reason,
			userId: id
		};
	};
	
	const onFormSubmit = async ({ price, reason }) => {
        if(clicked){
            setMessage("please wait")
            return
        }
		price = parseInt(price);
		if (!validateInput(price)|| !price||!reason ||
			user.creditFrame - user.frameSpent < price ||
			user.balance - price < user.accountFrame * -1
		) {
            setMessage("invalid transaction")
            setTimeout(() => {
                setMessage("")
            }, 2000);
			return;
		}
        setClicked(true);
        setMessage("Loading...")
		let temp = await updateUser(user.id, {
			balance: user.balance - price,
			frameSpent: user.frameSpent + price
		});

		sessionStorage.setItem('user', JSON.stringify(temp.data));
		returnedUser(temp.data);
		const user2 = (await getSingleUser(selectValue)).data;
		const admin=users.filter(val=>val.admin)[0]
		await updateUser(admin.id,{balance:admin.balance+10}).data;
		let transaction1 = createTransaction(false, price, reason, user2.name);
		let transaction2 = createTransaction(true, price, reason, user2.name, user2.id);
		let adminTransAction=createTransaction(true,20,"tax",user.name,admin.id)
		await postTransaction(user.id, transaction1);
		await postTransaction(selectValue, transaction2);
		await postTransaction(admin.id, adminTransAction);
        history.push('/');
	};

	if (Object.keys(user).length === 0) {
		history.push('/login');
		return <React.Fragment />;
	}
	return (
		<div className="container-trans">
			<h2>Welcome {user.name}</h2>
			<Contacts name={user.name} users={users} onSelect={setSelectValue} />
			<Input rawi={onFormSubmit} />
            <h3>{clicked?<div className="loader"></div>:message}</h3>
		</div>
	);
}
