var slideIndex = 1;
showDivs(slideIndex);
function plusDivs(n) {showDivs(slideIndex += n);}//setas
function currentDiv(n) { showDivs(slideIndex = n);}//bolinhas
function showDivs(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1;}
    if (n < 1) {slideIndex = slides.length;}
    // Esconde todos os slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Remove a classe "active" de todos os pontos
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    // Mostra o slide atual e adiciona a classe "active" ao ponto correspondente
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}