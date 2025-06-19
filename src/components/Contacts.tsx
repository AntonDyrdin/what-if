import React from "react";
import {
  Typography,
  Box,
  Container,
  Link,
  Stack
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TelegramIcon from "@mui/icons-material/Telegram";
import { WhatsAppIcon, VKIcon, Avito } from "./../assets/icons";
import "flickity/css/flickity.css";


export function Contacts() {
  return (
    <Box id="contacts">
      <Box sx={{
        width: "100&",
        bgcolor: '#f5f5f5',
        padding: "32px 32px 60px 32px"
      }}>
        <Container style={{ maxWidth: "1250px" }} sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: {
            xs: '32px',
            sm: '16px'
          },
          padding: 0,
        }}>
          <Stack direction={{
            xs: 'column',
            sm: 'row'
          }} spacing={4} alignItems="start" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOnIcon color="primary" />
              <Typography variant="h6">Липецк, ул. Тельмана, 116</Typography>
            </Stack>
          </Stack>

          <Stack direction={{
            sm: 'column',
            md: 'row'
          }} spacing={{
            xs: 4
          }} justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={1}>
              <PhoneIcon color="primary" />
              <a href="tel:+7(993)430-88-06" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="h6">+7(993)430-88-06</Typography>
              </a>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EmailIcon color="primary" />
              <a href="mailto:konika1973@mail.ru" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="h6">konika1973@mail.ru</Typography>
              </a>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={{
              xs: 2,
              sm: 4
            }}>
              <Link href="https://t.me/+79205008900" target="_blank">
                <TelegramIcon sx={{
                  color: '#0088cc'
                }} fontSize="large" />
              </Link>
              <Link href="https://wa.me/79205008900" target="_blank">
                <WhatsAppIcon sx={{
                  color: '#25D366'
                }} fontSize="large" />
              </Link>
              <Link href="https://www.avito.ru/user/0fe5689d4feac06ab0dcd315f353f8b9/profile" target="_blank">
                <Avito sx={{
                  color: '#4c75a3'
                }} fontSize="large" />
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>);
}