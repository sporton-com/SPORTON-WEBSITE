import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

interface AspectRatioSelectorProps {
  aspect: number | undefined;
  setAspect: (value: number | undefined) => void;
}

const aspectRatios = [
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '1:1', value: 1 },
  { label: '3:2', value: 3 / 2 },
  { label: 'Free', value: undefined },
];

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ aspect, setAspect }) => (
  <FormControl sx={{ color: 'white' }}>
    <InputLabel sx={{ color: 'white' }}>Aspect Ratio</InputLabel>
    <Select
      value={aspect}
      onChange={(e) => setAspect(e.target.value as number | undefined)}
      sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
    >
      {aspectRatios.map((ratio) => (
        <MenuItem key={ratio.label} value={ratio.value}>
          {ratio.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default AspectRatioSelector;
