const css = document.getElementById("css");
const nameplate = document.getElementById("nameplate");
const buttons = document.getElementById("buttons");
let extra_score = document.getElementById("score");
const extra_multiplier = document.getElementById("multiplier");
const extra_sps = document.getElementById("sps");
const max_multiplier = document.getElementById("max_multiplier");
const max_sps = document.getElementById("max_sps");
const edit_name = document.getElementById("edit_name")
const current_score = document.getElementById("current_score");
const current_multiplier = document.getElementById("current_multiplier");
const current_sps = document.getElementById("current_sps");
const full_reset = document.getElementById("full_reset");
const godmode_div = document.getElementById("godmode");
const set_score = document.getElementById("set_score");
const set_multiplier = document.getElementById("set_multiplier");
const set_sps = document.getElementById("set_sps");
const show_css = document.getElementById("show_css");
const hide_css = document.getElementById("hide_css");
const disable_godmode = document.getElementById("disable_godmode");

let score = parseInt(getCookieValue("score")) || 0;
let multiplier = parseInt(getCookieValue("multiplier")) || 1;
let sps = parseInt(getCookieValue("sps")) || 0;
let uname = getCookieValue("uname") || "Player";
let godmodeBuffer = "";
let query = new URLSearchParams(new URL(window.location.href).search);
let hamter = false;

if (query.has("hamter")){
    hamter = true;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function enableGodmode(){
    godmode_div.hidden = false;
}

function checkGodmode(event){
    godmodeBuffer += event.key;
    if (godmodeBuffer === "godmode"){
        if (getCookieValue("uname") === "godmode") {
            enableGodmode();
        }
        godmodeBuffer = "";
    }
}

function getCookieValue(name){
    const cookieArr = document.cookie.split(';');
    for (let cookie of cookieArr) {
        const cookiePair = cookie.trim();
        if (cookiePair.startsWith(name + '=')) {
            return cookiePair.split('=')[1];
        }
    }
    return null;
}

function dosps(){
    score += sps * multiplier;
    update();
}

function update(){
    const multiplier_cost = 100 * multiplier;
    const sps_cost = (sps === 0) ? 50 : 50 * (sps + 1);

    document.cookie = `score=${score}; expires=Wed, 01 Jan 2030 00:00:00 UTC`;
    document.cookie = `multiplier=${multiplier}; expires=Wed, 01 Jan 2030 00:00:00 UTC`;
    document.cookie = `sps=${sps}; expires=Wed, 01 Jan 2030 00:00:00 UTC`;
    document.cookie = `uname=${uname}; expires=Wed, 01 Jan 2030 00:00:00 UTC`;

    current_score.innerHTML = `Score: ${numberWithCommas(score)}`;
    current_multiplier.innerHTML = `Multiplier: x${numberWithCommas(multiplier)}`;
    current_sps.innerHTML = `Score / second: ${numberWithCommas(sps)}`;
    extra_multiplier.innerHTML = `+1 Multiplier (${numberWithCommas(multiplier_cost)} score)`;
    extra_sps.innerHTML = `+1 Score / second (${numberWithCommas(sps_cost)} score)`;
    nameplate.innerHTML = `${uname}'s clickerclicker`
}

edit_name.onclick = function(){
    uname = prompt("What's your new name", "Player");
    update();
}

extra_score.onclick = function(){
    score += multiplier;
    update();
};

extra_multiplier.onclick = function(){
    const multiplier_cost = 100 * multiplier;
    if (score >= multiplier_cost) {
        score -= multiplier_cost;
        multiplier += 1;
        update();
    }
};

extra_sps.onclick = function(){
    const sps_cost = (sps === 0) ? 50 : 50 * (sps + 1);
    if (score >= sps_cost) {
        score -= sps_cost;
        sps += 1;
        update();
    }
};

max_multiplier.onclick = function(){
    const multiplier_cost = 100 * multiplier;
    while (score >= multiplier_cost) {
        score -= multiplier_cost;
        multiplier += 1;
        update();
    }
};

max_sps.onclick = function(){
    const sps_cost = (sps === 0) ? 50 : 50 * (sps + 1);
    while (score >= sps_cost) {
        score -= sps_cost;
        sps += 1;
        update();
    }
}

full_reset.onclick = function(){
    score = 0;
    multiplier = 1;
    sps = 0;
    uname = "Player";
    godmode_div.hidden = true;
    update();
};

set_score.onclick = function(){
    score = parseInt(prompt("New score", "0"));
    update();
}

set_multiplier.onclick = function(){
    multiplier = parseInt(prompt("New multiplier", "0"));
    update();
}

set_sps.onclick = function(){
    sps = parseInt(prompt("New Score / second", "0"));
    update();
}

show_css.onclick = function(){
    css.innerHTML = '<link rel="stylesheet" href="./static/style.css">';
}

hide_css.onclick = function(){
    css.innerHTML = "";
}

disable_godmode.onclick = function(){
    godmode_div.hidden = true;
    godmodeBuffer = "";
}

if (hamter){
    extra_score.hidden = true;
    extra_score = document.createElement("img");
    extra_score.src = "./img/hamter1.jpg";
    extra_score.id = "score";
    extra_score.height = 225;
    extra_score.width = 225;
    extra_score.onclick = function() {
        score += multiplier;
        update();
    };
    buttons.appendChild(extra_score);
}

setInterval(dosps, 1000);
document.addEventListener("keydown", checkGodmode);
update();