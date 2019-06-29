const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = express.Router();

const api = express();

api.use(cors());
api.use(bodyparser.urlencoded({extended: true}));
api.use('/', router);

router.get('/', (req, res) => res.json({mensagem: 'API está OnLine'}));

api.listen(3000, console.log('Servidor Rodando'));