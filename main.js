// Lấy số hàng từ input
let rowElement = document.querySelector('.page__row');
let row;

rowElement.oninput = () => {
    row = rowElement.value;
}

// Xử lí submit btn onclick
let submitElement = document.querySelector('.page__btn');
let pageElement = document.querySelector('.page');
let subPageElement = document.querySelector('.sub-page') 
let bodyElement = document.querySelector('body')
let overallContainerElement = document.querySelector('.overall-container')

submitElement.onclick = () => {
    if (row != undefined) {
        pageElement.innerHTML = '';
        let htmls = [];
        for (let i = 0; i < row; i++) {
            htmls.push(`
            <div class="sub-page__container">
            <label for="subject${i}">Môn:</label>
            <input type="text" class="subject${i}" placeholder="Môn" name="subject${i}">
            <label for="mark${i}">Điểm:</label>
            <input type="number" name="mark${i}" class="mark${i}" placeholder="Nhập điểm">
            <label for="grade${i}">Loại:</label>
            <input type="text" class="grade${i}" placeholder="Loại" name="grade${i}" disabled>
            <label for="credits${i}">Số tín chỉ:</label>
            <input type="number" name="credits${i}" class="credits${i}" placeholder="Nhập số tín chỉ">
            <label for="overall${i}">Điểm trung bình:</label>
            <input type="number" name="overall${i}" class="overall${i}" placeholder="Điểm trung bình" disabled>
            </div>
            `);
        }
        let html = htmls.join('');
        bodyElement.style.display = "block";
        subPageElement.innerHTML = html;
        overallContainerElement.innerHTML = `<label for="totalCredit">Tổng số tín chỉ</label>
        <input type="number" name="totalCredit" class="totalCredit" disabled>
        <label for="totalMark">Tổng điểm trung bình</label>
        <input type="number" name="totalMark" class="totalMark" disabled>
        <label for="totalOverall">Điểm trung bình</label>
        <input type="number" name="totalOverall" class="totalOverall" disabled>
        <button class="btn btn-success overall-container__btn">Tính</button>`;

        let overallContainerButton = document.querySelector('.overall-container__btn');
        overallContainerButton.onclick = () => {
            let totalCreditElement = document.querySelector('.totalCredit');
            let totalMarkElement = document.querySelector('.totalMark');
            let totalOverallElement = document.querySelector('.totalOverall');
            let totalCredit = 0, totalMark = 0;
            for (let i = 0; i < row; i++) {
                let markElement = document.querySelector(`.mark${i}`);
                let gradeElement = document.querySelector(`.grade${i}`);
                let creditElement = document.querySelector(`.credits${i}`);
                let overallElement = document.querySelector(`.overall${i}`);
                let mark = markElement.value;
                let grade = checkMark(mark);
                gradeElement.value = grade;
                let overall = changeGradetoMark(gradeElement.value) * creditElement.value;
                overallElement.value = overall;
                totalCredit += Number(creditElement.value);
                totalMark += overall;
            }

            totalCreditElement.value = totalCredit;
            totalMarkElement.value = totalMark;
            totalOverallElement.value = totalMark / totalCredit;
        }
    } else {
        alert('Xin hãy nhập số dòng')
    }
}

function checkMark(mark) {
    if (mark > 10) {
        return 'Error'
    } else if (mark >= 9) {
        return 'A'
    } else if (mark >= 8) {
        return 'B+'
    } else if (mark >= 7) {
        return 'B'
    } else if (mark >= 6.5) {
        return 'C+'
    } else if (mark >= 5.5) {
        return 'C'
    } else if (mark >= 5) {
        return 'D+'
    } else if (mark >= 4){
        return 'D'
    } else if (mark >= 3){
        return 'F+'
    } else if (mark < 3){
        return 'F'
    }
}

function changeGradetoMark(grade) {
    let output = 0
    if (grade == 'A') {
        output = 4
    } else if (grade == 'B+') {
        output = 3.5
    } else if (grade == 'B') {
        output = 3
    } else if (grade == 'C+') {
        output = 2.5
    } else if (grade == 'C') {
        output = 2
    } else if (grade == 'D+') {
        output = 1.5
    } else if (grade == 'D') {
        output = 1
    } else if (grade == 'F+') {
        output = 0.5
    } else if (grade == 'F') {
        output = 0
    }
    return output
}
