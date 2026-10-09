// ========================================================
// Assignment 5: JavaScript Post and Reply
// ให้นักศึกษาเขียนโค้ด JavaScript เพื่อจัดการการ Post และ Clear ข้อความ
// ========================================================

// สร้างตัวแปรนับลำดับการโพสต์
window.onload = setupFunction;
    let postCount = 0;

function setupFunction() {
    // กำหนดหัวข้อหน้าเว็บ
    document.getElementById("top").innerHTML = "Welcome to the Forum";
    // สร้างตัวแปรนับลำดับการโพสต์ชื่อว่า postCount และกำหนดค่าเริ่มต้นเป็น 0
    // ปุ่ม Post
    let postButton = document.getElementById("post-btn");
    postButton.onclick = postFunction;

    // ปุ่ม Clear
    let clearButton = document.getElementById("clear-btn");
    clearButton.onclick = clearFunction;
}

function postFunction() {
    // 1. อ่านค่าข้อความจาก textarea (id="message")
    let message = document.getElementById("message").value;

    // 2. นำข้อความไปใส่ในแต่ละกล่องตามลำดับ:
    if (postCount === 0) {
        document.getElementById("topic").innerHTML = message;
    } else if (postCount === 1) {
        document.getElementById("reply1").innerHTML = message;
    } else if (postCount === 2) {
        document.getElementById("reply2").innerHTML = message;
    }

    // 3. เคลียร์ข้อความใน textarea ให้ว่างหลังจากโพสต์
    document.getElementById("message").value = "";

    // 4. เพิ่มค่า postCount เพื่อให้ทำงานเงื่อนไขต่อไป
    postCount++;
}

function clearFunction() {
    //  1. ล้างข้อความใน id="topic", id="reply1", id="reply2"
    document.getElementById("topic").innerHTML = "";
    document.getElementById("reply1").innerHTML = "";
    document.getElementById("reply2").innerHTML = "";

    //  2. ล้างข้อความใน textarea (id="message")
    document.getElementById("message").value = "";

    // 3. รีเซ็ตตัวแปร postCount กลับเป็นค่าเริ่มต้น
    postCount = 0;
}