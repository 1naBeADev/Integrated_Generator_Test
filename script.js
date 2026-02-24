// -------------------------
// Slideshow for main page
// -------------------------
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("flowslides");
  if (slides.length === 0) return;

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slides[slideIndex - 1].style.display = "flex";
}

// -------------------------
// Load generator dynamically
// -------------------------
fetch("generator/generator.html")
  .then(res => res.text())
  .then(html => {
    const genDiv = document.getElementById("genDiv");
    genDiv.innerHTML = html;

    // Initialize generator after it exists in DOM
    initGenerator();
  })
  .catch(err => console.error("Failed to load generator:", err));

// -------------------------
// Initialize generator
// -------------------------
function initGenerator() {
  const genDiv = document.getElementById("genDiv");
  if (!genDiv) return;

  let slideIndexGRD = 1;

  window.plusSlidesGRD = function(n) {
    const slides = document.getElementsByClassName("grd");
    if (slides.length === 0) return;

    slideIndexGRD += n;
    if (slideIndexGRD < 1) slideIndexGRD = slides.length;
    if (slideIndexGRD > slides.length) slideIndexGRD = 1;

    for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
    slides[slideIndexGRD - 1].style.display = "flex";
  };

  // Show first slide
  plusSlidesGRD(0);
  // Make genBtn available now that HTML is loaded
  let genBtn = document.getElementById("genResultDiv");
  if (!genBtn) return;

  // Make functions global so buttons in HTML can call them
  window.showgrd = function () {
    genBtn.style.display = "block";

    const getValue = id => document.getElementById(id)?.value || "";

    // CEP Notes
    const caseSFDC = getValue("sfdcCaseNum");
    const contactPerson = getValue("contactPerson");
    const contactNumber = getValue("contactNumber");
    const contactEmail = getValue("contactEmail");
    const concern = getValue("concernType");
    const workingPermit = getValue("workingPermit");
    const dateandTime = getValue("Availability");
    const cvResult = getValue("cvResult");
    const wocas = getValue("wocas");
    const sn = getValue("onuSN");
    const lightStatus = getValue("lightStatus");
    const flm = getValue("flm");
    const remarks = getValue("addRemarks");
    const ani = getValue("ani");
    const billingNum = getValue("BillingNum");

    const cepNoteta = document.getElementById("cepNoteta");
    if (cepNoteta) {
      cepNoteta.value =
`SFDC ${caseSFDC}
Contact Person ${contactPerson}
Contact Number ${contactNumber}
Contact Email ${contactEmail}
Concern ${concern}
Working Permit ${workingPermit}
Availability Date and Time ${dateandTime}
CV Test Results ${cvResult}
WOCAS ${wocas}
Serial Number ${sn}
Light Status ${lightStatus}
Troubleshooting ${flm}
Remarks ${remarks}`;
      navigator.clipboard.writeText(cepNoteta.value);
    }

    const specialInsta = document.getElementById("specialInsta");
    if (specialInsta) {
      specialInsta.value =
`Contact Person ${contactPerson}
Contact Number ${contactNumber}
Contact Email ${contactEmail}
Working Permit ${workingPermit}
Availability Date and Time ${dateandTime}`;
      navigator.clipboard.writeText(specialInsta.value);
    }

    const abcata = document.getElementById("abcata");
    if (abcata) {
      abcata.value =
`ANI ${ani}
Billing Account Number ${contactNumber}
Concern ${concern}
Action ${remarks}`;
      navigator.clipboard.writeText(abcata.value);
    }

    window.reset = function() {
    const genDiv = document.getElementById("genResultDiv");
    if (genDiv) genDiv.style.display = "none";

    // Reset all form fields
    const form = document.querySelector("form");
    if (form) form.reset();

    // Reset generator slideshow
    if (typeof plusSlidesGRD === "function") plusSlidesGRD(-slideIndexGRD + 1); // go back to first slide
};

}
  };
