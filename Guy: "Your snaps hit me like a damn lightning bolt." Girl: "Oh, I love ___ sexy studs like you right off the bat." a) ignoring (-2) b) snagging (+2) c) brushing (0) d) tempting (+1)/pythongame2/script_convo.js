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
    window.totalsold = 0;


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
    askedDeepQuestions: {},
    deepConvoHistory: {
      count: 0,
      lastUsed: 0,
      correctCount: 0
    },
    pendingDeepQuestion: {
        isActive: false,
        basicQuestion: '',
        selectedQuestion: '',
        isCorrect: false
    },
    pendingDeepConvo: {
        isActive: false,
        topic: '',
        response: '',
        isCorrect: false
    },
    examMode: {
        active: false,
        startTime: null,
        sales: [],
        totalSold: 0,
        timer: null
    }
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
        this.resetState();
        this.state.fan = this.generateFan();
        // Save the initial fan stats
        if (!guyInfos[currentModel]) {
            guyInfos[currentModel] = {};
        }
        if (!guyInfos[currentModel][currentGuy]) {
            guyInfos[currentModel][currentGuy] = { bio: "Default bio" };
        }
        guyInfos[currentModel][currentGuy].fanStats = this.state.fan;
        
        setTimeout(() => {
          ConversationGame.addMessage('guy', "Hey Babbe hru?" );
      }, 1000 + Math.random() * 2000);
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

  // Reset game state and generate new fan
  resetState() {
    // Generate new fan
    this.state.fan = this.generateFan();

    // Reset game state
    this.state.chatInfo = {
        uniqueQuestions: [],
        answers: {}
    };
    this.state.roundCounter = 0;
    this.state.currentAction = null;
    this.state.pendingFanReply = null;
    this.state.askedBasicQuestions = [];
    this.state.askedDeepQuestions = {};

    // Clear chat history
    if (chatHistory[this.state.currentModel] && chatHistory[this.state.currentModel][this.state.currentGuy]) {
        chatHistory[this.state.currentModel][this.state.currentGuy] = [];
        
        // Clear the chat messages display
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
        }
    }

    // Save the new fan stats
    if (!guyInfos[this.state.currentModel]) {
        guyInfos[this.state.currentModel] = {};
    }
    if (!guyInfos[this.state.currentModel][this.state.currentGuy]) {
        guyInfos[this.state.currentModel][this.state.currentGuy] = { bio: "Default bio" };
    }
    guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;

    updateTotalSalesDisplay();
  },

  // Fan generation function

  

  generateFan() {
    return {
      hornyLevel: 10,
      sexiness: 100,
      charisma: 35,
      teases: 0,
      cuddles: 0,
      ppvToBuy: 7.5,
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
      deepForNoReason: 0.05,
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
            <p>Deep For No Reason: ${(this.state.fan.deepForNoReason*100).toFixed(1)}%</p>
            <p>Money Made: $${this.state.fan.sold}</p>
            <p>PPVs to Buy: ${this.state.fan.ppvToBuy}</p>
            <p>Max PPV Tier: ${this.state.fan.maxPPVValueTierBought}</p>
            <p>Questions: ${this.state.fan.questions}</p>
            <p>Teases: ${this.state.fan.teases}</p>
            <p>Sexts: ${this.state.fan.sexts}</p>
            <p>Cuddles: ${this.state.fan.cuddles}</p>
            <p>Convos: ${this.state.fan.convos}</p>
            <p>PPVs Bought: ${this.state.fan.ppvBought}</p>
         
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
                  this.state.currentAction = 'sell';
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

    //this.checkGameState();
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
      this.resetState();
      return;
    }

    if (this.state.fan.maxPPVValueTierBought === 7) {
      if (this.state.fan.hornyLevel > 30 && this.state.fan.sexiness > 50 && this.state.fan.charisma > 50) {
        const tipAmount = this.state.fan.hornyLevel + this.state.fan.sexiness + this.state.fan.charisma;
        this.state.sales += tipAmount;
        this.state.totalSend += tipAmount;
        window.totalsold += tipAmount;
        trackExamSale(tipAmount, "Max PPV Tier");
        alert( 'OMG I will come tomorrow! Thanks for the experience! Here is a tip of $' + tipAmount);
      } else {
        alert('Game Over: Reached max PPV tier');
      }
      let salesDisplay = document.getElementById('totalSalesDisplay');
      salesDisplay.textContent = `Total Sales: $${window.totalsold.toFixed(2)}`;
      this.state.fan = this.generateFan();
      guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;
      this.resetState();
      return;
    }

    if (this.state.fan.ppvToBuy < 1) {
      if (this.state.fan.hornyLevel > 30 && this.state.fan.sexiness > 50 && this.state.fan.charisma > 50) {
        const tipAmount = this.state.fan.hornyLevel + this.state.fan.sexiness + this.state.fan.charisma;
        this.state.sales += tipAmount;
        this.state.totalSend += tipAmount;
        window.totalsold += tipAmount;
        trackExamSale(tipAmount, "Max PPV Tier");
        alert( 'OMG I will come tomorrow! Thanks for the experience! Here is a tip of $' + tipAmount);
      } else {
        alert('Game Over: No more PPVs to buy');
      }
      let salesDisplay = document.getElementById('totalSalesDisplay');
      salesDisplay.textContent = `Total Sales: $${window.totalsold.toFixed(2)}`;

      this.state.fan = this.generateFan();
      guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;
      this.resetState();
      return;
    }

    if (Math.random() < this.state.fan.deepForNoReason) {
      if (this.state.fan.hornyLevel > 30 && this.state.fan.sexiness > 50 && this.state.fan.charisma > 50) {
        const tipAmount = this.state.fan.hornyLevel + this.state.fan.sexiness + this.state.fan.charisma;
        this.state.sales += tipAmount;
        this.state.totalSend += tipAmount;
        window.totalsold += tipAmount;
        trackExamSale(tipAmount, "Deeped out, but");
        alert( 'OMG I will come tomorrow! Thanks for the experience! Here is a tip of $' + tipAmount);
      } else {
        alert('Game Over: Fan deeped out');
      }
      let salesDisplay = document.getElementById('totalSalesDisplay');
      salesDisplay.textContent = `Total Sales: $${window.totalsold.toFixed(2)}`;

      this.state.fan = this.generateFan();
      guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;
      this.resetState();
      return;
    }

    this.state.roundCounter++;
    // Every 5 rounds, increase chance of fan "deeping"
    if (this.state.roundCounter % 5 === 0) {
      this.state.fan.deepForNoReason += 0.01;
    }
    updateTotalSalesDisplay();

    
  },

  // Add new method to handle the action effects
  performAction(action) {
    // Helper function to reset all recurring counters except the specified one
    const resetRecurringCounters = (exceptAction) => {
        const counters = ['Convos', 'Teases', 'Sexts', 'Cuddles', 'Questions'];
        counters.forEach(counter => {
            if (`recurring${counter}` !== `recurring${exceptAction}`) {
                this.state.fan[`recurring${counter}`] = 0;
            }
        });
    };

    switch(action) {
        case 'convo':
            this.state.fan.convos++;
            this.state.fan.recurringConvos = (this.state.fan.recurringConvos || 0) + 1;
            resetRecurringCounters('Convos');
            
            if (this.state.fan.recurringConvos < 4) {
                this.state.fan.charisma += 1;
            } else {
                this.state.fan.hornyLevel -= 1;
                this.state.fan.sexiness -= 1;
                this.state.fan.deepForNoReason += 0.01;
            }
            break;

        case 'tease':
            this.state.fan.teases++;
            this.state.fan.recurringTeases = (this.state.fan.recurringTeases || 0) + 1;
            resetRecurringCounters('Teases');
            
            if (this.state.fan.recurringTeases < 3) {
                this.state.fan.sexiness += 1;
                this.state.fan.hornyLevel += 1;
            } else {
                this.state.fan.hornyLevel -= 1;
                this.state.fan.charisma -= 2;
                this.state.fan.deepForNoReason += 0.01;
            }
            break;

        case 'sext':
            this.state.fan.sexts++;
            this.state.fan.recurringSexts = (this.state.fan.recurringSexts || 0) + 1;
            resetRecurringCounters('Sexts');
            
            if (this.state.fan.recurringSexts < 4) {
                this.state.fan.hornyLevel++;
            } else {
                this.state.fan.hornyLevel--;
                this.state.fan.charisma--;
                this.state.fan.deepForNoReason += 0.01;
            }

            if (this.state.fan.questions < 1 && this.state.fan.teases < 1 && this.state.fan.hornyLevel < 25) {
                this.state.fan.sexiness -= 2;
                this.state.fan.hornyLevel -= 2;
                this.state.fan.deepForNoReason += 0.05;
            }

            if ((this.state.fan.questions < 1 || this.state.fan.teases < 1) && this.state.fan.hornyLevel < 29) {
                this.state.fan.sexiness -= 1;
                this.state.fan.hornyLevel -= 1;
                this.state.fan.deepForNoReason += 0.02;
            }
            break;

        case 'cuddle':
            this.state.fan.cuddles++;
            this.state.fan.recurringCuddles = (this.state.fan.recurringCuddles || 0) + 1;
            resetRecurringCounters('Cuddles');
            
            if (this.state.fan.ppvToBuy > 2) {
                this.state.fan.deepForNoReason+=0.1;
                this.state.fan.charisma++;
                this.state.fan.hornyLevel = Math.floor(this.state.fan.hornyLevel / 1.3);
                this.state.fan.sexiness++;
            } else if (this.state.fan.ppvToBuy > 0) {
                this.state.fan.ppvToBuy = 1;
                this.state.fan.charisma++;
                this.state.fan.hornyLevel -= 2;
                this.state.fan.sexiness += 3;
            } else if (this.state.fan.ppvToBuy < 2) {
                this.state.fan.charisma += 10;
                this.state.fan.sexiness += 3;
            }
            break;

        case 'sell':
            this.state.fan.ppvToBuy -= 0.5;
            this.state.fan.deepForNoReason += 0.01;
            resetRecurringCounters('');  // Reset all counters
            break;

        case 'question':
            this.state.fan.questions++;
            this.state.fan.askedBasicQuestions.push(messageInput.value);
            this.state.fan.recurringQuestions = (this.state.fan.recurringQuestions || 0) + 1;
            resetRecurringCounters('Questions');

            if (this.state.fan.recurringQuestions < 3) { 
                this.state.fan.charisma++;
            } else {
                this.state.fan.hornyLevel--;
                this.state.fan.sexiness--;
                this.state.fan.deepForNoReason += 0.01;
            }
            break;

        case 'deep-question':
            this.state.fan.questions++;
            resetRecurringCounters('');  // Reset all counters
            if (!this.state.askedDeepQuestions[this.state.pendingDeepQuestion.basicQuestion]) {
              this.state.askedDeepQuestions[this.state.pendingDeepQuestion.basicQuestion] = {
                  count: 0,
                  correctCount: 0
              };
          }
            if (this.state.pendingDeepQuestion.isActive) {
              if (this.state.pendingDeepQuestion.isCorrect && this.state.askedDeepQuestions[this.state.pendingDeepQuestion.basicQuestion].count < 2) {
                  this.state.fan.deepForNoReason -= 0.02;
              } else {
                  this.state.fan.deepForNoReason += 0.02;
                  this.state.fan.hornyLevel -= 1;
                  this.state.fan.sexiness -= 1;
                  this.state.fan.charisma -= 5;
              }
              
              // Track the question in state
              
              // this.state.askedDeepQuestions[this.state.pendingDeepQuestion.basicQuestion].count++;
              // if (this.state.pendingDeepQuestion.isCorrect) {
              //     this.state.askedDeepQuestions[this.state.pendingDeepQuestion.basicQuestion].correctCount++;
              // }
              this.trackDeepQuestion(this.state.pendingDeepQuestion.basicQuestion, this.state.pendingDeepQuestion.isCorrect);
      
              // Reset pending deep question
              this.state.pendingDeepQuestion = {
                  isActive: false,
                  basicQuestion: '',
                  selectedQuestion: '',
                  isCorrect: false
              };
              
              // Update game state
              this.state.fan.questions++;
              resetRecurringCounters('');
          }
      
            break;

        case 'deep-convo':
            
          if (this.state.pendingDeepConvo.isActive) {
            this.state.fan.convos++;
            resetRecurringCounters('');
            
            // if (this.state.fan.recurringDeepConvos < 3) {
            //     this.state.fan.charisma++;
            //     this.state.fan.hornyLevel++;
            //     this.state.fan.deepForNoReason -= 0.005;
            // } else {
            //     this.state.fan.hornyLevel--;
            //     this.state.fan.sexiness--;
            //     this.state.fan.deepForNoReason += 0.01;
            // }
    
            // Track the conversation if needed
            if (!this.state.deepConvoHistory) {
                this.state.deepConvoHistory = {};
            }
            if (!this.state.deepConvoHistory[this.state.pendingDeepConvo.topic]) {
                this.state.deepConvoHistory[this.state.pendingDeepConvo.topic] = {
                    count: 0,
                    lastUsed: 0,
                    correctCount: 0
                };
            }
            this.state.deepConvoHistory[this.state.pendingDeepConvo.topic].count++;
            this.state.deepConvoHistory[this.state.pendingDeepConvo.topic].lastUsed = this.state.roundCounter;
            if (this.state.pendingDeepConvo.isCorrect) {
                this.state.deepConvoHistory[this.state.pendingDeepConvo.topic].correctCount++;
                this.state.fan.deepForNoReason -= 0.005;
            } else {
                this.state.deepConvoHistory[this.state.pendingDeepConvo.topic].correctCount--;
                this.state.fan.deepForNoReason += 0.05;
                this.state.fan.hornyLevel -= 1;
                this.state.fan.sexiness -= 3;
                this.state.fan.charisma -= 4;
            }
            // Reset pending deep convo
            this.state.pendingDeepConvo = {
                isActive: false,
                topic: '',
                response: '',
                isCorrect: false
            };
    
            resetRecurringCounters('DeepConvos');
        }
    
          break;
    }

    // Save updated fan stats after each action
    guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;
    
    this.checkGameState();
    this.updateGameUI();
  },

  showQuestionButtons() {
    // Clear all pending states
    this.state.pendingFanReply = "";
    this.state.pendingDeepQuestion = {
        isActive: false,
        basicQuestion: '',
        selectedQuestion: '',
        isCorrect: false
    };
    this.state.pendingDeepConvo = {
        isActive: false,
        topic: '',
        response: '',
        isCorrect: false
    };

    // Clear message input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.value = "";
    }

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
                //this.state.fan.askedBasicQuestions.push(question);
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
            // this.trackDeepQuestion(basicQuestion, isCorrect);
            
            // Generate response based on the question type and correctness
            this.state.pendingFanReply = this.generateDeepQuestionResponse(basicQuestion, isCorrect);
            ConversationGame.pendingFanReply = this.state.pendingFanReply;
            // if (isCorrect) {
            //     this.state.fan.deepForNoReason -= 0.02;
            // }
            // else {
            //     this.state.fan.deepForNoReason += 0.02;
            //     this.state.fan.hornyLevel -= 1;
            //     this.state.fan.sexiness -= 1;
            //     this.state.fan.charisma -= 5;
            // }
            this.state.pendingDeepQuestion = {
              isActive: true,
              basicQuestion: basicQuestion,
              selectedQuestion: question,
              isCorrect: (question === correctQuestion)
          };
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
    // Clear all pending states
    this.state.pendingFanReply = "";
    this.state.pendingDeepQuestion = {
        isActive: false,
        basicQuestion: '',
        selectedQuestion: '',
        isCorrect: false
    };
    this.state.pendingDeepConvo = {
        isActive: false,
        topic: '',
        response: '',
        isCorrect: false
    };
    this.state.currentAction = null;

    // Clear message input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.value = '';
    }
    this.state.currentAction = null;
    const actionOptionsDiv = document.getElementById('actionOptions');
    actionOptionsDiv.innerHTML = ''; // Clear existing buttons
    let actions = [
      { text: "Convo", action: "convo" },
      { text: "Tease", action: "tease" },
    { text: "Sext", action: "sext" },
    { text: "Sell Content", action: "sell" },
    { text: "Cuddle", action: "cuddle" }
    ];

    if (this.state.roundCounter> 0) {
       actions = [
          { text: "Convo", action: "convo" },
          { text: "Tease", action: "tease" },
          { text: "Questions", action: "questions" },
        { text: "Sext", action: "sext" },
        { text: "Sell Content", action: "sell" },
        { text: "Cuddle", action: "cuddle" }
    ];  
    }

    //this.checkGameState();
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
                //guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;

                //this.checkGameState();
                //this.updateGameUI();
            } 
            else if (action.action === 'convo') {
              this.handleConvoClick();
              this.state.currentAction = action;

              // Pre-generate the fan reply but don't send it yet
              

              // Save updated fan stats after each action
              // guyInfos[this.state.currentModel][this.state.currentGuy].fanStats = this.state.fan;

              // this.checkGameState();
              // this.updateGameUI();
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
    this.state.askedDeepQuestions[basicQuestion].count += 1;
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
        if (this.state.fan.sexts < 2 || this.state.fan.hornyLevel < 24) {
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
        }
        else {
          //sexy convos
          switch(basicQuestion) {
            case "Where are you from?":
              const countryConvo = window.countryconvos_sexual[Math.floor(Math.random() * window.countryconvos_sexual.length)];
              correctText = countryConvo[0].replace("{country}", this.state.fan.country);
              this.state.pendingFanReply = countryConvo[1];
              break;
            case "What is your job?":
              const jobConvo = window.jobconvos_sexual[Math.floor(Math.random() * window.jobconvos_sexual.length)];
              correctText = jobConvo[0].replace("{job}", this.state.fan.job);
              this.state.pendingFanReply = jobConvo[1];
              break;
            case "What are your hobbies?":
              const hobbyConvo = window.hobbyconvos_sexual[Math.floor(Math.random() * window.hobbyconvos_sexual.length)];
              correctText = hobbyConvo[0].replace("{hobby}", this.state.fan.hobby);
              this.state.pendingFanReply = hobbyConvo[1];
              break;
            case "What's your favorite TV series?":
              const tvConvo = window.tvserieconvos_sexual[Math.floor(Math.random() * window.tvserieconvos_sexual.length)];
              correctText = tvConvo[0].replace("{tv_series}", this.state.fan.tv_series);
              this.state.pendingFanReply = tvConvo[1];
              break;
            case "How old are you?":
              const ageConvo = window.ageconvos_sexual[Math.floor(Math.random() * window.ageconvos_sexual.length)];
              correctText = ageConvo[0].replace("{age}", this.state.fan.age);
              this.state.pendingFanReply = ageConvo[1];
              break;
            case "How did you find my page?":
              const findConvo = window.findconvos_sexual[Math.floor(Math.random() * window.findconvos_sexual.length)];
              correctText = findConvo[0].replace("{find}", this.state.fan.find);
              this.state.pendingFanReply = findConvo[1];
              break;
        }
        }
        correctButton.textContent = correctText;
        correctButton.onclick = () => {
          const messageInput = document.getElementById('messageInput');
          messageInput.value = correctText;
          this.state.currentAction = 'deep-convo';
          //this.state.fan.deepForNoReason -= 0.005;
          this.state.pendingDeepConvo = {
            isActive: true,
            topic: basicQuestion,
            response: correctText,
            isCorrect: true
          };
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
          this.state.currentAction = 'deep-convo';
          this.state.pendingDeepConvo = {
            isActive: true,
            topic: basicQuestion,
            response: wrongText,
            isCorrect: false
          };
          // this.state.fan.deepForNoReason += 0.05;
          // this.state.fan.hornyLevel -= 1;
          // this.state.fan.sexiness -= 3;
          // this.state.fan.charisma -= 4;
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
    const messageArray = isSexual ? window.convos_sexual : window.CONVOS2;
    const randomConvo = messageArray[Math.floor(Math.random() * messageArray.length)];
    
    // Add the message to chat
  
    messageInput.value = randomConvo[0];
    ConversationGame.state.currentAction='convo';

    
    // Store the fan's reply for when they respond
    this.state.pendingFanReply = randomConvo[1];
    ConversationGame.pendingFanReply = randomConvo[1];

   
  },

  handleDeepConvo(topic, response, isCorrect) {
    const messageInput = document.getElementById('messageInput');
    messageInput.value = response;
    this.state.currentAction = 'deep-convo';
    
    // Store the deep convo info in state instead of immediately applying effects
    this.state.pendingDeepConvo = {
        isActive: true,
        topic: topic,
        response: response,
        isCorrect: isCorrect
    };
  },

};

