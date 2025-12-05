let accounts = JSON.parse(localStorage.getItem("bankAccounts")) || [];

function saveData() {
    localStorage.setItem("bankAccounts", JSON.stringify(accounts));
}

function createAccount() {
    let name = document.getElementById("name").value;
    let accnum = document.getElementById("accnum").value;
    let balance = Number(document.getElementById("amount").value);

    if (!name || !accnum || balance < 0) return alert("Invalid details!");
    
    accounts.push({ name, accnum, balance });
    saveData();
    alert("Account Created Successfully!");
}

function deposit() {
    let accnum = document.getElementById("daccnum").value;
    let amount = Number(document.getElementById("damount").value);

    let acc = accounts.find(a => a.accnum === accnum);
    if (!acc) return alert("Account Not Found!");

    acc.balance += amount;
    saveData();
    alert("Deposit Successful!");
}

function withdraw() {
    let accnum = document.getElementById("waccnum").value;
    let amount = Number(document.getElementById("wamount").value);

    let acc = accounts.find(a => a.accnum === accnum);
    if (!acc) return alert("Account Not Found!");

    if (acc.balance < amount) return alert("Insufficient Balance!");

    acc.balance -= amount;
    saveData();
    alert("Withdraw Successful!");
}

function searchAccount() {
    let accnum = document.getElementById("saccnum").value;
    let acc = accounts.find(a => a.accnum === accnum);

    document.getElementById("result").innerHTML =
        acc ? `Name: ${acc.name}<br>Balance: ₹${acc.balance}` : "Account Not Found!";
}

let editIndex = null;

function showAllAccounts() {
    let table = document.getElementById("accountTable");

    table.innerHTML = `<tr>
        <th>Name</th>
        <th>Account Number</th>
        <th>Balance (₹)</th>
        <th>Actions</th>
    </tr>`;

    accounts.forEach((acc, index) => {
        let row = `<tr>
            <td>${acc.name}</td>
            <td>${acc.accnum}</td>
            <td>₹${acc.balance}</td>
            <td>
                <button class="btn edit" onclick="editAccount(${index})">Edit</button>
                <button class="btn delete" onclick="deleteAccount(${index})">Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}

function deleteAccount(index) {
    if (confirm("Are you sure you want to delete this account?")) {
        accounts.splice(index, 1);
        saveData();
        showAllAccounts();
    }
}

function editAccount(index) {
    editIndex = index;
    document.getElementById("editName").value = accounts[index].name;
    document.getElementById("editBalance").value = accounts[index].balance;
    document.getElementById("popup").style.display = "block";
}

function saveEdit() {
    accounts[editIndex].name = document.getElementById("editName").value;
    accounts[editIndex].balance = Number(document.getElementById("editBalance").value);

    saveData();
    showAllAccounts();
    closePopup();
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function applyTheme() {
    let theme = localStorage.getItem("theme") || "light";
    let html = document.body;
    let styleTag = document.getElementById("theme");

    if(theme === "dark") {
        html.classList.add("dark");
        styleTag.innerHTML = `
            body { background:#0e0e0e; color:white; }
            .container { background:rgba(255,255,255,0.05); border:1px solid #444; }
        `;
    } else {
        html.classList.remove("dark");
        styleTag.innerHTML = `
            body { background:#e8f0ff; color:black; }
            .container { background:rgba(255,255,255,0.5); border:1px solid #ccc; }
        `;
    }
}

function toggleTheme() {
    let theme = localStorage.getItem("theme") || "light";
    let newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    applyTheme();
}
