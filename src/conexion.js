import firebase from 'firebase'

var config = {
	apiKey: 'AIzaSyBnN1ppFoSSFkBPfAwukIJg7TAjXvW4vWA',
    authDomain: 'bd-cotizacion.firebaseapp.com',
    databaseURL: 'https://bd-cotizacion.firebaseio.com',
    storageBucket: 'bd-cotizacion.appspot.com',
    messagingSenderId: '290907389991',
};

firebase.initializeApp(config);

module.exports = firebase;