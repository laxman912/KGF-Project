/* KGF ADMIN - DASHBOARD */

/* DASHBOARD CHARTS */

function renderGrowthChart() {

    let wrap =
        document.getElementById("growthChart");

    if (!wrap) {
        return;
    }

    let tooltip =
        document.getElementById("growthTooltip");

    let width = 720;
    let height = 270;

    let padLeft = 48;
    let padRight = 14;
    let padTop = 16;
    let padBottom = 30;

    let innerWidth = width - padLeft - padRight;
    let innerHeight = height - padTop - padBottom;

    let maxValue = 90;

    let points = GROWTH.map(function(item, index) {

        let x = padLeft +
            (index * innerWidth) / (GROWTH.length - 1);

        let y = padTop +
            innerHeight -
            (item.value / maxValue) * innerHeight;

        return { x: x, y: y, item: item };

    });

    let linePath = points.map(function(point, index) {
        return (index === 0 ? "M" : "L") +
            point.x.toFixed(1) + " " + point.y.toFixed(1);
    }).join(" ");

    let areaPath = linePath +
        " L " + points[points.length - 1].x.toFixed(1) + " " +
        (padTop + innerHeight).toFixed(1) +
        " L " + points[0].x.toFixed(1) + " " +
        (padTop + innerHeight).toFixed(1) +
        " Z";

    let gridlines = "";

    for (let i = 0; i <= 4; i++) {

        let value = (maxValue / 4) * i;

        let y = padTop +
            innerHeight -
            (value / maxValue) * innerHeight;

        gridlines +=
            '<line class="chart-grid-line" x1="' + padLeft +
            '" y1="' + y.toFixed(1) +
            '" x2="' + (width - padRight) +
            '" y2="' + y.toFixed(1) + '"></line>';

        gridlines +=
            '<text class="chart-axis-label" x="' + (padLeft - 10) +
            '" y="' + (y + 4).toFixed(1) +
            '" text-anchor="end">' + value.toFixed(0) + 'M</text>';

    }

    let labels = points.map(function(point) {

        return '<text class="chart-axis-label" x="' +
            point.x.toFixed(1) +
            '" y="' + (height - 10) +
            '" text-anchor="middle">' +
            point.item.month + '</text>';

    }).join("");

    let markers = points.map(function(point) {

        return '<circle cx="' + point.x.toFixed(1) +
            '" cy="' + point.y.toFixed(1) +
            '" r="4" fill="#ffffff" stroke="#2563eb" stroke-width="2.5"></circle>';

    }).join("");

    let targets = points.map(function(point, index) {

        let step = innerWidth / (GROWTH.length - 1);

        return '<rect class="chart-target" data-index="' + index +
            '" x="' + (point.x - step / 2).toFixed(1) +
            '" y="' + padTop +
            '" width="' + step.toFixed(1) +
            '" height="' + innerHeight +
            '" fill="transparent"></rect>';

    }).join("");

    wrap.querySelectorAll("svg").forEach(function(node) {
        node.remove();
    });

    let svg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );

    svg.setAttribute("viewBox", "0 0 " + width + " " + height);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Cumulative assets under management by month");

    svg.innerHTML =
        '<defs>' +
        '<linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#3b82f6" stop-opacity="0.30"></stop>' +
        '<stop offset="100%" stop-color="#3b82f6" stop-opacity="0.02"></stop>' +
        '</linearGradient>' +
        '</defs>' +
        gridlines +
        '<path d="' + areaPath + '" fill="url(#growthFill)"></path>' +
        '<path d="' + linePath + '" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"></path>' +
        markers +
        labels +
        targets;

    wrap.insertBefore(svg, tooltip);

    svg.querySelectorAll(".chart-target").forEach(function(target) {

        target.addEventListener("mouseenter", function() {

            let point = points[Number(target.dataset.index)];

            tooltip.innerHTML =
                "<strong>" + point.item.month + "</strong>" +
                formatNpr(point.item.value * 1000000);

            let ratio = point.x / width;

            tooltip.style.left = (ratio * 100) + "%";
            tooltip.style.top = (point.y / height) * wrap.offsetHeight + "px";

            tooltip.classList.add("visible");

        });

    });

    svg.addEventListener("mouseleave", function() {
        tooltip.classList.remove("visible");
    });
}

