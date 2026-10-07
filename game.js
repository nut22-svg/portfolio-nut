// =============================================================================
// MDT312 Assignment 7  - Square Game
// Modern JavaScript: DOM, Event, Timer
// =============================================================================

window.onload = pageLoad;

// Global timer reference เพื่อให้สามารถควบคุมและเคลียร์สถานะได้ถูกต้อง
let timer = null;

function pageLoad(){
    // 1. ผูกเหตุการณ์คลิกปุ่ม Start ด้วย const
    const startBtn = document.getElementById("start");
    startBtn.onclick = startGame;

    // 2. ใช้ Event Delegation:
    // ผูก event ไว้ที่กล่องแม่ #layer เพียงจุดเดียว
    // เมื่อมีการคลิกเกิดขึ้น ให้ใช้ event.target ตรวจสอบว่าเป็นกล่อง .square หรือไม่
    const gameLayer = document.getElementById("layer");
    gameLayer.onclick = function(event) {
        if (event.target.classList.contains("square")) {
            event.target.remove(); // ลบโหนดที่ถูกคลิก
        }
    };
}

function startGame(){
    alert("Ready");
    clearScreen(); 
    addBox();
    timeStart();
}

function timeStart(){
    const TIMER_TICK = 1000;
    // เคลียร์ timer เดิมก่อนเริ่มนับใหม่ เพื่อป้องกันการนับเวลาเร่งความเร็วเมื่อกด Start ซ้ำ
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }

    const min = 0.1; // 0.5 minute = 30 seconds
    let second = min * 60; 
    const clockDisplay = document.getElementById('clock');
    clockDisplay.textContent = second;
    
    // setting timer using setInterval function
    timer = setInterval(timeCount, TIMER_TICK);
    
    function timeCount(){
        const allbox = document.querySelectorAll("#layer div");
        
        // 1. ถ้าไม่มีกล่องเหลือแล้ว และเวลายังเหลืออยู่จะขึ้นว่า You win!
        if (allbox.length === 0 && second > 0) {
            alert("You win!");
            clearInterval(timer);
            timer = null;
            return;
        }

        // 2. ถ้าเวลาหมด แต่ยังมีกล่องเหลืออยู่ จะบอกว่า Game over และทำการ clear screen
        if (second <= 0) {
            if (allbox.length > 0) {
                alert("Game over");
                clearScreen();
            }
            clearInterval(timer);
            timer = null;
            return;
        }

        // 3. ถ้ายังมีกล่องเหลืออยู่ เวลาจะลดลงเรื่อยๆ
        second--;
        clockDisplay.textContent = second;
    }
}
// ประกาศสร้างฟังก์ชันชื่อ addBox สำหรับรับหน้าที่สร้างกล่องสี่เหลี่ยมตามจำนวนและสีที่กำหนด
function addBox(){
    const numbox = parseInt(document.getElementById("numbox").value) || 0;
    const gameLayer = document.getElementById("layer");
    const colorDrop = document.getElementById("color").value;
    
    for (let i = 0; i < numbox; i++){
        const tempbox = document.createElement("div"); 
        // กำหนดชื่อคลาส CSS ให้กล่องใบนี้ โดยรวมคลาสรูปทรง "square " เข้ากับชื่อคลาสสีในตัวแปร colorDrop
        tempbox.className = "square " + colorDrop;
        // ตั้งชื่อ ID ประจำตัวเฉพาะให้กล่องแต่ละใบโดยเอาเลขรอบลูปมาต่อท้าย
        tempbox.id = "box" + i;
        // แกน X จากขอบซ้าย โดยสุ่มตัวเลขระหว่าง 0 ถึง 475px
        tempbox.style.left = Math.random() * (500 - 25) + "px";
        // แกน Y จากขอบบน โดยสุ่มตัวเลขระหว่าง 0 ถึง 475px
        tempbox.style.top = Math.random() * (500 - 25) + "px";
        
        // Add องประกอบ tempbox ที่ตั้งค่าแล้ว ลงไปใน layer แล้วกล่องแสดงผลขึ้นมาบนหน้าจอจริง
        gameLayer.appendChild(tempbox);
    }
}

function clearScreen(){
    // ทำการลบ node ของกล่องทั้งหมด ออกจากหน้าจอ
    const allbox = document.querySelectorAll("#layer div"); //
    for (let i = 0; i < allbox.length; i++) {
        allbox[i].remove();
    }
}