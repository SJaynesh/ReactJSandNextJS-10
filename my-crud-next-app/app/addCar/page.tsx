"use client";

import { useState } from "react";

export default function AddCar() {
  const carBrand = ["TATA", "Maruti Suzuki", "Mahindra", "Kia", "MG Motor", "Toyota"];
  const carColor = ["Black", "White", "Yellow", "Red", "Green", "Custom"];
  const carFuel = ["Petrol", "Diesel", "EV", "CNG", "Hybrid"];

  type formCarDataType = {
    id: number,
    carName: string,
    carModel: string,
    carPrice: number,
    carBrand: string,
    carColor: string[],
    carFuel: string
  }

  const [formCarData, setFormCarData] = useState<formCarDataType>({
    id: Math.floor(Math.random() * 10000),
    carName: "",
    carModel: "",
    carPrice: 0,
    carBrand: "",
    carColor: [],
    carFuel: ""
  });

  const onSubmit = (event: any) => {

    event.preventDefault();

    console.log("Form Submit.....");
    console.log("Car : ", formCarData);

  }

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Car</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            {/* Car Name */}
            <div className="space-y-2">
              <label htmlFor="carName" className="block text-sm font-semibold text-gray-700">
                Car Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="carName"
                id="carName"
                placeholder="e.g., Swift, City, Nexon"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>

            {/* Car Model */}
            <div className="space-y-2">
              <label htmlFor="carModel" className="block text-sm font-semibold text-gray-700">
                Car Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="carModel"
                id="carModel"
                placeholder="e.g., ZXI, VXI, Top End"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>

            {/* Car Price */}
            <div className="space-y-2">
              <label htmlFor="carPrice" className="block text-sm font-semibold text-gray-700">
                Car Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="carPrice"
                id="carPrice"
                placeholder="e.g., 500000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>

            {/* Car Brand */}
            <div className="space-y-2">
              <label htmlFor="carBrand" className="block text-sm font-semibold text-gray-700">
                Car Brand <span className="text-red-500">*</span>
              </label>
              <select
                name="carBrand"
                id="carBrand"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-white"
              >
                <option value="">Select a brand</option>
                {carBrand.map((brand, index) => {
                  return <option key={index} value={brand}>{brand}</option>
                })}
              </select>
            </div>

            {/* Car Color */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Car Color <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {carColor.map((color, index) => {
                  return (
                    <label key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200">
                      <input
                        type="checkbox"
                        name="carColor"
                        value={color}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-gray-700 text-sm">{color}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Car Fuel */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fuel Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {carFuel.map((fuel, index) => {
                  return (
                    <label key={index} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200">
                      <input
                        type="radio"
                        name="carFuel"
                        value={fuel}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-gray-700 text-sm">{fuel}</span>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 shadow-md"
              >
                Add Car to Inventory
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}