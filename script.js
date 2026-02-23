let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("flowslides");
  
  if (n > slides.length){
      slideIndex = 1
    }

  if (n < 1){
      slideIndex = slides.length
    }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "flex";
}

fetch("generator/generator.html")
  .then(response => response.text())
  .then(html => {
    document.getElementById("genDiv").innerHTML = html;
  })
  .catch(err => console.error("Failed to load generator:", err));