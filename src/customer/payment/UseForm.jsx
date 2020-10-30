import { useState } from "react";

const UseForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const resetNewAddress = () => {
    setValues(initialValues);
  };
  return {
    values,
    resetNewAddress,
    handleInputChange: (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  };
};

export default UseForm;
