import { Radio } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useState } from "react";
import LittleContext from "../context/LittleContext";

const PatientsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isSelected, setIsSelected, patientsData } = useContext(LittleContext);

  console.log(patientsData);

  useEffect(() => {
    setIsSelected("");
  }, [patientsData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelected = (e) => {
    setIsSelected(e.target.id);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key="checkboxes">Select</TableCell>
              <TableCell key={`patients-name`} align="right">
                Name
              </TableCell>
              <TableCell key={`patients-lastname`} align="right">
                Lastname
              </TableCell>
              <TableCell
                key={`patients-dni`}
                align="right"
                style={{ minWidth: 100 }}
              >
                DNI
              </TableCell>
              <TableCell
                key={`patients-registrationDate`}
                align="right"
                style={{ minWidth: 100 }}
              >
                Registration Date
              </TableCell>
              <TableCell key={`patients-address`} align="right">
                Address
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!patientsData
              ? null
              : patientsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((patient) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`${patient.id}`}
                    >
                      <TableCell padding="checkbox">
                        <Radio
                          checked={isSelected === `${patient.id}`}
                          value={`${patient.id}`}
                          name="radio-buttons"
                          color="primary"
                          id={`${patient.id}`}
                          onChange={handleSelected}
                        />
                      </TableCell>
                      <TableCell
                        key={`${patient.id}-${patient.name}`}
                        align="right"
                      >
                        {patient.name}
                      </TableCell>
                      <TableCell
                        key={`${patient.id}-${patient.lastname}`}
                        align="right"
                      >
                        {patient.lastname}
                      </TableCell>
                      <TableCell
                        key={`${patient.id}-${patient.dni}`}
                        align="right"
                      >
                        {patient.dni}
                      </TableCell>
                      <TableCell
                        key={`${patient.id}-${patient.registrationDate}`}
                        align="right"
                      >
                        {patient.registrationDate}
                      </TableCell>
                      <TableCell
                        key={`${patient.id}-${patient.addresses[0]?.id}`}
                        align="right"
                      >
                        {`${patient.addresses[0]?.street} ${patient.addresses[0]?.number}, ${patient.addresses[0]?.city}`}
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={!patientsData ? 0 : patientsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PatientsTable;
