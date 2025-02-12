import React, { useEffect, useState } from "react";
import EventCard from "../../components/Card";
import "./DashBoard.css";
import axios from "axios";
import { useGlobalState } from "../../GlobalContext/globalContext";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("Entertainment");

  const { events, setEvents } = useGlobalState();
  const navigate = useNavigate();

  const { user } = useGlobalState();
  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    try {
      const BASE_URL= process.env.REACT_APP_BASE_URL;
      const response: any = await axios.get(`${BASE_URL}/events`);
      if (response && response.status === 200) {
        setEvents(response.data.events);
      }
    } catch (error: any) {
      console.error("Error while fetching events:", error);
    }
  };

  const filteredEvents = events.filter(
    (event: any) =>
      event.eventType === selectedTab &&
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Eventbrite</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="welcome">
          <p className="welcome-text"> Welcome </p>
        </div>
      </div>

      <div className="tabs">
        <button className="tab" onClick={() => setSelectedTab("Entertainment")}>
          Entertainment
        </button>
        <button className="tab" onClick={() => setSelectedTab("Education")}>
          Education
        </button>
        <button className="tab" onClick={() => setSelectedTab("Business")}>
          Business
        </button>
      </div>
      <div className="events-container">
        {filteredEvents.map((event: any) => (
          <div
            key={event.id}
            onClick={() => navigate("/EventDetails", { state: { event } })}
          >
            <EventCard key={event.id} {...event} />
          </div>
        ))}
      </div>
      <div className="create-event">
        {true ? (
          <button className="event-button" onClick={() => navigate("/event")}>
            Create Event
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="footer">
        <p>©All Rights Reserved to Eventbrite - 2024.</p>
      </div>
    </div>
  );
};

export default DashBoard;
