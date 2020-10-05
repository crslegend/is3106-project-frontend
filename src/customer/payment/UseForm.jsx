import { useState } from "react";

const UseForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const resetForm = () => {
    setValues(initialValues);
  };
  return {
    values,
    resetForm,
    handleInputChange: (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  };
};

export default UseForm;
