/* KGF ADMIN - MESSAGES */

let activeConversation = null;
let messageSequence = MESSAGES.length;


/* MESSAGES INBOX */

function getMessagesFor(complaintId) {

    return MESSAGES.filter(function(message) {
        return message.complaintId === complaintId;
    });
}

function getComplaint(complaintId) {

    return COMPLAINTS.find(function(complaint) {
        return complaint.id === complaintId;
    });
}

function renderConversations() {

    let list =
        document.getElementById("conversationList");

    if (!list) {
        return;
    }

    let search =
        document.getElementById("messageSearch").value.toLowerCase();

    let visible = COMPLAINTS.filter(function(complaint) {

        let messages = getMessagesFor(complaint.id);

        let last = messages[messages.length - 1];

        let haystack = [
            complaint.id,
            complaint.issue,
            complaint.investorName,
            complaint.investorId,
            complaint.category,
            last ? last.text : ""
        ].join(" ").toLowerCase();

        return haystack.includes(search);

    });

    list.innerHTML = "";

    if (visible.length === 0) {

        activeConversation = null;

        clearReplyDraft();
        renderThread();

        let empty = document.createElement("div");

        empty.className = "empty-state visible";
        empty.style.padding = "40px 20px";

        let icon = document.createElement("div");

        icon.className = "empty-icon";
        icon.textContent = "?";

        let title = document.createElement("h3");

        title.textContent = "No conversations";

        let text = document.createElement("p");

        text.textContent = "No thread matches your search.";

        empty.appendChild(icon);
        empty.appendChild(title);
        empty.appendChild(text);

        list.appendChild(empty);

    }

    visible.forEach(function(complaint) {

        list.appendChild(
            buildConversationItem(complaint)
        );

    });

    let count =
        document.getElementById("conversationCount");

    if (count) {
        count.textContent =
            visible.length +
            (visible.length === 1 ? " thread" : " threads");
    }

    if (activeConversation && !visible.some(function(complaint) {
        return complaint.id === activeConversation;
    })) {

        activeConversation = null;

        clearReplyDraft();
    }
    if (!activeConversation && visible.length > 0 && !search) {
        selectConversation(visible[0].id);
    } else {

        markActiveConversation();

        if (!activeConversation) {
            renderThread();
        }

    }
}

function clearReplyDraft() {

    let input =
        document.getElementById("replyText");

    if (input) {
        input.value = "";
    }
}

function buildConversationItem(complaint) {

    let messages = getMessagesFor(complaint.id);

    let last = messages[messages.length - 1];

    let item = document.createElement("button");

    item.className = "conversation-item";
    item.dataset.complaint = complaint.id;
    item.onclick = function() {
        selectConversation(complaint.id);
    };

    if (complaint.status !== "Resolved") {

        let dot = document.createElement("span");

        dot.className = "unread-dot";

        item.appendChild(dot);

    } else {

        let spacer = document.createElement("span");

        spacer.className = "unread-dot";
        spacer.style.background = "transparent";

        item.appendChild(spacer);

    }

    let avatar = document.createElement("span");

    avatar.className = "avatar";
    avatar.textContent = getComplaintInitials(complaint.investorName);

    let body = document.createElement("span");

    body.className = "conversation-body";

    let top = document.createElement("span");

    top.className = "conversation-top";

    let name = document.createElement("strong");

    name.textContent = complaint.investorName;

    let time = document.createElement("span");

    time.className = "conversation-time";

    time.textContent = last
        ? last.time.split(" ").slice(0, 3).join(" ")
        : complaint.date;

    top.appendChild(name);
    top.appendChild(time);

    let preview = document.createElement("span");

    preview.className = "conversation-preview";

    preview.textContent = last ? last.text : complaint.issue;

    let tags = document.createElement("span");

    tags.className = "conversation-tags";

    let category = document.createElement("span");

    category.className = "category-badge";
    category.textContent = complaint.category;

    let status = document.createElement("span");

    status.className = getComplaintStatusClass(complaint.status);
    status.textContent = complaint.status;

    tags.appendChild(category);
    tags.appendChild(status);

    body.appendChild(top);
    body.appendChild(preview);
    body.appendChild(tags);

    item.appendChild(avatar);
    item.appendChild(body);

    return item;
}

function markActiveConversation() {

    let items =
        document.querySelectorAll(".conversation-item");

    items.forEach(function(item) {

        if (item.dataset.complaint === activeConversation) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }

    });
}

function selectConversation(complaintId) {

    if (activeConversation !== complaintId) {
        clearReplyDraft();
    }

    activeConversation = complaintId;

    markActiveConversation();
    renderThread();
}

function renderThread() {

    let header =
        document.getElementById("threadHeader");

    let body =
        document.getElementById("threadMessages");

    if (!header || !body) {
        return;
    }

    if (!activeConversation) {

        header.innerHTML = "";

        let title = document.createElement("h2");

        title.textContent = "Select a conversation";

        let text = document.createElement("p");

        text.textContent =
            "Choose a complaint thread from the list to read and reply.";

        header.appendChild(title);
        header.appendChild(text);

        body.innerHTML = "";

        return;
    }

    let complaint = getComplaint(activeConversation);

    if (!complaint) {

        activeConversation = null;

        renderThread();

        return;
    }

    header.innerHTML = "";

    let title = document.createElement("h2");

    title.textContent = complaint.issue;

    let meta = document.createElement("p");

    meta.textContent =
        complaint.id +
        " · " + complaint.investorName +
        " (" + complaint.investorId + ")" +
        " · Opened " + complaint.date;

    header.appendChild(title);
    header.appendChild(meta);

    body.innerHTML = "";

    let messages = getMessagesFor(complaint.id);

    messages.forEach(function(message) {

        body.appendChild(
            buildMessageBubble(message)
        );

    });

    body.scrollTop = body.scrollHeight;
}

function buildMessageBubble(message) {

    let isAdmin = message.role === "Administrator";

    let row = document.createElement("div");

    row.className = "message-row" + (isAdmin ? " admin" : "");

    let avatar = document.createElement("span");

    avatar.className = "avatar" + (isAdmin ? " admin" : "");
    avatar.textContent = isAdmin
        ? "AD"
        : getComplaintInitials(message.sender);

    let stack = document.createElement("div");

    let bubble = document.createElement("div");

    bubble.className = "message-bubble";
    bubble.textContent = message.text;

    let meta = document.createElement("div");

    meta.className = "message-meta";

    meta.textContent =
        (isAdmin ? "You" : message.sender) +
        " · " + message.time;

    stack.appendChild(bubble);
    stack.appendChild(meta);

    row.appendChild(avatar);
    row.appendChild(stack);

    return row;
}

function sendReply() {

    let input =
        document.getElementById("replyText");

    let text = input.value.trim();

    if (!activeConversation) {

        alert("Select a conversation before replying.");

        return;
    }

    if (!text) {

        alert("Write a reply before sending.");

        return;
    }

    messageSequence++;

    MESSAGES.push({
        id: "MSG-" + String(messageSequence).padStart(3, "0"),
        complaintId: activeConversation,
        sender: "Administrator",
        role: "Administrator",
        text: text,
        time: "Just now"
    });

    input.value = "";

    renderThread();
    renderConversations();

}
