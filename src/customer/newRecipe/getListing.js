import axios from "axios";
import Service from "../../AxiosService";

const getListing = async (pageNum, tabIndex, sortMethod) => {
  let categoryStr = "";
  if (tabIndex === 0) {
    categoryStr = "chicken";
  } else if (tabIndex === 1) {
    categoryStr = "pork";
  } else if (tabIndex === 2) {
    categoryStr = "beef-lamb-1";
  } else if (tabIndex === 3) {
    categoryStr = "fish---seafood";
  } else if (tabIndex === 4) {
    categoryStr = "meatballs";
  } else if (tabIndex === 5) {
    categoryStr = "vegetables";
  } else if (tabIndex === 6) {
    categoryStr = "eggs";
  } else if (tabIndex === 7) {
    categoryStr = "delicatessen";
  } else if (tabIndex === 8) {
    categoryStr = "chilled-food";
  }

  let result = null;
  // console.log(`tabIndex: ${tabIndex}`);
  // console.log(`getListing.jsx ${sortMethod}`);
  // console.log(`pageNum: ${pageNum}`);
  // console.log(`categoryStr: ${categoryStr}`);
  await Service.ntucClient
    .get("", {
      params: {
        category: categoryStr,
        includeTagDetails: "true",
        page: pageNum,
        sorting: sortMethod,
        url: categoryStr,
      },
    })
    .then((res) => {
      console.log(res.data.data.page.layouts[1].value.collection);
      result = res.data.data.page.layouts[1].value.collection;
    });
  return result;
};

const getSearchResults = async (pageNum, keyword, sortMethod) => {
  let result = null;
  await axios
    .get("https://website-api.omni.fairprice.com.sg/api/product/v2", {
      params: {
        includeTagDetails: "true",
        pageType: "search",
        page: pageNum,
        query: keyword,
        url: keyword,
        sorting: sortMethod,
      },
    })
    .then((res) => {
      console.log("RESULTS");
      console.log(res.data.data);
      result = res.data.data;
    });
  return result;
};

export default { getListing, getSearchResults };
