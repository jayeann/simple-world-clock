import React from "react";
import { render, screen } from "@testing-library/react";
import Clock from "../Clock";

test('should render clock component', () => {
  render(<Clock />);
  const clockElement = screen.getByTestId('clock-text');
  expect(clockElement).toBeInTheDocument();
})