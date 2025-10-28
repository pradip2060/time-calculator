// Helper to format date for display
function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Get references
const startDateInput = document.getElementById('start-date-input');

function getStartDate() {
    const val = startDateInput.value;
    if (!val) return new Date(2022, 6, 13); // fallback
    const [year, month, day] = val.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function calculateElapsedTime() {
    const startDate = getStartDate();
    const now = new Date();

    // Update current date display
    document.getElementById('current-date').textContent = formatDate(now);

    // Calculate the difference in years, months, days, etc.
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    // Adjust for negative days (borrow from previous month)
    if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
    }

    // Adjust for negative months (borrow from previous year)
    if (months < 0) {
        years--;
        months += 12;
    }

    // Calculate time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Update the display
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    // Update timestamp
    document.getElementById('update-time').textContent = now.toLocaleTimeString();
}

// Remove auto update and change event
// startDateInput.removeEventListener('change', calculateElapsedTime);
// setInterval(calculateElapsedTime, 1000);

// Add button event
const calculateBtn = document.getElementById('calculate-btn');
calculateBtn.addEventListener('click', calculateElapsedTime);

// Initial calculation (optional: only if you want to show something at first load)
calculateElapsedTime();