import React, { useEffect, useState } from "react";
import { TimeoutWarningModal } from "./TimeoutWarningModal";
import { addEventListeners, removeEventListeners } from "./eventListnerUtil";
import { useNavigate } from "react-router-dom";

export const TimeoutLogic = ({ setUser }) => {
  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.setItem("guest", "true");
    navigate(0);
  };

  useEffect(() => {
    const createTimeout1 = () =>
      setTimeout(() => {
        setWarningModalOpen(true);
      }, 900000);

    const createTimeout2 = () =>
      setTimeout(() => {
        handleLogout();
      }, 60000);

    const listener = () => {
      if (!isWarningModalOpen) {
        clearTimeout(timeout);
        timeout = createTimeout1();
      }
    };

    // Initialization
    let timeout = isWarningModalOpen ? createTimeout2() : createTimeout1();
    addEventListeners(listener);

    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
    };
  }, [isWarningModalOpen]);

  return (
    <div>
      {isWarningModalOpen && (
        <TimeoutWarningModal
          setUser={setUser}
          isOpen={isWarningModalOpen}
          onRequestClose={() => setWarningModalOpen(false)}
        />
      )}
    </div>
  );
};
