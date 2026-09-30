/* KGF ADMIN - COMPLAINTS */

let complaintFilter = "All";


/* COMPLAINTS RENDERING */

function getComplaintInitials(name) {

    return getInitials(name);
}

function getComplaintStatusClass(status) {

    if (status === "Resolved") {
        return "status completed";
    }

    if (status === "In Progress") {
        return "status inprogress";
    }

    return "status pending";
}

function setComplaintFilter(status) {

    complaintFilter = status;

    let chips =
        document.querySelectorAll("#complaintFilters .filter-chip");

    chips.forEach(function(chip) {

        if (chip.dataset.status === status) {
            chip.classList.add("active");
        } else {
            chip.classList.remove("active");
        }

    });

    renderComplaints();
}

function buildCategoryOptions() {

    let select =
        document.getElementById("complaintCategory");

    if (!select) {
        return;
    }

    COMPLAINTS.forEach(function(complaint) {

        let exists = Array.from(select.options).some(function(option) {
            return option.value === complaint.category;
        });

        if (!exists) {
            let option = document.createElement("option");

            option.value = complaint.category;
            option.textContent = complaint.category;

            select.appendChild(option);
        }

    });
}

function updateComplaintStats() {

    let counts = { Open: 0, "In Progress": 0, Resolved: 0 };

    COMPLAINTS.forEach(function(complaint) {
        counts[complaint.status]++;
    });

    let map = {
        statOpen: counts.Open,
        statProgress: counts["In Progress"],
        statResolved: counts.Resolved,
        chipAll: COMPLAINTS.length,
        chipOpen: counts.Open,
        chipProgress: counts["In Progress"],
        chipResolved: counts.Resolved
    };

    Object.keys(map).forEach(function(id) {

        let element = document.getElementById(id);

        if (element) {
            element.textContent = map[id];
        }

    });
}

function renderComplaints() {

    let container =
        document.getElementById("complaintContainer");

    if (!container) {
        return;
    }

    let search =
        document.getElementById("complaintSearch").value.toLowerCase();

    let category =
        document.getElementById("complaintCategory").value;

    let visible = COMPLAINTS.filter(function(complaint) {

        let matchesStatus =
            complaintFilter === "All" ||
            complaint.status === complaintFilter;

        let matchesCategory =
            category === "All" ||
            complaint.category === category;

        let haystack = [
            complaint.id,
            complaint.issue,
            complaint.investorId,
            complaint.investorName,
            complaint.category,
            complaint.detail
        ].join(" ").toLowerCase();

        return matchesStatus && matchesCategory && haystack.includes(search);

    });

    container.innerHTML = "";

    visible.forEach(function(complaint) {

        container.appendChild(
            buildComplaintCard(complaint)
        );

    });

    let countLabel =
        document.getElementById("complaintCount");

    if (countLabel) {
        countLabel.textContent =
            visible.length +
            (visible.length === 1 ? " complaint" : " complaints");
    }

    let empty =
        document.getElementById("complaintEmpty");

    if (empty) {
        empty.classList.toggle(
            "visible",
            visible.length === 0
        );
    }
}

function buildComplaintCard(complaint) {

    let card = document.createElement("article");

    card.className = "complaint-card";
    card.dataset.status = complaint.status;
    card.dataset.category = complaint.category;

    let main = document.createElement("div");

    main.className = "complaint-main";

    let top = document.createElement("div");

    top.className = "complaint-top";

    let identity = document.createElement("div");

    identity.className = "complaint-identity";

    let avatar = document.createElement("div");

    avatar.className = "avatar";
    avatar.textContent = getComplaintInitials(complaint.investorName);

    let heading = document.createElement("div");

    let title = document.createElement("h3");

    title.textContent = complaint.issue;

    let meta = document.createElement("p");

    meta.className = "complaint-meta";

    meta.appendChild(document.createTextNode(complaint.id + " · "));
    meta.appendChild(document.createTextNode(complaint.date + " · "));

    let investor = document.createElement("strong");

    investor.textContent =
        complaint.investorName +
        " (" + complaint.investorId + ")";

    meta.appendChild(investor);

    heading.appendChild(title);
    heading.appendChild(meta);
    identity.appendChild(avatar);
    identity.appendChild(heading);

    let tags = document.createElement("div");

    tags.className = "complaint-tags";

    let priority = document.createElement("span");

    priority.className = "badge " + complaint.priority.toLowerCase();
    priority.textContent = complaint.priority;

    let category = document.createElement("span");

    category.className = "category-badge";
    category.textContent = complaint.category;

    let status = document.createElement("span");

    status.className = getComplaintStatusClass(complaint.status);
    status.textContent = complaint.status;

    tags.appendChild(priority);
    tags.appendChild(category);
    tags.appendChild(status);

    top.appendChild(identity);
    top.appendChild(tags);

    let detail = document.createElement("p");

    detail.className = "complaint-detail";
    detail.textContent = complaint.detail;

    let actions = document.createElement("div");

    actions.className = "complaint-actions";

    let viewButton = document.createElement("button");

    viewButton.className = "view-btn";
    viewButton.textContent = "Open Thread";
    viewButton.onclick = function() {
        viewComplaint(complaint.id);
    };

    actions.appendChild(viewButton);

    if (complaint.status !== "Resolved") {

        if (complaint.status === "Open") {

            let startButton = document.createElement("button");

            startButton.className = "ghost-btn";
            startButton.textContent = "Start Working";
            startButton.onclick = function() {
                setComplaintStatus(complaint.id, "In Progress");
            };

            actions.appendChild(startButton);

        }

        let resolveButton = document.createElement("button");

        resolveButton.className = "ghost-btn success";
        resolveButton.textContent = "Mark Resolved";
        resolveButton.onclick = function() {
            setComplaintStatus(complaint.id, "Resolved");
        };

        actions.appendChild(resolveButton);

    } else {

        let reopenButton = document.createElement("button");

        reopenButton.className = "ghost-btn";
        reopenButton.textContent = "Reopen";
        reopenButton.onclick = function() {
            setComplaintStatus(complaint.id, "Open");
        };

        actions.appendChild(reopenButton);

    }

    main.appendChild(top);
    main.appendChild(detail);
    main.appendChild(actions);

    card.appendChild(main);

    return card;
}

function setComplaintStatus(id, status) {

    let complaint = COMPLAINTS.find(function(item) {
        return item.id === id;
    });

    if (!complaint) {
        return;
    }

    complaint.status = status;

    updateComplaintStats();
    renderComplaints();
    renderConversations();

    alert(
        id + " marked as " + status + "."
    );
}


/* VIEW COMPLAINT */

function viewComplaint(id) {

    window.location.href =
        "messages.html?complaint=" + id;
}
