// Action Definitions
const actions = {
    ASK_QUESTION: 'ask_question',
    TEASE: 'tease',
    SEXT: 'sext',
    SELL_PPV: 'sell_ppv',
    SKIP: 'skip',
    ASK_CATEGORY: 'ask_category',
    SELECT_QUESTION: 'select_question',
    SELECT_TEASE: 'select_tease',
    PEEK_TEAZES: 'peek_teazes',
    PICK_TEASE: 'pick_tease'
  };


  const ppvPrices = [3, 15, 25, 55, 79, 100];

  // Action Options
  const actionOptions = {
    [actions.ASK_QUESTION]: [
      "What's your favorite hobby?",
      "Where did you grow up?",
      "What's your dream vacation?",
      "Do you enjoy reading books?"
    ],
    [actions.TEASE]: [
      "You have such a charming smile.",
      "I can't stop thinking about our last conversation.",
      "You always make my day brighter.",
      "Your energy is contagious."
    ],
    [actions.SEXT]: [
      "I can't wait to see you later...",
      "Thinking about you all day...",
      "You make my heart race.",
      "I have a surprise for you tonight."
    ],
    [actions.SELL_PPV]: [
      "Check out my exclusive content here!",
      "Unlock premium videos with just a click.",
      "Get access to my latest photos by purchasing PPV.",
      "Support me by buying my exclusive content."
    ]
    // 'skip' action doesn't require options
  };
  
  // Question Categories
  const questionCategories = {
    Age: [
      "May I ask your age?",
      "How old are you?"
    ],
    Job: [
      "What do you do for a living?",
      "What's your profession?"
    ],
    City: [
      "Which city do you call home?",
      "Where are you from?"
    ],
    Hobby: [
      "What’s your hobby?",
      "Do you have any hobbies you enjoy?"
    ]
  };
  
  // Girl's Lines Database
  const girlQDatabase = {
    "What's your favorite movie?": {
      formal:[
        {text:"May I know your favorite movie, please?", style:'formal'},
        {text:"I’d like to hear about the movies you enjoy, if that's alright.",style:'formal'}
      ],
      neutral:[
        {text:"What's your favorite movie?", style:'neutral'},
        {text:"Could you tell me which movie you like the most?",style:'neutral'}
      ],
      flirty:[
        {text:"I want to know which movie captivates you the most.",style:'flirty'},
        {text:"Your favorite movie? Bet it's as exciting as you are.",style:'flirty'}
      ]
    },
    "Do you like traveling?": {
      formal:[
        {text:"May I ask if you enjoy traveling?", style:'formal'},
        {text:"I’m curious about your travel preferences, if you don’t mind.",style:'formal'}
      ],
      neutral:[
        {text:"Do you like traveling?", style:'neutral'},
        {text:"Are you a fan of traveling?",style:'neutral'}
      ],
      flirty:[
        {text:"Do you enjoy traveling? Maybe we could explore together 😉",style:'flirty'},
        {text:"Where's the first place you'd take me if we traveled together?",style:'flirty'}
      ]
    },
    "What's your favorite type of music?": {
      formal:[
        {text:"May I inquire about your favorite type of music?", style:'formal'},
        {text:"I’d like to know which music genre you prefer, if that’s okay.",style:'formal'}
      ],
      neutral:[
        {text:"What's your favorite type of music?", style:'neutral'},
        {text:"Which music genre do you enjoy the most?",style:'neutral'}
      ],
      flirty:[
        {text:"What's your favorite type of music? Maybe we can dance to it together.",style:'flirty'},
        {text:"I’d love to hear the music that moves you the most.",style:'flirty'}
      ]
    },
    "Do you have any pets?": {
      formal:[
        {text:"May I ask if you have any pets?", style:'formal'},
        {text:"I’m curious if you keep any pets, if you don’t mind.",style:'formal'}
      ],
      neutral:[
        {text:"Do you have any pets?", style:'neutral'},
        {text:"Are you a pet owner?",style:'neutral'}
      ],
      flirty:[
        {text:"Do you have any pets? Maybe a cute one to introduce me to 😉",style:'flirty'},
        {text:"Tell me about your pets, I bet they're adorable like you.",style:'flirty'}
      ]
    },
    "What's your favorite food?": {
      formal:[
        {text:"May I know your favorite food, please?", style:'formal'},
        {text:"I’d like to hear about the cuisines you prefer, if that's alright.",style:'formal'}
      ],
      neutral:[
        {text:"What's your favorite food?", style:'neutral'},
        {text:"Which cuisine do you enjoy the most?",style:'neutral'}
      ],
      flirty:[
        {text:"What's your favorite food? Maybe we can enjoy it together sometime.",style:'flirty'},
        {text:"I’d love to know your favorite dish, perhaps I can cook it for you 😉",style:'flirty'}
      ]
    },
    // New Questions Added Below
    "May I ask your age?": {
      formal:[
        {text:"May I ask your age, please?", style:'formal'},
        {text:"I’d like to know your age, if you don’t mind sharing.",style:'formal'}
      ],
      neutral:[
        {text:"How old are you?", style:'neutral'},
        {text:"Could you tell me how old you are?",style:'neutral'}
      ],
      flirty:[
        {text:"How old are you? I bet you're timeless 😉",style:'flirty'},
        {text:"Age is just a number, but I'd love to know yours.",style:'flirty'}
      ]
    },
    "What do you do for a living?": {
      formal:[
        {text:"May I inquire about your profession?", style:'formal'},
        {text:"I’d like to know what you do for a living, if that’s alright.",style:'formal'}
      ],
      neutral:[
        {text:"What do you do for a living?", style:'neutral'},
        {text:"Could you tell me about your job?",style:'neutral'}
      ],
      flirty:[
        {text:"What do you do for a living? It must be as interesting as you are.",style:'flirty'},
        {text:"I’d love to hear about your job, maybe we can collaborate sometime 😉",style:'flirty'}
      ]
    },
    "What's your profession?": {
      formal:[
        {text:"May I ask what your profession is?", style:'formal'},
        {text:"I’d like to know about your professional background, if you don’t mind.",style:'formal'}
      ],
      neutral:[
        {text:"What's your profession?", style:'neutral'},
        {text:"Could you share what you do professionally?",style:'neutral'}
      ],
      flirty:[
        {text:"What's your profession? It must suit someone as charming as you.",style:'flirty'},
        {text:"I’d love to hear about your work, perhaps over coffee sometime 😉",style:'flirty'}
      ]
    },
    "Which city do you call home?": {
      formal:[
        {text:"May I know which city you call home?", style:'formal'},
        {text:"I’d like to hear about the city you live in, if that's alright.",style:'formal'}
      ],
      neutral:[
        {text:"Which city do you call home?", style:'neutral'},
        {text:"Where are you from?",style:'neutral'}
      ],
      flirty:[
        {text:"Which city do you call home? Maybe we can explore it together someday.",style:'flirty'},
        {text:"Where are you from? I'd love to visit sometime with you 😉",style:'flirty'}
      ]
    },
    "Where are you from?": {
      formal:[
        {text:"May I ask where you are from?", style:'formal'},
        {text:"I’d like to know your place of origin, if you don’t mind sharing.",style:'formal'}
      ],
      neutral:[
        {text:"Where are you from?", style:'neutral'},
        {text:"Could you tell me where you're from?",style:'neutral'}
      ],
      flirty:[
        {text:"Where are you from? I bet it's as fascinating as you are.",style:'flirty'},
        {text:"I'd love to hear about your hometown, maybe I can visit with you 😉",style:'flirty'}
      ]
    },
    "What’s your hobby?": {
      formal:[
        {text:"May I inquire about your hobbies?", style:'formal'},
        {text:"I’d like to know what hobbies you enjoy, if that's alright.",style:'formal'}
      ],
      neutral:[
        {text:"What’s your hobby?", style:'neutral'},
        {text:"Do you have any hobbies you enjoy?",style:'neutral'}
      ],
      flirty:[
        {text:"What’s your hobby? Maybe we can enjoy it together sometime.",style:'flirty'},
        {text:"I’d love to hear about your hobbies, perhaps we can share some 😉",style:'flirty'}
      ]
    },
    "Do you have any hobbies you enjoy?": {
      formal:[
        {text:"May I ask if you have any hobbies you enjoy?", style:'formal'},
        {text:"I’m curious about the hobbies you engage in, if you don’t mind.",style:'formal'}
      ],
      neutral:[
        {text:"Do you have any hobbies you enjoy?", style:'neutral'},
        {text:"What hobbies do you like to pursue?",style:'neutral'}
      ],
      flirty:[
        {text:"Do you have any hobbies you enjoy? Maybe we can share some together 😉",style:'flirty'},
        {text:"Tell me about your hobbies, I bet they're as interesting as you are.",style:'flirty'}
      ]
    }
  };
  
  // Tease Options
  const teaseOptions = [
    "You're looking great today!",
    "I can't get enough of your smile.",
    "Your laugh is contagious.",
    "You have an amazing sense of humor."
  ];
  
  // Guy's Questions and Responses
  const guyQuestions = [
    "What's your favorite movie?",
    "Do you like traveling?",
    "What's your favorite type of music?",
    "Do you have any pets?",
    "What's your favorite food?",
    "May I ask your age?",
    "How old are you?",
    "What do you do for a living?",
    "What's your profession?",
    "Which city do you call home?",
    "Where are you from?",
    "What’s your hobby?",
    "Do you have any hobbies you enjoy?"
  ];
  
  const guyAnswers = {
    "What's your favorite movie?": [
      "I love action-packed movies like *Avengers*.",
      "Romantic comedies are my favorite!",
      "I enjoy thrillers that keep me on the edge.",
      "Documentaries fascinate me."
    ],
    "Do you like traveling?": [
      "Absolutely, I love exploring new places!",
      "Not really, I prefer staying close to home.",
      "Sometimes, depending on the destination.",
      "Yes, traveling broadens my perspective."
    ],
    "What's your favorite type of music?": [
      "I'm a big fan of rock music.",
      "I enjoy classical music the most.",
      "Pop music always gets me dancing.",
      "Jazz is my favorite genre."
    ],
    "Do you have any pets?": [
      "Yes, I have a golden retriever named Buddy.",
      "No, I don't have any pets currently.",
      "I used to have a cat, but it passed away.",
      "I'm planning to adopt a pet soon!"
    ],
    "What's your favorite food?": [
      "I could eat sushi every day!",
      "Italian cuisine is my go-to.",
      "I love spicy tacos.",
      "Nothing beats a good burger."
    ],
    // New Questions Added Below
    "May I ask your age?": [
      "Sure, I'm 28 years old.",
      "I'd prefer not to say, but thank you for asking!",
      "I'm 25, how about you?",
      "I'm 30. Age is just a number."
    ],
    "How old are you?": [
      "I'm 28 years old.",
      "I'm 25, how about you?",
      "I'm 30. Age is just a number, right?",
      "I'd rather not say, but thanks for asking!"
    ],
    "What do you do for a living?": [
      "I'm a software developer.",
      "I work as a graphic designer.",
      "I'm currently studying to be an engineer.",
      "I run my own online business."
    ],
    "What's your profession?": [
      "I'm a software engineer.",
      "I work in marketing.",
      "I'm a teacher by profession.",
      "I'm a freelance writer."
    ],
    "Which city do you call home?": [
      "I live in New York City.",
      "I'm based in San Francisco.",
      "I call Chicago home.",
      "Currently, I'm living in Austin."
    ],
    "Where are you from?": [
      "I'm originally from Seattle.",
      "I was born and raised in Boston.",
      "I'm from Miami.",
      "My hometown is Denver."
    ],
    "What’s your hobby?": [
      "I love hiking and outdoor adventures.",
      "I'm really into painting.",
      "I enjoy playing the guitar.",
      "Reading books is my favorite hobby."
    ],
    "Do you have any hobbies you enjoy?": [
      "Yes, I enjoy hiking and painting.",
      "Absolutely, I love playing the guitar.",
      "Yes, reading books is something I do often.",
      "I have a few hobbies like photography and cycling."
    ]
  };
  