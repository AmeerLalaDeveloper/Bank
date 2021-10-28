import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { postUsers,getLocation } from '../api/api';

export default function RegisterForm({usersProp,handelRegisterCB}) {
    const [users,setUsers]=useState(usersProp);
    const [ message, setMessage ] = useState('');
    const[input,setInput]=useState({
        name:"",
        userName:"",
        email:"",
        password:"",
    })
    let history = useHistory();
    
	useEffect(() => {
        setUsers(usersProp);
    },[ usersProp ]);

	const handelChange = (e) => {
		const temp = { ...input };
		temp[e.target.name] = e.target.value;
		setInput(temp);
        setMessage("")
	};

    const returnObj=(city)=>{
        return ({
            name: input.name,
            userName:input.userName,
            email:input.email,
            password: input.password,
            city:city,
            isActive: true,
            creditFrame: 0,
            frameSpent: 0,
            admin:false
        })
    }
    //
    //
    const handelRegister= async ()=>{
        if(!input.userName||!input.password||!input.password||!input.name){
            setMessage("Please fill in all the fields")
            return 
        }
        if(/[\s]/g.test(input.userName)){
            setMessage("Username cant contain space")
            return 
        }
        if(!/\S+@\S+\.\S+/g.test(input.email)){
            setMessage("In valid email")
            return
        }
        if((!users.some(({userName,email})=>userName.toLowerCase()===input.userName.toLowerCase()||email.toLowerCase()===input.email.toLowerCase()))){
            if(input.password.length>=8&&/[A-Z]/g.test(input.password)&&/[a-z]/g.test(input.password)){
                const success=async (data)=>{
                    const city=(await getLocation(data.coords.latitude,data.coords.longitude)).data.city;
                    const temp=returnObj(city);
                    postUsers(temp);
                    handelRegisterCB(temp)
                    history.push('/');
                }
                const fail=async()=>{
                    const temp=returnObj("");
                    postUsers(temp);
                    handelRegisterCB(temp);
                    history.push('/');
                }
                navigator.geolocation.getCurrentPosition(success,fail)
            }
            
            else{
                setMessage("password must be 8 cahrec long and includes at least a big and small letter")
            }
        }
        else{
            setMessage("Username/Email alreday exist")
        }
        
    }
	return (
		<div className="login-card-form register-form">
            
			<h4>AR BANK</h4>
			<div className="login-input">
				<input type="text" name="name" placeholder="name" onChange={(e)=>{handelChange(e)}}/>
				<input type="text" name="userName" placeholder="username" onChange={(e)=>{handelChange(e)}}/>
				<input type="email" name="email" placeholder="email" onChange={(e)=>{handelChange(e)}}/>
				<input type="password" name="password" placeholder="password" onChange={(e)=>{handelChange(e)}}/>
			</div>
			<input className="submit" type="button" value="register" onClick={()=>handelRegister()}/>
			<Link to="/login" className="register">
				Log In
			</Link>
            <h2>{message}</h2>
            
		</div>
	);
}