function renderAllocation() {

    let container =
        document.getElementById("allocationChart");

    if (!container) {
        return;
    }

    let radius = 60;
    let circumference = 2 * Math.PI * radius;

    let total = ALLOCATION.reduce(function(sum, item) {
        return sum + item.pct;
    }, 0);

    let offset = 0;

    let segments = ALLOCATION.map(function(item) {

        let length = (item.pct / total) * circumference;

        let segment =
            '<circle cx="84" cy="84" r="' + radius +
            '" fill="none" stroke="' + item.color +
            '" stroke-width="24" stroke-linecap="butt" ' +
            'stroke-dasharray="' + length.toFixed(2) + " " +
            (circumference - length).toFixed(2) +
            '" stroke-dashoffset="' + (-offset).toFixed(2) +
            '"></circle>';

        offset += length;

        return segment;

    }).join("");

    let legend = ALLOCATION.map(function(item) {

        return '<div class="allocation-row">' +
            '<span class="legend-swatch" style="background:' + item.color + '"></span>' +
            '<span class="allocation-name">' + item.name + '</span>' +
            '<span class="allocation-bar"><i style="width:' + item.pct +
            '%;background:' + item.color + '"></i></span>' +
            '<span class="allocation-pct">' + item.pct + '%</span>' +
            '</div>';

    }).join("");

    container.innerHTML =
        '<div class="donut-wrap">' +
        '<svg viewBox="0 0 168 168" width="168" height="168">' +
        segments +
        '</svg>' +
        '<div class="donut-center">' +
        '<strong>NRs 84.2M</strong>' +
        '<span>Total AUM</span>' +
        '</div>' +
        '</div>' +
        '<div class="allocation-list">' + legend + '</div>';
}


/* DASHBOARD PANELS */

function renderDashboard() {

    renderGrowthChart();
    renderAllocation();
    renderPendingRequests();
    renderRecentActivity();
    renderLatestTransactions();
    renderKpis();
}

function renderKpis() {

    let pending = REQUESTS.filter(function(request) {
        return request.status === "Pending";
    }).length;

    let openComplaints = COMPLAINTS.filter(function(complaint) {
        return complaint.status !== "Resolved";
    }).length;

    let pendingEl = document.getElementById("kpiPending");
    let complaintsEl = document.getElementById("kpiComplaints");

    if (pendingEl) {
        pendingEl.textContent = pending;
    }

    if (complaintsEl) {
        complaintsEl.textContent = openComplaints;
    }
}

function renderPendingRequests() {

    let container =
        document.getElementById("pendingRequests");

    if (!container) {
        return;
    }

    let pending = REQUESTS.filter(function(request) {
        return request.status === "Pending";
    });

    container.innerHTML = "";

    if (pending.length === 0) {

        let empty = document.createElement("div");

        empty.className = "empty-state visible";
        empty.style.padding = "30px 10px";

        let icon = document.createElement("div");

        icon.className = "empty-icon";
        icon.textContent = "✓";

        let title = document.createElement("h3");

        title.textContent = "All caught up";

        let text = document.createElement("p");

        text.textContent = "No transaction requests are waiting for approval.";

        empty.appendChild(icon);
        empty.appendChild(title);
        empty.appendChild(text);

        container.appendChild(empty);

        return;
    }

    pending.forEach(function(request) {

        let item = document.createElement("div");

        item.className = "request-item";

        let avatar = document.createElement("span");

        avatar.className = "avatar";
        avatar.textContent = getInitials(request.investorName);

        let main = document.createElement("div");

        main.className = "request-main";

        let name = document.createElement("strong");

        name.textContent = request.investorName;

        let meta = document.createElement("span");

        meta.textContent =
            request.id + " · " + request.type + " · " + request.date;

        main.appendChild(name);
        main.appendChild(meta);

        let amount = document.createElement("div");

        amount.className = "request-amount";

        let value = document.createElement("strong");

        value.textContent = formatNpr(request.amount);

        let type = document.createElement("span");

        type.textContent = request.investorId;

        amount.appendChild(value);
        amount.appendChild(type);

        let review = document.createElement("a");

        review.className = "view-btn";
        review.href = "transactions.html";
        review.textContent = "Review";
        review.style.textDecoration = "none";

        item.appendChild(avatar);
        item.appendChild(main);
        item.appendChild(amount);
        item.appendChild(review);

        container.appendChild(item);

    });
}

