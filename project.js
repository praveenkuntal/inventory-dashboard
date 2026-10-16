let inventory = [
    { name: "Laptop", price: 800 },
    { name: "Mouse", price: 25 }
];
window.onload = function() {
    let inputName = prompt("Enter new product name:") || "Monitor";
    let inputPriceText = prompt("Enter product price:") || "150";
    let inputPrice = Number(inputPriceText);

    if (inputName.trim() !== "" && !isNaN(inputPrice) && inputPrice >= 0) {
        inventory.push({ name: inputName, price: inputPrice });
    } else {
        inventory.push({ name: "Monitor", price: 150 });
    }

    updateDashboard();
};

function getCategory(price) {
    let category = "";
    if (price < 50) {
        category = "Budget";
    } else if (price >= 50 && price <= 500) {
        category = "Standard";
    } else {
        category = "Premium";
    }
    return category;
}

function calculateTotalValue(items) {
    let total = 0; // Local scope variable
    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }
    return total;
}

const formatItemName = (name) => name.toUpperCase();


function updateDashboard() {
    let rosterElement = document.getElementById("rosterOutput");
    let analyticsElement = document.getElementById("analyticsOutput");
    let totalValueElement = document.getElementById("totalValueText");

    rosterElement.innerText = "--- Initializing Inventory System ---\n";
    let lastItem = inventory[inventory.length - 1];
    rosterElement.innerText += `[Action: Added "${lastItem.name}" at "$${lastItem.price}"]\n\n`;
    rosterElement.innerText += "--- Processing Inventory Roster (forEach / Loops) ---\n";

    inventory.forEach((item) => {
        let category = getCategory(item.price);
        rosterElement.innerText += `- Item: ${item.name} ($${item.price}) -> Category: ${category}\n`;
    });

    let totalInventoryValue = calculateTotalValue(inventory);
    totalValueElement.innerText = `Total Inventory Value: $${totalInventoryValue}`;

    let affordableItems = [];
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i].price < 200) {
            affordableItems.push(inventory[i].name);
        }
    }

    let formattedReport = inventory.map(item => `${formatItemName(item.name)}: $${item.price}`);

    analyticsElement.innerText = `Filtered Affordable Items (Under $200): ${JSON.stringify(affordableItems)}\n`;
    analyticsElement.innerText += `Formatted Report List: ${JSON.stringify(formattedReport)}`;
}

function addNewProduct() {
    let nameInput = document.getElementById("productName");
    let priceInput = document.getElementById("productPrice");

    let name = nameInput.value.trim();
    let price = Number(priceInput.value);

    if (name === "" || isNaN(price) || price < 0) {
        alert("Please enter a valid product name and positive price!");
        return;
    }

    inventory.push({ name: name, price: price });

    nameInput.value = "";
    priceInput.value = "";

    updateDashboard();
}