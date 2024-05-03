const input = document.getElementsByClassName("input")[0];
const hangmanParts = document.querySelectorAll(".item");
const popup = document.querySelector(".popup");
const success = document.querySelector(".success");
const againButton = document.querySelector(".again");
const wrongs = document.querySelector("#wrongs");
let gameEnded = false;
let pressedKey;
const correctLetters = [];
const wrongLetters = [];

//tahmin edilecek kelime random şekilde seçilir
const getRandomWord = () => {
    const words = ["java","python"]
    return words[Math.floor(Math.random()* words.length)]
}

let selectedWord = getRandomWord();


//doğru harflerin ekranda gösterimini sağlar.
const display = () => {
    input.innerHTML = `
        ${selectedWord.split('').map(letter => `
            <div class="letter">
                ${correctLetters.includes(letter) ? letter : ' '}
            </div>
        `).join('')}
    `;
    const w = input.innerText.replace(/\n/g,'');
    if (w === selectedWord) {
        popup.style.display = "flex";
        success.innerText = "Kazandınız";
        againButton.addEventListener("click", isAgainClicked); // isAgainClicked() şeklinde çağrılırsa return değer bekler.
    }else{
        againButton.addEventListener("click", isAgainClicked);
    }   
}

// hatalı kelimeleri ekranda gösterir.
const showWrongLetters = () => {
    const showWrong = wrongLetters.join(',');
    wrongs.innerText = showWrong;
}

// hangman'in partlarını gösterir.
const showHangman = () => {
    hangmanParts.forEach((item,index) =>{
        const error = wrongLetters.length;
        if (index < error){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }
    })
}

// tekrar oynaya basılırsa eventine karşılık gelen fonksiyon.
const isAgainClicked = () =>{
    correctLetters.splice(0,correctLetters.length);
    wrongLetters.splice(0,wrongLetters.length);
    pressedKey = null;
    selectedWord = getRandomWord();
    popup.style.display = "none";
    wrongs.innerText ="";
    display();
    hangmanParts.forEach(item => {
        item.style.display = "none";
    });
    gameEnded = false;
}

//klavye inputlarını dinler.
window.addEventListener("keydown", (e) =>{
    if(!gameEnded && e.keyCode >= 65 && e.keyCode <= 95){
        pressedKey = e.key;
        
        if(selectedWord.includes(pressedKey)) {
            if(!correctLetters.includes(pressedKey)){
                correctLetters.push(pressedKey);
                console.log(correctLetters);
                display();
            }
            else{
                console.log("bu harf zaten var");
            }
        }else{
            if(!wrongLetters.includes(pressedKey)){
                wrongLetters.push(pressedKey);
                console.log("bu harf kelimede yok");
                
                if(wrongLetters.length == hangmanParts.length){
                    popup.style.display = "flex";
                    success.innerText = "Kaybettiniz";
                    gameEnded = true;
                    display();
                } 
                showWrongLetters();
                showHangman();
            }
        }
    }
});

display();