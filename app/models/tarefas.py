from app.database import db
from datetime import datetime

class Tarefa(db.Model):
    __tablename__ = "tarefas"
    id = db.Column(db.Integer,primary_key=True)
    titulo = db.Column(db.String(100),nullable = False)
    descricao = db.Column (db.String(100),nullable = True)
    status = db.Column(db.Boolean, default = False, nullable = False)
    data_criacao = db.Column(db.DateTime, default = datetime.now)
