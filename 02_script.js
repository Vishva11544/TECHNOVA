/* ================= MODAL SECTION ================= */

function openModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeModal(id) {
    const modal = document.getElementById(`modal-${id}`);
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal-overlay")) {
        e.target.classList.remove("active");
        document.body.style.overflow = "";
    }
});


/* ================= TEAM SECTION ================= */

/*================ TEAM SECTION ================*/

const teamMembers = [
    {
        name: "Aarav Sharma",
        role: "Frontend Developer",
        img: "07_boy.png",
        linkedin: "https://www.linkedin.com/",
        github: "https://github.com/"
    },
    {
        name: "Riya Patel",
        role: "AI Developer",
        img: "08_girl.png",
        linkedin: "https://www.linkedin.com/",
        github: "https://github.com/"
    },
    {
        name: "Dev Mehta",
        role: "Backend Developer",
        img: "07_boy.png",
        linkedin: "https://www.linkedin.com/",
        github: "https://github.com/"
    },
    {
        name: "Ananya Shah",
        role: "UI/UX Designer",
        img: "08_girl.png",
        linkedin: "https://www.linkedin.com/",
        github: "https://github.com/"
    },
    {
        name: "Karan Joshi",
        role: "Project Developer",
        img: "07_boy.png",
        linkedin: "https://www.linkedin.com/",
        github: "https://github.com/"
    }
];

let currentIndex = 0;

function showMember(index) {
    const image = document.getElementById("memberImage");

    const memberName = document.getElementById("memberName");
    const memberRole = document.getElementById("memberRole");
    const memberLinkedIn = document.getElementById("memberLinkedIn");
    const memberGithub = document.getElementById("memberGithub");

    image.style.opacity = "0";
    memberName.style.opacity = "0";
    memberRole.style.opacity = "0";

    setTimeout(() => {
        image.src = teamMembers[index].img;
        memberName.innerHTML = teamMembers[index].name;
        memberRole.innerHTML = teamMembers[index].role;
        memberLinkedIn.href = teamMembers[index].linkedin;
        memberGithub.href = teamMembers[index].github;

        image.style.opacity = "1";
        memberName.style.opacity = "1";
        memberRole.style.opacity = "1";
    }, 250);
}

function nextMember() {
    currentIndex++;
    if (currentIndex >= teamMembers.length) currentIndex = 0;
    showMember(currentIndex);
}

function prevMember() {
    currentIndex--;
    if (currentIndex < 0) currentIndex = teamMembers.length - 1;
    showMember(currentIndex);
}

showMember(currentIndex);

/* ================= HAMBURGER ================= */

function toggleMenu() {
    const menu = document.getElementById("navLinks");
    menu.classList.toggle("active");
}

const navLinks = document.querySelectorAll("#navLinks a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
        document.getElementById("navLinks").classList.remove("active");
    });
});


/* ================= CHATBOT ================= */

function toggleChatbot() {
    const bot = document.getElementById("chatbot");
    const isOpen = bot.style.display === "flex";
    bot.style.display = isOpen ? "none" : "flex";

    if (!isOpen) {
        const chat = document.getElementById("chatMessages");
        if (chat.children.length === 0) {
            appendBotMessage("👋 Hi! I'm TECHNOVA AI. Ask me anything about this website or technology!");
        }
        setTimeout(() => document.getElementById("chatInput").focus(), 100);
    }
}

function appendBotMessage(text) {
    const chat = document.getElementById("chatMessages");
    const bot = document.createElement("div");
    bot.className = "bot-message";
    bot.innerText = text;
    chat.appendChild(bot);
    chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
}

function appendUserMessage(text) {
    const chat = document.getElementById("chatMessages");
    const user = document.createElement("div");
    user.className = "user-message";
    user.innerText = text;
    chat.appendChild(user);
    chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
}

function showTypingIndicator() {
    const chat = document.getElementById("chatMessages");
    const typing = document.createElement("div");
    typing.className = "bot-message typing-indicator";
    typing.id = "typingIndicator";
    typing.innerHTML = `<span></span><span></span><span></span>`;
    chat.appendChild(typing);
    chat.scrollTo({ top: chat.scrollHeight, behavior: "smooth" });
}

function removeTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    if (indicator) indicator.remove();
}

async function sendMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    if (!message) return;

    appendUserMessage(message);
    input.value = "";
    showTypingIndicator();

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        removeTypingIndicator();
        appendBotMessage(data.reply);

    } catch (error) {
        removeTypingIndicator();
        appendBotMessage("⚠️ Cannot connect to AI server. Make sure 04_app.py is running.");
        console.error("Chatbot error:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("chatInput");
    if (input) {
        input.addEventListener("keypress", function (e) {
            if (e.key === "Enter") sendMessage();
        });
    }
});
