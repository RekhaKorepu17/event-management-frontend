import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DashBoard from "./DashBoard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../GlobalContext/globalContext";

jest.mock("axios");
jest.mock("../../GlobalContext/globalContext");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("DashBoard Component", () => {
  const mockSetEvents = jest.fn();
  const mockNavigate = jest.fn();
  const mockEvents = [
    { id: 1, name: "Music Concert", eventType: "Entertainment" },
    { id: 2, name: "Tech Conference", eventType: "Education" },
    { id: 3, name: "Startup Meetup", eventType: "Business" },
  ];

  beforeEach(() => {
    (useGlobalState as jest.Mock).mockReturnValue({
      events: mockEvents,
      setEvents: mockSetEvents,
      user: { username: "Rekha" },
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  it("renders the dashboard with title, search bar, tabs, and footer", () => {
    const { getByRole } = render(<DashBoard />);
    const header = getByRole("heading", { name: /Eventbrite/i });
    expect(header).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search events/i)).toBeInTheDocument();
    expect(screen.getByText(/Entertainment/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Business/i)).toBeInTheDocument();
    expect(
      screen.getByText(/©All Rights Reserved to Eventbrite - 2024./i)
    ).toBeInTheDocument();
  });

  it("fetches events and sets them on mount", async () => {
    const mockEvents = [
      { id: 1, name: "Music Concert", eventType: "Entertainment" },
      { id: 2, name: "Tech Conference", eventType: "Education" },
      { id: 3, name: "Startup Meetup", eventType: "Business" },
    ];
    const mockResponse = { status: 200, data: { events: mockEvents } };
    (axios.get as jest.Mock).mockResolvedValue(mockResponse);

    render(<DashBoard />);

    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith("http://localhost:3001/events")
    );
    expect(await screen.findByText(/Music Concert/i)).toBeInTheDocument();
  });

  it("navigates to the EventDetails page when an event card is clicked", () => {
    render(<DashBoard />);

    fireEvent.click(screen.getByText(/Music Concert/i));
    expect(mockNavigate).toHaveBeenCalledWith("/EventDetails", {
      state: { event: mockEvents[0] },
    });
  });

  it("navigates to the Create Event page when the 'Create Event' button is clicked", () => {
    render(<DashBoard />);

    fireEvent.click(screen.getByText(/Create Event/i));
    expect(mockNavigate).toHaveBeenCalledWith("/event");
  });

  it("displays a welcome message with the user's username", () => {
    render(<DashBoard />);

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
  });

  it("handles errors during API calls gracefully", async () => {
    (axios.get as jest.Mock).mockRejectedValue(
      new Error("Error while fetching events")
    );

    render(<DashBoard />);

    await waitFor(() => expect(axios.get).toHaveBeenCalled());
    expect(mockSetEvents).not.toHaveBeenCalled();
  });
});
