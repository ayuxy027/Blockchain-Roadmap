import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SlotBooking from '../components/booking/SlotBooking';

const Book2 = () => {
  const [formData, setFormData] = useState({
    timeSlot: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(prevData => ({ ...prevData, ...location.state.formData }));
    }
  }, [location.state]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.timeSlot) newErrors.timeSlot = 'Please select a time slot';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/book-3', { state: { formData } });
    }
  };

  const handlePrevious = () => {
    navigate('/book-1', { state: { formData } });
  };

  return (
    <div className="container max-w-2xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Slot Booking</h1>
      <SlotBooking formData={formData} setFormData={setFormData} errors={errors} />
      <div className="flex justify-between mt-6">
        <button 
          onClick={handlePrevious} 
          className="px-4 py-2 text-gray-800 transition duration-300 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          Previous
        </button>
        <button 
          onClick={handleNext} 
          className="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Book2;