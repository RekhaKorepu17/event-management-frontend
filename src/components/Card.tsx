import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OrganizerIcon from "@mui/icons-material/AccountCircle";
import { EventProps } from "../types/EventProps";

const EventCard: React.FC<EventProps> = ({
  name,
  description,
  eventDate,
  startTime,
  endTime,
  address,
  eventStatus,
  organizerName,
  imageUrl,
  role, 
}) => {
  return (
    <Card
      sx={{
        width: 350,
        maxWidth: 500,
        borderRadius: 3,
        boxShadow: 4,
        position: "relative",
        margin: 2,
      }}
    >
      <CardMedia
        component="img"
        alt={name}
        height="150"
        image={imageUrl || "https://via.placeholder.com/200"}
      />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1" color="text.primary" display="flex">
            <EventIcon fontSize="small" sx={{ marginRight: 1 }} />
            {new Date(eventDate).toDateString()}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" display="flex">
            <AccessTimeIcon fontSize="small" sx={{ marginRight: 1 }} />
            {`${new Date(startTime).toLocaleTimeString()} - ${new Date(
              endTime
            ).toLocaleTimeString()}`}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            display="flex"
            sx={{ marginTop: 1 }}
          >
            <LocationOnIcon fontSize="small" sx={{ marginRight: 1 }} />
            {address}
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            display="flex"
            sx={{ marginTop: 1 }}
          >
            <OrganizerIcon fontSize="small" sx={{ marginRight: 1 }} />
            {organizerName}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
     
        <p style={{marginTop: '-10px', color:'red'}}>
        {eventStatus === "active" ? "upcoming": 'completed'}
        </p>
      </CardActions>
    </Card>
  );
};

export default EventCard;
