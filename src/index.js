import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import MyTheme from "./components/utils/MyTheme";
import { Routes, Route, HashRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Appointments } from "./routes/Appointments";
import { Dentists } from "./routes/Dentists";
import { Patients } from "./routes/Patients";
import DentistForm from "./components/forms/DentistForm";
import PatientsForm from "./components/forms/PatientsForm";
import AppointmentsForm from "./components/forms/AppointmentsForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={MyTheme}>
      <CssBaseline />
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<App />}>
            <Route exact path="patients" element={<Patients />}>
              <Route path="form/:id" element={<PatientsForm />} />
            </Route>
            <Route exact path="dentists" element={<Dentists />}>
              <Route path="form/:id" element={<DentistForm />} />
            </Route>
            <Route exact path="appointments" element={<Appointments />}>
              <Route path="form/new" element={<AppointmentsForm />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
