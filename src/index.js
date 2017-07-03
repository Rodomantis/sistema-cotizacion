import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import { FirebaseProvider } from 'react-firebase';
import MasterCont from './master.react';
import RegCotizacion from './reg-cot.react';
import RegPartes from './reg-partes.react';
import AdminUs from './admin-account.react';
import SisVentas from './sis-ventas.react';
import Login from './login.react';
import './index.css';


ReactDOM.render(
	//<MasterCont />,
	//<RegCotizacion />,
	//<RegPartes />,
	//<AdminUs />,
	<SisVentas />,
	document.getElementById('root')
);
