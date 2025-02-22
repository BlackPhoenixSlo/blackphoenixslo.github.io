// Configuration
const CONFIG = {
    QUESTIONS_PER_TEST: 50,  // Changed from 10 to 50 questions
   
};

import questions from './questions2.js';

// Utility function to shuffle an array (Fisher-Yates shuffle)
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Function to get random questions with shuffled answers
function getRandomQuestions() {
    // Create a deep copy of the questions array to avoid modifying the original
    const shuffledQuestions = questions.map(question => ({
        ...question,
        answers: [...question.answers] // Create a new array for answers
    }));
    
    // Shuffle the questions
    shuffle(shuffledQuestions);
    
    // Take only the first N questions and shuffle their answers
    return shuffledQuestions.slice(0, CONFIG.QUESTIONS_PER_TEST).map(question => {
        shuffle(question.answers);
        return question;
    });
}

// Get random questions for this session
let currentQuestions = getRandomQuestions();

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitBtn = document.getElementById('submitBtn');

// Generate the quiz UI
function generateQuiz() {
    const output = [];

    currentQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = currentQuestion.answers.map((answer, i) => {
            return `
                <li>
                    <label>
                        <input type="radio" name="question${questionNumber}" value="${answer.value}">
                        ${answer.text}
                    </label>
                </li>`;
        }).join('');

        output.push(`
            <div class="question-container">
                <div class="conversation">
                    <div class="role">Guy:</div>
                    <div class="line">${currentQuestion.guy}</div>
                </div>
                <div class="conversation">
                    <div class="role">Girl:</div>
                    <div class="line">${currentQuestion.girl}</div>
                </div>
                <ul class="answers">${answers}</ul>
            </div>
        `);
    });

    quizContainer.innerHTML = output.join('');
}

// Add to your existing styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .results-modal {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        z-index: 1001;
        max-width: 500px;
        width: 90%;
    }

    .results-modal.active {
        display: block;
    }

    .json-output {
        width: 100%;
        height: 60px;
        margin: 10px 0;
        padding: 5px;
        font-family: monospace;
        font-size: 12px;
        resize: none;
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
    }

    .modal-overlay.active {
        display: block;
    }

    .copy-btn {
        background: #0084ff;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
    }

    .copy-btn:hover {
        background: #0073e6;
    }

    .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #666;
    }

    .tutorial-btn {
        position: fixed;
        top: 15px;
        right: 15px;
        padding: 8px 15px;
        background-color: #0084ff;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 16px;
        z-index: 1000;
    }

    .tutorial-window {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        z-index: 1001;
    }

    .tutorial-window.active {
        display: block;
    }

    .tutorial-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
    }

    .tutorial-overlay.active {
        display: block;
    }

    .close-tutorial {
        position: sticky;
        top: 0;
        float: right;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }

    .example-question {
        margin: 20px 0;
        padding: 15px;
        background: #f5f5f5;
        border-radius: 8px;
    }

    #submitBtn {
        background-color: #0084ff;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 20px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        margin: 20px auto;
        display: block;
        min-width: 200px;
    }

    #submitBtn:hover {
        background-color: #0073e6;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    #submitBtn:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    #submitBtn:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    .submit-container {
        text-align: center;
        padding: 20px;
        margin-top: 20px;
        border-top: 1px solid #eee;
    }
`;
document.head.appendChild(styleSheet);

// Add modal HTML to the document
document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-overlay" id="resultsOverlay"></div>
    <div class="results-modal" id="resultsModal">
        <button class="close-modal" id="closeModal">×</button>
        <h2>Test Results</h2>
        <div id="modalResults"></div>
        <textarea class="json-output" id="jsonOutput" readonly></textarea>
        <button class="copy-btn" id="copyBtn">Copy Results</button>
    </div>
`);

