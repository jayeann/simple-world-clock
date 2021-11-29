import React, { useState } from 'react'; // useEffect
//components
import CardContainer from './components/CardContainer';
import AddModal from './components/AddModal';
import Clock from './components/Clock';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//styles
import './App.scss';

const App = () => {
  const [selectedCity, setSelectedCity] = useState([]);
  const [cardEdit, setCardEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [timeNow, setTimeNow] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const onCardEdit = () => {
    setCardEdit((prev) => !prev)
  }

  return (
    <Container className="App">
      <div className="header">
        <div className="group">
          <Typography data-testid="header-title" className='title' variant="h1" component="div">
            Simple <span>World Clock</span>
          </Typography>
          <Typography data-testid="header-city" className="city" variant="h4" component="div">
            Manila
          </Typography>
        </div>
      </div>

      <Clock
        data-testid="clock"
        timeNow={timeNow}
        setTimeNow={setTimeNow}
      />

      <Box className="edit-container" >
        {selectedCity.length >= 1 &&
          (
            <Button className="edit-card-list" onClick={onCardEdit} variant="contained" disableElevation >
              <EditIcon />
            </Button>
          )
        }
      </Box>

      <CardContainer
        selectedCities={selectedCity}
        setSelectedCity={setSelectedCity}
        cardEdit={cardEdit}
        timeNow={timeNow}
        handleOpen={handleOpen}
      />

      <AddModal
        open={open}
        handleClose={handleClose}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />
    </Container>
  );
}

export default App;
