from flask import Blueprint,request,jsonify
from app.models.tarefas import Tarefa
from app.database import db
task_bp = Blueprint("task",__name__,url_prefix="/task")
from app.models.usuario import Usuario
from flask_jwt_extended import jwt_required,get_jwt_identity
#----------ROTAS DE TAREFAS---------------

#CRIAR TAREFA
@task_bp.route("/tarefas",methods = ["POST"])
def criar_tarefa():

    dados = request.json

    if not dados:
        return jsonify({"erro":"Dados não enviados"}),400
   
    titulo = dados.get("titulo")
    descricao = dados.get("descricao")
    status = dados.get("status")
    data_criacao = dados.get("data_criacao")
    usuario_id = dados.get("usuario_id")

    if not titulo  or not usuario_id:
        return jsonify({"erro":"Titulo e id do usuario são obrigatorios!"}),400
    
    tarefa = Tarefa(
        titulo = titulo,
        descricao = descricao,
        status = status,
        data_criacao = data_criacao,
        usuario_id = usuario_id
        )

    db.session.add(tarefa)
    db.session.commit()

    return jsonify(tarefa.to_dict()),201

#listar todas as tarefas do usuario

@task_bp.route("/tarefas/usuario/<int:id>", methods = ["GET"])
def listar_tarefas(id):
    
    usuario= Usuario.query.get(id)
    
    if not usuario:
        return jsonify({"erro":"usuario não existe"}),404
   
    tarefas = Tarefa.query.filter_by(usuario_id=id).all()       
    
    if not tarefas:
        return jsonify({"mensagem":"este usuario não tem tarefas cadastradas!"}) ,200
    
    return jsonify([tarefa.to_dict() for tarefa in tarefas]), 200

#listar tarefa especifica de um usuario

@task_bp.route("/tarefas/usuario/<int:usuario_id>/tarefa/<int:tarefa_id>",methods = ["GET"])
def listar_tarefa(usuario_id,tarefa_id):
    usuario = Usuario.query.filter_by(id = usuario_id).first()
    
    if not usuario:
        return jsonify({"erro":"usuario não existe!"}),404
    
    tarefa = Tarefa.query.filter_by(id = tarefa_id,usuario_id = usuario_id).first()

    if not tarefa:
        return jsonify({"erro":"Tarefa não existe!"}),404
    
    return jsonify(tarefa.to_dict()),200

# editar uma tarefa

@task_bp.route("/tarefas/usuario/<int:usuario_id>/tarefa/<int:tarefa_id>", methods = ["PUT"])
def editar_tarefa(usuario_id,tarefa_id):
    dados = request.json

    if not dados:
        return jsonify({"erro":"Dados não enviados!"}),400
    
    usuario = Usuario.query.filter_by(id = usuario_id).first()

    if not usuario:
        return jsonify({"erro":"Usuario não existe!"}),404
    
    tarefa = Tarefa.query.filter_by(id = tarefa_id,usuario_id = usuario_id).first()

    if not tarefa:
        return jsonify({"erro":"Tarefa não existe!"}),404
    
    tarefa.titulo = dados.get("titulo",tarefa.titulo)
    tarefa.descricao = dados.get("descricao",tarefa.descricao)
    tarefa.status = dados.get("status",tarefa.status)
    
    db.session.commit()

    return jsonify(tarefa.to_dict()), 200

    
    #Deletar tarefa

@task_bp.route("/tarefas/usuario/<int:usuario_id>/tarefa/<int:tarefa_id>",methods = ["DELETE"])
def deletar_tarefa(usuario_id,tarefa_id):
   
   tarefa = Tarefa.query.filter_by(id = tarefa_id, usuario_id = usuario_id).first()

   if not tarefa:
       return jsonify({"erro":"Tarefa não existe!"}),404
   
   db.session.delete(tarefa)
   db.session.commit()

   return jsonify({"mensagem":"Tarefa deletada com sucesso!"}),200
   

    




    
    

    
    