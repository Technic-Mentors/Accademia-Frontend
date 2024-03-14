import { useTheme } from "@emotion/react";
import { PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Container, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

const Teacher = () => {
    const theme = useTheme();
    return (
        <div>
            <Box textAlign="center" mt={3}>
                <h6 className="section-title bg-white text-center text-primary px-3">Teachers</h6>
                <h1 className="mb-5">Our Experience Teachers</h1>
            </Box>
            <Container>
                <Grid container spacing={3}>
                    <Grid item md={6}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="img/testimonial-4.jpg"
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Teacher
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Instructor
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        {theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <PlayArrow sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                    <IconButton aria-label="next">
                                        {theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}
                                    </IconButton>
                                </Box>
                            </Box>

                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="img/testimonial-1.jpg"
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Live From Space
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        {theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <PlayArrow sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                    <IconButton aria-label="next">
                                        {theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}
                                    </IconButton>
                                </Box>
                            </Box>
                            
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="img/testimonial-2.jpg"
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Live From Space
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        {theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <PlayArrow sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                    <IconButton aria-label="next">
                                        {theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}
                                    </IconButton>
                                </Box>
                            </Box>
                            
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card sx={{ display: 'flex' }}>
                        <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image="img/testimonial-3.jpg"
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Live From Space
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        {theme.direction === 'rtl' ? <SkipNext /> : <SkipPrevious />}
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                        <PlayArrow sx={{ height: 38, width: 38 }} />
                                    </IconButton>
                                    <IconButton aria-label="next">
                                        {theme.direction === 'rtl' ? <SkipPrevious /> : <SkipNext />}
                                    </IconButton>
                                </Box>
                            </Box>
                            
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Teacher;