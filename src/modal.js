import React from 'react';



const Modal = ({person, show, closeModal}) => {

    console.log(show)
   if (!show) {
     return null;
   }
    return(
      <div className="modal-box">
         <h1>{person.name}</h1>
         <div className="modalcontainer">
            <p className="modalprops">age: {person.age}</p>
            <p className="modalprops">email: {person.email}</p>
            <p className="modalprops">hometown: {person.hometown}</p>
            <p className="modalprops">hobbies and interests: {person.hobbies}</p>
            <p className="modalprops">buddy or patient? {person.buddy_patient}</p>
         </div>
         <div className="btn-container">
            <button className="small-button delete"> Delete </button>
            <button className="small-button close" onClick={closeModal}> Close </button>
        </div>
        <div className="overlay"></div>
      </div>
    )
  };

  export default Modal;