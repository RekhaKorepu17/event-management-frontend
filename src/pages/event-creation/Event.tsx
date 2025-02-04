import { useForm } from "react-hook-form";
import "./Event.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      const eventPayload = {
        event: data,
      };
      const response = await axios.post(
        "http://localhost:3001/event",
        eventPayload
      );
      console.log("event created", response.status);
      if (response.status === 201) {
        window.alert("event created succesfully");
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        window.alert("Event already created");
      }
      console.error("Error while fetching ");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Event</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        role="form"
        className="horizontal-form"
      >
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Event name is required" })}
            />
            {errors.name && (
              <p className="error">{(errors as any).name.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="error">{String(errors.description.message)}</p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              {...register("eventDate", { required: "Event date is required" })}
            />
            {errors.eventDate && (
              <p className="error">{(errors as any).eventDate.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <input
              type="time"
              id="startTime"
              {...register("startTime", { required: "Start time is required" })}
            />
            {errors.startTime && (
              <p className="error">{(errors as any).startTime.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <input
              type="time"
              id="endTime"
              {...register("endTime", { required: "End time is required" })}
            />
            {errors.endTime && (
              <p className="error">{(errors as any).endTime.message}</p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="error">{(errors as any).address.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="eventType">Event Type</label>
            <select
              id="eventType"
              {...register("eventType", { required: "Event type is required" })}
            >
              <option value="">Select event type</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Business">Business</option>
            </select>
            {errors.eventType && (
              <p className="error">{(errors as any).eventType.message}</p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="eventStatus">Event Status</label>
            <select
              id="eventStatus"
              {...register("eventStatus", {
                required: "Event status is required",
              })}
            >
              <option value="">Select event status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
            {errors.eventStatus && (
              <p className="error">{(errors as any).eventStatus.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="organizerName">Organizer Name</label>
            <input
              type="text"
              id="organizerName"
              {...register("organizerName", {
                required: "Organizer name is required",
              })}
            />
            {errors.organizerName && (
              <p className="error">{(errors as any).organizerName.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="organizerContact">Organizer Contact</label>
            <input
              type="text"
              id="organizerContact"
              {...register("organizerContact", {
                required: "Organizer contact is required",
              })}
            />
            {errors.organizerContact && (
              <p className="error">
                {(errors as any).organizerContact.message}
              </p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="url" id="imageUrl" {...register("imageUrl")} />
          </div>
        </div>
        <button type="submit" className="submit-btn" id="createEventBtn">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default Event;
