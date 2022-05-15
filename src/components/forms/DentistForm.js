import { Box, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { helpHttp } from "../hooks/helpHttp";
import LittleContext from "../context/LittleContext";
import { useLocation } from "react-router-dom";

const DentistForm = () => {
  const initialState = {
    name: "",
    lastname: "",
    registrationNumber: "",
  };
  const api = helpHttp();
  const [dentist, setDentist] = useState(initialState);
  const {
    isSelected,
    setIsSelected,
    url,
    dentistsData,
    fetchController,
    setFetchController,
  } = useContext(LittleContext);
  const location = useLocation();
  const currentLocation = location.pathname;

  useEffect(() => {
    if (isSelected) {
      for (let i = 0; i < dentistsData.length; i++) {
        const element = dentistsData[i];
        // isSelected is a ""string type of number""
        // eslint-disable-next-line
        if (element.id == isSelected) {
          setDentist(element);
        }
      }
    } else {
      setDentist(initialState);
      setIsSelected("");
    }
    // No eslint, no need to control 'initialState' and 'setIsSelected'
    // eslint-disable-next-line
  }, [isSelected, dentistsData]);

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setDentist({ ...dentist, name: e.target.value });
    } else if (e.target.name === "lastname") {
      setDentist({ ...dentist, lastname: e.target.value });
    } else if (e.target.name === "registrationNumber") {
      setDentist({ ...dentist, registrationNumber: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dentist.name && dentist.lastname && dentist.registrationNumber) {
      if (location.pathname === "/dentists/form/new" && isSelected === "") {
        const options = {
          body: dentist,
        };
        api.post(`${url}/dentists`, options).then((res) => {
          //console.log(res);
          if (!res.err) {
            e.target.reset();
            // window.location.reload(); // But instead:
            // Control father's useEffect to cause a conditional re-render
            setFetchController(fetchController + 1);
          } else {
            console.log(res);
          }
        });
      }
      if (currentLocation === `/dentists/form/${isSelected}`) {
        const options = {
          body: dentist,
        };
        api.put(`${url}/dentists/${isSelected}`, options).then((res) => {
          if (!res.err) {
            e.target.reset();
            setFetchController(fetchController + 1);
          } else {
            console.log(res);
          }
        });
      }
      if (currentLocation === "/dentists/form/new" && isSelected !== "") {
        if (
          window.confirm("You have selected a dentist. Do you want to edit it?")
        ) {
          const options = {
            body: dentist,
          };
          api.put(`${url}/dentists/${isSelected}`, options).then((res) => {
            if (!res.err) {
              e.target.reset();
              setFetchController(fetchController + 1);
            } else {
              console.log(res);
            }
          });
        } else {
          window.alert("Ok, we will deselect the dentist.");
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
      >
        <TextField
          id="name"
          name="name"
          label="Name"
          value={dentist.name || ""}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="lastname"
          name="lastname"
          label="Lastname"
          value={dentist.lastname || ""}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="registrationNumber"
          name="registrationNumber"
          label="Registration Number"
          variant="outlined"
          type="number"
          value={dentist.registrationNumber || ""}
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

export default DentistForm;
