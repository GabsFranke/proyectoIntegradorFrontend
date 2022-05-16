import { Box, Container, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import LittleContext from "../components/context/LittleContext";
import { useFetch } from "../components/hooks/useFetch";
import PatientsTable from "../components/tables/PatientsTable";
import Loader from "../components/utils/Loader";

export const Patients = () => {
  const { url, patientsData, setPatientsData, setPatientId } =
    useContext(LittleContext);
  const { apiData, error, loading } = useFetch(`${url}/patients`);

  useEffect(() => {
    if (apiData) {
      setPatientsData(apiData);
    }
    // if we load the patient location, we need to reset the patientId
    // this is used in appointments only
    setPatientId("");
  }, [apiData, loading, url]); //eslint-disable-line

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
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
        ) : !apiData || !patientsData || !apiData.length ? (
          <>
            <Typography variant="h5" color="orange">
              There's no data right now, try registering a new patient.
            </Typography>
          </>
        ) : Object.getOwnPropertyNames(patientsData)[0] === "id" ? (
          <Loader />
        ) : (
          <PatientsTable />
        )}
        {/* PatientsForm */}
        <Outlet />
      </Box>
    </Container>
  );
};
