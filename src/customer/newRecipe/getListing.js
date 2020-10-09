import Service from "../../AxiosService";

const getListing = async (pageNum, tabIndex) => {
  let categoryStr = "";
  if (tabIndex === 0) {
    categoryStr = "meat-seafood";
  } else if (tabIndex === 1) {
    categoryStr = "vegetables";
  } else if (tabIndex === 2) {
    categoryStr = "dairy-chilled-eggs";
  }

  let result = null;
  await Service.ntucClient
    .get("", {
      params: {
        category: categoryStr,
        includeTagDetails: "true",
        page: pageNum,
        url: categoryStr,
      },
    })
    .then((res) => {
      // console.log(res.data.data.page.layouts[1].value.collection);
      result = res.data.data.page.layouts[1].value.collection;
    });
  return result;
};

export default getListing;
