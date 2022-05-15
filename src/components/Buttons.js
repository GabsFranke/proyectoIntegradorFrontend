import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useContext } from "react";
import LittleContext from "./context/LittleContext";
import { helpHttp } from "./hooks/helpHttp";

const Buttons = () => {
  const location = useLocation();
  const currentLocation = location.pathname;
  const navigate = useNavigate();
  const urlParam = useParams()
  const {
    isSelected,
    setIsSelected,
    url,
    fetchController,
    setFetchController,
  } = useContext(LittleContext);
  const api = helpHttp();

  const handleAdd = () => {
    if (isSelected) {
      setIsSelected(null);
    }
    if (currentLocation.indexOf("/new") === -1) {
      navigate(`${currentLocation}/form/new`);
    }
  };

  const handleEdit = () => {
    if (isSelected) {
      navigate(`${currentLocation}/form/${isSelected}`);
    } else {
      alert("Seleccione un elemento");
    }
  };

  const handleDelete = (e) => {
    if (isSelected) {
      if (window.confirm("¿Está seguro de eliminar?")) {
        api.del(`${url}${currentLocation}/${isSelected}`).then((res) => {
          if (!res.err) {
            // window.location.reload();
            // Cheat:
            setFetchController(fetchController + 1);
            alert("Eliminado");
          } else {
            alert("Error: " + res.statusText);
          }
        });
      }
    } else {
      alert("Seleccione un elemento");
    }
  };

  const handleBack = () => {
    if (isSelected) {
      setIsSelected(null);
    }
    if (currentLocation.indexOf("patients/") !== -1) {
      navigate("/patients");
    } else if (currentLocation.indexOf("appointments/") !== -1) {
      navigate("/appointments");
    } else if (currentLocation.indexOf("dentists/") !== -1) {
      navigate("/dentists");
    } else if (
      currentLocation.indexOf("patients") === -1 ||
      currentLocation.indexOf("appointments") === -1 ||
      currentLocation.indexOf("dentists") === -1
    ) {
      navigate("/");
    }
  };

  return (
    <>
      {currentLocation === "/" ? null : (
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box padding={2} margin={2} borderRadius={2} color="primary.main">
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={3}
            >
              <Button
                id="back"
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
              >
                Back
              </Button>
              {currentLocation.indexOf("/appointments") !== -1 ? null : (
                <Button
                  id="delete"
                  onClick={handleDelete}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              )}
            </Stack>
          </Box>
          <Box
            padding={2}
            margin={2}
            borderRadius={2}
            color="primary.main"
            block
          >
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              spacing={3}
            >
              {currentLocation.indexOf("/appointments") !==
              -1 ? null : currentLocation.indexOf(`/${urlParam.id}`) === -1 ? (
                <Button
                  id="edit"
                  onClick={handleEdit}
                  variant="contained"
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              ) : null}
              {currentLocation.indexOf("/appointments/new") !==
              -1 ? null : currentLocation.indexOf(`/${urlParam.id}`) === -1 ? (
                <Button
                  id="add"
                  onClick={handleAdd}
                  variant="contained"
                  endIcon={<AddBoxIcon />}
                >
                  Add
                </Button>
              ) : null}
            </Stack>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Buttons;
