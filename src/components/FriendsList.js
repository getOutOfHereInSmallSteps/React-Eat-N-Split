import React from 'react';
import { Friend } from './Friend';

const FriendsList = ({ friends, onSelectFriend, selectedFriend }) => {
  return (
    <ul>
      {friends.map(el => (
        <Friend
          key={el.id}
          friendData={el}
          onSelect={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};

export default FriendsList;
