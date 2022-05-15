import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";

function LinkTab(props) {
  return (
    <Tab
      component={Link}
          sx={{
              fontSize: [16, 20, 27],
              color: "text",
              "&:hover": {
                  color: "primary.light",
                  opacity: [0.9, 0.8, 0.7],
              },
            }}
      {...props}
    />
  );
}

export default LinkTab;