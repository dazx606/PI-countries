const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country, Activity, Op } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET all, filter and pages
router.get("/", (req,res)=>{
    let {name} = req.query;
    if(!name) Country.findAll({order:[["name","ASC"]]}).then(response=>{res.send(response)}).catch((err)=>{console.log(err);})
    else if(name) Country.findAll({where: {name: {[Op.substring]:`%${name}%`}}})
    .then((response)=>res.send(response))
    .catch((err)=>{console.log(err);})

});

//PAGES
router.get("/page/:page",(req,res)=>{
    let countries = req.body;
    let page = req.params;


})


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