import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BrandLogo from "@/components/brandLogo/brandLogo";

describe("Brand Logo", () => {
  it("Should render the logo image", () => {
    render(<BrandLogo/>);

    const brandLogo = screen.getByRole("img");

    expect(brandLogo).toBeInTheDocument();
  });

  it("Should render the logo link to the home page", () => {
    render(<BrandLogo/>);

    const brandLogoLink = screen.getByRole("link");

    expect(brandLogoLink).toBeInTheDocument();
  });
});