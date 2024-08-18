'use client';

import Image from 'next/image';
import { useState } from 'react';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('Month');
  const [expirationYear, setExpirationYear] = useState('Year');
  const [cvv, setCvv] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6 w-full">
      <div className="max-w-md w-full bg-[#ffffff] shadow-lg rounded-lg border border-gray-200 p-6">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex justify-between p-4">
            <div className="flex items-center space-x-2">
              <Image src="/chip.png" alt="Chip" className="w-12" width={48} height={48} />
              {/* <Image src="/visa.png" alt="Visa" className="w-12" width={48} height={32}/> */}
            </div>
          </div>
          <div className="bg-gray-300 text-white p-4 rounded-lg">
            <div className="text-xl font-bold mb-2">{cardNumber.padEnd(16, '#')}</div>
            <div className="flex justify-between text-sm">
              <div>
                {/* <span>Card Holder</span> */}
                {/* <div>{cardHolder || 'Full Name'}</div> */}
              </div>
              <div>
                <span>Expires</span>
                <div>{expirationMonth} / {expirationYear}</div>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              maxLength={16}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Holder</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Expiration MM</label>
              <select
                value={expirationMonth}
                onChange={(e) => setExpirationMonth(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Month" disabled>Month</option>
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sep">Sep</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Expiration YY</label>
              <select
                value={expirationYear}
                onChange={(e) => setExpirationYear(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Year" disabled>Year</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                maxLength={4}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
