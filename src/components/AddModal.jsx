import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './styles/styles.scss';

const styles = {
  bgcolor: 'background.paper',
};

const allowedCities = [
  { city: 'Singapore', location: 'Asia/Singapore', isDisabled: false },
  { city: 'Tokyo', location: 'Asia/Tokyo', isDisabled: false },
  { city: 'Seoul', location: 'Asia/Seoul', isDisabled: false },
  { city: 'Melbourne', location: 'Australia/Melbourne', isDisabled: false },
  { city: 'Sydney', location: 'Australia/Sydney', isDisabled: false },
  { city: 'London', location: 'Europe/London', isDisabled: false },
  { city: 'Paris', location: 'Europe/Paris', isDisabled: false },
  { city: 'Berlin', location: 'Europe/Berlin', isDisabled: false },
  { city: 'New York', location: 'America/New_York', isDisabled: false },
  { city: 'Los_Angeles', location: 'America/Los_Angeles', isDisabled: false }
];

const AddModal = (props) => {
  const { open, handleClose, selectedCity, setSelectedCity } = props;
  const [cityLabel, setCityLabel] = useState('');
  const [timezoneName, setTimezoneName] = useState('');


  const checkTimezoneName = async (val) => {
    const timezoneName = await allowedCities.find(item => item.city === val);
    return timezoneName
  }

  const handleCityChange = async (e, val) => {
    const timezoneName = await checkTimezoneName(val.city)
    setTimezoneName(timezoneName);
  }
  const handleLabelChange = (e) => {
    setCityLabel(e.target.value)
  }

  const handleCitySubmit = async (e) => {
    e.preventDefault();

    if (!timezoneName) {
      alert("City is required.");
    } else {
      const obj = {
        _id: uuidv4(),
        timezoneName: timezoneName,
        cityLabel: cityLabel
      }
      // setSelectedCityData(selectedCityData.concat(obj))
      setSelectedCity([...selectedCity, obj])

      handleClose()
    }

  }
  return (
    <Modal
      className="modal-container"
      data-testid="modal"
      open={open}
      onClose={handleClose}

      aria-labelledby="modal-modal-city"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles} component="form" className="form-box">
        <Stack spacing={2} >
          <Autocomplete
            freeSolo

            clearOnBlur={true}
            id="free-solo-2-demo"
            disableClearable
            getOptionLabel={(option) => option.city}
            getOptionDisabled={(option) => {
              if (selectedCity.some((opt) => opt.timezoneName.city === option.city)) {
                return true;
              }
            }}
            options={allowedCities}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                data-testid="city-input"
                label="Search a City"
                variant="standard"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
            onChange={handleCityChange}
          />
          <TextField
            id="standard"
            data-testid="label-input"
            label="Add a label"
            variant="standard"
            inputProps={{ maxLength: 20 }}
            onChange={handleLabelChange}
          />
          <Button data-testid="add-button" className="add-btn" onClick={handleCitySubmit} variant="contained" disableElevation>
            Add
          </Button>
        </Stack>

      </Box>
    </Modal>

  )
}
export default AddModal;


