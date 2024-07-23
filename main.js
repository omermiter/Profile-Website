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


// Smooth scrolling with drag effect
let isScrolling = false;
let startY;
let startScrollTop;
let animationId;

function smoothScroll(timestamp) {
    if (!isScrolling) return;

    const currentY = window.pageYOffset;
    const distance = startY - currentY;
    const speed = 0.1; // Adjust this value to change the drag effect (lower = more drag)

    window.scrollTo(0, startScrollTop - distance * speed);

    if (Math.abs(distance) > 1) {
        animationId = requestAnimationFrame(smoothScroll);
    } else {
        isScrolling = false;
    }
}

document.addEventListener('mousedown', (e) => {
    isScrolling = true;
    startY = e.pageY;
    startScrollTop = window.pageYOffset;
    cancelAnimationFrame(animationId);
});

document.addEventListener('mouseup', () => {
    isScrolling = false;
});

document.addEventListener('mousemove', (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    animationId = requestAnimationFrame(smoothScroll);
});

// Prevent default drag behavior on the project container
const projectContainer = document.querySelector('.project-container');
projectContainer.addEventListener('mousedown', (e) => {
    e.preventDefault();
});



// 3D Background Object
let scene, camera, renderer, sphere;

function createInterestingSphere() {
    const sphereGroup = new THREE.Group();

    // Create a basic sphere shape
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x800020, // The red color from your website
        shininess: 30,
        wireframe: false
    });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Distort the geometry to make it more interesting
    const positionAttribute = sphereGeometry.attributes.position;
    for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);

        const noise = new THREE.Vector3(
            Math.sin(y * 4 + x * 5) * 0.1,
            Math.sin(z * 4 + y * 5) * 0.1,
            Math.sin(x * 4 + z * 5) * 0.1
        );

        positionAttribute.setXYZ(
            i,
            x + noise.x,
            y + noise.y,
            z + noise.z
        );
    }

    sphereGeometry.computeVertexNormals();
    sphereGroup.add(sphereMesh);

    return sphereGroup;
}

function init3DBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('background-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    sphere = createInterestingSphere();
    scene.add(sphere);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    camera.position.z = 5;
    
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function onMouseMove(event) {
    if (!sphere) return;
    
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    sphere.rotation.x = mouseY * Math.PI / 3;
    sphere.rotation.y = mouseX * Math.PI / 3;
}

// Existing code (keep this part the same as in the previous example)
document.addEventListener('DOMContentLoaded', () => {
    // ... (keep all the code inside this event listener from the previous example)

    // Initialize 3D background
    init3DBackground();

    // ... (rest of the code)
});

// Event listeners
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});