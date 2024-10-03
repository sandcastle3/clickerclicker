const extra_score = document.getElementById("score");
const extra_multiplier = document.getElementById("multiplier");
const max_multiplier = document.getElementById("max_multiplier");
const current_score = document.getElementById("current_score");
const current_multiplier = document.getElementById("current_multiplier");
const full_reset = document.getElementById("full_reset");

let score = parseInt(getCookieValue("score")) || 0;
let multiplier = parseInt(getCookieValue("multiplier")) || 1;
let multiplier_cost = 100 * multiplier;

function getCookieValue(name){
    const cookieArr = document.cookie.split(';');
    for (let cookie of cookieArr){
        const cookiePair = cookie.trim();
        if (cookiePair.startsWith(name + '=')){
            return cookiePair.split('=')[1];
        }
    }
    return null;
}

function update(){
    multiplier_cost = 100 * multiplier;
    document.cookie = `score=${score}; expires=Wed, 01 Jan 2030 00:00:00 UTC`;
    document.cookie = `multiplier=${multiplier}; expires=Wed, 01 Jan 2030 00:00:00 UTC`;
    current_score.innerHTML = `score: ${score}`;
    current_multiplier.innerHTML = `multiplier: x${multiplier}`;
    extra_multiplier.innerHTML = `x2 multiplier (${multiplier_cost} score)`
}

extra_score.onclick = function(){
    score += multiplier;
    update();
};

extra_multiplier.onclick = function(){
    if (score >= multiplier_cost) {
        score -= multiplier_cost;
        multiplier *= 2;
        update();
    }
};

max_multiplier.onclick = function(){
    while (score >= multiplier_cost) {
        score -= multiplier_cost;
        multiplier *= 2;
        update();
    }
};

full_reset.onclick = function(){
    score = 0;
    multiplier = 0;
    update();
};

update();