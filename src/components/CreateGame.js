import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Matter from 'matter-js';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const GameEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
  position: relative;
  width: 100%;
  height: 700px;
`;

const CanvasWrapper = styled.div`
  width: 600px;
  height: 400px;
  position: relative;
  margin: 0 auto;
`;

const Canvas = styled.div`
  width: 600px;
  height: 400px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  position: absolute;
  top: 0;
  left: 0;
`;

const EditorLayout = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Sidebar = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.medium};
`;

const Panel = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
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
`;

const LayerItem = styled.div`
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.surfaceLight};
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  cursor: pointer;
`;

const entityTypes = {
  circle: (x, y, size) => Matter.Bodies.circle(x, y, size / 2),
  rectangle: (x, y, size) => Matter.Bodies.rectangle(x, y, size, size / 2),
  triangle: (x, y, size) => {
    const trianglePoints = [
      { x: 0, y: size / 2 },
      { x: -size / 2, y: -size / 2 },
      { x: size / 2, y: -size / 2 }
    ];
    return Matter.Bodies.fromVertices(x, y, [trianglePoints]);
  },
  platform: (x, y, width, height) => Matter.Bodies.rectangle(x, y, width, height, { isStatic: true }),
  star: (x, y, size) => {
    const starPoints = Matter.Vertices.fromPath('0 -50 10 -10 50 -10 20 10 30 50 0 25 -30 50 -20 10 -50 -10 -10 -10');
    return Matter.Bodies.fromVertices(x, y, [starPoints], { scale: size / 100 });
  }
};

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
    gravity: { x: 0, y: 1 },
    backgroundImage: '',
  });
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const entitiesRef = useRef({});

  const initializeEngine = useCallback(() => {
    const engine = Matter.Engine.create({
      gravity: gameProperties.gravity
    });
    const world = engine.world;

    const render = Matter.Render.create({
      engine: engine,
      element: document.getElementById('game-canvas'),
      options: {
        width: 600,
        height: 400,
        wireframes: false,
        background: 'transparent'
      }
    });

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    Matter.World.add(world, mouseConstraint);

    engineRef.current = engine;
    renderRef.current = render;
    entitiesRef.current = {
      physics: { engine: engine, world: world },
      mouseConstraint: { body: mouseConstraint, constraint: mouseConstraint.constraint, mouse: mouse }
    };

    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    return () => {
      Matter.Render.stop(render);
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
      Matter.Runner.stop(runner);
      if (renderRef.current && renderRef.current.canvas) {
        renderRef.current.canvas.remove();
        renderRef.current.canvas = null;
        renderRef.current.context = null;
      }
      renderRef.current = null;
      engineRef.current = null;
      entitiesRef.current = {};
    };
  }, [gameProperties.gravity]);

  useEffect(() => {
    if (!engineRef.current) {
      return initializeEngine();
    }
  }, [initializeEngine]);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.world.gravity = gameProperties.gravity;
    }
  }, [gameProperties.gravity]);

  const addEntity = useCallback((type, x, y, color) => {
    const size = 40;
    const body = entityTypes[type](x, y, size);
    body.render.fillStyle = color;

    Matter.World.add(engineRef.current.world, body);

    const entityId = `entity${Object.keys(entitiesRef.current).length}`;
    const newEntity = {
      id: entityId,
      body: body,
      size: size,
      color: color,
      type: type,
    };

    entitiesRef.current[entityId] = newEntity;
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
      const canvasBounds = document.getElementById('game-canvas').getBoundingClientRect();
      const x = offset.x - canvasBounds.left;
      const y = offset.y - canvasBounds.top;
      addEntity(item.type, x, y, item.color);
    },
  }), [addEntity]);

  const updateSelectedEntity = (property, value) => {
    if (selectedEntity) {
      const updatedEntity = { ...selectedEntity, [property]: value };
      entitiesRef.current[selectedEntity.id] = updatedEntity;
      setSelectedEntity(updatedEntity);

      if (property === 'size') {
        Matter.Body.scale(selectedEntity.body, value / selectedEntity.size, value / selectedEntity.size);
      } else if (property === 'color') {
        selectedEntity.body.render.fillStyle = value;
      }

      setLayers(prevLayers =>
        prevLayers.map(layer => ({
          ...layer,
          entities: layer.entities.map(entity =>
            entity.id === selectedEntity.id ? updatedEntity : entity
          )
        }))
      );
    }
  };

  const handleSave = () => {
    const gameData = {
      title: gameTitle,
      layers: layers.map(layer => ({
        ...layer,
        entities: layer.entities.map(entity => ({
          id: entity.id,
          position: entity.body.position,
          properties: {
            size: entity.size,
            color: entity.color,
            type: entity.type
          }
        }))
      })),
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
        <h2>Create New Game</h2>
        <Input
          type="text"
          value={gameTitle}
          onChange={(e) => setGameTitle(e.target.value)}
          placeholder="Enter game title"
        />
        <EditorLayout>
          <Sidebar>
            <Panel>
              <h3>Entity Library</h3>
              <EntityLibrary>
                <DraggableEntity type="circle" color="red" />
                <DraggableEntity type="rectangle" color="blue" />
                <DraggableEntity type="triangle" color="green" />
                <DraggableEntity type="platform" color="gray" />
                <DraggableEntity type="star" color="yellow" />
              </EntityLibrary>
            </Panel>
            <Panel>
              <h3>Layers</h3>
              {layers.map(layer => (
                <LayerItem
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  style={{ backgroundColor: activeLayer === layer.id ? '#e0e0e0' : 'transparent' }}
                >
                  {layer.name}
                </LayerItem>
              ))}
              <Button onClick={addLayer}>Add Layer</Button>
            </Panel>
            <Panel>
              <h3>Game Properties</h3>
              <Input
                type="number"
                value={gameProperties.gravity.y}
                onChange={(e) => setGameProperties({
                  ...gameProperties,
                  gravity: { ...gameProperties.gravity, y: Number(e.target.value) }
                })}
                placeholder="Gravity Y"
              />
              <Input
                type="text"
                value={gameProperties.backgroundImage}
                onChange={(e) => setGameProperties({
                  ...gameProperties,
                  backgroundImage: e.target.value
                })}
                placeholder="Background Image URL"
              />
            </Panel>
          </Sidebar>
          <CanvasWrapper>
            <Canvas id="game-canvas" ref={drop} />
          </CanvasWrapper>
          <Panel>
            <h3>Properties</h3>
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
          </Panel>
        </EditorLayout>
        <Button onClick={handleSave}>Save Game</Button>
      </GameEditorWrapper>
    </DndProvider>
  );
};

CreateGame.propTypes = {
  onGameCreated: PropTypes.func.isRequired,
};

export default CreateGame;