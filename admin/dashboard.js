const table = document.getElementById("messageTable");

// Load all messages
async function loadMessages() {
    try {
        const response = await fetch("http://localhost:5000/api/admin/messages");
        const messages = await response.json();

        table.innerHTML = "";

        messages.forEach(message => {

            const row = `
                <tr>
                    <td>${message.name}</td>
                    <td>${message.email}</td>
                    <td>${message.subject}</td>
                    <td>${new Date(message.createdAt).toLocaleDateString()}</td>

                    <td>
                        <button onclick="viewMessage('${message._id}')">View</button>
                        <button onclick="deleteMessage('${message._id}')">Delete</button>
                    </td>

                </tr>
            `;

            table.innerHTML += row;
        });

    } catch (error) {
        console.error(error);
    }
}

// View message
async function viewMessage(id) {

    const response = await fetch(`http://localhost:5000/api/admin/message/${id}`);

    const data = await response.json();

    document.getElementById("modalName").textContent = data.name;
    document.getElementById("modalEmail").textContent = data.email;
    document.getElementById("modalSubject").textContent = data.subject;
    document.getElementById("modalDate").textContent =
        new Date(data.createdAt).toLocaleString();
    document.getElementById("modalMessage").textContent = data.message;

    document.getElementById("replyBtn").onclick = () => {
        window.location.href =
            `mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}`;
    };

    document.getElementById("messageModal").style.display = "block";

    loadMessages();
}

// Delete message
async function deleteMessage(id) {

    if (!confirm("Delete this message?")) return;

    await fetch(`http://localhost:5000/api/admin/message/${id}`, {
        method: "DELETE"
    });

    loadMessages();
}

// Close modal
function closeModal() {
    document.getElementById("messageModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("messageModal");

    if (event.target === modal) {
        closeModal();
    }
};

// Load messages when page opens
loadMessages();