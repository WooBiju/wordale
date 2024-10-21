const 정답 = "APPLE";

let index = 0;
let attempts = 0; 
let timer

function appStart() {
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText = "게임이 종료됬습니다.";
        div.style = "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:33%; background-color:white; width:200px; height:100px;";
        document.body.appendChild(div); 
    }

    const gameover = () => { // 게임 종료 함수
        window.removeEventListener("keydown",handleKeydown)
        displayGameover();
        clearInterval(timer); // 시간 리셋
    };

    const nextLine = () => { // 다음 줄로 이동
        if (attempts === 6) return gameover();
        attempts += 1; // 줄 ++
        index = 0; // 인덱스 초기화
    }; 

    const handleEnterKey = () => {
        // 정답확인코드
        let 맞은_갯수 = 0;
        for(let i=0; i<5; i++) {
            const block = document.querySelector(`.board-column[data-index = '${attempts}${i}']`);

            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];

            if (입력한_글자 === 정답_글자){
                맞은_갯수 += 1;
                block.style.background = "#6AAA64";
            } 
            else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
            else block.style.background = "#787C7E";

            block.style.color = "white";
        }    
        if(맞은_갯수 === 5) gameover();
        else nextLine();
    };
    const handleBackspace = () => {
        if (index > 0) {
        const preBlock = document.querySelector(`.board-column[data-index = '${attempts}${index-1}']`);
        preBlock.innerText = ""; // 블럭안의 내용 삭제
        }
        if (index !== 0) index -= 1;

    }

    const handleKeydown = (event) => {
        
        const key = event.key.toUpperCase(); // 입력시 대문자로 변경
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index = '${attempts}${index}']`);

        if (event.key === "Backspace") handleBackspace();
    
        else if (index === 5) { // 맨 끝까지 단어가 입력됬을 때
            if (event.key === "Enter") handleEnterKey(); // enter 키 입력시 handleEnterKey() 수행
            else return; // 엔터키가 아닌 다른키가 눌리면 끝내기
        }
        else if (65<=keyCode && keyCode<=90) { // 알파벳만 입력하기 위해 숫자 지정
            thisBlock.innerText = key;
            index += 1;
        }
    };

    const startTimer = () => { // 타이머 설정
        const 시작_시간 = new Date();

        function setTime() {
         const 현재_시간 = new Date();
         const 흐른_시간 = new Date(현재_시간 - 시작_시간);
         const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
         const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
         const timeDiv = document.querySelector("#timer");
         timeDiv.innerText = `${분}:${초}`;
    }

        timer = setInterval(setTime, 1000);
    }

    startTimer();
    window.addEventListener("keydown",handleKeydown);
}

appStart(); 