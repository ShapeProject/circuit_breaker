pragma circom 2.0.0;

template Main() {
    signal input totalScore;
    signal input totalEvaluater;
    signal input lineNumber;
    signal input encryptionKeyN;
    signal input decriptionKeyLambda;
    signal input decriptionKeyMu;
    signal averageScore;
    signal output rating;
    signal rem;
    signal plainTotScore;
    signal plainTotEvaluater;

    // 平均スコアの計算
    plainTotScore <-- decrypt(totalScore, encryptionKeyN, decriptionKeyLambda, decriptionKeyMu);
    plainTotEvaluater <-- decrypt(totalEvaluater, encryptionKeyN, decriptionKeyLambda, decriptionKeyMu);
    log("plainTotScore is", plainTotScore);
    log("plainTotEvaluater is", plainTotEvaluater);

    averageScore <-- plainTotScore \ plainTotEvaluater;
    log("averageScore is", averageScore);
    rem <-- plainTotScore % plainTotEvaluater;
    averageScore * plainTotEvaluater + rem === plainTotScore;

    // 5段階評価の計算
    component computeRating = ComputeRating();
    computeRating.averageScore <== averageScore;
    computeRating.lineNumber <== lineNumber;
    computeRating.rating ==> rating;
}

function decrypt(chipher, ekN, dkLambda, dkMu) {
    var ekNN = ekN * ekN;
    log("ekNN is", ekNN);
    var plainNumer = (powMod(chipher, dkLambda, ekNN) - 1) \ ekN;
    log("plainNumer is", plainNumer);
    log("dkMu is", dkMu);
    var plain = plainNumer * dkMu % ekN;
    log("ekN is", ekN);
    return plain;
}

function powMod(x, e, m) {
    var result = 1;
    while (e > 0) {
        if (e % 2 == 1) {
            result = (result * x) % m;
        }
        x = (x * x) % m;
        e = e >> 1;
    }
    return result;
}

template ComputeRating() {
    signal input averageScore;
    signal output rating;

    if (lineNumber >= averageScore) {
        rating <== 0;
    } else {
        rating <== 1;
    }
}

component main {public [totalScore, totalEvaluater, encryptionKeyN]} = Main();