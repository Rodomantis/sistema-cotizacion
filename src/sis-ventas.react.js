import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './conexion';
import funciones from './funciones-guardar';
import MasterCont from './master.react';
import RegCotizacion from './reg-cot.react';
import RegDatEmp from './datos-empresa.react';
import { ControlLabel, Button, Form, Label, FormControl, FormGroup, Password, Modal, Popover, Tooltip, Select } from 'react-bootstrap';
import { Nav, NavItem, handleSelect, DropdownButton, MenuItem, Row, Col, ButtonGroup, Table } from 'react-bootstrap';
import Estilos from './estilos-react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

var db = firebase.database();
var qUsers = db.ref("usuarios");

class SisVentas extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userData: '',
			estado : 1,
			cont: 0,
		};
	}
	componentWillMount(){
        var that = this;
        firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// User is signed in.
				that.setState({
					userData:user
				},()=>{
					that.verificar();
				});
			}else {
				console.log('no user')
			}
        });
    }
	verificar = () => {
		funciones.guardarDatosUsuario(this.state.userData.displayName, this.state.userData.email, this.state.userData.uid);
	}
    logout = () => {
		firebase.auth().signOut().then(() => {
        // Sign-out successful.
			this.setState({
				userData:''
			}),this
		}, (error) => {
			// An error happened.
		});
    }
	loginWithGoogle =()=> {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then((result) => {
			var token = result.credential.accessToken;
			var user = result.user;
		}).catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
		});	
		//Para abrir el login en la misma pagina
		//firebase.auth().signInWithRedirect(provider);
		/*firebase.auth().getRedirectResult().then(function(result) {
			if (result.credential) {
				var token = result.credential.accessToken;
			}
			var user = result.user;
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;

			var email = error.email;
			var credential = error.credential;
		});*/
	}
	loginWithFacebook = () => {
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			var token = result.credential.accessToken;
			var user = result.user;
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
			console.log(errorCode);
			console.log(errorMessage);
		});
	}
	loginWithTwitter = () => {
		var provider = new firebase.auth.TwitterAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			var token = result.credential.accessToken;
			var secret = result.credential.secret;
			var user = result.user;
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
			console.log(errorCode);
			console.log(errorMessage);
		});
	}
	render() {
    return (
		<div className="SisVentas">
			<Col xs={12} sm={15} md={15} ls={12} style={Estilos.fondoPrincipal}>
				{
					this.state.userData==='' ?
					<div>
						<Button onClick={this.loginWithGoogle} bsStyle="danger">Login con Google</Button>
						<Button onClick={this.loginWithFacebook} bsStyle="primary">Login con Facebook</Button>
						<Button onClick={this.loginWithTwitter} bsStyle="info">Login con Twitter</Button>
					</div>:
					<Button onClick={this.logout}>Salir</Button>
				}
				<div> 
				{this.state.userData==='' ?
					<Login />:
					<MasterCont />
				}
				</div>
			</Col>
		</div>
    );
  }
}

class Login extends SisVentas{
	constructor(){
		super()
		//call super to run parent's constructor
		this.state = {
			user:'',
			pass:'',
		};
	}
	handleTextUser=(e)=>{this.setState({user: e.target.value,});}
	handleTextPass=(e)=>{this.setState({pass: e.target.value,});}
	
	render(){
		return (
			<div>
				<Col xs={12} md={4} sm={4} lg={4}>
				<div style={{'borderRadius':'8px','backgroundColor':'black','color':'white','opacity':'0.9'}}>
						<h4>Acceso al sistema de ventas y cotizaciones</h4>
						<FormControl type="text" onChange={this.handleTextPass} placeholder="Nombre usuario" />
						<FormControl type="password" onChange={this.handleTextUser} placeholder="Password" />
						<Button bsStyle="info">Ingresar</Button>
				</div>
				</Col>
			</div>
		);	
	}
}

export default SisVentas;
