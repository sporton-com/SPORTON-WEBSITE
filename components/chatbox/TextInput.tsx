// components/TextInput.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface TextInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleMessageSend: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ inputValue, setInputValue, handleMessageSend }) => (
  <TextField
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    placeholder="Type a message"
    variant="outlined"
    size="small"
    sx={{ flexGrow: 1, bgcolor: 'white', borderRadius: 1, mr: 1 }}
    onKeyPress={(e) => {
      if (e.key === 'Enter' && inputValue.trim()) handleMessageSend();
    }}
  />
);

export default TextInput;
