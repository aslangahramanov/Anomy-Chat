import React from 'react';
import AdsBoxVertical from '../components/Ads/AdsBoxVertical';
import MainTextField from '../components/InputElement/MainTextElement';
import SendButton from '../components/Buttons/SendButton';
import ControlledCheckbox from '../components/CheckBox/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import KeepMountedModal from '../components/PolicyModal/PolicyModal';

function Main(props) {
  const [interestList, setInterestList] = React.useState([]);
  const [checked, setChecked] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const ulRef = React.useRef(null);

  const submitButtonHandler = React.useCallback(() => {
      localStorage.setItem('interest', interestList);
      props.chatSocket.send(JSON.stringify({
        'action_type': 'match_persons',
        'person_interest': interestList,
        'user_id': props.userId,
      }));
      props.setPage('room');
  }, [interestList, props]);

  const appendList = React.useCallback((value) => {
    setInterestList((prevList) => [...prevList, value]);
  }, []);

  React.useEffect(() => {
    const ulElement = ulRef.current;
    if (ulElement) {
      ulElement.scrollTop = ulElement.scrollHeight;
    }
  }, [interestList]);

  const deleteInterest = React.useCallback((deleteIndex) => {
    const updatedList = interestList.filter((value, index) => deleteIndex !== index);
    setInterestList(updatedList);
  }, [interestList]);

  React.useEffect(() => {
    if (!checked) {
      setButtonDisabled(false);
    } else if (interestList.length) {
      setButtonDisabled(!checked);
    } else if (checked) {
      setButtonDisabled(true);
      setInterestList([]);
    }
  }, [checked, interestList]);

  return (
    <section
      id='Main'
      className={props.darkMode ? 'w-full h-[100vh] pt-8 bg-slate-800' : 'w-full h-[100vh] pt-8 bg-white'}
    >
      <div className='container w-[90%] h-full m-auto flex'>
        <div className='w-[25%] h-full'>
          <AdsBoxVertical />
        </div>
        <div className='w-[50%]'>
          <div className='w-full h-[20%]'>
            {/* <AdsBoxHorizontal></AdsBoxHorizontal> */}
          </div>
          <div className='w-full h-[50%] p-8'>
            <div className={props.darkMode ? 'text-center mb-4 text-[20px] text-white' : 'text-center mb-4 text-[20px] text-black'}>
              What do you wanna talk about?
            </div>
            <div className='flex w-full'>
              <MainTextField darkMode={props.darkMode} appendList={appendList} checked={checked}></MainTextField>
              <SendButton darkMode={props.darkMode} buttonDisabled={buttonDisabled} openModal={openModal} setOpenModal={setOpenModal} />
            </div>
            {interestList.length > 0 ? (
              <div className={'interests w-full h-[100px]'}>
                <ul
                  ref={ulRef}
                  className={
                    props.darkMode
                      ? 'flex flex-wrap items-center w-full h-full py-1 px-6 border bg-slate-500 mt-4 overflow-auto'
                      : 'flex flex-wrap items-center w-full h-full py-1 px-6 border bg-slate-100 mt-4 overflow-auto'
                  }
                >
                  {interestList.map((value, index) => (
                    <li key={index} className='px-4 h-[32px] border bg-green-500 text-white font-light m-2 rounded'>
                      <span className='text-[18px] mr-2 w-full'>{value}</span>
                      <button onClick={() => deleteInterest(index)}>
                        <CancelIcon fontSize='sm'></CancelIcon>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div></div>
            )}
            <div className='flex items-center'>
              <ControlledCheckbox type={'interest'} checked={checked} setChecked={setChecked} setInterestList={setInterestList} />
              <strong className='text-sm'>Chat with interest</strong>
            </div>
          </div>
          <div className={props.darkMode ? 'w-full h-[30%] text-center p-4 text-white' : 'w-full h-[30%] text-center p-4 text-black'}>
            <p className='text-md'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo iure sunt maiores a nesciunt assumenda
              minima, consectetur doloribus quibusdam, laboriosam quos. Atque eius asperiores similique illum deserunt
              facere dolore praesentium vitae nesciunt, aspernatur adipisci quos laborum reprehenderit. Autem veritatis
              quo laborum repellendus enim possimus vitae error. Magnam odit cum minima debitis odio distinctio assumenda
              suscipit libero praesentiump
            </p>
          </div>
        </div>
        <div className='w-[25%] h-full'>
          <AdsBoxVertical />
        </div>
      </div>
      <KeepMountedModal darkMode={props.darkMode} submitButtonHandler={submitButtonHandler} openModal={openModal} setOpenModal={setOpenModal} />
    </section>
  );
}

export default Main;
