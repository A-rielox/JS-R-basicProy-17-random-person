import React, { useState, useEffect } from 'react';
import {
   FaEnvelopeOpen,
   FaUser,
   FaCalendarTimes,
   FaMap,
   FaPhone,
   FaLock,
} from 'react-icons/fa';

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/66.jpg';

function App() {
   const [loading, setLoading] = useState(true);
   const [person, setPerson] = useState(null);
   const [title, setTitle] = useState('name');
   const [value, setValue] = useState('random person');

   const getPerson = async () => {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data.results[0].name.first);

      // DESTRUCTURANDO
      const person = data.results[0];
      const { phone, email } = person;
      const { large: image } = person.picture;
      // const { password } = person.login; // o la otra sintaxis
      const {
         login: { password },
      } = person;
      const { first, last } = person.name;
      const {
         dob: { age },
      } = person;
      // const { number, name } = person.location.street; // o la otra
      const {
         street: { number, name },
      } = person.location;

      const newPerson = {
         image,
         phone,
         email,
         password,
         age,
         street: `${name} ${number}`,
         name: `${first} ${last}`,
      };

      setPerson(newPerson);
      setLoading(false);
      setTitle('name');
      setValue(newPerson.name);
   };

   useEffect(() => {
      getPerson();
   }, []);

   // ⭐⭐⭐ como dentro del button esta el icon, el e.target va a ser, o el button, o el icon, por eso el if() {}
   const handleValue = e => {
      if (e.target.classList.contains('icon')) {
         const newValue = e.target.dataset.label;
         setValue(person[newValue]);
         setTitle(newValue);
         // si en lugar de "setValue(person[newValue])" pongo "setValue(person[title])" o "e.target..." q en teoria seria lo mismo, no funciona bien, ya q depende de otros states q puede q no se actualicen a tiempo, o q no se pase el q se espera
      }
   };

   // {(person && person.image) || defaultImage} si no es 'null" => agarra person.image, si es falsy => agarra la default
   // se hace asi xq como de momento es mull => el object no existe y al tratar de agarrar la propiedad image => da error en el caso de poner "{ person.image || defaultImage }"

   return (
      <main>
         <div className="block bcg-black"></div>
         <div className="block">
            <div className="container">
               <img
                  src={(person && person.image) || defaultImage}
                  alt="random user"
                  className="user-img"
               />
               <p className="user-title">my {title} is</p>
               <p className="user-value">{value}</p>

               <div className="values-list">
                  <button
                     className="icon"
                     data-label="name"
                     onMouseOver={handleValue}
                  >
                     <FaUser />
                  </button>

                  <button
                     className="icon"
                     data-label="email"
                     onMouseOver={handleValue}
                  >
                     <FaEnvelopeOpen />
                  </button>

                  <button
                     className="icon"
                     data-label="age"
                     onMouseOver={handleValue}
                  >
                     <FaCalendarTimes />
                  </button>

                  <button
                     className="icon"
                     data-label="street"
                     onMouseOver={handleValue}
                  >
                     <FaMap />
                  </button>

                  <button
                     className="icon"
                     data-label="phone"
                     onMouseOver={handleValue}
                  >
                     <FaPhone />
                  </button>

                  <button
                     className="icon"
                     data-label="password"
                     onMouseOver={handleValue}
                  >
                     <FaLock />
                  </button>
               </div>

               <button className="btn" type="button" onClick={getPerson}>
                  {loading ? 'loading...' : 'random user'}
               </button>
            </div>
         </div>
      </main>
   );
}

export default App;
