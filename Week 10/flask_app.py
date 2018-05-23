from flask import Flask, redirect, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy
import datetime
app = Flask(__name__)
app.config["DEBUG"] = True

SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="",
    password="",
    hostname="",
    databasename="",
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

app.secret_key = "something random"

class competition(db.Model):

    __tablename__ = "competitions"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256))
    date = db.Column(db.Date)
    location = db.Column(db.String(256))
    competing = db.Column(db.String(256))
    start = db.Column(db.Time)
    end = db.Column(db.Time)


Now = datetime.datetime.now().strftime("%y-%m-%d-%H-%M")
Today = Now[:8]

@app.route('/main/', methods=["GET", "POST"])
def main():
    if request.method == "GET":
        return render_template("index.html")

@app.route('/today/', methods=["GET", "POST"])
def today():
    if request.method == "GET":
        return render_template("today.html", competitions = competition.query.filter(competition.date == Today).all())

@app.route('/upcoming/', methods=["GET", "POST"])
def upcoming():
    if request.method == "GET":
        return render_template("upcoming.html", competitions = competition.query.filter(competition.date > Today).all())

@app.route('/past/', methods=["GET", "POST"])
def past():
    if request.method == "GET":
        return render_template("past.html", competitions = competition.query.filter(competition.date < Today).all())

@app.route('/')
def index():
    return render_template("landing.html")

@app.route('/form/', methods=['GET', 'POST'])
def form():
    if request.method == 'POST':
        detail = competition(name=request.form["name"], date=request.form["date"], location=request.form["location"], competing=request.form["competing"], start=request.form["start"], end=request.form["end"])
        db.session.add(detail)
        db.session.commit()
        return redirect(url_for('main'))
    return render_template("form.html")

@app.route('/today/delete/<int:id>/', methods=['GET', 'POST'])
def delete(id):
    Item = competition.query.get_or_404(id)
    db.session.delete(Item)
    db.session.commit()
    return redirect(url_for('today'))
    return render_template("form.html")

@app.route('/upcoming/delete/<int:id>/', methods=['GET', 'POST'])
def Upcomingdelete(id):
    Item = competition.query.get_or_404(id)
    db.session.delete(Item)
    db.session.commit()
    return redirect(url_for('upcoming'))
    return render_template("form.html")

@app.route('/past/delete/<int:id>/', methods=['GET', 'POST'])
def Pastdelete(id):
    Item = competition.query.get_or_404(id)
    db.session.delete(Item)
    db.session.commit()
    return redirect(url_for('past'))
    return render_template("form.html")
