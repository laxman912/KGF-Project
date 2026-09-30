/* KGF ADMIN - CORE */

/* LOGOUT */

function logout() {

    let confirmLogout = confirm(
        "Are you sure you want to logout?"
    );

    if (confirmLogout) {

        sessionStorage.removeItem("adminLoggedIn");
        sessionStorage.removeItem("adminUsername");

        window.location.href = "login.html";
    }
}


/* AUTH GUARD */

function requireAdmin() {

    if (sessionStorage.getItem("adminLoggedIn") !== "true") {

        window.location.href = "login.html";

        return false;
    }

    return true;
}


/* FORMATTING */

function formatNpr(value) {

    return "NRs " + Number(value).toLocaleString("en-US");
}

function formatCompact(value) {

    if (value >= 1000000) {
        return "NRs " + (value / 1000000).toFixed(1) + "M";
    }

    if (value >= 1000) {
        return "NRs " + (value / 1000).toFixed(0) + "K";
    }

    return formatNpr(value);
}

function getInitials(name) {

    return name
        .split(" ")
        .map(function(part) {
            return part.charAt(0);
        })
        .join("")
        .slice(0, 2)
        .toUpperCase();
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


/* MODAL OVERLAY CLOSE */

function setupModalOverlay() {

    let overlay =
        document.getElementById("addInvestorModal");

    if (!overlay) {
        return;
    }

    overlay.addEventListener(
        "click",
        function(event) {

            if (event.target === overlay) {
                closeAddInvestorModal();
            }

        }
    );

    document.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Escape") {
                closeAddInvestorModal();
            }

        }
    );
}
/* PAGE INIT */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        if (!requireAdmin()) {
            return;
        }

        setupModalOverlay();

        setDashboardDate();
        renderDashboard();

        buildRequestTypeOptions();
        updateRequestStats();
        renderRequests();

        buildCategoryOptions();
        updateComplaintStats();
        renderComplaints();
        renderConversations();

        let params =
            new URLSearchParams(
                window.location.search
            );

        let complaintId =
            params.get("complaint");

        if (complaintId) {
            selectConversation(complaintId);
        }

    }
);

window.addEventListener(
    "resize",
    function() {
        renderGrowthChart();
    }
);
