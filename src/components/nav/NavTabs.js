import { Container, Tabs } from "@mui/material";
import LinkTab from "./LinkTab";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const NavTabs = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const currentLocation = location.pathname;

  useEffect(() => {
    if (currentLocation.indexOf("/appointments") !== -1) setValue(0);
    if (currentLocation.indexOf("/patients") !== -1) setValue(1);
    if (currentLocation.indexOf("/dentist") !== -1) setValue(2); 
  }, [currentLocation]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <Container sx={{
          justifyContent:"center",
      }} >
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
      >
        <LinkTab label="Appointments" to="/appointments" />
        <LinkTab label="Patients" to="/patients" />
        <LinkTab label="Dentists" to="/dentists" />
      </Tabs>
    </Container>
  );
};

export default NavTabs;
