import * as locales from "react-date-range/dist/locale";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import React, { useState } from "react";
import { Calendar } from "react-date-range";

export default function MyCalender() {
  const nameMapper = {
    ar: "Arabic",
    bg: "Bulgarian",
    ca: "Catalan",
    cs: "Czech",
    cy: "Welsh",
    da: "Danish",
    de: "German",
    el: "Greek",
    enGB: "English (United Kingdom)",
    enUS: "English (United States)",
    eo: "Esperanto",
    es: "Spanish",
    et: "Estonian",
    faIR: "Persian",
    fi: "Finnish",
    fil: "Filipino",
    fr: "French",
    hi: "Hindi",
    hr: "Croatian",
    hu: "Hungarian",
    hy: "Armenian",
    id: "Indonesian",
    il: "Israel",
    is: "Icelandic",
    it: "Italian",
    ja: "Japanese",
    ka: "Georgian",
    ko: "Korean",
    lt: "Lithuanian",
    lv: "Latvian",
    mk: "Macedonian",
    nb: "Norwegian Bokmål",
    nl: "Dutch",
    pl: "Polish",
    pt: "Portuguese",
    ro: "Romanian",
    ru: "Russian",
    sk: "Slovak",
    sl: "Slovenian",
    sr: "Serbian",
    sv: "Swedish",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    vi: "Vietnamese",
    zhCN: "Chinese Simplified",
    zhTW: "Chinese Traditional",
  };
  const localeOptions = Object.keys(locales)
    .map((key) => ({
      value: key,
      label: `${key} - ${nameMapper[key] || ""}`,
    }))
    .filter((item) => nameMapper[item.value]);

  const [locale, setLocale] = React.useState("ja");
  const [date, setDate] = useState(null);

  return (
    <div style={{ display: "flex", flexFlow: "column nowrap" }}>
      <Calendar onChange={(item) => setDate(item)} date={date} />
    </div>
  );
}
