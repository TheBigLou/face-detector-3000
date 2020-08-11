import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<p className="f6 yellow db" id='noFace'></p>
				<img id='inputimage' alt='' src={imageUrl} width='600px' height='auto' />
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> {/*"empty" div because we're just going to show a border with CSS*/}
			</div>
		</div>
	);
}

export default FaceRecognition;