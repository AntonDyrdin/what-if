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
import { WhatsAppIcon, VKIcon } from "../../assets/icons";
import "flickity/css/flickity.css";
import "./styles.scss";
import { url } from "inspector";

const flickityOptions = {
  initialIndex: 0,
  autoPlay: false,
  fullscreen: true,
  setGallerySize: false
};


const fileNames = [
  "1.EZ2OC7a5vXS4vD95oB98_hmou346KKv2N6i_cDKit3Y.1aMsgYexR5Tn-c1YSygRISY8aXbllY_dmmJPFNu9YPE", "1.Kk3EgLa5hqTyNwSpnMgeSmojgK5wo5AmfSOEoHgpjKY.cQryFdY2CgHAcKoVyHVacZKUrk1FxwG-yH7yehKirCU", "1.UuUk9ra4_gwSQXwBDIcylCpU_AqaV3waElr8DpRf9gaS.Hfgs6dZdvc9EU8xbCXBmIVlGYXYdqqmjHIQb9PnNCos", "1.DD8-Sra5oNYI_SLbKko4OJDpptyKabZUh-mi0oLjqtQ.2EC1cx2b7I7wXiUKKoLq3S94A1GU3lzCzVNEovVykrU", "1.DjfQdLa5ot7mwyDTwFBXfjbXpNRkV7Rcadeg2mzdqNw.6e4n8OLA92CErlNQXCyO2PNVtZO3wmkSfPlKPxAV6Yk", "1.UT6f4ra4_depVX_asZ8rMp9A_9EhQ3_BqU7_1S9L9d0p.xRWwfO6VhrV3SYlwYDVs6weGOTpyso44BuwcqTzOFlk", "1.zcEwGra4YSgGreMlJhGssD64Yy6Ou-M-BrZjKoCzaSKG.xuSSf-4DDdyroIzhx7fLJrLcmbaMpc3PW6z1YM-1zRk", "1.oqAbI7a5DkktlIxEUx3ghIqACEOvABjLooAMTaeKBEs.0Of6quFokCJ2GtKZREeYmyerT82GaGJObH_aHiUKs4M", "1.XfplEra58RNTpXMeUx9p_cux9xnRMeeR3LHzF9m7-xE._5bcPC_ECQdsN0IBMTkAV175Xzt54nzSwb8-SFXuO7k", "1.Y-FRara5zwhn3U0FG2NGodzJyQLlSdmK6MnNDO3DxQo.H7jR-bm8EMTxccsZ2MHa1AcjcAaQHqtpQJGEZMJgZ0Q", "1.jPnRw7a5IBDndKIdxfHP3UBgJhpl4DaSaGAiFG1qKhI.webp", "1.Zu2wIra4ygSGlUgJ8G8x2aqDyAIOg0gSho7IBgCLwg4G.1uvfqn-COUsosPJ47Qo5sySzJVkGajfMgsszIb-qw2k", "1.TqNEnba54kpyKmBHVIBu48k-5EDwvvTI_T7gTvg06Eg.1ReKdEQd0Vpmb2CzQlimisiM05yQqudBAJA9swIjbEg", "1.aXbDKLa5xZ_1n0eSnVFZIWuLw5V3C9MdeovHm3-Bz50.ZAU2VJiud7x-fetop4yjKL3NqnN49gGuvSqfhf2j7_M", "1.jCM8n7a4IMoKKKLHKMH6dEc9IsyCPqLcCjMiyIw2KMCK.oL58q3PkwkdgkOE8yWUsfT7UhhFDILx7aADlxO5h9XY", "1.T-ziBra44wXUsWEI8Hs14OKk4QNcp2ET1KrhB1Kv6w9U.7M6vEwUspR6JCNStYBzWJ8HM0GikBYjC6BaMgtKCvyI", "1.4ap2ira4TUNAPc9OON2apnYoT0XIK89VQCZPQcYjRUnA.PsIFtu8GFZG37OFk59vqDVp-Vf6R0MWQ0iiBsfrXRvI", "1.UxJaeba5__tszn32cBAKW7za-fHuWul549r9_-bQ9fk.webp", "1.zsmMx7a5YiC6cOAtnID6ziJkZCo45HSiNWRgJDBuaCI.xSo4SBYJp2Ny_6gX08L1_f2uoC9Gr4HJcufFLE89z0c"
];

export function Albom() {
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
