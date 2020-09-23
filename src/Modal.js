import React from 'react';

const Modal = ({person, show, closeModal, updateData}) => {

  
  const disableUser = (person) => {
    
    const url = "http://localhost:9000/disable-user";
    const data = {
      isBuddy: person.im_a_buddy,
      id: person.id
    }

    fetch(url, {
      method: 'PUT',
      // body: data,
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .catch( error => console.error("Error: ", error))
    .then( response => console.log("Success:", response) )
    
    // updateData(data.id, data.isBuddy);
    closeModal();
  }

  function calculate_age(dateofbirth) { 
    const date = new Date(dateofbirth);
    const diff_ms = Date.now() - date.getTime();
    const age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  const age = calculate_age(person.dateofbirth);
  let buddy_patient = ""; 

  person.im_a_buddy === 1 ? buddy_patient = "Buddy" : buddy_patient = "Patient";

    // console.log(show)
    // console.log(person)
   if (!show) {
     return null;
   }
    return(
      <div className="modal-box" id="modal-box">
         <div className="modalcontainer">
            <h2 className="modal-head">{person.name}</h2>
            <div className="close-btn" onClick={closeModal}> x </div>
            <div className="modal-props">

              <div className="modalp">
                <div className="textrows">
                <p> <b>Leeftijd: </b> </p>
                <p className="underlined">{age}</p>
               </div>
              </div>
              <div className="modalp">
                <div className="textrows">
                  <p> <b>Email:</b></p>
                  <p className="underlined">{person.email}</p>
                </div>
              </div>

              <div className="modalp">
                <div className="textrows">
                  <p> <b>Geboorteplaats:</b> </p> 
                  <p className="underlined">{person.hometown}</p>
                </div>
              </div>

              <div className="modalp">
                <div className="textrows">
                  <p><b>Maatje of patiënt?</b> </p>
                  <p className="underlined"> {buddy_patient}</p> 
                </div>
              </div>

              <div className="hobbiebox">
                <div className="textrows">
                  <p> <b> hobby's en interesses:</b></p> 
                  <p>{person.hobbiesandinterests}</p>
                </div>
              </div>
          </div>
          

          <div className="btn-container">
                <button className="small-button delete" onClick={() => disableUser(person)}> Delete </button>
                <button className="match-btn" > Move to match list</button>
            </div>

         </div>
        <div className="overlay" onClick={closeModal}></div>
      </div>
    )
  };

  export default Modal;