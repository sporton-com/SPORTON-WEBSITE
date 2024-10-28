import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { IconLetterT } from '@tabler/icons-react'; // تأكد من تعديل استيراد الأيقونة بناءً على مكتبة الأيقونات الخاصة بك
import { Button } from '../ui/button';

interface TextInputDialogProps {
  text: string;
  setText: (value: string) => void;
}

const TextInputDialog: React.FC<TextInputDialogProps> = ({ text, setText }) => {
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState(text);

  const handleClickOpen = () => {
    setOpen(true);
    setInputText(text); // تعيين النص الحالي عند فتح الحوار
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setText(inputText);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} className="text-primary-500">
        <IconLetterT size={24} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'white', // لون الخلفية فاتح
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // ظل خفيف
            color: 'black', // لون النص
          },
          zIndex: 9999, // التأكد من أن الحوار في الأعلى
        }}
      >
        <DialogTitle className="font-bold text-primary-500">Add Text</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Add text here"
            type="text"
            fullWidth
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            InputProps={{
              style: { color: 'black', backgroundColor: '#f0f0f0', borderRadius: '5px' }, // لون خلفية الفيلد
              sx: { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FAFAFAFF' } }, // لون الحدود
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button variant={"tran"} onClick={handleClose} className="text-secondary-500">Cancel</Button>
          <Button variant={"tran"} onClick={handleSave} className="text-primary-500 font-bold">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TextInputDialog;
