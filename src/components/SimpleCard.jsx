import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../constants/config';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

const SimpleCard = (props) => {
  const { cardEdit, onDeleteCard, timeNow } = props;
  const { _id, timezoneName, cityLabel } = props.data
  const [timezoneData, setTimezoneData] = useState([])

  const updateTimer = React.useRef(null);

  const setUpdate = () => {
    updateTimer.current = setTimeout(() => {
      updateCityData()
      updateTimer.current = null;
    }, 1000);
  }




  const formatCity = (str) => {
    return (str.split('/')[1]).replace("_", " ");
  }

  const formatTime = (datetime, timezone) => {
    var d = new Date(datetime);
    function convertTZ(date, tzString) {
      return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
    }
    const converted = convertTZ(d, timezone)
    return converted.toTimeString().slice(0, 5)
  }

  const calculateTimeDiff = (valuestart, valuestop) => {
    //create date format          
    var timeStart = new Date("01/01/2007 " + valuestart).getHours();
    var timeEnd = new Date("01/01/2007 " + valuestop).getHours();

    var hourDiff = timeEnd - timeStart;
    if (hourDiff < 0) {
      hourDiff = 24 + hourDiff;
    }

    return hourDiff
  }

  const checkData = (location) => {
    const region = location.split('/')[0];
    const city = location.split('/')[1];
    if (region === 'Europe' || region === 'America') {
      return 'behind'
    } else if (region === 'Australia' || city === 'Tokyo' || city === 'Seoul') {
      return 'ahead'
    } else if (city === 'Singapore') {
      return 'same'
    }
  }

  //  retrieve timezone of selected city
  const updateCityData = async () => {
    let url = `${API_BASE_URL}/${timezoneName.location}`;
    await axios({
      method: 'GET',
      url: url
    }).then(result => {
      const data = result.data;
      const requiredData = {
        _id: _id,
        city: formatCity(data.timezone),
        label: cityLabel,
        time: formatTime(data.datetime, data.timezone),
        timeabrv: data.abbreviation,
        timediff: calculateTimeDiff(timeNow, formatTime(data.datetime, data.timezone)),
        identifier: checkData(data.timezone)
      }
      console.log('update: ', requiredData.time)
      setTimezoneData(requiredData)
    }).catch(error => {
      console.log(error);
      setTimezoneData([]);
    });
  };

  // useEffect(() => {
  //   updateCityData()

  //   const interval = setInterval(() => {
  //     //This will run every 3 seconds
  //     updateCityData()
  //   }, 1000);

  //   return () => clearInterval(interval);

  // }, [props.data])

  useEffect(() => {
    if (!updateTimer.current) {
      setUpdate();
    }
  }, [timeNow]);

  useEffect(() => {
    return () => {
      if (updateTimer.current) {
        clearTimeout(updateTimer.current);
      }
    };
  }, []);

  return (

    <Card
      className="timezone-card"
      key={timezoneData._id}
    >
      {cardEdit ?
        <CardActions className="delete-section">
          <Button onClick={() => { onDeleteCard(timezoneData._id) }} size="small" ><ClearIcon /></Button>
        </CardActions>
        :
        ''}

      {
        timezoneData ?
          <CardContent className="timezone-content">
            <div className="timezone-info">
              <Typography className="timezone-text timezone-city" variant="p" component="div">
                {timezoneData.city}
              </Typography>
              <Typography className="timezone-text timezone-label" variant="p" component="div">
                {timezoneData.label}
              </Typography>
            </div>
            <Typography className="timezone-text timezone-time" variant="h2" component="div">
              {timezoneData.time}
            </Typography>
            <div className="timezone-data">
              <Typography className="timezone-text timezone-abrv" variant="h5" component="div">
                {timezoneData.timeabrv}
              </Typography>
              <Typography className="timezone-text timezone-diff" variant="body2">
                {timezoneData.timediff} {timezoneData.identifier && ' hours ' + timezoneData.identifier + ' from Manila'}
              </Typography>
            </div>

          </CardContent>
          :
          <></>
      }
    </Card >


  );
}
export default SimpleCard;
