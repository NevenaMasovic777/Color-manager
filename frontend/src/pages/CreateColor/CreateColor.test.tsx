import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateColor from "./CreateColor";
import { useColorStore } from "../../store/color";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { useNavigate } from "react-router-dom";

vi.mock("../../store/color", () => ({
  useColorStore: vi.fn(() => ({
    createColor: vi.fn(),
    colors: [],
  })),
}));

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: vi.fn(() => mockNavigate),
}));

vi.mock("react-hook-form", () => ({
  ...vi.importActual("react-hook-form"), // Preserve other exports
  useForm: () => ({
    register: vi.fn(),
    handleSubmit:
      (fn: (data: { hex: string; name: string }) => void) =>
      (e: React.FormEvent) => {
        e.preventDefault();
        fn({ hex: "#000000", name: "Test Color" });
      },
    setValue: vi.fn(),
    formState: { errors: {} },
  }),
}));

const mockCreateColor = vi.fn();
const mockNavigate = vi.fn();

beforeEach(() => {
  vi.mocked(useColorStore).mockReturnValue({
    createColor: mockCreateColor,
    colors: [],
  });

  vi.mocked(useNavigate).mockReturnValue(mockNavigate);
});

afterEach(() => {
  vi.clearAllMocks();
});

test("renders the form with inputs and a submit button", () => {
  render(<CreateColor />);
  const colorInput = screen.getByLabelText("Select color");
  expect(colorInput).toBeInTheDocument();

  const nameInput = screen.getByLabelText("Color name");
  expect(nameInput).toBeInTheDocument();

  const submitButton = screen.getByRole("button", { name: /submit/i });
  expect(submitButton).toBeInTheDocument();
});
