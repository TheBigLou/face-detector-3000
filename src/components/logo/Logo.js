import React from 'react';
import Tilt from 'react-tilt';
import face from './face.svg';
import './logo.css';
 

const Logo = () => {
	return (
		<div className='mh3 flex items-center self-center'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: "5rem", width: "5rem" }} >
 				<div className="Tilt-inner pa3"><img alt='logo' src={face} /></div>
			</Tilt>
		</div>
	);
}

export default Logo;