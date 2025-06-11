import React from "react";
import {
  Typography,
  Container,
} from "@mui/material";
import "flickity/css/flickity.css";
import "./styles.scss";
import { PhotoGallery } from "../../components/Gallery";
import { Contacts } from "../../components/Contacts";
import { fileNames } from "../../assets/file-list";
import { Menu } from "../../components/Menu";

export function Albom() {
  return (
    <div style={{ maxWidth: "100%", overflow: "clip" }}>
      <Menu title={"Главная"} path={"./"}/>

      <Container style={{ maxWidth: "1250px" }} sx={{ py: 4, px: "16px" }}>
        <Typography variant="h3" fontSize={{ xs: '32px', sm: '48px' }} sx={{ justifySelf: "center" }} gutterBottom>
          Наши работы
        </Typography>

        <PhotoGallery images={fileNames.map((fileName) => `/what-if/build/albom/stairs/${fileName}`)} />

      </Container>
      <Contacts></Contacts>
    </div>
  );
}
