import { render, screen } from "@testing-library/react";
import Hero from "../components/hero";

test("render Hero", () => {
  render(<Hero />);
  const headerElement = screen.getByRole("heading", {
    name:"Brainstorm, find new ideas, solve problems... fast.",
  });
  expect(headerElement).toBeInTheDocument();
});
