import React from 'react';
import  Draggable  from 'react-draggable';
import { Typography } from '@mui/material';

interface DraggableTextProps {
  text: string;
  position: { x: number; y: number };
  onDrag: (position: { x: number; y: number }) => void;
}

const DraggableText: React.FC<DraggableTextProps> = ({ text, position, onDrag }) => (
  <Draggable position={position} onDrag={(e, data) => onDrag({ x: data.x, y: data.y })}>
    <Typography
      variant="h6"
      sx={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        cursor: 'move',
        color: 'white',
        textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
      }}
    >
      {text}
    </Typography>
  </Draggable>
);

export default DraggableText;
