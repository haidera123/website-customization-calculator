let step = 0;
let total = 1297;
function calculate(ele, isCalculate = true) {
  ele.style.background = `linear-gradient(to right, #ff00ff 0%, #ff00ff ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #545454 ${
    ((ele.value - ele.min) / (ele.max - ele.min)) * 100
  }%, #545454 100%)`;

  if (isCalculate) addToTotal();
}
const section = [
  "section1",
  "section2",
  "section3",
  "section4",
  "section5",
  "section6",
];

function calculateTotal() {}
const sliderData = {
  ecommerce: [0, 750, 3500, 6500, 10000],
  training: [0, 0, 197, 394, 591],
  logo: [0, 250, 500, 1500],
  printMarketing: [0, 350, 700, 2000],
};
function addToTotal() {
  try {
    total = 0;
    let pageTotal = [0, 0, 0, 0, 0];

    let ecommerce = document.getElementById("ecommerce");
    let training = document.getElementById("training");
    let logo = document.getElementById("logo");
    let printMarketing = document.getElementById("printMarketing");
    let copywritePerPage = document.getElementById("copywritePerPage");
    let contentCreationPerPiece = document.getElementById(
      "contentCreationPerPiece"
    );
    let copyrightperbundle =
      document.getElementById("copyrightperbundle").checked;
    let contentCreationPerBundle = document.getElementById(
      "contentCreationPerBundle"
    ).checked;
    let discount = 1;
    let isDiscounted = document.getElementById("switchDiscount").checked;
    if (isDiscounted) {
      discount = 0.8;
    }
    document.querySelectorAll(".switch-input").forEach((opt) => {
      if (opt.checked) {
        pageTotal[opt.dataset.page - 1] += opt.value * 1;
        total += opt.value * 1;
      }
    });
    if (copywritePerPage.value) {
      if (!copyrightperbundle) {
        total += copywritePerPage.value * 150;
        pageTotal[copywritePerPage.dataset.page - 1] +=
          copywritePerPage.value * 150;
      } else {
        copywritePerPage.value = "";
      }
    }
    if (contentCreationPerPiece.value) {
      if (!contentCreationPerBundle) {
        pageTotal[copywritePerPage.dataset.page - 1] +=
          contentCreationPerPiece.value * 50;
        total += contentCreationPerPiece.value * 50;
      } else {
        contentCreationPerPiece.value = "";
      }
    }
    // If either of bundled training session is check, set the slider to zero
    let sessionRadioBtn_x5 = document.getElementById(
      "bundledTrainingSeesion_x5"
    ).checked;
    let sessionRadioBtn_x800 = document.getElementById(
      "bundledTrainingSeesion_x800"
    ).checked;
    if (sessionRadioBtn_x5 || sessionRadioBtn_x800) {
      document.getElementById("training").value = 0;
      calculate(document.getElementById("training"), false);
    }
    total += sliderData["ecommerce"][ecommerce.value * 1];
    total += sliderData["training"][training.value * 1];
    total += sliderData["logo"][logo.value * 1];
    total += sliderData["printMarketing"][printMarketing.value * 1];

    pageTotal[ecommerce.dataset.page - 1] +=
      sliderData["ecommerce"][ecommerce.value * 1];
    pageTotal[training.dataset.page - 1] +=
      sliderData["training"][training.value * 1];
    pageTotal[logo.dataset.page - 1] += sliderData["logo"][logo.value * 1];
    pageTotal[printMarketing.dataset.page - 1] +=
      sliderData["printMarketing"][printMarketing.value * 1];
    console.log(pageTotal);
    if (step <= 4)
      document.getElementById("pageTotal").innerHTML = formatCurrency(
        pageTotal[step]
      );
    document.getElementById("total").innerHTML = formatCurrency(total);
    document.getElementById("summary__total").innerHTML = formatCurrency(total);
    document.getElementById("summary__total--was").innerHTML = formatCurrency(
      total * 1.18
    );
    document.getElementById("new__estimate").innerHTML = formatCurrency(
      total * discount
    );
  } catch (err) {
    console.log(err);
  }
}
function applyDiscount() {
  let discount = 1;
  let isDiscounted = document.getElementById("switchDiscount").checked;
  if (isDiscounted) {
    discount = 0.8;
  }
  document.getElementById("new__estimate").innerHTML = formatCurrency(
    total * discount
  );
}
function checkController() {
  if (step == 0) {
    document.getElementById("btn__back").style.visibility = "hidden";
  } else {
    document.getElementById("btn__back").style.visibility = "visible";
  }
  if (step == 5) {
    document.getElementById("controller__container").style.display = "none";
  } else {
    document.getElementById("controller__container").style.display = "block";
  }
}
function next() {
  step++;
  hideAll();
  checkController();
  if (step > 4) {
    step = 5;
    document.getElementById(section[5]).style.display = "block";
    return;
  }

  document.getElementById(section[step]).style.display = "block";
  addToTotal();
}

