const express = require('express');
const router = express.Router();

const GaleriaModel = require('../model/GaleriaModel');
const RespostaClass = require('../model/RespostaClass');

let pastaPublica = './public/arquivos/';
let multer = require('multer');
let path = require('path');
let fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pastaPublica);
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now());
        let nomeArquivo = `${file.fieldname.replace(/\//g, '')}-${Date.now()}${path.extname(file.originalname)}`;
        req.body.caminho = pastaPublica+nomeArquivo;
        cb(null, nomeArquivo);
    }
})
   
var upload = multer({ storage: storage });

function deletarArquivo(caminho){
    if(caminho != null){
        fs.unlinkSync(caminho);
        console.log('Arquivo deletado');
    }
}

router.get('/', function(req, res, next){
    GaleriaModel.getTodos(function(error, retorno){
        let resposta = new RespostaClass();
        if (error){
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro';
            console.log('Erro', + error);
        }else{
            resposta.dados = retorno;
        }
        res.json(resposta);
    });
});

router.get('/:id?', function(req, res, next){
    GaleriaModel.getId(req.params.id ,function(error, retorno){
        let resposta = new RespostaClass();
        if (error){
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro';
            console.log('Erro', + error);
        }else{
            resposta.dados = retorno;
        }
        res.json(resposta);
    });
});

router.post('/', upload.single('arquivo') , function(req, res, next){
    let resposta = new RespostaClass();

    if(req.file != null){
        GaleriaModel.adicionar(req.body, function(error, retorno){    
            if (error){
                resposta.erro = true;
                resposta.msg = 'Ocorreu um erro';
                console.log('Erro ', + error);
                deletarArquivo(req.body.caminho);
            }else{
                if(retorno.affectRows > 0){
                    resposta.erro = false;
                    resposta.msg = 'Cadastro Realizado com Sucesso';
                }else{
                    resposta.erro = true;
                    resposta.msg = 'Falha ao cadastrar';
                    console.log('Erro ', + error);
                    deletarArquivo(req.body.caminho);
                }
            }
            console.log('Resposta: ', resposta);
            res.json(resposta);
        });
    }else{
        resposta.erro = true;
        resposta.msg = 'Vídeo não enviado';
        console.log('Erro', + error);
    }

    
});

module.exports = router;