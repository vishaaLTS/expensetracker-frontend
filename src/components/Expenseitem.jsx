const Expenseitem = ({ item, deleteExpense, editExpense }) => {
  const { title, amount, _id } = item;
  const type = amount < 0 ? "negative" : "positive";

  return (
    <div className={`expense-item ${type}`}>
      <span className="title">{title}</span>
      <span className="amount">{amount}</span>
      <div className="btn-container">
        <button className="delete-btn" onClick={() => deleteExpense(_id)}>
          Delete
        </button>
        <button className="delete-btn" onClick={() => editExpense(item)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default Expenseitem;
