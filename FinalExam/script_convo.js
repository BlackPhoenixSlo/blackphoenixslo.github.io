// Game logic module
  const names = ["Alex", "Ben", "Chris", "David", "Evan"];
    const ages = Array.from({length: 32}, (_, i) => i + 18);
    const countries = ["USA", "UK", "Canada", "Australia"];
    const regions = ["North", "South", "East", "West"];
    const jobs = ["student", "engineer", "artist", "teacher", "doctor"];
    const hobbies = ["dogs", "gaming", "sports", "music", "cooking", "golf"];
    const tv_series = ["Breaking Bad", "Game of Thrones", "The Office", "Friends"];
    const where_find = ["online", "facebook", "instagram"];

    const fetishes = ["feet", "roleplay", "cosplay", "lingerie"];
const ConversationGame = {
  // Game state management
  state: {
    fan: null,
    chatInfo: null,
    roundCounter: 0,
    currentModel: null,
    currentGuy: null,
    currentAction: null,
    pendingFanReply: null,
    askedBasicQuestions: [],
    askedDeepQuestions: {}
  },

  // Initialize new chat session
  initialize(currentModel, currentGuy) {
    this.state.currentModel = currentModel;
    this.state.currentGuy = currentGuy;
    
    // Load or initialize fan stats
    if (guyInfos[currentModel]?.[currentGuy]?.fanStats) {
        // Load existing fan stats
        this.state.fan = guyInfos[currentModel][currentGuy].fanStats;
    } else {
        // Generate new fan for first interaction
        this.state.fan = this.generateFan();
        // Save the initial fan stats
        if (!guyInfos[currentModel]) {
            guyInfos[currentModel] = {};
        }
        if (!guyInfos[currentModel][currentGuy]) {
            guyInfos[currentModel][currentGuy] = { bio: "Default bio" };
        }
        guyInfos[currentModel][currentGuy].fanStats = this.state.fan;
    }

    this.state.chatInfo = {
        uniqueQuestions: [],
        answers: {}
    };
    this.state.roundCounter = 0;
    
    // Load existing chat history
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    if (chatHistory[currentModel] && chatHistory[currentModel][currentGuy]) {
        chatHistory[currentModel][currentGuy].forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message from-${msg.sender}`;
            
            if (msg.action) {
                const actionP = document.createElement('p');
                actionP.className = 'action-type';
                actionP.textContent = `Action: ${msg.action}`;
                messageDiv.appendChild(actionP);
            }
            
            const textP = document.createElement('p');
            textP.textContent = msg.text;
            messageDiv.appendChild(textP);
            
            chatMessages.appendChild(messageDiv);
        });
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Load asked deep questions if they exist
    if (guyInfos[currentModel]?.[currentGuy]?.askedDeepQuestions) {
        this.state.askedDeepQuestions = guyInfos[currentModel][currentGuy].askedDeepQuestions;
    } else {
        this.state.askedDeepQuestions = {};
    }

    this.addDeepQuestionStyles();
    this.showMainButtons();
  },

  // Fan generation function

  

  generateFan() {
    return {
      hornyLevel: 10,
      sexiness: 100,
      charisma: 10,
      teases: 0,
      cuddles: 0,
      ppvToBuy: 7,
      sexts: 0,
      convos: 0,
      questions: 0,
      recurringTeases: -1,
      recurringSexts: -1,
      recurringConvos: -1,
      recurringCuddles: -1,
      recurringQuestions: -1,
      ppvBought: 0,
      maxPPVValueTierBought: 0,
      convoCounter: 0,
      turnCountOfLastPpvBought: -1,
      imagesSold: [],
      captionsUsed: [],
      deepForNoReason: 0.1,
      age: ages[Math.floor(Math.random() * ages.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      job: jobs[Math.floor(Math.random() * jobs.length)],
      hobby: hobbies[Math.floor(Math.random() * hobbies.length)],
      tv_series: tv_series[Math.floor(Math.random() * tv_series.length)],
      find:"Online",
      likeAboutJob:"creative espects",
      askedBasicQuestions: [],
      sold: 0
    };
  },

  // Update game UI with current state
  updateGameUI() {
    const statsDiv = document.createElement('div');
    statsDiv.className = 'game-stats';
    statsDiv.innerHTML = `
      <div class="stats-container">
        <div class="stats-header" style="cursor: pointer;">
          <h3>▼ Game Stats</h3>
        </div>
        <div class="stats-content">
          <div class="guy-info">
            <h3>Guy Info</h3>
            <input type="text" class="guy-info-input" placeholder="Guy name" value="${guyInfos[this.state.currentModel]?.[this.state.currentGuy]?.bio || 'Default bio'}">
          </div>
          <div class="fan-info">
            <h3>Fan Stats</h3>
            <p>Horny Level: ${this.state.fan.hornyLevel}</p>
            <p>Sexiness: ${this.state.fan.sexiness}</p>
            <p>Charisma: ${this.state.fan.charisma}</p>
            <p>Deep For No Reason: ${(this.state.fan.deepForNoReason/10*100).toFixed(1)}%</p>
            <p>Money Made: $${this.state.fan.sold}</p>
            <p>PPVs to Buy: ${this.state.fan.ppvToBuy}</p>
            <p>Max PPV Tier: ${this.state.fan.maxPPVValueTierBought}</p>
          </div>
        </div>
      </div>
    `;
    
    // Update stats section
    const guyInfoSection = document.getElementById('guyInfoSection');
    const existingStats = document.querySelector('.game-stats');
    if (existingStats) {
      existingStats.remove();
    }
    
    // Insert stats after guy info section
    if (guyInfoSection) {
      guyInfoSection.insertAdjacentElement('afterend', statsDiv);
    }

    // Replace input with textarea and add auto-resize functionality
    const guyInfoTextarea = statsDiv.querySelector('.guy-info-input');
    
    // Auto-resize function
    const autoResize = () => {
      guyInfoTextarea.style.height = 'auto';
      guyInfoTextarea.style.height = guyInfoTextarea.scrollHeight + 'px';
    };
    
    // Add event listeners for auto-resize
    guyInfoTextarea.addEventListener('input', autoResize);
    guyInfoTextarea.addEventListener('blur', () => {
      if (!guyInfos[this.state.currentModel]) {
        guyInfos[this.state.currentModel] = {};
      }
      if (!guyInfos[this.state.currentModel][this.state.currentGuy]) {
        guyInfos[this.state.currentModel][this.state.currentGuy] = {};
      }
      guyInfos[this.state.currentModel][this.state.currentGuy].bio = guyInfoTextarea.value;
    });

    // Initial resize
    autoResize();

    // Add toggle functionality
    const statsHeader = statsDiv.querySelector('.stats-header');
    const statsContent = statsDiv.querySelector('.stats-content');
    statsContent.style.display = 'block'; // Changed to 'block' to show by default
    
    statsHeader.addEventListener('click', () => {
      const isExpanded = statsContent.style.display !== 'none';
      statsContent.style.display = isExpanded ? 'none' : 'block';
      statsHeader.querySelector('h3').textContent = isExpanded ? '▼ Game Stats' : '▲ Game Stats';
    });
  },

  // Handle game actions
  handleAction(action) {
    this.state.roundCounter++;
    const messageInput = document.getElementById('messageInput');
    
    // Set predefined messages based on action
    switch(action) {
        case 'convo':
            this.handleConvoClick();
            break;
        case 'tease':
            const getTease = () => {
                if (this.state.fan.horny_level > 20) {
                    return window.tease_lines[Math.floor(Math.random() * window.tease_lines.length)];
                } else {
                    return window.playful_nonSexual_tease_lines[Math.floor(Math.random() * window.playful_nonSexual_tease_lines.length)];
                }
            };
            const teasePair = getTease();
            messageInput.value = teasePair[0];
            this.state.pendingFanReply = teasePair[1];
            ConversationGame.pendingFanReply = this.state.pendingFanReply;
            //messageInput.value = "You're so sweet, I love chatting with you 😘";
            break;
        case 'question':
            this.state.currentAction = action;
            this.showQuestionButtons(); // no need cause it's already called in the handleConvoClick
            messageInput.value = "Can I ask you something?";
            break;
        case 'sext':
            const getSext = () => {
                if (this.state.fan.sexts > 3) {
                    return window.sext_lines[Math.floor(Math.random() * window.sext_lines.length)];
                } else {
                    return window.sext_real[Math.floor(Math.random() * window.sext_real.length)];
                }
            };
            const sextPair = getSext();
            messageInput.value = sextPair[0];
            this.state.pendingFanReply = sextPair[1];
            ConversationGame.pendingFanReply = this.state.pendingFanReply;
            break;
        case 'sell':
          const actionOptionsDiv = document.getElementById('actionOptions');
          actionOptionsDiv.innerHTML = ''; // Clear existing buttons
          
          // Add back button
          const backBtn = document.createElement('button');
          backBtn.className = 'action-option';
          backBtn.textContent = '← Back';
          backBtn.onclick = () => this.showMainButtons();
          actionOptionsDiv.appendChild(backBtn);
          
          // Create buttons for each caption type
          const captionTypes = [
              { array: window.tease_img_captions, label: 'Tease Image' },
              { array: window.tease_video_captions, label: 'Tease Video' },
              { array: window.strip_to_undervear_video_captions, label: 'Strip to Underwear' },
              { array: window.strip_naked_video_captions, label: 'Strip Naked' },
              { array: window.quick_masturbation_video_captions, label: 'Quick Masturbation' },
              { array: window.long_masturbation_video_captions, label: 'Long Masturbation' },
              { array: window.end_script_video_captions, label: 'End Script' }
          ];
          
          captionTypes.forEach(type => {
              const button = document.createElement('button');
              button.className = 'action-option';
              const randomCaption = type.array[Math.floor(Math.random() * type.array.length)][0];
              button.textContent = `${type.label}: ${randomCaption}`;
              button.onclick = () => {
                  const messageInput = document.getElementById('messageInput');
                  messageInput.value = randomCaption;
                  this.state.currentAction = 'sext';
                  this.state.pendingFanReply = ''; // Empty reply since we don't want guy response
              };
              actionOptionsDiv.appendChild(button);
          });
            break;
        case 'cuddle':
            const cuddlePair = window.cuddle_lines[Math.floor(Math.random() * window.cuddle_lines.length)];
            messageInput.value = cuddlePair[0];
            this.state.pendingFanReply = cuddlePair[1];
            ConversationGame.pendingFanReply = this.state.pendingFanReply;
            break;
    }

    // Store the current action to be used when sending
    this.state.currentAction = action;

    // Pre-generate the fan reply but don't send it yet
    

    // Save updated fan stats after each action
    guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;

    this.checkGameState();
    this.updateGameUI();
  },


  // Add message to chat
  addMessage(sender, text, actionType) {
    // Create message object
    const messageObject = {
        sender: sender,
        text: text,
        action: actionType
    };

    // Save to chat history
    if (!chatHistory[this.state.currentModel][this.state.currentGuy]) {
        chatHistory[this.state.currentModel][this.state.currentGuy] = [];
    }
    chatHistory[this.state.currentModel][this.state.currentGuy].push(messageObject);

    // Create and display message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message from-${sender}`;
    
    if (actionType) {
        const actionP = document.createElement('p');
        actionP.className = 'action-type';
        actionP.textContent = `Action: ${actionType}`;
        messageDiv.appendChild(actionP);
    }
    
    const textP = document.createElement('p');
    textP.textContent = text;
    messageDiv.appendChild(textP);
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  },

 
  // Check game state for end conditions
  checkGameState() {
    if (this.state.fan.charisma <= 0 || this.state.fan.sexiness <= 0) {
      alert('Game Over: Fan lost interest');
      // Reset fan stats on game over
      this.state.fan = this.generateFan();
      guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;
      return;
    }

    if (this.state.fan.maxPPVValueTierBought === 7) {
      alert('Game Over: Reached max PPV tier');
      // Reset fan stats on game over
      this.state.fan = this.generateFan();
      guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;
      return;
    }

    if (this.state.fan.ppvToBuy < 1) {
      alert('Game Over: No more PPVs to buy');
      // Reset fan stats on game over
      this.state.fan = this.generateFan();
      guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;
      return;
    }
  },

  // Add new method to handle the action effects
  performAction(action) {
    switch(action) {
        case 'convo':
            this.state.fan.convos++;
            this.state.fan.recurringConvos = (this.state.fan.recurringConvos || 0) + 1;
            
            if (this.state.fan.recurringConvos < 4) {
                this.state.fan.charisma++;
            } else {
                this.state.fan.hornyLevel--;
                this.state.fan.sexiness--;
                this.state.fan.deepForNoReason += 0.05;
            }
            break;

        case 'tease':
            this.state.fan.teases++;
            this.state.fan.recurringTeases = (this.state.fan.recurringTeases || 0) + 1;
            
            if (this.state.fan.recurringTeases < 3) {
                this.state.fan.sexiness++;
                this.state.fan.hornyLevel++;
            } else {
                this.state.fan.hornyLevel--;
                this.state.fan.charisma -= 2;
                this.state.fan.deepForNoReason += 0.05;
            }
            break;

        case 'sext':
            this.state.fan.sexts++;
            this.state.fan.recurringSexts = (this.state.fan.recurringSexts || 0) + 1;
            
            if (this.state.fan.recurringSexts < 4) {
                this.state.fan.hornyLevel++;
            } else {
                this.state.fan.hornyLevel--;
                this.state.fan.charisma--;
                this.state.fan.deepForNoReason += 0.05;
            }
            break;

        case 'cuddle':
            this.state.fan.cuddles++;
            this.state.fan.recurringCuddles = (this.state.fan.recurringCuddles || 0) + 1;
            
            if (this.state.fan.ppvToBuy > 2) {
                this.state.fan.deepForNoReason++;
                this.state.fan.charisma++;
                this.state.fan.hornyLevel = Math.floor(this.state.fan.hornyLevel / 1.3);
                this.state.fan.sexiness++;
            }
            break;
    }

    // Save updated fan stats after each action
    guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;

    this.checkGameState();
    this.updateGameUI();
  },

  showQuestionButtons() {
    const actionOptionsDiv = document.getElementById('actionOptions');
    actionOptionsDiv.innerHTML = ''; // Clear existing buttons

    // Create Basic and Deep buttons
    const basicBtn = document.createElement('button');
    basicBtn.className = 'action-option';
    basicBtn.textContent = 'Basic Questions';
    basicBtn.onclick = () => this.showBasicQuestions();

    const deepBtn = document.createElement('button');
    deepBtn.className = 'action-option';
    deepBtn.textContent = 'Deep Questions';
    deepBtn.onclick = () => this.showDeepQuestions();

    // Add back button
    const backBtn = document.createElement('button');
    backBtn.className = 'action-option';
    backBtn.textContent = '← Back';
    backBtn.onclick = () => this.showMainButtons();

    actionOptionsDiv.appendChild(backBtn);
    actionOptionsDiv.appendChild(basicBtn);
    actionOptionsDiv.appendChild(deepBtn);
  },

  showBasicQuestions() {
    const actionOptionsDiv = document.getElementById('actionOptions');
    actionOptionsDiv.innerHTML = '';

    // Add back button
    const backBtn = document.createElement('button');
    backBtn.className = 'action-option';
    backBtn.textContent = '← Back';
    backBtn.onclick = () => this.showQuestionButtons();
    actionOptionsDiv.appendChild(backBtn);

    // Basic questions from datagen.js
    const basicQuestions = [
        "Where are you from?",
        "How did you find my page?",
        "How old are you?",
        "What is your job?",
        "What are your hobbies?",
        "What's your favorite TV series?"
    ];

    basicQuestions.forEach(question => {
        const button = document.createElement('button');
        button.className = 'action-option';
        
        // Add visual indicator if question was already asked
        if (this.state.fan.askedBasicQuestions.includes(question)) {
            button.classList.add('asked-question');
            button.title = 'Already asked';
        }
        
        button.textContent = question;
        button.onclick = () => {
            const messageInput = document.getElementById('messageInput');
            messageInput.value = question;
            
            // Store the question for tracking
            if (!this.state.fan.askedBasicQuestions.includes(question)) {
                this.state.fan.askedBasicQuestions.push(question);
            }
            
            // Set appropriate reply based on the question
            switch(question) {
                case "Where are you from?":
                    this.state.pendingFanReply = `I'm from ${this.state.fan.country}!`;
                    break;
                case "How old are you?":
                    this.state.pendingFanReply = `I'm ${this.state.fan.age} years old.`;
                    break;
                case "What is your job?":
                    this.state.pendingFanReply = `I work as a ${this.state.fan.job}.`;
                    break;
                case "What are your hobbies?":
                    this.state.pendingFanReply = `I really enjoy ${this.state.fan.hobby}!`;
                    break;
                case "What's your favorite TV series?":
                    this.state.pendingFanReply = `I love watching ${this.state.fan.tv_series}!`;
                    break;
                case "How did you find my page?":
                    this.state.pendingFanReply = `I found you through ${this.state.fan.find}, and I'm so glad I did!`;
                    break;
                default:
                    this.state.pendingFanReply = "That's an interesting question! Let me think...";
            }
            
            this.state.currentAction = 'question';
            ConversationGame.pendingFanReply = this.state.pendingFanReply;
            
            // Save the updated fan stats
            if (guyInfos[this.state.currentModel]?.[this.state.currentGuy]) {
                guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;
                //guyInfos[this.state.currentModel][this.state.currentGuy].fan.askedBasicQuestions = this.state.fan.askedBasicQuestions;
            }
            
            // Update button appearance
            button.classList.add('asked-question');
        };
        actionOptionsDiv.appendChild(button);
    });
  },

  showDeepQuestions() {
    const actionOptionsDiv = document.getElementById('actionOptions');
    actionOptionsDiv.innerHTML = '';

    // Add back button
    const backBtn = document.createElement('button');
    backBtn.className = 'action-option';
    backBtn.textContent = '← Back';
    backBtn.onclick = () => this.showQuestionButtons();
    actionOptionsDiv.appendChild(backBtn);

    // Only show deep questions for previously asked basic questions
    this.state.fan.askedBasicQuestions.forEach(basicQuestion => {
        const button = document.createElement('button');
        button.className = 'action-option deep-question';
        button.textContent = `Deep: ${basicQuestion}`;
        button.onclick = () => this.showDeepQuestionOptions(basicQuestion);
        actionOptionsDiv.appendChild(button);
    });
  },

  showDeepQuestionOptions(basicQuestion) {
    const actionOptionsDiv = document.getElementById('actionOptions');
    actionOptionsDiv.innerHTML = '';

    // Add back button
    const backBtn = document.createElement('button');
    backBtn.className = 'action-option';
    backBtn.textContent = '← Back';
    backBtn.onclick = () => this.showDeepQuestions();
    actionOptionsDiv.appendChild(backBtn);

    // Show question count if any
    if (this.state.askedDeepQuestions[basicQuestion]) {
        const countDiv = document.createElement('div');
        countDiv.className = 'question-count';
        countDiv.textContent = `Asked: ${this.state.askedDeepQuestions[basicQuestion].count} times`;
        actionOptionsDiv.appendChild(countDiv);
    }

    // Get the deep questions for this basic question
    const deepQuestions = this.generateDeepQuestions(basicQuestion);
    const correctQuestion = deepQuestions[0]; // Store correct question before shuffle

    for (let i = deepQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deepQuestions[i], deepQuestions[j]] = [deepQuestions[j], deepQuestions[i]];
  }
    
    // Create buttons for each deep question
    deepQuestions.forEach(question => {
        const button = document.createElement('button');
        button.className = 'action-option deep-question-option';
        button.textContent = question;
        button.onclick = () => {
            const messageInput = document.getElementById('messageInput');
            messageInput.value = question;
            this.state.currentAction = 'deep-question';
            
            const isCorrect = (question === correctQuestion);
            this.trackDeepQuestion(basicQuestion, isCorrect);
            
            // Generate response based on the question type and correctness
            this.state.pendingFanReply = this.generateDeepQuestionResponse(basicQuestion, isCorrect);
            ConversationGame.pendingFanReply = this.state.pendingFanReply;
            if (isCorrect) {
                this.state.fan.deepForNoReason -= 0.1;
            }
        };
        actionOptionsDiv.appendChild(button);
    });
  },

  generateDeepQuestions(basicQuestion) {
    const questions = [];
    const fan = this.state.fan;
    
    // Get the correct deep question based on the basic question
    switch(basicQuestion) {
        case "Where are you from?": {
            const correct = window.DEEP_QUESTIONS[basicQuestion].correct_generic[0].replace('{detail}', fan.country);
            questions.push(correct);
            // Add two random countries for fake questions
            const otherCountries = countries.filter(c => c.toLowerCase() !== fan.country.toLowerCase());
            const fake1 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[0].replace('{alternative}', otherCountries[Math.floor(Math.random() * otherCountries.length)]);
            const fake2 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[1].replace('{alternative}', otherCountries[Math.floor(Math.random() * otherCountries.length)]);
            questions.push(fake1, fake2);
            break;
        }
        case "What is your job?": {
            const correct = window.DEEP_QUESTIONS[basicQuestion].correct_generic[0].replace('{detail}', fan.job);
            questions.push(correct);
            // Add two random jobs for fake questions
            const otherJobs = jobs.filter(j => j.toLowerCase() !== fan.job.toLowerCase());
            const fake1 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[0].replace('{alternative}', otherJobs[Math.floor(Math.random() * otherJobs.length)]);
            const fake2 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[1].replace('{alternative}', otherJobs[Math.floor(Math.random() * otherJobs.length)]);
            questions.push(fake1, fake2);
            break;
        }
        case "What are your hobbies?": {
            const correct = window.DEEP_QUESTIONS[basicQuestion].correct_generic[0].replace('{detail}', fan.hobby);
            questions.push(correct);
            // Add two random hobbies for fake questions
            const otherHobbies = hobbies.filter(h => h.toLowerCase() !== fan.hobby.toLowerCase());
            const fake1 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[0].replace('{alternative}', otherHobbies[Math.floor(Math.random() * otherHobbies.length)]);
            const fake2 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[1].replace('{alternative}', otherHobbies[Math.floor(Math.random() * otherHobbies.length)]);
            questions.push(fake1, fake2);
            break;
        }
        case "What's your favorite TV series?": {
            const correct = window.DEEP_QUESTIONS[basicQuestion].correct_generic[0].replace('{detail}', fan.tv_series);
            questions.push(correct);
            // Add two random TV series for fake questions
            const otherSeries = tv_series.filter(t => t.toLowerCase() !== fan.tv_series.toLowerCase());
            const fake1 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[0].replace('{alternative}', otherSeries[Math.floor(Math.random() * otherSeries.length)]);
            const fake2 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[1].replace('{alternative}', otherSeries[Math.floor(Math.random() * otherSeries.length)]);
            questions.push(fake1, fake2);
            break;
        }
        case "How old are you?": {
            const correct = window.DEEP_QUESTIONS[basicQuestion].correct_generic[0].replace('{detail}', fan.age);
            questions.push(correct);
            // Add two random ages for fake questions
            const otherAges = [fan.age - 5, fan.age + 5];
            const fake1 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[0].replace('{alternative}', otherAges[0]);
            const fake2 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[1].replace('{alternative}', otherAges[1]);
            questions.push(fake1, fake2);
            break;
        }
        case "How did you find my page?": {
            const correct = window.DEEP_QUESTIONS[basicQuestion].correct_generic[0].replace('{detail}', fan.find);
            questions.push(correct);
            // Add two random find for fake questions
            const otherFind = where_find.filter(f => f.toLowerCase() !== fan.find.toLowerCase());
            const fake1 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[0].replace('{alternative}', otherFind[Math.floor(Math.random() * otherFind.length)]);
            const fake2 = window.DEEP_QUESTIONS[basicQuestion].fake_generic[1].replace('{alternative}', otherFind[Math.floor(Math.random() * otherFind.length)]);
            questions.push(fake1, fake2);
            break;
        }
    }
    
    
    
    return questions;
  },

  // Add CSS for deep questions
  addDeepQuestionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .deep-question {
            background-color: #4a5568;
            color: white;
        }
        .deep-question-option {
            background-color: #2d3748;
            color: white;
        }
        .question-count {
            color: #718096;
            font-size: 0.9em;
            margin: 8px 0;
            text-align: center;
        }
    `;
    document.head.appendChild(style);
  },

  showMainButtons() {
    const actionOptionsDiv = document.getElementById('actionOptions');
    actionOptionsDiv.innerHTML = ''; // Clear existing buttons
    
    const actions = [
        { text: "Convo", action: "convo" },
        { text: "Tease", action: "tease" },
        { text: "Questions", action: "questions" },
        { text: "Sext", action: "sext" },
        { text: "Sell Content", action: "sell" },
        { text: "Cuddle", action: "cuddle" }
    ];

    this.checkGameState();
    this.updateGameUI();

    actions.forEach(action => {
        const button = document.createElement('button');
        button.className = 'action-option';
        button.textContent = action.text;
        button.onclick = () => {
            if (action.action === 'questions') {
                this.showQuestionButtons();
                this.state.currentAction = action;

                // Pre-generate the fan reply but don't send it yet
                

                // Save updated fan stats after each action
                guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;

                this.checkGameState();
                this.updateGameUI();
            } else {
                this.handleAction(action.action);
            }
        };
        actionOptionsDiv.appendChild(button);
    });
  },

  // Add method to track deep questions
  trackDeepQuestion(basicQuestion, wasCorrect) {
    if (!this.state.askedDeepQuestions[basicQuestion]) {
        this.state.askedDeepQuestions[basicQuestion] = {
            count: 0,
            correctCount: 0
        };
    }
    this.state.askedDeepQuestions[basicQuestion].count++;
    if (wasCorrect) {
        this.state.askedDeepQuestions[basicQuestion].correctCount++;
    }

    // Save to guy info
    if (guyInfos[this.state.currentModel]?.[this.state.currentGuy]) {
        guyInfos[this.state.currentModel][this.state.currentGuy].askedDeepQuestions = this.state.askedDeepQuestions;
    }
  },

  // Add method to generate varied responses
  generateDeepQuestionResponse(basicQuestion, isCorrect) {
    const fan = this.state.fan;
    
    if (!isCorrect) {
        const confusedResponses = [
            "Hmm, I'm not sure what you mean...",
            "That doesn't sound quite right...",
            "I think there might be a misunderstanding...",
            "Did I say that? I don't remember...",
            "I'm a bit confused by your question..."
        ];
        return confusedResponses[Math.floor(Math.random() * confusedResponses.length)];
    }

    // Correct response based on question type
    const responses = {
        "Where are you from?": [
            `Living in ${fan.country} has been amazing! The culture here is so rich.`,
            `I love ${fan.country}! There's always something exciting happening here.`,
            `${fan.country} has been my home for years, and I wouldn't have it any other way.`
        ],
        "What is your job?": [
            `Being a ${fan.job} is challenging but rewarding. I love the opportunities it gives me.`,
            `Working as a ${fan.job} has taught me so much about myself and others.`,
            `I'm passionate about my work as a ${fan.job}. It's more than just a job to me.`
        ],
        "What are your hobbies?": [
            `${fan.hobby} has been my passion for years! It helps me relax and express myself.`,
            `I could talk about ${fan.hobby} for hours! It's such an important part of my life.`,
            `${fan.hobby} really helps me unwind after a long day. It's my favorite way to spend free time.`
        ],
        "What's your favorite TV series?": [
            `${fan.tv_series} just hits different! The storytelling is incredible.`,
            `I've watched ${fan.tv_series} multiple times. It never gets old!`,
            `The characters in ${fan.tv_series} are so well-written. I'm totally invested.`
        ],
        "How old are you?": [
            `Being ${fan.age} is interesting - old enough to know better, young enough to still have fun!`,
            `At ${fan.age}, I feel like I'm really coming into my own.`,
            `${fan.age} is a great age - I feel like I have the perfect balance of experience and energy.`
        ],
        "How did you find my page?": [
            "Social media has a way of connecting the right people, don't you think?",
            "I'm so glad the algorithm brought me to your page!",
            "It feels like fate that I found your content when I did."
        ]
    };

    const questionResponses = responses[basicQuestion] || ["That's a really thoughtful question! Let me think about that..."];
    return questionResponses[Math.floor(Math.random() * questionResponses.length)];
  },

  handleConvoClick() {
    const actionOptionsDiv = document.getElementById('actionOptions');
    actionOptionsDiv.innerHTML = ''; // Clear existing options

    // Create basic convo button with random message from CONVOS2
    const basicConvoBtn = document.createElement('button');
    basicConvoBtn.className = 'action-option';
    basicConvoBtn.textContent = window.CONVOS2[Math.floor(Math.random() * window.CONVOS2.length)][0];
    basicConvoBtn.onclick = () => this.handleBasicConvo(false);

    // Create sexual convo button
    const sexualConvoBtn = document.createElement('button');
    sexualConvoBtn.className = 'action-option';
    sexualConvoBtn.textContent = window.convos_sexual[Math.floor(Math.random() * window.convos_sexual.length)][0];
    sexualConvoBtn.onclick = () => this.handleBasicConvo(true);

    const basicQuestionsHeader = document.createElement('div');
    basicQuestionsHeader.textContent = 'Basic Convo:';
    actionOptionsDiv.appendChild(basicQuestionsHeader);
    actionOptionsDiv.appendChild(basicConvoBtn);
    actionOptionsDiv.appendChild(sexualConvoBtn);
    console.log("CONVOS2", window.CONVOS2);
    console.log("fan.askedBasicQuestions", ConversationGame.state.fan.askedBasicQuestions);

    // Create deep questions button if fan has answered basic questions
    if (this.state.fan.askedBasicQuestions && this.state.fan.askedBasicQuestions.length > 0) {
      const deepQuestionsHeader = document.createElement('div');
      deepQuestionsHeader.className = 'deep-questions-header';
      deepQuestionsHeader.textContent = 'Deep Convo:';
      actionOptionsDiv.appendChild(deepQuestionsHeader);

      // Get 3 random questions if more than 3 have been asked
      let questionsToShow = this.state.fan.askedBasicQuestions;
      if (this.state.fan.askedBasicQuestions.length > 3) {
        questionsToShow = this.state.fan.askedBasicQuestions
          .sort(() => 0.5 - Math.random()) // Shuffle array
          .slice(0, 3); // Take first 3
      }

      // For each question to show, create two deep question buttons
      questionsToShow.forEach(basicQuestion => {
        // Create container for this question's buttons
        const questionContainer = document.createElement('div');
        questionContainer.className = 'deep-question-container';

        // Create button using fan's actual info
        const correctButton = document.createElement('button');
        correctButton.className = 'action-option deep-question-option';
        let correctText = '';
        switch(basicQuestion) {
          case "Where are you from?":
            const countryConvo = window.countryconvos[Math.floor(Math.random() * window.countryconvos.length)];
            correctText = countryConvo[0].replace("{country}", this.state.fan.country);
            this.state.pendingFanReply = countryConvo[1];
            break;
          case "What is your job?":
            const jobConvo = window.jobconvos[Math.floor(Math.random() * window.jobconvos.length)];
            correctText = jobConvo[0].replace("{job}", this.state.fan.job);
            this.state.pendingFanReply = jobConvo[1];
            break;
          case "What are your hobbies?":
            const hobbyConvo = window.hobbyconvos[Math.floor(Math.random() * window.hobbyconvos.length)];
            correctText = hobbyConvo[0].replace("{hobby}", this.state.fan.hobby);
            this.state.pendingFanReply = hobbyConvo[1];
            break;
          case "What's your favorite TV series?":
            const tvConvo = window.tvserieconvos[Math.floor(Math.random() * window.tvserieconvos.length)];
            correctText = tvConvo[0].replace("{tv_series}", this.state.fan.tv_series);
            this.state.pendingFanReply = tvConvo[1];
            break;
          case "How old are you?":
            const ageConvo = window.ageconvos[Math.floor(Math.random() * window.ageconvos.length)];
            correctText = ageConvo[0].replace("{age}", this.state.fan.age);
            this.state.pendingFanReply = ageConvo[1];
            break;
          case "How did you find my page?":
            const findConvo = window.findconvos[Math.floor(Math.random() * window.findconvos.length)];
            correctText = findConvo[0].replace("{find}", this.state.fan.find);
            this.state.pendingFanReply = findConvo[1];
            break;
        }
        correctButton.textContent = correctText;
        correctButton.onclick = () => {
          const messageInput = document.getElementById('messageInput');
          messageInput.value = correctText;
          this.state.currentAction = 'deep-question';
          this.state.fan.deepForNoReason -= 0.1;
         // this.state.pendingFanReply = "Wow, you really remember! That means a lot to me 🥰";
          ConversationGame.pendingFanReply = this.state.pendingFanReply;
        };

        

        // Create button with wrong info
        const wrongButton = document.createElement('button');
        wrongButton.className = 'action-option deep-question-option';
        let wrongText = '';
        switch(basicQuestion) {
          case "Where are you from?":
            wrongText = window.countryconvos[Math.floor(Math.random() * window.countryconvos.length)][0].replace("{country}", countries.find(c => c.toLowerCase() !== this.state.fan.country.toLowerCase()));
            break;
          case "What is your job?":
            wrongText = window.jobconvos[Math.floor(Math.random() * window.jobconvos.length)][0].replace("{job}", jobs.find(j => j.toLowerCase() !== this.state.fan.job.toLowerCase()));
            break;
          case "What are your hobbies?":
            wrongText = window.hobbyconvos[Math.floor(Math.random() * window.hobbyconvos.length)][0].replace("{hobby}", hobbies.find(h => h.toLowerCase() !== this.state.fan.hobby.toLowerCase()));
            break;
          case "What's your favorite TV series?":
            wrongText = window.tvserieconvos[Math.floor(Math.random() * window.tvserieconvos.length)][0].replace("{tv_series}", tv_series.find(t => t.toLowerCase() !== this.state.fan.tv_series.toLowerCase()));
            break;
          case "How old are you?":
            wrongText = window.ageconvos[Math.floor(Math.random() * window.ageconvos.length)][0].replace("{age}", this.state.fan.age + 5);
            break;
          case "How did you find my page?":
            wrongText = `Did you find my page through ${where_find.find(w => w.toLowerCase() !== this.state.fan.find.toLowerCase())}?`;
            break;
        }
        wrongButton.textContent = wrongText;
        wrongButton.onclick = () => {
          const messageInput = document.getElementById('messageInput');
          messageInput.value = wrongText;
          this.state.currentAction = 'deep-question';
          this.state.fan.deepForNoReason += 0.2;
          this.state.pendingFanReply = "Um... I think you might be mixing me up with someone else...";
          ConversationGame.pendingFanReply = this.state.pendingFanReply;
        };

        questionContainer.appendChild(correctButton);
        questionContainer.appendChild(wrongButton);
        actionOptionsDiv.appendChild(questionContainer);
      });
    }
  },

  handleBasicConvo(isSexual) {
    const messageArray = isSexual ? window.CONVOS_SEXUAL : window.CONVOS2;
    const randomConvo = messageArray[Math.floor(Math.random() * messageArray.length)];
    
    // Add the message to chat
    // this.addMessage('girl', randomConvo[0], 'convo');
    messageInput.value = randomConvo[0];
    ConversationGame.state.currentAction='convo';

    
    // Store the fan's reply for when they respond
    this.state.pendingFanReply = randomConvo[1];
    ConversationGame.pendingFanReply = randomConvo[1];

    
    // Show the main buttons again
    // this.showMainButtons();
    
    // Perform the action effects
    // this.performAction('convo');
  },
};

