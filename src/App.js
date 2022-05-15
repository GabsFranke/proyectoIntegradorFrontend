import { Box, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import Buttons from "./components/Buttons";
import { LittleProvider } from "./components/context/LittleContext";
import NavTabs from "./components/nav/NavTabs";
import InputSearchByDni from "./components/forms/InputSearchByDni";

function App() {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <>
      <LittleProvider>
        <NavTabs />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          padding={2}
          margin={2}
          borderRadius={2}
          color="primary.main"
          bgcolor="background.paper"
        >
          {currentLocation !== "/" ? null : (
            <>
              <Typography paragraph variant="h3">
                Welcome "Username"
              </Typography>
              <Typography variant="p" color="orange">
                Are you a registered patient?
              </Typography>
              <Typography paragraph variant="p" color="white">
                Please, type in your DNI so we can check your appointments.
              </Typography>
              <InputSearchByDni />
            </>
          )}
          <Outlet />
          <Buttons />
        </Box>
      </LittleProvider>
    </>
  );
}

export default App;
