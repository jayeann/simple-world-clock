import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("test App", () => {
  it('should show simple world clock on page load', () => {
    const { getByTestId } = render(<App />);
    const headerTitle = "Simple World Clock";
    expect(getByTestId("header-title")).toHaveTextContent(headerTitle);
  });
  it('should show city on page load', () => {
    const { getByTestId } = render(<App />);
    const city = "Manila";
    expect(getByTestId("header-city")).toHaveTextContent(city);
  });

});