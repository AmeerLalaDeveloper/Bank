import React, { useEffect, useState } from "react";
import {getBankTransitions, updateUser } from "../api/api";
import LastTransactions from "./LastTransactions";
import Revenue from "./Revenue";
import Expenses from "./Expenses";
import { useHistory } from 'react-router-dom';
import './account.css'
const Account = ({selectedUser,updateActive}) => {
    const [userBankTransaction,setUserBankTransaction]=useState([])
    const [user,setUser]=useState(selectedUser)
    const [transition,setTransition]=useState('Revenue')
    const utilization=()=> Math.ceil(100*user.frameSpent/user.creditFrame||0)
    useEffect(()=>{
       (async ()=>{
        setUserBankTransaction((await getBankTransitions(user.id)).data)
       })();
       setUser(selectedUser)
    },[selectedUser,user.id])

    const filterExpendes=()=> userBankTransaction.filter(u=>u.get)

    const filterRevenues=()=> userBankTransaction.filter(u=>!u.get)

    const handelActive=async ()=>{
        const temp=await updateUser(user.id,{"isActive":!user.isActive});
        updateActive(temp.data)
    }


    let history = useHistory();
    if(Object.keys(user).length===0){
        history.push("/")
        return(<React.Fragment/>)
    }
    return (
        
    <div className='container'>
        <div className="left-content">
            <div className="balance">
                    <div>
                        <span style={{color:'lightgray'}}>Balance</span>
                        { <span style={{textAlign:'center'}}>{
                            user.balance
                        }</span> }
                    </div>
                    {<span>{'*'.repeat(8)+user.creditCardNumber.slice(user.creditCardNumber.length-4,user.creditCardNumber.length)}</span>}
                </div>
                <div className="credit-limit">
               <div className="progress-content">
                    <div className="progress">
                        <div className="progress-before" style={{
                            width:utilization()+'%'
                        }}></div>
                </div>
                <span>{utilization()+'%'}</span>
               </div>
                <div className="limit">
                    <span>Credit Limits</span>
                    <span>{user.creditFrame}$</span>
                </div>
                  </div>  
                  <div className="card-info">
                    <h3>Card Info</h3>
                    <ul>
                        <li><span>Status</span><span id={user.isActive?"status":""}>{user.isActive?'Active':'InActive'}</span></li>
               
                        <li><span>CVV</span><span>{user.creditCVV}</span></li>
                 
                        <li><span>Type</span><span>{user.admin?"Admin":user.accountName}</span></li>

                        {user.city?<li><span>city</span><span>{user.city}</span></li>:null}
                        
                    </ul>
                  </div>
                  <button className="active" onClick={handelActive}>Activate/InActive</button>
                  {/* <button className="active" onClick={handelActive}>Edit Credit Limit</button> */}
            </div>
            
            <div className="right-content">
                <h2>Last Transactions</h2>
                <div className="lists">
               <LastTransactions name={user.name} lastTransactions={userBankTransaction}></LastTransactions>
                <div>
                <select name="select" id="select" onChange={e=>setTransition(e.target.value)}><option value="Revenue">Revenue</option>
                <option value="Expenses">Expenses</option></select>
               </div>
          {
            transition!=='Revenue'?<Revenue name={user.name} userBankTransaction={filterRevenues()}/>:<Expenses name={user.name}  userBankTransaction={filterExpendes()}/>
        }
        </div>
        </div>
        </div>
    );
}
 
export default Account;