const verbfield = document.getElementById("verbcontainer");
const scrollbar = document.getElementById("scrollbar");


let offsetX, lastOffset = .5;

scrollbar.addEventListener('mousedown', (event) => {
    const windowWidth = window.innerWidth
    event.preventDefault();
    offsetX =  event.clientX / windowWidth - lastOffset;

  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

function handleMouseMove(event) {
    const windowWidth = window.innerWidth
    lastOffset = event.clientX / windowWidth - offsetX;
    verbfield.style.width = lastOffset * 100 + '%';
}

function handleMouseUp() {
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
}