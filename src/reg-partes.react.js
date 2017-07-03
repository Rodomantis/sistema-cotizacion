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

//var db = firebase.database();

/*
<script src="https://www.gstatic.com/firebasejs/3.7.2/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBnN1ppFoSSFkBPfAwukIJg7TAjXvW4vWA",
    authDomain: "bd-cotizacion.firebaseapp.com",
    databaseURL: "https://bd-cotizacion.firebaseio.com",
    storageBucket: "bd-cotizacion.appspot.com",
    messagingSenderId: "290907389991"
  };
  firebase.initializeApp(config);
</script>*/

var db = firebase.database();
var qPartes = db.ref("partes");
var qUnidades = db.ref("unidades");
var qCategorias = db.ref("categorias");
var qMarcas = db.ref("marcas");

/*var guardarPartes = (c,n,u,cant,ca,m,p) => {
	var myRef = qPartes.push();
	var key = myRef.key;
	var newData={
		id: key,
		codigoParte: c,
		nombre: n,
		unidad : u,
		cantidadTotal: cant,
		categoria : ca,
		marca: m,
		precioUnBs: p,
	}
	myRef.set(newData);
}; 
var  guardarUnidades = (u) => {
	var myRef = qUnidades.push();
	var key = myRef.key;
	myRef.set({nomUnidad: u});
};*/