function previous() {
  step--;
  checkController();
  if (step < 0) {
    step = 0;
    return;
  }
  hideAll();
  document.getElementById(section[step]).style.display = "block";
  addToTotal();
}
function current() {
  hideAll();
  document.getElementById(section[step]).style.display = "block";
}

function hideAll() {
  section.forEach((sec) => {
    document.querySelector(`#${sec}`).style.display = "none";
  });
}
function formatCurrency(number) {
  return (
    "$" +
    number.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}
function displayForm() {
  document.getElementById("section6").style.display = "none";
  document.getElementById("email__form").style.display = "block";
}

(() => {
  document.querySelectorAll(".switch-input").forEach((ele) => {
    ele.addEventListener("change", addToTotal);
  });
  document.querySelectorAll(".input__calc").forEach((ele) => {
    ele.addEventListener("change", () => {
      addToTotal();
    });
  });
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-te-toggle="tooltip"]')
  );
  tooltipTriggerList.map(
    (tooltipTriggerEl) => new te.Tooltip(tooltipTriggerEl)
  );
  document
    .querySelectorAll("input[type=radio][name=seomonthly]")
    .forEach((elem) => {
      elem.addEventListener("click", allowUncheck);
      // only needed if elem can be pre-checked
      elem.previous = elem.checked;
    });

  function allowUncheck(e) {
    if (this.previous) {
      this.checked = false;
    }
    // need to update previous on all elements of this group
    // (either that or store the id of the checked element)
    document
      .querySelectorAll(`input[type=radio][name=${this.name}]`)
      .forEach((elem) => {
        elem.previous = elem.checked;
      });
    addToTotal();
  }
  checkController();
  current();
})();
function returnHTML() {
  let noOfProducts = ["0", "1-10", "11-30", "31-50", "51-100"];
  let noOfSessions = ["0", "Free", "2", "3", "4"];
  let complexity = ["No Need", "Simple", "Pro", "Legacy"];
  let noOfPieces = ["No Need", "1-5", "6-10", "UNLIMITED"];
  let html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <table
      style="
        border-collapse: collapse;
        border: 1px solid #ddd;
        width: 80%;
        margin: 0 auto;
      "
    >
      <tr
        style="
          padding: 10px;
          background-color: #ddd;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
        "
      >
        <th style="font-size: 17px;text-align:left">Label</th>
        <th style="font-size: 17px">Value</th>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Landing Page</td>
        <td style="font-size: 17px">${
          document.getElementById("landing__page").checked
            ? formatCurrency(document.getElementById("landing__page").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Services</td>
        <td style="font-size: 17px">${
          document.getElementById("service").checked
            ? formatCurrency(document.getElementById("service").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">About Us</td>
        <td style="font-size: 17px">${
          document.getElementById("aboutUs").checked
            ? formatCurrency(document.getElementById("aboutUs").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Features</td>
        <td style="font-size: 17px">${
          document.getElementById("features").checked
            ? formatCurrency(document.getElementById("features").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">How it Works</td>
        <td style="font-size: 17px">${
          document.getElementById("howItWork").checked
            ? formatCurrency(document.getElementById("howItWork").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Why Us</td>
        <td style="font-size: 17px">${
          document.getElementById("whyUs").checked
            ? formatCurrency(document.getElementById("whyUs").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Contact Us</td>
        <td style="font-size: 17px">${
          document.getElementById("contactUs").checked
            ? formatCurrency(document.getElementById("contactUs").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Video Page</td>
        <td style="font-size: 17px">${
          document.getElementById("videoPage").checked
            ? formatCurrency(document.getElementById("videoPage").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Reviews</td>
        <td style="font-size: 17px">${
          document.getElementById("reviews").checked
            ? formatCurrency(document.getElementById("reviews").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Portfolio</td>
        <td style="font-size: 17px">${
          document.getElementById("portfolio").checked
            ? formatCurrency(document.getElementById("portfolio").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Testimonials</td>
        <td style="font-size: 17px">${
          document.getElementById("testimonials").checked
            ? formatCurrency(document.getElementById("testimonials").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Partner/Affiliates</td>
        <td style="font-size: 17px">${
          document.getElementById("partnerAffiliate").checked
            ? formatCurrency(document.getElementById("partnerAffiliate").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Terms & Conditions</td>
        <td style="font-size: 17px">${
          document.getElementById("termsAndCondition").checked
            ? formatCurrency(document.getElementById("termsAndCondition").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #ddd;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         text-align:center
        "
      >
        <td style="font-size: 17px" colspan="2">Professional Services</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Booking</td>
        <td style="font-size: 17px">${
          document.getElementById("booking").checked
            ? formatCurrency(document.getElementById("booking").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Blog</td>
        <td style="font-size: 17px">${
          document.getElementById("blog").checked
            ? formatCurrency(document.getElementById("blog").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Point of Sale</td>
        <td style="font-size: 17px">${
          document.getElementById("pointOfSale").checked
            ? formatCurrency(document.getElementById("pointOfSale").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Accept Payments</td>
        <td style="font-size: 17px">${
          document.getElementById("acceptPayments").checked
            ? formatCurrency(document.getElementById("acceptPayments").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Event Creation</td>
        <td style="font-size: 17px">${
          document.getElementById("eventCreation").checked
            ? formatCurrency(document.getElementById("eventCreation").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Staffing</td>
        <td style="font-size: 17px">${
          document.getElementById("staffing").checked
            ? formatCurrency(document.getElementById("staffing").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Reservations</td>
        <td style="font-size: 17px">${
          document.getElementById("reservation").checked
            ? formatCurrency(document.getElementById("reservation").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Accept Payments</td>
        <td style="font-size: 17px">${
          document.getElementById("landing__page").checked
            ? formatCurrency(document.getElementById("landing__page").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #ddd;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         text-align:center
        "
      >
        <td style="font-size: 17px" colspan="2">Website Content</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Copywriting (Per page)</td>
        <td style="font-size: 17px">${
          document.getElementById("copywritePerPage").value
        } at $150/page (avg.)</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Copywriting (Bundle)</td>
        <td style="font-size: 17px">${
          document.getElementById("copyrightperbundle").checked
            ? formatCurrency(
                document.getElementById("copyrightperbundle").value
              )
            : "$0.00"
        } at $350</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Content Creation (Per piece)</td>
        <td style="font-size: 17px">${
          document.getElementById("contentCreationPerPiece").value
        } at $50/piece (avg.)</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Content Creation (Bundle)</td>
        <td style="font-size: 17px">${
          document.getElementById("contentCreationPerBundle").checked
            ? formatCurrency(
                document.getElementById("contentCreationPerBundle").value
              )
            : "$0.00"
        } at $350</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #ddd;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         text-align:center
        "
      >
        <td style="font-size: 17px" colspan="2">Advanced</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          text-align:center
        "
      >
        <td style="font-size: 17px" colspan = '2'>Ecommerce</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Number of Products</td>
        <td style="font-size: 17px">${
          noOfProducts[document.getElementById("ecommerce").value]
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         text-align:center;
        "
      >
        <td style="font-size: 17px" colspan = "2">Personalized Training x $197 / Session</td>
      </tr>
   
      <tr
      style="
        padding: 10px;
        background-color: #fff;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
       
      "
    >
      <td style="font-size: 17px;text-align:left">Number of Sessions</td>
      <td style="font-size: 17px">${
        noOfSessions[document.getElementById("training").value]
      }</td>
    </tr>
        <td style="font-size: 17px;text-align:left">Bundled Training x 5 at $500</td>
        <td style="font-size: 17px">${
          document.getElementById("bundledTrainingSeesion_x5").checked
            ? formatCurrency(
                document.getElementById("bundledTrainingSeesion_x5").value
              )
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Bundled Training x 10 at $800</td>
        <td style="font-size: 17px">${
          document.getElementById("bundledTrainingSeesion_x800").checked
            ? formatCurrency(
                document.getElementById("bundledTrainingSeesion_x800").value
              )
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #ddd;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         text-align:center
        "
      >
        <td style="font-size: 17px" colspan="2">Extras</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          text-align:center
        "
      >
        <td style="font-size: 17px" colspan="2">Logo</td>
      
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Complexity</td>
        <td style="font-size: 17px">${
          complexity[document.getElementById("logo").value]
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Monthly Basi SEO x $350</td>
        <td style="font-size: 17px">${
          document.getElementById("monthlyBasisx$350").checked
            ? formatCurrency(document.getElementById("monthlyBasisx$350").value)
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Monthly Pro SEO x $500</td>
        <td style="font-size: 17px">${
          document.getElementById("monthlyProSEOX$500").checked
            ? formatCurrency(
                document.getElementById("monthlyProSEOX$500").value
              )
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Monthly Legacy SEO x $1000</td>
        <td style="font-size: 17px">${
          document.getElementById("monthlyLegacyseo$1000").checked
            ? formatCurrency(
                document.getElementById("monthlyLegacyseo$1000").value
              )
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Monthly Maintenance x $350</td>
        <td style="font-size: 17px">${
          document.getElementById("monthlyMaintenancex$350").checked
            ? formatCurrency(
                document.getElementById("monthlyMaintenancex$350").value
              )
            : "$0.00"
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          text-align:center
        "
      >
        <td style="font-size: 17px" colspan="2">Print Marketing</td>
      
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left"># of pieces</td>
        <td style="font-size: 17px">${
          noOfPieces[document.getElementById("printMarketing").value]
        }</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #ddd;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         text-align:center
        "
      >
        <td style="font-size: 17px" colspan="2">Summary</td>
      </tr>
      <tr
        style="
          padding: 10px;
          background-color: #fff;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
         
        "
      >
        <td style="font-size: 17px;text-align:left">Your estimate</td>
        <td style="font-size: 17px">${
          document.getElementById("new__estimate").innerHTML
        }</td>
      </tr>
    </table>
  </body>
</html>
  `;
  return html;
}
window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // generate a five digit number for the contact_number variable

      this.contact_number.value = (Math.random() * 100000) | 0;
      document.getElementById("html").value = returnHTML();
      document.getElementById("btn__submit").disabled = true;
      document.getElementById("btn__submit").innerHTML = "Please wait...";
      // these IDs from the previous steps
      emailjs.sendForm("service_6lblw5w", "template_m1ao7st", this).then(
        function () {
          console.log("SUCCESS!");
          document.getElementById("btn__submit").innerHTML = "Sent";
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    });
};
