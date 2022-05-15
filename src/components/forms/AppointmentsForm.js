import { Box, Button, TextField, Typography } from "@mui/material";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useContext, useState } from "react";
import InputSelectDentist from "./InputSelectDentist";
import { helpHttp } from "../hooks/helpHttp";
import LittleContext from "../context/LittleContext";

const AppointmentsForm = () => {
  const {
    url,
    isSelected,
    fetchController,
    setFetchController,
    patientsData,
  } = useContext(LittleContext);
  const [date, setDate] = useState("");
  const api = helpHttp();

  const handleChange = (e) => {
    if (e.target.id === "date") setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (patientsData && date && isSelected) {
      const options = {
        body: {
          dentist: { id: isSelected },
          patient: { id: patientsData.id },
          date: date,
        },
      };
      api.post(`${url}/appointments`, options).then((res) => {
        if (!res.err) {
          e.target.reset();
          // window.location.reload(); // But instead:
          // Lets trigger useEffect to cause a conditional re-render
          setFetchController(fetchController + 1);
        } else {
          console.log(res);
        }
      });
    } else {
      alert("Please verify the form");
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        component="form"
        sx={{
          "& .MuiTypography-root": { marginTop: 2, width: "25ch" },
          "& .MuiButton-root": { marginTop: 4 },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="overline">Select a Dentist</Typography>
        <InputSelectDentist />
        <Typography variant="overline">Please select a date</Typography>
        <TextField
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SaveAsIcon />}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AppointmentsForm;
