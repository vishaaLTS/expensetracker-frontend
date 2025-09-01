import Expenseitem from "./Expenseitem";

const History = ({ transactions, deleteExpense, editExpense }) => {
  return (
    <div className="history">
      <h4>History</h4>
      {transactions.map((item) => (
        <Expenseitem
          key={item._id}
          item={item}
          deleteExpense={deleteExpense}
          editExpense={editExpense}
        />
      ))}
    </div>
  );
};

export default History;
