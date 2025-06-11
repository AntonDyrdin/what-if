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
import { WhatsAppIcon, VKIcon, Avito } from "./../assets/icons";
import "flickity/css/flickity.css";


export function Contacts() {
  return (<Box id="contacts">
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
      }}>
        <Stack direction={{
          xs: 'column',
          sm: 'row'
        }} spacing={4} alignItems="start" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocationOnIcon color="primary" />
            <Typography variant="h5">Липецк, район пл. Героев</Typography>
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
            <Typography variant="h5">+7 (999) 123-45-67</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon color="primary" />
            <Typography variant="h5">master@lestnicy.ru</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={{
            xs: 2,
            sm: 4
          }}>
            <Link href="https://t.me/yourname" target="_blank">
              <TelegramIcon sx={{
                color: '#0088cc'
              }} fontSize="large" />
            </Link>
            <Link href="https://wa.me/79991234567" target="_blank">
              <WhatsAppIcon sx={{
                color: '#25D366'
              }} fontSize="large" />
            </Link>
            <Link href="https://vk.com/yourprofile" target="_blank">
              <VKIcon sx={{
                color: '#4c75a3'
              }} fontSize="large" />
            </Link>
            <Link href="https://www.avito.ru/user/b7fe635c048a2c5abd83fd230bd94e0f/profile?id=7356338031" target="_blank">
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