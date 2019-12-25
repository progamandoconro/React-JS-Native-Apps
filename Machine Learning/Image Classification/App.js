import React, { useState } from 'react';
import './App.css';
import photo from './assets/yoda.jpg';
import { loadImage } from 'canvas';
import * as mobilenet from '@tensorflow-models/mobilenet';

import './firebase';
import { storage } from 'firebase';

const App = () => {
	const [res, handleRes] = useState([]);
	const [image, setImage] = useState([]);
	const [url, setURL] = useState('');

	const myPhoto = () => {
		return <img style={{ padding: '10px' }} id="img" src={photo} alt="foto "></img>;
	};
	const myExamplePrediction = async () => {
		const loadModel = await mobilenet.load();
		const pic = await loadImage(photo);
		const pred = await loadModel.classify(pic);

		console.log(pred);
		handleRes(pred);
	};

	const handleImage = (e) => {
		setImage(e.target.files[0]);
		console.log(image);
	};
	const db = storage().ref('/holaMundo/images/');

	const uploadImage = () => {
		db.put(image);
		db.getDownloadURL().then((e) => setURL(e));

		console.log(url);
	};

	const Mypicture = () => {
		return <img src={image} alt={image}></img>;
	};

	const myRealPrediction = async () => {};

	return (
		<div className="App">
			<h1>Example: </h1>
			{myPhoto()}
			<button onClick={(e) => myExamplePrediction(e)}>Predict</button>
			{res.map((e, k) => (
				<li key={k}>
					<h1>{e.className + ': ' + Math.round(e.probability * 100) + '%'}</h1>
				</li>
			))}
			<hr />
			<input type="file" onChange={(e) => handleImage(e)} />
			<hr />
			<br />
			{Mypicture()}
			<button
				onClick={(e) => {
					uploadImage(e.target.files);
				}}
			>
				Upload
			</button>
			<img src={url} alt="img" />
			<button onClick={() => myRealPrediction()}> Predict</button>
			<hr />
		</div>
	);
};

export default App;