const extra_score = document.getElementById("score");
const extra_multiplier = document.getElementById("multiplier");
const current_score = document.getElementById("current_score");
const current_multiplier = document.getElementById("current_multiplier");
let score = parseInt(getCookieValue("score")) || 0;
let multiplier = parseInt(getCookieValue("multiplier")) || 1;

function getCookieValue(name) {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
        const cookiePair = cookieArr[i].trim();
        if (cookiePair.startsWith(name + '=')) {
            return cookiePair.split('=')[1];
        }
    }
    return null;
}

function update() {
    document.cookie = `score=${score}; expires=Wed, 01 Jan 2030 00:00:00 UTC`;
    document.cookie = `multiplier=${multiplier}; expires=Wed, 01 Jan 2030 00:00:00 UTC`;
    current_score.innerHTML = `score: ${getCookieValue("score")}`;
    current_multiplier.innerHTML = `multiplier: x${getCookieValue("multiplier")}`;
}

extra_score.onclick = function(){
    score += multiplier;
    update();
}

extra_multiplier.onclick = function(){
    if (score >= 100){
        score -= 100;
        multiplier = multiplier * 2;
        update();
    }
}

update();