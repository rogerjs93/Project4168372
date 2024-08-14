import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGem, FaStar, FaLock, FaSearch, FaFilter, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const CollectiblesWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const ControlsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
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
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing.small};
  width: 200px;

  &:focus {
    outline: none;
  }
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSizes.medium};
`;

const CollectibleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.large};
`;

const CollectibleCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  text-align: center;
  position: relative;
  transition: ${({ theme }) => theme.transitions.medium};
  animation: ${fadeIn} 0.3s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
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

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: ${({ theme }) => theme.fontSizes.large};
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => theme.spacing.large} auto;
  display: block;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GameCollectibles = () => {
  const [collectibles, setCollectibles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchCollectibles = useCallback(async () => {
    setLoading(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data (replace with actual API call when available)
      const mockCollectibles = [
        { id: 1, name: 'Golden Sword', rarity: 5, obtained: true },
        { id: 2, name: 'Magic Amulet', rarity: 4, obtained: true },
        { id: 3, name: 'Dragon Egg', rarity: 5, obtained: false },
        { id: 4, name: 'Ancient Scroll', rarity: 3, obtained: true },
        { id: 5, name: 'Mystic Orb', rarity: 4, obtained: false },
        { id: 6, name: 'Phoenix Feather', rarity: 5, obtained: false },
      ];
      setCollectibles(mockCollectibles);

      // Uncomment the following lines when connecting to a real server
      // const response = await axios.get('http://localhost:3001/collectibles');
      // setCollectibles(response.data);
    } catch (error) {
      console.error('Error fetching collectibles:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollectibles();
  }, [fetchCollectibles]);

  const filteredCollectibles = collectibles.filter(collectible => 
    collectible.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === 'all' || (filter === 'obtained' && collectible.obtained) || (filter === 'locked' && !collectible.obtained))
  );

  return (
    <CollectiblesWrapper>
      <Header>
        <FaGem />
        Game Collectibles
      </Header>
      <ControlsWrapper>
        <SearchBar>
          <FaSearch />
          <SearchInput
            type="text"
            placeholder="Search collectibles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBar>
        <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Collectibles</option>
          <option value="obtained">Obtained</option>
          <option value="locked">Locked</option>
        </FilterSelect>
      </ControlsWrapper>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <CollectibleGrid>
          {filteredCollectibles.map((collectible) => (
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
      )}
    </CollectiblesWrapper>
  );
};

export default GameCollectibles;