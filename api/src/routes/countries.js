const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Country, Activity, Op } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//GET all, filter by population and name
//TODO VARIABLE DESC ACT
// router.get("/", (req,res,next)=>{
//     let {name} = req.query;
//     let {order} = req.query;
//     let {cont} = req.query;
//     if(!name && !order) Country.findAll({order:[["name","ASC"]]}).then(response=>{res.send(response)}).catch((err)=>{console.log(err);})

//     else if (!name && order){
//         if (order === "Z-A") Country.findAll({order:[["name","DESC"]]}).then(response=>{res.send(response)}).catch((err)=>{next(err)})
//         else if (order === "A-Z") Country.findAll({order:[["name","ASC"]]}).then(response=>{res.send(response)}).catch((err)=>{next(err)})
//         else if (order === "less populated") Country.findAll({order:[["population","ASC"]]}).then(response=>{res.send(response)}).catch((err)=>{next(err)})
//         else if (order === "more populated") Country.findAll({order:[["population","DESC"]]}).then(response=>{res.send(response)}).catch((err)=>{next(err)})

//     }
//     else if(name && !order) Country.findAll({where: {name: {[Op.substring]:`%${name}%`}},order:[["name","ASC"]]})
//     .then((response)=>res.send(response))
//     .catch((err)=>{next(err)})
//     else if(name && order){
//         if (order === "A-Z") Country.findAll({where: {name: {[Op.substring]:`%${name}%`}},order:[["name","ASC"]]})
//             .then((response)=>res.send(response))
//         else if (order === "Z-A") Country.findAll({where: {name: {[Op.substring]:`%${name}%`}},order:[["name","DESC"]]})
//             .then((response)=>res.send(response))
//             .catch((err)=>{next(err)})
//         else if (order === "less populated") Country.findAll({where: {name: {[Op.substring]:`%${name}%`}},order:[["population","ASC"]]})
//             .then((response)=>res.send(response))
//             .catch((err)=>{next(err)})
//         else if (order === "more populated") Country.findAll({where: {name: {[Op.substring]:`%${name}%`}},order:[["population","DESC"]]})
//         .then((response)=>res.send(response))
//         .catch((err)=>{next(err)})
//     }

// });

router.get("/", async (req, res, next) => {
    let { order, name, continent } = req.query;

    try {
        let data1 = await Country.findAll({ order: [["name", "ASC"]] });
        let continents = ["Europe", "Asia", "Americas", "Africa", "Oceania", "Antarctic"]


        if (!name && !order) continent ? res.send(data1.filter(e => e.continent === continent)) : res.send(data1)
        else if (name) {
            data1 = await Country.findAll({ order: [["name", "ASC"]], where: { name: { [Op.substring]: `%${name}%` } } })
            if (!order) {
                continents.includes(continent) ? res.send(data1.filter(e => e.continent === continent)) : res.send(data1)
            } else if (order) {
                order.includes("A") ? data1 : data1 = await Country.findAll({ order: [["population", "ASC"]], where: { name: { [Op.substring]: `%${name}%` } } })
                if (order === "A-Z") continents.includes(continent) ? res.send(data1.filter(e => e.continent === continent)) : res.send(data1)
                if (order === "lower population") continents.includes(continent) ? res.send(data1.filter(e => e.continent === continent)) : res.send(data1)
                if (order === "Z-A") continents.includes(continent) ? res.send(data1.filter(e => e.continent === continent).reverse()) : res.send(data1.reverse())
                if (order === "higher population") continents.includes(continent) ? res.send(data1.filter(e => e.continent === continent).reverse()) : res.send(data1.reverse())
            }
        } else if (!name) {
            order.includes("A") ? data1 : data1 = await Country.findAll({ order: [["population", "ASC"]] })
            if (order === "A-Z") continents.includes(continent) ? res.send(data1.filter(e => e.continent === continent)) : res.send(data1)
            if (order === "lower population") continents.includes(continent) ? res.send(data1.filter(e => e.continent === continent)) : res.send(data1)
            if (order === "Z-A") continents.includes(continent) ? res.send(data1.filter(e => e.continent === continent).reverse()) : res.send(data1.reverse())
            if (order === "higher population") continents.includes(continent) ? res.send(data1.filter(e => e.continent === continent).reverse()) : res.send(data1.reverse())
        }
    } catch (error) {
        next(error)
    }

});



router.get("/continents", async (req, res, next) => {
    try {
        let continents = await Country.findAll({ attributes: ['continent'], group: ["continent"] });
        continents ? res.send(continents) : res.status(404).send("not found")
    } catch (error) {
        next(error)
    }
});



//GET by ID
router.get("/:id", async (req, res, next) => {
    let { id } = req.params;

    try {
        let country = await Country.findOne({ where: { id: id } });
        let activities = await country.getActivities();

        country ? res.send({ "country": country, "activities": activities }) : res.send("country not found")
    } catch (error) {
        next(error)
    }
});

router.delete("/:id", (req,res,next)=>{
    let {id} = req.params;
    Country.destroy({where:{id:id}}).then(res.send("done")).catch(err=>next(err))
    
})




module.exports = router;