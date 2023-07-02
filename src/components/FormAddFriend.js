import React, { useState } from 'react';
import { Button } from './Button';

export const FormAddFriend = ({ onAddFriend }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const nameInputChangeHandler = e => {
    const inputName = e.target.value;
    setName(inputName);
  };

  const imageInputChangeHandler = e => {
    const inputImage = e.target.value;
    setImage(inputImage);
  };

  const submitFriendHandler = e => {
    e.preventDefault();

    if (!name || !image) return;

    const friendId = crypto.randomUUID();

    const newFriend = {
      name,
      image: `${image}?=${friendId}`,
      balance: 0,
      id: friendId,
    };

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  };

  return (
    <form className="form-add-friend" onSubmit={submitFriendHandler}>
      <label>👯‍♀️ Friend name</label>
      <input type="text" value={name} onChange={nameInputChangeHandler} />

      <label>🎇 Image URL</label>
      <input type="text" value={image} onChange={imageInputChangeHandler} />

      <Button>Add</Button>
    </form>
  );
};
