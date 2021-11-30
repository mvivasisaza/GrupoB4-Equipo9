//Exportamos cada una de las funciones que habiamos hecho en el index.js inicialemnete.
// Toda la operacion logica y de respuesta que teniamos inicialmente en index.js

exports.getMessage = (req, res) => {         //La aplicacion, va escuchar la peticion de tipo Get, en la ruta "/" (es decir en la ruta raiz) y una funciona anonima que recibe dos parametros: un req(request o peticion) y un res (respond o respuesta).
	res.send("Hello Word!");                //Cuando llega la peticion a la ruta "/" con el metodo (req,res) se da como respuesta para este ejemplo "Hello World".
};// El anterior getMessage lo podemos llamar desde la ruta (En la carpeta Router)


const Mae = require("../models/mae");


//Las constantes de maes que estaba en el index.js, nos las traemos aca.
const maes =[
	{
		id: "001",
		codigo:"0001001",
		nombre:"Activos fijos"
	},

	{
		id: "002",
		codigo:"0002001",
		nombre:"Pasivos corrientes"
	},
];

exports.getMaes = (req,res) => {
	Mae.find().then((maeResult) => {
		res.status(200).json(maeResult);		
	});
};

exports.addMae = (req, res) => {
	console.log(req.body);
	//maes.push(req.body);  //Nos sirve para hacer registros en memoria. Lo desabilitamos porque ya entrariamos a trabajar con BD.
	const maeAdd = new Mae({
		id:req.body.id,
		codigo:req.body.codigo,
		nombre:req.body.nombre,
	});
	maeAdd.save().then((createdMae) => {
		console.log(createdMae);
		res.status(201).json({message: "Mae creado"});
	})
	//res.status(201).json({message: "Mae creado"});
};

exports.deleteMae = (req, res) => {
	Mae.deleteOne({ _id: req.params.id }).then((result) => {  //el parametro esta en la url '/:id' 
		if (result.deletedCount >0) {
			res.status(200).json({message: "Mae Eliminado"});
		} else {
			res.status(200).json({message: "Mae no encontrado"});
		}
});
};
