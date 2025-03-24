import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Homepage from "./Homepage";
import { useColorStore } from "../../store/color";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

vi.mock("../../store/color", () => ({
  useColorStore: vi.fn(() => ({
    fetchColors: vi.fn(),
    colors: [],
  })),
}));

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useSearchParams: () => [new URLSearchParams(), vi.fn()],
}));

const mockFetchColors = vi.fn();

const mockColors = [
  { id: 1, name: "Red", hex: "#FF0000" },
  { id: 2, name: "Green", hex: "#00FF00" },
  { id: 3, name: "Blue", hex: "#0000FF" },
];

beforeEach(() => {
  vi.mocked(useColorStore).mockReturnValue({
    fetchColors: mockFetchColors,
    colors: mockColors,
  });

  render(<Homepage />);
});

afterEach(() => {
  vi.clearAllMocks();
});

test("renders the homepage with colors", () => {
  const searchInput = screen.getByTestId("search-input");

  expect(searchInput).toBeInTheDocument();

  mockColors.forEach((color) => {
    expect(screen.getByText(color.name)).toBeInTheDocument();
  });
});

test("filters colors based on search term", () => {
  const searchInput = screen.getByTestId("search-input");

  fireEvent.change(searchInput, { target: { value: "Red" } });

  expect(screen.getByText("Red")).toBeInTheDocument();
  expect(screen.queryByText("Green")).not.toBeInTheDocument();
  expect(screen.queryByText("Blue")).not.toBeInTheDocument();
});

test('displays "No colors to display" when no colors match the search term', () => {
  vi.mocked(useColorStore).mockReturnValue({
    fetchColors: mockFetchColors,
    colors: [],
  });

  const searchInput = screen.getByTestId("search-input");

  fireEvent.change(searchInput, { target: { value: "Yellow" } });

  expect(screen.getByText("No colors to display")).toBeInTheDocument();
});