// Modify the existing guy click handler to initialize a new game
document.addEventListener("DOMContentLoaded", function() {
  // Create game action buttons
  const actionOptionsDiv = document.getElementById('actionOptions');
  const actions = [
    { text: "Convo", action: "convo" },
    { text: "Tease", action: "tease" },
    { text: "Ask Question", action: "question" },
    { text: "Sext", action: "sext" },
    { text: "Sell Content", action: "sell" },
    { text: "Cuddle", action: "cuddle" }
  ];

  actions.forEach(action => {
    const button = document.createElement('button');
    button.className = 'action-option';
    button.textContent = action.text;
    button.onclick = () => ConversationGame.handleAction(action.action);
    actionOptionsDiv.appendChild(button);
  });

  // Modify existing guy click handler
  const guys = document.querySelectorAll('.guy');
  guys.forEach(function(guyDiv) {
    guyDiv.addEventListener('click', function() {
      clearGuySelection();
      guyDiv.classList.add('active');
      currentGuy = guyDiv.dataset.guy;
      chatHeaderElem.textContent = "Chat with " + currentGuy;
      
      // Initialize new game when selecting a guy
      ConversationGame.initialize(currentModel, currentGuy);
      
      // Enable message input
      messageInput.disabled = false;
    });
  });

  // Modify the existing click handler for the send button
  const sendBtn = document.getElementById('sendBtn');
  const messageInput = document.getElementById('messageInput');

  // Keep input always disabled
  messageInput.disabled = true;

  sendBtn.addEventListener('click', () => {
    if (messageInput.value.trim() !== '' && ConversationGame.state.currentAction) {
      const messageText = messageInput.value;
      if ((messageText !== "" || currentAttachments.length > 0) && currentGuy) { 
            if (!chatHistory[currentModel][currentGuy]) {
              chatHistory[currentModel][currentGuy] = [];
            }
            const messageObject = {
              sender: 'girl',
              text: messageText,
              attachments: [],
              price: currentAttachments.length > 0 ? priceInput.value : "",
              action: ConversationGame.state.currentAction
            };
            currentAttachments.forEach(att => {
              messageObject.attachments.push({
                previewUrl: att.previewUrl,
                name: att.name
              });
              
              // 50% chance guy buys the image
              if (Math.random() < 0.5 || priceInput.value == "") {
                ConversationGame.state.fan.imagesSold.push(att.name);
                // Change price text from "Price: X$" to "Bought: X$"
                messageObject.price = "(Bought) " + priceInput.value + "$";
              }
            // Print fan stats to console
              ptintFan();
            });
            chatHistory[currentModel][currentGuy].push(messageObject);
            renderMessage(messageObject);
            //ConversationGame.addMessage('girl', messageText, ConversationGame.state.currentAction);
            ConversationGame.performAction(ConversationGame.state.currentAction);
            
            messageInput.value = "";
            currentAttachments = [];
            updateSelectedAttachmentsUI();
            priceInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
      }
      
      
      
      setTimeout(() => {
          ConversationGame.addMessage('guy', ConversationGame.pendingFanReply );
      }, 1000 + Math.random() * 2000);
      
      // Save updated fan stats after each action
      guyInfos[ConversationGame.state.currentModel][ConversationGame.state.currentGuy].fanStats = ConversationGame.state.fan;

      // Update the game UI to show new stats
      ConversationGame.updateGameUI();
      ConversationGame.showMainButtons();
      
      // Clear the input and current action
      messageInput.value = '';
      ConversationGame.state.currentAction = null;
    }
  });

  // Add enter key support
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendBtn.click();
    }
  });
});

