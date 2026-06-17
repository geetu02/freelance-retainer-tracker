// 1. GLOBAL VARIABLES
let activeClients = []; 
let taskIdCounter = 1001;

// 2. ASYNCHRONOUS API FETCH FUNCTION
async function loadClientsFromAPI() {
    const container = document.getElementById("client-list-container");
    if (!container) return;

    try {
        // Show a loading text while waiting for the network response
        container.innerHTML = `<div class="text-slate-500 animate-pulse text-sm">Loading secure client database...</div>`;

        // Fetch user data asynchronously from online mock API
        const response = await fetch('https://typicode.com');
        
        // Safety check if the network call fails
        if (!response.ok) throw new Error("Database server returned an error.");

        // Convert raw response into readable JavaScript objects
        const users = await response.json();

        // Pull company names out of the object array and sort them alphabetically for binary search
        activeClients = users.map(user => user.company.name).sort();

        // Call the display function to draw the downloaded cards on the screen
        displayClients();

    } catch (error) {
        console.error("API Fetch Error:", error);
        container.innerHTML = `<div class="text-rose-500 font-bold text-sm">⚠️ Error loading clients. Please try again.</div>`;
    }
}

// 3. UI DISPLAY LOGIC
function displayClients() {
    const container = document.getElementById("client-list-container");
    if (!container) return;

    container.innerHTML = activeClients.map(client => `
        <div id="client-${client.replace(/\s+/g, '')}" class="bg-slate-900 border border-slate-800 p-3 rounded-lg text-slate-300 transition duration-300">
            ${client}
        </div>
    `).join('');
}

// 4. ALGORITHM ENGINE
function executeBinarySearch() {
    const searchInput = document.getElementById("search-input")?.value.trim();
    
    activeClients.forEach(client => {
        const element = document.getElementById(`client-${client.replace(/\s+/g, '')}`);
        if (element) {
            element.className = "bg-slate-900 border border-slate-800 p-3 rounded-lg text-slate-300 transition duration-300";
        }
    });

    if (!searchInput) return alert("Please enter a client name to search.");

    let left = 0;
    let right = activeClients.length - 1;
    let foundIndex = -1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        let currentItem = activeClients[mid];

        if (currentItem.toLowerCase() === searchInput.toLowerCase()) {
            foundIndex = mid;
            break;
        }
        if (currentItem.toLowerCase() < searchInput.toLowerCase()) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    if (foundIndex !== -1) {
        const targetClient = activeClients[foundIndex];
        const matchedElement = document.getElementById(`client-${targetClient.replace(/\s+/g, '')}`);
        if (matchedElement) {
            matchedElement.className = "bg-emerald-950 border border-emerald-500 p-3 rounded-lg text-emerald-200 font-bold scale-105 transition duration-300";
        }
    } else {
        alert(`Client "${searchInput}" not discovered.`);
    }
}

// 5. TASK INTAKE FORM HANDLING
function submitTask(event) {
    event.preventDefault();
    
    const descElement = document.getElementById("task-desc");
    const durationElement = document.getElementById("task-duration");
    const body = document.getElementById("audit-log-body");

    if (!descElement || !durationElement || !body) return;

    const desc = descElement.value;
    const duration = durationElement.value;

    const row = document.createElement("tr");
    row.className = "border-b border-slate-800 hover:bg-slate-900/40 text-slate-300";
    row.innerHTML = `
        <td class="p-3 font-mono text-xs text-slate-500">#${taskIdCounter++}</td>
        <td class="p-3">${desc}</td>
        <td class="p-3 text-right font-mono text-emerald-400">${duration} min</td>
    `;
    
    body.appendChild(row);

    const formElement = document.getElementById("task-form");
    if (formElement) formElement.reset();
}

// 6. INITIAL RUN TRIGGER
// Run the asynchronous loader function instead of standard displayClients()
loadClientsFromAPI();