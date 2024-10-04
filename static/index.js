const extra_score = document.getElementById("score");
const extra_multiplier = document.getElementById("multiplier");
const extra_sps = document.getElementById("sps");
const max_multiplier = document.getElementById("max_multiplier");
const max_sps = document.getElementById("max_sps");
const current_score = document.getElementById("current_score");
const current_multiplier = document.getElementById("current_multiplier");
const current_sps = document.getElementById("current_sps");
const full_reset = document.getElementById("full_reset");

let score = parseInt(getCookieValue("score")) || 0;
let multiplier = parseInt(getCookieValue("multiplier")) || 1;
let sps = parseInt(getCookieValue("sps")) || 0;

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

    current_score.innerHTML = `score: ${score}`;
    current_multiplier.innerHTML = `multiplier: x${multiplier}`;
    current_sps.innerHTML = `sps: ${sps}`;
    extra_multiplier.innerHTML = `x2 multiplier (${multiplier_cost} score)`;
    extra_sps.innerHTML = `+1 sps (${sps_cost} score)`;
}

extra_score.onclick = function(){
    score += multiplier;
    update();
};

extra_multiplier.onclick = function(){
    const multiplier_cost = 100 * multiplier;
    if (score >= multiplier_cost) {
        score -= multiplier_cost;
        multiplier *= 2;
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
        multiplier *= 2;
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
    update();
};

setInterval(dosps, 1000);
update();