'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClsModal = document.querySelector('.close-modal');

const btnShwModal = document.querySelectorAll('.show-modal');
// the function gives bakc the nodeList of our showmodal buttons..

for (let i = 0; i < btnShwModal.length; i++)
    btnShwModal[i].addEventListener('click', () => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
    })

// since both the functions btn X oand overlay clicking takes the same fucntion, we can implement DRY.....
const hide = () => { 
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
// this ensures that the readabilty of the code and Dry principle tooo    
// upon clicking on the x symbol the modal closes.
btnClsModal.addEventListener('click',hide)

// simlarly people like to close the modal upon clicking on overlay too.. so
overlay.addEventListener('click',hide)

// simlarly people do often use ESC key to close the modal opens
document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape' && !modal.classList.contains('hidden')) hide();
})