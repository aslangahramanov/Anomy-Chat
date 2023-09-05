import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import BasicButtons from '../Buttons/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  pt: 2,
  pl: 6,
  pr: 4,
  pb: 4
};

export default function KeepMountedModal(props) {
  
  
  const handleClose = () => props.setOpenModal(false);

  const [firstCheckBox, setFirstCheckbox] = React.useState(false)
  const [secondCheckBox, setSecondCheckbox] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(false)


  const firstCheckHandler = React.useCallback(() => {
    setFirstCheckbox(!firstCheckBox)

  },[setFirstCheckbox, firstCheckBox])


  const secondCheckHandler = React.useCallback(() => {
    setSecondCheckbox(!secondCheckBox)
  },[setSecondCheckbox, secondCheckBox])

React.useEffect(() => {
  if (secondCheckBox && firstCheckBox) {
    setButtonDisabled(true)
  }
},[secondCheckBox, firstCheckBox])


  return (
    <div>
      <Modal
        keepMounted
        open={props.openModal}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-description" sx={{ mb: 6}}>
            <div className='flex items-center mt-4'>
            <Checkbox
              checked={firstCheckBox}
              onChange={firstCheckHandler}
              inputProps={{ 'aria-label': 'controlled' }}
            />
                <p className='text-[14px]'>OUR AGE RESTRICTIONS HAVE CHANGED. YOU MUST BE 18 OR OLDER TO USE OMEGLE.<span>Persons under the age of 18 may not use Omegle. See our updated Terms of Service for more info. By checking the box you acknowledge and represent that you comply with these age restrictions.</span></p>
                
            </div>
            <div className='flex items-center mt-6'>
            <Checkbox
              checked={secondCheckBox}
              onChange={secondCheckHandler}
              inputProps={{ 'aria-label': 'controlled' }}
            />
                <span className='text-[16px]'>By checking the box you acknowledge that you have reviewed and agree to be bound by Omegle’s.</span>
            </div>
          </Typography>
          <div className='flex justify-end'>
            {
              buttonDisabled
              ?
              <BasicButtons buttonDisabled={buttonDisabled} submitButtonHandler={props.submitButtonHandler}></BasicButtons>
              :
              <></>
            }
          </div>
        </Box>
      </Modal>
    </div>
  );
}