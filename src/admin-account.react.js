import React from 'react';
import funciones from './funciones-guardar';
//import guardarPartes from './funciones-guardar';
import _ from 'underscore';
import firebase from './conexion'
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import { firebaseConnect } from 'react-firebase'
import { ControlLabel, Button, Form, Label, FormControl, FormGroup, Password, Modal, Popover, Tooltip, Select } from 'react-bootstrap';
import { Nav, NavItem, handleSelect, DropdownButton, MenuItem, Row, Col, ButtonGroup, Table} from 'react-bootstrap';

var db = firebase.database();
var qUsuarios = db.ref("usuarios");

class AdminUs extends React.Component{
	constructor(props){
		super(props);
		this.state={
			mostrarModalUs: false,
			correo: '',arrayUsuarios: [],
			arrayBusqueda: [],
			estadoLista:1,
			selectUs:'',
			keyUs:'',corrUs:'', nomUs:'', nivelUs:0, nomNivel: '',
		};
	}
	componentWillMount(){
		var that = this;
		qUsuarios.on("value",(snapshot) => {
			//that.setState({ arrayUsuarios: snapshot.val(),});
			console.log(snapshot.val());
			this.setState({ arrayUsuarios: snapshot.val(),});
		});
	}
	abrirModalUs=()=>{
		this.setState({mostrarModalUs: true,});
		this.sendUs();
	}
	cerrarModalUs=()=>{this.setState({mostrarModalUs: false,});}
	handleBuscarUsuario=(e)=>{
		this.setState({correo: e.target.value, 
			selectUs:''}
			,()=>{this.busquedaUsuarios();}
		);
	}
	handleListaUsuario=(e)=>{
		this.setState({selectUs: e.target.value,});
	}
	busquedaUsuarios = () => {
		var arrayBusquedaUs = _.filter(this.state.arrayUsuarios,(value) => 
			value.correoUsuario.startsWith(this.state.correo)
		);
		console.log(arrayBusquedaUs);
		this.setState({
			arrayBusqueda : arrayBusquedaUs,
		});
	}
	enviarDatosUsuario = () => {
		this.state.selectUs == ''?
		alert("Seleccione un Usuario"):
		this.abrirModalUs();
	}
	sendUs =()=> {
		qUsuarios.orderByChild("correoUsuario").equalTo(this.state.selectUs).on("child_added",(snapshot) => {
			this.setState({
				corrUs: snapshot.val().correoUsuario,
				nomUs: snapshot.val().datosUsuarios,
				nivelUs: snapshot.val().nivel,
				keyUs: snapshot.key,
			});
		},this);
	}
	subirNivel =()=>{
		this.state.nivelUs < 4?
		this.setState({nivelUs: this.state.nivelUs+1}):
		this.setState({nivelUs: this.state.nivelUs+0});
	}
	bajarNivel =()=>{
		this.state.nivelUs > 1?
		this.setState({nivelUs: this.state.nivelUs-1}):
		this.setState({nivelUs: this.state.nivelUs-0});
	}
	actualizarNivel=()=>{
		qUsuarios.child(this.state.keyUs).update({
			nivel: this.state.nivelUs,
		});
		this.cerrarModalUs();
	}
	/*buscarCorreo=()=>
	{
		var arrayBusquedaUs = _.filter(this.state.arrayUsuarios,(value) => 
			value.correoUsuario.startsWith(this.state.correo)
		);
		this.setState({
			arrayBusquedaUs : arrayBusquedaUs,
		});
		console.log(this.state.arrayBusquedaUs);
	}*/
	render(){
		return(
			<div className="AdminUs">
				<Row>
				<Col xs={12} md={4} sm={4} lg={4}>
					<h4>Buscar Usuario:</h4>
					<FormControl type="text" name="txtCorreoBuscar" onChange={this.handleBuscarUsuario} placeholder="Buscar correo de usuario" />
					<Button onClick={this.buscarCorreo}>Buscar</Button>
					<h4>Seleccionar Usuario:</h4>
					<FormControl componentClass="select" onChange={this.handleListaUsuario} multiple style={{"height":"200px"}}>
						{this.state.correo === ''?
							_.map(this.state.arrayUsuarios, (value)=>
								<option>{value.correoUsuario}</option>
							):
							_.map(this.state.arrayBusqueda, (value)=>
								<option>{value.correoUsuario}</option>
							)
						}
					</FormControl>
					<Button bsStyle="danger" onClick={this.enviarDatosUsuario}>Administrar Usuario</Button>
					<Modal show={this.state.mostrarModalUs} onHide={this.cerrarModalUs}>
						<Modal.Header closeButton>
							<Modal.Title>Administrar Usuario</Modal.Title>
						</Modal.Header>
						<Modal.Body>
						<Label>Correo de Usuario</Label>
						<FormControl readOnly type="text" name="txtCorreo" value={this.state.corrUs}/>
						<Label>Nombre</Label>
						<FormControl readOnly type="text" name="txtNomUs" value={this.state.nomUs}/>
						<Label>Nivel de Usuario</Label>
						<FormControl readOnly type="text" name="txtNivelUs" value={this.state.nivelUs+this.state.nomNivel}/>
						<Label>Nombre de tipo de usuario:</Label>
						<FormControl readOnly type="text" value={	
							this.state.nivelUs === 1?
								"Visitante":
							this.state.nivelUs === 2?
								"Usuario":
							this.state.nivelUs === 3?
								"Administrador":
								"Webmaster"
						}/>
						<Button onClick={this.subirNivel} bsStyle="warning">Promover</Button>
						<Button onClick={this.bajarNivel} bsStyle="warning">Rebajar</Button>
						</Modal.Body>
						<Modal.Footer>
						<Button onClick={this.actualizarNivel} bsStyle="success">Guardar Cambios</Button>
						<Button onClick={this.cerrarModalUs} bsStyle="danger">Cerrar</Button>
						</Modal.Footer>
					</Modal>    
				</Col>
				</Row>
			</div>
		);
	}
}
export default AdminUs