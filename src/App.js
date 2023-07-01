import React from 'react';

import './index.css';
import { initialFriends } from './data';

const FriendsList = () => {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map(el => (
        <Friend key={el.id} friendData={el} />
      ))}
    </ul>
  );
};

const Friend = ({ friendData }) => {
  return (
    <li>
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

      <Button>Select</Button>
    </li>
  );
};

const FormAddFriend = () => {
  return (
    <form className="form-add-friend">
      <label>👯‍♀️ Friend name</label>
      <input type="text" />

      <label>🎇 Image URL</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💵 Bill value</label>
      <input type="text" />

      <label>👤 Your expenses</label>
      <input type="text" />

      <label>👯‍♀️ X's expenses</label>
      <input type="text" disabled />

      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

const Button = ({ children }) => {
  return <button className="button">{children}</button>;
};

const App = () => {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>

      <FormSplitBill />
    </div>
  );
};

export default App;
