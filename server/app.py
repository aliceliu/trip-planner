from flask import Flask, jsonify
from flask import request
from db.trip import Trip
from db.base import Session, engine, Base
from datetime import datetime
from sqlalchemy import nullsfirst, func, or_
from datetime import date


app = Flask(__name__)

session = Session()

# Base.metadata.drop_all(engine)
# Base.metadata.create_all(engine)


@app.route('/trips/', methods=['GET', 'POST'])
def handle_trips():
    if request.method == 'GET':
        filter = request.args.get('filter')
        trips_query = session.query(Trip)
        if filter == 'upcoming':
            trips_query = trips_query.filter(
                or_(
                    Trip.start_date == None,
                    func.date(Trip.start_date) >= date.today())
            ).order_by(nullsfirst(Trip.start_date))
        elif filter == 'past':
            trips_query = trips_query.filter(
                func.date(Trip.start_date) < date.today()).order_by(Trip.start_date.desc())
        trips = trips_query.all()
        result = []
        for trip in trips:
            result.append({
                'id': trip.id,
                'name': trip.name,
                'start_timestamp': trip.start_date,
                'days': len(trip.attractions)
            })

        return jsonify(list(result))

    elif request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        attractions = data.get('attractions')
        start_date = data.get('start_timestamp')
        if start_date:
            start_date = datetime.fromtimestamp(start_date)
        trip = Trip(
            name=name, start_date=start_date, attractions=attractions)
        session.add(trip)
        session.commit()

        return {'id': trip.id}, 201


@app.route('/trips/<id>', methods=['GET', 'POST', 'DELETE'])
def handle_trips_with_id(id):
    if request.method == 'GET':
        trip = session.query(Trip).filter_by(id=id).one_or_none()
        if not trip:
            return {}
        return {
            'name': trip.name,
            'attractions': trip.attractions,
            'start_timestamp': trip.start_date
        }

    elif request.method == 'POST':
        trip = session.query(Trip).filter_by(id=id).one()
        data = request.get_json()
        start_date = data.get('start_timestamp')
        if start_date:
            start_date = datetime.fromtimestamp(start_date)
        trip.name = data.get('name')
        trip.start_date = start_date
        trip.attractions = data.get('attractions')
        session.commit()

        return {'id': trip.id}

    elif request.method == 'DELETE':
        trip = session.query(Trip).filter_by(id=id).one()
        session.delete(trip)
        session.commit()
        return {'id': trip.id}
