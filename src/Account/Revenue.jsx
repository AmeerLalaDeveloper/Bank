import './account.css'
import { useEffect,useState } from 'react'

const Revenue = ({name,userBankTransaction}) => {
    const [transition,setTransition]=useState(userBankTransaction);
    useEffect(()=>{
    
        setTransition(userBankTransaction)
    },[userBankTransaction])

    const getRev=(num)=>{
        let cash=0;
      
        transition.map(u=>{
           if(parseInt((new Date()-new Date(u.date))/86400000)<=num){
             cash+=u.cash;
           }
           return 1;
        })
        return cash;
    }
   
   

    return ( 
         <ul className="rev-exp">

             <li>
                 <span className="title">
                     daily
                 </span>
                 <span className='avg-price'> 
                {transition.length>0?getRev(0):'0'}</span>
             </li>
              <li>
                 <span className="title">
                     Weekly
                 </span>
                 <span className='avg-price'> 
                 {transition.length>0?getRev(7):'0'}</span>
             </li>
              <li>
                 <span className="title">
                     Monthly
                 </span>
                 <span className='avg-price'> 
                 {transition.length>0?getRev(30):'0'}</span>
             </li>
         </ul> 
    );
}
 

 
export default Revenue;