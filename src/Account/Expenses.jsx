import './account.css'
import { useEffect,useState } from 'react'
const Expenses = ({name,userBankTransaction}) => {
     const [transition,setTransition]=useState(userBankTransaction);

    const getExp=(num)=>{
        let cash=0;
      
        transition.map(u=>{
           if(parseInt((new Date()-new Date(u.date))/86400000)<=num){
             cash+=u.cash;
           }
           return 1;
        })
        return cash;
    }
   
    useEffect(()=>{
        setTransition(userBankTransaction)
    },[userBankTransaction])

    return (
         <ul className="rev-exp">
             <li>
                 <span className="title">
                     daily
                 </span>
                 <span className='avg-price'> 
               {transition.length>0?getExp(0):'0'}</span>
             </li>
              <li>
                 <span className="title">
                     Weekly
                 </span>
                 <span className='avg-price'> 
                   {transition.length>0?getExp(7):'0'}</span>
             </li>
              <li>
                 <span className="title">
                     Monthly
                 </span>
                 <span className='avg-price'> 
                  {transition.length>0?getExp(30):'0'}</span>
             </li>
         </ul> 
    );
}
 
export default Expenses;