import React, { useState } from "react";
import MonthYearPicker from "react-month-year-picker";

function Date() {
  const [month, setMonth] = useState(12);
  const [year, setYear] = useState(2022);

  return (
    <div className="text-center">
      {" "}
      <MonthYearPicker
        selectedMonth={month}
        selectedYear={year}
        minYear={1988}
        maxYear={2100}
        onChangeYear={(year) => setYear(year)}
        onChangeMonth={(month) => setMonth(month)}
      />
      <button>Submit</button>
    </div>
  );
}

export default Date;
