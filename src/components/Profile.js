import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { FaCamera, FaEdit, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const ProfileWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow: hidden;
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
`;

const ProfileName = styled.h1`
  margin-top: 80px;
  margin-bottom: 10px;
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
`;

const ProfileBio = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 20px;
`;

const ProfileDetails = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${({ theme }) => theme.colors.textSecondary};
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assuming you have a 'profiles' endpoint in your JSON server
        const response = await axios.get(`http://localhost:3001/profiles/${user.id}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (!profile) {
    return <div>Loading...</div>;
  }

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
        </ProfileDetails>
        <EditProfileButton>
          <FaEdit /> Edit Profile
        </EditProfileButton>
      </ProfileInfo>
    </ProfileWrapper>
  );
};

export default Profile;