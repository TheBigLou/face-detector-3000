import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div>
			<p className='f3'>
			{'This app will detect faces in your pictures. Enter an image URL to try it out!'}
			</p>
			<div className='white f3'>
				{`${name}, you have identified`}
			</div>
			<div className='white f2'>
				{`${entries} ${Number(entries) === 1 ? ' face' : ' faces'}`}
			</div>
		</div>
	)
}

export default Rank;