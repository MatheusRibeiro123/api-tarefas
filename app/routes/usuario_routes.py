from app.database import db
from flask import Blueprint,request,jsonify
from app.models.usuario import Usuario
from flask_jwt_extended import create_access_token,jwt_required,get_jwt_identity
auth_bp = Blueprint("auth",__name__, url_prefix="/auth")


#Rota criar usuario
@auth_bp.route("/register", methods = ["POST"])
def register():
    dados = request.get_json()
    
    if not dados:
        return jsonify({"error":"Dados não enviados"}),400
    
    nome = dados.get("nome")
    email = dados.get("email")
    senha = dados.get("senha")

    if not nome or not email or not senha:
        return jsonify({"error":"Nome, email e senha são obrigatorios!"}),400
    
    usuario_existente= Usuario.query.filter_by(email = email).first()

    if usuario_existente:

        return jsonify({"error":"Usuario ja cadastrado"}),409
    
    usuario = Usuario(
        nome = nome,
        email =email
    )
    usuario.definir_senha(senha)

    db.session.add(usuario)
    db.session.commit()

    # já gera o token na hora do cadastro
    access_token = create_access_token(identity=str(usuario.id),
                                       additional_claims={"email": usuario.email})

    return jsonify({
        "message": "Usuario criado com sucesso",
        "access_token": access_token
    }), 201

#rota fazer login

@auth_bp.route("/login",methods = ["POST"])
def login():

    dados = request.get_json()
 
    if not dados:
        return jsonify({"error":"Dados não enviados"}),400
    
    email = dados.get("email")
    senha = dados.get("senha")

    if not email or not senha:
        return jsonify({"error":"Email e senha são obrigatorios!"}),400
    
    usuario = Usuario.query.filter_by(email = email).first()

    if not usuario or not usuario.verificar_senha(senha):
        return jsonify({"error":"Usuario ou senha invalidos!"}),401
    
    access_token= create_access_token(identity=str(usuario.id),
                                      additional_claims={"email":usuario.email})
       

    return jsonify({
        "message":"Login realizado com sucesso",
        "access_token": access_token,
        "usuario": usuario.to_dict()}
        ),200
 
 #rota listar usuario logado

@auth_bp.route("/me",methods = ["GET"])
@jwt_required()
def get_usuario_logado():

    usuario_id = int(get_jwt_identity())

    usuario = Usuario.query.get(usuario_id)

    if not usuario:
        return jsonify({"error":"Usuario não encontrado!"}),404
        
    return jsonify(usuario.to_dict()),200