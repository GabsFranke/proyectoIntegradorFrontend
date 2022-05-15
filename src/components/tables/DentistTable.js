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

const DentistTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { isSelected, setIsSelected, dentistsData } = useContext(LittleContext);

  useEffect(() => {
    setIsSelected("");
  }, [dentistsData]);

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
    <Paper sx={{ maxidth: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key="checkboxes">Select</TableCell>
              <TableCell
                key={`dentists-name`}
                align="right"
                style={{ minWidth: 170 }}
              >
                Name
              </TableCell>
              <TableCell
                key={`dentists-lastname`}
                align="right"
                style={{ minWidth: 170 }}
              >
                Lastname
              </TableCell>
              <TableCell
                key={`dentists-registrationNumber`}
                align="right"
                style={{ minWidth: 100 }}
              >
                Registration Number
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!dentistsData ? null :  (
              dentistsData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((dentist) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={`${dentist.id}`}
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        checked={isSelected === `${dentist.id}`}
                        value={`${dentist.id}`}
                        name="radio-buttons"
                        color="primary"
                        id={`${dentist.id}`}
                        onChange={handleSelected}
                      />
                    </TableCell>
                    <TableCell
                      key={`${dentist.id}-${dentist.name}`}
                      align="right"
                    >
                      {dentist.name}
                    </TableCell>
                    <TableCell
                      key={`${dentist.id}-${dentist.lastname}`}
                      align="right"
                    >
                      {dentist.lastname}
                    </TableCell>
                    <TableCell
                      key={`${dentist.id}-${dentist.registrationNumber}`}
                      align="right"
                    >
                      {dentist.registrationNumber}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={!dentistsData ? 0 : dentistsData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DentistTable;
