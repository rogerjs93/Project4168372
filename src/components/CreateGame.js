import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaSave, FaUndo, FaRedo, FaPlus, FaMinus, FaExpandArrowsAlt, FaCompressArrowsAlt } from 'react-icons/fa';

const GameEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Toolbar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const ToolbarButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 1.2rem;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const EditorLayout = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const Panel = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;

const PanelTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.small};
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surfaceLight};
  border: none;
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const EntityLibrary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.small};
`;

const LibraryItem = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  background-color: ${({ theme }) => theme.colors.background};
`;

const CanvasWrapper = styled.div`
  flex-grow: 1;
  position: relative;
  overflow: hidden;
`;

const GameCanvas = styled.canvas`
  background-color: white;
`;

const CanvasControls = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.small};
  right: ${({ theme }) => theme.spacing.small};
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
`;

const StatusBar = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
  font-size: 0.8rem;
`;

const PropertiesPanel = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border-left: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: ${({ theme }) => theme.spacing.medium};
`;

const DraggableEntity = ({ type, color }) => {
  const [, drag] = useDrag(() => ({
    type: 'entity',
    item: { type, color },
  }));

  return (
    <LibraryItem ref={drag} style={{ backgroundColor: color }}>
      {type}
    </LibraryItem>
  );
};

DraggableEntity.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

const CreateGame = ({ onGameCreated }) => {
  const [gameTitle, setGameTitle] = useState('');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [layers, setLayers] = useState([{ id: 1, name: 'Layer 1', entities: [] }]);
  const [activeLayer, setActiveLayer] = useState(1);
  const [gameProperties, setGameProperties] = useState({
    gravity: { x: 0, y: 300 },
    backgroundImage: '',
  });
  const [zoom, setZoom] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const canvasRef = useRef(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    } else {
      setCanvasSize({ width: 800, height: 600 });
    }
  };

  const addEntity = useCallback((type, x, y, color) => {
    const newEntity = {
      id: `entity${Date.now()}`,
      type,
      x,
      y,
      color,
      size: 40,
    };

    setLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === activeLayer
          ? { ...layer, entities: [...layer.entities, newEntity] }
          : layer
      )
    );

    setSelectedEntity(newEntity);
  }, [activeLayer]);

  const [, drop] = useDrop(() => ({
    accept: 'entity',
    drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const canvasBounds = canvasRef.current.getBoundingClientRect();
      const x = offset.x - canvasBounds.left;
      const y = offset.y - canvasBounds.top;
      addEntity(item.type, x, y, item.color);
    },
  }), [addEntity]);

  const updateSelectedEntity = (property, value) => {
    if (selectedEntity) {
      const updatedEntity = { ...selectedEntity, [property]: value };
      setLayers(prevLayers =>
        prevLayers.map(layer => ({
          ...layer,
          entities: layer.entities.map(entity =>
            entity.id === selectedEntity.id ? updatedEntity : entity
          )
        }))
      );
      setSelectedEntity(updatedEntity);
    }
  };

  const handleSave = () => {
    const gameData = {
      title: gameTitle,
      layers,
      gameType: 'custom',
      properties: gameProperties
    };
    console.log('Saving game:', gameData);
    onGameCreated(gameData);
  };

  const addLayer = () => {
    const newLayer = {
      id: layers.length + 1,
      name: `Layer ${layers.length + 1}`,
      entities: []
    };
    setLayers([...layers, newLayer]);
    setActiveLayer(newLayer.id);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <GameEditorWrapper>
        <Toolbar>
          <ToolbarButton onClick={handleSave} title="Save"><FaSave /></ToolbarButton>
          <ToolbarButton title="Undo"><FaUndo /></ToolbarButton>
          <ToolbarButton title="Redo"><FaRedo /></ToolbarButton>
        </Toolbar>
        <EditorLayout>
          <Sidebar>
            <Panel>
              <PanelTitle>Game Properties</PanelTitle>
              <Input
                type="text"
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                placeholder="Enter game title"
              />
              <Input
                type="number"
                value={gameProperties.gravity.y}
                onChange={(e) => setGameProperties({
                  ...gameProperties,
                  gravity: { ...gameProperties.gravity, y: Number(e.target.value) }
                })}
                placeholder="Gravity Y"
              />
            </Panel>
            <Panel>
              <PanelTitle>Entity Library</PanelTitle>
              <EntityLibrary>
                <DraggableEntity type="circle" color="#ff0000" />
                <DraggableEntity type="rectangle" color="#0000ff" />
                <DraggableEntity type="triangle" color="#00ff00" />
                <DraggableEntity type="platform" color="#808080" />
                <DraggableEntity type="star" color="#ffff00" />
              </EntityLibrary>
            </Panel>
            <Panel>
              <PanelTitle>Layers</PanelTitle>
              {layers.map(layer => (
                <div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  style={{ 
                    padding: '5px', 
                    backgroundColor: activeLayer === layer.id ? '#e0e0e0' : 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {layer.name}
                </div>
              ))}
              <Button onClick={addLayer}>Add Layer</Button>
            </Panel>
          </Sidebar>
          <CanvasWrapper ref={drop}>
            <GameCanvas
              ref={canvasRef}
              width={canvasSize.width}
              height={canvasSize.height}
            />
            <CanvasControls>
              <ToolbarButton onClick={handleZoomIn} title="Zoom In"><FaPlus /></ToolbarButton>
              <ToolbarButton onClick={handleZoomOut} title="Zoom Out"><FaMinus /></ToolbarButton>
              <ToolbarButton onClick={handleToggleFullscreen} title="Toggle Fullscreen">
                {isFullscreen ? <FaCompressArrowsAlt /> : <FaExpandArrowsAlt />}
              </ToolbarButton>
            </CanvasControls>
          </CanvasWrapper>
          <PropertiesPanel>
            <PanelTitle>Properties</PanelTitle>
            {selectedEntity && (
              <>
                <Input
                  type="number"
                  value={selectedEntity.size}
                  onChange={(e) => updateSelectedEntity('size', Number(e.target.value))}
                  placeholder="Size"
                />
                <Input
                  type="color"
                  value={selectedEntity.color}
                  onChange={(e) => updateSelectedEntity('color', e.target.value)}
                />
              </>
            )}
          </PropertiesPanel>
        </EditorLayout>
        <StatusBar>
          Zoom: {(zoom * 100).toFixed(0)}% | Active Layer: {layers.find(l => l.id === activeLayer)?.name}
        </StatusBar>
      </GameEditorWrapper>
    </DndProvider>
  );
};

CreateGame.propTypes = {
  onGameCreated: PropTypes.func.isRequired,
};

export default CreateGame;