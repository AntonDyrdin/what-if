import React, { useState } from 'react';
import {
  Box,
  Grid,
  Dialog,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CloseIcon from '@mui/icons-material/Close';

type PhotoGalleryProps = {
  images: string[]; // Массив путей к изображениям
};

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = (src: string) => {
    setCurrentImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentImage(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        {images.map((src, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                height: '400px',
                '&:hover .zoom-icon': {
                  opacity: 1
                },
              }}
              style={{

              }}
              onClick={() => handleOpen(src)}
            >
              <img
                src={src}
                alt={`Фото ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: "cover",
                  display: 'block',
                  borderRadius: '8px'
                }}
              />
              <IconButton
                className="zoom-icon"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }}
              >
                <ZoomInIcon />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { backgroundColor: 'rgba(0,0,0,0.95)' } }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#fff',
            zIndex: 1000
          }}
        >
          <CloseIcon />
        </IconButton>
        {currentImage && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <img
              src={currentImage}
              alt="Полноэкранное фото"
              style={{
                maxWidth: '100%',
                maxHeight: '93vh',
              }}
            />
          </Box>
        )}
      </Dialog>
    </Box>
  );
};
