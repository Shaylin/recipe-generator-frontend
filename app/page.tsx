import {Fragment} from "react";
import Header from "@/components/header/header";

export default function Home() {
    return (
        <Fragment>
            <Header/>
            <main className="flex min-h-screen flex-col items-center justify-between mt-32 p-6">
                <div className="max-w-screen-lg bg-light-background p-6 rounded-md shadow">
                    DUT Diabetic-Friendly Recipe Generator
                </div>
            </main>
        </Fragment>
    );
}
