import React, { Component } from 'react';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			regEmail: '',
			regPassword: '',
			regName: ''
		}
	}

	onNameChange = (event) => {
		this.setState({regName: event.target.value})
	}

	onEmailChange = (event) => { // get the input values from the form entry
		this.setState({regEmail: event.target.value})
	}
	onPasswordChange = (event) => { // get the input values from the form entry
		this.setState({regPassword: event.target.value})
	}

	onSubmitRegistration = () => {
		const { regEmail, regPassword, regName } = this.state;
		if (!regEmail || !regPassword || !regName) {
			return document.getElementById("reg-warn").innerHTML = 'Registration fields cannot be blank';
		}
		fetch('https://warm-cliffs-40715.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: regName,
				email: regEmail,
				password: regPassword
			})
		})
			.then(response => response.json()
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				} else {
					return document.getElementById("reg-warn").innerHTML = 'Email already registered';
				}
			}))
		}
	

	render() {
		return (
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
				        <input
				        	className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
				        	type="text"
				        	name="name"
				        	id="name"
				        	onChange={this.onNameChange} />
				      </div>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input
				        	className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
				        	type="email"
				        	name="email-address"
				        	id="email-address"
				        	onChange={this.onEmailChange} />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input
				        	className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
				        	type="password"
				        	name="password"
				        	id="password"
				        	onChange={this.onPasswordChange} />
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      	onClick={this.onSubmitRegistration}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
				      	type="submit"
				      	value="Register"
				      	/>
				    </div>
				    <div className="lh-copy mt3">
				      <p className="f6 yellow db" id='reg-warn'></p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;