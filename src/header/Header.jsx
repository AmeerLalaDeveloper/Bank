import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default function Header({ logedInProp, handelLogOutCB }) {
	const [ logedIn, setLogedIn ] = useState(logedInProp);
	const [ menuOpen, setMenuOpen ] = useState('change');
	useEffect(
		() => {
			setLogedIn(logedInProp);
		},
		[ logedInProp ]
	);

	return (
		<React.Fragment>
			<div className="ham-responsive">
				<div className={`container-menu ${menuOpen ? 'change' : ''}`} onClick={(e) => setMenuOpen(!menuOpen)}>
					<div className="bar1" />
					<div className="bar2" />
					<div className="bar3" />
				</div>
				<div className={`hamburger ${menuOpen ? '' : 'none'}`}>
					<nav>
						<div>
							<div className="logo-link-container">
								<div className="logo">
									<Link to="/" className="logo-link" />
								</div>
								<ul>
									<li>
										<Link to={Object.keys(logedIn).length !== 0 ? '/account' : '/login'}>
											Account
										</Link>
									</li>
									<li>
										<Link to={Object.keys(logedIn).length !== 0 ? '/transaction' : '/login'}>
											Transition
										</Link>
									</li>
									<li>
										{Object.keys(logedIn).length !== 0 && logedIn.admin ? (
											<Link to={'/adminTrans'}>Admin</Link>
										) : null}
									</li>
								</ul>
							</div>
							<div className="login">
								{Object.keys(logedIn).length !== 0 ? (
									<Link onClick={handelLogOutCB} to="/login">
										Log Out
									</Link>
								) : (
									<Link to="/login">Log In</Link>
								)}
							</div>
						</div>
					</nav>
				</div>
			</div>
			<div className="header">
				<nav>
					<div className="logo-ul">
						<div className="logo">
							<Link to="/" className="logo-link" />
						</div>
						<ul>
							<li>
								<Link to={Object.keys(logedIn).length !== 0 ? '/account' : '/login'}>Account</Link>
							</li>
							<li>
								<Link to={Object.keys(logedIn).length !== 0 ? '/transaction' : '/login'}>
									Transaction
								</Link>
							</li>
							<li>
								{Object.keys(logedIn).length !== 0 && logedIn.admin ? (
									<Link to={'/adminTrans'}>Admin</Link>
								) : null}
							</li>
						</ul>
					</div>
					<div className="login">
						{Object.keys(logedIn).length !== 0 ? (
							<Link onClick={handelLogOutCB} to="/login">
								Log Out
							</Link>
						) : (
							<Link to="/login">Log In</Link>
						)}
					</div>
				</nav>
			</div>
		</React.Fragment>
	);
}
