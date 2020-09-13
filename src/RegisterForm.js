import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RegisterForm = () => {

  const history = useHistory();
  const [state, setState] = useState({
    name: "",
    birthDate: "",
    email: "",
    hobbies: "",
    hometown: ""
  });

  //getting the values

  const onChange = (e) => {
    let data = {...state};
    data[e.target.name] = e.target.value;
    setState(data);
  };
  const storeDataInDatabase = (data) => {
    localStorage.setItem('form_data', JSON.stringify(data));
    const myObjStr =  JSON.parse(localStorage.getItem('form_data'));
    console.log(myObjStr);
    history.push('/ThankYou');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    storeDataInDatabase(state);
  }

  //form function
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
      name="name"
      placeholder="Name"
      value={state.name}
      onChange={onChange}
      required/>

      <label htmlFor="birthDate"> Birthdate </label>
      <input
      type="date"
      name="birthDate"
      placeholder=""
      value={state.birthDate}
      onChange={onChange}
      required/>

      <label htmlFor="email">Email</label>
      <input
      type="email"
      name= "email"
      placeholder="Email"
      value={state.email}
      onChange={onChange}
      required/>

      <label htmlFor="hometown"> Hometown</label>
      <input
      name= "hometown"
      placeholder="Hometown"
      value={state.hometown}
      onChange={onChange}
      required/>

      <label htmlFor="hobbies">Hobbies and interests</label>
      <textarea
      name= "hobbies"
      placeholder="Hobbies and interests"
      value={state.hobbies}
      onChange={onChange}
      required/>

      <button type="submit" className="big-button">Send</button>
    </form>
  )
}

export default RegisterForm;