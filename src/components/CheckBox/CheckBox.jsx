import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export default function ControlledCheckbox(props) {

  const handleChange = (event) => {
    props.setChecked(event.target.checked);
    props.setInterestList([])
  };

  return (
    <Checkbox
      checked={props.checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}