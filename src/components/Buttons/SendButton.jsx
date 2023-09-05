import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function SendButton(props) {


const setOpenHandler = React.useCallback(() => {
    props.setOpenModal(!props.openModal)
},[props])

  return (
    <Stack direction="row" spacing={2}>
      <Button disabled={props.buttonDisabled} onClick={setOpenHandler} variant="contained" color="success">
        Search
      </Button>
    </Stack>
  );
}