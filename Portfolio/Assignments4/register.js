// =============================================================================
// MDT312 Assignment 4 / 6 - register.js
// =============================================================================

window.onload = pageLoad;

function pageLoad() {
    const form = document.getElementById("myRegister");
    if (form) {
        form.onsubmit = validateForm;
    }
}

function validateForm(event) {
    const errorMsg = document.getElementById("errormsg");
    const form = document.forms["myRegister"];

    // ดึงค่าจากฟอร์มให้ครบทุกช่องเพื่อป้องกันข้อผิดพลาด ReferenceError
    const firstname = form["firstname"] ? form["firstname"].value.trim() : "";
    const lastname = form["lastname"] ? form["lastname"].value.trim() : "";
    const gender = form["gender"] ? form["gender"].value : "";
    const bday = form["bday"] ? form["bday"].value : "";
    const email = form["email"] ? form["email"].value.trim() : "";
    
    const username = form["username"] ? form["username"].value.trim() : "";
    const passwords = form["password"];
    const password = passwords && passwords[0] ? passwords[0].value : "";
    const retypePassword = passwords && passwords[1] ? passwords[1].value : "";

    // 1. ตรวจสอบว่ากรอกข้อมูลครบทุกช่องหรือไม่
    if (!firstname || !lastname || !gender || !bday || !email || !username || !password || !retypePassword) {
        if (errorMsg) errorMsg.innerHTML = "กรุณากรอกข้อมูลให้ครบทุกช่อง";
        if (event) event.preventDefault();
        return false;
    }

    // 2. ตรวจสอบว่า Password ทั้ง 2 ช่องตรงกันหรือไม่
    if (password !== retypePassword) {
        if (errorMsg) errorMsg.innerHTML = "รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง";
        if (event) event.preventDefault();
        return false;
    }

    // 3. เคลียร์ข้อความแจ้งเตือนเมื่อผ่านการตรวจสอบ
    if (errorMsg) errorMsg.innerHTML = "";

    // 4. บันทึกข้อมูลลงใน localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login");

    // 5. ล้างฟอร์มและนำทางไปหน้า login.html
    form.reset();
    if (event) event.preventDefault();
    window.location.href = "login.html";
    return true;
}