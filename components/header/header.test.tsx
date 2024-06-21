import "@testing-library/jest-dom";
import React from "react";
import {render, screen} from "@testing-library/react";
import Header from "@/components/header/header";

describe("Header", () => {
    it("Should render a component with the banner role", () => {
        render(<Header/>);

        const bannerElement = screen.getByRole("banner");

        expect(bannerElement).toBeInTheDocument();
    });
});