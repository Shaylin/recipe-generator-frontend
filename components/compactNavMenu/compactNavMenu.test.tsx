import "@testing-library/jest-dom";
import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import CompactNavMenu from "./compactNavMenu";

describe("CompactNavMenu Function", () => {
  it("Should render a button to expand the compact nav menu", () => {
    const { getByRole } = render(<CompactNavMenu className="test-class"/>);
    const button = getByRole("button");
    
    expect(button).toBeInTheDocument();
  });
  
  it("Should expand the navigation menu when the button is clicked", async () => {
    const { getByRole } = render(<CompactNavMenu className="test-class"/>);
    const button = getByRole("button");
    
    await act(async () => {
      fireEvent.click(button);
    });
    
    const nav = getByRole("navigation");
    
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass("fixed");
  });
  
  it("Should render links correctly when the button is clicked", async () => {
    const { getByRole } = render(<CompactNavMenu className="test-class"/>);
    const button = getByRole("button");
    
    await act(async () => {
      fireEvent.click(button);
    });
    
    expect(screen.getByText("Project Info")).toBeInTheDocument();
    expect(screen.getByText("Other Info")).toBeInTheDocument();
  });
});