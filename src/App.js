import React, { useState } from 'react';

import './index.css';
import { initialFriends } from './data';
import FriendsList from './components/FriendsList';
import { FormAddFriend } from './components/FormAddFriend';
import { FormSplitBill } from './components/FormSplitBill';
import { Button } from './components/Button';

const App = () => {
  const [friendsList, setFriendsList] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const toggleShowFriendHandler = () => {
    setShowAddFriend(prevShow => !prevShow);
  };

  const addFriendHandler = friendData => {
    setFriendsList(prevList => [...prevList, friendData]);
    setShowAddFriend(false);
  };

  const selectFriendHandler = friend => {
    setSelectedFriend(prevFriendData =>
      prevFriendData?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  };

  const splitBillHandler = value => {
    setFriendsList(prevList =>
      prevList.map(el =>
        el.id === selectedFriend.id
          ? { ...el, balance: el.balance + value }
          : el
      )
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friendsList}
          onSelectFriend={selectFriendHandler}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={addFriendHandler} />}

        <Button onClick={toggleShowFriendHandler}>
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={splitBillHandler}
        />
      )}
    </div>
  );
};

export default App;
