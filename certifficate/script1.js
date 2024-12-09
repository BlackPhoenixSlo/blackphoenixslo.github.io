// Array of simps (chat participants)
const simps = [
    {
      name: "Lily 🌸",
      avatar: "https://i.pravatar.cc/150?img=1",
      lines: [
        "Hey there! How's your day going?",
        "I just saw your latest post, it's amazing!",
        "Can't wait to chat more with you 😊",
        "Do you have any plans for the weekend?",
        "You're so talented!",
        "What's your favorite hobby?",
        "I love your sense of style!",
        "Tell me more about yourself.",
        "You're truly inspiring!",
        "Looking forward to our next conversation."
      ]
    },
    {
      name: "Mia 💖",
      avatar: "https://i.pravatar.cc/150?img=2",
      lines: [
        "Hello! 😊",
        "Your profile caught my eye.",
        "How do you spend your free time?",
        "You have a beautiful smile!",
        "What's your favorite book?",
        "I enjoy our chats so much!",
        "Do you like movies? Which ones?",
        "You're so kind and thoughtful.",
        "Let's plan something fun together!",
        "Can't wait to hear from you again."
      ]
    },
    {
      name: "Sophia 🌺",
      avatar: "https://i.pravatar.cc/150?img=3",
      lines: [
        "Hi! How are you today?",
        "Your content is always on point!",
        "What's your favorite music genre?",
        "I admire your dedication!",
        "Do you like traveling?",
        "You're a great listener.",
        "What's your favorite food?",
        "I love our conversations!",
        "You're so creative!",
        "Looking forward to more chats!"
      ]
    },
    {
      name: "Emma 💕",
      avatar: "https://i.pravatar.cc/150?img=4",
      lines: [
        "Good day! 😊",
        "Your posts always make me smile.",
        "What's your favorite sport?",
        "You're incredibly talented!",
        "Do you have any pets?",
        "I enjoy talking with you.",
        "What's your dream destination?",
        "You're so supportive!",
        "Let's stay connected!",
        "Can't wait to chat again."
      ]
    },
    {
      name: "Olivia 🌼",
      avatar: "https://i.pravatar.cc/150?img=5",
      lines: [
        "Hey! How's everything?",
        "Your latest photo is stunning!",
        "What's your favorite movie?",
        "You're so interesting!",
        "Do you enjoy reading?",
        "I love our interactions!",
        "What's your favorite season?",
        "You're so positive!",
        "Let's share more stories!",
        "Looking forward to our next chat."
      ]
    }
  ];
  
  // Normalize fancy quotes and ellipses to ASCII
  function normalizeText(text) {
    return text
      .replace(/’/g, "'")
      .replace(/‘/g, "'")
      .replace(/“/g, '"')
      .replace(/”/g, '"')
      .replace(/…/g, '...')
      .replace(/—/g, '-'); 
  }
  
  // Initialize variables
  const chatList = document.getElementById('chatList');
  const messages = document.getElementById('messages');
  const inputArea = document.getElementById('inputArea');
  const sendBtn = document.getElementById('sendBtn');
  const startBtn = document.getElementById('startBtn');
  const endBtn = document.getElementById('endBtn');
  const newTextBtn = document.getElementById('newTextBtn');
  const results = document.getElementById('results');
  const timerDisplay = document.getElementById('timer');
  const topBtn = document.getElementById('topBtn');
  const typingIndicator = document.getElementById('typingIndicator');
  const instruction = document.getElementById('instruction');
  
  let currentChat = null;
  let currentExpectedText = "";
  let startTime;
  let timerRunning = false;
  let timeLeft = 60;
  let timerInterval = null;
  let totalTyped = 0;
  let correctTyped = 0;
  
  // Generate chat list
  simps.forEach((simp, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${simp.avatar}" alt="${simp.name}"><span>${simp.name}</span>`;
    li.addEventListener('click', () => selectChat(index));
    chatList.appendChild(li);
  });
  
  // Select a chat
  function selectChat(index) {
    const liItems = chatList.querySelectorAll('li');
    liItems.forEach((li, idx) => {
      if(idx === index) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  
    currentChat = simps[index];
    displayMessage("Click 'Start Test' to begin.", 'system');
  
    // Clear previous messages and instructions
    messages.innerHTML = '';
    instruction.style.display = 'none';
    displayMessage("Hello! Ready to chat with me?", 'system');
    inputArea.disabled = false;
    sendBtn.disabled = false;
    inputArea.focus();
  }
  
  // Display a message in the chat
  function displayMessage(text, sender='system') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
  }
  
  // Start the typing test
  function startTest() {
    if(!currentChat) {
      alert("Please select a chat to start the test.");
      return;
    }
  
    // Reset variables
    messages.innerHTML = '';
    instruction.style.display = 'none';
    displayMessage(`Hello! Let's start our chat. You have ${timeLeft} seconds.`, 'system');
    inputArea.value = '';
    inputArea.disabled = false;
    sendBtn.disabled = false;
    inputArea.focus();
    startTime = Date.now();
    timerRunning = true;
    timeLeft = 60;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    results.style.display = 'none';
    startBtn.style.display = 'none';
    endBtn.style.display = 'inline-block';
    newTextBtn.style.display = 'none';
    totalTyped = 0;
    correctTyped = 0;
    currentExpectedText = "";
  
    // Start timer
    timerInterval = setInterval(()=>{
      timeLeft--;
      timerDisplay.textContent = `Time: ${timeLeft}s`;
      if(timeLeft <= 0) {
        finishTest();
      }
    }, 1000);
    SimpfirstsendMessage();
  }
  
  // Finish the typing test
  function finishTest(endEarly=false) {
    timerRunning = false;
    inputArea.disabled = true;
    sendBtn.disabled = true;
    clearInterval(timerInterval);
    typingIndicator.style.display = 'none';
    const endTime = Date.now();
    const elapsed = (endTime - startTime)/1000;
    if(!endEarly) {
      timerDisplay.textContent = "Time's up!";
    } else {
      timerDisplay.textContent = `Ended early at ${Math.round(elapsed)}s`;
    }
  
    // Calculate WPM and Accuracy
    const wpm = elapsed > 0 ? Math.round((totalTyped / elapsed) * 60 / 5) : 0; // Assuming average word length of 5
    const accuracy = totalTyped > 0 ? Math.round((correctTyped / totalTyped) * 100) : 0;
  
    results.innerHTML = `
      <p>You typed <strong>${totalTyped}</strong> characters with <strong>${correctTyped}</strong> correct.</p>
      <p><strong>WPM:</strong> ${wpm}</p>
      <p><strong>Accuracy:</strong> ${accuracy}%</p>
      <p>Feel free to try again or select a new chat.</p>
    `;
    results.style.display = 'block';
    endBtn.style.display = 'none';
    newTextBtn.style.display = 'inline-block';
  }
  
  // Send user's message
  function sendMessage() {
    if(!timerRunning) return;
    const userInput = normalizeText(inputArea.value.trim());
    if(userInput === '') return;
  
    // Calculate typing stats
    totalTyped += userInput.length;
    correctTyped += calculateCorrectCharacters(userInput, currentExpectedText);
  
    displayMessage(userInput, 'user');
    inputArea.value = '';
  
    // Simulate simp's response after a short delay
    typingIndicator.style.display = 'block';
    setTimeout(() => {
      typingIndicator.style.display = 'none';
      const responseIndex = Math.floor(Math.random() * currentChat.lines.length);
      const response = currentChat.lines.splice(responseIndex, 1)[0];
      displayMessage(response, 'system');
  
      // Set the expected text for the user to type
      currentExpectedText = normalizeText(response);
      showInstruction("Please type the above message to continue.");
    }, 1500); // 1.5 seconds delay
  }

  function SimpfirstsendMessage(){

    
  
    // Simulate simp's response after a short delay
    typingIndicator.style.display = 'block';
    setTimeout(() => {
      typingIndicator.style.display = 'none';
      const responseIndex = Math.floor(Math.random() * currentChat.lines.length);
      const response = currentChat.lines.splice(responseIndex, 1)[0];
      displayMessage(response, 'system');
  
      // Set the expected text for the user to type
      currentExpectedText = normalizeText(response);
      showInstruction("Please type the above message to continue.");
    }, 1500); // 1.5 seconds delay
  
  }
  
  // Calculate correct characters by comparing user input with expected text
  function calculateCorrectCharacters(userInput, expectedText) {
    let correct = 0;
    const minLength = Math.min(userInput.length, expectedText.length);
    for(let i = 0; i < minLength; i++) {
      if(userInput[i].toLowerCase() === expectedText[i].toLowerCase()) {
        correct++;
      }
    }
    return correct;
  }
  
  // Show instructional prompt
  function showInstruction(text) {
    instruction.textContent = text;
    instruction.style.display = 'block';
    inputArea.focus();
  }
  
  // End the test early
  function endTestEarly() {
    finishTest(true);
  }
  
  // Get a new test (reset)
  function getNewTest() {
    results.style.display = 'none';
    newTextBtn.style.display = 'none';
    startBtn.style.display = 'inline-block';
    endBtn.style.display = 'none';
    timerDisplay.textContent = `Time: 60s`;
    // Reset the simps' lines by resetting to original lines
    resetSimpsLines();
    // Clear messages and instructions
    messages.innerHTML = '';
    instruction.style.display = 'none';
    displayMessage("Select a chat from the sidebar and click 'Start Test' to begin.", 'system');
    currentChat = null;
    currentExpectedText = "";
    
    const liItems = chatList.querySelectorAll('li');
    liItems.forEach(li => li.classList.remove('active'));
    
  }
  
  // Reset simps' lines to original
  function resetSimpsLines() {
    simps.forEach(simp => {
      simp.lines = simp.originalLines.slice();
    });
  }
  
  // Initialize simps' original lines
  function initializeSimps() {
    simps.forEach(simp => {
      simp.originalLines = simp.lines.slice();
    });
  }
  
  initializeSimps();
  
  // Input area event listeners
  sendBtn.addEventListener('click', sendMessage);
  inputArea.addEventListener('keypress', (e) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Control buttons
  startBtn.addEventListener('click', startTest);
  endBtn.addEventListener('click', endTestEarly);
  newTextBtn.addEventListener('click', getNewTest);
  
  // Top button functionality
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 100) {
      topBtn.style.display = 'block';
    } else {
      topBtn.style.display = 'none';
    }
  });
  
  topBtn.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior:'smooth'});
  });
  
  // Initial display
  displayMessage("Select a chat from the sidebar and click 'Start Test' to begin.", 'system');
  