import Service from "../../AxiosService";

const getListing = async (pageNum) => {
  let result = null;
  await Service.ntucClient
    .get("", {
      params: {
        category: "meat-seafood",
        includeTagDetails: "true",
        page: pageNum,
        url: "meat-seafood",
      },
    })
    .then((res) => {
      console.log(res.data.data.page.layouts[1].value.collection);
      result = res.data.data.page.layouts[1].value.collection;
    });
  return result;
};

export default getListing;
