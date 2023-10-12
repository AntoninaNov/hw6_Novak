////////////////////////// Task 1 //////////////////////////
function generateDays() {
    const daysUl = document.querySelector('.buttons');
    const totalDays = 30; // September has 30 days

    const firstDay = 4;

    for (let i = 0; i < firstDay; i++) {
        const emptyBtn = document.createElement('button');
        emptyBtn.style.visibility = 'hidden';
        daysUl.appendChild(emptyBtn);
    }

    for (let i = 1; i <= totalDays + 1; i++) {
        const dayBtn = document.createElement('button');
        dayBtn.textContent = i;

        if (i > totalDays) {
            dayBtn.style.visibility = 'hidden';
        } else {
            dayBtn.className = 'btn btn-light';
        }

        daysUl.appendChild(dayBtn);
    }
}

generateDays();

function reverseString(str) {
    return str.split('').reverse().join('');
}

function handleInputChange() {
    const inputValue = document.getElementById("input").value;

    setTimeout(() => {
        const reversed = reverseString(inputValue);
        const span = document.getElementById("reversed");
        span.textContent = reversed;
    }, 1000);
}

document.getElementById("input").addEventListener("input", handleInputChange);

////////////////////////// Task 2 //////////////////////////
function fetchNasaData(date) {
    const currentDate = new Date().getDate();

    if (date > currentDate) {
        alert('You cannot go into the future');
        return;
    }

    const url = `https://api.nasa.gov/planetary/apod?api_key=4qklpFEzgbG1dE6TQxW7p8l29i3iYEUCQ1POjzha&date=2023-09-${String(date).padStart(2, '0')}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Problem with fetching URL');
            }
            return response.json();
        })
        .then(data => {
            const text = document.getElementById('explanation');
            const img = document.getElementById('image');
            const container = document.getElementById('task2'); // Grabbing the container

            img.src = data.url;
            text.textContent = data.explanation;
            container.style.display = 'block';  // Make the container visible
            if (data.url.includes('youtube.com') || data.url.includes('youtu.be')) {
                // It's a video
                img.style.display = 'none'; // Hide the image element
                video.src = data.url; // Set video source
                video.style.display = 'block'; // Display the video iframe
                text.textContent = data.explanation;
            }
        })
        .catch(error => {
            alert(error.message);
            document.getElementById('task2').style.display = 'none'; // Hide the container if there's an error
        })
        .finally(() => alert('Request completed'));
}

document.addEventListener("DOMContentLoaded", function() {
    const daysButtons = document.querySelectorAll('.buttons > button.btn'); // Target only Bootstrap-styled buttons
    daysButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            fetchNasaData(parseInt(btn.textContent, 10));
        });
    });
});


////////////////////////// Task 3 //////////////////////////
function fetchGitHubProfile(url, elementId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        const element = document.getElementById(elementId);
        if (this.status >= 200 && this.status < 300) {
            const data = JSON.parse(this.responseText);
            element.textContent = `User: ${data.login} - ${data.bio || "No bio available"}`;
        } else {
            element.textContent = 'There is no such user';
        }
    };

    xhr.onerror = function() {
        const element = document.getElementById(elementId);
        element.textContent = 'Error fetching data. Check the request URL or user profile.';
    };

    xhr.send();
}

function fetchValidGitHubProfile() {
    fetchGitHubProfile('https://api.github.com/users/AntoninaNov', 'githubValidResponse');
}

function fetchInvalidGitHubProfile() {
    fetchGitHubProfile('https://api.github.com/users/AntoinaNov', 'githubErrorResponse');
}