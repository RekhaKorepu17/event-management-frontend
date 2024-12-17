import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Event from "./Event";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
const mockAxios: any = axios as jest.Mocked<typeof axios>;
const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

describe("Event Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form with all fields", () => {
    render(
      <Router>
        <Event />
      </Router>
    );

    expect(screen.getByLabelText(/Event Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Date/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Time/)).toBeInTheDocument();
    expect(screen.getByLabelText(/End Time/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Type/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Event Status/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Organizer Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Organizer Contact/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Image URL/)).toBeInTheDocument();
  });

  test("displays error messages when form fields are not filled", async () => {
    render(
      <Router>
        <Event />
      </Router>
    );

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText(/Event name is required/)).toBeInTheDocument();
      expect(screen.getByText(/Description is required/)).toBeInTheDocument();
      expect(screen.getByText(/Event date is required/)).toBeInTheDocument();
      expect(screen.getByText(/Start time is required/)).toBeInTheDocument();
      expect(screen.getByText(/End time is required/)).toBeInTheDocument();
      expect(screen.getByText(/Address is required/)).toBeInTheDocument();
      expect(screen.getByText(/Event type is required/)).toBeInTheDocument();
      expect(screen.getByText(/Event status is required/)).toBeInTheDocument();
      expect(
        screen.getByText(/Organizer name is required/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Organizer contact is required/)
      ).toBeInTheDocument();
    });
  });
  test("submits form with valid data", async () => {
    mockAxios.post.mockResolvedValueOnce({ status: 201 });

    render(
      <MemoryRouter>
        <Event />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Event Name/), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText(/Description/), {
      target: { value: "Event Description" },
    });
    fireEvent.change(screen.getByLabelText(/Event Date/), {
      target: { value: "2024-12-20" },
    });
    fireEvent.change(screen.getByLabelText(/Start Time/), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText(/End Time/), {
      target: { value: "12:00" },
    });
    fireEvent.change(screen.getByLabelText(/Address/), {
      target: { value: "Event Address" },
    });
    fireEvent.change(screen.getByLabelText(/Event Type/), {
      target: { value: "Education" },
    });
    fireEvent.change(screen.getByLabelText(/Event Status/), {
      target: { value: "active" },
    });
    fireEvent.change(screen.getByLabelText(/Organizer Name/), {
      target: { value: "Organizer Name" },
    });
    fireEvent.change(screen.getByLabelText(/Organizer Contact/), {
      target: { value: "1234567890" },
    });

    const button: any = document.getElementById("createEventBtn");
    fireEvent.click(button);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("event created succesfully");
    });
  });
  test("should show alert event already created ", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { status: 409 },
    });

    render(
      <MemoryRouter>
        <Event />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Event Name/), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText(/Description/), {
      target: { value: "Event Description" },
    });
    fireEvent.change(screen.getByLabelText(/Event Date/), {
      target: { value: "2024-12-20" },
    });
    fireEvent.change(screen.getByLabelText(/Start Time/), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText(/End Time/), {
      target: { value: "12:00" },
    });
    fireEvent.change(screen.getByLabelText(/Address/), {
      target: { value: "Event Address" },
    });
    fireEvent.change(screen.getByLabelText(/Event Type/), {
      target: { value: "Education" },
    });
    fireEvent.change(screen.getByLabelText(/Event Status/), {
      target: { value: "active" },
    });
    fireEvent.change(screen.getByLabelText(/Organizer Name/), {
      target: { value: "Organizer Name" },
    });
    fireEvent.change(screen.getByLabelText(/Organizer Contact/), {
      target: { value: "1234567890" },
    });

    const button: any = document.getElementById("createEventBtn");
    fireEvent.click(button);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Event already created");
    });
  });
});