class RegPartes extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showModal: false, mostrarModalUn:false, mostrarModalCat:false, mostrarModalMarca:false,
			arrayPartes: [], arrayUnidades: [], arrayCategorias: [], arrayMarcas: [],
			codigo:'', nombre:'', unidad:'Unidades', cantidad:1, categoria:'Armado', marca:'Genius', precio:0,
			marcas: ['Genius','Acer','HP','Asus','Intel'], nuevaUn:'', nuevaCat:'', nuevaMarca: '',
		};
	}
	//En ES6 el willmount de cualquier cosa que no sea modificacion de state va dentro del contructor
	componentWillMount(){
		console.log(this.state.arrayPartes);
		qPartes.on("value",(snapshot) => {
			this.setState({ arrayPartes: snapshot.val() });
		},this );
		qUnidades.on("value",(snapshot) => {
			this.setState({ arrayUnidades: snapshot.val() });
		},this );
		qCategorias.on("value",(snapshot) => {
			this.setState({ arrayCategorias: snapshot.val() });
		},this );
		qMarcas.on("value",(snapshot) => {
			this.setState({ arrayMarcas: snapshot.val() });
		},this );
	}
	registrar =()=>{
		funciones.guardarPartes(
			this.state.codigo,
			this.state.nombre,
			this.state.unidad,
			this.state.cantidad,
			this.state.categoria,
			this.state.marca,
			this.state.precio,
		);
		this.close();
	}
	registrarUn=()=>{
		funciones.guardarUnidades(this.state.nuevaUn);
		this.setState({nuevaUn:''});
	}
	registrarCat=()=>{
		funciones.guardarCategorias(this.state.nuevaCat);
		this.setState({nuevaCat:''});
	}
	registrarMarca=()=>{
		funciones.guardarMarcas(this.state.nuevaMarca);
		this.setState({nuevaMarca:''});
	}
	sumarPieza=()=>{
		this.setState({cantidad: this.state.cantidad+1,});
	}
	restarPieza=()=>{
		if(this.state.cantidad > 1){
				this.setState({cantidad: this.state.cantidad-1,});
		}
	}
	close=()=> { this.setState({ showModal: false });}
	open=()=> { this.setState({ showModal: true });}
	cerrarModUn=()=>{this.setState({ mostrarModalUn: false });}
	abrirModUn=()=>{this.setState({ mostrarModalUn: true });}
	cerrarModCat=()=>{this.setState({ mostrarModalCat: false });}
	abrirModCat=()=>{this.setState({ mostrarModalCat: true });}
	cerrarModMarca=()=>{this.setState({ mostrarModalMarca: false });}
	abrirModMarca=()=>{this.setState({ mostrarModalMarca: true });}
	testMostrar=()=>{}
	handleGuardarCodigo=(e)=> { this.setState({ codigo: e.target.value, });}
	handleGuardarNombre=(e)=> { this.setState({ nombre: e.target.value, });}
	handleListaUnidades=(e)=> { this.setState({ unidad: e.target.value,});}
	handleGuardarCantidad=(e)=> { this.setState({ cantidad: e.target.value, });}
	handleListaCategoria=(e)=> { this.setState({ categoria: e.target.value,});}
	handleListaMarca=(e)=> { this.setState({ marca: e.target.value,});}
	handleGuardarPrecio=(e)=> { this.setState({ precio: e.target.value, });}
	handleNuevaUn=(e)=> { this.setState({ nuevaUn: e.target.value, });}
	handleNuevaCat=(e)=> { this.setState({ nuevaCat: e.target.value, });}
	handleNuevaMarca=(e)=> { this.setState({ nuevaMarca: e.target.value, });}
	render() {
		return (
		<div className="RegPartes">
		<div>
			<Row>
				<Col xs={36} sm={18} md={12}>
					<ButtonGroup>
							<Button bsSize="large" bsStyle="primary" onClick={this.open}>Registrar Nuevas</Button>
							<Button bsSize="large" bsStyle="danger" onClick={this.abrirModUn}>Registrar Unidades</Button>
							<Button bsSize="large" bsStyle="danger" onClick={this.abrirModCat}>Registrar Categorias</Button>
							<Button bsSize="large" bsStyle="info" onClick={this.abrirModMarca}>Registrar Nuevas Marcas</Button>
					</ButtonGroup>
				</Col>
			</Row>
		</div>
			<div>
				<h3>Lista de partes</h3>
				<Row><Col xs={12} sm={6} md={4}>
				<FormControl componentClass="select" multiple id="addPartes" name="addPartes" style={{"height":"200px"}}>
					{_.map(this.state.arrayPartes,(value) => 
							<option>{value.nombre}</option>
					)}
				</FormControl></Col></Row>
				<h3>Tabla de partes</h3>
				<div style={{"overflowY": "scroll","overflowX": "scroll", "height": "300px"}}>
					<Table responsive id="tablaPrueba">
						<thead>
							<tr>
								<th>Codigo</th>
								<th>Nombre</th>
								<th>Marca</th>
								<th>Unidad</th>
								<th>Cantidad total</th>
								<th>Categoria</th>
								<th>Precio unitario Bs</th>
								</tr>
						</thead>
						<tbody>
							{_.map(this.state.arrayPartes,(value) => 
								<tr>
									<td>{value.codigoParte}</td>
									<td>{value.nombre}</td>
									<td>{value.marca}</td>
									<td>{value.unidad}</td>
									<td>{value.cantidadTotal}</td>
									<td>{value.categoria}</td>
									<td>{value.precioUnBs}</td>
								</tr>
							)}
						</tbody>
					</Table>
				</div>
			</div>
			<Modal show={this.state.showModal} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>Productos</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<div>
					<Label>Codigo Producto: </Label>
					<FormControl type="text" name="codProd" id="codProd" onChange={this.handleGuardarCodigo} value={this.state.codigo} placeholder="Codigo" />
					<Label>Nombre Producto: </Label>
					<FormControl type="text" name="nombre" id="nombre" onChange={this.handleGuardarNombre} value={this.state.nombre} placeholder="Nombre Producto" />
					<Label>Seleccionar Unidad:</Label>
					<FormControl componentClass="select" onClick={this.handleListaUnidades} id="selUn" name="selUn">
						{_.map(this.state.arrayUnidades,(value) => 
							<option>{value.nomUnidad}</option>
						)}
					</FormControl>
					<div><Label>Cantitad Inicial:</Label>
					<FormControl readOnly type="text" name="cantidad" id="cantidad" value={this.state.cantidad} style={{"width":"50px"}}/>
					<Button bsStyle="success" onClick={this.sumarPieza}>+</Button><Button bsStyle="success" onClick={this.restarPieza}>-</Button></div>
					<Label>Seleccionar Categoria:</Label>
					<FormControl componentClass="select" onClick={this.handleListaCategoria} id="selCat" name="selCat"> 
						{ _.map(this.state.arrayCategorias, (value) => 
							<option>{value.nombreCat}</option> 
						)}
					</FormControl>
					<Label>Seleccionar Marca:</Label>
					<FormControl componentClass="select" onClick={this.handleListaMarca} id="selMarca" name="selMarca"> 
						{ _.map(this.state.marcas, (value) => 
							<option>{value}</option> 
						)}
					</FormControl>
					<Label>Precio por unidad seleccionada: </Label>
					<FormControl type="text" name="precio" id="precio" onChange={this.handleGuardarPrecio} value={this.state.precioUn} placeholder="Precio por unidad" />
				</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="large" bsStyle="primary" onClick={this.registrar}> Registrar</Button>
					<Button bsSize="large" bsStyle="danger" onClick={this.close}>Cerrar</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={this.state.mostrarModalUn} onHide={this.cerrarModUn}>
				<Modal.Header closeButton>
					<Modal.Title>Prueba</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<div>
					<Label>Nombre de la unidad a registrar:</Label>
					<FormControl type="text" name="nomUn" id="nomUn" onChange={this.handleNuevaUn} value={this.state.nuevaUn} placeholder="Insertar nueva unidad" />
					<Label>Lista de unidades actuales:</Label>
					<FormControl componentClass="select" multiple style={{"height":"200px"}}>
						{_.map(this.state.arrayUnidades,(value) => 
							<option>{value.nomUnidad}</option>
						)}
					</FormControl>
				</div>
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="large" bsStyle="primary" onClick={this.registrarUn}>Registrar</Button>
					<Button bsSize="large" bsStyle="danger" onClick={this.cerrarModUn}>Cerrar</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={this.state.mostrarModalCat} onHide={this.cerrarModCat}>
				<Modal.Header closeButton>
					<Modal.Title>Registrar Categorias</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Label>Nombre de la Categoria a registrar:</Label>
					<FormControl type="text" name="nomUn" id="nomUn" onChange={this.handleNuevaCat} value={this.state.nuevaCat} placeholder="Insertar nueva categoria" />
					<Label>Lista de categorias actuales:</Label>
					<FormControl componentClass="select" multiple style={{"height":"200px"}}>
						{_.map(this.state.arrayCategorias,(value) => 
							<option>{value.nombreCat}</option>
						)}
					</FormControl>
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="large" bsStyle="primary" onClick={this.registrarCat}>Registrar</Button>
					<Button bsSize="large" bsStyle="danger" onClick={this.cerrarModCat}>Salir</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={this.state.mostrarModalMarca} onHide={this.cerrarModMarca}>
				<Modal.Header closeButton>
					<Modal.Title>Registrar Categorias</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<Label>Nombre de la Categoria a registrar:</Label>
					<FormControl type="text" name="nomUn" id="nomUn" onChange={this.handleNuevaMarca} value={this.state.nuevaMarca} placeholder="Insertar nueva categoria" />
					<Label>Lista de unidades actuales:</Label>
					<FormControl componentClass="select" multiple style={{"height":"200px"}}>
						{_.map(this.state.arrayMarcas,(value) => 
							<option>{value.nombreMar}</option>
						)}
					</FormControl>
				</Modal.Body>
				<Modal.Footer>
					<Button bsSize="large" bsStyle="primary" onClick={this.registrarMarca}>Registrar</Button>
					<Button bsSize="large" bsStyle="danger" onClick={this.cerrarModMarca}>Salir</Button>
				</Modal.Footer>
			</Modal>
		</div>
		);
	}		
}

export default RegPartes