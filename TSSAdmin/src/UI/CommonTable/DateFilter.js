import React from 'react';
// import { DatePicker } from '@material-ui/pickers';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateFilter({ startDate, endDate, handleStartDateChange, handleEndDateChange }) {
    // console.log(startDate);
    // console.log(endDate);
  return (
    <div className="my-3">
     <div className="w-1/2 mx-auto " label='endj' style={{ marginBottom: '1rem', border: '1px solid black', color: 'black' }} >
                <DatePicker selected={startDate} 
         variant="inline"
          // inputVariant="outlined"
          label="Start Date"
          format="MM/dd/yyyy" 
          value={startDate==null?"Enter start date":startDate}
          onChange={handleStartDateChange} />
      </div>
      <div className="w-1/2 mx-auto" style={{ marginBottom: '1rem', border: '1px solid black', color: 'black' }}>
     
      <DatePicker selected={endDate} 
         variant="inline"
          inputVariant="outlined"
          label={"Start Date"}
          format="MM/dd/yyyy"
          value={endDate==null?"Enter end date":endDate}
          onChange={handleEndDateChange} />
      </div>
    </div>
  );
}

export default DateFilter;
