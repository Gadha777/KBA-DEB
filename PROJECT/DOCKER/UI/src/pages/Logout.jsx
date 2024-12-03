import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to logout');
      }

      // Clear localStorage and cookies
      localStorage.removeItem('username');
      document.cookie = 'Authtoken=; Max-Age=0';

      // Redirect to the login page
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Logout failed, please try again.');
    }
  };

  // Trigger logout on component mount
  React.useEffect(() => {
    handleLogout();
  }, []);

  return <p>Logging out...</p>; // Optional: display this while logging out
};

export default Logout;
