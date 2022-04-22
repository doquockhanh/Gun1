let game_set = {
    teamA: [],
    teamB: [],
    map: null
}

let char1 =  new Char(700, 1300);
let gun1 = new Gun(char1.x, char1.y, char1.w, char1.h);
let char2 =  new Char(1300, 1500);
let gun2 = new Gun(char2.x, char2.y, char2.w, char2.h);
char1.setGun(gun1);
char2.setGun(gun2);
game_set.teamA = [ {
    char: char1,
    gun: gun1
}]
game_set.teamB = [{
    char: char2,
    gun: gun2,
}]
game_set.map = Map1;
gameController.start(game_set);

function showHideHelpList(){
    let current_hidden =  document.getElementById("helpList").hidden;
    document.getElementById("helpList").hidden = !current_hidden;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}