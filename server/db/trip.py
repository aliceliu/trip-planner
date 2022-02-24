from sqlalchemy import JSON, Column, String, Integer, DateTime

from db.base import Base


class Trip(Base):
    __tablename__ = 'itinerary'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    start_date = Column(DateTime)
    attractions = Column(JSON)

    def __repr__(self) -> str:
        return f'id: {self.id} name: {self.name} start_date: {self.start_date} attractions: {self.attractions}'
