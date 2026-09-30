/* KGF ADMIN - TRANSACTIONS */

let requestFilter = "All";


/* APPROVE TRANSACTION */

function approveRequest(id) {

    setRequestStatus(id, "Approved", "approved successfully.");
}


/* REJECT TRANSACTION */

function rejectRequest(id) {

    let confirmed = confirm(
        "Reject " + id + "?\n\nThe investor will be notified."
    );

    if (!confirmed) {
        return;
    }

    setRequestStatus(id, "Rejected", "rejected.");
}

function setRequestStatus(id, status, verb) {

    let request = REQUESTS.find(function(item) {
        return item.id === id;
    });

    if (!request) {
        return;
    }

    request.status = status;

    updateRequestStats();
    renderRequests();
    renderDashboard();

    alert(
        "Transaction " + id + " " + verb
    );
}


/* TRANSACTIONS RENDERING */

function getRequestStatusClass(status) {

    if (status === "Approved") {
        return "status approved";
    }

    if (status === "Rejected") {
        return "status rejected";
    }

    return "status pending";
}

function getTypeClass(type) {

    return "type-badge " + type.toLowerCase();
}

function setRequestFilter(status) {

    requestFilter = status;

    let chips =
        document.querySelectorAll("#requestFilters .filter-chip");

    chips.forEach(function(chip) {

        if (chip.dataset.status === status) {
            chip.classList.add("active");
        } else {
            chip.classList.remove("active");
        }

    });

    renderRequests();
}

function buildRequestTypeOptions() {

    let select =
        document.getElementById("requestType");

    if (!select) {
        return;
    }

    REQUESTS.forEach(function(request) {

        let exists = Array.from(select.options).some(function(option) {
            return option.value === request.type;
        });

        if (!exists) {

            let option = document.createElement("option");

            option.value = request.type;
            option.textContent = request.type;

            select.appendChild(option);
        }

    });
}

function updateRequestStats() {

    let counts = { Pending: 0, Approved: 0, Rejected: 0 };

    let totals = { Approved: 0 };

    let volume = 0;

    REQUESTS.forEach(function(request) {

        counts[request.status]++;
        volume += request.amount;

        if (request.status === "Approved") {
            totals.Approved += request.amount;
        }

    });

    let map = {
        statVolume: formatCompact(volume),
        statVolumeCount:
            REQUESTS.length +
            (REQUESTS.length === 1 ? " request" : " requests"),
        statPending: counts.Pending,
        statApproved: counts.Approved,
        statApprovedValue: formatCompact(totals.Approved),
        reqChipAll: REQUESTS.length,
        reqChipPending: counts.Pending,
        reqChipApproved: counts.Approved,
        reqChipRejected: counts.Rejected
    };

    Object.keys(map).forEach(function(id) {

        let element = document.getElementById(id);

        if (element) {
            element.textContent = map[id];
        }

    });
}

function renderRequests() {

    let body =
        document.getElementById("requestBody");

    if (!body) {
        return;
    }

    let search =
        document.getElementById("requestSearch").value.toLowerCase();

    let type =
        document.getElementById("requestType").value;

    let visible = REQUESTS.filter(function(request) {

        let matchesStatus =
            requestFilter === "All" ||
            request.status === requestFilter;

        let matchesType =
            type === "All" ||
            request.type === type;

        let haystack = [
            request.id,
            request.investorId,
            request.investorName,
            request.type,
            request.method,
            request.status
        ].join(" ").toLowerCase();

        return matchesStatus && matchesType && haystack.includes(search);

    });

    body.innerHTML = "";

    visible.forEach(function(request) {

        body.appendChild(
            buildRequestRow(request)
        );

    });

    let countLabel =
        document.getElementById("requestCount");

    if (countLabel) {
        countLabel.textContent =
            visible.length +
            (visible.length === 1 ? " request" : " requests");
    }

    let empty =
        document.getElementById("requestEmpty");

    if (empty) {
        empty.classList.toggle(
            "visible",
            visible.length === 0
        );
    }
}

function buildRequestRow(request) {

    let row = document.createElement("tr");

    let idCell = document.createElement("td");

    idCell.className = "cell-strong";
    idCell.textContent = request.id;

    let investorCell = document.createElement("td");

    let person = document.createElement("div");

    person.className = "table-person";

    let avatar = document.createElement("span");

    avatar.className = "avatar";
    avatar.textContent = getInitials(request.investorName);

    let personText = document.createElement("div");

    let name = document.createElement("span");

    name.className = "cell-strong";
    name.textContent = request.investorName;

    let sub = document.createElement("span");

    sub.className = "cell-sub";
    sub.textContent = request.investorId;

    personText.appendChild(name);
    personText.appendChild(sub);

    person.appendChild(avatar);
    person.appendChild(personText);

    investorCell.appendChild(person);

    let typeCell = document.createElement("td");

    let typeBadge = document.createElement("span");

    typeBadge.className = getTypeClass(request.type);
    typeBadge.textContent = request.type;

    typeCell.appendChild(typeBadge);

    let amountCell = document.createElement("td");

    amountCell.className = "amount";
    amountCell.textContent = formatNpr(request.amount);

    let methodCell = document.createElement("td");

    methodCell.textContent = request.method;

    let dateCell = document.createElement("td");

    dateCell.textContent = request.date;

    let statusCell = document.createElement("td");

    let statusBadge = document.createElement("span");

    statusBadge.className = getRequestStatusClass(request.status);
    statusBadge.textContent = request.status;

    statusCell.appendChild(statusBadge);

    let actionCell = document.createElement("td");

    if (request.status === "Pending") {

        let approveButton = document.createElement("button");

        approveButton.className = "approve-btn";
        approveButton.textContent = "Approve";
        approveButton.onclick = function() {
            approveRequest(request.id);
        };

        let rejectButton = document.createElement("button");

        rejectButton.className = "reject-btn";
        rejectButton.textContent = "Reject";
        rejectButton.onclick = function() {
            rejectRequest(request.id);
        };

        actionCell.appendChild(approveButton);
        actionCell.appendChild(rejectButton);

    } else {

        let revertButton = document.createElement("button");

        revertButton.className = "view-btn";
        revertButton.textContent = "Revert to Pending";
        revertButton.onclick = function() {
            setRequestStatus(
                request.id,
                "Pending",
                "reverted to pending."
            );
        };

        actionCell.appendChild(revertButton);

    }

    row.appendChild(idCell);
    row.appendChild(investorCell);
    row.appendChild(typeCell);
    row.appendChild(amountCell);
    row.appendChild(methodCell);
    row.appendChild(dateCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    return row;
}

function exportRequests() {

    let rows = REQUESTS.map(function(request) {

        return [
            request.id,
            request.investorId,
            request.investorName,
            request.type,
            request.amount,
            request.method,
            request.date,
            request.status
        ].join(",");

    });

    let csv = [
        "Request ID,Investor ID,Investor,Type,Amount,Method,Date,Status"
    ].concat(rows).join("\n");

    let blob = new Blob([csv], { type: "text/csv" });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "kgf-transactions.csv";

    link.click();

    URL.revokeObjectURL(link.href);
}
