window.addEventListener('load' , () => {

    const pattern = document.getElementById('pattern');
    const input = document.getElementById('answer');
    const scoreArea = document.getElementById('score');

    //

    var pat , a , ans = "" , size = prompt("Length in the pattern..." , 5);
    if(isNaN(size) || size.length < 1 || size == null || size == undefined || size > 10){
        alert("It's not a number OR it's upto 10. Try again.");
        window.location.reload();
    }

    input.disabled = true;
    try {
        start();
    } catch (error) {
        alert(error);
        window.location.reload();
    }
    function start(){
        input.value = "";
        input.disabled = true;
        pat = [] , a = 0 , ans = "";
        for(var i = 0 ; i<size ; i++){
            pat.push(Math.floor(Math.random(0)*9));
        };
        for(var i = 0 ; i<size ; i++){
            ans += "" + pat[i];
        };
        a = 0;
        int = setInterval(() => {
            setTimeout(() => {
                pattern.innerHTML = " ";
            }, 800);
            pattern.innerHTML = pat[a];
            a++;
            if(a > size){
                clearInterval(int);
                pattern.innerHTML = "- - -";
                input.disabled = false;
                input.focus();
            }
        }, 1000);
    };

    var data = {};
    input.addEventListener('keypress' , ev => {
        if(ev.key == "Enter"){
            saveScore();
            data = {
                correct : ans,
                userInt : input.value
            };
            if(data.correct == data.userInt){
                scoreUp();
                pattern.innerHTML = "WON!";
                setTimeout(() => {
                    start();
                }, 2000);
            }else{
                pattern.innerHTML = "Oh!";
                setTimeout(() => {
                    start();
                }, 2000);
            }
        }
    });

    // SCORE
    var score;
    if(localStorage.getItem('score') !== null){
        score = parseInt(localStorage.getItem('score'));
    }else{
        score = 0;
    }
    scoreArea.innerHTML = "Score : " + score;
    function scoreUp(){
        score += 10;
        saveScore();
        scoreArea.innerHTML = "Score : " + score;
    };

    function saveScore(){
        if(localStorage.getItem('score') == null){
            localStorage.setItem('score' , score);
        }else{
            localStorage.setItem('score' , score);
        }
    };

    scoreArea.onclick = function(){
        if(confirm("Clear Saved Score?")){
            localStorage.clear();
            score = 0;
            scoreArea.innerHTML = "Score : " + score;
        };
    }
    //

    input.addEventListener('paste' , () => {
        setTimeout(() => {
            input.value = "";
            input.value = "Haha!";
            setTimeout(() => {
                input.value = '';
            }, 400);
        }, 100);
    })

    document.addEventListener('click' , () => {
        if(input.disabled !== true){
            input.focus();
        }
    });

})