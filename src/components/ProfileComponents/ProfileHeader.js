import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCamera, FaEdit, FaMapMarkerAlt, FaBriefcase, FaCalendarAlt, FaTrophy } from 'react-icons/fa';

const HeaderWrapper = styled.div`
  position: relative;
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

const ProfileHeader = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  return (
    <HeaderWrapper>
      <CoverPhoto src={profile.coverPhoto}>
        <CoverPhotoButton>
          <FaCamera /> Change Cover
        </CoverPhotoButton>
      </CoverPhoto>
      <ProfileInfo>
        <ProfilePicture src={profile.profilePicture} />
        {isEditing ? (
          <>
            <input
              name="name"
              value={editedProfile.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <textarea
              name="bio"
              value={editedProfile.bio}
              onChange={handleChange}
              placeholder="Bio"
            />
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <ProfileName>{profile.name}</ProfileName>
            <ProfileBio>{profile.bio}</ProfileBio>
          </>
        )}
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
            <FaTrophy /> {profile.gamesCreated} Games Created
          </DetailItem>
        </ProfileDetails>
        <EditProfileButton onClick={handleEdit}>
          <FaEdit /> Edit Profile
        </EditProfileButton>
      </ProfileInfo>
    </HeaderWrapper>
  );
};

export default ProfileHeader;