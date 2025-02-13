// src/services/notificationService.js
import { toast } from 'react-toastify';

export const checkReminders = (tasks) => {
  tasks.forEach(task => {
    if (task.reminder) {
      const reminderTime = new Date(task.reminder);
      const now = new Date();
      
      if (reminderTime > now && reminderTime - now <= 300000) { // 5 minutes
        toast.info(`Reminder: "${task.title}" is due soon!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    }
  });
};

// Add to App.jsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Inside App component JSX
<ToastContainer />