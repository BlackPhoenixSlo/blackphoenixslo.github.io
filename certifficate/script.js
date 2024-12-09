 // Array of simps (chat participants)
 const simps = [
    {
        name: "Ethan 🌟",
        avatar: "https://i.pravatar.cc/150?img=6",
        lines: [
            "Hey, how was your day?",
            "You looked amazing in your latest post.",
            "Do you enjoy going on adventures?",
            "What kind of music do you love?",
            "I feel like you have the best energy.",
            "Do you prefer coffee or tea?",
            "What’s something random that makes you smile?",
            "Can you tell me about your favorite memory?",
            "Are you more of a morning or night person?",
            "Do you like planning things, or are you more spontaneous?",
            "What's one goal you want to achieve this year?",
            "Do you enjoy reading? If so, what's your favorite book?",
            "What’s a hobby you want to try?",
            "Have you ever had a crazy travel experience?",
            "Do you enjoy watching movies or shows?",
            "If you could live anywhere, where would it be?",
            "What’s your go-to comfort food?",
            "Do you enjoy spending time outdoors?",
            "What’s your dream vacation?",
            "What inspires you the most?",
            "Do you believe in love at first sight?",
            "What’s the best compliment someone has given you?",
            "What kind of workouts do you enjoy?",
            "Do you enjoy late-night conversations?",
            "If you had a free day, how would you spend it?",
            "Do you enjoy trying out new restaurants?",
            "What’s your hidden talent?",
            "How do you usually relax after a long day?",
            "Do you like pets? If so, what’s your favorite animal?",
            "What’s one thing that always makes you laugh?"
        ],
        currentMessageIndex: 0,
        messages: [],
        hasNewMessage: false
    },
    {
        name: "Liam 💫",
        avatar: "https://i.pravatar.cc/150?img=7",
        lines: [
            "What’s been the highlight of your week?",
            "Do you enjoy listening to podcasts?",
            "What’s your favorite childhood memory?",
            "If you could have any superpower, what would it be?",
            "What’s the best concert you’ve ever been to?",
            "Are you more of a cat or dog person?",
            "What’s your favorite holiday tradition?",
            "Do you believe in soulmates?",
            "If you could learn a new skill instantly, what would it be?",
            "What motivates you the most?",
            "Have you ever had a life-changing moment?",
            "What’s your favorite way to spend a weekend?",
            "Do you enjoy cooking or baking?",
            "What’s a song you can’t stop listening to lately?",
            "What’s the last book or article you read?",
            "Do you enjoy surprises, or do you prefer planning?",
            "What’s one thing you’re really proud of?",
            "What kind of movies do you enjoy?",
            "What’s your favorite genre of music?",
            "Do you like stargazing?",
            "What’s the most adventurous thing you’ve done?",
            "Do you enjoy hiking or swimming more?",
            "What’s your favorite type of weather?",
            "Do you have any funny stories from your travels?",
            "What’s your favorite way to relax?",
            "If you could only eat one cuisine for the rest of your life, what would it be?",
            "What’s a random act of kindness you’ve done recently?",
            "Do you like trying out new activities?",
            "What’s your idea of a perfect day?",
            "What’s something you’ve always wanted to learn?"
        ],
        currentMessageIndex: 0,
        messages: [],
        hasNewMessage: false
    },
    {
        name: "Max 🌀",
        avatar: "https://i.pravatar.cc/150?img=8",
        lines: [
            "What’s your favorite way to spend a weekend?",
            "Do you enjoy cooking or baking?",
            "What’s a song you can’t stop listening to lately?",
            "What’s the last book or article you read?",
            "Do you enjoy surprises, or do you prefer planning?",
            "What’s one thing you’re really proud of?",
            "What kind of movies do you enjoy?",
            "What’s your favorite genre of music?",
            "What’s your favorite thing about weekends?",
            "Do you enjoy board games or video games?",
            "What’s a show or movie you’d recommend?",
            "Do you like photography?",
            "What’s a small thing that makes your day better?",
            "What’s your favorite kind of pizza topping?",
            "Do you enjoy exploring new places?",
            "What’s your guilty pleasure activity?",
            "Have you ever tried an extreme sport?",
            "What’s your favorite scent?",
            "Do you enjoy crafting or DIY projects?",
            "What’s one thing you’re really passionate about?",
            "Do you like quiet nights or lively parties?",
            "What’s something new you’ve recently tried?",
            "Do you prefer mountains or oceans?",
            "What’s your favorite way to celebrate your birthday?",
            "What’s the kindest thing someone has done for you?",
            "What’s something you’ve never done but want to try?",
            "What’s your favorite type of flower?",
            "Do you enjoy watching sunsets or sunrises more?",
            "What’s a random skill you’re proud of?",
            "Do you like making playlists?",
            "What’s something you’re currently excited about?"
        ],
        currentMessageIndex: 0,
        messages: [],
        hasNewMessage: false
    },
    {
        name: "Jack 💫",
        avatar: "https://i.pravatar.cc/150?img=7",
        lines: [
            "What’s your go-to comfort food?",
            "Do you enjoy spending time outdoors?",
            "What’s your dream vacation?",
            "What inspires you the most?",
            "Do you believe in love at first sight?",
            "What’s the best compliment someone has given you?",
            "What kind of workouts do you enjoy?",
            "Do you enjoy late-night conversations?",
            "If you had a free day, how would you spend it?",
            "What’s your favorite holiday tradition?",
            "Do you believe in soulmates?",
            "If you could learn a new skill instantly, what would it be?",
            "What motivates you the most?",
            "Have you ever had a life-changing moment?",
            "What’s your favorite way to spend a weekend?",
            "Do you enjoy cooking or baking?",
            "What’s a song you can’t stop listening to lately?",
            "What’s the last book or article you read?",
            "Do you enjoy surprises, or do you prefer planning?",
            "What’s one thing you’re really proud of?",
            "What kind of movies do you enjoy?",
            "What’s your favorite genre of music?",
            "Do you like stargazing?",
            "What’s the most adventurous thing you’ve done?",
            "Do you enjoy hiking or swimming more?",
            "What’s your favorite type of weather?",
            "Do you have any funny stories from your travels?",
            "What’s your favorite way to relax?",
            "If you could only eat one cuisine for the rest of your life, what would it be?",
            "What’s a random act of kindness you’ve done recently?",
            "Do you like trying out new activities?",
            "What’s your idea of a perfect day?",
            "What’s something you’ve always wanted to learn?"
        ],
        currentMessageIndex: 0,
        messages: [],
        hasNewMessage: false
    },
    {
        name: "Noah 🌀",
        avatar: "https://i.pravatar.cc/150?img=8",
        lines: [
            "What’s one thing that always makes you smile?",
            "What’s your favorite type of dessert?",
            "Do you enjoy spending time at the beach?",
            "What’s your dream road trip destination?",
            "Do you like journaling or writing?",
            "What’s the best advice you’ve ever received?",
            "Do you enjoy attending festivals or fairs?",
            "What’s your favorite thing about weekends?",
            "Do you enjoy board games or video games?",
            "What’s a show or movie you’d recommend?",
            "Do you like photography?",
            "What’s a small thing that makes your day better?",
            "What’s your favorite kind of pizza topping?",
            "Do you enjoy exploring new places?",
            "What’s your guilty pleasure activity?",
            "Have you ever tried an extreme sport?",
            "What’s your favorite scent?",
            "Do you enjoy crafting or DIY projects?",
            "What’s one thing you’re really passionate about?",
            "Do you like quiet nights or lively parties?",
            "What’s something new you’ve recently tried?",
            "Do you prefer mountains or oceans?",
            "What’s your favorite way to celebrate your birthday?",
            "What’s the kindest thing someone has done for you?",
            "What’s something you’ve never done but want to try?",
            "What’s your favorite type of flower?",
            "Do you enjoy watching sunsets or sunrises more?",
            "What’s a random skill you’re proud of?",
            "Do you like making playlists?",
            "What’s something you’re currently excited about?"
        ],
        currentMessageIndex: 0,
        messages: [],
        hasNewMessage: false
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
  
  let currentChat = null; // Currently selected chat
  let activeSimpIndex = null; // Index of the simp who sent the current active message
  let currentExpectedText = "";
  let startTime;
  let timerRunning = false;
  let timeLeft = 600;
  let timerInterval = null;
  
  // Typing statistics
  let totalTyped = 0;
  let correctTyped = 0;
  
  // Generate chat list
  simps.forEach((simp, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${simp.avatar}" alt="${simp.name}"><span>${simp.name}</span>`;
    li.addEventListener('click', () => selectChat(index));
    chatList.appendChild(li);
  });
  

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

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
    // If the active message is from this chat, enable send button
    if(activeSimpIndex === index && timerRunning) {
      sendBtn.disabled = false;
      inputArea.disabled = false;

    } else {
      sendBtn.disabled = true;
      inputArea.disabled = true;

    }
  
    // Display simp's messages
    displayAllMessages(currentChat);
  
    // Clear "NEW!" indicator if viewing this chat
    if(currentChat.hasNewMessage) {
      currentChat.hasNewMessage = false;
      updateChatList();

    }
  
    // If no messages yet and test is not running, prompt to start
    if(!timerRunning && currentChat.messages.length === 0){
      displayMessage("Click 'Start Test' to begin.", 'system');
    } else {
      instruction.style.display = 'none';

    }

     // Show instruction only for the clicked chat item
     //const liItems = chatList.querySelectorAll('li');
     const clickedItem = liItems[index];

     if (clickedItem.classList.contains('active') && currentChat.messages.length % 2 != 0 ) {
         showInstruction("Please type the above message to continue.");
     } else {
         instruction.style.display = 'none';
         showInstruction("Please find the Simp you didn't respon't to.");

     }

    


    inputArea.focus();


  }
  
  // Update the chat list to show "NEW!" indicators
  function updateChatList() {
    const liItems = chatList.querySelectorAll('li');
    liItems.forEach((li, idx) => {
      const simp = simps[idx];
      const span = li.querySelector('span');
      if(simp.hasNewMessage) {
        if(!span.textContent.includes("NEW!")) {
          span.textContent = `${simp.name} (NEW!)`;
        }
      } else {
        span.textContent = simp.name;
      }
    });
  }
  
  // Display all messages for a simp
  function displayAllMessages(simp) {
    messages.innerHTML = '';
    simp.messages.forEach(msg => {
      displayMessage(msg.text, msg.sender);
    });
  }
  
  // Display a single message in the chat
  function displayMessage(text, sender='system') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
  }
  
  // Start the typing test
  function startTest() {
    if(timerRunning){
      alert("Test is already running.");
      return;
    }
  
    if(currentChat === null){
    //   alert("Please select a chat to start the test.");
    //   return;
    currentChat = simps[0]
    }
  
    // Reset variables
    messages.innerHTML = '';
    instruction.style.display = 'none';
    displayMessage(`Let's start our chat. You have ${timeLeft} seconds.`, 'system');
    inputArea.value = '';
    inputArea.disabled = false;
    sendBtn.disabled = false;
    inputArea.focus();
    startTime = Date.now();
    timerRunning = true;
    timeLeft = timeLeft;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    results.style.display = 'none';
    startBtn.style.display = 'none';
    endBtn.style.display = 'inline-block';
    newTextBtn.style.display = 'none';
    totalTyped = 0;
    correctTyped = 0;
    currentExpectedText = "";
    activeSimpIndex = null;
  
    // Send the first message from a random simp
    sendRandomMessage();
  
    // Start timer
    timerInterval = setInterval(()=>{
      timeLeft--;
      timerDisplay.textContent = `Time: ${timeLeft}s`;
      if(timeLeft <= 0) {
        finishTest();
      }
    }, 1000);


    showInstruction("Please find the Simp you didn't respon't to and type the above message to continue.");


    
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
  
    // Calculate WPM and Accuracy for all simps
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
  
  // Send a random message from any simp
  function sendRandomMessage() {
    // Select a random simp that has messages left
    const availableSimps = simps.filter(simp => simp.currentMessageIndex < simp.lines.length);
    if(availableSimps.length === 0){
      displayMessage("All simps have no more messages. Great job!", 'system');
      finishTest();
      return;
    }
    const randomIndex = Math.floor(Math.random() * availableSimps.length);
    const simp = availableSimps[randomIndex];
    sendSimpMessage(simp);
  }
  
  // Send simp's message and set expected text
  function sendSimpMessage(simp) {
    if(simp.currentMessageIndex >= simp.lines.length){
      displayMessage("No more messages from the simp. You did great!", 'system');
      return;
    }
  
    // Select a random line
    const randomIndex = Math.floor(Math.random() * simp.lines.length);
    const response = simp.lines[randomIndex]; // Pull the next shuffled line
    const normalizedResponse = normalizeText(response);
  
    // displayMessage(normalizedResponse, 'system');
  
    // Add to simp's messages
    simp.messages.push({text: normalizedResponse, sender: 'system'});
  
    // Set the expected text for the user to type
    currentExpectedText = normalizedResponse;
    activeSimpIndex = simps.indexOf(simp);
  
    // Mark that simp has a new message if not currently viewing
    if(currentChat !== simp){
      simp.hasNewMessage = true;
      updateChatList();
    } else {    displayMessage(normalizedResponse, 'system');
}
  
    // Show instruction prompt
  
    // Increment the message index for the simp
    simp.currentMessageIndex++;
  }
  
  // Send user's message
  function sendMessage() {
    if(!timerRunning || activeSimpIndex === null) return;
    const userInput = normalizeText(inputArea.value.trim());
    if(userInput === '') return;
  
    const simp = simps[activeSimpIndex];
  
    // Calculate typing stats
    totalTyped += userInput.length;
    const correctChars = calculateCorrectCharacters(userInput, currentExpectedText);
    correctTyped += correctChars;
  
    displayMessage(userInput, 'user');
    inputArea.value = '';
  
    // // Check if user typed correctly
    // if(userInput.toLowerCase() === currentExpectedText.toLowerCase()) {
    //   // Correct response
    //   displayMessage("Correct!", 'system');
    //   simp.messages.push({text: userInput, sender: 'user'});
    //   simp.messages.push({text: "Correct!", sender: 'system'});
    //   activeSimpIndex = null;
  
    //   // If the current chat is not the simp who just sent the message, mark as having new messages
    //   if(currentChat !== simp){
    //     simp.hasNewMessage = true;
    //     updateChatList();
    //   }
  
    //   // Send next message after a short delay
    //   typingIndicator.style.display = 'block';
    //   setTimeout(() => {
    //     typingIndicator.style.display = 'none';
    //     sendRandomMessage();
    //   }, 1000); // 1 second delay
    // } else {
    //   // Incorrect response
    //   displayMessage("Incorrect. Please try again.", 'system');
    //   simp.messages.push({text: userInput, sender: 'user'});
    //   simp.messages.push({text: "Incorrect. Please try again.", sender: 'system'});
  
    //   // Prompt user to retry
    //   showInstruction("Please type the above message to continue.");
    // }

    // Check if user typed correctly
    
        // Correct response
        simp.messages.push({text: userInput, sender: 'user'});
        activeSimpIndex = null;
    
        // If the current chat is not the simp who just sent the message, mark as having new messages
        if(currentChat !== simp){
          simp.hasNewMessage = true;
          updateChatList();
        }
        
        // Send next message after a short delay
        typingIndicator.style.display = 'block';
        setTimeout(() => {
          typingIndicator.style.display = 'none';
          sendRandomMessage();
        }, 100); // 1 second delay
      
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
    activeSimpIndex = null;
  
    const liItems = chatList.querySelectorAll('li');
    liItems.forEach(li => li.classList.remove('active'));

  
  
    showInstruction("Please find the Simp you didn't respon't to and type the above message to continue.");

    

  }
  
  // Reset simps' lines to original
  function resetSimpsLines() {
    simps.forEach(simp => {
      simp.lines = simp.originalLines.slice();
      simp.messages = [];
      simp.currentMessageIndex = 0;
      simp.hasNewMessage = false;
    });
    updateChatList();
  }
  
  // Initialize simps' original lines
  function initializeSimps() {
    simps.forEach(simp => {
        simp.originalLines = simp.lines.slice(); // Save the original lines
        shuffleArray(simp.lines); // Shuffle the lines
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
  
  // Add real-time validation for the input area
inputArea.addEventListener('input', () => {
    // Normalize user input and the expected text
    const userInput = normalizeText(inputArea.value.trim());
    const expectedText = normalizeText(currentExpectedText);

    // Check if the user's input matches the start of the expected text
    if (expectedText.startsWith(userInput)) {
        inputArea.classList.remove('error'); // Remove error class if it matches
    } else {
        inputArea.classList.add('error'); // Add error class if it doesn't match
    }

    // Optionally display feedback for user
    if (!expectedText.startsWith(userInput)) {
        instruction.textContent = "The input doesn't match. You may correct it";
        instruction.style.display = 'block';
    } else {
        instruction.textContent = '';
        instruction.style.display = 'none';
    }
});

  
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
  