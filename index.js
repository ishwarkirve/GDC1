loadEntries();
        document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const dateOfBirth = document.getElementById('date').value;
    const tac = document.getElementById('tac').checked;
    const resultTableBody = document.getElementById('result');

    if (!name || !email || !password || !dateOfBirth) {
        alert("All fields are mandatory."); // Display alert if any field is empty
        return; // Stop further execution
    }

    if (!email.includes('@')) {
        alert("Email must contain '@'.");
        return;
    }

    if (!validateAge(dateOfBirth)) {
            alert('Age must be between 18 and 55 years.');
            return; // Stop form submission
        }

    const entry = {
            name,
            email,
            password,
            dateOfBirth,
            tac
        };

        // Save to localStorage
        saveEntry(entry);

        // Append the new row to the table
        appendRow(entry);

        // Reset the form
        document.getElementById('myForm').reset();
    //this.reset(); // Reset the form fields
});

function validateAge(dob) {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Adjust age if the birthday hasn't occurred yet this year
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 18 && age <= 55;
    }

function saveEntry(entry) {
        // Get existing entries
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        // Add the new entry
        entries.push(entry);
        // Save back to localStorage
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach(entry => appendRow(entry));
    }

function appendRow(entry) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dateOfBirth}</td>
            <td>${entry.tac ? 'Yes' : 'No'}</td>
        `;
        document.getElementById('result').appendChild(newRow);
    }
// Function to display stored data
// function displayData() {
//     const dataDisplay = document.getElementById('dataDisplay');
//     const users = JSON.parse(localStorage.getItem('users')) || [];

//     dataDisplay.innerHTML = ''; // Clear existing data display
//     users.forEach((user, index) => {
//         dataDisplay.innerHTML += `
//         <p><strong>Name:</strong> ${document.getElementById('name').value}</p>
//         <p><strong>Email:</strong> ${document.getElementById('email').value}</p>
//         <p><strong>Password:</strong> ${ document.getElementById('pass').value}</p>
//         <p><strong>Date of Birth:</strong> ${document.getElementById('date').value}</p>
//         <p><strong>Accepted Terms:</strong> ${tac ? 'Yes' : 'No'}</p>
//     `;
//     });
// }

// Call displayData on initial load to show existing data
//displayData();
// To clear a specific item, e.g., 'users'
localStorage.removeItem('users');
