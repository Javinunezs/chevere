import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TableDatePicker() {
  
    const [startDate, setStartDate] = useState(null);
    //const [endDate, setEndDate] = useState(null);
   
    return (
      <div>
      <div className="text-black" style={{display: "flex"}}>
        <DatePicker 
          
          placeholderText="Select Start Date"
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mmaa"
          selected={startDate}
          selectsStart
          startDate={startDate}

          onChange={date => setStartDate(date)}
        />
        




      </div>
      <div>Selected start date={startDate ? startDate.toString() : null}</div>

     </div>
      
 );
}



{/*<DatePicker
          placeholderText="Select End Date"
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mmaa"
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          onChange={date => setEndDate(date)}
        /> */}