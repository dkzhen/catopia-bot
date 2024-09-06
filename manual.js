const readline = require("readline");
const { upgradeAnimal } = require("./func/upgrade");

// Create a readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to ask a question and return the user's answer
const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

(async () => {
  try {
    // Ask the first question (input value)
    const value = await askQuestion("masukkan jumlah beli box [100] : ");
    // Ask the second question (input type)
    const type = await askQuestion("masukkan tipe binatang [ 1,2,3,4,5 ]: ");

    // Log the results
    console.log(`Total BOX: ${value}`);
    console.log(`Tipe Binatang: ${type}`);

    // Close the readline interface
    rl.close();
    upgradeAnimal(value, type);
  } catch (err) {
    console.error("Error:", err);
    rl.close();
  }
})();
