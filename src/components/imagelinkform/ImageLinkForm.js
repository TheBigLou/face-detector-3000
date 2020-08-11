import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ( {onInputChange, onButtonSubmit} ) => {
	return (
		<div className='pt2'>
			<div className='center'>
				<div className='form pa4 br3 shadow-5 center'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-transparent ml2'
					onClick={onButtonSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
		)
}

export default ImageLinkForm;