// Add tutorial button and window to the document
document.body.insertAdjacentHTML('beforeend', `
    <button class="tutorial-btn" id="tutorialBtn">How to Play</button>
    <div class="tutorial-overlay" id="tutorialOverlay"></div>
    <div class="tutorial-window" id="tutorialWindow">
        <button class="close-tutorial" id="closeTutorial">×</button>
        <h2>English Comprehension Test</h2>
        <div class="tutorial-content">
            <p><strong>Welcome to the English Comprehension Test!</strong></p>
            
            <p>🎯 <strong>Purpose:</strong> This test will evaluate your understanding of English conversations and context.</p>
            
            <p>📝 <strong>How it works:</strong></p>
            <ul>
                <li>You will see ${CONFIG.QUESTIONS_PER_TEST} different conversation snippets</li>
                <li>For each conversation, choose the most appropriate response</li>
                <li>Each answer has different points based on how appropriate it is</li>
                <li>Click "Show Results" when you've answered all questions</li>
                <li>Your total score will show how well you understand English conversation context</li>
            </ul>

            <div class="example-question" id="exampleQuestion">
                <!-- Interactive example will be inserted here -->
            </div>

            <p>✨ <strong>Scoring:</strong></p>
            <ul>
                <li>Best answer: +2 points</li>
                <li>Good answer: +1 point</li>
                <li>Inappropriate answer: -1 point</li>
            </ul>

            <p>💡 <strong>Tips:</strong></p>
            <ul>
                <li>Read both messages carefully</li>
                <li>Consider the context and tone</li>
                <li>Think about natural conversation flow</li>
                <li>Pay attention to emojis and expressions</li>
            </ul>

            <p><strong>Ready to start?</strong> Read each conversation carefully and select the most appropriate response. Good luck!</p>
        </div>
    </div>
`);

// Update showResults function
function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let totalScore = 0;
    let totalQuestions = currentQuestions.length;
    let answeredQuestions = 0;
    let questionResponses = [];

    currentQuestions.forEach((currentQuestion, questionNumber) => {
        const selected = answerContainers[questionNumber].querySelector('input[name=question'+questionNumber+']:checked');
        let questionResponse = {
            question: {
                guy: currentQuestion.guy,
                girl: currentQuestion.girl
            },
            possibleAnswers: currentQuestion.answers.map(a => ({
                text: a.text,
                value: a.value
            })),
            selectedAnswer: null,
            score: 0
        };

        if (selected) {
            const selectedValue = parseInt(selected.value, 10);
            totalScore += selectedValue;
            answeredQuestions++;
            questionResponse.selectedAnswer = {
                text: selected.parentElement.textContent.trim(),
                value: selectedValue
            };
            questionResponse.score = selectedValue;
        }

        questionResponses.push(questionResponse);
    });

    const results = {
        summary: {
            totalScore,
            questionsAnswered: answeredQuestions,
            totalQuestions,
            percentageComplete: Math.round((answeredQuestions / totalQuestions) * 100),
            averageScore: answeredQuestions > 0 ? Math.round(totalScore / answeredQuestions * 10) / 10 : 0,
            timestamp: new Date().toISOString()
        },
        details: questionResponses
    };

    // Show modal with results
    const modal = document.getElementById('resultsModal');
    const overlay = document.getElementById('resultsOverlay');
    const modalResults = document.getElementById('modalResults');
    const jsonOutput = document.getElementById('jsonOutput');

    modalResults.innerHTML = `
        <p>Score: ${results.summary.totalScore}</p>
        <p>Questions Completed: ${results.summary.questionsAnswered}/${results.summary.totalQuestions}</p>
        <p>Completion Rate: ${results.summary.percentageComplete}%</p>
        <p>Average Score per Question: ${results.summary.averageScore}</p>
    `;

    // Pretty print JSON with indentation
    jsonOutput.value = JSON.stringify(results, null, 2);
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Add event listeners for modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('resultsModal').classList.remove('active');
    document.getElementById('resultsOverlay').classList.remove('active');
});

document.getElementById('copyBtn').addEventListener('click', () => {
    const jsonOutput = document.getElementById('jsonOutput');
    jsonOutput.select();
    document.execCommand('copy');
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
        copyBtn.textContent = 'Copy Results';
    }, 2000);
});

// Close modal when clicking overlay
document.getElementById('resultsOverlay').addEventListener('click', () => {
    document.getElementById('resultsModal').classList.remove('active');
    document.getElementById('resultsOverlay').classList.remove('active');
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('resultsModal').classList.remove('active');
        document.getElementById('resultsOverlay').classList.remove('active');
    }
});

