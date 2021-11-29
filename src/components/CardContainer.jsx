import React from 'react';
import SimpleCard from './SimpleCard';
import AddCard from './AddCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const CardContainer = (props) => {
  const { cardEdit, responseData, setCities, handleOpen, selectedCities, setSelectedCity, timeNow, cardAdded } = props;

  const onDeleteCard = async (id) => {
    const filteredCities = await selectedCities.filter(function (city) {
      return city._id !== id;
    });

    setSelectedCity(filteredCities)
  }

  return (
    <Box sx={{ flexGrow: 1 }} className="card-container">
      <Grid container spacing={2}>
        {selectedCities.length < 4 &&
          (
            <Grid item xs={3}>
              <AddCard data-testid="add-card" cityData={responseData} setCities={setCities} handleOpen={handleOpen} />
            </Grid>
          )
        }

        {selectedCities.length >= 1 &&
          (
            <>
              {
                selectedCities.map((data) => {
                  const uniqueID = data._id;
                  return (
                    <Grid item xs={3} key={uniqueID}>
                      <SimpleCard data-testid="timezone-card" data={data} cardEdit={cardEdit} onDeleteCard={onDeleteCard} timeNow={timeNow} cardAdded={cardAdded} />
                    </Grid>
                  )
                })
              }
            </>
          )
        }
      </Grid>
    </Box >

  )
}

export default CardContainer;