let rowElement = document.querySelector('.row')
let submitElement = document.querySelector('.submit')
let containerElement = document.querySelector('.container')
let rootElement = document.querySelector('.root')
let rootContainerElement
let overallRow = `<label for="totalCredits">Tổng số tín chỉ:</label>
<input type="number" name="totalCredits" class="totalCredits" disabled><label for="all-overall">Tổng điểm trung bình:</label>
<input type="number" name="all-overall" class="all-overall" disabled><label for="totalOverall">Điểm trung bình:</label>
<input type="number" name="totalOverall" class="totalOverall" disabled><button class="solve">Solve</button>`
rowElement.onkeypress = (e) => {
    let rows = rowElement.value
    if (e.keyCode == 13) {
        containerElement.innerHTML = overallRow
        let htmls = []
        for (i = 0; i < rows; i++) {
            htmls.push(`<div class="root-container">
            <label for="subject">Môn:</label>
        <input type="text" class=${'subject'+i} name="subject">
        <label for="mark">Điểm:</label>
        <input type="number" name="mark" class=${'mark'+i}>
        <label for="grade">Loại:</label>
        <input type="text" class=${'grade'+i} name="grade" disabled>
        <label for="credits">Số tín chỉ:</label>
        <input type="number" name="credits" class=${'credits'+i}>
        <label for="overall">Điểm trung bình:</label>
        <input type="number" name="overall" class=${'overall'+i} disabled>
            </div>`)
        }
        let html = htmls.join('')
        rootElement.innerHTML = `${html}`
        rootContainerElement = document.querySelectorAll('.root-container')
        let solveBtn = document.querySelector('.solve')
        solveBtn.onclick = handleSubmitClick
    }
}
rowElement.oninput = (e) => {
    let rows = rowElement.value
    submitElement.onclick = () => {
        containerElement.innerHTML = overallRow
        let htmls = []
        for (i = 0; i < rows; i++) {
            htmls.push(`<div class="root-container">
            <label for="subject">Môn:</label>
        <input type="text" class=${'subject'+i} name="subject">
        <label for="mark">Điểm:</label>
        <input type="number" name="mark" class=${'mark'+i}>
        <label for="grade">Loại:</label>
        <input type="text" class=${'grade'+i} name="grade" disabled>
        <label for="credits">Số tín chỉ:</label>
        <input type="number" name="credits" class=${'credits'+i}>
        <label for="overall">Điểm trung bình:</label>
        <input type="number" name="overall" class=${'overall'+i} disabled>
            </div>`)
        }
        let html = htmls.join('')
        rootElement.innerHTML = `${html}`
        let solveBtn = document.querySelector('.solve')
        solveBtn.onclick = handleSubmitClick
        
    }
}

function handleSubmitClick() {
    rootContainerElement = document.querySelectorAll('.root-container')
    let totalOverallElement = document.querySelector('.totalOverall')
    let totalCreditsElement = document.querySelector('.totalCredits')
    let allOverallElement = document.querySelector('.all-overall')
    let totalOverall = 0
    let totalCreadits = 0
    let allOverall = 0
    for (let i = 0; i < rootContainerElement.length; i++) {
        let markElement = document.querySelector(`.mark${i}`)
        let gradeElement = document.querySelector(`.grade${i}`)
        let creditsElement = document.querySelector(`.credits${i}`)
        let overallElement = document.querySelector(`.overall${i}`)
        let mark = markElement.value
        let grade = checkMark(mark)
        gradeElement.value = grade
        let credits = creditsElement.value
        let marks = changeGradetoMark(grade)
        overallElement.value = marks * credits
        allOverall += Number(overallElement.value)
        totalCreadits += Number(credits)
    }
    totalOverall = allOverall / totalCreadits
    allOverallElement.value = allOverall
    totalCreditsElement.value = totalCreadits
    totalOverallElement.value = totalOverall
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

