// script.js

// Initialize Variables
let score = 0;
let ppvSold = 0;
let ppvRevenue = 0; // Total revenue from PPV purchases
let questionIndex = 0; // Tracks the number of questions asked
let conversationLog = [];
let lastGuyAnswer = "How’s your evening?"; // Initial message from guy

// Emotion tracking (0 to 100, 50 is neutral)
let guyEmotion = 50;

// Current Action State
let currentState = 'main'; // Possible states: main, ask_category, ask_question, tease_option, peek_teazes, pick_tease

// DOM Elements
const scoreSpan = document.getElementById('score');
const ppvCountSpan = document.getElementById('ppvCount');
const ppvRevenueSpan = document.getElementById('ppvRevenue'); // New element for PPV revenue
const emotionLevelSpan = document.getElementById('emotionLevel');
const chatContainer = document.getElementById('chatContainer');
const gameDiv = document.getElementById('game');

// Ensure ppvRevenueSpan exists in HTML
// Add the following span in your HTML within the .status-box div:
// <span>PPV Revenue: $<span id="ppvRevenue">0</span></span>

// Replies Based on Emotion Levels
function getReplyLines(level){
  let low = [
    "I appreciate you sharing that.",
    "I understand. Thanks for telling me.",
    "That’s interesting, I respect what you said.",
    "Alright, I value your honesty.",
    "Noted. It’s nice getting to know you better."
  ];

  let mid = [
    "That’s quite something, I’m glad you mentioned it.",
    "Oh, really? That’s cool.",
    "Good to know! I can picture you better now.",
    "Hmm, interesting detail. Thanks.",
    "I find it appealing you said that."
  ];

  let high = [
    "Ooh, that’s actually quite intriguing.",
    "Mmm, I love these personal insights.",
    "That makes me more curious about you.",
    "You know, that’s quite enticing.",
    "I’m drawn to how openly you share."
  ];

  if(level==='high') return high;
  if(level==='low') return low;
  return mid;
}

// Scoring Mechanism for Girl's Actions
function calcLineScoreForAction(style, level) {
  if(level==='low'){
    if(style==='formal') return 2;
    if(style==='neutral') return 1;
    if(style==='flirty') return 0;
    if(style==='sext') return -2; // Negative impact
    if(style==='tease') return 1;
    if(style==='sell_ppv') return 3; // Positive impact
  } else if(level==='mid'){
    if(style==='formal') return 1;
    if(style==='neutral') return 2;
    if(style==='flirty') return 2;
    if(style==='sext') return 1;
    if(style==='tease') return 2;
    if(style==='sell_ppv') return 3;
  } else if(level==='high'){
    if(style==='formal') return 0;
    if(style==='neutral') return 1;
    if(style==='flirty') return 3;
    if(style==='sext') return 4; // High positive impact
    if(style==='tease') return 3;
    if(style==='sell_ppv') return 4;
  }
  return 0;
}

// Function to Adjust Guy's Emotion Based on Girl's Actions
function adjustGuyEmotion(action, style) {
  // Define how different actions and styles affect emotion
  if(action === actions.SELL_PPV){
    if(guyEmotion < 100) guyEmotion += 5;
  }
  if(action === actions.SEXT){
    if(guyEmotion < 100) guyEmotion += 3;
  }
  if(action === actions.TEASE){
    if(guyEmotion < 100) guyEmotion += 2;
  }
  if(action === actions.ASK_QUESTION){
    if(style === 'flirty') {
      if(guyEmotion < 100) guyEmotion += 2;
    }
    if(style === 'formal') {
      if(guyEmotion > 0) guyEmotion -= 1;
    }
  }
  if(action === actions.SKIP){
    if(guyEmotion > 0) guyEmotion -= 2;
  }

  // Clamp emotion between 0 and 100
  guyEmotion = Math.min(100, Math.max(0, guyEmotion));
  updateEmotionDisplay();
}

// Update Score Display
function updateScore(val) {
  score += val;
  // Clamp score between -10 and 30
  score = Math.min(30, Math.max(-10, score));
  scoreSpan.textContent = score;
}

// Update PPV Sales Display
function updatePPVDisplay() {
  ppvCountSpan.textContent = ppvSold;
  ppvRevenueSpan.textContent = ppvRevenue;
}

// Update Emotion Display
function updateEmotionDisplay() {
  emotionLevelSpan.textContent = guyEmotion;
}

