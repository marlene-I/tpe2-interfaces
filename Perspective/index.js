
const card = document.querySelector('.card');
const biggerCard = document.querySelector('.bigger-card');

const middleX = biggerCard.offsetWidth / 2;
const middleY = biggerCard.offsetHeight / 2;

function rotateElement(event, element) {
    const x = event.clientX;
    const y = event.clientY;

    // getting distance from current cursor position to middle of the container element
    const offsetX = (( x - middleX) / middleX ) * 45; 
    const offsetY = (( y - middleY) / middleY ) * 45; // 45 is the maximum angle that card will rotate

    // Set new rotation values
    element.style.setProperty("--rotateX", -offsetY + "deg")
    element.style.setProperty("--rotateY", offsetX + "deg")
}

biggerCard.addEventListener('mousemove', e => {
    rotateElement(e, card);
})

// Reset rotation values
biggerCard.addEventListener('mouseout', e =>  {
    element.style.setProperty("--rotateX", -offsetY + "deg")
    element.style.setProperty("--rotateY", offsetX + "deg")

})