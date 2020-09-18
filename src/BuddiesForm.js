import React from 'react';
import RegisterForm from './RegisterForm.js';
import Header from './Header';
const BuddiesForm = () =>  {
        return(
            <div>
                <Header />
                <div className="container-form">
                <h1> I want to be a buddy</h1>
                <h2> I am a social service student </h2>
                <RegisterForm value={1}/>
            </div>
            </div>
        );
};

export default BuddiesForm;