// Scroll to Bottom of Chat
function scrollBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Utility Functions to Pick Random Elements
function pickRandom(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function pickNRandom(arr, n) {
  const shuffled = [...arr];
  for (let i=shuffled.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
  }
  return shuffled.slice(0,n);
}

// Function to Determine Score Level
function getScoreLevel() {
  if(score >= 10) return 'high';
  if(score < 0) return 'low';
  return 'mid';
}

// Function to Add Message to Chat
function addMessage(role, text) {
  conversationLog.push({role, text});
  renderConversation();
}

// Function to Handle Girl's Main Actions
function handleMainAction(action) {
  const level = getScoreLevel();

  switch(action) {
    case actions.ASK_QUESTION:
      currentState = 'ask_category';
      renderAskCategory();
      break;

    case actions.TEASE:
      currentState = 'tease_option';
      renderTeaseOption();
      break;

    case actions.SEXT:
    case actions.SELL_PPV:
    case actions.SKIP:
      handleDirectAction(action, level);
      break;

    case actions.PEEK_TEAZES:
      renderPeekTeazes();
      break;

    case actions.PICK_TEASE:
      renderPickTease();
      break;

    case actions.ASK_CATEGORY:
      // This case is handled in renderAskCategory via event listeners
      break;

    case actions.SELECT_QUESTION:
      // This case is handled in renderAskQuestion via event listeners
      break;

    case actions.SELECT_TEASE:
      // This case is handled in renderTeaseOption via event listeners
      break;

    default:
      console.error(`Unknown action: ${action}`);
  }
}

// Function to Handle Direct Actions (TEASE, SEXT, SELL_PPV, SKIP)
function handleDirectAction(action, level) {
  if(action === actions.TEASE || action === actions.SEXT || action === actions.SELL_PPV){
    const options = actionOptions[action];
    if(options && options.length > 0){
      if(action === actions.SELL_PPV){
        // Handle PPV Selling with Price Selection
        renderSellPPV();
      } else {
        // Handle TEASE and SEXT as before
        const selectedOption = pickRandom(options);
        let val = calcLineScoreForAction(action, level);
        let text = selectedOption;
        addMessage('Girl', text);
        updateScore(val);
        adjustGuyEmotion(action, 'neutral'); // Adjust based on action type
        if(action === actions.SELL_PPV){
          // Note: ppvSold and ppvRevenue are handled in processSellPPV()
          // ppvSold +=1;
          // ppvRevenue += parseInt(text.match(/\d+/)) || 0; // Extract price from text
          // updatePPVDisplay();
        }
        renderMainChoice();
      }
    }
  } else if(action === actions.SKIP){
    let val = calcLineScoreForAction(action, level);
    let text = "(You coyly avoid direct actions and change the subject...)";
    addMessage('Girl', text);
    updateScore(val);
    adjustGuyEmotion(action, 'neutral'); // Adjust based on action type
    // Guy might respond to skipping
    if(Math.random() < 0.3) { // 30% chance of response
      let line;
      if(level === 'high') line = "Oh, playing hard to get? 😉";
      else if(level === 'mid') line = "Hmm, not answering... okay.";
      else line = "Alright, I see you're not answering...";
      addMessage('Guy', line);
      lastGuyAnswer = line;
    } else {
      lastGuyAnswer = "(no direct follow-up)";
    }
    renderMainChoice();
  }
}

// Function to Render Sell PPV Interface
function renderSellPPV() {
  let html = `<p>Select a PPV price to sell:</p><ul class="choices">`;
  ppvPrices.forEach(price => {
    html += `<li><button data-action="select_ppv_price" data-price="${price}">$${price}</button></li>`;
  });
  html += `</ul>
           <button data-action="back_to_main">Back</button>`;
  gameDiv.innerHTML = html;
  scrollBottom();

  const ppvPriceBtns = gameDiv.querySelectorAll('button[data-action="select_ppv_price"]');
  ppvPriceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const price = parseInt(btn.getAttribute('data-price'));
      processSellPPV(price);
    });
  });

  const backBtn = gameDiv.querySelector('button[data-action="back_to_main"]');
  backBtn.addEventListener('click', () => {
    renderMainChoice();
  });
}

