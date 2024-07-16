import { Fragment, JSX } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function ProjectInfo(): JSX.Element {
  return (
    <Fragment>
      <Header/>
      <main className="flex min-h-screen flex-col items-center justify-between mt-24 p-6">
        Project Info
      </main>
      <Footer/>
    </Fragment>
    )
}