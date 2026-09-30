/* KGF ADMIN - INVESTORS */

/* INVESTOR REGISTRATION FORM */

/* REPLACE WITH YOUR PUBLISHED GOOGLE FORM "GET" LINK */
const INVESTOR_FORM_URL =
    "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform";

function isInvestorFormConfigured() {

    return (
        INVESTOR_FORM_URL.startsWith("https://") &&
        !INVESTOR_FORM_URL.includes("YOUR_FORM_ID")
    );
}

function openInvestorForm() {

    if (!isInvestorFormConfigured()) {

        alert(
            "Investor registration form is not set up yet.\n\n" +
            "Open script.js and replace YOUR_FORM_ID with the link " +
            "of your published Google Form."
        );

        return;
    }

    window.open(
        INVESTOR_FORM_URL,
        "_blank",
        "noopener,noreferrer"
    );
}


/* VIEW INVESTOR */

function viewInvestor(id) {

    let row = findInvestorRow(id);

    if (!row) {
        return;
    }

    let details = getInvestorDetails(row);

    alert(
        "Investor ID: " + id +
        "\nName: " + details.name +
        "\nEmail: " + details.email +
        "\nPhone: " + details.phone +
        "\nAddress: " + details.address +
        "\nInvestment: NRs " + details.amount +
        " (" + details.type + ")" +
        "\nStatus: " + details.status
    );
}

function findInvestorRow(id) {

    let table =
        document.getElementById("investorTable");

    if (!table) {
        return null;
    }

    let rows =
        table.querySelectorAll("tbody tr");

    for (let i = 0; i < rows.length; i++) {

        if (rows[i].cells[0].textContent.trim() === id) {
            return rows[i];
        }

    }

    return null;
}

function getInvestorDetails(row) {

    let phone = row.getAttribute("data-phone");

    let address = row.getAttribute("data-address");

    let amount = row.getAttribute("data-amount");

    let type = row.getAttribute("data-type");

    return {
        name: row.cells[1].textContent.trim(),
        email: row.cells[2].textContent.trim(),
        phone: phone || "Not provided",
        address: address || "Not provided",
        amount: amount || "0",
        type: type || "Not provided",
        status: row.querySelector(".status")
            .textContent.trim()
    };
}

function getNextInvestorId() {

    let table =
        document.getElementById("investorTable");

    let highest = 1000;

    function track(value) {

        let number = parseInt(
            String(value).replace(/\D/g, ""),
            10
        );

        if (!isNaN(number) && number > highest) {
            highest = number;
        }

    }

    let rows = table.querySelectorAll("tbody tr");

    rows.forEach(function(row) {
        track(row.cells[0].textContent);
    });

    REQUESTS.forEach(function(request) {
        track(request.investorId);
    });

    COMPLAINTS.forEach(function(complaint) {
        track(complaint.investorId);
    });

    return "INV-" + (highest + 1);
}

function getStatusClass(status) {

    if (status === "Active") {
        return "status completed";
    }

    if (status === "Inactive") {
        return "status rejected";
    }

    return "status pending";
}

function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}


/* ADD INVESTOR */

function openAddInvestorModal() {

    let modal =
        document.getElementById("addInvestorModal");

    modal.classList.add("active");
}

function closeAddInvestorModal() {

    let modal =
        document.getElementById("addInvestorModal");

    modal.classList.remove("active");

    modal.querySelector("form").reset();
}

function addInvestor() {

    let name =
        document.getElementById("newInvestorName").value.trim();

    let email =
        document.getElementById("newInvestorEmail").value.trim();

    let phone =
        document.getElementById("newInvestorPhone").value.trim();

    let address =
        document.getElementById("newInvestorAddress").value.trim();

    let amount =
        document.getElementById("newInvestorAmount").value.trim();

    let type =
        document.getElementById("newInvestorType").value;

    let status =
        document.getElementById("newInvestorStatus").value;

    if (!name || !email || !phone || !address || !amount) {

        alert("Please fill in all required fields.");

        return;
    }

    if (findInvestorEmail(email)) {

        alert("An investor with this email already exists.");

        return;
    }

    if (Number(amount) <= 0) {

        alert("Investment amount must be greater than zero.");

        return;
    }

    let id = getNextInvestorId();

    let formattedAmount =
        Number(amount).toLocaleString("en-US");

    let table =
        document.getElementById("investorTable");

    let row = table.querySelector("tbody").insertRow(-1);

    row.setAttribute("data-phone", phone);
    row.setAttribute("data-address", address);
    row.setAttribute("data-amount", amount);
    row.setAttribute("data-type", type);

    row.insertCell(0).textContent = id;
    row.insertCell(1).textContent = name;
    row.insertCell(2).textContent = email;
    row.insertCell(3).textContent = "NRs " + formattedAmount;

    let statusCell = row.insertCell(4);

    let badge = document.createElement("span");

    badge.className = getStatusClass(status);
    badge.textContent = status;

    statusCell.appendChild(badge);

    let actionCell = row.insertCell(5);

    let viewButton = document.createElement("button");

    viewButton.className = "view-btn";
    viewButton.textContent = "View";
    viewButton.setAttribute(
        "onclick",
        "viewInvestor('" + escapeHtml(id) + "')"
    );

    actionCell.appendChild(viewButton);

    closeAddInvestorModal();

    alert(
        "Investor added successfully!\n\n" +
        "Investor ID: " + id +
        "\nName: " + name +
        "\nEmail: " + email +
        "\nPhone: " + phone +
        "\nAddress: " + address +
        "\nInvestment: NRs " + formattedAmount +
        " (" + type + ")" +
        "\nStatus: " + status
    );
}

function findInvestorEmail(email) {

    let table =
        document.getElementById("investorTable");

    if (!table) {
        return null;
    }

    let rows =
        table.querySelectorAll("tbody tr");

    for (let i = 0; i < rows.length; i++) {

        if (rows[i].cells[2].textContent.trim() === email) {
            return rows[i];
        }

    }

    return null;
}