// Function to Process Selling PPV
function processSellPPV(price) {
  // Determine the number of PPVs bought based on emotion
  // Higher emotion increases the chance to buy more PPVs
  // We'll use emotion as the probability for each possible purchase

  // Define maximum number of PPVs a guy can buy at once
  const maxPurchases = 3;
  let purchases = 0;

  for(let i = 0; i < maxPurchases; i++) {
    if(Math.random() < (guyEmotion / 100)) {
      purchases +=1;
    }
  }

  if(purchases > 0){
    ppvSold += purchases;
    ppvRevenue += price * purchases;
    addMessage('Girl', `You sold ${purchases} PPV(s) at $${price} each.`);
    updateScore(calcLineScoreForAction('sell_ppv', getScoreLevel()) * purchases);
    adjustGuyEmotion(actions.SELL_PPV, 'neutral');
    updatePPVDisplay();
  } else {
    addMessage('Girl', "Unfortunately, he didn't buy any PPV.");
  }

  renderMainChoice();
}

// Function to Render Peek Teazes
function renderPeekTeazes() {
  let html = `<p>Here are all available teazes:</p><ul class="choices">`;
  teaseOptions.forEach(tease => {
    html += `<li><span>${tease}</span></li>`;
  });
  html += `</ul>
           <button data-action="back_to_main">Back</button>`;
  gameDiv.innerHTML = html;
  scrollBottom();

  const backBtn = gameDiv.querySelector('button[data-action="back_to_main"]');
  backBtn.addEventListener('click', () => {
    renderMainChoice();
  });
}

// Function to Render Pick Tease
function renderPickTease() {
  let html = `<p>Choose a tease to send:</p><ul class="choices">`;
  teaseOptions.forEach(tease => {
    html += `<li><button data-action="select_specific_tease" data-tease="${tease}">${tease}</button></li>`;
  });
  html += `</ul>
           <button data-action="back_to_main">Back</button>`;
  gameDiv.innerHTML = html;
  scrollBottom();

  const teaseBtns = gameDiv.querySelectorAll('button[data-action="select_specific_tease"]');
  teaseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tease = btn.getAttribute('data-tease');
      processSpecificTease(tease);
    });
  });

  const backBtn = gameDiv.querySelector('button[data-action="back_to_main"]');
  backBtn.addEventListener('click', () => {
    renderMainChoice();
  });
}

// Function to Process Specific Tease
function processSpecificTease(tease) {
  const level = getScoreLevel();
  const lineScore = calcLineScoreForAction('tease', level);

  // Add girl's specific tease message
  addMessage('Girl', tease);
  updateScore(lineScore);
  adjustGuyEmotion(actions.TEASE, 'neutral'); // 'tease' style is 'neutral' here

  renderMainChoice();
}

// Function to Render Ask Category
function renderAskCategory() {
  let html = `<p>Select a category to ask a question:</p><ul class="choices">`;
  for (const category in questionCategories) {
    html += `<li><button data-action="${actions.ASK_CATEGORY}" data-category="${category}">${category}</button></li>`;
  }
  html += `</ul>`;
  gameDiv.innerHTML = html;
  scrollBottom();

  const categoryBtns = gameDiv.querySelectorAll('button[data-action="ask_category"]');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      renderAskQuestion(category);
    });
  });
}

// Function to Render Ask Question based on Category
function renderAskQuestion(category) {
  const questions = questionCategories[category];
  if(!questions || questions.length === 0){
    console.error(`No questions found for category: ${category}`);
    return;
  }

  let html = `<p>Select a question to ask:</p><ul class="choices">`;
  questions.forEach(question => {
    html += `<li><button data-action="${actions.SELECT_QUESTION}" data-question="${question}">${question}</button></li>`;
  });
  html += `</ul>`;
  gameDiv.innerHTML = html;
  scrollBottom();

  const questionBtns = gameDiv.querySelectorAll('button[data-action="select_question"]');
  questionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      processAskQuestion(question);
    });
  });
}

// Function to Process Asking a Question
function processAskQuestion(question) {
  const level = getScoreLevel();

  // Find corresponding girlQDatabase entry
  const qObj = girlQDatabase[question];
  if (!qObj) {
    console.error(`No entries found in girlQDatabase for question: ${question}`);
    return;
  }

  // Select a random style based on current level
  let style;
  if(level === 'high') {
    style = 'flirty';
  } else if(level === 'mid') {
    style = 'neutral';
  } else {
    style = 'formal';
  }

  const possibleLines = qObj[style];
  if(!possibleLines || possibleLines.length === 0){
    console.error(`No ${style} lines found for question: ${question}`);
    return;
  }

  const selectedLine = pickRandom(possibleLines);
  const lineScore = calcLineScoreForAction(style, level);

  // Add girl's message
  addMessage('Girl', selectedLine.text);
  updateScore(lineScore);
  adjustGuyEmotion(actions.ASK_QUESTION, style);

  // Check if there are answers for the question
  if (guyAnswers[question] && guyAnswers[question].length > 0) {
    // Guy answers
    const guyAns = pickRandom(guyAnswers[question]);
    addMessage('Guy', guyAns);
    lastGuyAnswer = guyAns;
  } else {
    // Default answer if no answers are found
    const defaultAns = "That's interesting! Tell me more.";
    addMessage('Guy', defaultAns);
    lastGuyAnswer = defaultAns;
    console.warn(`No answers found for question: ${question}. Using default response.`);
  }

  questionIndex++;
  renderMainChoice();
}

