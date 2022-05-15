import { CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LittleContext from "../context/LittleContext";
import { helpHttp } from "../hooks/helpHttp";

const InputSearchByDni = () => {
  const { url, setPatientsData, setPatientId } = useContext(LittleContext);
  const [dni, setDni] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputHelperTxt, setInputHelperTxt] = useState("");
  const api = helpHttp();
  const navigate = useNavigate();
  //get patient by dni
  const handleBlur = (e) => {
    if (dni) {
      setLoading(true);
      setTimeout(() => {
        api.get(`${url}/patients/dni/${e.target.value}`).then((res) => {
          if (!res.err) {
            setPatientId(res.id.toString());
            setPatientsData(res);
            setInputHelperTxt(`Hi ${res.name}, you can get an appointment.`);
            setTimeout(() => {
              setLoading(false);
              navigate("/appointments");
            }, 3000);
          } else if (res.status === 404) {
            setPatientId("");
            setPatientsData(null);
            setInputHelperTxt("Please verify the DNI");
            setLoading(false);
          } else {
            setPatientId("");
            setPatientsData(null);
            setLoading(false);
            setInputHelperTxt("Error. Please try again.");
          }
        });
      }, 1000);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "patient") setDni(e.target.value);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        align-content="center"
        marginTop={2}
      >
        <TextField
          id="patient"
          name="patient"
          label="DNI"
          value={dni}
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={inputHelperTxt}
          sx={{
            marginRight: 2,
          }}
        />
        {!loading ? null : <CircularProgress />}
      </Box>
    </>
  );
};

export default InputSearchByDni;
