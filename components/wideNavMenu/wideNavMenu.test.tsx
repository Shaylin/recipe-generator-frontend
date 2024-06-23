import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import WideNavMenu from "@/components/wideNavMenu/wideNavMenu";
import React from "react";

describe("Nav Menu", () => {
  it("Should render a navigation element", () => {
    render(<WideNavMenu className="test-class"/>);
    
    const navMenuElement = screen.getByRole("navigation");
    
    expect(navMenuElement).toBeInTheDocument();
  });
  
  it("Should render links to the site pages", async () => {
    render(<WideNavMenu className="test-class"/>);
    
    const linkElements = screen.getAllByRole("link");
    
    expect(linkElements.length).toBe(2);
    
    expect(screen.getByText("Project Info")).toBeInTheDocument();
    expect(screen.getByText("Other Info")).toBeInTheDocument();
  });
});