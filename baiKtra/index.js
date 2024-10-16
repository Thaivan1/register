function validateName(name) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
}

function validateAddress(address) {
    const regex = /\d+.*\s.*/; // Địa chỉ phải chứa số nhà và tên đường
    return regex.test(address);
}

function validatePhoneNumber(phone) {
    const regex = /^\d{10,11}$/; // Số điện thoại chỉ chứa số và có độ dài từ 10-11 ký tự
    return regex.test(phone.replace(/\s+/g, ''));
}

function validateCCCD(cccd) {
    return /^\d{12}$/.test(cccd); // CCCD phải đúng 12 ký tự số
}

function calculateFee() {
    const name = document.getElementById("fullName").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phoneNumber").value;
    const cccd = document.getElementById("cccd").value;
    const age = parseInt(document.getElementById("age").value);
    const gender = document.querySelector('input[name="gender"]:checked');
    const priority = document.getElementById("priority").checked;
    
    let hasError = false;
    
    // Kiểm tra họ và tên
    if (!validateName(name)) {
        document.getElementById("nameError").innerText = "Họ và tên không hợp lệ!";
        hasError = true;
    } else {
        document.getElementById("nameError").innerText = "";
    }

    // Kiểm tra địa chỉ
    if (!validateAddress(address)) {
        document.getElementById("addressError").innerText = "Địa chỉ phải chứa số nhà và tên đường!";
        hasError = true;
    } else {
        document.getElementById("addressError").innerText = "";
    }

    // Kiểm tra số điện thoại
    if (!validatePhoneNumber(phone)) {
        document.getElementById("phoneError").innerText = "Số điện thoại không hợp lệ!";
        hasError = true;
    } else {
        document.getElementById("phoneError").innerText = "";
    }

    // Kiểm tra CCCD
    if (!validateCCCD(cccd)) {
        document.getElementById("cccdError").innerText = "Số CCCD phải đúng 12 ký tự!";
        hasError = true;
    } else {
        document.getElementById("cccdError").innerText = "";
    }

    // Kiểm tra tuổi
    if (isNaN(age) || age < 18 || age > 150) {
        document.getElementById("ageError").innerText = "Tuổi không hợp lệ! Vui lòng nhập từ 18 đến 150.";
        hasError = true;
    } else {
        document.getElementById("ageError").innerText = "";
    }

    // Kiểm tra giới tính
    if (!gender) {
        document.getElementById("genderError").innerText = "Vui lòng chọn giới tính!";
        hasError = true;
    } else {
        document.getElementById("genderError").innerText = "";
    }

    // Nếu có lỗi, dừng tính học phí
    if (hasError) {
        return;
    }

    // Tính toán học phí
    let fee = 0;
    if (gender.value === "Nam") {
        if (age >= 18 && age <= 25) fee = 300;
        else if (age >= 26 && age <= 40) fee = 400;
        else fee = 500;
    } else if (gender.value === "Nữ") {
        if (age >= 18 && age <= 25) fee = 280;
        else if (age >= 26 && age <= 40) fee = 350;
        else fee = 450;
    }

    if (priority) fee *= 0.9;  // Giảm 10% nếu là đối tượng ưu tiên
    document.getElementById("fee").value = fee + " VND";
}

function resetForm() {
    document.getElementById("registrationForm").reset();
    document.querySelectorAll(".error-message").forEach(span => span.innerText = "");
}

function exitForm() {
    const confirmExit = confirm("Bạn có chắc chắn muốn thoát không?");
    if (confirmExit) {
        window.close();  // Đóng trang web
    }
}
