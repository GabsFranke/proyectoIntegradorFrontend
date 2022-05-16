import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LittleContext from "../components/context/LittleContext";
import { useFetch } from "../components/hooks/useFetch";
import DentistTable from "../components/tables/DentistTable";
import Loader from "../components/utils/Loader";

export const Dentists = () => {
  const { url, setDentistsData, setPatientId } = useContext(LittleContext);
  const { apiData, error, loading } = useFetch(`${url}/dentists`);

  useEffect(() => {
    if (apiData) {
      setDentistsData(apiData);
    }
    // if we load the dentist location, we need to reset the patientId
    setPatientId("");
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
          <Typography variant="p" color="red">
            There has been an error or the API might be offline.
          </Typography>
        ) : !apiData || !apiData.length ? (
          <Typography variant="h5" color="orange">
            There's no data right now, try registering a new dentist.
          </Typography>
        ) : (
          <DentistTable />
        )}
        {/* DentistForm */}
        <Outlet />
      </Box>
    </Container>
  );
};
