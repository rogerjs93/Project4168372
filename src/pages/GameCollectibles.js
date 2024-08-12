import React from 'react';
import styled from 'styled-components';
import { FaGem, FaStar, FaLock } from 'react-icons/fa';

const CollectiblesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CollectibleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
  margin-top: ${({ theme }) => theme.spacing.large};
`;

const CollectibleCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  text-align: center;
  position: relative;
`;

const CollectibleIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme, obtained }) => obtained ? theme.colors.primary : theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.small};
`;

const CollectibleName = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CollectibleRarity = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.tiny};
  color: ${({ theme }) => theme.colors.accent};
`;

const LockedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const GameCollectibles = () => {
  const collectibles = [
    { id: 1, name: 'Golden Sword', rarity: 5, obtained: true },
    { id: 2, name: 'Magic Amulet', rarity: 4, obtained: true },
    { id: 3, name: 'Dragon Egg', rarity: 5, obtained: false },
    { id: 4, name: 'Ancient Scroll', rarity: 3, obtained: true },
    { id: 5, name: 'Mystic Orb', rarity: 4, obtained: false },
    { id: 6, name: 'Phoenix Feather', rarity: 5, obtained: false },
  ];

  return (
    <CollectiblesWrapper>
      <Header>
        <FaGem />
        Game Collectibles
      </Header>
      <CollectibleGrid>
        {collectibles.map((collectible) => (
          <CollectibleCard key={collectible.id}>
            <CollectibleIcon obtained={collectible.obtained}>
              <FaGem />
            </CollectibleIcon>
            <CollectibleName>{collectible.name}</CollectibleName>
            <CollectibleRarity>
              {[...Array(collectible.rarity)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </CollectibleRarity>
            {!collectible.obtained && (
              <LockedOverlay>
                <FaLock size={24} color="white" />
              </LockedOverlay>
            )}
          </CollectibleCard>
        ))}
      </CollectibleGrid>
    </CollectiblesWrapper>
  );
};

export default GameCollectibles;