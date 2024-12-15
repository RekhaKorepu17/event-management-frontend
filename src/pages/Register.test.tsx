import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import RegisterForm from "./Register";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

describe("RegisterForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form with all fields", () => {
    render(
      < MemoryRouter><RegisterForm /></MemoryRouter>);
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Mobile Number")).toBeInTheDocument();

    const elements = screen.getAllByText("Register");
    expect(elements).toHaveLength(2);

    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });

  test("validates username field", async () => {
    render(
      < MemoryRouter><RegisterForm /></MemoryRouter>);

    const usernameInput = screen.getByLabelText("Username");

    const registerButton = screen.getByRole("button", { name: "Register" });

    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
    });

    fireEvent.change(usernameInput, { target: { value: "ab" } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(
        screen.getByText("Username must be at least 3 characters")
      ).toBeInTheDocument();
    });
  });

  test("validates email field", async () => {
    render(
      < MemoryRouter><RegisterForm /></MemoryRouter>);

    const emailInput = screen.getByLabelText("Email");

    const registerButton = screen.getByRole("button", { name: "Register" });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  test("validates password field", async () => {
    render(
      < MemoryRouter><RegisterForm /></MemoryRouter>);

    const passwordInput = screen.getByLabelText("Password");

    const registerButton = screen.getByRole("button", { name: "Register" });

    // Trigger validation
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });

    fireEvent.change(passwordInput, { target: { value: "123" } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 6 characters")
      ).toBeInTheDocument();
    });
  });

  test("toggles password visibility", () => {
    render(
      < MemoryRouter><RegisterForm /></MemoryRouter>);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByLabelText("toggle password visibility");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("handles API errors (email already exists)", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { status: 400 },
    });

    render(
      < MemoryRouter><RegisterForm /></MemoryRouter>);

    // Fill in the form
    fireEvent.change(screen.getByLabelText("Username"), {
      target: { value: "JohnDoe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "existingemail@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Mobile Number"), {
      target: { value: "9876543210" },
    });
    fireEvent.click(screen.getByLabelText("User"));

    const registerButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(alertMock).toHaveBeenCalledWith("Email already exists");
    });
  });

  test("submits form with valid data", async () => {
    mockedAxios.post.mockResolvedValueOnce({ status: 201 });

    render(
      < MemoryRouter><RegisterForm /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "JohnDoe" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "johndoe@example.com" },
    });

    const passwordFields = screen.getAllByLabelText(/password/i);
    const passwordField: any = passwordFields.find(
      (field: any) => field.type === "password"
    );
    fireEvent.change(passwordField, { target: { value: "password123" } });

    fireEvent.change(screen.getByLabelText(/mobile number/i), {
      target: { value: "9876543210" },
    });

    fireEvent.click(screen.getByRole("radio", { name: /user/i }));

    const registerButton = screen.getByRole("button", { name: /register/i });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://localhost:3001/users",
        {
          username: "JohnDoe",
          email: "johndoe@example.com",
          password: "password123",
          mobile: "9876543210",
          role: "User",
        }
      );

      expect(alertMock).toHaveBeenCalledWith("Account created succesfully");
    });
  });
});
