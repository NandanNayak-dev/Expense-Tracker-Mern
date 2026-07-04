import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Items from '../components/Items';
import { Chartss } from '../components/Chartss';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import LoadingBar from 'react-top-loading-bar';
import { createExpense, getUserExpenses } from '../utils/renders';
import NavBar from '../components/NavBar';

function Home() {
  const navigate = useNavigate();
  const [selectDate, setSelectedDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [userdata] = useState(JSON.parse(localStorage.getItem('User')));
  const [userexp, setUserexp] = useState([]);
  const ref = useRef(null);

  document.title = 'Home';

  useEffect(() => {
    if (!localStorage.getItem('User')) {
      navigate('/login');
    }
    if (userdata?._id) {
      Promise.resolve(getUserExpenses(userdata._id)).then((data) => setUserexp(data));
    }
  }, [userdata?._id, navigate]);

  const getTotal = () => {
    let sum = 0;
    for (const item in userexp) {
      sum += userexp[item].amount;
    }
    return sum;
  };

  const handleCreateExpense = () => {
    if (!amount || !category || !selectDate) return;
    
    const expInfo = {
      usersid: userdata._id,
      category,
      date: selectDate,
      amount
    };
    ref.current.staticStart();
    createExpense(expInfo).then(() => {
        Promise.resolve(getUserExpenses(userdata._id)).then((data) => setUserexp(data));
        ref.current.complete();
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 relative pb-10">
      <LoadingBar color="#4f46e5" ref={ref} />
      <NavBar data={userexp} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Chart & Create Transaction */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[400px] flex items-center justify-center">
              {userexp && userexp.length > 0 ? (
                <Chartss exdata={userexp} />
              ) : (
                <div className="text-slate-500 text-center">
                  <p className="font-medium text-lg">No data available</p>
                  <p className="text-sm">Add an expense below to see the chart.</p>
                </div>
              )}
            </div>
            
            {/* Create Transaction Panel */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Create Transaction</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input 
                  type="number" 
                  onChange={(e) => setAmount(Number(e.target.value))} 
                  placeholder="Amount" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                />
                
                <select 
                  onChange={(e) => setCategory(e.target.value)} 
                  defaultValue="" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow cursor-pointer appearance-none text-slate-700"
                >
                  <option value="" disabled>--Category--</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Vehicle">Vehicle</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Fun">Fun</option>
                  <option value="Other">Other</option>
                </select>

                <div className="w-full">
                  <DatePicker
                    selected={selectDate}
                    onChange={(date) => setSelectedDate(date)}
                    placeholderText="Select Date"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button 
                  onClick={handleCreateExpense}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <span className="text-xl font-light leading-none">+</span> Add Expense
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Expense List */}
          <div className="lg:col-span-5 h-[750px] bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex items-end justify-between mb-6 pb-6 border-b border-slate-100">
              <div>
                <p className="text-sm text-slate-500 font-medium mb-1">Total Expenses</p>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">₹ {getTotal().toLocaleString()}</h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
              {userexp && userexp.length > 0 ? (
                userexp.map((item) => (
                  <Items key={item._id} data={item} />
                ))
              ) : (
                <div className="text-center text-slate-500 mt-10">
                  <p>No expenses recorded yet.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;