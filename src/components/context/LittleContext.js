import { createContext, useState } from "react";

const LittleContext = createContext();

const LittleProvider = ({ children }) => {
  const [isSelected, setIsSelected] = useState("");
  const [dentistsData, setDentistsData] = useState(null);
  const [patientsData, setPatientsData] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [appointmentsData, setAppointmentsData] = useState(null);
  const [url, setUrl] = useState("https://test-api-gf.herokuapp.com");
  const [fetchController, setFetchController] = useState(0);

  const context = {
    isSelected,
    setIsSelected,
    url,
    setUrl,
    fetchController,
    setFetchController,
    dentistsData,
    setDentistsData,
    patientsData,
    setPatientsData,
    patientId,
    setPatientId,
    appointmentsData,
    setAppointmentsData,
  };

  return (
    <LittleContext.Provider value={context}>{children}</LittleContext.Provider>
  );
};

export { LittleProvider };
export default LittleContext;
