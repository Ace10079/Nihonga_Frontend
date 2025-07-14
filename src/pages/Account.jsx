import React, { useState } from 'react';

function Account() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep(2);
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    alert('✅ Logged in successfully!');
    setPhone('');
    setOtp('');
    setStep(1);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8 transition-all duration-500">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">👤 Login to Your Account</h1>

        {step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your 10-digit number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit} className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the 6-digit OTP"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
            >
              Verify & Login
            </button>
            <p
              className="text-sm text-blue-500 text-center cursor-pointer hover:underline"
              onClick={() => setStep(1)}
            >
              🔁 Change phone number
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Account;
