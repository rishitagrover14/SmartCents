// src/components/SelectItems.js
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './selectItems.css';

const SelectItems = ({ items, necessities, wants, onDragEnd }) => {
  return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='dragDropMain'>
          <Droppable droppableId="items">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='container1'>
                  <h3>Items</h3>
                  {items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  padding: '1em',
                                  margin: '0.5em',
                                  border: '1px solid #145224',
                                  backgroundColor: '#b1f7c3a0',
                                  borderRadius: '5px',
                                  ...provided.draggableProps.style,
                                }}
                            >
                              {item.name}
                            </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
            )}
          </Droppable>

          <Droppable droppableId="necessities">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='container1'>
                  <h3>Necessities</h3>
                  {necessities.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  padding: '1em',
                                  margin: '0.5em',
                                  border: '1px solid #145224',
                                  backgroundColor: '#b1f7c3a0',
                                  borderRadius: '5px',
                                  ...provided.draggableProps.style,
                                }}
                            >
                              {item.name}
                            </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
            )}
          </Droppable>

          <Droppable droppableId="wants">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className='container1'>
                  <h3>Wants</h3>
                  {wants.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  padding: '1em',
                                  margin: '0.5em',
                                  border: '1px solid #145224',
                                  backgroundColor: '#b1f7c3a0',
                                  borderRadius: '5px',
                                  ...provided.draggableProps.style,
                                }}
                            >
                              {item.name}
                            </div>
                        )}
                      </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
  );
};

export default SelectItems;
