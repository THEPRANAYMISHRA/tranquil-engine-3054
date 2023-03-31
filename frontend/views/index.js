let namebox=document.querySelector(".dropdown>p")
let logoutbtn=document.getElementById("btn-signout")
let loginbtn=document.getElementById("btn-signin")

window.onload=()=>{
    let name=localStorage.getItem("name")
    if(name){
        namebox.textContent=`Hello,${name}`
        loginbtn.style.display="none"
        logoutbtn.style.display="block"
    }else{
        namebox.textContent="Profile"
    }
}

const popupSignIn = document.querySelector("#popup-signin");
const popupSignUp = document.querySelector("#popup-signup");
const btnSignIn = document.querySelector("#btn-signin");
const btnSignUp = document.querySelector("#btn-signup");

btnSignIn.addEventListener("click", () => {
  popupSignIn.style.display = "block";
  popupSignUp.style.display = "none";
});

btnSignUp.addEventListener("click", () => {
    popupSignUp.style.display = "block";
    popupSignIn.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === popupSignIn) {
    popupSignIn.style.display = "none";
    popupSignUp.style.display = "none";
  }
});

window.addEventListener("click", (event) => {
  if (event.target === popupSignUp) {
    popupSignUp.style.display = "none";
    popupSignIn.style.display = "none";
  }
});

// search===============================================
let Booking_typeEl=document.getElementById("type")
let LeavingfromEl=document.getElementById("leavingfrom")
let GoingtoEl=document.getElementById("goingto")
let checkinEl=document.getElementById("checkin")
let checkoutEl=document.getElementById("checkout")
let TravellersEl=document.getElementById("travellers")
let searchbtn =document.getElementById("searchPlans")
let showDatabox=document.getElementById("showdata")

searchbtn.addEventListener("click", async(e)=>{
    e.preventDefault()
    let plan={
        Booking_type:Booking_typeEl.value,
        from:LeavingfromEl.value,
        to:GoingtoEl.value,
        checkIn:checkinEl.value,
        checkOut:checkoutEl.value,
        seats:TravellersEl.value
    }

    // console.log(plan)
    try {
        let res=await fetch("http://localhost:4500/search/available",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(plan)
            })
        res=await res.json()
        console.log(res)
        Display(res)
    } catch (error) {
        console.log(error)
    }

})

//signin================================================
let emailEl=document.getElementById("email-signin")
let passEl=document.getElementById("password-signin")
let signInbtn=document.getElementById("submit-signin")

signInbtn.addEventListener("click",async(e)=>{
    e.preventDefault()
    let user={
        email:emailEl.value,
        pass:passEl.value
    }
    try {
        let res=await fetch("http://localhost:4500/users/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            })
        res=await res.json()
        localStorage.setItem("token",res.token)
        localStorage.setItem("name",res.name)
        alert(res.msg)
        popupSignIn.style.display = "none";
        loginbtn.style.display="none"
        logoutbtn.style.display="block"
        namebox.innerText=`Hello,${localStorage.getItem("name")||"Profile"}`
    } catch (error) {
        alert(res.msg)
    }
})

//signup================================================
// let typeEl=document.getElementById("type")
let nameEl=document.getElementById("name-signup")
let signupemailEl=document.getElementById("email-signup")
let signuppassEl=document.getElementById("password-signup")
let signUpbtn=document.getElementById("submit-signup")

signUpbtn.addEventListener("click",(e)=>{
    e.preventDefault()
    let user={
        name:nameEl.value,
        email:signupemailEl.value,
        pass:signuppassEl.value
    }
    fetch("http://localhost:4500/users/signup",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then((res)=>{return res.json()})
    .then(res=>{alert("Signup successful!"),window.location.reload()})
    .catch(console.error("something went wrong!"))
})

//showData==========================================================

function Display(data){
    showDatabox.innerHTML=''
    if(data.length>0){
        let head=document.createElement("h1")
        head.textContent=`Following are the best Available Bookings`
        showDatabox.append(head)
    }else{
        let head=document.createElement("h1")
        head.textContent=`Oops! sorry,nothing to show!`
        showDatabox.append(head)
    }

    data.forEach((e)=>{
        let div=document.createElement("div")

        let dataDiv=document.createElement("div")

        let img=document.createElement("img")
        img.src="https://cdn-icons-png.flaticon.com/128/2248/2248315.png"

        let Booking_type1=document.createElement("h5")
        Booking_type1.textContent=` Booking Type : ${e.Booking_type} | `

        let from=document.createElement("h5")
        from.textContent=` ${e.from} `

        let arrow=document.createElement("img")
        arrow.src="https://cdn-icons-png.flaticon.com/128/724/724954.png"

        let to=document.createElement("h5")
        to.textContent=` ${e.to} | `

        let seats=document.createElement("h5")
        seats.textContent=` Seats Available : ${e.seats}`

        let book=document.createElement("button")
        book.textContent="Book Now"
        book.setAttribute('class','bookBtn');

        book.addEventListener("click",makeBooking)

        dataDiv.append(Booking_type1,from,arrow,to,seats)

        div.append(img,dataDiv,book)
        showDatabox.append(div)
    })

}
//Booking================================================================

let token=localStorage.getItem("token")

function makeBooking(){
    if(token){
        window.location.href="payment.html"
    }else{
        alert("login first")
    }
}


//signout=================================================================

logoutbtn.addEventListener("click",()=>{
    localStorage.clear();
    logoutbtn.style.display="none";
    loginbtn.style.display="block";
    namebox.innerText="Profile"
    alert("logged out")
})



