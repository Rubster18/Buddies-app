import React from "react";
import Header from "./Header";
import Button from "./Button";
import Footer from "./Footer";


const Homepage = () => {
    return (
        <div className="homepage">
            <Header />
                <div className="Jumbotron">

                </div>

                    <div className="homepage-container">
                        <h1>Welcome to beelbuddy, the social service matching tool</h1> 
                        <h2>Select buddy if you are a social service student</h2>

                        <div className="homepage-button-container">
                            <Button route="/BuddiesForm" buttonType="big" text="I am a buddy" />
                            <Button route="/StudentForm" buttonType="big" text="I want a buddy" />
                        </div>
                    </div>
                <Footer />
        </div>
    );
}

export default Homepage;