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
                if(retorno.affectedRows > 0){
                    resposta.erro = false;
                    resposta.msg = 'Registro deletado com Sucesso';
                }else{
                    resposta.erro = true;
                    resposta.msg = 'Falha ao deletar';
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

router.put('/', upload.single('arquivo') , function(req, res, next){
    let resposta = new RespostaClass();

    GaleriaModel.editar(req.body, function(error, retorno){
        //console.log('Dados: ', req.body); 
        if (error){
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro';
            console.log('Erro ', + error);
            deletarArquivo(req.body.caminho);
        }else{
            //console.log('vendo a variavel retorno: ', retorno);
            if(retorno.affectedRows > 0){
                resposta.erro = false;
                resposta.msg = 'Cadastro editado com Sucesso';
            }else{
                //console.log('Teste de afetação de linha: ', retorno.affectRows);
                resposta.erro = true;
                resposta.msg = 'Falha na alteração';
                console.log('Erro ', + error);
                deletarArquivo(req.body.caminho);
            }
        }
        console.log('Resposta: ', resposta);
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

router.delete('/:id?', function(req, res, next){
    GaleriaModel.deletar(req.params.id ,function(error, retorno){
        let resposta = new RespostaClass();
        if (error){
            resposta.erro = true;
            resposta.msg = 'Ocorreu um erro';
            console.log('Erro', + error);
        }else{
            if(retorno.affectedRows > 0){
                resposta.erro = false;
                resposta.msg = 'Cadastro editado com Sucesso';
            }else{
                resposta.erro = true;
                resposta.msg = 'Falha na alteração';
                console.log('Erro ', + error);
                deletarArquivo(req.body.caminho);
            }
        }
        res.json(resposta);
    });
});

module.exports = router;