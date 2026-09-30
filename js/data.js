/* KGF ADMIN - DATA */

/* TRANSACTION REQUESTS DATA */

const REQUESTS = [
    {
        id: "REQ-001",
        investorId: "INV-1003",
        investorName: "Hari KC",
        type: "Withdrawal",
        amount: 100000,
        method: "Bank Transfer",
        date: "25 Aug 2026",
        status: "Pending"
    },
    {
        id: "REQ-002",
        investorId: "INV-1002",
        investorName: "Sita Thapa",
        type: "Investment",
        amount: 300000,
        method: "eSewa",
        date: "25 Aug 2026",
        status: "Pending"
    },
    {
        id: "REQ-003",
        investorId: "INV-1001",
        investorName: "Ram Sharma",
        type: "Investment",
        amount: 500000,
        method: "Bank Transfer",
        date: "24 Aug 2026",
        status: "Approved"
    },
    {
        id: "REQ-004",
        investorId: "INV-1012",
        investorName: "Bikash Adhikari",
        type: "Withdrawal",
        amount: 150000,
        method: "ConnectIPS",
        date: "24 Aug 2026",
        status: "Rejected"
    },
    {
        id: "REQ-005",
        investorId: "INV-1002",
        investorName: "Sita Thapa",
        type: "Dividend",
        amount: 42000,
        method: "Bank Transfer",
        date: "23 Aug 2026",
        status: "Approved"
    },
    {
        id: "REQ-006",
        investorId: "INV-1021",
        investorName: "Rajesh Lama",
        type: "Investment",
        amount: 275000,
        method: "Khalti",
        date: "23 Aug 2026",
        status: "Approved"
    },
    {
        id: "REQ-007",
        investorId: "INV-1026",
        investorName: "Sunita Rai",
        type: "Transfer",
        amount: 90000,
        method: "Internal",
        date: "22 Aug 2026",
        status: "Pending"
    }
];

const ALLOCATION = [
    { name: "Equity Shares", pct: 42, color: "#2563eb" },
    { name: "Fixed Deposits", pct: 26, color: "#10b981" },
    { name: "Mutual Funds", pct: 18, color: "#8b5cf6" },
    { name: "Bonds", pct: 9, color: "#f59e0b" },
    { name: "Cash Reserve", pct: 5, color: "#06b6d4" }
];

const GROWTH = [
    { month: "Oct", value: 48.2 },
    { month: "Nov", value: 52.6 },
    { month: "Dec", value: 55.1 },
    { month: "Jan", value: 58.9 },
    { month: "Feb", value: 61.4 },
    { month: "Mar", value: 65.8 },
    { month: "Apr", value: 69.3 },
    { month: "May", value: 72.7 },
    { month: "Jun", value: 76.4 },
    { month: "Jul", value: 79.1 },
    { month: "Aug", value: 81.6 },
    { month: "Sep", value: 84.2 }
];


/* COMPLAINTS DATA */

const COMPLAINTS = [
    {
        id: "COMP-001",
        issue: "Payment verification issue",
        investorId: "INV-1004",
        investorName: "Gita Maharjan",
        category: "Payment",
        priority: "High",
        status: "Open",
        date: "25 Aug 2026",
        detail: "I transferred NRs 250,000 yesterday but the status still shows unverified. Please check the payment reference."
    },
    {
        id: "COMP-002",
        issue: "Withdrawal delay",
        investorId: "INV-1012",
        investorName: "Bikash Adhikari",
        category: "Withdrawal",
        priority: "High",
        status: "In Progress",
        date: "25 Aug 2026",
        detail: "My withdrawal request has been under review for six days with no update. I need the funds released."
    },
    {
        id: "COMP-003",
        issue: "Account information update",
        investorId: "INV-1018",
        investorName: "Anita Gurung",
        category: "Account",
        priority: "Low",
        status: "Resolved",
        date: "24 Aug 2026",
        detail: "I changed my phone number and address but the old details still appear on my statement."
    },
    {
        id: "COMP-004",
        issue: "Interest credited incorrectly",
        investorId: "INV-1021",
        investorName: "Rajesh Lama",
        category: "Payment",
        priority: "Medium",
        status: "Open",
        date: "24 Aug 2026",
        detail: "The quarterly interest credited is lower than the rate mentioned in my agreement."
    },
    {
        id: "COMP-005",
        issue: "Cannot download statement",
        investorId: "INV-1026",
        investorName: "Sunita Rai",
        category: "Technical",
        priority: "Medium",
        status: "In Progress",
        date: "23 Aug 2026",
        detail: "The download button on the statement page shows an error every time I try it."
    },
    {
        id: "COMP-006",
        issue: "Duplicate transaction entry",
        investorId: "INV-1030",
        investorName: "Nabin Karki",
        category: "Transaction",
        priority: "Low",
        status: "Resolved",
        date: "22 Aug 2026",
        detail: "The same deposit appears twice in my transaction history for the same day."
    }
];


/* MESSAGES DATA */

const MESSAGES = [
    {
        id: "MSG-001",
        complaintId: "COMP-001",
        sender: "Gita Maharjan",
        role: "Investor",
        text: "I transferred the amount yesterday but it still shows unverified.",
        time: "25 Aug 2026 10:30 AM"
    },
    {
        id: "MSG-002",
        complaintId: "COMP-001",
        sender: "Administrator",
        role: "Administrator",
        text: "Thanks for reporting this. We are checking the payment reference with our finance team.",
        time: "25 Aug 2026 11:00 AM"
    },
    {
        id: "MSG-003",
        complaintId: "COMP-001",
        sender: "Gita Maharjan",
        role: "Investor",
        text: "Thank you. Please update me as soon as it is verified.",
        time: "25 Aug 2026 11:20 AM"
    },
    {
        id: "MSG-004",
        complaintId: "COMP-002",
        sender: "Bikash Adhikari",
        role: "Investor",
        text: "My withdrawal is still pending after six days.",
        time: "25 Aug 2026 12:15 PM"
    },
    {
        id: "MSG-005",
        complaintId: "COMP-002",
        sender: "Administrator",
        role: "Administrator",
        text: "We have raised the request to the settlement desk. You will get an update within 24 hours.",
        time: "25 Aug 2026 01:05 PM"
    },
    {
        id: "MSG-006",
        complaintId: "COMP-003",
        sender: "Anita Gurung",
        role: "Investor",
        text: "My new phone number is not showing on the statement.",
        time: "24 Aug 2026 09:20 AM"
    },
    {
        id: "MSG-007",
        complaintId: "COMP-003",
        sender: "Administrator",
        role: "Administrator",
        text: "Your profile has been updated. The new statement will reflect the change.",
        time: "24 Aug 2026 02:40 PM"
    },
    {
        id: "MSG-008",
        complaintId: "COMP-004",
        sender: "Rajesh Lama",
        role: "Investor",
        text: "The interest credited this quarter is lower than my agreed rate.",
        time: "24 Aug 2026 03:10 PM"
    },
    {
        id: "MSG-009",
        complaintId: "COMP-005",
        sender: "Sunita Rai",
        role: "Investor",
        text: "The statement download button shows an error every time.",
        time: "23 Aug 2026 04:25 PM"
    },
    {
        id: "MSG-010",
        complaintId: "COMP-006",
        sender: "Nabin Karki",
        role: "Investor",
        text: "The same deposit appears twice in my history.",
        time: "22 Aug 2026 08:50 AM"
    }
];
