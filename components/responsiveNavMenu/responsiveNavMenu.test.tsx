import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import ResponsiveNavMenu from "@/components/responsiveNavMenu/responsiveNavMenu";

describe("Responsive Nav Menu", () => {
  describe("When the screen is in a narrow mobile view", () => {
    it("Should render a single navigation menu", () => {
      render(<ResponsiveNavMenu/>);
      
      const elements = screen.getAllByRole("navigation");
      expect(elements.length).toBe(1);
    });
  });
});