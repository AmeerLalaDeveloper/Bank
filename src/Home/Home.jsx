import React from 'react'
import { Link } from 'react-router-dom'
import "./homeStyle.css"
export default function Home({user}) {
    return (<>
        <div className="home-background"></div>
        <div id="home">
            <div className="home-container">
                <div className="links">
                    <div className="social-media ameer">
                        <h3>Ameer</h3>
                        <div>
                            <a href="https://github.com/AmeerLalaDeveloper" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/ameer-lala-b376bb1b2/" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://www.facebook.com/ameer.lala.161" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
                        </div>
                    </div>
                    <div className="logo-home"/>
                    <div className="social-media rawi">
                        <h3>Rawi</h3>
                        <div>
                            <a href="https://github.com/rawi123" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/rawi-lahiani-1a955a1b2/" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://www.instagram.com/rawi_lahiany/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                    <div className="content">
                    <h1>World's #1 Bank for Service!</h1>
                    <p>
                        <span>AR Bank</span> offers our customers “big bank” benefits with a small-town feel. We are one of the largest Carmel-based banks, yet decisions are made locally and quickly. We pride ourselves on our retail-based model focused on convenience and fanatic customer service.
                        Following the results of a national consumer satisfaction survey commissioned earlier this year by Forbes magazine, <span>AR Bank</span> was named as the top-scoring bank overall on the third-annual list of ‘Best-In-State Banks and Credit Unions’. Survey respondents noted that the presence of physical stores, longer hours than competitors, dog-friendly policies and free services, such as coin counting, were key differentiators for Republic Bank.
                        Join our FANS for the #1 customer experience, 7 day In-store, Online & Mobile.
                        </p>
                    </div>
                    <div className="hiOrLog">
                    {Object.keys(user).length===0?<Link to="/login">Login</Link>:<h4>Hello {user.name}</h4>}
                    </div>
            </div>
        </div>
        </>
    )
}
