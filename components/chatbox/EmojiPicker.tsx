import React from 'react';
import { Box } from '@mui/material';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

interface EmojiPickerProps {
  visible: boolean;
  addSticker: (emoji: { id: string; name: string; native: string }) => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ visible, addSticker }) => (
  visible ? (
    <Box sx={{ position: 'absolute', bottom: 20, right: 20 }}>
      <Picker
        onEmojiSelect={addSticker}
        data={data}
        style={{ width: 'auto', position: 'absolute', bottom: '100px', left: '20px' }}
      />
    </Box>
  ) : null
);

export default EmojiPicker;
