import { render, screen } from "@testing-library/react";
import LoginForm from "../Components/LoginForm";

test('renders login form', async () => {
  render(<LoginForm />)
  const usernameInput = await screen.findByPlaceholderText(/username/i)
  const passwordInput = await screen.findByPlaceholderText(/password/i)
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
})