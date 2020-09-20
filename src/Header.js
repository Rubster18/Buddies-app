import React from 'react';
import Button from './Button'

const Header = () => {
    return(
        <header>
            <div className="header-flex-container">
                <a href="/" className=" logo">bb</a>

                <div className="small-buttons-container">
                <a className="button link" href="/">Home</a>
                <Button route="/Login" buttonType="small" text="Login"/>
                </div>
            </div>

        </header>
    )
}

export default Header;