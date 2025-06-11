import React from "react";
import {
  Typography,
  Stack,
  AppBar,
  Button,
  Toolbar
} from "@mui/material";

type MenuProps = {
  title: string;
  path: string;
};


export const Menu: React.FC<MenuProps> = ({ title, path }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', gap: 1, padding: { xs: "8px 0 8px 0", sm: "0 32px 0 32px" } }}>
        <Typography variant="h6" fontWeight={"bold"} color="white" sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }} fontSize={{ xs: '24px' }}>
          Лестницы от мастера
        </Typography>
        <Stack direction={'row'} width={{ xs: '100%', sm: 'auto' }} fontSize={{ xs: '16px', sm: 'auto' }} justifyContent={'center'} alignItems="center">
          <Button color="inherit" href={path} sx={{ fontSize: "inherit", textAlign: "center" }}>{title}</Button>
          <Typography display={{ xs: 'block', sm: 'none' }}>|</Typography>
          <Button color="inherit" onClick={() => {
            document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
          }} sx={{ fontSize: "inherit", textAlign: "center" }}>Контакты</Button>
        </Stack>
      </Toolbar>
    </AppBar>);
}