// Function to reset and get new questions
function resetQuiz() {
    currentQuestions = getRandomQuestions();
    generateQuiz();
    resultsContainer.classList.add('hidden');
}

// On load, generate quiz
generateQuiz();

// On submit, show results
submitBtn.addEventListener('click', showResults);

// Add reset functionality if you have a reset button
const resetBtn = document.getElementById('resetBtn');
if (resetBtn) {
    resetBtn.addEventListener('click', resetQuiz);
}

// Function to update example question
function updateExampleQuestion() {
    // Get a random question from the main questions array
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    
    // Create the example question HTML
    document.getElementById('exampleQuestion').innerHTML = `
        <p><strong>Try this example question:</strong></p>
        <div class="conversation">
            <div class="role">Guy:</div>
            <div class="line">${randomQuestion.guy}</div>
        </div>
        <div class="conversation">
            <div class="role">Girl:</div>
            <div class="line">${randomQuestion.girl}</div>
        </div>
        <p><strong>Choose your response:</strong></p>
        <ul style="list-style: none; padding-left: 0;">
            ${randomQuestion.answers.map((answer, index) => `
                <li style="margin: 8px 0;">
                    <label style="display: flex; align-items: center; cursor: pointer;">
                        <input type="radio" name="tutorial-example" value="${answer.value}" style="margin-right: 10px;">
                        ${answer.text}
                    </label>
                </li>
            `).join('')}
        </ul>
        <button id="checkTutorialAnswer" class="copy-btn" style="margin-top: 15px;">Check Answer</button>
        <div id="tutorialResult" style="margin-top: 15px; display: none;"></div>
    `;

    // Add event listener for the check answer button
    document.getElementById('checkTutorialAnswer').addEventListener('click', () => {
        const selected = document.querySelector('input[name="tutorial-example"]:checked');
        const resultDiv = document.getElementById('tutorialResult');
        
        if (!selected) {
            resultDiv.innerHTML = `<p style="color: #ff6b6b;">Please select an answer first!</p>`;
            resultDiv.style.display = 'block';
            return;
        }

        const selectedValue = parseInt(selected.value);
        let resultMessage = '';
        let resultColor = '';

        if (selectedValue === 2) {
            resultMessage = '✨ Excellent choice! This is the best response (+2 points)';
            resultColor = '#00c853';
        } else if (selectedValue === 1) {
            resultMessage = '👍 Good answer! This is an acceptable response (+1 point)';
            resultColor = '#2196f3';
        } else {
            resultMessage = '❌ This response could be improved. Try to be more engaging (-1 point)';
            resultColor = '#ff6b6b';
        }

        resultDiv.innerHTML = `
            <p style="color: ${resultColor}; font-weight: bold;">${resultMessage}</p>
            <button id="tryAnotherExample" class="copy-btn" style="margin-top: 10px;">Try Another Example</button>
        `;
        resultDiv.style.display = 'block';

        // Add event listener for trying another example
        document.getElementById('tryAnotherExample').addEventListener('click', () => {
            updateExampleQuestion();
        });
    });
}

// Add tutorial functionality
const tutorialBtn = document.getElementById('tutorialBtn');
const tutorialWindow = document.getElementById('tutorialWindow');
const tutorialOverlay = document.getElementById('tutorialOverlay');
const closeTutorial = document.getElementById('closeTutorial');

function toggleTutorial() {
    tutorialWindow.classList.toggle('active');
    tutorialOverlay.classList.toggle('active');
    if (tutorialWindow.classList.contains('active')) {
        updateExampleQuestion();
    }
}

tutorialBtn.addEventListener('click', toggleTutorial);
closeTutorial.addEventListener('click', toggleTutorial);
tutorialOverlay.addEventListener('click', toggleTutorial);

// Close tutorial with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tutorialWindow.classList.contains('active')) {
        toggleTutorial();
    }
});

// Update the submit button HTML if needed
if (submitBtn) {
    submitBtn.className = 'submit-btn';
    submitBtn.innerHTML = 'Show Results';
    
    // Wrap button in container if not already wrapped
    if (!submitBtn.parentElement.classList.contains('submit-container')) {
        const container = document.createElement('div');
        container.className = 'submit-container';
        submitBtn.parentNode.insertBefore(container, submitBtn);
        container.appendChild(submitBtn);
    }
} 