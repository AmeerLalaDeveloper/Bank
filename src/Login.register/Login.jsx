import React from 'react';
import './login-style.css';

export default function Login({user,Children}) {

	return (
		<React.Fragment>
			<div className="login-page-background" />
			<div className="login-page">
				<div className="login-card">
					<div>
						<div className="bank-icon"><i className="fas fa-university" /></div>
						<div className="login-card-form">
                            {Children}
						</div>
					</div>
					<div className="login-background" />
				</div>
			</div>
		</React.Fragment>
	);
}
