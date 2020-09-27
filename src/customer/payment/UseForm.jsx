import { useState } from "react";

const UseForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return {
    values,
    handleInputChange: (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  };
};

export default UseForm;
