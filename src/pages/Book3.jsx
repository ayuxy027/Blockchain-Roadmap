import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { BackgroundPattern } from '../components/shared/BackgroundPattern';

const Book3 = () => {
  const [formData, setFormData] = useState({
    amenities: [],
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.formData) {
      setFormData(prevData => ({ ...prevData, ...location.state.formData }));
    }
  }, [location.state]);

  const amenities = [
    { name: 'Tour Guide', price: 100, icon: '🧑‍🏫' },
    { name: 'Wheelchair for Elderly', price: 20, icon: '👵' },
    { name: 'Audio Guide', price: 30, icon: '🎧' },
    { name: 'Photography Permit', price: 20, icon: '📷' },
    { name: 'Locker Service', price: 20, icon: '🔒' },
    { name: 'Café Voucher', price: 80, icon: '☕' },
  ];

  const calculateTotal = () => {
    const amenitiesTotal = formData.amenities.reduce((total, amenity) => {
      const amenityPrice = amenities.find(a => a.name === amenity)?.price || 0;
      return total + amenityPrice;
    }, 0);
    return amenitiesTotal + 20; // Adding 20 rupees booking fee
  };

  const handleNext = () => {
    navigate('/book-4', { state: { formData } });
  };

  const handlePrevious = () => {
    navigate('/book-2', { state: { formData } });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50 font-body">
      <BackgroundPattern />
      <motion.div 
        className="z-10 w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1 
          className="mb-6 text-3xl font-bold text-center text-transparent bg-proj bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          Amenities
        </motion.h1>
        <motion.div 
          className="space-y-4"
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className={`flex items-center p-3 space-x-2 bg-white border-2 rounded-lg transition-colors duration-300 ${
                  formData.amenities.includes(amenity.name)
                    ? 'border-proj bg-proj bg-opacity-10'
                    : 'border-gray-200 hover:border-proj'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="checkbox"
                  id={`amenity-${index}`}
                  checked={formData.amenities.includes(amenity.name)}
                  onChange={(e) => {
                    const newAmenities = e.target.checked
                      ? [...formData.amenities, amenity.name]
                      : formData.amenities.filter(a => a !== amenity.name)
                    setFormData({ ...formData, amenities: newAmenities })
                  }}
                  className="w-4 h-4 border-gray-300 rounded text-proj focus:ring-proj"
                />
                <label
                  htmlFor={`amenity-${index}`}
                  className="flex-1 text-sm cursor-pointer"
                >
                  <div className="flex items-center">
                    <span className="mr-1 text-lg">{amenity.icon}</span>
                    <span className="font-medium">{amenity.name}</span>
                  </div>
                  <span className="block text-xs text-gray-500">₹{amenity.price}</span>
                </label>
                <Info className="w-4 h-4 text-gray-400" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-6 text-xl font-bold text-center text-transparent bg-proj bg-clip-text"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          Total: ₹{calculateTotal()} (including ₹20 booking fee)
        </motion.div>
        <div className="flex justify-between mt-6">
          <motion.button 
            onClick={handlePrevious} 
            className="flex items-center justify-center px-4 py-2 text-sm font-medium transition duration-300 bg-white border-2 rounded-lg text-proj border-proj hover:bg-proj hover:text-white focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
            variants={scaleIn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </motion.button>
          <motion.button 
            onClick={handleNext} 
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-proj hover:bg-proj-hover focus:outline-none focus:ring-2 focus:ring-proj focus:ring-offset-2"
            variants={scaleIn}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Book3;