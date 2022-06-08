import "./portal-for-modal.css";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const PortalForModal = ({ children, dismiss }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal-portal");
    modalRoot.appendChild(elRef.current);

    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(
    <>
      <div
        className="portal-overlay"
        onClick={() => {
          dismiss((showModal) => !showModal);
        }}
      >
        <div className="portal" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>,
    elRef.current
  );
};

export {PortalForModal};
