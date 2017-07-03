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

var db = firebase.database();
var qMatriz = db.ref("infoCasaMatriz");
var qSucursales = db.ref("infoCasaMatriz/infoSucursales");

class RegDatEmp extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			a: 0,
			mostrarModalMat: false, mostrarModalSuc: false,
			tiposDocumento: ['NIT','CI','RUA','DIN'],
			arrayCasasMat: [], arraySucursales: [],
			nomMat: '', dirMat:'', telMat:'', mailMat: '', responsableMat:'', tipoDoc: '', numDoc:'',
			nomSuc: '', dirSuc:'', telSuc:'', responsableSuc:'', selMat: '',
		};
	}
	componentWillMount(){
		qMatriz.on("value", (snapshot) => {
			this.setState({
				arrayCasasMat: snapshot.val(),
			});
		},this );
		qSucursales.on("value", (snapshot) => {
			this.setState({
				arraySucursales: snapshot.val(),
			});
		},this );
	}
	guardarDatosMatriz = () =>{
		funciones.guardarDatosMatriz(
			this.state.nomMat,
			this.state.dirMat,
			this.state.telMat,
			this.state.mailMat,
			this.state.responsableMat,
			this.state.tipoDoc,
			this.state.numDoc,
		);
	}
	guardarDatosSucursal =()=>{
		funciones.guardarDatosSucursal(
			this.state.selMat,
			this.state.nomSuc,
			this.state.dirSuc,
			this.state.telSuc,
			this.state.responsableSuc,		
		);
		this.cerrarModalSucursal();
	}
	abrirModalMatriz=()=>{this.setState({mostrarModalMat: true});}
	cerrarModalMatriz=()=>{this.setState({mostrarModalMat: false});}
	abrirModalSucursal=()=>{this.setState({mostrarModalSuc: true});}
	cerrarModalSucursal=()=>{this.setState({mostrarModalSuc: false});}
	handleNomMat=(e)=>{this.setState({nomMat: e.target.value,});}
	handleDirMat=(e)=>{this.setState({dirMat: e.target.value,});}
	handleTelMat=(e)=>{this.setState({telMat: e.target.value,});}
	handleMailMat=(e)=>{this.setState({mailMat: e.target.value,});}
	handleResMat=(e)=>{this.setState({responsableMat: e.target.value,});}
	handleTipoDoc=(e)=>{this.setState({tipoDoc: e.target.value,});}
	handleNumDoc=(e)=>{this.setState({numDoc: e.target.value,});}
	handleNomSuc=(e)=>{this.setState({nomSuc: e.target.value,});}
	handleDirSuc=(e)=>{this.setState({dirSuc: e.target.value,});}
	handleTelSuc=(e)=>{this.setState({telSuc: e.target.value,});}
	handleResSuc=(e)=>{this.setState({responsableSuc: e.target.value,});}
	handleSelCasaMat=(e)=>{this.setState({selMat: e.target.value.substr(0, e.target.value.indexOf(' '))});}
	render() {
		return (
			<div name="RegDatEmp">
				<Button bsSize="large" bsStyle="danger" onClick={this.abrirModalMatriz}>Registrar datos de empresa</Button>
				<Button bsSize="large" bsStyle="danger">Mostrar datos Matriz</Button>
				<Button bsSize="large" bsStyle="primary" onClick={this.abrirModalSucursal}>Registrar datos de Sucursales</Button>
				<h4>Datos de empresas sucursales</h4>
				<div>
					<Table responsive>
					<thead>
						<tr>
							<th>Direccion</th>
							<th>Telefono</th>
							<th>Responsable</th>
							<th>NIT</th>
						</tr>
					</thead>
					<tbody>
						{
							_.map(this.state.arraySucursales, (val) =>
								<tr>
									<td>{val.nombreSucursal}</td>
									<td>{val.direccionSucursal}</td>
									<td>{val.telefonoSucursal}</td>
									<td>{val.responsableSucursal}</td>
								</tr>
							)
						}
					</tbody>
					</Table>
				</div>
				<Modal show={this.state.mostrarModalMat} onHide={this.cerrarModalMatriz}>
					<Modal.Header closeButton>
						<Modal.Title>Registrar Datos Empreza Matriz</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Label>Nombre de la empresa Matriz:</Label>
						<FormControl type="text" onChange={this.handleNomMat} value={this.state.nomMat} placeholder="Insertar el nonbre" />
						<Label>Direccion:</Label>
						<FormControl type="text" onChange={this.handleDirMat} value={this.state.dirMat} placeholder="Direccion" />
						<Label>Telefonos:</Label>
						<FormControl type="text" onChange={this.handleTelMat} value={this.state.telMat} placeholder="Telefonos" />
						<Label>Direccion Email:</Label>
						<FormControl type="email" onChange={this.handleMailMat} value={this.state.mailMat} placeholder="@email" />
						<Label>Nombre Responsable:</Label>
						<FormControl type="text" onChange={this.handleResMat} value={this.state.responsableMat} placeholder="Responsable" />
						<Label>Tipo Documento Fiscal:</Label>
						<FormControl onClick={this.handleTipoDoc} componentClass="select">
							{_.map(this.state.tiposDocumento, (value) => 
								<option>{value}</option>
							)}
						</FormControl>
						<Label>Numero:</Label>
						<FormControl type="text" onChange={this.handleNumDoc} value={this.state.numDoc} placeholder="Numero" />
					</Modal.Body>
					<Modal.Footer>
						<Button bsSize="large" bsStyle="primary" onClick={this.guardarDatosMatriz}>Registrar</Button>
						<Button bsSize="large" bsStyle="danger" onClick={this.cerrarModalMatriz}>Salir</Button>
					</Modal.Footer>
				</Modal>
				<Modal show={this.state.mostrarModalSuc} onHide={this.cerrarModalSucursal}>
					<Modal.Header closeButton>
						<Modal.Title>Registrar Datos Sucursales</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Label>Seleccionar caza matriz:</Label>
						<FormControl onClick={this.handleSelCasaMat} componentClass="select">
							{_.map(this.state.arrayCasasMat, (value) => 
								<option>{value.numDocumento} {value.nombreEmpresa}</option>
							)}
						</FormControl>
						<Label>Nombre Sucursal:</Label>
						<FormControl type="text" onChange={this.handleNomSuc} value={this.state.nomSuc} placeholder="Numero" />
						<Label>Direccion Sucursal:</Label>
						<FormControl type="text" onChange={this.handleDirSuc} value={this.state.dirSuc} placeholder="Direccion" />
						<Label>Telefonos:</Label>
						<FormControl type="text" onChange={this.handleTelSuc} value={this.state.telSuc} placeholder="Telefonos" />
						<Label>Nombre Responsable:</Label>
						<FormControl type="text" onChange={this.handleResSuc} value={this.state.responsableSuc} placeholder="Responsable" />
					</Modal.Body>
					<Modal.Footer>
						<Button bsSize="large" bsStyle="primary" onClick={this.guardarDatosSucursal}>Registrar</Button>
						<Button bsSize="large" bsStyle="danger" onClick={this.cerrarModalSucursal}>Salir</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}


export default RegDatEmp