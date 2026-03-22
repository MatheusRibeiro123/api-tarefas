from flask import Flask
from app.database import db
from app.routes.usuario_routes import auth_bp
from app.routes.tarefas_routes import task_bp

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

    db.init_app(app)
   
    app.register_blueprint(auth_bp)
    app.register_blueprint(task_bp)

    @app.route("/")
    def statusAPI():
        return "API Funcionando"

    return app



