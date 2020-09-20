import React from 'react';
import RegisterForm from './RegisterForm.js';
import Header from './Header';

const StudentForm = () => {
    return(
        <div>
            <Header />
                <div className="container-form">
                <h1> I want a buddy</h1>
                <h2> I want a social service student buddy</h2>
                <RegisterForm value={0}/>
            </div>
        </div>
    )
};

export default StudentForm;