import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { deleteExpense } from '../utils/renders';

function Items(props) {
  const exp = props.data;
  
  function getDate() {
    let dater = new Date(Date.parse(exp.date));
    let txt = dater.toString();
    let date = txt.substring(8, 10) + " " + txt.substring(4, 7);
    return date;
  }

  const handleDelete = () => {
    let datar = {
      expenseId: exp._id,
      userId: exp.usersid
    };
    deleteExpense(datar);
  };

  return (
    <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow group">
      <div className="flex flex-col gap-1">
        <p className="text-slate-900 font-bold text-lg tracking-wide">₹ {exp.amount}</p>
        <div className="flex items-center gap-3">
          <span className="text-indigo-700 bg-indigo-50 text-xs font-semibold px-2 py-0.5 rounded-full border border-indigo-100">
            {exp.category}
          </span>
          <span className="text-slate-500 text-xs font-medium">
            {getDate()}
          </span>
        </div>
      </div>

      <button 
        onClick={handleDelete}
        className="text-slate-400 hover:text-rose-600 p-2 rounded-full hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
        title="Delete expense"
      >
        <AiFillDelete size={18} />
      </button>
    </div>
  );
}

export default Items;