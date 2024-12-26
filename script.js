document.getElementById('check-schedule').addEventListener('click', function () {
    const resetTime = document.getElementById('reset-time').value;
    const timeZone = document.getElementById('time-zone').value;

    if (!resetTime) {
        alert("Please enter a valid reset time.");
        return;
    }

    fetch(`https://tahmidr20.pythonanywhere.com/next_appearance?reset_time=${resetTime}&time_zone=${timeZone}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.next_appearance) {
                const appearanceTime = new Date(data.next_appearance);
                const formattedTime = appearanceTime.toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true
                });

                document.getElementById('next-appearance').innerHTML = `
                    <p class="appearance-time"><i class="fas fa-clock"></i> <strong>Next Appearance:</strong> ${formattedTime}</p>
                    <p class="appearance-location"><i class="fas fa-map-marker-alt"></i> <strong>Location:</strong> ${data.realm}</p>
                `;
            } else {
                document.getElementById('next-appearance').innerText = "Sorry, something went wrong.";
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('next-appearance').innerText = "Error failed to find schedule. Please try again.";
        });
});
