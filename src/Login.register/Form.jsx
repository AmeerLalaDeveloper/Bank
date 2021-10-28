import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

export default function Form({ user, usersProp, handelLoginCB }) {
	const [ input, setInput ] = useState({ username: '', password: '' });
	const [ message, setMessage ] = useState('');
	const [ users, setUsers ] = useState(usersProp);



	useEffect(
		() => {
			setUsers(usersProp);
		},
		[ usersProp ]
	);


	const handelChange = (e) => {
		const temp = { ...input };
		temp[e.target.name] = e.target.value;
		setInput(temp);
		setMessage('');
	};

	const handelLogIn = () => {
		const temp = users.find(({ userName, password ,email}) => (userName === input.username ||email===input.username) && password === input.password);
		if (temp) {
			handelLoginCB(temp);
			history.push('/');
		} else setMessage('Wrong username/password');
	};
	let history = useHistory();
    if(Object.keys(user).length!==0){
		history.push('/');
		return <React.Fragment/>
	}
	return (
		<div className="login-card-form">
			<h4>AR BANK</h4>
			<div className="login-input">
				<input type="text" name="username" placeholder="username/email" onChange={(e) => handelChange(e)} />
				<input type="password" name="password" placeholder="password" onChange={(e) => handelChange(e)} />
			</div>
			<input className="submit" type="button" value="Login" onClick={handelLogIn} />
			<Link to="/register" className="register">
				register
			</Link>
			<h2>{message}</h2>
		</div>
	);
}