// Function to Render Tease Options
function renderTeaseOption() {
  let html = `<p>Select an option:</p><ul class="choices">
               <li><button data-action="send_tease">Send a Random Tease</button></li>
               <li><button data-action="${actions.PICK_TEASE}">Pick a Tease to Send</button></li>
               <li><button data-action="${actions.PEEK_TEAZES}">Peek Teazes</button></li>
             </ul>`;
  gameDiv.innerHTML = html;
  scrollBottom();

  const sendTeaseBtn = gameDiv.querySelector('button[data-action="send_tease"]');
  sendTeaseBtn.addEventListener('click', () => {
    sendTease();
  });

  const pickTeaseBtn = gameDiv.querySelector(`button[data-action="${actions.PICK_TEASE}"]`);
  pickTeaseBtn.addEventListener('click', () => {
    handleMainAction(actions.PICK_TEASE);
  });

  const peekTeazesBtn = gameDiv.querySelector(`button[data-action="${actions.PEEK_TEAZES}"]`);
  peekTeazesBtn.addEventListener('click', () => {
    handleMainAction(actions.PEEK_TEAZES);
  });
}

// Function to Send a Random Tease
function sendTease() {
  const selectedTease = pickRandom(teaseOptions);
  const level = getScoreLevel();
  const lineScore = calcLineScoreForAction('tease', level);

  // Add girl's tease message
  addMessage('Girl', selectedTease);
  updateScore(lineScore);
  adjustGuyEmotion(actions.TEASE, 'neutral'); // 'tease' style is 'neutral' here

  renderMainChoice();
}

// Function to Pick a Specific Tease
function renderPickTease() {
  let html = `<p>Choose a tease to send:</p><ul class="choices">`;
  teaseOptions.forEach(tease => {
    html += `<li><button data-action="select_specific_tease" data-tease="${tease}">${tease}</button></li>`;
  });
  html += `</ul>
           <button data-action="back_to_main">Back</button>`;
  gameDiv.innerHTML = html;
  scrollBottom();

  const teaseBtns = gameDiv.querySelectorAll('button[data-action="select_specific_tease"]');
  teaseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tease = btn.getAttribute('data-tease');
      processSpecificTease(tease);
    });
  });

  const backBtn = gameDiv.querySelector('button[data-action="back_to_main"]');
  backBtn.addEventListener('click', () => {
    renderMainChoice();
  });
}

// Function to Process Specific Tease
function processSpecificTease(tease) {
  const level = getScoreLevel();
  const lineScore = calcLineScoreForAction('tease', level);

  // Add girl's specific tease message
  addMessage('Girl', tease);
  updateScore(lineScore);
  adjustGuyEmotion(actions.TEASE, 'neutral'); // 'tease' style is 'neutral' here

  renderMainChoice();
}

// Function to Render Peek Teazes
function renderPeekTeazes() {
  let html = `<p>Here are all available teazes:</p><ul class="choices">`;
  teaseOptions.forEach(tease => {
    html += `<li><span>${tease}</span></li>`;
  });
  html += `</ul>
           <button data-action="back_to_main">Back</button>`;
  gameDiv.innerHTML = html;
  scrollBottom();

  const backBtn = gameDiv.querySelector('button[data-action="back_to_main"]');
  backBtn.addEventListener('click', () => {
    renderMainChoice();
  });
}

// Function to Render Sell PPV Interface
function renderSellPPV() {
  let html = `<p>Select a PPV price to sell:</p><ul class="choices">`;
  ppvPrices.forEach(price => {
    html += `<li><button data-action="select_ppv_price" data-price="${price}">$${price}</button></li>`;
  });
  html += `</ul>
           <button data-action="back_to_main">Back</button>`;
  gameDiv.innerHTML = html;
  scrollBottom();

  const ppvPriceBtns = gameDiv.querySelectorAll('button[data-action="select_ppv_price"]');
  ppvPriceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const price = parseInt(btn.getAttribute('data-price'));
      processSellPPV(price);
    });
  });

  const backBtn = gameDiv.querySelector('button[data-action="back_to_main"]');
  backBtn.addEventListener('click', () => {
    renderMainChoice();
  });
}

