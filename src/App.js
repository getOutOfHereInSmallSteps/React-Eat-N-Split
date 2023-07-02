import React, { useState } from 'react';

import './index.css';
import { initialFriends } from './data';

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

const Friend = ({ friendData, onSelect, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friendData.id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friendData.image} alt={friendData.name} />
      <h3>{friendData.name}</h3>
      {friendData.balance < 0 && (
        <p className="red">
          You owe {friendData.name} {Math.abs(friendData.balance)}€
        </p>
      )}
      {friendData.balance > 0 && (
        <p className="green">
          {friendData.name} owe you {friendData.balance}€
        </p>
      )}
      {friendData.balance === 0 && <p>You and {friendData.name} are even</p>}

      <Button onClick={() => onSelect(friendData)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
};

const FormAddFriend = ({ onAddFriend }) => {
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

const FormSplitBill = ({ selectedFriend }) => {
  const [bill, setBill] = useState('');
  const [payedUserExpense, setPayedUserExpense] = useState('');
  const [whoPays, setWhoPays] = useState('user');

  const payedFriendExpense = bill ? bill - payedUserExpense : '';

  const billChangeHandler = e => {
    const billInput = +e.target.value;

    if (isNaN(billInput)) {
      return;
    }
    if (billInput < payedUserExpense) {
      setPayedUserExpense('');
    }

    setBill(billInput);
  };
  const expenseChangeHandler = e => {
    const expenseInput = +e.target.value;
    if (isNaN(expenseInput) || expenseInput > bill) return;

    setPayedUserExpense(expenseInput);
  };
  const selectionHandler = e => {
    const selectedWhoPays = e.target.value;

    setWhoPays(selectedWhoPays);
  };

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💵 Bill value</label>
      <input type="text" value={bill} onChange={billChangeHandler} />

      <label>👤 Your expenses</label>
      <input
        type="text"
        value={payedUserExpense}
        onChange={expenseChangeHandler}
      />

      <label>👯‍♀️ {selectedFriend.name}'s expenses</label>
      <input type="text" value={payedFriendExpense} disabled />

      <label>🤑 Who is paying the bill</label>
      <select value={whoPays} onChange={selectionHandler}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

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

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
};

export default App;
