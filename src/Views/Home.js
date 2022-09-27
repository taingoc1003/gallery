import React from "react";
import Todo from "./Todo/Todo";
import Gallery from "./Gallery/Gallery"

const Home = () => {
    return (
        <>
            <section className="todo">
                <Todo />
            </section>

            <section className="gallery">
                <Gallery />
            </section>
        </>
    )
}

export default Home;