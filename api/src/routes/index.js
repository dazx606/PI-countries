const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Activity, Country } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", async (req,res)=>{
   
    try {
        const allCountries = await Country.findAll();
        res.send(allCountries); 
    } catch (error) {
        console.log(error);
    }
    
})

module.exports = router;
