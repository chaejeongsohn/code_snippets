import React from 'react';
import {Box, Button, Typography} from "@mui/material";
import {Link, Outlet} from "react-router-dom";

function App() {
  return (
      <>
        <Box sx={{width: 'calc(100vw-10rem)', display:'flex', alignItems:'center',padding:'15px 5rem',borderBottom:'1px solid #d3d3d3'}}>
          <Typography variant='h4' style={{marginRight:'1rem'}}>LoginDemo</Typography>
          <nav>
              <Button variant="text"  color='primary'> <Link to={`/login/sign-in`}>login</Link></Button>
              <Button variant="text"> <Link to={`/login/sign-up`}>sign up</Link></Button>
          </nav>
        </Box>
        <div id="detail"><Outlet/></div>
      </>
  );
}

export default App;
