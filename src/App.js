import React, { Component } from 'react';
import Navigation from './components/navigation/Navigation';
import Footer from './components/navigation/Footer'
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import 'tachyons';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 250
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  clarifaiFace: {},
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      clarifaiFace: {},
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizer);
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

  resizer = () => {
    const { imageUrl, clarifaiFace } = this.state;
    if (imageUrl !== '') {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      this.displayFaceBox({
              leftCol: clarifaiFace.left_col * width,
              topRow: clarifaiFace.top_row * height,
              rightCol: width - (clarifaiFace.right_col * width),
              bottomRow: height - (clarifaiFace.bottom_row * height)
            })
    } else {
      return;
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    this.setState({clarifaiFace: clarifaiFace});
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  cleanUpFaceBox = (message, clearBox = true) => {
    document.getElementById("noFace").innerHTML = `${message}`;
    if (clearBox) {
      this.setState({box: {}, clarifaiFace: {}});
    }
  }

  callApi = (url) => {
    fetch('https://warm-cliffs-40715.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        url: url
      })
    })
    .then((response) => response.json())
    .then((response) => {
      console.log('test');
      if (response === 'Unable to call Clarifai API' || response.outputs[0].data.regions === undefined) {
        return this.cleanUpFaceBox('Sorry, unable to detect a face in this picture.');
      } else if (response) {
        this.cleanUpFaceBox('', false);
        fetch('https://warm-cliffs-40715.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count})) // this updates just the entries item in user, as opposed to the entire user object
          })
          .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response)); // first we take the response of the API, then call calculate function, which returns the borders of the box. Then, we call the display function with that output.
    })
    .catch(err => console.log(err));
  }

  onButtonSubmit = () => {
    const initUrl = this.state.input;
    if (initUrl === this.state.imageUrl) {
      return
    } else if (initUrl === '') {
      this.setState({imageUrl: initUrl});
      this.cleanUpFaceBox('');
    } else if (initUrl.startsWith('http')) { // this if/else block accounts for cases where the URL is entered without leading 'http' string
      this.setState({imageUrl: initUrl});
      this.callApi(initUrl);
    } else {
      this.setState({imageUrl: `https://${initUrl}`});
      this.callApi(`https://${initUrl}`);
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App avenir">
      <Particles
        className='particles'
        params={particlesOptions}
      />
      <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
      { route === 'home' 
        ? <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
        : (
          route === 'signin' || route === 'signout'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      }
      <Footer />
      </div>
    );
  }
}

export default App;
