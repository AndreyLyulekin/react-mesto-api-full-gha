import { useRef, useState } from 'react';

export default function AuthForm({ btnText, onSubmit }) {
  const [email, setEmail] = useState('');
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      email: email,
      password: passwordRef.current.value,
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder='E-mail'
        className='auth__input'
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        name='password'
        placeholder='Пароль'
        className='auth__input'
        ref={passwordRef}
      />
      <button
        type='submit'
        className='auth__btn'>
        {btnText}
      </button>
    </form>
  );
}
