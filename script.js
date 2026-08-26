// ===============================
// Section Navigation
// ===============================

function showSection(sectionId) {

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    document.getElementById(sectionId).classList.add("active-section");

    const titles = {
        dashboard: "Dashboard",
        investors: "Investors",
        transactions: "Transactions",
        complaints: "Complaints & Queries",
        notifications: "Notifications",
        settings: "Settings"
    };

    document.getElementById("page-title").textContent =
        titles[sectionId];

    // Update active sidebar link
    const links = document.querySelectorAll(".sidebar nav a");

    links.forEach(link => {
        link.classList.remove("active");
    });

    event.target.classList.add("active");
}


// ===============================
// Investor Search
// ===============================

function searchInvestors() {

    const input =
        document.getElementById("investorSearch");

    const filter =
        input.value.toLowerCase();

    const table =
        document.getElementById("investorTable");

    const rows =
        table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {

        const rowText =
            rows[i].textContent.toLowerCase();

        if (rowText.includes(filter)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}


// ===============================
// Approve Transaction
// ===============================

function approveRequest(button) {

    const row = button.closest("tr");

    const status = row.querySelector(".status");

    const confirmed =
        confirm("Are you sure you want to approve this request?");

    if (confirmed) {

        status.textContent = "Approved";

        status.className =
            "status completed";

        button.remove();

        alert("Transaction request approved.");
    }
}


// ===============================
// Reject Transaction
// ===============================

function rejectRequest(button) {

    const row = button.closest("tr");

    const status = row.querySelector(".status");

    const confirmed =
        confirm("Are you sure you want to reject this request?");

    if (confirmed) {

        status.textContent = "Rejected";

        status.className =
            "status";

        status.style.background = "#fee2e2";
        status.style.color = "#dc2626";

        button.remove();

        alert("Transaction request rejected.");
    }
}


// ===============================
// Logout
// ===============================

function logout() {

    const confirmed =
        confirm("Are you sure you want to logout?");

    if (confirmed) {

        alert("You have been logged out.");

        // Later this can redirect to login page
        // window.location.href = "login.html";
    }
}


// ===============================
// Investment Chart
// ===============================

const canvas =
    document.getElementById("investmentChart");

const ctx =
    canvas.getContext("2d");

const data = [
    250000,
    380000,
    300000,
    520000,
    450000,
    650000,
    800000
];

const labels = [
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug"
];

function drawChart() {

    const width = canvas.width =
        canvas.offsetWidth * 2;

    const height = canvas.height =
        canvas.offsetHeight * 2;

    ctx.scale(2, 2);

    const chartWidth =
        canvas.offsetWidth;

    const chartHeight =
        canvas.offsetHeight;

    const padding = 40;

    const maxValue =
        Math.max(...data);

    // Clear canvas
    ctx.clearRect(
        0,
        0,
        chartWidth,
        chartHeight
    );


    // Grid lines

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {

        const y =
            padding +
            ((chartHeight - padding * 2) / 4) * i;

        ctx.beginPath();

        ctx.moveTo(
            padding,
            y
        );

        ctx.lineTo(
            chartWidth - padding,
            y
        );

        ctx.stroke();
    }


    // Chart line

    ctx.beginPath();

    data.forEach((value, index) => {

        const x =
            padding +
            index *
            ((chartWidth - padding * 2) /
            (data.length - 1));

        const y =
            chartHeight -
            padding -
            (value / maxValue) *
            (chartHeight - padding * 2);

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;
    ctx.stroke();


    // Data points

    data.forEach((value, index) => {

        const x =
            padding +
            index *
            ((chartWidth - padding * 2) /
            (data.length - 1));

        const y =
            chartHeight -
            padding -
            (value / maxValue) *
            (chartHeight - padding * 2);

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#2563eb";

        ctx.fill();
    });


    // Labels

    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";

    labels.forEach((label, index) => {

        const x =
            padding +
            index *
            ((chartWidth - padding * 2) /
            (labels.length - 1));

        ctx.fillText(
            label,
            x,
            chartHeight - 15
        );
    });
}

drawChart();


// Redraw chart when browser size changes

window.addEventListener(
    "resize",
    drawChart
);