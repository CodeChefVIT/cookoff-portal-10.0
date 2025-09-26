"use client";

import { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { db } from "@/services/firebase.utils";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

type Notification = {
  id: string;
  message: string;
  createdAt: Timestamp | null;
};

export default function NotificationButton() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [readNotifications, setReadNotifications] = useState<Set<string>>(
    new Set()
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(
    (n) => !readNotifications.has(n.id)
  ).length;

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        message: doc.data().message as string,
        createdAt: doc.data().createdAt ?? null,
      }));
      setNotifications(fetched);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsReadLocally = () => {
    setReadNotifications(new Set(notifications.map((n) => n.id)));
  };

  const formatTime = (ts: Timestamp | null) => {
    if (!ts) return "just now";
    const date = ts.toDate();
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  const handleToggleDropdown = () => {
    setOpen((prev) => !prev);
    if (!open) {
      markAllAsReadLocally();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggleDropdown}
        className="relative p-1 focus:outline-none bg-transparent border-none"
      >
        <FaBell className="text-xl md:text-2xl text-gray-300 hover:text-white transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl border border-[#2c2c2c] bg-[#0f0f0f] shadow-2xl z-50">
          <div className="flex items-center justify-between p-3 border-b border-[#2c2c2c]">
            <span className="font-semibold text-[#b7ab98]">Notifications</span>
          </div>

          <ul className="max-h-96 overflow-y-auto divide-y divide-[#1e1e1e]">
            {notifications.length > 0 ? (
              notifications.map((n) => (
                <li
                  key={n.id}
                  className={`flex flex-col gap-1 p-3 text-sm text-gray-200 ${
                    !readNotifications.has(n.id) ? "bg-[#1a1a1a]" : ""
                  }`}
                >
                  <span>{n.message}</span>
                  <span className="text-xs text-[#4ade80]">
                    {formatTime(n.createdAt)}
                  </span>
                </li>
              ))
            ) : (
              <li className="p-3 text-gray-500 text-center text-sm">
                No notifications
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
