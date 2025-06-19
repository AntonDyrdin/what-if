import React from "react";
import {
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import "./styles.scss";
import { stairs_frames, stairs_frames_with_steps, stairs, roof_frames, roofs, fence_frames, fences } from "../../assets/file-list";
import { Contacts } from "../../components/Contacts";
import { Menu } from "../../components/Menu";

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
      <Menu title={"Альбом работ"} path={"#/albom"} />

      <Container style={{ maxWidth: "1250px" }} sx={{ paddingTop: { xs: '22px', sm: '32px' }, px: "16px", paddingBottom: 0 }}>
        <Typography variant="h3" fontSize={{ xs: '28px', sm: '48px' }} gutterBottom>
          Изготовление лестниц и металлоконструкций
        </Typography>

        <Typography variant="h6" fontSize={{ xs: '18px', sm: '20px' }} gutterBottom>
          Опыт более 10 лет. Быстро, качественно и с гарантией.
          Большой альбом <strong>собственных</strong> работ. Приглашаем посмотреть и выбрать подходящее решение лично!
        </Typography>

        <Box sx={{ my: 2, margin: "16px -16px 26px -16px" }}>
          <Typography variant="h3" sx={{ margin: { xs: "20px 0 16px 0", sm: "22px 0 16px 0" } }} fontSize={{ xs: '18px', sm: '20px' }} fontWeight={"bold"} textAlign={"center"}>
            Готовые изделия
          </Typography>
          <Flickity className="carousel" options={flickityOptions}>
            {[
              ...stairs,
              ...roofs,
              ...fences
            ].map((fileName, index) => (
              <div key={fileName} className="carousel-cell">
                <img src={`/what-if/build/albom/${fileName}`}
                  alt={`Фото ${index + 1}`}
                />
              </div>
            ))}
          </Flickity>
          <Typography variant="h3" sx={{ margin: { xs: "22px 0 16px 0", sm: "26px 0 16px 0" } }} fontSize={{ xs: '18px', sm: '20px' }} fontWeight={"bold"} textAlign={"center"}>
            Каркасы
          </Typography>
          <Flickity className="carousel" options={flickityOptions}>
            {[
              ...stairs_frames,
              ...stairs_frames_with_steps,
              ...roof_frames,
              ...fence_frames,
            ].map((fileName, index) => (
              <div key={fileName} className="carousel-cell">
                <img src={`/what-if/build/albom/${fileName}`}
                  alt={`Фото ${index + 1}`}
                />
              </div>
            ))}
          </Flickity>

          <div className="albom-link-wrapper">
            <Link href="#/albom" fontSize={{ xs: '14px', sm: '16px' }} fontWeight={"bold"} textAlign={"center"}>
              Нажмите, чтобы перейти в альбом наших работ
            </Link>
          </div>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="h5">
            Наши услуги:
          </Typography>
          <List>
            {[
              "Монтаж лестничных ограждений",
              "Монтаж лестничного полотна",
              "Монтаж навесов",
              "Строительство заборов из профлиста",
              "Строительство заборов из сетки Рабица",
              "Изготовление и монтаж откатных ворот",
            ].map((service, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={service} primaryTypographyProps={{fontSize: { xs: '16px', sm: '18px' }}}/>
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
