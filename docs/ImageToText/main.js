const recognitionImageInputElement = document.querySelector('#recognition-image-input');
const recognitionConfidenceInputElement = document.querySelector('#recognition-confidence-input');
const recognitionProgressElement = document.querySelector('#recognition-progress');
const recognitionTextElement = document.querySelector('#recognition-text');

const originalImageElement = document.querySelector('#original-image');
const labeledImageElement = document.querySelector('#labeled-image');

recognitionImageInputElement.addEventListener('change', () => {
    if (!recognitionImageInputElement.files) {
      return null;
    }
   
    const file = recognitionImageInputElement.files[0];

    const res = Tesseract.recognize(file, {lang: 'eng'})
    console.log(res);
    /* .progress(({ progress, status }) => {
        if (!progress || !status || status !== 'recognizing text') {
            return null;
        }
    
        const p = (progress * 100).toFixed(2);
        
        recognitionProgressElement.textContent = `${status}: ${p}%`;
        recognitionProgressElement.value = p;
    })

    const paragraphsElements = res.paragraphs.map(({ text }) => {
        const p = document.createElement('p');
      
        p.textContent = text;
      
        return p;n 
    });
      
    recognitionTextElement.append(...paragraphsElements);*/
})


  