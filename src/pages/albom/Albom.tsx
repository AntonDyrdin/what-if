import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  Stack
} from "@mui/material";
import "flickity/css/flickity.css";
import "./styles.scss";
import { PhotoGallery } from "../../components/Gallery";
import { Contacts } from "../../components/Contacts";
import { fileNames } from "../../assets/file-list";

export function Albom() {
  return (
    <div style={{ maxWidth: "100%", overflow: "clip" }}>
      <AppBar position="static">
        <Toolbar sx={{ flexDirection: { sm: 'row' }, alignItems: 'center', gap: 1, padding: { xs: "12px 0 12px 0", sm: "0 32px 0 32px" } }}>
          <Typography variant="h6" fontWeight={"bold"} color="white" sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }} fontSize={{ xs: '24px' }}>
            Лестницы от мастера
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} width={{ xs: '60%', sm: 'auto' }} fontSize={{ xs: '20px', sm: 'auto' }} spacing={1} alignItems="center">
            <Button color="inherit" href="/" sx={{ fontSize: "inherit", textAlign: "center" }}>Главная</Button>
            <Button color="inherit" href="#contacts" sx={{ fontSize: "inherit", textAlign: "center" }}>Контакты</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container style={{ maxWidth: "1250px" }} sx={{ py: 4, px: "16px" }}>
        <Typography variant="h3" fontSize={{ xs: '32px', sm: '48px' }} sx={{ justifySelf: "center" }} gutterBottom>
          Наши работы
        </Typography>

        <PhotoGallery images={fileNames.map((fileName) => `/albom/stairs/${fileName}`)} />

      </Container>
      <Contacts></Contacts>
    </div>
  );
}
