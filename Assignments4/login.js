// =============================================================================
// MDT312 Assignment 4 / 6 - login.js
// =============================================================================

window.onload = loginLoad;

function loginLoad() {
    const form = document.getElementById("myLogin");
    if (form) {
        form.onsubmit = checkLogin;
    }
}

function checkLogin(event) {
    // 1. ป้องกันหน้าเว็บรีเฟรชเองทันทีเมื่อกด Submit
    if (event) {
        event.preventDefault();
    }

    // 2. กำหนดผู้ใช้ Default และดึงข้อมูลจาก localStorage
    const users = [{ username: "admin", password: "123456" }];
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
        users.push({
            username: storedUsername,
            password: storedPassword
        });
    }

    // 3. ดึงค่าที่ผู้ใช้กรอกในฟอร์ม Login
    const form = document.forms["myLogin"];
    const usernameInput = form["username"].value.trim();
    const passwordInput = form["password"].value;

    // 4. วนลูปตรวจสอบข้อมูลผู้ใช้
    let isLoginSuccess = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === usernameInput && users[i].password === passwordInput) {
            isLoginSuccess = true;
            break;
        }
    }

    // 5. แสดงผลการตรวจสอบและเคลียร์ช่องอินพุต
    if (isLoginSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ");
        
        // ล้างข้อมูลในช่องพิมพ์ออกทั้งหมดหลังกด OK
        form.reset(); 
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง");
        
        // เคลียร์เฉพาะช่องรหัสผ่านเพื่อให้ลองพิมพ์ใหม่
        if (form["password"]) {
            form["password"].value = "";
        }
        return false;
    }
}