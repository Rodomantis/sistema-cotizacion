import firebase from './conexion'

var db = firebase.database();
var qPartes = db.ref("partes");
var qUnidades = db.ref("unidades");
var qCategorias = db.ref("categorias");
var qMarcas = db.ref("marcas");
var qMatriz = db.ref("infoCasaMatriz");
var qUsers = db.ref("usuarios");
var qClientes = db.ref("clientes");

var funciones = {
	guardarCliente(ciId,nom,ap,tel){
		var myRef =qClientes.child(ciId)
		var key = myRef.key;
		var datosCliente = {
			nombre: nom,
			idCi: ciId,
			apellido: ap,
			telefono: tel,
		};
		myRef.set(datosCliente);
	},
	guardarUnidades(u){
		var myRef = qUnidades.push();
		var key = myRef.key;
		myRef.set({nomUnidad: u});
	},
	guardarPartes(c,n,u,cant,ca,m,p){
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
	},
	guardarCategorias(c){
		var myRef = qCategorias.push();
		var key = myRef.key;
		myRef.set({nombreCat: c});
	},
	guardarMarcas(m){
		var myRef = qMarcas.push();
		var key = myRef.key;
		myRef.set({nombreMar: m});
	},
	guardarDatosMatriz(n,d,t,e,r,doc,num){
		var myRef = qMatriz.push();
		var key = myRef.key;
		myRef.set({
			nombreEmpresa: n,
			direccionMatriz: d,
			telefonoMatriz: t,
			eMailEmpresa: e,
			responsableEmpresa: r,
			tipoDocumento: doc,
			numDocumento: num,
		});
	},
	guardarDatosSucursal(numDoc,nom,d,t,r){
		var qSucursal = db.ref("infoCasaMatriz/infoSucursales");
		var myRef = qSucursal.push();
		var key = myRef.key;
		myRef.set({
			codSucursal: key,
			nombreSucursal: nom,
			direccionSucursal: d,
			telefonoSucursal: t,
			responsableSucursal: r,
		});
	},
	guardarFact(id, fact, total){
		var fecha = new Date().toJSON().slice(0,10).replace(/-/g,'/');
		var qFactura = db.ref("clientes/"+id+"/cotizaciones");
		var myRef = qFactura.push();
		var key = myRef.key;
		var datosFactura = {
			fechaFactura: fecha,
			detalleFactura: fact,
			totalFact: total
		};
		myRef.set(datosFactura);
	},
	guardarDatosUsuario(datosUsuario, correo, uid){
		var myRef = qUsers.child(uid);
		var key = myRef.key;
		var datosUsers = {
			datosUsuarios: datosUsuario,
			correoUsuario: correo,
			nivel: 1,
		};
		myRef.set(datosUsers);
	},
};
export default funciones
