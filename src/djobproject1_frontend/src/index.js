import { log } from "util";
import { djobproject1_backend } from "../../declarations/djobproject1_backend";
// const veri=await djobproject1_backend.create_user("a","a","a","a",1234);
// console.log(veri);

//#region register
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

document.getElementById("myform").addEventListener("submit", async function(event) {
  event.preventDefault(); 
  var name = document.getElementById("name").value.toString();
  var email = document.getElementById("email").value.toString();
  var birth = document.getElementById("birth").value;
  var password = document.getElementById("password").value.toString();
  var lastname = document.getElementById("lastname").value.toString();

  const veri=await djobproject1_backend.create_user(name,lastname,email,password,Number(birth));
  console.log(veri);
  var htmlString = "<p>" + veri.Ok.Success + "</p>";

  document.getElementById("create_user").innerHTML =htmlString;
 


});
//#endregion

//#region login
let modalLogin = document.getElementById("login-modal");
let btnLogin = document.getElementById("open-login-modal-btn");
let spanLogin = document.getElementsByClassName("close")[1];

btnLogin.onclick = function() {
  modalLogin.style.display = "block";
}

spanLogin.onclick = function() {
  modalLogin.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modalLogin) {
    modalLogin.style.display = "none";
  }
}
let email=""

document.getElementById("login-form").addEventListener("submit", async function(event) {
  event.preventDefault(); 
  
  let emailLogin = document.getElementById("emailLogin").value.toString();
  let passwordLogin = document.getElementById("passwordLogin").value.toString();
  let openModalBtn = document.getElementById("openModalBtn")
  let userEmail = document.getElementById("user-email")
  let wallet=document.getElementById("walletBtn")
  const loginUser=await djobproject1_backend.login_user(emailLogin,passwordLogin);
  try {
    if (Object.keys(loginUser.Ok).length) {
      alert(loginUser.Ok.Success)
      openModalBtn.style.display ="none"
      userEmail.innerText= `Welcome ${emailLogin}  `
      wallet.style.display="block";
      btnLogin.style.display="none"
      modalLogin.style.display = "none";
      btnCreateAdvert.style.display="block"
      wallet.addEventListener('click', function() {
        alert('coming soon...');
      });
      
    }
  } catch (error) {
    if (Object.keys(loginUser.Err).length) alert(loginUser.Err.incorrectEmail)
  }

});
//#endregion

//#region createAdverd
let createAdvertModal = document.getElementById("create-advert-modal");
let btnCreateAdvert= document.getElementById("open-create-advert-modal-btn");
let spanCreateAdvert = document.getElementsByClassName("close")[2];

btnCreateAdvert.onclick = function() {
  createAdvertModal.style.display = "block";
}

spanCreateAdvert.onclick = function() {
  createAdvertModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == createAdvertModal) {
    createAdvertModal.style.display = "none";
  }
}
document.getElementById("create-advert-form").addEventListener("submit", async function(event) {
  event.preventDefault(); 
  
  let title = document.getElementById("advertTitle").value.toString();
  let desc = document.getElementById("advertDescription").value.toString();
  let email = document.getElementById("advertEmail").value.toString();
  let category = document.getElementById("advertCategory").value.toString();
  let price = document.getElementById("advertPrice").value.toString();

  const createAdvert=await djobproject1_backend.create_advert(title,desc,price,category,email);

  alert(createAdvert.Ok.Success)
  createAdvertModal.style.display = "none";

});
//#endregion


//#region job list
const veriList=await djobproject1_backend.list_adverts();


// Verileri listeleme fonksiyonu
function verileriListele() {
  let veriListesiDiv = document.getElementById("veriListesi");

  // Her bir veri için kart oluştur
  veriList.forEach(function(veri) {
      let kart = document.createElement("div");
      kart.className = "card";
      let icerik = `
          <div class="container">
                  <h1> <b> ${veri.title}</b></h1>
                  <h4>Category: <b> ${veri.category}</b></h4>
                  <h4>Mail:  <b>${veri.email}</b></h4>
              <hr/>
              <p><b>Description: <b>${veri.description}</b></p>
              <h4>Price: <b>${veri.price}</b></h4>
              <div class="card-footer-btn">
                <a href="mailto:${veri.email}"><button id="btn-contact">Contact</button></a>
              </div>
          </div>
      `;
      kart.innerHTML = icerik;
      veriListesiDiv.appendChild(kart);
  });
}
window.onload = verileriListele();

//#endregion


// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");
  
//   var name = document.getElementById("name").value;
//   var email = document.getElementById("email").value;
//   var birth = document.getElementById("birth").value;
//   var password = document.getElementById("password").value;
//   var lastname = document.getElementById("lastname").value;
//   console.log(name,lastname,create_user);
  

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const create_user = await djobproject1_backend.clear_users([name,email,birth,password,lastname]);


//   button.removeAttribute("disabled");

//   document.getElementById("create_user").innerText = create_user;
//   this.submit();  });
