import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import ProfileHeader from './ProfileComponents/ProfileHeader';
import SkillsSection from './ProfileComponents/SkillsSection';
import GamesSection from './ProfileComponents/GamesSection';
import ActivityFeed from './ProfileComponents/ActivityFeed';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import Skeleton from './SkeletonLoader';
import { FaUser, FaGamepad, FaHistory, FaChartBar, FaTrophy, FaUsers, FaStar } from 'react-icons/fa';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useToast } from '../hooks/useToast';
import ProfileSettings from './ProfileSettings';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ProfileWrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
`;

const ProfileContent = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.large};
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.large};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  transition: ${({ theme }) => theme.transitions.fast};
  height: ${props => props.scrollable ? '400px' : 'auto'};
  overflow-y: ${props => props.scrollable ? 'auto' : 'visible'};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
    transform: translateY(-2px);
  }

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
    border: 3px solid ${({ theme }) => theme.colors.background};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.small} 0;
  z-index: 1;
`;

const SkeletonSection = styled(Section)`
  height: 200px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.medium};
`;

const StatItem = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  text-align: center;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.small};
  }
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const DraggableSection = ({ id, children, index, moveSection }) => {
  const [, ref] = useDrag({
    type: 'section',
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: 'section',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return <div ref={(node) => ref(drop(node))}>{children}</div>;
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sectionOrder, setSectionOrder] = useState(['skills', 'stats', 'games', 'activity']);
  const addToast = useToast();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [profileResponse, gamesResponse] = await Promise.all([
          axios.get('http://localhost:3001/profiles/aa09'),
          axios.get('http://localhost:3001/games?creatorId=aa09')
        ]);

        setProfile(profileResponse.data);
        setGames(gamesResponse.data);
        addToast('success', 'Profile data loaded successfully');
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError("Failed to load profile data. Please try again later.");
        addToast('error', "Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [addToast]);

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      const response = await axios.put(`http://localhost:3001/profiles/${profile.id}`, updatedProfile);
      setProfile(response.data);
      addToast('success', 'Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError("Failed to update profile. Please try again.");
      addToast('error', 'Failed to update profile');
    }
  };

  const handleUpdateGame = async (updatedGame) => {
    try {
      const response = await axios.put(`http://localhost:3001/games/${updatedGame.id}`, updatedGame);
      setGames(games.map(game => game.id === updatedGame.id ? response.data : game));
      addToast('success', 'Game updated successfully');
    } catch (error) {
      console.error('Error updating game:', error);
      setError("Failed to update game. Please try again.");
      addToast('error', 'Failed to update game');
    }
  };

  const moveSection = (fromIndex, toIndex) => {
    const updatedOrder = [...sectionOrder];
    const [movedSection] = updatedOrder.splice(fromIndex, 1);
    updatedOrder.splice(toIndex, 0, movedSection);
    setSectionOrder(updatedOrder);
    addToast('info', 'Section order updated');
  };

  const renderSkeletonProfile = () => (
    <ProfileWrapper>
      <SkeletonSection>
        <Skeleton.Rect height="200px" />
      </SkeletonSection>
      <ProfileContent>
        <SkeletonSection>
          <SectionTitle>Skills</SectionTitle>
          <Skeleton.Line height="20px" width="100%" />
          <Skeleton.Line height="20px" width="80%" />
          <Skeleton.Line height="20px" width="60%" />
        </SkeletonSection>
        <SkeletonSection>
          <SectionTitle>User Statistics</SectionTitle>
          <StatGrid>
            {[...Array(4)].map((_, index) => (
              <Skeleton.Rect key={index} height="80px" />
            ))}
          </StatGrid>
        </SkeletonSection>
        <SkeletonSection>
          <SectionTitle>Top Games</SectionTitle>
          <Skeleton.Rect height="100px" />
          <Skeleton.Line height="20px" width="60%" />
          <Skeleton.Line height="16px" width="40%" />
        </SkeletonSection>
        <SkeletonSection>
          <SectionTitle>Recent Activity</SectionTitle>
          <Skeleton.Line height="16px" width="100%" />
          <Skeleton.Line height="16px" width="80%" />
          <Skeleton.Line height="16px" width="90%" />
        </SkeletonSection>
      </ProfileContent>
    </ProfileWrapper>
  );

  if (loading) return renderSkeletonProfile();
  if (error) return <ErrorMessage message={error} />;
  if (!profile) return <ErrorMessage message="Profile not found." />;

  const sections = {
    skills: (
      <Section>
        <SectionTitle>
          <FaUser />
          Skills
        </SectionTitle>
        <SkillsSection
          skills={profile.skills}
          onUpdateSkills={(skills) => handleUpdateProfile({ ...profile, skills })}
        />
      </Section>
    ),
    stats: (
      <Section>
        <SectionTitle>
          <FaChartBar />
          User Statistics
        </SectionTitle>
        <StatGrid>
          <StatItem>
            <StatValue>{games.length}</StatValue>
            <StatLabel>Games Created</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{profile.followers || 0}</StatValue>
            <StatLabel>Followers</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{profile.totalPlays || 0}</StatValue>
            <StatLabel>Total Game Plays</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{profile.averageRating || 0}/5</StatValue>
            <StatLabel>Average Game Rating</StatLabel>
          </StatItem>
        </StatGrid>
      </Section>
    ),
    games: (
      <Section scrollable>
        <SectionTitle>
          <FaGamepad />
          Top Games
        </SectionTitle>
        <GamesSection
          games={games}
          onUpdateGame={handleUpdateGame}
        />
      </Section>
    ),
    activity: (
      <Section scrollable>
        <SectionTitle>
          <FaHistory />
          Recent Activity
        </SectionTitle>
        <ActivityFeed activities={games.map(game => ({
          id: game.id,
          content: `Created a new game: "${game.title}"`,
          timestamp: game.createdAt
        }))} />
      </Section>
    ),
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ProfileWrapper>
        <ProfileHeader
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onShowSettings={() => setShowSettings(true)}
        />
        {showSettings ? (
          <ProfileSettings />
        ) : (
          <ProfileContent>
            {sectionOrder.map((sectionId, index) => (
              <DraggableSection
                key={sectionId}
                id={sectionId}
                index={index}
                moveSection={moveSection}
              >
                {sections[sectionId]}
              </DraggableSection>
            ))}
          </ProfileContent>
        )}
      </ProfileWrapper>
    </DndProvider>
  );
};

export default Profile;