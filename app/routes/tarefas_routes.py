from flask import Blueprint,request,jsonify
from app.models.tarefas import Tarefa
from app.database import db
from flask_jwt_extended import jwt_required,get_jwt_identity

task_bp = Blueprint("task",__name__,url_prefix="/task")

#----------ROTAS DE TAREFAS---------------

#CRIAR TAREFA
@task_bp.route("/tarefas",methods = ["POST"])
@jwt_required()
def criar_tarefa():

    dados = request.get_json()

    if not dados:
        return jsonify({"error":"Dados não enviados"}),400
   
    titulo = dados.get("titulo")
    descricao = dados.get("descricao")
    status = dados.get("status","pendente")
   
    if not titulo :
        return jsonify({"error":"Titulo é obrigatorio!"}),400
    
    usuario_id = int(get_jwt_identity())
    
    tarefa = Tarefa(
        titulo = titulo,
        descricao = descricao,
        status = status,
        usuario_id = usuario_id
        )

    db.session.add(tarefa)
    db.session.commit()

    return jsonify(tarefa.to_dict()),201

#listar todas as tarefas do usuario

@task_bp.route("/tarefas", methods = ["GET"])
@jwt_required()
def listar_tarefas():
    
    usuario_id=int(get_jwt_identity())

    tarefas = Tarefa.query.filter_by(usuario_id=usuario_id).all()       
    
    if not tarefas:
        return [],200
    
    return jsonify([tarefa.to_dict() for tarefa in tarefas]), 200

#listar tarefa especifica de um usuario

@task_bp.route("/tarefas/<int:tarefa_id>",methods = ["GET"])
@jwt_required()
def listar_tarefa(tarefa_id):
   
    usuario_id=int(get_jwt_identity())

    tarefa = Tarefa.query.filter_by(id = tarefa_id,usuario_id = usuario_id).first()

    if not tarefa:
        return jsonify({"error":"Tarefa não existe!"}),404
    
    return jsonify(tarefa.to_dict()),200

# editar uma tarefa

@task_bp.route("/tarefas/<int:tarefa_id>", methods = ["PUT"])
@jwt_required()
def editar_tarefa(tarefa_id):
    dados = request.get_json()

    if not dados:
        return jsonify({"error":"Dados não enviados!"}),400
    
    usuario_id = int(get_jwt_identity())

    tarefa = Tarefa.query.filter_by(id = tarefa_id,usuario_id = usuario_id).first()

    if not tarefa:
        return jsonify({"error":"Tarefa não existe!"}),404
    
    tarefa.titulo = dados.get("titulo",tarefa.titulo)
    tarefa.descricao = dados.get("descricao",tarefa.descricao)
    tarefa.status = dados.get("status",tarefa.status)
    
    db.session.commit()

    return jsonify(tarefa.to_dict()), 200

    
    #Deletar tarefa

@task_bp.route("/tarefas/<int:tarefa_id>",methods = ["DELETE"])
@jwt_required()
def deletar_tarefa(tarefa_id):
   
   usuario_id = int(get_jwt_identity())
   
   tarefa = Tarefa.query.filter_by(id = tarefa_id, usuario_id = usuario_id).first()

   if not tarefa:
       return jsonify({"error":"Tarefa não existe!"}),404
   
   db.session.delete(tarefa)
   db.session.commit()

   return jsonify({"message":"Tarefa deletada com sucesso!"}),200
