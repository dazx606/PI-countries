const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRoute = require('./countries.js')
const ActivityRoute = require('./activities.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter); 
router.use('/countries', countryRoute);
router.use('/activities', ActivityRoute);

module.exports = router;
