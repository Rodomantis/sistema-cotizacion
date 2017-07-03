import React from 'react';
import funciones from './funciones-guardar';
//import guardarPartes from './funciones-guardar';
import _ from 'underscore';
import firebase from './conexion'
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import { firebaseConnect } from 'react-firebase'
import { ControlLabel, Button, Form, Label, FormControl, FormGroup, Password, Modal, Popover, Tooltip, Select } from 'react-bootstrap';
import { Nav, NavItem, handleSelect, DropdownButton, MenuItem, Row, Col, ButtonGroup, Table } from 'react-bootstrap';

class Login extends React.Component{
	render(){
		return (
			<div>
				<Col xs={12} md={4} sm={4}>
				<div style={{'borderRadius':'8px','backgroundColor':'black','color':'white','opacity':'0.9'}}>
						<h4>Acceso al sistema de ventas y cotizaciones</h4>
						<FormControl type="text" placeholder="Nombre usuario" />
						<FormControl type="password" placeholder="Password" />
						<Button bsStyle="info">Ingresar</Button>
				</div>
				</Col>
			</div>
		);	
	}
}

export default Login;