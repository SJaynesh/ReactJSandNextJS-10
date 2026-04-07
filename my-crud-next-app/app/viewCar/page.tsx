"use client";

import { useState, useEffect } from "react";
import { formCarDataType } from "../utils/type";
import {
  Car,
  Building2,
  Fuel,
  IndianRupee,
  Edit,
  Trash2,
  AlertCircle,
  Package,
  PlusCircle,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ViewCars() {
  const [allCars, setAllCars] = useState<formCarDataType[]>([]);

  const router = useRouter();

  useEffect(() => {
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
      setAllCars(JSON.parse(storedCars));
    }
  }, []);

  const deleteCar = (id: number) => {
    console.log("Delete Car ID : ", id); // 2138

    const deletedCarData = allCars.filter((car) => car.id !== id);
    // 7684 !== 2138

    setAllCars(deletedCarData);

    localStorage.setItem('cars', JSON.stringify(deletedCarData));

    toast.success("Car deleted successfully...");
  }



  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Car className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">View Cars</h1>
          <p className="text-gray-600">Manage and view all cars in your inventory</p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Cars</p>
                <p className="text-3xl font-bold text-gray-900">{allCars.length}</p>
              </div>
              <Car className="w-10 h-10 text-blue-600 opacity-75" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Available Brands</p>
                <p className="text-3xl font-bold text-gray-900">{new Set(allCars.map(car => car.carBrand)).size}</p>
              </div>
              <Building2 className="w-10 h-10 text-green-600 opacity-75" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-600 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Fuel Types</p>
                <p className="text-3xl font-bold text-gray-900">{new Set(allCars.map(car => car.carFuel)).size}</p>
              </div>
              <Fuel className="w-10 h-10 text-purple-600 opacity-75" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-600 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Avg Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  ₹{allCars.length > 0 ? Math.round(allCars.reduce((sum, car) => sum + Number(car.carPrice), 0) / allCars.length).toLocaleString() : 0}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-orange-600 opacity-75" />
            </div>
          </div>
        </div>

        {/* Add Car Button */}
        <div className="mb-6 flex justify-end">
          <button onClick={() => router.push('/addCar')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg">
            <PlusCircle className="w-5 h-5" /> Add New Car
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-linear-to-r from-blue-600 to-blue-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">No.</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Car Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Car Model</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Car Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Car Brand</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Car Color</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Car Fuel</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allCars.length > 0 ? (
                  allCars.map((car, index) => {
                    return (
                      <tr key={car.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            <Car className="w-4 h-4 text-gray-400" />
                            {car.carName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{car.carModel}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4 text-green-600" />
                            <span className="font-semibold text-green-600">{Number(car.carPrice).toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            {car.carBrand}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <div className="flex items-center gap-2">
                            {car.carColor.map((color, index) => {
                              return <div key={index}>
                                <div
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color.toLowerCase() || '#gray' }}
                                ></div>
                                {color}
                              </div>
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${car.carFuel === 'EV' ? 'bg-green-100 text-green-800' :
                            car.carFuel === 'Petrol' ? 'bg-yellow-100 text-yellow-800' :
                              car.carFuel === 'Diesel' ? 'bg-orange-100 text-orange-800' :
                                'bg-purple-100 text-purple-800'
                            }`}>
                            <Fuel className="w-3 h-3" />
                            {car.carFuel}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                router.push(`/editCar/${car.id}`);
                              }}
                              className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => deleteCar(car.id)}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition-colors duration-200 flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
                        <Package className="w-12 h-12 text-gray-400 mb-2" />
                        <p className="text-gray-500 text-lg">No cars found in inventory</p>
                        <p className="text-gray-400 text-sm mt-2">Add some cars to get started</p>
                        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200">
                          <PlusCircle className="w-5 h-5" />
                          Add Your First Car
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}