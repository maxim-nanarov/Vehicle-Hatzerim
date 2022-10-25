import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import React, { useState } from "react";
import { Calendar } from "react-date-range";

export default function MyCalender() {
  const [locale, setLocale] = React.useState("ja");
  const [date, setDate] = useState(null);

  return (
    <div style={{ display: "flex", flexFlow: "column nowrap" }}>
      <Calendar onChange={(item) => setDate(item)} date={date} />
    </div>
  );
}
