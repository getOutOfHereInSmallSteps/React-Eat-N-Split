import React, { useState } from 'react';
import { Button } from './Button';

export const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
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

  const calculateBillHandler = e => {
    e.preventDefault();

    if (!bill || !payedUserExpense) return;

    onSplitBill(whoPays === 'user' ? payedFriendExpense : -payedUserExpense);
  };

  return (
    <form className="form-split-bill" onSubmit={calculateBillHandler}>
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
