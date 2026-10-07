window.onload = pageLoad;

function pageLoad() {
    let xhr = new XMLHttpRequest();
    // ดึงไฟล์ assignments.json ของเราแทน
    xhr.open("GET", "assignments.json");
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            showAssignments(data);
        }
    };
    
    xhr.send();
}

function showAssignments(data) {
    const container = document.getElementById("assignment-list");
    if (!container) return;

    container.innerHTML = ""; // ล้างข้อมูลเดิมออกก่อน

    for (let i = 0; i < data.length; i++) {
        // 1. สร้างการ์ดลิงก์ <a>
        let card = document.createElement("a");
        card.className = "assignment-card";
        card.href = data[i].link;

        // 2. สร้างลำดับเลข <span>
        let numSpan = document.createElement("span");
        numSpan.className = "num";
        numSpan.textContent = data[i].id;

        // 3. สร้างส่วนข้อความ <div>
        let textDiv = document.createElement("div");
        
        let title = document.createElement("h3");
        title.textContent = data[i].title;

        let desc = document.createElement("p");
        desc.textContent = data[i].desc;

        textDiv.appendChild(title);
        textDiv.appendChild(desc);

        // นำ Element ย่อยใส่การ์ดหลัก
        card.appendChild(numSpan);
        card.appendChild(textDiv);

        // นำการ์ดไปแสดงบนหน้าเว็บ
        container.appendChild(card);
    }
}