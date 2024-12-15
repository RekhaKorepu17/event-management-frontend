import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import LoginForm from "./Login";
import { MemoryRouter } from "react-router-dom";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

describe("LoginForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form with email and password fields", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  test("validates password field", async () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  test("handles login with correct credentials", async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "validemail@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "validpassword" },
    });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `http://localhost:3001/user?email=validemail%40example.com&password=validpassword`
      );
      expect(alertMock).toHaveBeenCalledWith("Logged in");
    });
  });

  test("shows error when email is not registered", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: 404 },
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "nonexistent@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Email is not registered")).toBeInTheDocument();
    });
  });

  test("shows error when incorrect password is provided", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: 401 },
    });

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "validemail@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "incorrectpassword" },
    });

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Incorrect password")).toBeInTheDocument();
    });
  });

  test("navigates to the registration page when 'Register here' is clicked", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const registerLink = screen.getByText("Register here");
    fireEvent.click(registerLink);

    expect(window.location.pathname).toBe("/");
  });
});
