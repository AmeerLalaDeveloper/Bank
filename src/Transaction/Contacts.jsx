import React,{useEffect} from 'react';

export default function Contacts({onSelect, users ,name}) {
	useEffect(()=>{
		if(users[0]){
			if(users[0].admin){
				if(users[1].name===name){
					onSelect(users[2].id)
				}
				else{
					onSelect(users[1].id)
				}
			}
			else if(users[0].name!==name)
				onSelect(users[0])
		}
	},[users,name,onSelect])
	return (
		<div className="contacts">
			<select name="2" id="2" onChange={(e) => onSelect(e.target.value)}>
				{users.map((user) => {
					if (!user.admin&&user.name!==name)
						return (
							<option key={user.id} value={user.id}>
								{user.name}
							</option>)
					else return null;
				})}
			</select>
		</div>
	);
}
