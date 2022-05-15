import { Box, Container, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LittleContext from "../components/context/LittleContext";
import { useFetch } from "../components/hooks/useFetch";
import AppointmentsTable from "../components/tables/AppointmentsTable";
import Loader from "../components/utils/Loader";
import InputSearchByDni from "../components/forms/InputSearchByDni";

export const Appointments = () => {
  const {
    url,
    patientId,
    appointmentsData,
    patientsData,
    setAppointmentsData,
  } = useContext(LittleContext);

  const { apiData, error, loading } = useFetch(
    `${url}/appointments/patient/${patientId}`
  );

  useEffect(() => {
    if (apiData) {
      setAppointmentsData(apiData);
    }
  }, [apiData, loading, url]); //eslint-disable-line

  return (
    <Container>
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
        {loading ? (
          <Loader />
        ) : error ? (
          <>
            <Typography paragraph variant="h3">
              Welcome "Username"
            </Typography>
            <Typography variant="p" color="orange">
              If you are not a registered patient:
            </Typography>
            <Typography paragraph variant="p" color="white">
              Please contact us at our fake number: <b>+55 (11) R34C7J5</b> and
              we will register you as soon as posible. Thank you.
            </Typography>
            <Typography variant="p" color="orange">
              If you are a registered patient:
            </Typography>
            <Typography paragraph variant="p" color="white">
              Try searching your appointments.
            </Typography>
            <InputSearchByDni />
          </>
        ) : !apiData || !apiData.length || !appointmentsData ? (
          <>
            {!patientsData || !patientId ? (
              <>
                <Typography paragraph variant="h3">
                  Welcome "Username"
                </Typography>
                <InputSearchByDni />
              </>
            ) : (
              <>
                <Typography paragraph variant="h3">
                  Hi {patientsData.name},
                </Typography>
                <Typography paragraph variant="p" color="white">
                  You dont have any appointments yet, try registering a new one.
                </Typography>
              </>
            )}
          </>
        ) : (
          <AppointmentsTable />
        )}
        <Outlet />
      </Box>
    </Container>
  );
};
