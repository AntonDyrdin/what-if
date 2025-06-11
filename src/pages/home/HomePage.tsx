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
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TelegramIcon from "@mui/icons-material/Telegram";
import CheckIcon from "@mui/icons-material/Check";
import Flickity from "react-flickity-component";
import { WhatsAppIcon, VKIcon, Avito } from "./../../assets/icons";
import "flickity/css/flickity.css";
import "./styles.scss";
import { fileNames } from "../../assets/file-list";
import { Contacts } from "../../components/Contacts";

const flickityOptions = {
  initialIndex: 0,
  autoPlay: false,
  fullscreen: true,
  setGallerySize: false,
  pageDots: false,
  wrapAround: true,
};

export function HomePage() {
  return (
    <div style={{ maxWidth: "100%", overflow: "clip" }}>
      <AppBar position="static">
        <Toolbar sx={{ flexDirection: { sm: 'row' }, alignItems: 'center', gap: 1, padding: { xs: 0, sm: "0 32px 0 32px" } }}>
          <Typography variant="h6" fontWeight={"bold"} color="white" sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }} fontSize={{ xs: '24px' }}>
            Лестницы от мастера
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} width={{ xs: '60%', sm: 'auto' }} fontSize={{ xs: '20px', sm: 'auto' }} spacing={1} alignItems="center">
            <Button color="inherit" href="#/albom" sx={{ fontSize: "inherit", textAlign: "center" }}>Альбом работ</Button>
            <Button color="inherit" href="#contacts" sx={{ fontSize: "inherit", textAlign: "center" }}>Контакты</Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container style={{ maxWidth: "1250px" }} sx={{ paddingTop: { xs: '22px', sm: '32px' }, px: "16px", paddingBottom: 0 }}>
        <Typography variant="h3" fontSize={{ xs: '28px', sm: '48px' }} gutterBottom>
          Изготовление лестниц и металлоконструкций
        </Typography>

        <Typography variant="h6" fontSize={{ xs: '18px', sm: '20px' }} gutterBottom>
          Опыт более 10 лет. Быстро, качественно и с гарантией.
          Большой альбом <strong>собственных</strong> работ. Приглашаем посмотреть и выбрать подходящее решение лично!
        </Typography>

        <Box sx={{ my: 2, margin: "16px -16px 16px -16px" }}>
          <Flickity className="carousel" options={flickityOptions}>
            {fileNames.map((fileName, index) => (
              <div key={fileName} className="carousel-cell">
                <img src={`/albom/stairs/${fileName}`}
                  alt={`Фото ${index + 1}`}
                />
              </div>
            ))}
          </Flickity>

          <div className="albom-link-wrapper">
            <Link href="#/albom" fontWeight={"bold"}>
              Наши работы
            </Link>
          </div>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h5" gutterBottom>
            Наши услуги
          </Typography>
          <List>
            {[
              "Монтаж лестничных ограждений",
              "Монтаж лестничного полотна",
              "Монтаж навесов",
              "Строительство заборов из евроштакетника",
              "Строительство заборов из сетки Рабица"
            ].map((service, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={service} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Typography variant="h5" gutterBottom>
          Контакты
        </Typography>
      </Container>
      <Contacts></Contacts>
    </div>
  );
}
