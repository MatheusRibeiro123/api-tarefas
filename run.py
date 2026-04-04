from app import create_app
from app.database import db
from app.models import tarefas
import webbrowser

app = create_app()

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    webbrowser.open("http://127.0.0.1:5000")
    app.run(debug=True,use_reloader=False)