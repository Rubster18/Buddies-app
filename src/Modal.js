import React from 'react';
import {useHistory} from 'react-router-dom'

const Modal = ({person, show, closeModal, tableData}) => {
  //Determining user to match and current user 
  // const currentUser = {id: person.id, isBuddy: person.im_a_buddy};
  
  let history = useHistory();
  //Function to disable a user from the modal
  const disableUser = (person) => {
    const url = "http://localhost:9000/disable-user";

    const data = {
      isBuddy: person.im_a_buddy,
      id: person.id
    }
    

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .catch( error => console.error("Error: ", error))
    .then( response => console.log("Success:", response) )
    
    closeModal();
    history.push("/AdminTable");

    //window.location.reload();
  }

  //Function to make the fetch of making a new match 
  const fetchNewMatch = (user1, user2) => {
    console.log("Inside fetchNewMatch receiving user1", user1, "user2", user2);
    const data = {
      isBuddy_u1: user1.isBuddy,
      id_u1: user1.id,
      isBuddy_u2: user2.isBuddy,
      id_u2: user2.id
    }

    const url = "http://localhost:9000/create-match";

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .catch( error => console.error("Error: ", error))
    .then( response => console.log("Success:", response) )
  }

  //Function to make the fetch of disabling an existent match and creating a new one
  const fetchUpdateMatch = (currentUser, matchUser) => {
    const url = "http://localhost:9000/update-match";

    const data = {
      current_isBuddy: currentUser.isBuddy,
      current_id: currentUser.id,
      match_isBuddy: matchUser.isBuddy,
      match_id: matchUser.id
    }

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .catch( error => console.error("Error: ", error))
    .then( response => console.log("Success:", response) )
    
  }

  const getMultipleMatchesArray = () => {

    //Array with the number of occurrences for each person
    const occurrenceNumArr = [];

    tableData.map( element => {
      //If the element does not exist in the array, result will be undefined
      const result = occurrenceNumArr.find( el => el.id === element.id && el.isBuddy === element.im_a_buddy );
      
      if(result) {
        //The element has been already counted before, so we increase the counter and add the name to the matchName array
        
        result.numberOfRepeats++;
        result.matchName.push(element.matchname);

      } else {
        //The element has not been counted, so we add it to the array
        occurrenceNumArr.push({
          isBuddy: element.im_a_buddy,
          id: element.id,
          numberOfRepeats: 1,
          matchName: [element.matchname]
        })
      }
    })

    //Creates an array with the id of the user and a string with all the matches
    const matchesArray = occurrenceNumArr.map(element => {
      return {
        isBuddy: element.isBuddy,
        id: element.id,
        matches: element.matchName.join(', ')
      };
    });

    return matchesArray;
  }

  const getMatchesByUser = (id, isBuddy, arr) => {
    if(id && isBuddy && arr){
      const matches = arr.find(element => element.id === id && element.isBuddy == isBuddy).matches; 
      console.log(`The matches for the id ${id} and isBuddy ${isBuddy} are: ${matches}`);
      
      return matches;
    }
  }

  //Function to match two users
  const matchUsers = () => {
    //Buddy ==1, Patient ==0
    console.log("Matching Users");

    
    const personBuddy = person.im_a_buddy;
    const personId = person.id;

    const currentUser = {
      isBuddy : personBuddy,
      id : personId
    }

    
    const matchUserId = document.getElementsByTagName("select")[0].value === "DEFAULT"? -1: parseInt(document.getElementsByTagName("select")[0].value);
    const matchUserBuddy = !personBuddy;
    
    //-----------------------------
    //If the user selected an option
    //------------------------------
    if(matchUserId != -1) {

      const matchUser = {
        isBuddy : matchUserBuddy,
        id : matchUserId
      }
      
      const currentUser_match = person.matchname;
  
      if(currentUser_match) {
        //The user already has a match 
        //Finish the current match
        //And then create a new match with the new user
  
        console.log("The user already has a match");
        fetchUpdateMatch(currentUser, matchUser);
  
        
      } else if(person.im_a_buddy == 1) {
        //The user is a buddy and has to be matched with a patient
        fetchNewMatch(currentUser, matchUser);
      } else if(person.im_a_buddy == 0) {
        //The user is a patient and has to be matched with a buddy
        fetchNewMatch(currentUser, matchUser);
      }
    } else {
      console.log("The user didn't select an option")
    }

    closeModal();
    window.location.reload();

  }

  //Function to calculate the age based on the dateofbirth
  const calculate_age = (dateofbirth) => { 
    const date = new Date(dateofbirth);
    const diff_ms = Date.now() - date.getTime();
    const age_dt = new Date(diff_ms); 
  
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  // const userPosition = tableData.indexOf(person);
  // const tableWithoutUser = tableData.splice(userPosition, 1);
  // console.log("La tabla sin el user ahora es: >>>", tableWithoutUser);

  const age = calculate_age(person.dateofbirth);
  
  //Determine if the person is a buddy or a patient
  let buddy_patient = ""; 
  person.im_a_buddy === 1 ? buddy_patient = "Buddy" : buddy_patient = "Patient";

  //I for the map of the array 
  let i = 1;

  
  console.log("Table data es: ", tableData);

  const matchesArray = getMultipleMatchesArray();
  console.log("the array of matches is", matchesArray);

  if (!show) {
     //Don't show the modal if the flag is false
     return null;
   }
    //Show the modal if required
    return (
      <div className="modal-box" id="modal-box">
         <div className="modalcontainer card">
            <h2 className="modal-head">{person.name}</h2>
            <div className="close-btn" onClick={closeModal}> x </div>
            <div className="modal-props">

              <div className="modalp underlined">
                <div className="textrows">
                <p> <b>Leeftijd: </b> </p>
                <p className="border-b">{age}</p>
               </div>
              </div>
              <div className="modalp underlined">
                <div className="textrows">
                  <p> <b>Email:</b></p>
                  <p className="border-b">{person.email}</p>
                </div>
              </div>

              <div className="modalp underlined">
                <div className="textrows">
                  <p> <b>Geboorteplaats:</b> </p> 
                  <p className="border-b">{person.hometown}</p>
                </div>
              </div>

              <div className="modalp underlined">
                <div className="textrows">
                  <p><b>Maatje of patiënt?</b> </p>
                  <p className="border-b"> {buddy_patient}</p> 
                </div>
              </div>

              <div className="hobbiebox underlined">
                <div className="textrows">
                  <p> <b> hobby's en interesses:</b></p> 
                  <p>{person.hobbiesandinterests}</p>
                </div>
              </div>

              <div className="hobbiebox underlined">
                <div className="textrows">
                  <p> <b>Match</b></p> 
                  <select name="selectMatch" defaultValue={'DEFAULT'}>
                    {/* If the user has a match, the default value for the select would be the name of the match, otherwise it will be "Select" */}
                    
                    {getMatchesByUser(person.id, person.im_a_buddy, matchesArray) ? <option value='DEFAULT' disabled>{getMatchesByUser(person.id, person.isBuddy, matchesArray)}</option> : <option disabled value='DEFAULT'>Select</option>}
                    
                    {  
                      tableData.map( element => {
                        if(element.im_a_buddy === person.im_a_buddy || (element.id === person.id && element.im_a_buddy === person.im_a_buddy)) {
                          i++;
                          return null;
                        }
                        
                        i++;
                        return <option value={element.id} key={i}>{element.name} ({person.im_a_buddy === 0? "Buddy" : "Patient"})</option>
                      })
                    }
                  </select>
                </div>
              </div>
          </div>
          

          {/*<div className="btn-container">
                <button className="small-button delete" onClick={() => disableUser(person)}> Delete </button>
                <button className="match-btn" onClick={matchUsers}> Save</button>
            </div>
                <button className="match-btn" > Move to match list</button>
            </div>*/}

         </div>
        <div className="overlay" onClick={closeModal}></div>
      </div>
    )
  };

/*  
------- USE THIS WHEN DELETE + MATCH FUNTIONALITIES ARE IMPLEMENTED ----------
<div className="btn-container"> 
  <button className="small-button delete"> Verwijderen </button>
  <button className="match-btn" > Ga naar de matchlijst </button>
</div> */

  export default Modal;