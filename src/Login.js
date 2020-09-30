import React , {useState} from 'react';
import Header from './Header';
import {Redirect} from 'react-router-dom'

//import auth from './Auth';
//import { useHistory } from 'react-router-dom';
// const history = useHistory();

// const handleLoging =(e) => {

//     e.preventDefault();
//     auth.login(()=>{
//         history.push("/AdminTable");
//     });
    
//     console.log(auth.authenticated)
// }

const Login = (props) => {
    

    const [loginCredentials, setLoginCredentials] = useState({
        email : "",
        password: "",
        loggedIn : false
    })

    const handleFunction  =(e)=>{
        setLoginCredentials({...loginCredentials , [e.target.name] : e.target.value})
        
    }
    
    const submitForm = (e) =>{
        e.preventDefault();
        
        const {email , password} = loginCredentials;
        
        const sendmethod = {
            method: 'POST', 
            body: JSON.stringify(loginCredentials),
            headers:{
            'Content-Type': 'application/json'
            }
        }
        fetch("https://beel-buddy-backend.herokuapp.com:9000/get-login-info",sendmethod)
        .then((res) => res.json())
        .then((message) => console.log(message))


        if (email === "a@ton.com" && password === "b") {

            console.log(email, password);
            localStorage.setItem("token","aketeloneto");
            setLoginCredentials({...loginCredentials , loggedIn : true});
        }
    }
    if (loginCredentials.loggedIn) {
        
        return <Redirect to="/AdminTable" />
    }
    else{

        return (
            <div>
            <Header />
            <div className="container-form">
                <h1>Login</h1>
                <h2>Toegang voor beheerders</h2>


                <form onSubmit ={submitForm} > 
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={loginCredentials.email} onChange={handleFunction}/>

                    <label htmlFor="password">Wachtwoord</label>
                    <input type="password" name="password" value={loginCredentials.password} onChange={handleFunction}/>

                    <button type="submit" className="big-button">Login</button>
                </form>
            </div>
        </div>
    );
}
}

export default Login;