const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country, Activity, Op } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req,res)=>{
    let {name} = req.query;
    if(!name) Country.findAll().then(response=>{res.send(response)}).catch((err)=>{console.log(err);})
    else if(name) Country.findAll({where: {name: {[Op.substring]:`%${name}%`}}})
    .then((response)=>res.send(response))
    .catch((err)=>{console.log(err);})

});

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