// Helper function for random conversations
function ptintFan() {
  const fan = ConversationGame.state.fan;
  console.log('Fan Stats:', {
    hornyLevel: ConversationGame.state.fan.hornyLevel,
    sexiness: ConversationGame.state.fan.sexiness, 
    charisma: ConversationGame.state.fan.charisma,
    teases: ConversationGame.state.fan.teases,
    cuddles: ConversationGame.state.fan.cuddles,
    ppvToBuy: ConversationGame.state.fan.ppvToBuy,
    sexts: ConversationGame.state.fan.sexts,
    convos: ConversationGame.state.fan.convos,
    questions: ConversationGame.state.fan.questions,
    ppvBought: ConversationGame.state.fan.ppvBought,
    maxPPVValueTierBought: ConversationGame.state.fan.maxPPVValueTierBought,
    imagesSold: ConversationGame.state.fan.imagesSold,
    deepForNoReason: ConversationGame.state.fan.deepForNoReason,
    age: ConversationGame.state.fan.age,
    country: ConversationGame.state.fan.country,
    region: ConversationGame.state.fan.region,
    job: ConversationGame.state.fan.job,
    hobby: ConversationGame.state.fan.hobby,
    tv_series: ConversationGame.state.fan.tv_series,
    sold: ConversationGame.state.fan.sold
  });

}

