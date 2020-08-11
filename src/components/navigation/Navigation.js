import React from 'react';
import Logo from '../logo/Logo';
import '../logo/logo.css';

const Navigation = ({onRouteChange, isSignedIn}) => {
	return (
		<div className='Tilt flex justify-between shadow-2 pv3'>
			<Logo />
			<span className='flex items-center self-center f1-ns fw3-m'>Face Detector&nbsp;<span className="gradient-text">3000</span></span>
			{ isSignedIn ?
				<p onClick={() => onRouteChange('signout')} className='f5 link dim black pointer shadow-2 pa3 h-25 mh3 Tilt br2 flex items-center self-center'>Sign Out</p>
				: <p onClick={() => onRouteChange('signin')} className='f5 link dim black pointer shadow-2 pa3 h-25 mh3 Tilt br2 flex items-center self-center'>Sign In</p>
			}
		</div>
	)
}

export default Navigation;