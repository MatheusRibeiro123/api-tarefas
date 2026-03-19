from flask import Flask
from app.database import db

def create_app():
    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"

    db.init_app(app)
    
    @app.route("/")
    def statusAPI():
        return "API Funcionando"

    return app



