const x = document.querySelector(".twitter");

x.onclick = ()=>{
    window.open("https://x.com/Omermitran", "_blank");
};

const github = document.querySelector(".github");

github.onclick = () => {
    window.open("https://github.com/omermiter", "_blank");
}


// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 2000); // Adjust the time (in milliseconds) as needed
});


// Custom Cursor
// Custom Cursor
if (window.innerWidth >= 1024) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('hover'));
    document.addEventListener('mouseup', () => cursor.classList.remove('hover'));

    const hoverElements = document.querySelectorAll('a, button, input[type="submit"], .project-container');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            element.style.cursor = 'none';
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            element.style.cursor = 'none';
        });
    });
}