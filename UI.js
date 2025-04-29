const startBtn = document.getElementById('start_btn');
const stopBtn = document.getElementById('stop_btn');
const blankScr = document.getElementById('blank_scr');
let stream;

startBtn.addEventListener('click', () => {
    blankScr.style.transition = 'opacity 0.5s ease'; 
    blankScr.style.opacity = 0;

    setTimeout(() => {
        blankScr.style.backgroundImage = 'none';
        blankScr.style.opacity = 1;

        const video = document.createElement('video');
        video.setAttribute('autoplay', true);
        video.setAttribute('playsinline', true);
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.objectFit = 'cover';

        blankScr.innerHTML = '';
        blankScr.appendChild(video);

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(mediaStream => {
                stream = mediaStream;
                video.srcObject = mediaStream;
            })
            .catch(err => {
                console.error("Error accessing camera: ", err);
            });
    }, 500);
});

stopBtn.addEventListener('click', () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    blankScr.innerHTML = '';
    blankScr.style.transition = 'none';
    blankScr.innerHTML = '<h1 style="color:white; text-align:center; font-size: 2vw;">Mission accomplished!<br>Entering to Chatbot Mode🚀</h1>';
    blankScr.style.background = 'black';
});
