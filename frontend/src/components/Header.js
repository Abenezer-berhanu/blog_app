import React, { useState } from "react";
import { logout } from "../store";
import {
  AppBar,
  Box,
  Button,
  Tabs,
  Tab,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function Header() {
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        {isLoggedIn && (
          <Box display="flex" margin="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => {
                setValue(val);
              }}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto" gap="1rem">
          {!isLoggedIn && (
            <>
              <Button
                variant="contained"
                color="warning"
                sx={{ borderRadius: 10 }}
                LinkComponent={Link}
                to="/auth"
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="warning"
                sx={{ borderRadius: 10 }}
                LinkComponent={Link}
                to="/auth"
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              variant="contained"
              color="warning"
              sx={{ borderRadius: 10 }}
              LinkComponent={Link}
              to="/auth"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
