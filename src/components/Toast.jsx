import React, { useContext } from "react";
import { Context } from "../store/appContext.jsx";

const Toast = () => {
  const { store } = useContext(Context);
  const { toast } = store;

  if (!toast || !toast.show) return null;

  return (
    <div className={`custom-toast custom-toast-${toast.type}`}>
      {toast.message}
    </div>
  );
};

export default Toast;
