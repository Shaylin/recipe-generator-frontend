import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("Should render the banner navigation element", () => {
    render(<Home/>);
    
    const bannerNav = screen.getByRole("banner");
    
    expect(bannerNav).toBeInTheDocument();
  });
});