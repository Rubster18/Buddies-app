import React from 'react';



const Modal = ({person, show, closeModal}) => {

    console.log(show)
   if (!show) {
     return null;
   }
    return(
      <div className="modal-box" id="modal-box">
         <div className="modalcontainer">
            <h1 className="modal-head">{person.name}</h1>
            <div className="close-btn" onClick={closeModal}> x </div>
            <div className="modal-props">

              <div className="modalp">
                <div className="textrows">
                <p> <b>Leeftijd: </b> </p>
                <p className="underlined">{person.age}</p>
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
                  <p className="underlined"> {person.buddy_patient}</p> 
                </div>
              </div>

              <div className="hobbiebox">
                <div className="textrows">
                  <p> <b> hobby's en interesses:</b></p> 
                  <p>{person.hobbies}</p>
                </div>
              </div>
          </div>
          

          <div className="btn-container">
                <button className="small-button delete"> Delete </button>
                <button className="match-btn" > Move to match list</button>
            </div>

         </div>
        <div className="overlay" onClick={closeModal}></div>
      </div>
    )
  };

  export default Modal;