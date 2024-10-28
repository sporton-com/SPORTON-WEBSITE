// components/ActionButtons.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { IconSend2, IconMicrophone } from '@tabler/icons-react';

interface ActionButtonsProps {
  inputValue: string;
  handleMessageSend: () => void;
  recording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ inputValue, handleMessageSend, recording, startRecording, stopRecording }) => (
  <>
    <motion.div whileTap={{ scale: 0.9 }}>
      <IconButton color="primary" onClick={handleMessageSend} disabled={!inputValue.trim()}>
        <IconSend2 className="text-primary-500" />
      </IconButton>
    </motion.div>

    <motion.div whileTap={{ scale: 0.9 }}>
      <IconButton
        onClick={recording ? stopRecording : startRecording}
        sx={{
          color: 'white',
          bgcolor: recording ? 'red' : 'blue',
          '&:hover': { bgcolor: recording ? 'darkred' : 'darkblue' },
        }}
      >
        <IconMicrophone />
      </IconButton>
    </motion.div>
  </>
);

export default ActionButtons;
