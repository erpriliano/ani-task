import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CollectionDetail } from "../pages";

describe("Collection Detail", () => {
  it("renders with correct data from path", () => {
    const mockCollection = [
      {
        id: 1,
        collectionNames: ["test1", "test2"],
      },
      {
        id: 2,
        collectionNames: ["test2", "test4"],
      },
    ];

    localStorage.getItem = jest.fn().mockImplementation((name) => {
      if (name === "myAnimeCollection") {
        return JSON.stringify(mockCollection);
      }
      return null;
    });

    render(
      <MemoryRouter initialEntries={[`/collection/test1`]}>
        <Routes>
          <Route path="/collection/:media" element={<CollectionDetail />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("test1")).toBeInTheDocument();
  });
});
