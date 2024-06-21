import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import NavMenu from "@/components/navMenu/navMenu";
import React from "react";

describe("Nav Menu", () => {
    it("Should render a navigation element", () => {
        render(<NavMenu/>);

        const navMenuElement = screen.getByRole("navigation");

        expect(navMenuElement).toBeInTheDocument();
    });

    it("Should render links to the site pages", async () => {
        render(<NavMenu/>);

        const linkElements = screen.getAllByRole("link");

        expect(linkElements.length).toBe(3);

        expect(screen.getByText("Sweets")).toBeInTheDocument();
        expect(screen.getByText("Savouries")).toBeInTheDocument();
        expect(screen.getByText("Delivery Info")).toBeInTheDocument();
    });
});