document.addEventListener('DOMContentLoaded', () => {

    // Get references to all the important DOM elements
    const nameInput = document.getElementById('name-input');
    const numberInput = document.getElementById('number-input');
    const textInput = document.getElementById('text-input');
    const imageUpload = document.getElementById('image-upload');
    const downloadBtn = document.getElementById('download-btn');

    const posterName = document.getElementById('poster-name');
    const posterNumber = document.getElementById('poster-number');
    const posterText = document.getElementById('poster-text');
    const posterImage = document.getElementById('poster-image');
    const posterCanvas = document.getElementById('poster-canvas');

    // --- Event Listeners for Real-time Updates ---

    // Update Name
    nameInput.addEventListener('input', (e) => {
        posterName.textContent = e.target.value || 'Your Name Here';
    });

    // Update Number
    numberInput.addEventListener('input', (e) => {
        posterNumber.textContent = e.target.value || '#00';
    });

    // Update Main Text
    textInput.addEventListener('input', (e) => {
        posterText.textContent = e.target.value || 'Your main text will appear here...';
    });

    // Update Image
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                posterImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // --- Download Functionality ---
    downloadBtn.addEventListener('click', () => {
        // Use html2canvas to capture the poster element
        html2canvas(posterCanvas, {
            backgroundColor: null, // Ensures transparency is captured if any
            scale: 2 // Higher scale for better quality
        }).then(canvas => {
            // Convert the canvas to a data URL (image)
            const imgData = canvas.toDataURL('image/png');
            
            // Create a temporary link element to trigger the download
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'my-awesome-poster.png'; // The filename for the download
            
            // Programmatically click the link to start the download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });

});