// Modify the existing guy click handler to initialize a new game
document.addEventListener("DOMContentLoaded", function() {
  // Create game action buttons
  const actionOptionsDiv = document.getElementById('actionOptions');
  // const actions = [
  //   { text: "Convo", action: "convo" },
  //   { text: "Tease", action: "tease" },
  //   { text: "Ask Question", action: "question" },
  //   { text: "Sext", action: "sext" },
  //   { text: "Sell Content", action: "sell" },
  //   { text: "Cuddle", action: "cuddle" }
  // ];

  // actions.forEach(action => {
  //   const button = document.createElement('button');
  //   button.className = 'action-option';
  //   button.textContent = action.text;
  //   button.onclick = () => ConversationGame.handleAction(action.action);
  //   actionOptionsDiv.appendChild(button);
  // });

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
      //messageInput.disabled = false;
    });
  });

  // Modify the existing click handler for the send button
  const sendBtn = document.getElementById('sendBtn');
  const messageInput = document.getElementById('messageInput');

  // Keep input always disabled
  messageInput.disabled = true;
  let boolFlag = false;
  let lastClickTime = 0;
  const COOLDOWN =3000; // 3 second cooldown

  sendBtn.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime < COOLDOWN) {
      return; // Still in cooldown
    }

    if (boolFlag) {
      return;
    }

    lastClickTime = now;

    if (messageInput.value.trim() !== '' && ConversationGame.state.currentAction) {
      boolFlag = true;
      const messageText = messageInput.value;
      if ((messageText !== "" || currentAttachments.length > 0) && currentGuy) { 
            if (!chatHistory[currentModel][currentGuy]) {
              chatHistory[currentModel][currentGuy] = [];
            }

            let maxContentNumber = 0;
            currentAttachments.forEach(att => {
              const firstChar = parseInt(att.name[0]);
              if (!isNaN(firstChar) && firstChar > maxContentNumber) {
                maxContentNumber = firstChar;
              }
            });

            // If current action is sell content, determine content type from message
            if (ConversationGame.state.currentAction === 'sell') {
              ConversationGame.pendingFanReply ="";
                let messageText = messageInput.value.toLowerCase();
                
                // Check against tease image captions
                if (window.tease_img_captions.some(caption => caption[0].toLowerCase() === messageText)) {
                    maxCaptionNumber = 1;
                }
                // Check against tease video captions 
                else if (window.tease_video_captions.some(caption => caption[0].toLowerCase() === messageText)) {
                    maxCaptionNumber = 2;
                }
                // Check against strip to underwear captions
                else if (window.strip_to_undervear_video_captions.some(caption => caption[0].toLowerCase() === messageText)) {
                    maxCaptionNumber = 3;
                }
                // Check against strip naked captions
                else if (window.strip_naked_video_captions.some(caption => caption[0].toLowerCase() === messageText)) {
                    maxCaptionNumber = 4;
                }
                // Check against quick masturbation captions
                else if (window.quick_masturbation_video_captions.some(caption => caption[0].toLowerCase() === messageText)) {
                    maxCaptionNumber = 5;
                }
                // Check against long masturbation captions
                else if (window.long_masturbation_video_captions.some(caption => caption[0].toLowerCase() === messageText)) {
                    maxCaptionNumber = 6;
                }
                // Check against end script captions
                else if (window.end_script_video_captions.some(caption => caption[0].toLowerCase() === messageText)) {
                    maxCaptionNumber = 7;
                }
            }
            // Set maxCaptionNumber based on conversation type
            else if (ConversationGame.state.currentAction === 'convo') {
                    maxCaptionNumber = 2.5;
                
            }
            else if (ConversationGame.state.currentAction === 'deep') {
                maxCaptionNumber = 4.5;
            }
            else if (ConversationGame.state.currentAction === 'sext') {
                maxCaptionNumber = 5.5;
            }
            else if (ConversationGame.state.currentAction === 'tease') {
                    maxCaptionNumber = 3.5;
               
            }
            else if (ConversationGame.state.currentAction === 'cuddle') {
                maxCaptionNumber = 7;
            }
            console.log("maxCaptionNumber", maxCaptionNumber);


            
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
              
              if (priceInput.value == "") {
                messageObject.price = "(Bought) " + priceInput.value + "$";
                ConversationGame.state.fan.imagesSold.push(att.name);
              } else
              {

              // if (Math.random() < 0.5 || priceInput.value == "") {
              //   ConversationGame.state.fan.imagesSold.push(att.name);
              //   // Change price text from "Price: X$" to "Bought: X$"
              //   messageObject.price = "(Bought) " + priceInput.value + "$";
              // }
                // Check if charisma is high enough
                if (ConversationGame.state.fan.charisma < 20) {
                  ConversationGame.state.fan.deepForNoReason += 0.005;
                  ConversationGame.pendingFanReply = "(Not enough charisma)";
                } else {
                  // Calculate buying conditions
                  const maxPPVBuy = ConversationGame.state.fan.ppvToBuy;
                  const maxPriceToBuy = ConversationGame.state.fan.hornyLevel;
                  const price = parseFloat(priceInput.value);
                  const timeSinceLastBought = ConversationGame.state.roundCounter - ConversationGame.state.fan.turnCountOfLastPpvBought;
                  console.log("timeSinceLastBought", timeSinceLastBought);


                  // Check if too soon since last purchase
                  const skipChance = Math.random() * 100 < (1 - timeSinceLastBought/4) * 100;

                  if (skipChance) {
                      ConversationGame.pendingFanReply = "(Too soon since last purchase)";
                      ConversationGame.state.fan.turnCountOfLastPpvBought = ConversationGame.state.roundCounter;
                  } else {
                      // Determine content tier and requirements
                      let canBuy = false;
                      let maxPrice = maxPriceToBuy;
                      const questions = ConversationGame.state.fan.questions;
                      const teases = ConversationGame.state.fan.teases;
                      const sexts = ConversationGame.state.fan.sexts;
                      const ppvBought = ConversationGame.state.fan.ppvBought;

                      switch(maxCaptionNumber) {
                          case 1: // Tease image
                              maxPrice /= 3;
                              canBuy = questions > 2 || (questions > 1 && teases > 0);
                              break;
                          case 2: // Tease video
                              maxPrice /= 2;
                              canBuy = questions > 3 || (questions > 2 && teases > 0);
                              break;
                          case 2.5: // Convo
                              maxPrice /= 2;
                              canBuy = questions > 2 || (questions > 1 && teases > 0);
                              break;
                          case 3: // Strip to underwear
                              canBuy = questions > 2 || (questions > 1 && (teases + sexts > 0));
                              break;
                          case 4: // Strip naked
                              canBuy = (questions > 2 || (questions > 1 && sexts > 0));
                              if (ppvBought === 0) {
                                  ConversationGame.state.fan.sexiness -= 5;
                                  ConversationGame.pendingFanReply = "You're cute, but selling nudes on the first message? wow... <3";
                                  canBuy = false;
                              }
                              break;
                          case 5: // Quick masturbation
                              canBuy = (questions > 2 || (questions > 1 && sexts > 2));
                              if (ppvBought <= 1) {
                                  ConversationGame.state.fan.sexiness -= ppvBought === 0 ? 10 : 5;
                                  ConversationGame.pendingFanReply = ppvBought === 0 ? 
                                      "You're cute, but masturbating on the first message? wow... <3" :
                                      "You're cute, but isn't this too soon? wow... <3";
                                  canBuy = false;
                              }
                              break;
                          case 6: // Long masturbation
                              canBuy = (questions > 2 || (questions > 1 && sexts > 4));
                              if (ppvBought <= 2) {
                                  ConversationGame.state.fan.sexiness -= ppvBought === 0 ? 20 : ppvBought === 1 ? 10 : 5;
                                  ConversationGame.pendingFanReply = "Too soon for this kind of content...";
                                  canBuy = false;
                              }
                              break;
                          case 7: // End script
                              maxPrice /= 2.5;
                              ConversationGame.state.fan.ppvToBuy = Math.min(ConversationGame.state.fan.ppvToBuy, 1);
                              canBuy = (questions > 2 || (questions > 1 && sexts > 0 && ppvBought > 0));
                              ConversationGame.pendingFanReply = "You're cute, thanks for the experience. See you tomorrow!";
                              break;
                      }

                      console.log("canBuy", canBuy);
                      console.log("price", price);
                      console.log("maxPrice", maxPrice);
                      console.log("ConversationGame.state.fan.sexiness", ConversationGame.state.fan.sexiness);
                      console.log("ConversationGame.state.fan.maxPPVValueTierBought", ConversationGame.state.fan.maxPPVValueTierBought);
                      console.log("maxCaptionNumber", maxCaptionNumber);
                      console.log("maxContentNumber", maxContentNumber);
                      console.log("ConversationGame.state.fan.maxPPVBuy", ConversationGame.state.fan.maxPPVBuy);

                      console.log("ConversationGame.state.fan.ppvBought", ConversationGame.state.fan.ppvBought);


                      // Check if can buy based on price and stats
                      if (ConversationGame.state.fan.maxPPVValueTierBought > maxCaptionNumber){
                        canBuy = false;

                      }
                      const hornyLevel = ConversationGame.state.fan.hornyLevel;
                      const buyProbability = 1 - (hornyLevel - price) / hornyLevel;
                      const randomChance = Math.random();
                      // If action isn't sell, run probability simulation for buying
                      if (ConversationGame.state.currentAction !== 'sell') {
                       
                        console.log("buyProbability", buyProbability);
                        console.log("randomChance", randomChance);
                        
                        if (buyProbability > randomChance) {
                          canBuy = false;
                        }
                      }
                      if (canBuy && price < maxPrice && price < ConversationGame.state.fan.sexiness) {
                          ConversationGame.state.fan.imagesSold.push(att.name);
                          ConversationGame.state.fan.sold += price;
                          window.totalsold += price;
                          ConversationGame.state.fan.ppvToBuy -= 0.5;
                          

                          ConversationGame.state.fan.ppvBought += 1;
                          ConversationGame.state.fan.turnCountOfLastPpvBought = ConversationGame.state.roundCounter;
                          messageObject.price = "(Bought) " + priceInput.value + "$";
                          ConversationGame.state.fan.maxPPVValueTierBought = Math.max(ConversationGame.state.fan.maxPPVValueTierBought, maxContentNumber);
                          
                          // Update fan stats
                          ConversationGame.state.fan.hornyLevel += 2;
                          ConversationGame.state.fan.sexiness += 2;
                          ConversationGame.state.fan.charisma += 2;

                          trackExamSale(price,att.name);

                          // Check if any two images in imagesSold have A and B as second characters
                          let hasA = false;
                          let hasB = false;
                          ConversationGame.state.fan.imagesSold.forEach(imageName => {
                            if (imageName.length > 1) {
                              if (imageName[1].toUpperCase() === 'A') hasA = true;
                              if (imageName[1].toUpperCase() === 'B') hasB = true;
                            }
                          });
                          
                          if (hasA && hasB) {
                            ConversationGame.pendingFanReply = "OMG model scammed me she is selling me 2 scripts";
                            ConversationGame.state.fan.sexiness -= 10;
                            ConversationGame.state.fan.hornyLevel /= 1.3;
                            ConversationGame.state.fan.charisma /= 1.3;
                            return;
                          }

                          if (maxCaptionNumber-0.5 > maxContentNumber)   {
                            ConversationGame.pendingFanReply = "OMG you scammed me! sold me less  valuable content :/ ";
                            ConversationGame.state.fan.sexiness -= 10;
                            ConversationGame.state.fan.hornyLevel /= 1.3;
                            ConversationGame.state.fan.charisma /= 1.3;
                          } else {
                            ConversationGame.pendingFanReply = "Thank you! I'm so happy you bought it! <3";
                          }
                          
                          // Update total sales display
                          updateTotalSalesDisplay();
                      } else if (!canBuy || price > maxPrice) {
                        if (price > maxPrice){
                          setTimeout(() => {
                            ConversationGame.addMessage('guy', "I would like some thing cheaper." );
                          }, 1000 + Math.random() * 2000);
                        }else if (ConversationGame.state.fan.maxPPVValueTierBought > maxCaptionNumber){
                          setTimeout(() => {
                            ConversationGame.addMessage('guy', "I'm sorry, but you can't afford this content. I aleady bought something more valuable." );
                          }, 1000 + Math.random() * 2000);
                        }else {
                          if (ConversationGame.state.currentAction === 'sell') {
                            setTimeout(() => {
                              ConversationGame.addMessage('guy', "I would like some more teases or questions first." );
                            }, 1000 + Math.random() * 2000);
                          } else {
                            if (buyProbability > randomChance) {
                              setTimeout(() => {
                                ConversationGame.addMessage('guy', "I would like you to tell me what it is inside and send it again." );
                              }, 1000 + Math.random() * 2000);
                            } else {
                              setTimeout(() => {
                                ConversationGame.addMessage('guy', "I would like some more teases or questions first." );
                              }, 1000 + Math.random() * 2000);
                            }
                          
                          }
                      }
                      }
                    }

                  }
              }

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
      boolFlag = false;
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
    sold: ConversationGame.state.fan.sold,
    totalsold: window.totalsold,
    roundCounter: ConversationGame.state.roundCounter,
    turnCountOfLastPpvBought: ConversationGame.state.fan.turnCountOfLastPpvBought
  });

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

