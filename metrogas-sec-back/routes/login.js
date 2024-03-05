var express = require('express');
const router = express.Router();
var loginController = require('../controllers/loginController');
var dashboardController = require('../controllers/dashboardController');
var modalController = require('../controllers/modalController');


const cors = require('cors');


router.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
    })
);

router.post('/login', loginController.handleLogin, (req, res) => {
    const token = res.locals.token;
    res.status(200).json({ success: true, token });
});

console.log('en el route')

router.get('/dashboard', dashboardController.replicateToken, (req,res) => {
    consolole.log('router dashboard')
});

router.put('/modal', modalController.modifirows, (req,res) => {
    consolole.log('router modal')
});



module.exports = router;
