const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Activity, Country } = require('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//create activity
router.post("/", async (req,res)=>{
   let activity = req.body
   
   try {
    res.send( await Activity.create({
        name: activity.name,
        length: activity.length,
        difficulty: activity.difficulty,
        season: activity.season
    }))
   } catch (error) {
       res.status(404).send({"msg":"activity not created", "activity":activity})
   }
})

//rel act and country
router.post("/activity", async (req,res)=>{
    
    try {
        let activity = req.body
        let cnt = await Country.findOne({where:{id:activity.countryId}});
        let act = await Activity.findOne({where:{id:activity.activityId}});
        res.send(await cnt.addActivity(act));
    } catch (error) {
        console.log(error.message);
        res.status(404).send(error.message)
    }
    
    //await [activity.countryId].addActivity(activity.activityId)
    
    //{cnt,act}
    //await cnt.addActivity(act)
     
 })


 // get activity by id
 router.get("/activity/:id", async (req,res)=>{
    let {id} = req.params;
    try {
        let cnt = await Country.findOne({ where: { id: id } });
        let acts = await cnt.getActivities();
        res.send(acts.length ? acts: "no related activities found");
    } catch (error) {
        res.status(404)
        console.log(error);
    }
 })

module.exports = router;