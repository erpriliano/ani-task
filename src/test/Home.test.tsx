import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Home } from "../pages";
import { mocksData } from "./mock";

describe("Home", () => {
  it("renders the card component 10 times", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocksData}>
          <Home />
        </MockedProvider>
      </MemoryRouter>,
    );

    const cards = await screen.findAllByTestId("card");
    expect(cards).toHaveLength(10);
  });

  it("renders the paginator component", async () => {
    render(
      <MemoryRouter>
        <MockedProvider mocks={mocksData}>
          <Home />
        </MockedProvider>
      </MemoryRouter>,
    );

    const paginator = await screen.findByTestId("paginator");
    expect(paginator).toBeInTheDocument();
  });
});
