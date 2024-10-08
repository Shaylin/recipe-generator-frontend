import { Fragment, JSX } from "react";
import Header from "@/components/header/header";
import RecipeGenerator from "@/components/recipeGenerator/recipeGenerator";
import Footer from "@/components/footer/footer";

export default function Home(): JSX.Element {
  return (
    <Fragment>
      <Header/>
      <main className="flex min-h-screen-minus-32 flex-col items-center justify-center mt-24 p-4">
        <RecipeGenerator/>
      </main>
      <Footer/>
    </Fragment>
  );
}
