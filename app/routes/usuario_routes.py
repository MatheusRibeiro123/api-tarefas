from app.database import db
from flask import Blueprint,request,jsonify
from app.models.usuario import Usuario
from flask_jwt_extended import create_access_token
auth_bp = Blueprint("auth",__name__, url_prefix="/auth")


#Rota criar usuario
@auth_bp.route("/register", methods = ["POST"])
def register():
    dados = request.json
    
    if not dados:
        return jsonify({"erro":"Dados não enviados"}),400
    
    nome = dados.get("nome")
    email = dados.get("email")
    senha = dados.get("senha")

    if not nome or not email or not senha:
        return jsonify({"erro":"Nome, email e senha são obrigatorios!"}),400
    
    usuario_existente= Usuario.query.filter_by(email = email).first()

    if usuario_existente:

        return jsonify({"erro":"Usuario ja cadastrado"}),409
    
    usuario = Usuario(
        nome = nome,
        email =email
    )
    usuario.definir_senha(senha)

    db.session.add(usuario)
    db.session.commit()

    return jsonify({"sucesso":"Usuario criado com sucesso"}),201

#rota fazer login

@auth_bp.route("/login",methods = ["POST"])
def login():

    dados = request.json
 
    if not dados:
        return jsonify({"erro":"dados não enviados"}),400
    
    email = dados.get("email")
    senha = dados.get("senha")

    if not email or not senha:
        return jsonify({"erro":"email e senha são obrigatorios!"}),400
    
    usuario = Usuario.query.filter_by(email = email).first()

    if usuario and usuario.verificar_senha(senha):
        access_token = create_access_token(identity=usuario.id,
                                           additional_claims={"email":usuario.email})

    return jsonify({
        "sucesso":"Login realizado com sucesso",
        "access_token": access_token
    })
       
    
    return jsonify({"erro":"Usuario ou senha invalidos"}), 401

#listar usuarios
@auth_bp.route("/usuarios",methods = ["GET"])
def listar_usuarios():
    
    lista = Usuario.query.all()

    if not lista:
        return jsonify({"erro":"Não existe usuarios cadastrados!"}),200
    
    return jsonify([usuario.to_dict() for usuario in lista]),200
        

    

