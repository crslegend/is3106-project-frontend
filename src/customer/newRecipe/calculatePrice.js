const calculatePrice = (sellingPrice, sellingAmount, selectedAmount) => {
  let price = 0;

  if (sellingAmount.includes("X") && sellingAmount.endsWith("KG")) {
    const sellingAmountStr = sellingAmount.split(" ")[2].replace(/\D/g, "");
    price = parseFloat(
      (parseFloat(sellingPrice) / parseFloat(sellingAmountStr * 1000)) *
        parseFloat(selectedAmount)
    );
  } else if (
    (sellingAmount.includes("X") || sellingAmount.includes("x")) &&
    (sellingAmount.endsWith("G") ||
      sellingAmount.endsWith("g") ||
      sellingAmount.endsWith("ML") ||
      sellingAmount.endsWith("ml"))
  ) {
    const sellingAmountStr =
      sellingAmount.split(" ")[2].replace(/\D/g, "") *
      sellingAmount.split(" ")[0];
    price = parseFloat(
      (parseFloat(sellingPrice) / parseFloat(sellingAmountStr)) *
        parseFloat(selectedAmount)
    );
  } else if (
    (sellingAmount.includes("X") || sellingAmount.includes("x")) &&
    (sellingAmount.endsWith("L") || sellingAmount.endsWith("l"))
  ) {
    const sellingAmountStr =
      1000 *
      sellingAmount.split(" ")[2].replace(/\D/g, "") *
      sellingAmount.split(" ")[0];
    price = parseFloat(
      (parseFloat(sellingPrice) / parseFloat(sellingAmountStr)) *
        parseFloat(selectedAmount)
    );
  } else if (sellingAmount.endsWith("KG") || sellingAmount.endsWith(" KG")) {
    price = parseFloat(
      (parseFloat(sellingPrice) /
        (parseFloat(sellingAmount.replace(/\D/g, "")) * 1000)) *
        parseFloat(selectedAmount)
    );
  } else if (
    sellingAmount.endsWith(" G") ||
    sellingAmount.endsWith("G") ||
    sellingAmount.endsWith("gm") ||
    sellingAmount.endsWith("pc") ||
    sellingAmount.endsWith("S") ||
    sellingAmount.endsWith("LT")
  ) {
    price = parseFloat(
      (parseFloat(sellingPrice) /
        parseFloat(sellingAmount.replace(/\D/g, ""))) *
        parseFloat(selectedAmount)
    );
  } else if (
    (sellingAmount.includes("X") || sellingAmount.includes("x")) &&
    sellingAmount.endsWith("per pack)" || sellingAmount.endsWith("Per Pack)"))
  ) {
    const sellingAmountStr = sellingAmount.split(" ")[3].replace(/\D/g, "");
    price = parseFloat(
      (parseFloat(sellingPrice) / parseFloat(sellingAmountStr)) *
        parseFloat(selectedAmount)
    );
  } else if (
    sellingAmount.endsWith("per pack)") ||
    sellingAmount.endsWith("Per Pack)")
  ) {
    const sellingAmountStr = sellingAmount.split(" ")[1].replace(/\D/g, "");
    price = parseFloat(
      (parseFloat(sellingPrice) / parseFloat(sellingAmountStr)) *
        parseFloat(selectedAmount)
    );
  }

  console.log(sellingPrice);
  return price;
};

export default calculatePrice;
