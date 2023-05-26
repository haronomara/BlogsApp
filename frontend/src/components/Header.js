import React, { useState } from 'react'
import {AppBar, Box, Button, Tab, Tabs, Toolbar, Typography} from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Header() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
    const [value, setValue] = useState()
  return (
    <div>
       <AppBar position='sticky' sx={{backgroundColor:"#490979"}}>
        <Toolbar>
          <Typography variant='h4'>BlogsApp</Typography>
         { isLoggedIn && <Box marginLeft={'auto'} marginRight={'auto'}>
            <Tabs textColor='inharit' value={value} onChange={(e,val)=>setValue(val)}>
              <Tab to='/blogs' LinkComponent={Link} value={0}  label="All Blogs" />
              <Tab to="/myblogs" LinkComponent={Link} label="My Blogs" />
            </Tabs>
          </Box>}
           <Box sx={{marginLeft:"auto",}}>
           { !isLoggedIn && <>
            <Button sx={{color:"white",borderRadius:10,margin:1}}
             variant='contained' color='warning' LinkComponent={Link} to="/auth">Login</Button>
           <Button sx={{color:"white",borderRadius:10,margin:1}} 
            variant='contained'
            LinkComponent={Link} to="/auth"
             color='warning'>Signup</Button>
           </> }
             { isLoggedIn && <Button  sx={{color:"white",borderRadius:10,margin:1}}
             variant='contained' color='warning' LinkComponent={Link} to="/auth">Logout</Button>}
          </Box>
        </Toolbar>
       </AppBar>
    </div>
  )
}

export default Header