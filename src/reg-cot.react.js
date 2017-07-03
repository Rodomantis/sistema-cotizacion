import React from 'react';
import _ from 'underscore';
import firebase from './conexion'
import ReactDOM from 'react-dom'
import funciones from './funciones-guardar'
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import { firebaseConnect } from 'react-firebase'
import { Button, Form, Label, FormControl, FormGroup, Password, Modal, Popover, Tooltip, Select } from 'react-bootstrap';
import { Checkbox, Nav, NavItem, handleSelect, DropdownButton, MenuItem, Row, Col, ButtonGroup, Table } from 'react-bootstrap';

var db = firebase.database();
var qPartes = db.ref("partes");
var qFactura = db.ref("cotizaciones");
var qClientes = db.ref("clientes");

class RegCotizacion extends React.Component{
	constructor(props) {
		super(props);
		this.state = { 
			showModal: false, mostrarModCliente: false,
			listaProd: [],
			valIdProd: '',
			listaFactura:[],
			cod: '', parte: '', precUn: '',
			filaProd: [],
			factLista: [],
			tamTabla: '',
			sumaPartes: 0,
			nombre: '', apellido: '', telefono: '', carnetId: '', sumaTotal: 0,
			nombreCl: '', apellidoCl: '', telefonoCl: '', CiCl:'', 
			buscarCl: '', arrayCl: [], arrayBusCl:[], selCliente:'',
		};
	}
	//En ES6 el willmount va dentro del contructor
	componentWillMount() {
		console.log(this.state.arrayPartes);
		qPartes.on("value", (snapshot) => {
			this.setState({
				arrayPartes: snapshot.val(),
			});
		},this );
		qClientes.on("value",(snapshot) => {
			//that.setState({ arrayUsuarios: snapshot.val(),});
			console.log(snapshot.val());
			this.setState({ arrayCl: snapshot.val(),});
		});
		this.sumarTotal();
	}
	open=()=>  { this.setState({ showModal: true });}
	close=()=> { this.setState({ showModal: false });}
	abrirModCl=()=> { this.setState({ mostrarModCliente: true });}
	cerrarModCl=()=>  { this.setState({ mostrarModCliente: false });}
	sumarTotal=()=> {
		var tabMF = document.getElementById("tablaModalFact");
		var sum = 0;
		_.each(this.state.factLista,(val, index) => {
			var can = Number(tabMF.rows[index+1].cells[2].innerHTML);
			var prec = Number(tabMF.rows[index+1].cells[3].innerHTML);
			sum = sum + (can*prec);
		},this);
		this.setState({
			sumaTotal: sum,
		});
	}
	guardarFactura=()=> {
		funciones.guardarFact(
			this.state.carnetId,
			this.state.factLista,
			this.state.sumaTotal	
		);
		this.close();
	}
	transferirTabla=()=> {
		var tabP = document.getElementById("tablaCot");
		this.open();
		var listPart = [];
		_.each(this.state.filaProd,(val, index) => {
				var cCod = tabP.rows[index+1].cells[1].innerHTML;
				var cNom = tabP.rows[index+1].cells[2].innerHTML;
				var cCant = tabP.rows[index+1].cells[3].children[0].value;
				var cPrec = tabP.rows[index+1].cells[4].innerHTML;
				listPart.push({
						codigo: cCod,
						nombreProd: cNom,
						cantidad: cCant,
						precio : cPrec
				});
				console.log(cCod);
				console.log(cNom);
				console.log(cCant);
				console.log(cPrec);
				console.log(listPart);
		},this);
		alert(this.state.filaProd.length);
		this.setState({
			factLista: listPart,
		},() => {
			this.sumarTotal();
		});
	}
	limpiarTabla=()=> {
		
	}
	handleAddParteCot=()=> {
		/*NOTA IMPORTANTE:  cuando se hace un setState de manera asincrona, esta no se hace en orden
		de manera que si hacemos un setState y luego usamos esos states para realizar otro setState a continuacion
		no realizara el cambio. Para hacer esto se hace el setState de las variables que queremos tomar cerrando ese setState
		se hace un function de la sgte manera 	
					this.setState({estado1: ''},function(){
						this.setState({estado2: estado1});
					};
					);      
		para que haga el seguimiento de los cambios de estado*/
		qPartes.orderByChild("codigoParte").equalTo(this.state.valIdProd).on("child_added",(snapshot) => {
		this.setState({
			cod: snapshot.val().codigoParte,
			parte: snapshot.val().nombre,
			precUn: snapshot.val().precioUnBs,
		},() => {
			this.setState({
				filaProd: this.state.filaProd.concat(
				<tr>
					<td><Button bsStyle="danger" onClick={this.handleRemoverPartes}>-</Button></td>
					<td>{snapshot.val().codigoParte}</td>
					<td>{snapshot.val().nombre}</td>
					<td><FormControl type="text" style={{"width":"100px"}} defaultValue="1" /></td>
					<td>{snapshot.val().precioUnBs}</td>
				</tr>),
			});
		});
		console.log(this.state.filaProd);
		},this);
	}
	guardarCl=()=>{
		funciones.guardarCliente(
			this.state.CiCl,
			this.state.nombreCl,
			this.state.apellidoCl,
			this.state.telefonoCl
		);	
	}
	selectCliente=()=> {
		var sel = _.filter(this.state.arrayCl, (val) =>
			val.idCi == this.state.selCliente
		);
		_.map(sel, (val)=>
			this.setState({
				nombre: val.nombre,
				apellido: val.apellido,
				carnetId: val.idCi,
				telefono: val.telefono,
			})
		);
		/*this.setState({
			nombre: sel.nombre, 
			apellido: sel.apellido, 
			telefono: sel.te, 
			carnetId: '',
		});*/
	}
	busquedaCl = () => {
		this.setState({
			arrayBusCl : _.filter(this.state.arrayCl,(value) => 
				value.apellido.toUpperCase().includes(this.state.buscarCl.toUpperCase())
			),
		});
	}
	handleBuscarCl=(e)=>{this.setState({ buscarCl: e.target.value, },()=>{this.busquedaCl();});}
	handleListaPartes=(e)=> {this.setState({valIdProd: e.target.value.substr(0, e.target.value.indexOf(' '))});}
	handleGuardarNombre=(e)=> {this.setState({ nombre: e.target.value, });}
	handleGuardarApellido=(e)=> {this.setState({ apellido: e.target.value, });}
	handleGuardarTelefono=(e)=> {this.setState({ telefono: e.target.value, });}
	handleGuardarNombreCl=(e)=> {this.setState({ nombreCl: e.target.value, });}
	handleGuardarApellidoCl=(e)=> {this.setState({ apellidoCl: e.target.value, });}
	handleGuardarTelefonoCl=(e)=> {this.setState({ telefonoCl: e.target.value, });}
	handleGuardarCiCl=(e)=> {this.setState({ CiCl: e.target.value, });}
	handleSelCliente=(e)=> {
		this.setState({ 
			selCliente: e.target.value.substr(0, e.target.value.indexOf(' '))
			},this.selectCliente);
		}
	render() {
		var estiloLista = { height: 250, borderRadius: 10 };
		return (
		<div className="RegCotizacion">
				<Button bsStyle="success" onClick={this.abrirModCl}>Registrar Usuario</Button>
				<div><Row>
				<Col xs={12} sm={6} md={4}>
					<div>
						<h3>Lista de productos</h3>
						<FormControl componentClass="select" multiple onClick={this.handleListaPartes} style={{'height':'250px',"overflowX": "scroll"}}>
						{_.map(this.state.arrayPartes, (value) => 
							<option>{value.codigoParte}  {value.nombre}</option>
						)}	
						</FormControl>
						<Button bsStyle="primary" onClick={this.handleAddParteCot}>Añadir</Button>
						<p />
					</div>
				</Col>
				<Col xs={12} sm={12} md={8}>
				<div>
					<h3>Lista productos para comprar:</h3>
					<div style={{"overflowY": "scroll","overflowX": "scroll", "height": "250px"}}>
					<Table responsive ref="tablaCot" id="tablaCot">
						<thead>
							<tr>
								<th>#</th>
								<th>Codigo</th>
								<th>Nombre</th>
								<th>Cantidad</th>
								<th>Precio Unidad</th>
							</tr>
						</thead>
						<tbody>
						{/*nota cuando se usa el innerHTML se debe pasar a la sintaxis normal de bootstrap y no la react Bootstrap
						ademas los comentarios en react bootstrap tampoco son los mismos
							<tr>
								<th>Codigo</th>
								<th>Nombre</th>
								<th><FormControl type="text" name="cant" id="cant" style={{"width":"100px"}} defaultValue="1" /></th>
						</tr>*/}
						{this.state.filaProd}
						</tbody>
					</Table></div>
					<Button bsStyle="primary" onClick={this.transferirTabla}>Generar Cotizacion</Button>
						{/*<Checkbox />{''}*/}
				</div>
				</Col>
				</Row>
		</div>
		<Modal show={this.state.showModal} onHide={this.close}>
			<Modal.Header closeButton>
				<Modal.Title>Registrar Ventas</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="FormGroup">
					<Label>Buscar Cliente por apellido</Label>
					<FormControl type="text" onChange={this.handleBuscarCl} value={this.state.buscarCl} placeholder="Apellido del cliente" />
					<FormControl componentClass="select" onChange={this.handleSelCliente} multiple style={{"height":"100px"}}>
						{
							this.state.buscarCl === ''?
							_.map(this.state.arrayCl, (val,key) =>
								<option>{val.idCi} {val.nombre} {val.apellido}</option>
							):
							_.map(this.state.arrayBusCl, (val,key) =>
								<option>{val.idCi} {val.nombre} {val.apellido}</option>
							)
						}
					</FormControl>
				</div>
				<div className="FormGroup">
					<Label>CI Id</Label>
					<FormControl type="text" value={this.state.carnetId} placeholder="Carnet Cliente" />
				</div>
				<div className="FormGroup">
					<Label>Nombre</Label>
					<FormControl type="text" value={this.state.nombre} placeholder="Nombre Cliente" />
				</div>
				<div className="FormGroup">
					<Label>Apellidos</Label>
					<FormControl type="text" value={this.state.apellido} placeholder="Apellidos Cliente" />
				</div>
				<div className="FormGroup">
					<Label>Telefono</Label>
					<FormControl type="text" value={this.state.telefono} placeholder="Telefono Cliente" />
				</div>
				<div className="FormGroup">
					<Label>Productos a facturar:</Label>
					<div style={{"overflowY": "scroll","overflowX": "scroll", "height": "200px"}}>
					<Table responsive id="tablaModalFact" name="tablaModalFact">
						<thead>
							<tr>
								<th>Codigo</th>
								<th>Nombre</th>
								<th>Cantidad</th>
								<th>Precio Un.</th>
							</tr>
						</thead>
						<tbody>
						{_.map(this.state.factLista, (value) =>
								<tr>
									<td>{value.codigo}</td>
									<td>{value.nombreProd}</td>
									<td>{value.cantidad}</td>
									<td>{value.precio}</td>
								</tr>
							)
						}
						</tbody>
					</Table></div>
				</div>
				<div className="FormGroup">
					<Label>Total</Label>
					<FormControl type="text" name="total" id="total" value={this.state.sumaTotal} placeholder="0.00" />
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button bsStyle="primary" onClick={this.guardarFactura}>Guardar</Button>
				<Button bsStyle="success">Guardar e Imprimir</Button>
				<Button onClick={this.close}>Cerrar</Button>
			</Modal.Footer>
		</Modal>
		<Modal show={this.state.mostrarModCliente} onHide={this.cerrarModCl}>
			<Modal.Header closeButton>
				<Modal.Title>Registro de clientes</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Label bsStyle="primary">Nombre</Label>
				<FormControl type="text" onChange={this.handleGuardarNombreCl} value={this.state.nombreCl} placeholder="Nombre Cliente" />
				<Label bsStyle="primary">Apellido</Label>
				<FormControl type="text" onChange={this.handleGuardarApellidoCl} value={this.state.apellidoCl} placeholder="Apellido Cliente" />
				<Label bsStyle="primary">Telefono</Label>
				<FormControl type="text" onChange={this.handleGuardarTelefonoCl} value={this.state.telefonoCl} placeholder="Telefono Cliente" />
				<Label bsStyle="primary">Carnet ID</Label>
				<FormControl type="text" onChange={this.handleGuardarCiCl} value={this.state.CiCl} placeholder="CI ID Cliente" />
			</Modal.Body>
			<Modal.Footer>
				<Button bsStyle="success" onClick={this.guardarCl}>Guardar Cliente</Button>
				<Button bsStyle="danger" onClick={this.cerrarModCl}>Cerrar</Button>
			</Modal.Footer>
		</Modal>
		</div>
    );
  }
}

export default RegCotizacion