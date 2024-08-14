import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaSearch, FaCalendarAlt, FaPlus, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    background-color: #f0f2f5;
    color: #1c1e21;
  }
`;

const EventsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1877f2;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateEventButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #166fe5;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: #1c1e21;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const EventCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const EventName = styled.h3`
  color: #1c1e21;
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #65676b;
  font-size: 14px;
  margin-bottom: 4px;
`;

const AttendButton = styled.button`
  background-color: ${({ isAttending }) => isAttending ? '#e4e6eb' : '#1877f2'};
  color: ${({ isAttending }) => isAttending ? '#050505' : '#ffffff'};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  margin-top: 12px;

  &:hover {
    background-color: ${({ isAttending }) => isAttending ? '#d8dadf' : '#166fe5'};
  }
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const generateMockEvents = useCallback(() => {
    return [
      { id: 1, name: 'Summer Music Festival', image: 'https://picsum.photos/id/158/300/150', date: '2023-07-15', time: '14:00', location: 'Central Park', isAttending: false },
      { id: 2, name: 'Tech Conference 2023', image: 'https://picsum.photos/id/180/300/150', date: '2023-08-22', time: '09:00', location: 'Convention Center', isAttending: true },
      { id: 3, name: 'Charity Run', image: 'https://picsum.photos/id/195/300/150', date: '2023-09-10', time: '07:30', location: 'City Stadium', isAttending: false },
      { id: 4, name: 'Art Exhibition Opening', image: 'https://picsum.photos/id/200/300/150', date: '2023-07-20', time: '18:00', location: 'Modern Art Museum', isAttending: false },
      { id: 5, name: 'Food Truck Festival', image: 'https://picsum.photos/id/225/300/150', date: '2023-08-05', time: '11:00', location: 'Downtown Square', isAttending: true },
      { id: 6, name: 'Yoga in the Park', image: 'https://picsum.photos/id/240/300/150', date: '2023-07-22', time: '08:00', location: 'Sunset Park', isAttending: false },
      { id: 7, name: 'Film Festival', image: 'https://picsum.photos/id/250/300/150', date: '2023-09-15', time: '19:00', location: 'City Cinema', isAttending: false },
      { id: 8, name: 'Business Networking Event', image: 'https://picsum.photos/id/260/300/150', date: '2023-08-17', time: '18:30', location: 'Grand Hotel', isAttending: true },
      { id: 9, name: 'Craft Beer Tasting', image: 'https://picsum.photos/id/270/300/150', date: '2023-07-29', time: '16:00', location: 'Local Brewery', isAttending: false },
      { id: 10, name: 'Farmers Market', image: 'https://picsum.photos/id/280/300/150', date: '2023-08-12', time: '09:00', location: 'Community Center', isAttending: false },
      { id: 11, name: 'Book Club Meeting', image: 'https://picsum.photos/id/290/300/150', date: '2023-07-25', time: '19:00', location: 'Public Library', isAttending: true },
      { id: 12, name: 'Jazz Night', image: 'https://picsum.photos/id/300/300/150', date: '2023-08-19', time: '20:00', location: 'Blue Note Club', isAttending: false },
      { id: 13, name: 'Science Fair', image: 'https://picsum.photos/id/310/300/150', date: '2023-09-05', time: '10:00', location: 'Science Museum', isAttending: false },
      { id: 14, name: 'Stand-up Comedy Show', image: 'https://picsum.photos/id/320/300/150', date: '2023-08-26', time: '21:00', location: 'Laugh Factory', isAttending: true },
      { id: 15, name: 'Pet Adoption Day', image: 'https://picsum.photos/id/330/300/150', date: '2023-07-30', time: '11:00', location: 'City Park', isAttending: false },
      { id: 16, name: 'Antique Car Show', image: 'https://picsum.photos/id/340/300/150', date: '2023-08-13', time: '10:00', location: 'Fairgrounds', isAttending: false },
      { id: 17, name: 'Photography Workshop', image: 'https://picsum.photos/id/350/300/150', date: '2023-09-02', time: '14:00', location: 'Art Studio', isAttending: true },
      { id: 18, name: 'Wine Tasting Event', image: 'https://picsum.photos/id/360/300/150', date: '2023-08-11', time: '18:00', location: 'Vineyard', isAttending: false },
      { id: 19, name: 'Salsa Dancing Night', image: 'https://picsum.photos/id/370/300/150', date: '2023-07-28', time: '20:00', location: 'Dance Studio', isAttending: false },
      { id: 20, name: 'Gardening Workshop', image: 'https://picsum.photos/id/380/300/150', date: '2023-08-20', time: '09:00', location: 'Botanical Garden', isAttending: true },
    ];
  }, []);

  useEffect(() => {
    setEvents(generateMockEvents());
  }, [generateMockEvents]);

  const handleAttendEvent = useCallback((eventId) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, isAttending: !event.isAttending }
          : event
      )
    );
  }, []);

  const handleCreateEvent = useCallback(() => {
    // Implement event creation logic here
    console.log('Create new event');
  }, []);

  const filteredEvents = useMemo(() => 
    events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [events, searchTerm]
  );

  return (
    <>
      <GlobalStyle />
      <EventsWrapper>
        <Header>
          <FaCalendarAlt />
          Events
        </Header>
        <ActionsBar>
          <CreateEventButton onClick={handleCreateEvent}>
            <FaPlus /> Create New Event
          </CreateEventButton>
          <SearchBar>
            <FaSearch color="#65676b" />
            <SearchInput
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </ActionsBar>
        <EventsGrid>
          {filteredEvents.map(event => (
            <EventCard key={event.id}>
              <EventImage src={event.image} alt={event.name} />
              <EventName>{event.name}</EventName>
              <EventInfo>
                <FaCalendarAlt /> {event.date}
              </EventInfo>
              <EventInfo>
                <FaClock /> {event.time}
              </EventInfo>
              <EventInfo>
                <FaMapMarkerAlt /> {event.location}
              </EventInfo>
              <AttendButton
                onClick={() => handleAttendEvent(event.id)}
                isAttending={event.isAttending}
              >
                {event.isAttending ? 'Cancel Attendance' : 'Attend Event'}
              </AttendButton>
            </EventCard>
          ))}
        </EventsGrid>
      </EventsWrapper>
    </>
  );
};

export default Events;