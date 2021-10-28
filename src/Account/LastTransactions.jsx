import { useEffect, useState } from "react";

const LastTransactions = ({name,lastTransactions}) => {
    const [transaction,setTransaction]=useState(lastTransactions)
    useEffect(()=>{
        setTransaction(lastTransactions)
    },[lastTransactions])
    return ( 
        
             <ul className="last-transactions">
                  <li key={0} className="first-transaction"><span className="removeQuery">Date</span><span>From</span><span>To</span><span>Price</span><span className="removeQuery" >Reason</span></li>  
                 {
                     transaction.sort((u2,u1)=> new Date(u1.date) - new Date(u2.date)).map((u,idx)=>{
                   return  ( 
                <li key={idx+1}><span className="date removeQuery">{u.date.slice(0,10)}</span>
                <span className="from">{u.get?u.secondUserName:name}</span><span className="to">{!u.get?u.secondUserName:name}</span>
                <div className="price">{u.cash}</div><span className="removeQuery" >{u.transReason}</span></li>
                   )
                     })
                 }
                
      
                </ul>
     );
}
 
export default LastTransactions;