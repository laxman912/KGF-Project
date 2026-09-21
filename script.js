/* LOGOUT */

function logout() {

    let confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (confirmLogout) {
        window.location.href = "login.html";
    }
}


/* APPROVE TRANSACTION */

function approveRequest(button) {

    let row = button.closest("tr");

    let status = row.querySelector(".status");

    status.textContent = "Approved";
    status.className = "status completed";

    button.disabled = true;

    let rejectButton = row.querySelector(".reject-btn");

    if (rejectButton) {
        rejectButton.disabled = true;
    }

    alert("Transaction approved successfully.");
}


/* REJECT TRANSACTION */

function rejectRequest(button) {

    let row = button.closest("tr");

    let status = row.querySelector(".status");

    status.textContent = "Rejected";
    status.className = "status rejected";

    button.disabled = true;

    let approveButton = row.querySelector(".approve-btn");

    if (approveButton) {
        approveButton.disabled = true;
    }

    alert("Transaction rejected.");
}


/* SEARCH TABLE */

function searchTable(inputId, tableId) {

    let input = document.getElementById(inputId);

    let filter = input.value.toLowerCase();

    let table = document.getElementById(tableId);

    let rows = table
        .getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        let text = rows[i]
            .textContent
            .toLowerCase();

        if (text.includes(filter)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}


/* SEARCH COMPLAINTS */

function searchComplaints() {

    let input =
        document.getElementById("complaintSearch");

    let filter =
        input.value.toLowerCase();

    let cards =
        document.querySelectorAll(".complaint-card");

    cards.forEach(function(card) {

        let text =
            card.textContent.toLowerCase();

        if (text.includes(filter)) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }

    });
}


/* VIEW INVESTOR */

function viewInvestor(id) {

    alert(
        "Investor ID: " + id +
        "\nStatus: Active"
    );
}


/* ADD INVESTOR */

function addInvestor() {

    let name = prompt(
        "Enter investor name:"
    );

    if (!name) {
        return;
    }

    let email = prompt(
        "Enter investor email:"
    );

    if (!email) {
        return;
    }

    alert(
        "Investor added successfully!\n\n" +
        "Name: " + name +
        "\nEmail: " + email
    );
}


/* VIEW COMPLAINT */

function viewComplaint(id) {

    window.location.href =
        "messages.html?complaint=" + id;
}


/* MARK NOTIFICATIONS AS READ */

function markNotificationsRead() {

    let notifications =
        document.querySelectorAll(
            ".notification-item"
        );

    notifications.forEach(function(item) {

        item.style.opacity = "0.5";

    });

    alert(
        "All notifications marked as read."
    );
}


/* SAVE SETTINGS */

function saveSettings() {

    let name =
        document.getElementById("adminName").value;

    let email =
        document.getElementById("adminEmail").value;

    let password =
        document.getElementById("newPassword").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;
    }

    alert(
        "Settings saved successfully!"
    );
}


/* MESSAGE FILTER FROM COMPLAINT */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        let params =
            new URLSearchParams(
                window.location.search
            );

        let complaintId =
            params.get("complaint");

        if (!complaintId) {
            return;
        }

        let table =
            document.getElementById("messageTable");

        if (!table) {
            return;
        }

        let rows =
            table.querySelectorAll("tbody tr");

        rows.forEach(function(row) {

            let complaintCell =
                row.cells[1];

            if (
                complaintCell.textContent.trim()
                !== complaintId
            ) {
                row.style.display = "none";
            }

        });

    }
);