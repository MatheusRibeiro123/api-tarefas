from app.database import db
from datetime import datetime
from flask import jsonify

class Tarefa(db.Model):
    __tablename__ = "tarefas"
    id = db.Column(db.Integer,primary_key=True)
    titulo = db.Column(db.String(100),nullable = False)
    descricao = db.Column (db.String(100),nullable = True)
    status = db.Column(db.Boolean, default = False, nullable = False)
    data_criacao = db.Column(db.DateTime, default = datetime.now)
    usuario_id = db.Column(db.Integer,db.ForeignKey("usuarios.id"),nullable = False)


    def to_dict(self):
        return {
            "id":self.id,
            "titulo":self.titulo,
            "descricao":self.descricao,
            "status":self.status,
            "data_criacao":self.data_criacao,
            "usuario_id":self.usuario_id
            }
