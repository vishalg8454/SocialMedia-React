import "./portal.css";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, dismiss, coords, updateTooltipCoords }) => {
  console.log(coords);
  const updateCoords = updateTooltipCoords;
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, []);

  return createPortal(
    <div
      className="modal-overlay"
      onClick={() => {
        dismiss((showModal) => !showModal);
      }}
    >
      <div
        style={{ ...styles.popover, ...coords }}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    elRef.current
  );
};

const styles = {
  popover: {
    position: "absolute",
    width: 200,
    transform: "translate(-140px, 10%)",
  },
};

export { Portal };
