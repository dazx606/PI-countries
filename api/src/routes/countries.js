const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country, Activity, Op } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET all, filter by population and name
router.get("/", (req,res)=>{
    let {name} = req.query;
    let {order} = req.query;
    if(!name && !order) Country.findAll({order:[["name","ASC"]]}).then(response=>{res.send(response)}).catch((err)=>{console.log(err);})
    else if (!name && order){
        if (order === "ZA") Country.findAll({order:[["name","DESC"]]}).then(response=>{res.send(response)}).catch((err)=>{console.log(err);})
        if (order === "LO") Country.findAll({order:[["population","ASC"]]}).then(response=>{res.send(response)}).catch((err)=>{console.log(err);})
        if (order === "HI") Country.findAll({order:[["population","DESC"]]}).then(response=>{res.send(response)}).catch((err)=>{console.log(err);})
    }
    else if(name && !order) Country.findAll({where: {name: {[Op.substring]:`%${name}%`}},order:[["name","ASC"]]})
    .then((response)=>res.send(response))
    .catch((err)=>{console.log(err);})
    else if(name && order){
        if (order === "ZA") Country.findAll({where: {name: {[Op.substring]:`%${name}%`}},order:[["name","DESC"]]})
            .then((response)=>res.send(response))
            .catch((err)=>{console.log(err);})
        if (order === "LO") Country.findAll({where: {name: {[Op.substring]:`%${name}%`}},order:[["population","ASC"]]})
            .then((response)=>res.send(response))
            .catch((err)=>{console.log(err);})
        if (order === "HI") Country.findAll({where: {name: {[Op.substring]:`%${name}%`}},order:[["population","DESC"]]})
        .then((response)=>res.send(response))
        .catch((err)=>{console.log(err);})
    }

});


//GET by ID
router.get("/:id", async (req,res)=>{
    let {id} = req.params;

    try {
        let country = await Country.findOne({ where: { id: id } });
        let activities = await country.getActivities();
        
        country?res.send({"country":country, "activities":activities}):res.send("country not found")
    } catch (error) {
        res.status(404).send("data not found")
        console.log(err)
    }
    
        
            //TODO agregar las actividades relacionadas al pais
});



module.exports = router;