import React from './react';
import error404 from './Images/error404.png';
import Footer from './Footer';

const BrokenLink = () =>{
    return(
        <div>
            <Header />
            <h1> Oops! error 404!</h1>
            <img className="error404" src={error404} alt="beelbuddies logo broken displaying 404 number below it" />
            <Footer />
        </div>
    )

}

export default BrokenLink;