import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FaCamera, FaEdit, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaTrophy, FaStar, FaPlus, FaTimes } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ProfileWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;
`;

const CoverPhoto = styled.div`
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const CoverPhotoButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

const ProfileInfo = styled.div`
  padding: 20px;
  position: relative;
`;

const ProfilePicture = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.surfaceLight};
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  position: absolute;
  top: -75px;
  left: 20px;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
`;

const ProfileName = styled.h1`
  margin-top: 80px;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ProfileBio = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const EditProfileButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 10px 20px;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: ${({ theme }) => theme.transitions.fast};
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  margin-top: 30px;
  animation: ${slideIn} 0.5s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: 15px;
`;

const ActivityFeed = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ActivityItem = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 15px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const TopGames = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const GameCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const GameImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const GameInfo = styled.div`
  padding: 10px;
`;

const GameTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  margin: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const GameRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.accent};
  margin-top: 5px;
`;

const SkillsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Skill = styled.span`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: 5px 10px;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.small};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.large};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  color: ${({ theme }) => theme.colors.primary};
`;

const SkillEditor = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const SkillInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
`;

const AddSkillButton = styled.button`
  background-color: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
`;

const GameRatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StarIcon = styled(FaStar)`
  color: ${({ filled, theme }) => filled ? theme.colors.warning : theme.colors.lightGrey};
  cursor: pointer;
`;

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([]);

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
        setSkills(profileResponse.data.skills || []);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleRateGame = (gameId, rating) => {
    setGames(games.map(game => 
      game.id === gameId ? { ...game, rating } : game
    ));
  };

  if (loading) return <LoadingSpinner>Loading...</LoadingSpinner>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!profile) return <ErrorMessage>Profile not found.</ErrorMessage>;

  return (
    <ProfileWrapper>
      <CoverPhoto src={profile.coverPhoto}>
        <CoverPhotoButton>
          <FaCamera /> Change Cover
        </CoverPhotoButton>
      </CoverPhoto>
      <ProfileInfo>
        <ProfilePicture src={profile.profilePicture} />
        <ProfileName>{profile.name}</ProfileName>
        <ProfileBio>{profile.bio}</ProfileBio>
        <ProfileDetails>
          <DetailItem>
            <FaMapMarkerAlt /> {profile.location}
          </DetailItem>
          <DetailItem>
            <FaBriefcase /> {profile.occupation}
          </DetailItem>
          <DetailItem>
            <FaCalendarAlt /> Joined {new Date(profile.joinDate).toLocaleDateString()}
          </DetailItem>
          <DetailItem>
            <FaTrophy /> {games.length} Games Created
          </DetailItem>
        </ProfileDetails>
        <EditProfileButton>
          <FaEdit /> Edit Profile
        </EditProfileButton>

        <Section>
          <SectionTitle>Skills</SectionTitle>
          <SkillsSection>
            {skills.map((skill, index) => (
              <Skill key={index}>
                {skill}
                <FaTimes onClick={() => handleRemoveSkill(skill)} style={{ cursor: 'pointer' }} />
              </Skill>
            ))}
          </SkillsSection>
          <SkillEditor>
            <SkillInput
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
            />
            <AddSkillButton onClick={handleAddSkill}>
              <FaPlus />
            </AddSkillButton>
          </SkillEditor>
        </Section>

        <Section>
          <SectionTitle>Top Games</SectionTitle>
          <TopGames>
            {games.map(game => (
              <GameCard key={game.id}>
                <GameImage src={game.thumbnail || `https://source.unsplash.com/random/200x120?game=${game.id}`} alt={game.title} />
                <GameInfo>
                  <GameTitle>{game.title}</GameTitle>
                  <GameRatingWrapper>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        filled={star <= game.rating}
                        onClick={() => handleRateGame(game.id, star)}
                      />
                    ))}
                    <span>{game.rating.toFixed(1)}</span>
                  </GameRatingWrapper>
                </GameInfo>
              </GameCard>
            ))}
          </TopGames>
        </Section>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityFeed>
            {games.map(game => (
              <ActivityItem key={game.id}>
                Created a new game: "{game.title}"
              </ActivityItem>
            ))}
          </ActivityFeed>
        </Section>
      </ProfileInfo>
    </ProfileWrapper>
  );
};

export default Profile;