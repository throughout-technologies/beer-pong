var html = document.getElementById("html");
var reshoot = document.getElementById("reshoot");
var ball = document.getElementById("ball");
var root = document.documentElement;
var cupsOut = [];
var prg_score=0;
var input_arr=[]
var progressIn=0
var time=30;
var width = 0;
var timeCount = 0;
var time_count;

// ===============================================show disable input time ====================================================

setTimeout(()=>{
  for(let i=0;i<inputArray.length;i++){
          defaultInput(inputArray[i].id-1)  
      }
},10)

// ===============================================Start Game====================================================

function shootY(){
  let top = window.getComputedStyle(ball).getPropertyValue("top");
  ball.classList.remove("shootY");
  ball.classList.add("shootX");
  ball.style.top = top;
  let onclick = "shootX('".concat(top.toString(), "')");
  html.setAttribute("onclick", onclick);

  if(progressIn==0){
      progressTime()
   }
}
// function inable_input(index){
//   document.getElementById(`${inputArray[index].name}`).disabled=false;
// }

// ===============================================show Input====================================================

function defaultInput(index){
  if(inputArray[index].name.length < 1){
    return
  }
  let str = '<div class="col-md-6" ">'
  str += '<div class="form-floating mt-3">'
  str += '<input required type="' + inputArray[index].type + '" name="contact[data][' + inputArray[index].name + ']" autocomplete="off"'
  str += ' placeholder="' + inputArray[index].placeholder +'" class="form-control readonlyOff" id="' + inputArray[index].name+'" disabled >'
  str += '<label for="'+ inputArray[index].name +'_'+ inputArray[index].id+'">' + inputArray[index].placeholder + '</label>'
  str += '</div></div>'
  $('.new').append(str)
}

// ===============================================enable Input====================================================

function enable_input(index){
  a=document.getElementById(inputArray[index].name)
  a.disabled=false
}

// ===============================================Shoot Ball====================================================

function shootX(valueY){
  html.setAttribute("onclick","");
  let top = valueY;
  let topInt = parseInt(valueY);
  let left = window.getComputedStyle(ball).getPropertyValue("left");
  let leftInt = parseInt(left);
  let newtop = topInt-325;
  root.style.setProperty('--top', (topInt)+ "px");
  root.style.setProperty('--top325', (newtop)+ "px");
  ball.classList.remove("shootX");
  ball.classList.add("Shoot");
  ball.style.top = newtop.toString().concat("px");
  ball.style.left = left;
  if(-20<topInt && topInt<20 && -125<leftInt && leftInt<-60){
    removeCup("1");
    enable_input(inputArray[0].id-1)        
  }
  if(-20<topInt && topInt<20 && -40<leftInt && leftInt<40){
    removeCup("2");
    enable_input(inputArray[1].id-1)
  }
  if(-20<topInt && topInt<20 && 60<leftInt && leftInt<125){
    removeCup("3");
    enable_input(inputArray[2].id-1)
  }
  if(20<topInt && topInt<70 && -90<leftInt && leftInt<-25){
    removeCup("4");
    enable_input(inputArray[3].id-1)
  }
  if(20<topInt && topInt<70 && 15<leftInt && leftInt<80){
    removeCup("5");
    enable_input(inputArray[4].id-1)
  }
  if(120<topInt && topInt<150 &&-50<leftInt && leftInt<40){
    removeCup("6");
    enable_input(inputArray[5].id-1)
  }
  setTimeout(function(){
    if(cupsOut.length == 6){
      let time = timer();
      // alert("Congratulations! You are Winner!");
      alert("Congratulations!......");
      document.getElementById("sub_btn").disabled=false; 
    }else{
      let reshootBtn = document.createElement("BUTTON");
      reshootBtn.innerHTML = "Reshoot";
      reshootBtn.setAttribute("onclick","reshot()");
      reshootBtn.setAttribute("id","reshoot");
      $('#newButton').append(reshootBtn);
    }
  },1000);
}

// ===============================================Resshooot====================================================

function reshot(){
  document.getElementById("reshoot").remove();
  ball.classList.remove("Shoot");
  ball.classList.add("shootY");
  ball.style.top = "0px";
  ball.style.left = "0px";
  setTimeout(function(){
      html.setAttribute("onclick", "shootY()"); 
  },1000);
}

// ===============================================Remove cup====================================================

function removeCup(cup){
  let element = "cup".concat(cup);
  let alreadyExists = cupsOut.includes(cup);
  if(alreadyExists==false){
    cupsOut.push(cup);
    prg_score+=1
      document.getElementById("trophy").innerHTML=prg_score+`/6`
  }
  setTimeout(function(){
  document.getElementById(element).classList.add("fadeAway");
  },1000);
}


var startDate = new Date();
var startTime = startDate.getTime();
function timer(){
  var dateNow = new Date ();
  var timeNow = dateNow.getTime();
  var timeDiff = timeNow - startTime;
  var secondsElapsed = Math.floor(timeDiff/1000);
  return (secondsElapsed); 
}

// ===============================================Progress bar time====================================================

function progressTime(){
  timmer = setInterval(()=>{
    var t = parseFloat(time)
    timeCount += 1
    width = (timeCount * (100 / t))
    $('#progress').attr('style','width:'+width+'%')
    progressIn+=1
    if(timeCount==30){
      clearInterval(timmer)
      alert("Time out...")
       for(let i=0;i<inputArray.length;i++){
          enable_input(inputArray[i].id-1)
      }
      document.getElementById("sub_btn").disabled=false; 
    }
  },1000)  
}

// ===============================================Submit form save  data====================================================

let contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", (e) => {
  e.preventdefault()
  let form = e.target;
  let firstName = form.firstName.value; 
  let lastName = form.lastName.value; 
  let email = form.email.value; 
  let designation = form.designation.value; 
  let organization = form.organization.value; 
  let contact = form.mobile.value; 
  let First_Name,Last_Name,Email,Designation,Organization,Contact
  let arr = [{First_Name:firstName},{Last_Name:lastName},{Email:email},{Designation:designation},{Organization:organization},{Contact:contact}]
  console.log('arr',arr)
});

// ===============================================input Array====================================================

let inputArray = [
  {
    id: 1,
    name: "firstName",
    placeholder: "First Name",
    type:"text",
    pattern: '',
  },
  {
    id: 2,
    name: "lastName",
    placeholder: "Last Name",
    type:"text",
    attern: '',
  },
  {
    id: 3,
    name: "email",
    placeholder: "Email Id",
    type:"email",
    pattern: '',
  },
  {
    id: 4,
    name: "designation",
    placeholder: "Designation",
    type:"text",
    pattern: '',
  }, 
  {
    id: 5,
    name: "mobile",
    placeholder: "Mobile No.",
    type:"number",
    pattern: '',
  },
  {
    id: 6,
    name: "organization",
    placeholder: "Organization",
    type:"text",
    pattern: '',
},
];
    

