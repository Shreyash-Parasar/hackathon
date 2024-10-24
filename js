// Array to store inventory items
let inventory = [];

// Function to start barcode scanning
function startScanning() {
    console.log("Starting scanning...");

    // Initialize Quagga
    Quagga.init({
        inputStream: {
            name: "LiveStream",
            type: "LiveStream",
            target: document.querySelector('#preview'), // Video element for live stream
            constraints: {
                facingMode: "environment" // Use rear camera
            }
        },
        decoder: {
            readers: [
                "ean_reader", 
                "ean_13_reader", 
                "upc_reader", 
                "code_128_reader" 
            ]
        }
    }, function(err) {
        if (err) {
            console.error("Quagga initialization failed:", err);
            return;
        }
        console.log("Quagga initialized successfully");
        Quagga.start(); // Start the scanning
        document.getElementById('preview').style.display = "block"; // Show the video stream
    });

    // Event listener for barcode detection
    Quagga.onDetected(function(result) {
        const barcode = result.codeResult.code;
        console.log('Detected barcode:', barcode);
        document.getElementById('scan-result').textContent = Scanned Barcode: ${barcode};
        Quagga.stop(); // Stop scanning after a successful read
        document.getElementById('preview').style.display = "none"; // Hide video stream
    });
}

// Start scanning when the button is clicked
document.getElementById('start-scan').addEventListener('click', startScanning);

// Handle form submission for manual entry
document.getElementById('inventory-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const itemName = document.getElementById('item-name').value;
    const itemQuantity = document.getElementById('item-quantity').value;
    const itemExpiration = document.getElementById('item-expiration').value;

    // Add the new item to the inventory array
    inventory.push({
        name: itemName,
        quantity: itemQuantity,
        expiration: itemExpiration
    });

    // Update the inventory list on the page
    updateInventoryList();

    // Clear form fields
    document.getElementById('inventory-form').reset();
});

// Function to update the displayed inventory list
function updateInventoryList() {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear the current list

    inventory.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = ${item.name} - ${item.quantity} - Expires on: ${item.expiration};
        inventoryList.appendChild(listItem);
    });
}
