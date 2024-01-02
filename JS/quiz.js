
// declare array to store all the quiz answers
let allAnswers = [];

function submitQuiz(event) {
    // Prevent default form submission
    event.preventDefault();

    // Get selected answers from the quiz
    const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked');
    const answersArray = Array.from(selectedAnswers).map(answer => Number(answer.value));

    // Check if all questions are answered
    const totalQuestions = 4;
    if (selectedAnswers.length < totalQuestions) {
        alert('Please answer all questions before moving to the next page.');
        return;
    }

    // Check if selected options are unique
    if (!areOptionsUnique(answersArray)) {
        alert('Please make sure each question has a unique answer.');
        return;
    }

    // Determine which page the quiz is on and store answers in session storage
    const currentPageIndex = parseInt(document.title.split(' ')[2]) - 1;
    console.log(currentPageIndex, " ", document.title.split(' '));
    sessionStorage.setItem(`quizPage${currentPageIndex}`, JSON.stringify(answersArray));
    // Redirect to the next quiz page or result page
    const nextPageIndex = currentPageIndex + 1;
    if (nextPageIndex <= 10) {
        window.location.href = `./quiz${nextPageIndex + 1}.html`;
    } else {
        window.location.href = './Result.html';
    }
}

const table = document.querySelector('#centeredTable'); // Select the existing table in the HTML document

if (table) { // Check if the table exists (not null or undefined)
    const tbody = document.createElement('tbody'); // Create a new tbody element

    // Testing:
    /* window.sessionStorage.setItem('quizPage0', '[2, 3, 4, 1]');
    window.sessionStorage.setItem('quizPage1', '[2, 1, 4, 3]');
    window.sessionStorage.setItem('quizPage2', '[3, 1, 2, 4]');
    window.sessionStorage.setItem('quizPage3', '[1, 4, 3, 2]');
    window.sessionStorage.setItem('quizPage4', '[3, 2, 1, 4]');
    window.sessionStorage.setItem('quizPage5', '[4, 3, 2, 1]');
    window.sessionStorage.setItem('quizPage6', '[2, 1, 4, 3]');
    window.sessionStorage.setItem('quizPage7', '[1, 4, 3, 2]');
    window.sessionStorage.setItem('quizPage8', '[4, 2, 1, 3]');
    window.sessionStorage.setItem('quizPage9', '[3, 1, 2, 4]');
    window.sessionStorage.setItem('quizPage10', '[4, 1, 3, 2]'); */

    for (let i = 0; i < 11; i++) {
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        // Retrieve answers from session storage
        const storedAnswers = sessionStorage.getItem(`quizPage${i}`);
        const answersArray = storedAnswers ? JSON.parse(storedAnswers) : null;

        // Display page number and answers in separate columns
        cell1.textContent = `Page ${i + 1}`;
        if (answersArray) {
            for (let j = 0; j < answersArray.length; j++) {
                const questionIndex = j + 1;
                const answerText = answersArray[j] || 'N/A';
                const columnName = String.fromCharCode(65 + j); // Convert 0 to 'A', 1 to 'B', and so on
                // row.cells[j + 1].textContent = `${columnName}${questionIndex}: ${answerText}`;
                row.cells[j + 1].textContent = `${answerText}`;
            }
        }
    }

    const lastRow = tbody.insertRow();
    const totalCell = lastRow.insertCell(0);
    totalCell.textContent = 'Total';

    const columnTotals = []; // Array to store total values for each column

    for (let j = 1; j <= 4; j++) {
        const columnName = String.fromCharCode(64 + j); // Convert 1 to 'A', 2 to 'B', and so on
        const totalValue = calculateColumnTotal(tbody, j);
        lastRow.insertCell(j).textContent = `${totalValue}`;

        // Push column totals outside the loop
        columnTotals.push({ columnName, totalValue });
    }


    // Sort the columnTotals array in descending order based on total values
    const copyArray = [...columnTotals]
    copyArray.sort((a, b) => b.totalValue - a.totalValue);
    // console.log(columnTotals);
    // console.log(copyArray);

    // Add another row for ranking
    const rankingRow = tbody.insertRow();
    const rankingCell = rankingRow.insertCell(0);
    rankingCell.textContent = 'Ranking';

    // Display the ranking for each column
    const rankingNames = ["1st", "2nd", "3rd", "4th"];

    const rankingObject = {};

    /* for (let k = 1; k <= 4; k++) {
        const columnName = String.fromCharCode(64 + k); // Convert 1 to 'A', 2 to 'B', and so on
        const columnIndex = k;
        const rankIndex = columnTotals.findIndex((column) => column.totalValue === columnName);
        const rank = rankIndex !== -1 ? rankingNames[rankIndex] : ''; // Use rankNames for 1st, 2nd, 3rd, 4th
        console.log(rankIndex);
        rankArray.push(rank);
        rankingRow.insertCell(columnIndex).textContent = rank;
    } */

    const suffix = ['st', 'nd', 'rd', 'th'];

    let rankingCount = 1;
    for (let i of columnTotals) {
        // console.log(i);

        if (!(i.totalValue in rankingObject)) {
            rankingObject[i.totalValue] = `${rankingCount}${suffix[rankingCount - 1]}`;
            rankingCount++;
        }
    }

    console.log(rankingObject);

    const rankArray = columnTotals.map(function (value, index) {
        return rankingObject[value.totalValue];
    });

    // console.log(rankArray);

    rankArray.forEach(function (value, index) {
        rankingRow.insertCell().textContent = `${value}`;
    });

    const colors = ["Orange", "Green", "Blue", "Gold"];

    const rankObject = {
        first: [],
        second: [],
    }

    rankArray.forEach(function (value, index) {
        if (value === "1st") {
            rankObject.first.push(colors[index]);
        }
        else if (value === "2nd") {
            rankObject.second.push(colors[index]);
        }
    })

    // console.log(rankObject);

    const final_description = document.getElementById('final_description');

    final_description.innerHTML = `Your First Color: ${rankObject.first.join(', ')}.<br> Your Second Color: ${rankObject.second.join(' ,')}`

    table.appendChild(tbody); // Append the dynamically created tbody to the existing table
}


/* else {
    console.error('Table element not found'); // Log an error if the table element is not found
} */

// Calculate the sum for a specific column in the table
function calculateColumnTotal(tbody, columnIndex) {

    let total = 0;
    for (let i = 0; i < tbody.rows.length - 1; i++) {
        const cellValue = parseInt(tbody.rows[i].cells[columnIndex].textContent) || 0;
        total += cellValue;
    }
    return total;
}

function areOptionsUnique(options) {
    // Check if all selected options are unique
    return new Set(options).size === options.length;
}