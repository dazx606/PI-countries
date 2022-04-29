const { response } = require('express');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Activity, Country } = require('../db');


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
    
    //await [activity.countryId].addActivity(activity.activityId)
    
    //{cnt,act}
    //await cnt.addActivity(act)
     
 })


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
 })

 router.get("/",(req,res,next)=>{
     Activity.findAll().then((response)=> res.send(response)).catch((err)=>{
         console.log(err);
         next(err);
     })
 })

module.exports = router;