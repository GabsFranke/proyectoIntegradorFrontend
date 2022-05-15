import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useContext, useState } from "react";
import LittleContext from "../context/LittleContext";

const AppointmentsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { patientsData, appointmentsData } =
    useContext(LittleContext);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                key={`patient-name`}
                align="right"
                style={{ minWidth: 170 }}
              >
                Patient Name
              </TableCell>
              <TableCell
                key={`patient-lastname`}
                align="right"
                style={{ minWidth: 170 }}
              >
                Patient Lastname
              </TableCell>
              <TableCell
                key={`dentists-name`}
                align="right"
                style={{ minWidth: 100 }}
              >
                Dentist Name
              </TableCell>
              <TableCell
                key={`dentists-lastname`}
                align="right"
                style={{ minWidth: 100 }}
              >
                Dentist Lastname
              </TableCell>
              <TableCell
                key={`appointment-date`}
                align="right"
                style={{ minWidth: 100 }}
              >
                Appointment Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!appointmentsData
              ? null
              : !appointmentsData.length
              ? null
              : appointmentsData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((appointment, i) =>
                    appointment.patient.id !== patientsData.id ? null : (
                      <TableRow hover tabIndex={-1} key={`${appointment.id}`}>
                        <TableCell
                          key={`${appointment.id}-${appointment.patient.id}-${i}${appointment.patient.name}`}
                          align="right"
                        >
                          {appointment.patient.name}
                        </TableCell>
                        <TableCell
                          key={`${appointment.id}-${appointment.patient.id}-${i}${appointment.patient.lastname}`}
                          align="right"
                        >
                          {appointment.patient.lastname}
                        </TableCell>
                        <TableCell
                          key={`${appointment.id}-${appointment.dentist.id}-${i}${appointment.dentist.name}`}
                          align="right"
                        >
                          {appointment.dentist.name}
                        </TableCell>
                        <TableCell
                          key={`${appointment.id}-${appointment.dentist.id}-${i}${appointment.dentist.lastname}`}
                          align="right"
                        >
                          {appointment.dentist.lastname}
                        </TableCell>
                        <TableCell
                          key={`${appointment.id}-${appointment.date}-${i}`}
                          align="right"
                        >
                          {appointment.date}
                        </TableCell>
                      </TableRow>
                    )
                  )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={!appointmentsData ? 0 : appointmentsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default AppointmentsTable;
