import useAuth from "../../AuthConfig/useAuth";
import Typography from "@mui/material/Typography";

function Home() {
  const auth = useAuth();
  return <div>
    <Typography>
      {auth.user!= null ? auth.user.id:''}
    </Typography>

  </div>;
}

export default Home;