// Function to Process Selling PPV
function processSellPPV(price) {
  // Determine the number of PPVs bought based on emotion
  // Higher emotion increases the chance to buy more PPVs
  // We'll use emotion as the probability for each possible purchase

  // Define maximum number of PPVs a guy can buy at once
  const maxPurchases = 3;
  let purchases = 0;

  for(let i = 0; i < maxPurchases; i++) {
    if(Math.random() < (guyEmotion / 100)) {
      purchases +=1;
    }
  }

  if(purchases > 0){
    ppvSold += purchases;
    ppvRevenue += price * purchases;
    addMessage('Girl', `You sold ${purchases} PPV(s) at $${price} each.`);
    updateScore(calcLineScoreForAction('sell_ppv', getScoreLevel()) * purchases);
    adjustGuyEmotion(actions.SELL_PPV, 'neutral');
    updatePPVDisplay();
  } else {
    addMessage('Girl', "Unfortunately, he didn't buy any PPV.");
  }

  renderMainChoice();
}

// Function to Render Conversation Log
function renderConversation() {
  chatContainer.innerHTML = ''; // Clear existing messages
  conversationLog.forEach(msg=>{
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('conversation', msg.role === 'Guy' ? 'guy' : 'girl');
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message', msg.role === 'Guy' ? 'guy' : 'girl');
    messageContent.textContent = msg.text;
    
    messageDiv.appendChild(messageContent);
    chatContainer.appendChild(messageDiv);
  });
  gameDiv.innerHTML = ''; // Clear game actions when messages are rendered
  scrollBottom();
}

// Function to Check End of Conversation
function endCheck() {
  if(score >=10) return 'goodEnd';
  if(score <0) return 'badEnd';
  return 'neutralEnd';
}

// Function to Render End of Conversation Based on Score
function renderEnd(endId) {
  const endings = {
    goodEnd:{
      guyLines:["You really made me feel comfortable.","This was wonderful!","I’m pleasantly surprised."],
      outcome:"High score! Great chemistry."
    },
    neutralEnd:{
      guyLines:["Not bad, not amazing.","This was okay.","I guess it was alright."],
      outcome:"Neutral ending."
    },
    badEnd:{
      guyLines:["I’m not feeling a connection.","Might move on, sorry.","No spark here."],
      outcome:"Low score ending."
    }
  };
  const chosen = endings[endId];
  const guyLine = pickRandom(chosen.guyLines);
  addMessage('Guy', guyLine);
  
  // Display outcome
  const outcomeP = document.createElement('p');
  outcomeP.textContent = chosen.outcome;
  outcomeP.style.fontWeight = 'bold';
  outcomeP.style.textAlign = 'center';
  chatContainer.appendChild(outcomeP);
  
  gameDiv.innerHTML = ''; // Clear game actions
  scrollBottom();
}

// Function to Render Main Choices for the Girl
function renderMainChoice() {
  if(questionIndex >= guyQuestions.length) {
    const endId = endCheck();
    renderEnd(endId);
    return;
  }

  currentState = 'main';

  // Display action buttons
  let html = `
    <ul class="action-buttons">
      <li><button data-action="${actions.ASK_QUESTION}">Ask a Question</button></li>
      <li><button data-action="${actions.TEASE}">Tease</button></li>
      <li><button data-action="${actions.SEXT}">Sext</button></li>
      <li><button data-action="${actions.SELL_PPV}">Sell PPV</button></li>
      <li><button data-action="${actions.SKIP}">Skip</button></li>
    </ul>
  `;
  gameDiv.innerHTML = html;
  scrollBottom();

  const btns = gameDiv.querySelectorAll('button[data-action]');
  btns.forEach(b=>{
    b.addEventListener('click',()=>{
      const action = b.getAttribute('data-action');
      handleMainAction(action);
    });
  });
}

// Function to Initialize the Chat Game
function initializeChatGame() {
  // Initial message from Guy
  addMessage('Guy', "Hey there, just browsing around. How’s your evening?");
  renderMainChoice();
}

// Start the Chat Game
initializeChatGame();
