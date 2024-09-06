const { default: axios } = require("axios");

exports.getUserInfo = async (token) => {
  try {
    const userInfo = await axios.get(
      "https://api.catopia.io/api/v1/user-collection?limit=3000",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return userInfo.data.data;
  } catch (error) {
    return null;
  }
};

exports.getLand = async (token) => {
  try {
    const land = await axios.get(
      "https://api.catopia.io/api/v1/players/land?limit=3000",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return land.data.data;
  } catch (error) {
    return null;
  }
};

exports.getPlantInfo = async (token) => {
  try {
    const plantInfo = await axios.get(
      "https://api.catopia.io/api/v1/players/plant?limit=3000",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return plantInfo.data.data;
  } catch (error) {
    return null;
  }
};

exports.harvestPlant = async (token) => {
  try {
    const harvest = await axios.post(
      "https://api.catopia.io/api/v1/players/plant/harvestAll",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
      }
    );
    return harvest.data.data;
  } catch (error) {
    return error.response.data.message;
  }
};
exports.formatNumber = (num) => {
  if (num >= 1e18) {
    return (num / 1e18).toFixed(1) + "Qi";
  } else if (num >= 1e15) {
    return (num / 1e15).toFixed(1) + "Q";
  } else if (num >= 1e12) {
    return (num / 1e12).toFixed(1) + "T";
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};
