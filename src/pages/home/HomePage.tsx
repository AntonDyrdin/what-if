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
import { WhatsAppIcon, VKIcon } from "./../../assets/icons";
import "flickity/css/flickity.css";
import "./styles.scss";
import { url } from "inspector";

const flickityOptions = {
  initialIndex: 0,
  autoPlay: false,
  fullscreen: true,
  setGallerySize: false,
};


const fileNames = [
 "Изображение WhatsApp 2025-06-10 в 15.31.12_7513223e.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.12_459a4abc.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.09_75456907.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.13_b74159fd.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.14_0b9c08be.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.09_14ff511f.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.16_3eb73131.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.10_6aff8864.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.05_04a876ba.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.08_4989080d.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.13_3724a93e.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.14_b0f1214e.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.10_691a159c.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.07_31096ce3.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.06_688d4bec.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.16_2d5b5999.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.05_ccd3edab.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.13_1a7d80a8.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.14_0448dad9.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.13_32e5f661.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.14_192c8a84.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.08_7dfe6f2b.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.07_41855740.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.07_7da0a100.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.11_f98149aa.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.07_76f3aae4.jpg", "Изображение WhatsApp 2025-06-10 в 15.31.05_a8a551aa.jpg"
];

export function HomePage() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "end" }}>
          <Typography variant="h6" fontWeight={"bold"} sx={{ flexGrow: 1 }}>
            Лестницы от мастера
          </Typography>
          <Button color="inherit" href="#">Главная</Button>
          <Button color="inherit" href="#gallery">Альбом работ</Button>
          <Button color="inherit" href="#contacts">Контакты</Button>
        </Toolbar>
      </AppBar>

      <Container style={{ maxWidth: "1250px" }} sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom>
          Изготовление лестниц и металлоконструкций
        </Typography>

        <Typography variant="h6" gutterBottom>
          Опыт более 10 лет. Быстро, качественно и с гарантией.
          Большой альбом <strong>собственных</strong> работ. Приглашаем посмотреть и выбрать подходящее решение лично!
        </Typography>

        <Box id="gallery" sx={{ my: 2 }}>
          <Flickity className="carousel" options={flickityOptions}>
            {fileNames.map((fileName) => (
              <div key={fileName} className="carousel-cell" style={{ backgroundImage: `url('/albom/stairs/${fileName}')` }}>
              </div>
            ))}
          </Flickity>

          <div className="albom-link-wrapper">
            <Link href="#gallery" fontWeight={"bold"}>
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

        <Box sx={{ my: 4, marginBottom: "40px" }} id="contacts">
          <Typography variant="h5" gutterBottom>
            Контакты
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              bgcolor: '#f5f5f5',
              p: 3,
              borderRadius: 2
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="start" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <LocationOnIcon color="primary" />
                <Typography variant="h6">Липецк, пл. Ленина-Соборная, дом 1</Typography>
              </Stack>
            </Stack>

            <Stack direction="row" spacing={12} justifyContent="start">
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon color="primary" />
                <Typography variant="h6">+7 (999) 123-45-67</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmailIcon color="primary" />
                <Typography variant="h6">master@lestnicy.ru</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Link href="https://t.me/yourname" target="_blank">
                  <TelegramIcon sx={{ color: '#0088cc' }} fontSize="large" />
                </Link>
                <Link href="https://wa.me/79991234567" target="_blank">
                  <WhatsAppIcon sx={{ color: '#25D366' }} fontSize="large" />
                </Link>
                <Link href="https://vk.com/yourprofile" target="_blank">
                  <VKIcon sx={{ color: '#4c75a3' }} fontSize="large" />
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
