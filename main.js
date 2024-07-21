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


