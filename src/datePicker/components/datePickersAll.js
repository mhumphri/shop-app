import DatePicker from "./datePicker";
import "../css/datePickersAll.css";

// renders list of individual portfolio items in a grid

function DatePickersAll() {
  return (
    <main className="date-pickers-all-yu1">
    <h2 className="date-pickers-all-ps2">mobile view</h2>
     <div className="date-pickers-all-re2" style={{width: "411px"}}>
  <DatePicker width={411} />

    </div>
    <h2 className="date-pickers-all-ps2">mobile view</h2>
    <div className="date-pickers-all-re3" style={{width: "auto"}}>
    <DatePicker width={900} largeView={true} />
   </div>
    </main>
  );
}

export default DatePickersAll;
