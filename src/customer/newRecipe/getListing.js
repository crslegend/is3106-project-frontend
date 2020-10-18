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
  let finalKeyword = "";

  if (keyword.split(" ").length > 1) {
    // replaces the spaces in between with %20
    finalKeyword = keyword.trim().replace(/\s+/g, "%20");
  } else {
    finalKeyword = keyword;
  }

  await axios
    .get("https://website-api.omni.fairprice.com.sg/api/product/v2", {
      params: {
        includeTagDetails: "true",
        pageType: "search",
        page: pageNum,
        query: finalKeyword,
        url: finalKeyword,
        sorting: sortMethod,
      },
    })
    // .get("https://website-api.omni.fairprice.com.sg/api/layout/search/v2?", {
    //   params: {
    //     experiments:
    //       "cartRecommendVariant-A%2CkeywordCampaignVariant-B%2CsearchRepurchaseVariant-B",
    //     includeTagDetails: "true",
    //     q: finalKeyword,
    //   },
    // })
    .then((res) => {
      console.log("RESULTS");
      console.log(res);
      result = res.data.data;
    });
  return result;
};

export default { getListing, getSearchResults };
