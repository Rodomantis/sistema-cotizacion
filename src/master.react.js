import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RegPartes from './reg-partes.react';
import RegCotizacion from './reg-cot.react';
import RegDatEmp from './datos-empresa.react';
import SisVentas from './sis-ventas.react';
import AdminUs from './admin-account.react';
import { Button, ButtonGroup, DropdownButton, MenuItem, Nav, Row, Col } from 'react-bootstrap';

var Background = '../Background/background.jpg';
class MasterCont extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			estadoContainer:0,		
		};
	}
	/*cambiarContainer(){
		/*var b = Math.floor((Math.random() * 100) + 1);
		b > 50 ? 
		this.setState({estadoContainer: true},() => {console.log(b+">50="+this.state.estadoContainer)}): 
		this.setState({estadoContainer: false},() => {console.log(b+">50="+this.state.estadoContainer)});
		var a;
		this.state.estadoContainer===1 ?
		a = (<RegPartes />):
		this.state.estadoContainer===2 ?
		a = (<RegCotizacion />):
		a = (<h2>vacio</h2>);
		return a;
		console.log(a);
	},*/
	abrirPartes = () =>{this.setState({estadoContainer: 1})}
	abrirFacturas = () =>{this.setState({estadoContainer: 2})}
	abrirDatEmp = () =>{this.setState({estadoContainer: 3})}
	abrirAdminUs = () =>{this.setState({estadoContainer: 4})}
	render() {
    return (
		<div className="MasterCont">
		<Row>
			<Col xs={12} sm={24} md={24} lg={12} style={{'backgroundColor':'black','color':'white'}}>
					<h2>Sistema de cotización de partes</h2>
			</Col>
		</Row>
			<div>
			<Row>
				<Col xs={12} md={4} lg={2}>
					<ButtonGroup vertical style={{'minWidth':'200', 'maxWidth':'200'}}>
						<DropdownButton title="ADMINISTRACIÓN" id="bg-vertical-dropdown-1" style={{"height":"50px"}}>
							<DropdownButton title="Configuracion Datos Empresa" id="bg-vertical-dropdown-1-1" style={{"minWidth":"229px"}}>
								<Button onClick={this.abrirDatEmp} style={{"minWidth":"229px"}}>Datos casa Matriz y sucursales</Button>
							</DropdownButton>
							<Button onClick={this.abrirAdminUs} style={{"minWidth":"229px"}}>Usuarios</Button>
						</DropdownButton>
						{/*<DropdownButton title="ARCHIVOS" id="bg-vertical-dropdown-2" style={{"height":"50px"}}>
								<MenuItem eventKey="1">Dropdown link</MenuItem>
								<MenuItem eventKey="2">Dropdown link</MenuItem>
								</DropdownButton>*/}
						<DropdownButton title="TRANSACCIONES" id="bg-vertical-dropdown-3" style={{"height":"50px"}}>
							<MenuItem onClick={this.abrirPartes}>Registrar Piezas</MenuItem>
							<MenuItem onClick={this.abrirFacturas}>Registrar Facturas</MenuItem>
						</DropdownButton>
						{/*<DropdownButton title="CUENTAS" id="bg-vertical-dropdown-4" style={{"height":"50px"}}>
						<MenuItem eventKey="1">Dropdown link</MenuItem>
						<MenuItem eventKey="2">Dropdown link</MenuItem>
						</DropdownButton>
						<DropdownButton title="REPORTES" id="bg-vertical-dropdown-5" style={{"height":"50px"}}>
						<MenuItem eventKey="1">Dropdown link</MenuItem>
						<MenuItem eventKey="2">Dropdown link</MenuItem>
						</DropdownButton>*/}
						<Button style={{"height":"50px"}}>REIMPRESIÓN</Button>
					</ButtonGroup>
				</Col>
				<Col xs={12} sm={9} md={7} lg={10}>
					<div style={{"margin":"10px", "opacity":"0.9", "height":"500px", "backgroundColor":"white","borderRadius": "10px", "overflowY": "scroll"}}> 
					{this.state.estadoContainer===1 ?
						<RegPartes />:
					this.state.estadoContainer===2 ?
						<RegCotizacion />:
					this.state.estadoContainer===3 ?
						<RegDatEmp />:
					this.state.estadoContainer===4 ?
						<AdminUs />:
						<h2></h2>}
					</div>
				</Col>
			</Row>
			</div>
		</div>
    );
  }
}


export default MasterCont
