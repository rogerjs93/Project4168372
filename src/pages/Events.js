import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaPlus, FaClock, FaMapMarkerAlt, FaSearch, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const EventsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const CreateEventButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.small};
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  &:focus {
    outline: none;
  }
`;

const EventsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const EventCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const EventName = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-bottom: ${({ theme }) => theme.spacing.tiny};
`;

const AttendButton = styled.button`
  width: 100%;
  background-color: ${({ theme, isAttending }) => isAttending ? theme.colors.secondary : theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.small};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme, isAttending }) => isAttending ? theme.colors.secondaryDark : theme.colors.primaryDark};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => theme.colors.errorLight};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.medium} auto;
  display: block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  // Mock events data (commented out for future reference)
  const mockEvents = [
    { id: 1, name: 'Summer Music Festival', image: 'https://picsum.photos/id/158/300/100', date: '2023-07-15', time: '14:00', location: 'Central Park' },
    { id: 2, name: 'Tech Conference 2023', image: 'https://picsum.photos/id/180/300/100', date: '2023-08-22', time: '09:00', location: 'Convention Center' },
    { id: 3, name: 'Charity Run', image: 'https://picsum.photos/id/195/300/100', date: '2023-09-10', time: '07:30', location: 'City Stadium' },
  ];

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Uncomment the following line when connecting to a real server
      // const response = await axios.get('http://localhost:3001/events');
      // setEvents(response.data);
      
      // For now, use mock data
      setEvents(mockEvents);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = useCallback(() => {
    // Implement event creation logic here
    console.log('Create new event');
  }, []);

  const handleAttendEvent = useCallback(async (eventId, isAttending) => {
    try {
      if (isAttending) {
        // Uncomment the following line when connecting to a real server
        // await axios.delete(`http://localhost:3001/events/${eventId}/attendees/${user.id}`);
      } else {
        // Uncomment the following line when connecting to a real server
        // await axios.post(`http://localhost:3001/events/${eventId}/attendees`, { userId: user.id });
      }
      fetchEvents();
    } catch (err) {
      console.error('Error updating event attendance:', err);
      setError(`Failed to ${isAttending ? 'leave' : 'join'} event. Please try again.`);
    }
  }, [user.id, fetchEvents]);

  const filteredEvents = useMemo(() => 
    events.filter(event =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [events, searchTerm]
  );

  return (
    <EventsWrapper>
      <Header>
        <FaCalendarAlt />
        Events
      </Header>
      {error && (
        <ErrorMessage>
          <FaExclamationCircle /> {error}
        </ErrorMessage>
      )}
      <ActionsBar>
        <CreateEventButton onClick={handleCreateEvent}>
          <FaPlus /> Create New Event
        </CreateEventButton>
        <SearchBar>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search events"
          />
        </SearchBar>
      </ActionsBar>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <EventsList>
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
                onClick={() => handleAttendEvent(event.id, event.isAttending)}
                isAttending={event.isAttending}
              >
                {event.isAttending ? 'Cancel Attendance' : 'Attend Event'}
              </AttendButton>
            </EventCard>
          ))}
        </EventsList>
      )}
    </EventsWrapper>
  );
};

export default Events;