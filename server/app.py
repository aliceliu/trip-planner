from flask import Flask, jsonify
from flask import request
from db.trip import Trip
from db.base import Session, engine, Base
from datetime import datetime

app = Flask(__name__)

session = Session()

# Base.metadata.drop_all(engine)
# Base.metadata.create_all(engine)


@app.route('/trips/', methods=['POST'])
def create_trip():
    data = request.get_json()
    attractions = data.get('attractions')
    start_date = data.get('start_timestamp')
    if start_date:
        start_date = datetime.fromtimestamp(start_date)
    trip = Trip(
        start_date=start_date, attractions=attractions)
    session.add(trip)
    session.commit()

    return {'id': trip.id}, 201


@app.route('/trips/<id>', methods=['GET', 'POST'])
def get_trip(id):
    if request.method == 'GET':
        trip = session.query(Trip).filter_by(id=id).one_or_none()
        result = []
        if trip:
            result = {
                'attractions': trip.attractions,
            }
            if trip.start_date:
                result['start_timestamp'] = trip.start_date
        return jsonify(result)

    elif request.method == 'POST':
        trip = session.query(Trip).filter_by(id=id).one()
        data = request.get_json()
        start_date = data.get('start_timestamp')
        if start_date:
            start_date = datetime.fromtimestamp(start_date)
        trip.start_date = start_date
        trip.attractions = data.get('attractions')
        session.commit()

        return {'id': trip.id}
