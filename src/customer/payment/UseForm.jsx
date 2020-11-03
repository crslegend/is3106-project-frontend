import { useState } from "react";

const UseForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [newaddress, setNewaddress] = useState("");

  const resetNewAddress = () => {
    setValues(initialValues);
  };

  return {
    values,
    newaddress,
    resetNewAddress,
    handleInputChange: (e) => {
      const { name } = e.target;
      console.log(name);
      setValues({
        ...values,
        [name]: e.target.value,
      });
      console.log(values);
      if (name === "addressOne") {
        setNewaddress({
          ...newaddress,
          address_line1: e.target.value,
        });
      } else if (name === "addressTwo") {
        setNewaddress({
          ...newaddress,
          address_line2: e.target.value,
        });
      } else if (name === "postal") {
        setNewaddress({
          ...newaddress,
          postal_code: e.target.value,
        });
      }
      console.log(newaddress);
    },
  };
};

export default UseForm;
