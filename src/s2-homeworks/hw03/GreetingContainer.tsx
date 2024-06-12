import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import Greeting from './Greeting';
import { UserType } from './HW3';

type GreetingContainerPropsType = {
   users: UserType[];
   addUserCallback: (name: string) => void;
};

export const pureAddUser = (
   name: string,
   setError: (error: string) => void,
   setName: (name: string) => void,
   addUserCallback: (name: string) => void
) => {
   if (name.trim() !== '') {
      addUserCallback(name);
      setName('');
   } else {
      setError('Ошибка! Введите имя!');
   }
   // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
};

export const pureOnBlur = (name: string, setError: (error: string) => void) => {
   if (name.trim() === '') {
      setError('Ошибка! Введите имя!');
   }
};

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
   if (e.key === 'Enter') {
      addUser();
   }
};

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({ users, addUserCallback }) => {
   // деструктуризация пропсов
   const [name, setName] = useState<string>('');
   const [error, setError] = useState<string>('');

   const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value); // need to fix

      error && setError('');
   };
   const addUser = () => {
      pureAddUser(name, setError, setName, addUserCallback);
   };

   const onBlur = () => {
      pureOnBlur(name, setError);
   };

   const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      pureOnEnter(e, addUser);
   };

   const totalUsers = users.length; // need to fix
   const lastUserName = users[users.length - 1]?.name; // need to fix
   console.log(lastUserName);

   return (
      <Greeting
         name={name}
         setNameCallback={setNameCallback}
         addUser={addUser}
         onBlur={onBlur}
         onEnter={onEnter}
         error={error}
         totalUsers={totalUsers}
         lastUserName={lastUserName}
      />
   );
};

export default GreetingContainer;
