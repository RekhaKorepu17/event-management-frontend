import "./EventDetails.css";
import { useLocation } from "react-router-dom";

const EventDetails = () => {
    const location = useLocation();
    const { event } = location.state;

    return (
        <div className="event-details-container">
            <div className="event-box">
                <img className="event-image" src={event.imageUrl} alt={event.name} />
                <div className="event-details">
                    <h2 className="event-title">{event.name}</h2>
                    <p className="event-description">{event.description}</p>
                    <div className="event-info">
                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(event.eventDate).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Time:</strong>
                            {`${new Date(event.startTime).toLocaleTimeString()} - ${new Date(
                                event.endTime
                            ).toLocaleTimeString()}`}
                        </p>
                        <p>
                            <strong>Address:</strong> {event.address}
                        </p>
                        <p>
                            <strong>Type:</strong> {event.eventType}
                        </p>
                        <p>
                            <strong>Organizer:</strong> {event.organizerName} (
                            {event.organizerContact})
                        </p>
                    </div>
                    {event.eventStatus === "active" && (
                        <button className="register-btn">Register</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
