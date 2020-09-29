import React , {useState, useEffect} from 'react';
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
        
    })
    const [flag, setFlag] = useState(false);

    const handleFunction  =(e)=>{
        setLoginCredentials({...loginCredentials , [e.target.name] : e.target.value})
        
    }
    
    const sudmitForm = (e) =>{
        e.preventDefault();
        console.log(loginCredentials);
        const {email , password} = loginCredentials;
        console.log(email, password);
        if (email === "a@ton.com" && password === "b") {

            console.log(email, password);
            setFlag(true);
        }
    }
    if (flag ) {
        console.log("hello, something is wrong man :(");
        return <Redirect to="/AdminTable" />
    }
    else{

        return (
            <div>
            <Header />
            <div className="container-form">
                <h1>Login</h1>
                <h2>Toegang voor beheerders</h2>


                <form onSubmit ={sudmitForm} > 
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