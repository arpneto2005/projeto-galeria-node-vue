const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = express.Router();

const api = express();

const galeriaRouter = require('./router/galeriaRouter');

api.use(cors());
api.use(bodyparser.urlencoded({extended: true}));

api.use('/public', express.static(__dirname+'/public'));

api.use('/', router);
api.use('/galeria', galeriaRouter);

router.get('/', (req, res) => res.json({mensagem: 'API está OnLine'}));

api.listen(3000, console.log('Servidor Rodando'));