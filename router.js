const Router = require('koa-router');
const router = Router();
const stuffControllers = require('./controllers/stuffControllers');
const userControllers = require('./controllers/userControllers');

router.get('/getStuff', stuffControllers.getAll);
router.post('/create', stuffControllers.create);
router.put('/update/:id', stuffControllers.update);
router.delete('/delete/:id', stuffControllers.delete);

// Newly Added Endpoints - Remove this comment
router.post('/signUp', userControllers.signUp);
router.post('/signIn', userControllers.signIn);
router.get('/me', userControllers.myStuff);


module.exports = router;
