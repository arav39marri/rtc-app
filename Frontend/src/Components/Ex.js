const readline = require("readline");

const busStops = [
  "Medchal Bus Stop",
  "Dabilpur",
  "Medchal Checkpost",
  "CMR college",
  "Gundlapochampally",
  "Kompally",
  "Suchitra Junction",
  "Jeedimetla",
  "Chintal",
  "Balanagar",
  "Bowenpally",
  "Tadbund Junction",
  "Paradise Circle",
  "Patny",
  "Secunderabad Bus Station"
];

const ticketPrices = new Map();

function setTicketPrice(stop1, stop2, price) {
  const key = `${stop1}-${stop2}`;
  ticketPrices.set(key, price);
}

function getTicketPrice(stop1, stop2) {
  const key1 = `${stop1}-${stop2}`;
  const key2 = `${stop2}-${stop1}`;
  return ticketPrices.get(key1) || ticketPrices.get(key2) || "Price not found.";
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

(async function main() {
  console.log("Available bus stops:", busStops.join(", "));
  
  while (true) {
    const action = await askQuestion("Enter 'set' to add price, 'get' to fetch price, or 'exit' to quit: ");
    
    if (action === "exit") break;

    if (action === "set") {
      const stop1 = await askQuestion("Enter the first stop: ");
      const stop2 = await askQuestion("Enter the second stop: ");
      const price = await askQuestion("Enter the ticket price: ");
      setTicketPrice(stop1, stop2, parseInt(price, 10));
      console.log(`Price set between "${stop1}" and "${stop2}".`);
    } else if (action === "get") {
      const stop1 = await askQuestion("Enter the first stop: ");
      const stop2 = await askQuestion("Enter the second stop: ");
      console.log(`Ticket price: ${getTicketPrice(stop1, stop2)}`);
    } else {
      console.log("Invalid option. Try again.");
    }
  }

  rl.close();
})();
