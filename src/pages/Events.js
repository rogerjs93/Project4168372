import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaPlus, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const EventsWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
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
  margin-bottom: ${({ theme }) => theme.spacing.large};
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

const Events = () => {
  // Mock events data
  const events = [
    { id: 1, name: 'Summer Music Festival', image: 'https://picsum.photos/id/158/300/100', date: '2023-07-15', time: '14:00', location: 'Central Park' },
    { id: 2, name: 'Tech Conference 2023', image: 'https://picsum.photos/id/180/300/100', date: '2023-08-22', time: '09:00', location: 'Convention Center' },
    { id: 3, name: 'Charity Run', image: 'https://picsum.photos/id/195/300/100', date: '2023-09-10', time: '07:30', location: 'City Stadium' },
    // Add more events as needed
  ];

  return (
    <EventsWrapper>
      <Header>
        <FaCalendarAlt />
        Events
      </Header>
      <CreateEventButton>
        <FaPlus /> Create New Event
      </CreateEventButton>
      <EventsList>
        {events.map(event => (
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
          </EventCard>
        ))}
      </EventsList>
    </EventsWrapper>
  );
};

export default Events;