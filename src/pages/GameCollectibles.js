import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaGem, FaStar, FaLock, FaSearch, FaFilter, FaPlus } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const CollectiblesWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
`;

const ActionsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CreateCollectibleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 20px;
  padding: 8px 16px;
  box-shadow: ${({ theme }) => theme.boxShadow.small};
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  flex-grow: 1;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const FilterSelect = styled.select`
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 14px;
  margin-left: 10px;
`;

const CollectibleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const CollectibleCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-radius: 8px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  transition: box-shadow 0.3s ease;
  text-align: center;
  position: relative;

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const CollectibleIcon = styled.div`
  font-size: 2rem;
  color: ${({ obtained, theme }) => obtained ? theme.colors.primary : theme.colors.textSecondary};
  margin-bottom: 8px;
`;

const CollectibleName = styled.h3`
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
`;

const CollectibleRarity = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.warning};
`;

const LockedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => `${theme.colors.surfaceDark}80`};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

const GameCollectibles = () => {
  const [collectibles, setCollectibles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const generateMockCollectibles = useCallback(() => {
    // This function will be replaced with actual API call when connecting to a real server
    return [
      { id: 1, name: 'Golden Sword', rarity: 5, obtained: true },
      { id: 2, name: 'Magic Amulet', rarity: 4, obtained: true },
      { id: 3, name: 'Dragon Egg', rarity: 5, obtained: false },
      { id: 4, name: 'Ancient Scroll', rarity: 3, obtained: true },
      { id: 5, name: 'Mystic Orb', rarity: 4, obtained: false },
      { id: 6, name: 'Phoenix Feather', rarity: 5, obtained: false },
      { id: 7, name: 'Enchanted Bow', rarity: 4, obtained: true },
      { id: 8, name: 'Wizard Staff', rarity: 5, obtained: false },
      { id: 9, name: 'Invisibility Cloak', rarity: 5, obtained: true },
      { id: 10, name: 'Healing Potion', rarity: 2, obtained: true },
      { id: 11, name: 'Dragonscale Armor', rarity: 5, obtained: false },
      { id: 12, name: 'Flaming Sword', rarity: 4, obtained: true },
      { id: 13, name: 'Ice Crown', rarity: 5, obtained: false },
      { id: 14, name: 'Shadow Dagger', rarity: 4, obtained: true },
      { id: 15, name: 'Philosopher Stone', rarity: 5, obtained: false },
      { id: 16, name: 'Winged Boots', rarity: 3, obtained: true },
      { id: 17, name: 'Cursed Ring', rarity: 4, obtained: false },
      { id: 18, name: 'Mermaid Pearl', rarity: 4, obtained: true },
      { id: 19, name: 'Unicorn Horn', rarity: 5, obtained: false },
      { id: 20, name: 'Goblin Gold', rarity: 3, obtained: true },
      { id: 21, name: 'Fairy Dust', rarity: 3, obtained: true },
      { id: 22, name: 'Titan Gauntlet', rarity: 5, obtained: false },
      { id: 23, name: 'Elven Locket', rarity: 4, obtained: true },
      { id: 24, name: 'Dwarven Hammer', rarity: 4, obtained: false },
      { id: 25, name: 'Siren Flute', rarity: 4, obtained: true },
      { id: 26, name: 'Pegasus Feather', rarity: 5, obtained: false },
      { id: 27, name: 'Vampire Fang', rarity: 3, obtained: true },
      { id: 28, name: 'Werewolf Claw', rarity: 3, obtained: false },
      { id: 29, name: 'Gorgon Eye', rarity: 5, obtained: false },
      { id: 30, name: 'Phoenix Ash', rarity: 4, obtained: true },
    ];
  }, []);

  useEffect(() => {
    setCollectibles(generateMockCollectibles());
  }, [generateMockCollectibles]);

  const handleCreateCollectible = useCallback(() => {
    console.log('Create new collectible');
    // Implement collectible creation logic here
  }, []);

  const filteredCollectibles = useMemo(() => 
    collectibles.filter(collectible => 
      collectible.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === 'all' || (filter === 'obtained' && collectible.obtained) || (filter === 'locked' && !collectible.obtained))
    ),
    [collectibles, searchTerm, filter]
  );

  return (
    <>
      <GlobalStyle />
      <CollectiblesWrapper>
        <Header>
          <FaGem />
          Game Collectibles
        </Header>
        <ActionsBar>
          <CreateCollectibleButton onClick={handleCreateCollectible}>
            <FaPlus /> Create New Collectible
          </CreateCollectibleButton>
          <SearchBar>
            <FaSearch color="#65676b" />
            <SearchInput
              type="text"
              placeholder="Search collectibles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterSelect value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Collectibles</option>
              <option value="obtained">Obtained</option>
              <option value="locked">Locked</option>
            </FilterSelect>
          </SearchBar>
        </ActionsBar>
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
      </CollectiblesWrapper>
    </>
  );
};

export default GameCollectibles;