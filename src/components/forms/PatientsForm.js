import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { helpHttp } from "../hooks/helpHttp";
import LittleContext from "../context/LittleContext";
import { useLocation } from "react-router-dom";

const PatientsForm = () => {
  const api = helpHttp();
  const initialState = {
    name: "",
    lastname: "",
    dni: "",
    registrationDate: "2020-02-20",
    addresses: [
      {
        street: "",
        number: "",
        city: "",
        state: "",
      },
    ],
  };
  const [patient, setPatient] = useState(initialState);
  const {
    isSelected,
    setIsSelected,
    url,
    patientsData,
    fetchController,
    setFetchController,
  } = useContext(LittleContext);
  const location = useLocation();
  const currentLocation = location.pathname;

  useEffect(() => {
    if (isSelected) {
      for (let i = 0; i < patientsData.length; i++) {
        const element = patientsData[i];
        // isSelected is a ""string type of number"" and eslint gets mad with two == signs
        // eslint-disable-next-line
        if (element.id == isSelected) {
          setPatient(element);
        }
      }
    } else {
      setPatient(initialState);
      setIsSelected("");
    }
    // No eslint, no need to control 'initialState' and 'setIsSelected'
    // eslint-disable-next-line
  }, [isSelected, patientsData]);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setPatient({ ...patient, name: e.target.value });
    } else if (e.target.name === "lastname") {
      setPatient({ ...patient, lastname: e.target.value });
    } else if (e.target.name === "dni") {
      setPatient({ ...patient, dni: e.target.value });
    } else if (e.target.name === "registrationDate") {
      setPatient({ ...patient, registrationDate: e.target.value });
    } else if (e.target.name === "street") {
      setPatient({
        ...patient,
        addresses: [{ ...patient.addresses[0], street: e.target.value }],
      });
    } else if (e.target.name === "number") {
      setPatient({
        ...patient,
        addresses: [{ ...patient.addresses[0], number: e.target.value }],
      });
    } else if (e.target.name === "city") {
      setPatient({
        ...patient,
        addresses: [{ ...patient.addresses[0], city: e.target.value }],
      });
    } else if (e.target.name === "state") {
      setPatient({
        ...patient,
        addresses: [{ ...patient.addresses[0], state: e.target.value }],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      patient.name &&
      patient.lastname &&
      patient.registrationDate &&
      patient.dni &&
      patient.addresses[0].street &&
      patient.addresses[0].number &&
      patient.addresses[0].city &&
      patient.addresses[0].state
    ) {
      if (currentLocation === "/patients/form/new" && isSelected === "") {
        const options = {
          body: patient,
        };
        api.post(`${url}/patients`, options).then((res) => {
          //console.log(res);
          if (!res.err) {
            e.target.reset();
            // window.location.reload(); // But instead:
            // Cheat:
            setFetchController(fetchController + 1);
          } else {
            console.log(res);
          }
        });
      }
      if (location.pathname === `/patients/form/${isSelected}`) {
        const options = {
          body: patient,
        };
        api.put(`${url}/patients/${isSelected}`, options).then((res) => {
          if (!res.err) {
            e.target.reset();
            setFetchController(fetchController + 1);
          } else {
            console.log(res);
          }
        });
      }
      if (currentLocation === "/patients/form/new" && isSelected !== "") {
        if (
          window.confirm("You have a patient selected. Do you want to edit it?")
        ) {
          const options = {
            body: patient,
          };
          api.put(`${url}/patients/${isSelected}`, options).then((res) => {
            if (!res.err) {
              e.target.reset();
              setFetchController(fetchController + 1);
            } else {
              console.log(res);
            }
          });
        } else {
          window.alert("Ok, we will deselect the patient.");
          setIsSelected("");
        }
      }
    } else {
      alert("Please fill all the fields.");
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        component="form"
        marginTop={6}
        sx={{
          "& .MuiTextField-root": { m: 2, width: "25ch" },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
        backgroundColor="background.paper"
      >
        <TextField
          id="name"
          name="name"
          label="Name"
          value={patient.name || ""}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="lastname"
          name="lastname"
          label="Lastname"
          value={patient.lastname || ""}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="dni"
          type="number"
          name="dni"
          label="DNI"
          value={patient.dni || ""}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="registrationDate"
          name="registrationDate"
          label="Registration Date"
          value={patient.registrationDate || "2020-02-20"}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="street"
          name="street"
          label="Street"
          value={patient.addresses[0].street || ""}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="number"
          type="number"
          name="number"
          label="Number"
          value={patient.addresses[0].number || ""}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="city"
          name="city"
          label="City"
          value={patient.addresses[0].city || ""}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="state"
          name="state"
          label="State"
          value={patient.addresses[0].state || ""}
          variant="outlined"
          onChange={handleChange}
        />
        <Box marginLeft={1}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            startIcon={<SaveAsIcon />}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default PatientsForm;