function renderRecentActivity() {

    let container =
        document.getElementById("recentActivity");

    if (!container) {
        return;
    }

    let feed = [
        {
            icon: "◷",
            tone: "warning",
            html: "<strong>REQ-002</strong> is waiting for your approval.",
            time: "10 minutes ago"
        },
        {
            icon: "!",
            tone: "danger",
            html: "<strong>COMP-001</strong> complaint received from INV-1004.",
            time: "30 minutes ago"
        },
        {
            icon: "◉",
            tone: "brand",
            html: "<strong>INV-1030</strong> registered as a new investor.",
            time: "1 hour ago"
        },
        {
            icon: "✓",
            tone: "success",
            html: "<strong>REQ-003</strong> of NRs 500,000 was approved.",
            time: "2 hours ago"
        },
        {
            icon: "✉",
            tone: "brand",
            html: "New reply sent on thread <strong>COMP-002</strong>.",
            time: "3 hours ago"
        }
    ];

    container.innerHTML = "";

    feed.forEach(function(entry) {

        let item = document.createElement("div");

        item.className = "activity";

        let icon = document.createElement("span");

        icon.className = "activity-icon " + entry.tone;
        icon.textContent = entry.icon;

        let body = document.createElement("div");

        let text = document.createElement("p");

        text.innerHTML = entry.html;

        let time = document.createElement("small");

        time.textContent = entry.time;

        body.appendChild(text);
        body.appendChild(time);

        item.appendChild(icon);
        item.appendChild(body);

        container.appendChild(item);

    });
}

function renderLatestTransactions() {

    let body =
        document.getElementById("latestTransactions");

    if (!body) {
        return;
    }

    body.innerHTML = "";

    REQUESTS.slice(0, 6).forEach(function(request) {

        let row = document.createElement("tr");

        let idCell = document.createElement("td");

        idCell.className = "cell-strong";
        idCell.textContent = request.id;

        let investorCell = document.createElement("td");

        let name = document.createElement("span");

        name.className = "cell-strong";
        name.textContent = request.investorName;

        let sub = document.createElement("span");

        sub.className = "cell-sub";
        sub.textContent = request.investorId;

        investorCell.appendChild(name);
        investorCell.appendChild(sub);

        let typeCell = document.createElement("td");

        let typeBadge = document.createElement("span");

        typeBadge.className = getTypeClass(request.type);
        typeBadge.textContent = request.type;

        typeCell.appendChild(typeBadge);

        let amountCell = document.createElement("td");

        amountCell.className = "amount";
        amountCell.textContent = formatNpr(request.amount);

        let dateCell = document.createElement("td");

        dateCell.textContent = request.date;

        let statusCell = document.createElement("td");

        let statusBadge = document.createElement("span");

        statusBadge.className = getRequestStatusClass(request.status);
        statusBadge.textContent = request.status;

        statusCell.appendChild(statusBadge);

        row.appendChild(idCell);
        row.appendChild(investorCell);
        row.appendChild(typeCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        row.appendChild(statusCell);

        body.appendChild(row);

    });
}

function setDashboardDate() {

    let element =
        document.getElementById("dashboardDate");

    if (!element) {
        return;
    }

    let today = new Date();

    element.textContent = today.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}