// Add this function to create and update the sales display
function updateTotalSalesDisplay() {
    let salesDisplay = document.getElementById('totalSalesDisplay');
    if (!salesDisplay) {
        salesDisplay = document.createElement('div');
        salesDisplay.id = 'totalSalesDisplay';
        salesDisplay.style.position = 'fixed';
        salesDisplay.style.top = '10px';
        salesDisplay.style.right = '10px';
        salesDisplay.style.padding = '10px';
        salesDisplay.style.backgroundColor = '#4CAF50';
        salesDisplay.style.color = 'white';
        salesDisplay.style.borderRadius = '5px';
        salesDisplay.style.zIndex = '1000';
        salesDisplay.style.fontWeight = 'bold';
        document.body.appendChild(salesDisplay);
    }
    salesDisplay.textContent = `Total Sales: $${window.totalsold.toFixed(2)}`;
}

// Call this when the page loads to initialize the display
document.addEventListener("DOMContentLoaded", function() {
    updateTotalSalesDisplay();
    createTutorialButton();
    createTutorialWindow();
    // ... rest of your existing DOMContentLoaded code ...
});



// Add exam button and functionality
function createExamButton() {
    const examButton = document.createElement('button');
    examButton.id = 'examButton';
    examButton.className = 'exam-button';
    examButton.textContent = 'Start Exam (30min)';
    document.body.insertBefore(examButton, document.body.firstChild);

    let cooldownTimer = null;
    let examActive = false;

    examButton.addEventListener('click', () => {
        if (examActive) {
            // End exam early
            endExam();
            return;
        }

        if (cooldownTimer) {
            return; // Button in cooldown
        }

        // Start exam
        examActive = true;
        window.totalsold = 0;
        ConversationGame.state.examMode = {
            active: true,
            startTime: Date.now(),
            sales: [],
            totalSold: 0,
            timer: null
        };

        updateTotalSalesDisplay();

        examButton.textContent = 'End Exam (29:59)';
        
        // Start 30-minute timer
        let timeLeft = 30 * 60; // 30 minutes in seconds
        ConversationGame.state.examMode.timer = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            examButton.textContent = `End Exam (${minutes}:${seconds.toString().padStart(2, '0')})`;

            if (timeLeft <= 0) {
                endExam();
            }
        }, 1000);
    });

    function endExam() {
        examActive = false;
        clearInterval(ConversationGame.state.examMode.timer);
        
        // Show results modal
        showExamResults(ConversationGame.state.examMode.sales, ConversationGame.state.examMode.totalSold);

        // Start cooldown
        examButton.disabled = true;
        let cooldownTime = 60; // 1 minute cooldown
        examButton.textContent = `Cooldown (${cooldownTime}s)`;
        
        cooldownTimer = setInterval(() => {
            cooldownTime--;
            examButton.textContent = `Cooldown (${cooldownTime}s)`;
            
            if (cooldownTime <= 0) {
                clearInterval(cooldownTimer);
                cooldownTimer = null;
                examButton.disabled = false;
                examButton.textContent = 'Start Exam (30min)';
            }
        }, 1000);

        // Reset exam state
        ConversationGame.state.examMode = {
            active: false,
            startTime: null,
            sales: [],
            totalSold: 0,
            timer: null
        };
    }

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .exam-button {
            position: fixed;
            top: 10px;
            left: 10px;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
            font-weight: bold;
        }
        .exam-button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }
        .exam-results {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            z-index: 1001;
            max-width: 80%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .tutorial-button {
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            background-color: #007BFF; /* Change color as needed */
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            z-index: 1000;
            font-weight: bold;
        }
        .tutorial-window {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            z-index: 1001;
            max-width: 80%;
            max-height: 80vh;
            overflow-y: auto;
        }
    `;
    document.head.appendChild(style);
}

// Add to message sending logic
function trackExamSale(price, itemName) {
    if (ConversationGame.state.examMode.active) {
        ConversationGame.state.examMode.sales.push({
            timestamp: Date.now(),
            price: parseFloat(price),
            item: itemName,
            timeSinceStart: Math.floor((Date.now() - ConversationGame.state.examMode.startTime) / 1000),
            totalSold: ConversationGame.state.examMode.totalSold ,
            hornyLevel: ConversationGame.state.fan.hornyLevel,
            questions: ConversationGame.state.fan.questions,
            teases: ConversationGame.state.fan.teases,
            sexts: ConversationGame.state.fan.sexts
        });
        ConversationGame.state.examMode.totalSold += parseFloat(price);
    }
}

function showExamResults(sales, totalSold) {
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'exam-results';
    
    const jsonData = JSON.stringify(sales, null, 2);
    
    let resultsHTML = `
        <h2>Exam Results</h2>
        <p>Total Sales: $${totalSold.toFixed(2)}</p>
        <p>Total Items Sold: ${sales.length}</p>
        <h3>Sales Log:</h3>
        <textarea readonly style="width: 100%; height: 300px; margin: 10px 0;">${jsonData}</textarea>
        <div style="margin: 10px 0;">
            <button onclick="navigator.clipboard.writeText(this.parentElement.previousElementSibling.value)">Copy JSON</button>
            <button onclick="this.closest('.exam-results').remove()">Close</button>
        </div>
    `;
    
    resultsDiv.innerHTML = resultsHTML;
    document.body.appendChild(resultsDiv);
}

// Call this in your initialization
document.addEventListener('DOMContentLoaded', () => {
    createExamButton();
});

// Add to your existing send button logic where sales are processed
if (messageObject.price && messageObject.price.includes("(Bought)")) {
    trackExamSale(priceInput.value, currentAttachments[0].name);
}

// Function to create and toggle the tutorial
function toggleTutorial() {
    const tutorialWindow = document.getElementById('tutorialWindow');
    if (tutorialWindow.style.display === 'none' || tutorialWindow.style.display === '') {
        tutorialWindow.style.display = 'block'; // Show the tutorial
    } else {
        tutorialWindow.style.display = 'none'; // Hide the tutorial
    }
}

// Add the tutorial button
function createTutorialButton() {
    const tutorialButton = document.createElement('button');
    tutorialButton.id = 'tutorialButton';
    tutorialButton.className = 'tutorial-button';
    tutorialButton.textContent = 'Show Tutorial';
    tutorialButton.style.position = 'fixed';
    tutorialButton.style.top = '10px';
    tutorialButton.style.left = '50%';
    tutorialButton.style.transform = 'translateX(-50%)';
    tutorialButton.style.zIndex = '1000';
    tutorialButton.onclick = toggleTutorial;

    document.body.appendChild(tutorialButton);
}

// Create the tutorial window
function createTutorialWindow() {
    const tutorialWindow = document.createElement('div');
    tutorialWindow.id = 'tutorialWindow';
    tutorialWindow.className = 'tutorial-window';
    tutorialWindow.style.display = 'none'; // Initially hidden
    tutorialWindow.style.position = 'fixed';
    tutorialWindow.style.top = '50%';
    tutorialWindow.style.left = '50%';
    tutorialWindow.style.transform = 'translate(-50%, -50%)';
    tutorialWindow.style.backgroundColor = 'white';
    tutorialWindow.style.padding = '20px';
    tutorialWindow.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    tutorialWindow.style.zIndex = '1001';

    // Add tutorial content
    tutorialWindow.innerHTML = `
        <h2>Tutorial</h2>
        <p>Welcome to the game! Here are some tips to get started:</p>
        <ul>
            <li>Engage with the fan using the buttons provided.</li>
            <li>Start by asking basic questions to build rapport.</li>
            <li>Incorporate deep questions and teasing to keep the fan interested.</li>
            <li>Sell teasing images and videos before moving to sexting. Sext after fan is horny and you sold teasing videos.</li>
            <li>Use deep conversations between sexting to maintain the fan's interest.</li>
            <li>Focus on selling one script at a time to maximize the fan's interest and engagement.</li>
            <li>End with cuddling messages to leave a lasting impression before the fan leaves.</li>
            <li>Ensure the fan's horniness is above 30, sexiness above 50, and charisma above 50 before ending the conversation. for A big tip bonus</li>

            </ul>
        <button onclick="toggleTutorial()">Close</button>
    `;

    document.body.appendChild(tutorialWindow);
}

// Call these functions when the DOM is loaded
