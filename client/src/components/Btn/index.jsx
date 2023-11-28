import "./Btn.scss";

export const Btn = ({ type, children, className, onClick }) => {
  return (
    <button
      type={type || "button"}
      className={`button ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
