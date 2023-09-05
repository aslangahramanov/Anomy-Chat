import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function MainTextField(props) {
  const [interest, setInterest] = React.useState('');

  const handleInterestsChange = (event) => {
    setInterest(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (interest && event.key === 'Enter') {
      props.appendList(interest);
      setInterest('');
    }
  };

  return (
    <Box
      sx={{
        width: 600,
        maxWidth: '100%',
        backgroundColor: props.darkMode ? 'white' : '#fff', // Arkaplan rengini ayarlayın
        borderRadius: '5px'
      }}
    >
      <TextField
        disabled={!props.checked}
        value={interest}
        onChange={handleInterestsChange}
        onKeyDown={handleKeyPress}
        fullWidth
        label="Enter Your Interests"
        id="fullWidth"
        sx={{
          color: props.darkMode ? 'white' : 'black', // Metin rengini ayarlayın
        }}
      />
    </Box>
  );
}

export default MainTextField;
