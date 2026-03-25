from app.database import db
from werkzeug.security import generate_password_hash,check_password_hash

class Usuario(db.Model):
    __tablename__ = "usuarios"
   
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100),nullable=False)
    email= db.Column(db.String(100),nullable=False,unique=True)
    senha_hash = db.Column(db.String(300), nullable=False)
    tarefas = db.relationship("Tarefa",backref = "usuario",lazy = True)

    def to_dict(self):
        return {
            "id": self.id,
            "nome":self.nome,
            "email":self.email,
            "tarefas":[tarefa.to_dict() for tarefa in self.tarefas]

        }
    
    def definir_senha(self,senha):
        self.senha_hash = generate_password_hash(senha)


    def verificar_senha(self,senha):
        return check_password_hash(self.senha_hash,senha)
