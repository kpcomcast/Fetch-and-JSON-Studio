// TODO: add code here
let astronautsArray

function buildHead(document, nameFirst, nameLast) {
  let header = document.createElement("h3");
  header.innerHTML = `${nameFirst} ${nameLast}`;
  return header;
}

function buildList(document, hours, active, skills) {
  let ulist = document.createElement("ul");
  let list1 = document.createElement("li");
  let list2 = document.createElement("li");
  let list3 = document.createElement("li");
  let color = "";
  if (active) {
    color = "green";
  } else {
    color = "red";
  }
  list1.innerHTML = `Hours in space: ${hours}`
  list2.innerHTML = `Active: <span style="color:${color}">${active}</span>`
  list3.innerHTML = `Skills: ${skills.join(", ")}`

  ulist.appendChild(list1);
  ulist.appendChild(list2);
  ulist.appendChild(list3);

  return ulist
}

window.addEventListener("load", function () {
  fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function (response) {
    return response.json();
  }).then(function (json) {
    let astronautsArray = json;
    astronautsArray.sort((a, b) => b.hoursInSpace - a.hoursInSpace);
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

      bioDiv.appendChild(buildHead(document, i.firstName, i.lastName));
      bioDiv.appendChild(buildList(document, i.hoursInSpace, i.active, i.skills));

      astDiv.appendChild(bioDiv);
      astDiv.appendChild(img);

      division.appendChild(astDiv);
    }
  })

});