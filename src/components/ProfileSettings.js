import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaLock, FaBell, FaGlobe, FaShieldAlt, FaSignOutAlt } from 'react-icons/fa';
import { profileService } from '../services/mockProfileService';
import { useAuth } from '../hooks/useAuth';

const SettingsWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 800px;
  margin: 0 auto;
`;

const SettingsHeader = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xlarge};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SettingsNav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.large};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const NavItem = styled.button`
  background: none;
  border: none;
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: ${({ theme }) => theme.spacing.small} 0;
  cursor: pointer;
  border-bottom: 2px solid ${({ theme, active }) => active ? theme.colors.primary : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SettingsContent = styled.div`
  // Add any specific styling for the content area
`;

const SettingSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const SettingTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.medium} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const SettingInput = styled.input`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const SettingToggle = styled.input`
  // Add toggle switch styling
`;

const SaveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const { user } = useAuth();
  const [accountInfo, setAccountInfo] = useState({
    username: user.username,
    language: 'English',
  });
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'Public',
    showOnlineStatus: true,
  });
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
  });

  const handleSaveChanges = async () => {
    try {
      await profileService.updateAccountInfo(user.id, accountInfo);
      await profileService.updatePrivacySettings(user.id, privacySettings);
      await profileService.updateNotificationPreferences(user.id, notificationPreferences);
      await profileService.updateSecuritySettings(user.id, securitySettings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <SettingSection>
            <SettingTitle>Account Information</SettingTitle>
            <SettingItem>
              <SettingLabel><FaUser /> Username</SettingLabel>
              <SettingInput
                type="text"
                value={accountInfo.username}
                onChange={(e) => setAccountInfo({ ...accountInfo, username: e.target.value })}
              />
            </SettingItem>
            <SettingItem>
              <SettingLabel><FaLock /> Password</SettingLabel>
              <SettingInput type="password" placeholder="••••••••" />
            </SettingItem>
            <SettingItem>
              <SettingLabel><FaGlobe /> Language</SettingLabel>
              <select
                value={accountInfo.language}
                onChange={(e) => setAccountInfo({ ...accountInfo, language: e.target.value })}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </SettingItem>
          </SettingSection>
        );
      case 'privacy':
        return (
          <SettingSection>
            <SettingTitle>Privacy Settings</SettingTitle>
            <SettingItem>
              <SettingLabel>Profile Visibility</SettingLabel>
              <select
                value={privacySettings.profileVisibility}
                onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
              >
                <option>Public</option>
                <option>Friends Only</option>
                <option>Private</option>
              </select>
            </SettingItem>
            <SettingItem>
              <SettingLabel>Show Online Status</SettingLabel>
              <SettingToggle
                type="checkbox"
                checked={privacySettings.showOnlineStatus}
                onChange={(e) => setPrivacySettings({ ...privacySettings, showOnlineStatus: e.target.checked })}
              />
            </SettingItem>
          </SettingSection>
        );
      case 'notifications':
        return (
          <SettingSection>
            <SettingTitle>Notification Preferences</SettingTitle>
            <SettingItem>
              <SettingLabel>Email Notifications</SettingLabel>
              <SettingToggle
                type="checkbox"
                checked={notificationPreferences.emailNotifications}
                onChange={(e) => setNotificationPreferences({ ...notificationPreferences, emailNotifications: e.target.checked })}
              />
            </SettingItem>
            <SettingItem>
              <SettingLabel>Push Notifications</SettingLabel>
              <SettingToggle
                type="checkbox"
                checked={notificationPreferences.pushNotifications}
                onChange={(e) => setNotificationPreferences({ ...notificationPreferences, pushNotifications: e.target.checked })}
              />
            </SettingItem>
          </SettingSection>
        );
      case 'security':
        return (
          <SettingSection>
            <SettingTitle>Security Settings</SettingTitle>
            <SettingItem>
              <SettingLabel>Two-Factor Authentication</SettingLabel>
              <SettingToggle
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
              />
            </SettingItem>
            <SettingItem>
              <SettingLabel>Login History</SettingLabel>
              <button onClick={() => profileService.getLoginHistory(user.id)}>View History</button>
            </SettingItem>
          </SettingSection>
        );
      default:
        return null;
    }
  };

  return (
    <SettingsWrapper>
      <SettingsHeader>Profile Settings</SettingsHeader>
      <SettingsNav>
        <NavItem active={activeTab === 'account'} onClick={() => setActiveTab('account')}>
          <FaUser /> Account
        </NavItem>
        <NavItem active={activeTab === 'privacy'} onClick={() => setActiveTab('privacy')}>
          <FaShieldAlt /> Privacy
        </NavItem>
        <NavItem active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')}>
          <FaBell /> Notifications
        </NavItem>
        <NavItem active={activeTab === 'security'} onClick={() => setActiveTab('security')}>
          <FaLock /> Security
        </NavItem>
      </SettingsNav>
      <SettingsContent>
        {renderContent()}
      </SettingsContent>
      <SaveButton onClick={handleSaveChanges}>Save Changes</SaveButton>
    </SettingsWrapper>
  );
};

export default ProfileSettings;