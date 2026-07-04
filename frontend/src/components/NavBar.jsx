import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsSendFill } from "react-icons/bs";
import { sendEmail } from "../utils/renders";
import LoadingBar from "react-top-loading-bar";

function NavBar(props) {
  const [isPressed, setIsPressed] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const ref = useRef(null);
  const userData = props.data;
  const navigate = useNavigate();

  const logoutHandle = async () => {
    try {
      ref.current.staticStart();
      localStorage.removeItem("User");
      toast.success("Logged out Successfully!!");
      ref.current.complete();
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <LoadingBar color="#4f46e5" ref={ref} />
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                <span className="text-indigo-600">Expense</span> Tracker
              </h1>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-6">
              {/* Send Email Feature */}
              <div className="relative">
                <button
                  onClick={() => setIsPressed(!isPressed)}
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Send Report
                </button>

                {isPressed && (
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl border border-slate-100 p-4 z-50">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-semibold text-slate-900">
                        Email Monthly Report
                      </h3>
                      <button
                        onClick={() => setIsPressed(false)}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <input
                        placeholder="Your Email"
                        type="email"
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        onClick={async () => {
                          const response = await sendEmail(userEmail, userData);
                          setIsPressed(false);
                          if (response?.data?.statusCode === 201) {
                            toast.success("Report sent!");
                          } else {
                            toast.error(
                              response?.data?.message ||
                                "Failed to send report",
                            );
                          }
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md flex items-center justify-center transition-colors"
                      >
                        <BsSendFill size={16} />
                      </button>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 text-center">
                      Get a summary of your expenses sent directly to your
                      inbox.
                    </p>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={logoutHandle}
                className="text-sm font-medium text-slate-600 hover:text-rose-600 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
