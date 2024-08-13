import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ProfileHeader from './ProfileComponents/ProfileHeader';
import SkillsSection from './ProfileComponents/SkillsSection';
import GamesSection from './ProfileComponents/GamesSection';
import ActivityFeed from './ProfileComponents/ActivityFeed';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const ProfileWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow: hidden;
`;

const ProfileContent = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Section = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xlarge};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      const response = await axios.put(`http://localhost:3001/profiles/${profile.id}`, updatedProfile);
      setProfile(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError("Failed to update profile. Please try again.");
    }
  };

  const handleUpdateGame = async (updatedGame) => {
    try {
      const response = await axios.put(`http://localhost:3001/games/${updatedGame.id}`, updatedGame);
      setGames(games.map(game => game.id === updatedGame.id ? response.data : game));
    } catch (error) {
      console.error('Error updating game:', error);
      setError("Failed to update game. Please try again.");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!profile) return <ErrorMessage message="Profile not found." />;

  return (
    <ProfileWrapper>
      <ProfileHeader
        profile={profile}
        onUpdateProfile={handleUpdateProfile}
      />
      <ProfileContent>
        <Section>
          <SectionTitle>Skills</SectionTitle>
          <SkillsSection
            skills={profile.skills}
            onUpdateSkills={(skills) => handleUpdateProfile({ ...profile, skills })}
          />
        </Section>

        <Section>
          <SectionTitle>Top Games</SectionTitle>
          <GamesSection
            games={games}
            onUpdateGame={handleUpdateGame}
          />
        </Section>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityFeed activities={games.map(game => ({
            id: game.id,
            content: `Created a new game: "${game.title}"`,
            timestamp: game.createdAt
          }))} />
        </Section>
      </ProfileContent>
    </ProfileWrapper>
  );
};

export default Profile;