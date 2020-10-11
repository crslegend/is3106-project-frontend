import axios from "axios";
import Service from "../../AxiosService";

const getListing = async (pageNum, tabIndex, sortMethod) => {
  let categoryStr = "";
  if (tabIndex === 0) {
    categoryStr = "meat-seafood";
  } else if (tabIndex === 1) {
    categoryStr = "vegetables";
  } else if (tabIndex === 2) {
    categoryStr = "dairy-chilled-eggs";
  }

  let result = null;
  console.log(`getListing.jsx ${sortMethod}`);
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
      // console.log(res.data.data.page.layouts[1].value.collection);
      result = res.data.data.page.layouts[1].value.collection;
    });
  return result;
};

const getSearchResults = async () => {
  await axios
    .get("https://website-api.omni.fairprice.com.sg/api/layout/search/v2", {
      params: {
        experiments:
          "cartRecommendVariant-A,keywordCampaignVariant-B,searchRepurchaseVariant-B",
        q: "mooncake",
      },
    })
    .then((res) => {
      console.log(res);
    });
};

export default { getListing, getSearchResults };