function getRandomConversation(action, isSexual = false) {
    let convoArray;
    
    try {
        // Select appropriate conversation array based on action and sexual context
        switch(action) {
            case 'convo':
                returnConvo();
                ConversationGame.handleConvoClick();

                console.log('isSexual', isSexual);
                convoArray = isSexual ? window.CONVOS_SEXUAL : window.CONVOS2;



                break;
            case 'job':
                convoArray = isSexual ? window.JOBCONVOS_SEXUAL : window.JOBCONVOS;
                break;
            case 'age':
                convoArray = isSexual ? window.AGECONVOS_SEXUAL : window.AGECONVOS;
                break;
            case 'hobby':
                convoArray = isSexual ? window.HOBBICONVOS_SEXUAL : window.HOBBICONVOS;
                break;
            case 'country':
                convoArray = isSexual ? window.COUNTRYCONVOS_SEXUAL : window.COUNTRYCONVOS;
                break;
            case 'tv':
                convoArray = isSexual ? window.TVSERIESCONVOS_SEXUAL : window.TVSERIESCONVOS;
                break;
            default:
                convoArray = isSexual ? window.CONVOS_SEXUAL : window.CONVOS;
        }

        // Check if array exists and has elements
        if (convoArray && Array.isArray(convoArray) && convoArray.length > 0) {
            return convoArray[Math.floor(Math.random() * convoArray.length)];
        }
    } catch (error) {
        console.log('Error getting conversation:', error);
    }

    // Fallback default conversation pairs
    const defaultConvos = {
        'convo': ["Hey, how are you doing today?", "I'm doing great, thanks for asking!"],
        'tease': ["You're so sweet, I love chatting with you 😘", "Aww, you're making me blush! 😊"],
        'question': ["Can I ask you something?", "Of course, ask away!"],
        'sext': ["I've been thinking about you... 😏", "Oh really? Tell me more... 😈"],
        'sell': ["I have something special for you...", "Ooh, what is it? 😍"],
        'cuddle': ["Wish I could give you a big hug right now 🤗", "That would be so nice! 🥰"]
    };

    return defaultConvos[action] || defaultConvos['convo'];
}

// Add some CSS for the asked questions
const style = document.createElement('style');
style.textContent = `
    .action-option.asked-question {
        opacity: 0.7;
        background-color: #ddd;
        text-decoration: line-through;
    }
`;
document.head.appendChild(style); 


// Modal Event Listeners for Photo Selection 
addPhotoBtn.addEventListener('click', async function() {
  await populateAvailablePhotos(); // Call existing function from script.js
  photoModal.style.display = "block";
});
closeModal.addEventListener('click', function() {
  photoModal.style.display = "none";
});
cancelAttachmentsBtn.addEventListener('click', function() {
  photoModal.style.display = "none";
});
addAttachmentsBtn.addEventListener('click', function() {
  modalSelectedPhotos.forEach(photo => {
    if (!currentAttachments.some(att => att.previewUrl === photo.previewUrl)) {
      currentAttachments.push(photo);
    }
  });
  updateSelectedAttachmentsUI();
  photoModal.style.display = "none";
});