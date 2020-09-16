import React, {useState} from 'react';
import Modal from './Modal';
import Header from './Header';

const listOfPeople = [
    { id: 1, name: "Ale", age: 21, email: "test@email.com", hometown: "barcelona", hobbies: "dancing, singing, playing, watching movies", buddy_patient: "buddy" },
    { id: 2, name: "Andy", age: 22, email: "test@email.com", hometown: "barcelona", hobbies: "dancing, singing, playing, watching movies", buddy_patient: "patient" },
    { id: 3, name: "Bruce", age: 25, email: "test@email.com", hometown: "barcelona", hobbies: "dancing, singing, playing, watching movies", buddy_patient: "buddy" },
    { id: 4, name: "Ki", age: 27, email: "test@email.com", hometown: "barcelona", hobbies: "dancing, singing, playing, watching movies", buddy_patient: "patient" },
    { id: 5, name: "Klim", age: 29, email: "test@email.com", hometown: "barcelona", hobbies: "dancing, singing, playing, watching movies", buddy_patient: "patient" },
    { id: 6, name: "Ruben", age: 20, email: "test@email.com", hometown: "barcelona", hobbies: "dancing, singing, playing, watching movies", buddy_patient: "buddy" }
  ];

const AdminTable = () => {
    const [show, setShow] = useState(false);
    const [person, setPerson] = useState({});

        const showModal = (person) =>{
          setPerson(person)
          setShow(true)
        }
        const closeModal = () =>{
            setShow(false)
        }
    return (
        <div>
            <Header />
            <Modal show={show} closeModal={closeModal} person={person}/>
            <div className="container-form">
                <h1>Table of participants</h1>

                <table id="tableId">
                    <thead>
                        <th className="name-column">Name</th>
                        <th className="age-column">Age</th>
                        <th className="email-column">Email</th>
                        <th className="hometown-column">Hometown</th>
                        <th className="hobbies-column">Hobbies/Interest</th>
                        <th className="buddy-column">Buddy or patient?</th>
                    </thead>
                    <tbody>
                        {listOfPeople.map( person => (
                            
                            <tr key={person.id} className={person.buddy_patient} onClick={()=>showModal(person)}>
                                <td className="name-column">{person.name}</td>
                                <td className="age-column">{person.age}</td>
                                <td className="email-column">{person.email}</td>
                                <td className="hometown-column">{person.hometown}</td>
                                <td className="hobbies-column">{person.hobbies}</td>
                                <td className="buddy-column">{person.buddy_patient}</td>
                            </tr>
                        ) )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminTable;