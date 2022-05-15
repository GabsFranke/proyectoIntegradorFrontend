import { useContext, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LittleContext from "../context/LittleContext";
import { useFetch } from "../hooks/useFetch";

export default function InputSelectDentist() {
  const { url, isSelected, setIsSelected, dentistsData, setDentistsData } = useContext(LittleContext);
  const { apiData, loading } = useFetch(`${url}/dentists`);

  useEffect(() => {
    if (apiData) {
      setDentistsData(apiData);
    }
  }, [apiData, loading, url]); //eslint-disable-line
    
    const handleChange = (event) => {
      setIsSelected(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-dentist">Dentist</InputLabel>
      <Select
        labelId="select-dentist"
        id="simple-select"
        value={isSelected}
        label="Dentist"
        onChange={handleChange}
      >
        {!dentistsData
          ? null
          : dentistsData.map((dentist) => (
              <MenuItem key={dentist.id} value={dentist.id}>
                {`${dentist.name} ${dentist.lastname}`}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
}
