"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type NotificationType = "success" | "error" | "info" | "cart";

export interface Notification {
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
}

interface NotificationContextType {
  notification: Notification | null;
  notify: (n: Notification) => void;
  closeNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);

  const closeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const notify = useCallback((n: Notification) => {
    setNotification(n);
    // Auto-close after 5 seconds
    setTimeout(() => {
      setNotification((prev) => (prev === n ? null : prev));
    }, 5000);
  }, []);

  return (
    <NotificationContext.Provider value={{ notification, notify, closeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
}
