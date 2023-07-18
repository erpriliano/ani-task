import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { AnimeDetail } from "../pages";
import { mocksDataById } from "./mock";

describe("Anime Detail", () => {
  it("renders the page with correct data", async () => {
    render(
      <MemoryRouter initialEntries={[`/detail/1`]}>
        <MockedProvider mocks={mocksDataById}>
          <Routes>
            <Route path="/detail/:id" element={<AnimeDetail />} />
          </Routes>
        </MockedProvider>
      </MemoryRouter>,
    );

    const title = await screen.findByTestId("anime-title");
    expect(title).toBeInTheDocument();
    expect(screen.getByAltText("Test Title English")).toHaveAttribute(
      "src",
      "https://example.com/image.jpg",
    );
    expect(screen.getByText("Popularity: 100")).toBeInTheDocument();
    expect(screen.getByText("Score: 80")).toBeInTheDocument();
    expect(screen.getByText("Year: 2020 - 2020")).toBeInTheDocument();
    expect(
      screen.getByText("Genres: Action, Adventure, Comedy"),
    ).toBeInTheDocument();
    expect(screen.getByText("Episodes: 12")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
