const dirt = document.querySelectorAll('.dirt');
const mole = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const pop = document.querySelector('#pop');

let dirtBefore;
let finish;
let score;

function randomDirt(dirt) {
    const dirts = Math.floor(Math.random() * dirt.length);
    const rDirt = dirt[dirts];
    if(rDirt == dirtBefore) {
        randomDirt(dirt)
    }
    dirtBefore = rDirt
    return rDirt;
}

function randomTime(min, max) {
    // rumus menentukan angka random dari berapa sampai berapa
    return Math.round(Math.random() * (max - min) + min)
}

function moleAppear() {
    const rDirt = randomDirt(dirt)
    const rTime = randomTime(500, 1250)
    rDirt.classList.add('appeared')
    setTimeout(() => {
        rDirt.classList.remove('appeared')
        if(!finish){
            moleAppear();
        }
    }, rTime);
}

function play() {
    finish = false;
    score = 0;
    scoreBoard.textContent = 0;
    moleAppear()
    setTimeout(() => {
    finish = true;       
    }, 10000);
}

function punch() {
    score++
    pop.play();
    scoreBoard.textContent = score;

}

mole.forEach(m => {
    m.addEventListener('click', function() {
        const parentDirt = this.parentElement;
        // Memastikan hanya mole yang muncul (dan memiliki appear) yang bisa di-klik
        if (parentDirt.classList.contains('appeared')) {
            console.log(this);

            parentDirt.classList.remove('appeared'); // Hapus class appear setelah diklik agar mole tidak bisa di klik 2x karena yang hanya terdeteksi yang mempunyai appear sdgkan di fungsi ini appear dihilangkan
            punch(); // Panggil fungsi p
        }
    });
});
