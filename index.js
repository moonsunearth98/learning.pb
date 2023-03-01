
const buttons = document.getElementsByClassName("drum");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onclick);
}

function onclick() {

  var buttonInnerHtml=this.innerHTML;

  switch(buttonInnerHtml){
    case "P":
      var audio1=new Audio("sounds/tom-1.mp3");
      audio1.play();
      break;
    case "r":
      var audio2=new Audio("sounds/tom-4.mp3");
      audio2.play();
      break;
    case "a":
      var audio3=new Audio("sounds/snare.mp3");
      audio3.play();
      break;
    case "c":
      var audio4=new Audio("sounds/snare.mp3");
      audio4.play();
      break;
    case "h":
      var audio4=new Audio("sounds/crash.mp3");
      audio4.play();
      break;
    case "i":
      var audio5=new Audio("sounds/tom-3.mp3");
      audio5.play();
      break;

    default:
      console.log(buttonInnerHtml)
  };
    
};

// function Housekeeper (yearofexperience,name,age){
//     this.yearofexperience=yearofexperience;
//     this.name=name;
//     this.age=age;
// }

// var housekeeper1=new Housekeeper(9,"Friyo",54);
// var housekeeper2=new Housekeeper(12,"unday",66);