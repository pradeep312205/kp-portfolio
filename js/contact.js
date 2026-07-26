const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("https://kp-portfolio-backend.onrender.com/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                subject,
                message
            })
        });

        console.log("Status:", response.status);

        const text = await response.text();
        console.log("Response:", text);

        if (!response.ok) {
            alert("Server returned: " + response.status);
            return;
        }

        const data = JSON.parse(text);

        alert(data.message);
        contactForm.reset();

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
});
