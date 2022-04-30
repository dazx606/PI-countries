const { response } = require('express');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Activity, Country, Op } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//create activity
router.post("/", async (req,res,next)=>{
   let activity = req.body
   
   try {
    res.send( await Activity.create({
        name: activity.name,
        length: activity.length,
        difficulty: activity.difficulty,
        season: activity.season
    }))
   } catch (error) {
        next(error);
   }
})

//rel act and country
router.post("/activity", async (req,res,next)=>{
    
    try {
        let activity = req.body
        let cnt = await Country.findOne({where:{id:activity.countryId}});
        let act = await Activity.findOne({where:{id:activity.activityId}});
        res.send(await cnt.addActivity(act));
    } catch (error) {
        next(error);
    }

 });


 // get activity by id
 router.get("/activity/:id", async (req,res,next)=>{
    let {id} = req.params;
    try {
        let cnt = await Country.findOne({ where: { id: id } });
        let acts = await cnt.getActivities();
        res.send(acts.length ? acts: "no related activities found");
    } catch (error) {
        next(error);
    }
 });

 

 router.get("/",(req,res,next)=>{
     Activity.findAll().then((response)=> res.send(response)).catch((err)=>{
         console.log(err);
         next(err);
     })
 });

 router.delete("/:id", async (req,res,next)=>{
     try {
         let {id} = req.params;
         await Activity.destroy({where:{id:id}});
         res.send("done")
     } catch (error) {
         next(error)
     }
 });

 router.get("/:NameActivity", async (req,res,next)=>{
    let {NameActivity} = req.params;
    let {order, name, continent} = req.query;
    let continents = ["Europe", "Asia", "Americas", "Africa", "Oceania", "Antarctic"]
    try {
        let activity = await Activity.findOne({ where: { name: NameActivity } });
        let countries = await activity.getCountries({order: [["name", "ASC"]]});
       
        if(!name && !order) res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent) : countries)
        else if(name){
            countries =  await activity.getCountries({order: [["name", "ASC"]], where: { name: { [Op.substring]: `%${name}%` } }});
            if(!order) res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent) : countries)
            else if(order){
                order.includes("A") ? countries : countries = await activity.getCountries({order: [["population", "ASC"]], where: { name: { [Op.substring]: `%${name}%` } }})
                //res.send("si")
                if(order === "A-Z") res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent) : countries)
                else if(order === "Z-A") res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent).reverse() : countries.reverse())
                else if(order === "lower population") res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent) : countries)
                else if(order === "higher population") res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent).reverse() : countries.reverse())
            }
        } else if(!name){
            order.includes("A") ? countries : countries = await activity.getCountries({order: [["population", "ASC"]]})
                //res.send("si")
                if(order === "A-Z") res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent) : countries)
                else if(order === "Z-A") res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent).reverse() : countries.reverse())
                else if(order === "lower population") res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent) : countries)
                else if(order === "higher population") res.send(continents.includes(continent) ? countries.filter(e=>e.continent===continent).reverse() : countries.reverse())
        }
        
    } catch (error) {
        next(error);
    }
 });

module.exports = router;