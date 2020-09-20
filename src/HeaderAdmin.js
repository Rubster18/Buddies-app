import React from 'react'
import Button from './Button';

const  HeaderAdmin = () => {
    return (
        <div>
            <header>
                <div className="header-flex-container">
                    <a href="/" className=" logo">bb</a>

                    <div className="small-buttons-container">
                        <Button route="/Login" buttonType="small" text="Logout"/>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default HeaderAdmin;
