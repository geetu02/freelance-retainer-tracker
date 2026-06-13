const activeClients = ["Acme Corp", "Apex Labs", "Cyberdyne Systems", "Initech", "Stark Industries", "Wayne Enterprises"];
let taskIdCounter = 1001;

function displayClients() {
    const container = document.getElementById("client-list-container");
    container.innerHTML = activeClients.map(client => `
        <div id="client-${client.replace(/\s+/g, '')}" class="bg-slate-900 border border-slate-800 p-3 rounded-lg text-slate-300 transition duration-300">
            ${client}
        </div>
    `).join('');
}

function executeBinarySearch() {
    const searchInput = document.getElementById("search-input").value.trim();
    
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
        matchedElement.className = "bg-emerald-950 border border-emerald-500 p-3 rounded-lg text-emerald-200 font-bold scale-105 transition duration-300";
    } else {
        alert(`Client "${searchInput}" not discovered.`);
    }
}

function submitTask(event) {
    event.preventDefault();
    const desc = document.getElementById("task-desc").value;
    const duration = document.getElementById("task-duration").value;
    const tbody = document.getElementById("audit-log-body");

    const row = document.createElement("tr");
    row.className = "border-b border-slate-800 hover:bg-slate-900/40 text-slate-300";
    row.innerHTML = `
        <td class="p-3 font-mono text-xs text-slate-500">#${taskIdCounter++}</td>
        <td class="p-3">${desc}</td>
        <td class="p-3 text-right font-mono text-emerald-400">${duration} min</td>
    `;
    tbody.appendChild(row);

    document.getElementById("task-form").reset();
}

displayClients();