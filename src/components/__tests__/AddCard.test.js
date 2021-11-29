import React from "react";
import { render } from "@testing-library/react";
import AddCard from "../AddCard";

describe("Add card component", () => {
  it('shows add city card, card description and add icon on page load', () => {
    const { getByTestId } = render(<AddCard />);
    const cardDescription = "Add a City";

    expect(getByTestId("add-card")).toHaveTextContent(cardDescription);
  });
});