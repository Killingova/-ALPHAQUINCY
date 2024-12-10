import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';

export default function Notification() {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`p-2 rounded shadow-md text-white ${
            n.type === 'error' ? 'bg-red-600' : n.type === 'success' ? 'bg-green-600' : 'bg-blue-600'
          }`}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
}
