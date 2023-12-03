import { CircularProgress, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "shared/axios/axios";
import { AuthContext } from "shared/contexts/AuthContext";

export const Me = () => {
  const { token } = useContext(AuthContext);
  const [meInfo, setMeInfo] = useState<null | { email: string; name: string }>(
    null
  );

  useEffect(() => {
    axiosInstance
      .get("/user/me", {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => data.data)
      .then(setMeInfo);
  }, []);

  if (!meInfo) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography>
        My name is {meInfo?.name} and email is {meInfo?.email}
      </Typography>
    </div>
  );
};
