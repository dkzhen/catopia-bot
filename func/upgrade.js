const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { getUserInfo, formatNumber } = require("./repo");

exports.upgradeAnimal = async (value, type) => {
  const tokens = await validateToken();
  for (const token of tokens) {
    try {
      const getPet = await axios.get(
        "https://api.catopia.io/api/v1/players/pet?limit=3000",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      const user = await getUserInfo(token);
      const gold = user.goldenCoin || 0;

      const pet = getPet.data.totalRow;
      console.log(`[ Total Pets : ${pet}/3000 ]`);
      console.log(`[ GOLD : ${formatNumber(gold)} ]\n`);

      if (Number(gold) > 500000 || Number(pet) <= 3000) {
        for (let index = 0; index < value; index++) {
          const users = await getUserInfo(token);
          const goldN = users.goldenCoin || 0;
          if (Number(goldN) > 500000) {
            const buy = await axios.post(
              "https://api.catopia.io/api/v1/store/buy",
              {
                storeId: 4,
                price: 60000,
                unit: 1,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token.token}`,
                },
              }
            );

            const box = buy.data.data.buyData;

            console.log(
              `[ BUY ] : buy box has been created : length : ${box.length} `
            );

            const openBox = await axios.post(
              "https://api.catopia.io/api/v1/chest/open-multiple",
              {
                petTypeIds: [type],
                chestIds: box.map((item) => item.id),
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token.token}`,
                },
              }
            );
            const boxReadyOpen = openBox.data.data.petsReceived;
            console.log(
              `[ OPEN ] : open box has been created : length : ${boxReadyOpen.length} `
            );

            console.log(`[ BOT ] : Box ${index + 1} has been opened`);
          } else {
            console.log(`[ ERROR ] : You don't have enough gold`);
            return;
          }
        }
        console.log(`[ BOT ] : buy animal done..`);
      } else {
        console.log(`[ ERROR ] : You don't have enough gold or pet`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
};

function delay(minutes) {
  return new Promise((resolve) => setTimeout(resolve, minutes * 60000));
}
