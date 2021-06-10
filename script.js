// TODO: add code here
let astronautsArray

function buildHead(document, nameFirst, nameLast) {
  let header = document.createElement("h3");
  header.innerHTML = `${nameFirst} ${nameLast}`;
  return header;
}

window.addEventListener("load", function() {
  fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function (response) {
    return response.json();
  }).then(function(json) {
    astronautsArray = json;
    astronautsArray.sort((a,b) => b.hoursInSpace - a.hoursInSpace);
    let count = document.querySelector("#count");
    let p = document.createElement("p");
    p.innerHTML = `Astronaut count: ${astronautsArray.length}`;
    count.appendChild(p);
    for (let i of astronautsArray) {
      let division = document.querySelector("#container");

      let astDiv = document.createElement("div");
      astDiv.className = "astronaut";

      let bioDiv = document.createElement("div");
      bioDiv.className = "bio";

      let img = document.createElement("img");
      img.className = "avatar";
      img.src = i.picture;

      let list = document.createElement("ul");
      let li1 = document.createElement("li");
      let li2 = document.createElement("li");
      let li3 = document.createElement("li");
      li1.innerHTML = `Hours in space: ${i.hoursInSpace}`
      li2.innerHTML = `Active: ${i.active}`
      if (i.active) {
        li2.style.color = "green";
      }
      let skillsArray = i.skills;
      let skills = "";
      for (let j of skillsArray) {
        if (j === skillsArray[skillsArray.length -1]) {
          skills = skills + j;
        } else {
          skills = skills + j + ", "
        }
      }
      li3.innerHTML = `Skills: ${skills}`;

      list.appendChild(li1);
      list.appendChild(li2);
      list.appendChild(li3);

      bioDiv.appendChild(buildHead(document, i.firstName, i.lastName));
      bioDiv.appendChild(list);

      astDiv.appendChild(bioDiv);
      astDiv.appendChild(img);

      division.appendChild(astDiv);
    }
  })
});