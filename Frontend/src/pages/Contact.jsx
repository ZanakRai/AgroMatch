import React, {useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const username = localStorage.getItem('username')
  const email=localStorage.getItem('email')
  const form = useRef();
  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/contact', { method: "GET" });
        const data = await response.json()
        console.log(data)
        if (data.username && data.email) {
          setFormData({
            user_name: data.username,
            user_email: data.email,
            message: ""
          });
        }
        else {
          console.error("Error: User not logged in");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm('chom_hang', 'template_5azd6we', form.current, {
        publicKey: 'uJVxEKGP0Q-BX-tgf',
      })
      .then(() => {
        setIsSubmitting(false);
        toast.success('Message sent successfully!', { position: 'top-right' });
        setFormData({ user_name: '', user_email: '', message: '' });
      })
      .catch((error) => {
        setIsSubmitting(false);
        toast.error('Failed to send message. Try again later.', { position: 'top-right' });
        console.log('FAILED...', error.text);
      });
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-700 text-white py-16 px-6 md:py-24 md:px-16 min-h-screen flex flex-col justify-center" id="contact">
      {/* ToastContainer with top-right position */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />

      <div className="mt-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-6">
          Get in Touch
        </h2>
        <p className="text-lg sm:text-xl mb-8">
          We'd love to hear from you! Fill out the form below and I'll get back to you as soon as possible.
        </p>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
        >
          <div>
            <label htmlFor="user_name" className="block text-lg font-semibold text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              value={username}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 bg-gray-100 border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="user_email" className="block text-lg font-semibold text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 bg-gray-100 border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-semibold text-gray-700">
              Your Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 bg-gray-100 border-2 border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your message"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 text-lg font-bold text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300 ease-in-out"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="animate-pulse">Sending...</span> : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
