import React from 'react';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import './styles/card.scss';

const AddCard = (props) => {
  const { handleOpen } = props;

  return (
    <div>
    <Card data-testid="add-card" className="add-card" onClick={handleOpen}>
      <CardContent className="add-card-content">
        <AddIcon data-test-id="add-icon"/>
        <Typography variant="h5" component="div">
          Add a City
        </Typography>
      </CardContent>
    </Card>
    </div>
  )
}
export default AddCard;