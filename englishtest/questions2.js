const questions = [
  {
    guy: "Nice thought, babe. 💋💋",
    girl: "What would you do if I ___ there with you right now?",
    answers: [
      { text: "cum", value: 2 },
      { text: "love", value: 1 },
      { text: "good", value: 0 },
      { text: "tip", value: -2 }
    ]
  },
  {
    guy: "I’m turned on but haven’t cum yet, babe.",
    girl: "Mmm, when will you ___ for me?",
    answers: [
      { text: "cum", value: 2 },    // Perfect fit, hot and flirty
      { text: "love", value: 1 },   // Close, but less spicy
      { text: "good", value: 0 },   // Neutral, no real vibe
      { text: "tip", value: -2 }    // Off-tone, transactional
    ]
  },
  {
    guy: "Tell me something hot, babe.",
    girl: "I’m so bored—you wanna ___ things up with me?",
    answers: [
      { text: "spice", value: 2 },  // Perfectly flirty and fits the vibe
      { text: "hard", value: 1 },   // Close, suggestive but less precise
      { text: "know", value: 0 },   // Neutral, meh fit
      { text: "see", value: -2 }    // Off-tone, doesn’t match the intent
    ]
  },
  {
    guy: "Tell me what’s coming, babe.",
    girl: "I’ll tease you so you ___ watch me get naughty.",
    answers: [
      { text: "wanna", value: 2 },  // Perfectly flirty and suggestive
      { text: "fuck", value: 1 },   // Close, hot but less fitting
      { text: "check", value: 0 },  // Neutral, not quite there
      { text: "nice", value: -2 }   // Off-tone, doesn’t match the vibe
    ]
  },
  {
    guy: "Hey baby, your voice just hit me.",
    girl: "Mmm, ___ you ready to watch me get wild?",
    answers: [
      { text: "are", value: 2 },    // Perfectly flirty and fits the question vibe
      { text: "watch", value: 1 },  // Close, suggestive but less grammatically smooth
      { text: "miss", value: 0 },   // Neutral, doesn’t fully connect
      { text: "fun", value: -2 }    // Off-tone, doesn’t fit the structure
    ]
  },
  {
    guy: "Tell me something naughty, babe.",
    girl: "I love teasing you—___ would you do if I’m there?",
    answers: [
      { text: "what", value: 2 },   // Perfectly flirty and fits the teasing vibe
      { text: "you", value: 1 },    // Close, suggestive but less precise
      { text: "how", value: 0 },    // Neutral, not quite on point
      { text: "there", value: -2 }  // Off-tone, doesn’t flow right
    ]
  },
  {
    guy: "Tell me, babe, I’m dying to know.",
    girl: "I ___ love a guy this thirsty for me.",
    answers: [
      { text: "just", value: 2 },   // Perfectly flirty, fits the teasing tone
      { text: "okay", value: 1 },   // Close, but less spicy
      { text: "alone", value: 0 },  // Neutral, not quite on point
      { text: "now", value: -2 }    // Off-tone, doesn’t flow
    ]
  },
  {
    guy: "Love your vibe, babe!",
    girl: "I used to ___ quietly until you came along.",
    answers: [
      { text: "chill", value: 2 },  // Flirty and fits the past vibe
      { text: "chat", value: 1 },   // Close, but less playful
      { text: "party", value: 0 },  // Neutral, not quite right
      { text: "going", value: -2 }  // Off-tone, awkward fit
    ]
  },
  {
    guy: "Can I see your latest tease at midnight?",
    girl: "I might ___ you peek at it sooner, babe.",
    answers: [
      { text: "show", value: 2 },   // Perfectly suggestive and flirty
      { text: "suck", value: 1 },   // Close, hot but less subtle
      { text: "text", value: 2 },   // Neutral, not specific enough
      { text: "relax", value: -2 }  // Off-tone, doesn’t match
    ]
  },
  {
    guy: "I can’t resist or ignore how hot you are.",
    girl: "Neither shyness ___ heat can hide how much you want me.",
    answers: [
      { text: "like", value: 2 },    // Perfectly flirty and fits the vibe
      { text: "ass", value: 1 },     // Close, suggestive but less smooth
      { text: "message", value: 0 }, // Neutral, doesn’t quite connect
      { text: "online", value: -2 }  // Off-tone, doesn’t fit
    ]
  },
  {
    guy: "I’m getting more and more worked up, babe.",
    girl: "I’m feeling ___ and more turned on watching you.",
    answers: [
      { text: "hot", value: 2 },     // Spicy and fits the escalation
      { text: "fine", value: 1 },    // Close, but less intense
      { text: "cool", value: 0 },    // Neutral, not quite right
      { text: "busy", value: -2 }    // Off-tone, kills the mood
    ]
  },
  {
    guy: "I’m trying to keep it cool, babe.",
    girl: "How about ___ it naughty instead?",
    answers: [
      { text: "making", value: 2 },  // Perfectly flirty and suggestive
      { text: "keep", value: 1 },    // Close, but less playful
      { text: "day", value: 0 },     // Neutral, doesn’t push the vibe
      { text: "out", value: -2 }     // Off-tone, doesn’t fit
    ]
  },
  {
    guy: "Never have I felt this turned on, babe.",
    girl: "Seldom ___ I teased someone so quick like this.",
    answers: [
      { text: "have", value: 2 },   // Correct grammar, flirty fit
      { text: "get", value: 1 },    // Close, but less precise
      { text: "still", value: 0 },  // Neutral, doesn’t quite work
      { text: "feel", value: -2 }   // Off-tone, grammatically wrong
    ]
  },
  {
    guy: "Your teases are so damn hot.",
    girl: "I make them ___ naughty you can’t look away.",
    answers: [
      { text: "so", value: 2 },     // Perfect grammar, spicy vibe
      { text: "been", value: 1 },   // Close, but less fitting
      { text: "get", value: 0 },    // Neutral, not quite right
      { text: "still", value: -2 }  // Off-tone, doesn’t flow
    ]
  },
  {
    guy: "I can either chill or get wild with you.",
    girl: "You can either wait or ___ me heat things up.",
    answers: [
      { text: "let", value: 2 },    // Correct grammar, flirty tease
      { text: "been", value: 1 },   // Close, but less smooth
      { text: "feel", value: 0 },   // Neutral, doesn’t fit well
      { text: "doing", value: -2 }  // Off-tone, grammatically off
    ]
  },
  
    {
      guy: "I can hardly wait for your next tease, babe.",
      girl: "You’d ___ hold off, or I’ll get naughtier.",
      answers: [
        { text: "better", value: 2 },
        { text: "am", value: 1 },
        { text: "here", value: 0 },
        { text: "was", value: -2 }
      ]
    },
    {
      guy: "I should’ve asked for that clip sooner.",
      girl: "You ___ have begged, but the wait’s hotter now.",
      answers: [
        { text: "could", value: 2 },
        { text: "up", value: 1 },
        { text: "here", value: 0 },
        { text: "am", value: -2 }
      ]
    },
   
  
    {
      guy: "You make me crave more, babe.",
      girl: "I hope I can ___ you dive into my naughty side.",
      answers: [
        { text: "let", value: 2 },
        { text: "think", value: 1 },
        { text: "where", value: 0 },
        { text: "reply", value: -2 }
      ]
    },
    {
      guy: "I wish I knew how you make these clips so hot.",
      girl: "If you did, you ___ think it’s less of a thrill.",
      answers: [
        { text: "might", value: 2 },
        { text: "knows", value: 1 },
        { text: "where", value: 0 },
        { text: "reply", value: -2 }
      ]
      },    
    {
      guy: "I’m hoping for a little tease soon.",
      girl: "I ___ you’d hold off asking just yet.",
      answers: [
        { text: "wish", value: 2 },
        { text: "think", value: 1 },
        { text: "knows", value: 0 },
        { text: "up", value: -2 }
      ]
    },
    {
      guy: "You set this up to get me hot, babe.",
      girl: "Maybe I did it ___ snag your eyes.",
      answers: [
        { text: "to", value: 2 },
        { text: "made", value: 1 },
        { text: "when", value: 0 },
        { text: "down", value: -2 }
      ]
    },
    {
      guy: "Your naughty vibe’s got me craving more.",
      girl: "I love seeing you ___ by my teases.",
      answers: [
        { text: "turned on", value: 2 },
        { text: "back", value: 1 },
        { text: "made", value: 0 },
        { text: "when", value: -2 }
      ]
    },
    {
      guy: "I’m buzzing about tonight’s tease.",
      girl: "I know, ___ the heat can be a thrill.",
      answers: [
        { text: "cranking", value: 2 },
        { text: "down", value: 1 },
        { text: "back", value: 0 },
        { text: "made", value: -2 }
      ]
    },
      {
        guy: "You promised a hot tease yesterday, babe.",
        girl: "I said I ___ be ready with something naughty tonight.",
        answers: [
          { text: "would", value: 2 },
          { text: "today", value: 1 },
          { text: "pretty", value: 0 },
          { text: "we", value: -2 }
        ]
      },
      {
        guy: "Heard you used to drive fans wild, babe.",
        girl: "I ___ to tease like that all the time.",
        answers: [
          { text: "used", value: 2 },
          { text: "having", value: 1 },
          { text: "we", value: 0 },
          { text: "today", value: -2 }
        ]
      },
      {
        guy: "Should I get it now or keep guessing?",
        girl: "I ___ rather tease you when you’re all worked up.",
        answers: [
          { text: "would", value: 2 },
          { text: "down", value: 1 },
          { text: "pretty", value: 0 },
          { text: "having", value: -2 }
        ]
      },
      {
        guy: "You’ve got such a sexy way, babe.",
        girl: "I’m thrilled you find it ___ tasty.",
        answers: [
          { text: "so", value: 2 },
          { text: "back", value: 1 },
          { text: "we", value: 0 },
          { text: "down", value: -2 }
        ]
      },
      {
        guy: "Is this vibe hot enough or too much?",
        girl: "It’s never ___ steamy for you, right?",
        answers: [
          { text: "too", value: 2 },
          { text: "today", value: 1 },
          { text: "pretty", value: 0 },
          { text: "we", value: -2 }
        ]
      },
      {
        guy: "I hope your next tease is as wild as the last.",
        girl: "I’ll make it at least ___ naughty as before.",
        answers: [
          { text: "as", value: 2 },
          { text: "having", value: 1 },
          { text: "back", value: 0 },
          { text: "today", value: -2 }
        ]
      }
      ,
      
        {
          guy: "If I’d met you sooner, I’d have begged for more.",
          girl: "If we’d hooked up earlier, I ___ have teased you silly.",
          answers: [
            { text: "would", value: 2 },
            { text: "time", value: 1 },
            { text: "look", value: 0 },
            { text: "give", value: -2 }
          ]
        },
        {
          guy: "Your vibe’s spicier than anyone else’s.",
          girl: "I aim to be ___ naughty than the others.",
          answers: [
            { text: "more", value: 2 },
            { text: "something", value: 1 },
            { text: "time", value: 0 },
            { text: "look", value: -2 }
          ]
        },
        {
          guy: "You’re the hottest tease I’ve seen.",
          girl: "I strive to be the ___ in this game.",
          answers: [
            { text: "best", value: 2 },
            { text: "give", value: 1 },
            { text: "something", value: 0 },
            { text: "time", value: -2 }
          ]
        },
        {
          guy: "I love how you listen to my naughty thoughts.",
          girl: "I get off on ___ your wild fantasies.",
          answers: [
            { text: "hearing", value: 2 },
            { text: "look", value: 1 },
            { text: "give", value: 0 },
            { text: "something", value: -2 }
          ]
        },
        {
          guy: "I’ve been drooling over your tease all day.",
          girl: "I’ve ___ tweaking it just for you.",
          answers: [
            { text: "been", value: 2 },
            { text: "look", value: 1 },
            { text: "time", value: 0 },
            { text: "give", value: -2 }
          ]
        },
        {
          guy: "I’ve been hot for you since last night.",
          girl: "I’ve ___ cooking up a naughty surprise since dawn.",
          answers: [
            { text: "been", value: 2 },
            { text: "look", value: 1 },
            { text: "give", value: 0 },
            { text: "something", value: -2 }
          ]
        },
        {
          guy: "Before you, I’d never craved a tease like this.",
          girl: "Before us, I had ___ anything this wild.",
          answers: [
            { text: "done", value: 2 },
            { text: "time", value: 1 },
            { text: "look", value: 0 },
            { text: "give", value: -2 }
          ]
        },
        {
          guy: "By tonight, I’ll have fantasized a ton.",
          girl: "By then, I will ___ have spiced it up for you.",
          answers: [
            { text: "already", value: 2 },
            { text: "time", value: 1 },
            { text: "look", value: 0 },
            { text: "give", value: -2 }
          ]
        },
        {
          guy: "Your teases are delivered with such heat.",
          girl: "It’s all ___ crafted to keep you hooked.",
          answers: [
            { text: "pretty", value: 2 },
            { text: "something", value: 1 },
            { text: "time", value: 0 },
            { text: "look", value: -2 }
          ]
        },
        {
          guy: "I love the tease you bring to every chat.",
          girl: "A dash of ___ naughty keeps it thrilling.",
          answers: [
            { text: "the", value: 2 },
            { text: "give", value: 1 },
            { text: "something", value: 0 },
            { text: "time", value: -2 }
          ]
        },
        {
          guy: "I’m dying to know your next move.",
          girl: "You should zero ___ the heat right now.",
          answers: [
            { text: "in", value: 2 },
            { text: "look", value: 1 },
            { text: "give", value: 0 },
            { text: "something", value: -2 }
          ]
        },
        {
          guy: "Your sexy style gets me every time.",
          girl: "It’s a vibe ___ I’ve honed for you.",
          answers: [
            { text: "that", value: 2 },
            { text: "time", value: 1 },
            { text: "look", value: 0 },
            { text: "give", value: -2 }
          ]
        }
      ,
        {
          guy: "You hinted at a sexy surprise tonight, babe.",
          girl: "I’m definitely ___ to drop it when you’re hot.",
          answers: [
            { text: "going", value: 2 },
            { text: "look", value: 1 },
            { text: "give", value: 0 },
            { text: "something", value: -2 }
          ]
        },
        {
          guy: "Will your tease be ready by tonight?",
          girl: "I ___ have it all set before you blink.",
          answers: [
            { text: "will", value: 2 },
            { text: "time", value: 1 },
            { text: "look", value: 0 },
            { text: "give", value: -2 }
          ]
        },
        {
          guy: "I hope I’ll catch all your naughty moves.",
          girl: "I know you ___ , it’s all straightforward.",
          answers: [
            { text: "can", value: 2 },
            { text: "something", value: 1 },
            { text: "time", value: 0 },
            { text: "look", value: -2 }
          ]
        },
        {
          guy: "Anything I need to know before your tease?",
          girl: "You ___ just chill and let me work it.",
          answers: [
            { text: "should", value: 2 },
            { text: "give", value: 1 },
            { text: "something", value: 0 },
            { text: "time", value: -2 }
          ]
        },
        {
          guy: "You’ve gotta have teased like this before.",
          girl: "I ___ admit I’ve got some tricks up my sleeve.",
          answers: [
            { text: "must", value: 2 },
            { text: "look", value: 1 },
            { text: "give", value: 0 },
            { text: "something", value: -2 }
          ]
        },
        {
          guy: "You’ve gotta have worked on this a ton.",
          girl: "I ___ have spent hours making it hot.",
          answers: [
            { text: "must", value: 2 },
            { text: "time", value: 1 },
            { text: "look", value: 0 },
            { text: "give", value: -2 }
          ]
        },
        {
          guy: "If I love tonight’s tease, I’ll be back.",
          girl: "If you come back, I ___ whip up something wilder.",
          answers: [
            { text: "will", value: 2 },
            { text: "something", value: 1 },
            { text: "time", value: 0 },
            { text: "look", value: -2 }
          ]
        },
        {
          guy: "If I had cash, I’d spoil you rotten.",
          girl: "If that were real, I ___ crank up the heat.",
          answers: [
            { text: "would", value: 2 },
            { text: "give", value: 1 },
            { text: "something", value: 0 },
            { text: "time", value: -2 }
          ]
        }
      ,
      
        {
          guy: "Your vibe screams real, babe.",
          girl: "Being real means I ___ my naughty side.",
          answers: [
            { text: "be", value: 2 },
            { text: "make", value: 1 },
            { text: "say", value: 0 },
            { text: "come", value: -2 }
          ]
        },
        {
          guy: "I love how you tease me so soft.",
          girl: "Teasing should ___ that heat, not force it.",
          answers: [
            { text: "make", value: 2 },
            { text: "be", value: 1 },
            { text: "say", value: 0 },
            { text: "come", value: -2 }
          ]
        },
        {
          guy: "Your words stick with me all day.",
          girl: "I pick ones that ___ layers of naughty.",
          answers: [
            { text: "say", value: 2 },
            { text: "come", value: 1 },
            { text: "be", value: 0 },
            { text: "make", value: 2 }
          ]
        },
        {
          guy: "You don’t need cheap moves to hook me.",
          girl: "Real vibes can ___ more heat than tricks.",
          answers: [
            { text: "give", value: 2 },
            { text: "say", value: 1 },
            { text: "come", value: 0 },
            { text: "be", value: -2 }
          ]
        },
        {
          guy: "I feel you without you saying a word.",
          girl: "A little tease can ___ your mind to run wild.",
          answers: [
            { text: "make", value: 2 },
            { text: "give", value: 1 },
            { text: "say", value: 0 },
            { text: "come", value: -2 }
          ]
        },
        {
          guy: "You turn the basic into something hot.",
          girl: "I love to ___ a vibe that’s more than cash.",
          answers: [
            { text: "give", value: 2 },
            { text: "be", value: 1 },
            { text: "make", value: 0 },
            { text: "say", value: -2 }
          ]
        },
        {
          guy: "Even your quiet moments feel deep.",
          girl: "A quiet tease can ___ that naughty spark.",
          answers: [
            { text: "give", value: 2 },
            { text: "make", value: 1 },
            { text: "be", value: 0 },
            { text: "say", value: -2 }
          ]
        },
        {
          guy: "You handle my wild side so smooth.",
          girl: "It works when I ___ that sexy respect first.",
          answers: [
            { text: "give", value: 2 },
            { text: "say", value: 1 },
            { text: "make", value: 0 },
            { text: "be", value: -2 }
          ]
        },
        {
          guy: "Your soft tease sticks with me all night.",
          girl: "I try to ___ vibes that keep you buzzing.",
          answers: [
            { text: "make", value: 2 },
            { text: "give", value: 1 },
            { text: "say", value: 0 },
            { text: "come", value: -2 }
          ]
        },
        
          {
            guy: "You nail my vibe every time, babe.",
            girl: "I watch your cues—it helps me ___ what gets you hot.",
            answers: [
              { text: "know", value: 2 },
              { text: "want", value: 1 },
              { text: "love", value: 0 },
              { text: "take", value: -2 }
            ]
          },
          
          {
            guy: "Even a small price tweak feels right with you.",
            girl: "It’s a tease I try to ___ just spicy enough.",
            answers: [
              { text: "make", value: 2 },
              { text: "love", value: 1 },
              { text: "know", value: 0 },
              { text: "want", value: -2 }
            ]
          },
          {
            guy: "Your soft tease is pure magic.",
            girl: "I love a vibe that can ___ into your wildest thoughts.",
            answers: [
              { text: "take", value: 2 },
              { text: "know", value: 1 },
              { text: "want", value: 0 },
              { text: "love", value: -2 }
            ]
          },
          {
            guy: "Your tease has layers I can’t resist.",
            girl: "I craft each one to ___ that deep, sexy spark.",
            answers: [
              { text: "make", value: 2 },
              { text: "take", value: 1 },
              { text: "know", value: 0 },
              { text: "love", value: -2 }
            ]
          },
          {
            guy: "You never push, just pull me in.",
            girl: "I like to ___ real heat, not fake it.",
            answers: [
              { text: "love", value: 2 },
              { text: "make", value: 1 },
              { text: "take", value: 0 },
              { text: "know", value: -2 }
            ]
          },
          {
            guy: "You spark my mind without saying it all.",
            girl: "A little room lets your fantasies ___ on their own.",
            answers: [
              { text: "take", value: 2 },
              { text: "love", value: 1 },
              { text: "know", value: 0 },
              { text: "want", value: -2 }
            ]
          },
          {
            guy: "Your chill vibe is so damn sexy.",
            girl: "It’s key to ___ that heat with a soft touch.",
            answers: [
              { text: "make", value: 2 },
              { text: "know", value: 1 },
              { text: "love", value: 0 },
              { text: "take", value: 2 }
            ]
          },
          {
            guy: "You turn chats into something wild.",
            girl: "It’s hot when we ___ that naughty edge.",
            answers: [
              { text: "love", value: 2 },
              { text: "make", value: 1 },
              { text: "know", value: 0 },
              { text: "want", value: -2 }
            ]
          }
        ,
        
          {
            guy: "I love your sexy confidence, babe.",
            girl: "Confidence helps me ___ real naughty vibes.",
            answers: [
              { text: "do", value: 2 },
              { text: "need", value: 1 },
              { text: "grab", value: 0 },
              { text: "run", value: -2 }
            ]
          },
          {
            guy: "Your little tweaks make it so hot.",
            girl: "I never want to ___ fake with you.",
            answers: [
              { text: "be", value: 2 },
              { text: "do", value: 1 },
              { text: "need", value: 0 },
              { text: "grab", value: -2 }
            ]
          },
          {
            guy: "You roll with my moods like a pro.",
            girl: "Flexibility lets me ___ that sexy spark.",
            answers: [
              { text: "grab", value: 2 },
              { text: "run", value: 1 },
              { text: "do", value: 0 },
              { text: "need", value: -2 }
            ]
          },

          /// sexi ones

          {
            guy: "You're calm as hell right now.",
            girl: "Damn right—I'm ___ with you here.",
            answers: [
              { text: "tip", value: -2 },
              { text: "good", value: 2 },
              { text: "work", value: 0 },
              { text: "see", value: 1 }
            ]
          },
          {
            guy: "You're steady like a damn rock.",
            girl: "Oh, I'm ___ whenever you're in my grip.",
            answers: [
              { text: "yeah", value: -2 },
              { text: "fine", value: 2 },
              { text: "day", value: 0 },
              { text: "hard", value: 1 }
            ]
          },
          {
            guy: "You're chill as fuck today, babe.",
            girl: "Hell yeah—I'm ___ when you're around.",
            answers: [
              { text: "busy", value: -2 },
              { text: "good", value: 2 },
              { text: "tip", value: 0 },
              { text: "cum", value: 1 }
            ]
          },
          {
            guy: "You turn this into pure effortless heat.",
            girl: "I craft it so ___ can let loose and feel home.",
            answers: [
              { text: "busy", value: -2 },
              { text: "you", value: 2 },
              { text: "good", value: 0 },
              { text: "see", value: 1 }
            ]
          },
         
          {
            guy: "You make this feel so damn easy.",
            girl: "I'm here so ___ can get freaky and chill too.",
            answers: [
              { text: "good", value: -2 },
              { text: "you", value: 2 },
              { text: "yeah", value: 0 },
              { text: "babe", value: 1 }
            ]
          },
          {
            guy: "Wallet's dry 'til payday swings in.",
            girl: "Fork over $5 today, and I ___ you a spicy snap.",
            answers: [
              { text: "tip", value: -2 },
              { text: "will", value: 2 },
              { text: "good", value: 0 },
              { text: "see", value: 1 }
            ]
          },
          {
            guy: "I'm tapped 'til the next check hits.",
            girl: "Tip me $15 today, and I ___ you a filthy tease.",
            answers: [
              { text: "good", value: -2 },
              { text: "will", value: 2 },
              { text: "day", value: 0 },
              { text: "cum", value: 1 }
            ]
          },
         
          {
            guy: "What's up for grabs tonight, gorgeous?",
            girl: "Think—we ___ splash around and get messy?",
            answers: [
              { text: "wanna", value: 2 },
              { text: "work", value: 0 },
              { text: "will", value: 2 },
              { text: "see", value: 1 }
            ]
          },
          {
            guy: "What's the play tonight, queen?",
            girl: "How about—we ___ toy with some naughty fun?",
            answers: [
              { text: "wanna", value: 2 },
              { text: "yeah", value: 0 },
              { text: "tip", value: -2 },
              { text: "cum", value: 2 }
            ]
          },
          {
            guy: "What's cooking for us tonight, hot stuff?",
            girl: "Picture this—we ___ tangle up in the sheets?",
            answers: [
              { text: "wanna", value: 2 },
              { text: "good", value: 0 },
              { text: "will", value: 2 },
              { text: "hard", value: 1 }
            ]
          },
         
          
          {
            guy: "You flip my dull days into something hot.",
            girl: "That's my game—I'm all ___ cranking your vibe.",
            answers: [
              { text: "good", value: 0 },
              { text: "for", value: 2 },
              { text: "about", value: 2 },
              { text: "hard", value: 1 }
            ]
          },
          {
            guy: "Your ass in that pic stole my breath.",
            girl: "Oh, I framed it to look ___ just for you, babe.",
            answers: [
              { text: "busy", value: -2 },
              { text: "hot", value: 2 },
              { text: "cum", value: 1 },
              { text: "day", value: 0 }
            ]
          },
          {
            guy: "That clip showed off your curves so damn good.",
            girl: "Mmm, I posed them to look ___ for your eyes.",
            answers: [
              { text: "yeah", value: 0 },
              { text: "sexy", value: 2 },
              { text: "see", value: 1 },
              { text: "work", value: -2 }
            ]
          },
          {
            guy: "Your body in that vid had me drooling.",
            girl: "Glad you're hooked—I made it look ___ just for you.",
            answers: [
              { text: "hard", value: -2 },
              { text: "naughty", value: 2 },
              { text: "good", value: 2 },
              { text: "tip", value: 0 }
            ]
          },
        
          {
            guy: "How long 'til that naughty vid lands?",
            girl: "Relax, lover—I ___ it your way come midnight.",
            answers: [
              { text: "ass", value: 0 },
              { text: "tip", value: -2 },
              { text: "will", value: 2 },
              { text: "see", value: 1 }
            ]
          },
          
          {
            guy: "How soon 'til I get that dildo clip?",
            girl: "Chill, babe—I ___ it over before dawn.",
            answers: [
              { text: "yeah", value: 0 },
              { text: "know", value: -2 },
              { text: "will", value: 2 },
              { text: "cum", value: 2 }
            ]
          },
          
          {
            guy: "You're flicking some hot energy at me.",
            girl: "That's the start—I'm hatching a ___ thrill to melt you.",
            answers: [
              { text: "video", value: 0 },
              { text: "throbbing", value: 2 },
              { text: "busy", value: -2 },
              { text: "hard", value: 2 }
            ]
          },
          {
            guy: "You're dripping some steamy vibes my way.",
            girl: "Mmm, just a warm-up—I've got a ___ twist coming.",
            answers: [
              { text: "yeah", value: 0 },
              { text: "squirt", value: 2 },
              { text: "tip", value: -2 },
              { text: "see", value: 1 }
            ]
          },
          {
            guy: "You're tossing me some wild sparks, huh?",
            girl: "That's the opener—I'm brewing a ___ tease for you.",
            answers: [
              { text: "pussy", value: 2 },
              { text: "day", value: 0 },
              { text: "work", value: -2 },
              { text: "ass", value: 2 }
            ]
          },
          {
            guy: "You're tossing me some wild sparks, huh?",
            girl: "Just a peek—I'm cooking up a ___ treat to blow you away.",
            answers: [
              { text: "tip", value: 0 },
              { text: "naughty", value: 2 },
              { text: "babe", value: -2 },
              { text: "yeah", value: 1 }
            ]
          },
          {
            guy: "Your pics lit me up outta nowhere.",
            girl: "Yum—I get off on ___ catches like you from the start.",
            answers: [
              { text: "babe", value: -2 },
              { text: "throbbing", value: 2 },
              { text: "good", value: 0 },
              { text: "hard", value: 2 }
            ]
          },
          {
            guy: "Your tease dragged me into your world.",
            girl: "Sweet—I'm all about ___ hot fans like you instantly.",
            answers: [
              { text: "naughty", value: 2 },
              { text: "yeah", value: 0 },
              { text: "shower", value: -2 },
              { text: "see", value: 1 }
            ]
          },
          {
            guy: "You're unshaken and hot as ever.",
            girl: "For sure—I'm ___ while you're with me.",
            answers: [
              { text: "rattled", value: -2 },
              { text: "slick as ice", value: 2 },
              { text: "buzzing", value: 2 },
              { text: "jittery", value: 2 }
            ]
          },
          {
            guy: "You're steady like a damn rock.",
            girl: "Oh, I'm ___ whenever you're in my grip.",
            answers: [
              { text: "rattled", value: -2 },
              { text: "smooth as silk", value: 2 },
              { text: "simmering", value: 0 },
              { text: "wobbly", value: 2 }
            ]
          },
          
          {
            guy: "Should've hit you up way back, babe.",
            girl: "Softly, I've ___ wanted a vibe like yours.",
            answers: [
              { text: "never", value: 0 },
              { text: "always", value: 2 },
              { text: "hardly", value: -2 },
              { text: "frequently", value: 2 }
            ]
          },
          {
            guy: "I waited too long to dive in here.",
            girl: "Oh, I've ___ dreamed of catching you.",
            answers: [
              { text: "never", value: 0 },
              { text: "secretly", value: 2 },
              { text: "seldom", value: -2 },
              { text: "often", value: 2}
            ]
          },
          {
            guy: "Wish I'd tapped this ages ago.",
            girl: "Mmm, I've ___ hungered for a fan like you.",
            answers: [
              { text: "never", value: 0 },
              { text: "always", value: 2 },
              { text: "rarely", value: -2 },
              { text: "sometimes", value: 2 }
            ]
          },
          {
            guy: "You've got this flow that's so natural.",
            girl: "I'm building a spot where ___ get naughty and cozy.",
            answers: [
              { text: "him", value: -2 },
              { text: "you", value: 2 },
              { text: "them", value: 0 },
              { text: "her", value: 1 }
            ]
          },
          {
            guy: "You turn this into pure effortless heat.",
            girl: "I craft it so ___ can let loose and feel home.",
            answers: [
              { text: "him", value: -2 },
              { text: "you", value: 2 },
              { text: "them", value: 0 },
              { text: "her", value: 1 }
            ]
          },
          {
            guy: "You've got a knack for keeping it smooth.",
            girl: "My vibe's set so ___ feel wild yet snug here.",
            answers: [
              { text: "him", value: -2 },
              { text: "you", value: 2 },
              { text: "them", value: 0 },
              { text: "her", value: 1 }
            ]
          },
          {
            guy: "You make this feel so damn easy.",
            girl: "I'm here so ___ can get freaky and chill too.",
            answers: [
              { text: "him", value: -2 },
              { text: "you", value: 2 },
              { text: "them", value: 0 },
              { text: "her", value: 1 }
            ]
          },
          {
            guy: "I'm broke 'til next week kicks off.",
            girl: "Slip me $25 now, and I ___ you a wild taste.",
            answers: [
              { text: "handed", value: -2 },
              { text: "would hand", value: 2 },
              { text: "hand", value: 2 },
              { text: "will hand", value: 2 }
            ]
          },
          {
            guy: "I'm tapped 'til the next check hits.",
            girl: "Tip me $15 today, and I ___ you a filthy tease.",
            answers: [
              { text: "sent", value: -2 },
              { text: "would send", value: 2 },
              { text: "send", value: 2 },
              { text: "will send", value: 2 }
            ]
          },
          {
            guy: "Cash is low 'til Friday rolls around.",
            girl: "Slide me $10 now, and I ___ you a hot peek.",
            answers: [
              { text: "flashed", value: -2 },
              { text: "would flash", value: 2 },
              { text: "flash", value: 2 },
              { text: "will flash", value: 2 }
            ]
          },
          {
            guy: "Hit me with a wild tidbit, sexy.",
            girl: "I've got a twist ___ gets me soaked every night.",
            answers: [
              { text: "that", value: 2 },
              { text: "who", value: 0 },
              { text: "what", value: -2 },
              { text: "when", value: 1 }
            ]
          },
          {
            guy: "Whisper me a freaky secret.",
            girl: "I've got a craving ___ lights my fire nonstop.",
            answers: [
              { text: "that", value: 2 },
              { text: "who", value: 0 },
              { text: "what", value: -2 },
              { text: "when", value: 1 }
            ]
          },
          {
            guy: "Drop a naughty little confession.",
            girl: "I've got a move ___ sets my pulse racing.",
            answers: [
              { text: "that", value: 2 },
              { text: "who", value: 0 },
              { text: "what", value: -2 },
              { text: "when", value: 1 }
            ]
          },
          {
            guy: "Spill me something dirty, babe.",
            girl: "I've got a trick ___ makes me drip every time.",
            answers: [
              { text: "that", value: 2 },
              { text: "who", value: 0 },
              { text: "what", value: -2 },
              { text: "when", value: 1 }
            ]
          },
          {
            guy: "That vid's haunting me in the best way.",
            girl: "Yum—I'm all about ___ a thrill that lingers.",
            answers: [
              { text: "shaking off", value: -2 },
              { text: "planting", value: 2 },
              { text: "tearing up", value: 0 },
              { text: "revving", value: 1 }
            ]
          },
          {
            guy: "What's up for grabs tonight, gorgeous?",
            girl: "Think—we ___ splash around and get messy?",
            answers: [
              { text: "might", value: 2 },
              { text: "must", value: 0 },
              { text: "will", value: -2 },
              { text: "can", value: 1 }
            ]
          },
          {
            guy: "What's cooking for us tonight, hot stuff?",
            girl: "Picture this—we ___ tangle up in the sheets?",
            answers: [
              { text: "might", value: 2 },
              { text: "must", value: 0 },
              { text: "will", value: -2 },
              { text: "can", value: 1 }
            ]
          },
          {
        guy: "I really like talking to you. You seem so nice.",
        girl: "Aww, that’s sweet. I’m happy to ___ with you again tomorrow.",
        answers: [
          { text: "talk", value: 2 },
          { text: "cry", value: 1 },
          { text: "run", value: 0 },
          { text: "sleep", value: -2 }
        ]
      },
      {
        guy: "Your smile is beautiful. It made my day.",
        girl: "I’m glad! I hope I ___ your day tomorrow too.",
        answers: [
          { text: "brighten", value: 2 },
          { text: "fix", value: 1 },
          { text: "break", value: 0 },
          { text: "ignore", value: -2 }
        ]
      },
      {
        guy: "I love when you wear that red dress. It’s so pretty.",
        girl: "You like it? Maybe I’ll ___ it again tonight.",
        answers: [
          { text: "wear", value: 2 },
          { text: "wash", value: 1 },
          { text: "hide", value: 0 },
          { text: "lose", value: -2 }
        ]
      },
      {
        guy: "I’m excited to see your new photo.",
        girl: "Just ___ me a minute, I’m uploading it now.",
        answers: [
          { text: "give", value: 2 },
          { text: "take", value: 1 },
          { text: "call", value: 0 },
          { text: "push", value: -2 }
        ]
      },
      {
        guy: "You look happy today.",
        girl: "Yes, the sun always makes me ___.",
        answers: [
          { text: "smile", value: 2 },
          { text: "sleep", value: 1 },
          { text: "shout", value: 0 },
          { text: "cry", value: -2 }
        ]
      },
      {
        guy: "I can’t wait to chat with you again.",
        girl: "Same here. Let’s ___ again this evening?",
        answers: [
          { text: "talk", value: 2 },
          { text: "cook", value: 1 },
          { text: "jump", value: 0 },
          { text: "shout", value: -2 }
        ]
      },
      {
        guy: "Your laugh sounds so cute.",
        girl: "Thank you! When I’m happy, I just ___ without thinking.",
        answers: [
          { text: "laugh", value: 2 },
          { text: "fall", value: 1 },
          { text: "run", value: 0 },
          { text: "hide", value: -2 }
        ]
      },
      {
        guy: "I love how simple and honest you are.",
        girl: "I always try to ___ true to myself.",
        answers: [
          { text: "stay", value: 2 },
          { text: "cry", value: 1 },
          { text: "jump", value: 0 },
          { text: "eat", value: -2 }
        ]
      },
      {
        guy: "Your voice note was sweet.",
        girl: "I’m glad you liked it. Next time I’ll ___ more softly.",
        answers: [
          { text: "speak", value: 2 },
          { text: "sleep", value: 1 },
          { text: "scream", value: 0 },
          { text: "push", value: -2 }
        ]
      },
      {
        guy: "I enjoy your stories; they make me smile.",
        girl: "I’m happy to ___ more stories if you want.",
        answers: [
          { text: "tell", value: 2 },
          { text: "miss", value: 1 },
          { text: "break", value: 0 },
          { text: "kick", value: -2 }
        ]
      },
      {
        guy: "I feel calm when I talk to you.",
        girl: "That’s lovely. I want to ___ that feeling for you.",
        answers: [
          { text: "keep", value: 2 },
          { text: "wash", value: 1 },
          { text: "drop", value: 0 },
          { text: "hit", value: -2 }
        ]
      },
      {
        guy: "I like how you say my name.",
        girl: "I enjoy saying it. It makes me ___ happy.",
        answers: [
          { text: "feel", value: 2 },
          { text: "run", value: 1 },
          { text: "shout", value: 0 },
          { text: "jump", value: -2 }
        ]
      },
      {
        guy: "You’re always so kind to me.",
        girl: "I believe kindness can ___ anyone’s day.",
        answers: [
          { text: "brighten", value: 2 },
          { text: "skip", value: 1 },
          { text: "end", value: 0 },
          { text: "bite", value: -2 }
        ]
      },
      {
        guy: "I love your simple outfit today.",
        girl: "Thanks, I ___ it myself this morning.",
        answers: [
          { text: "chose", value: 2 },
          { text: "lost", value: 1 },
          { text: "threw", value: 0 },
          { text: "broke", value: -2 }
        ]
      },
      {
        guy: "Hearing from you makes my afternoon better.",
        girl: "I’m glad! I hope I can ___ your mood tomorrow too.",
        answers: [
          { text: "lift", value: 2 },
          { text: "push", value: 1 },
          { text: "hide", value: 0 },
          { text: "sell", value: -2 }
        ]
      },
      {
        guy: "I love when you smile at the camera.",
        girl: "I do it because I want to ___ you happy.",
        answers: [
          { text: "make", value: 2 },
          { text: "leave", value: 1 },
          { text: "trick", value: 0 },
          { text: "break", value: -2 }
        ]
      },
      {
        guy: "You sound cheerful today.",
        girl: "Yes, good vibes ___ my heart warm.",
        answers: [
          { text: "keep", value: 2 },
          { text: "miss", value: 1 },
          { text: "drop", value: 0 },
          { text: "kill", value: -2 }
        ]
      },
      {
        guy: "Your message made me smile.",
        girl: "I love knowing I can ___ a smile on your face.",
        answers: [
          { text: "put", value: 2 },
          { text: "wash", value: 1 },
          { text: "lose", value: 0 },
          { text: "hit", value: -2 }
        ]
      },
      {
        guy: "I’m glad we have this time together.",
        girl: "Me too. Let’s ___ this moment special.",
        answers: [
          { text: "make", value: 2 },
          { text: "fix", value: 1 },
          { text: "drop", value: 0 },
          { text: "hurt", value: -2 }
        ]
      },
      {
        guy: "You seem relaxed tonight.",
        girl: "I am. Your presence helps me ___ calm.",
        answers: [
          { text: "stay", value: 2 },
          { text: "jump", value: 1 },
          { text: "cut", value: 0 },
          { text: "dig", value: -2 }
        ]
      },{
        guy: "I really like talking to you. You seem so nice.",
        girl: "Aww, that’s sweet. I’m happy to ___ with you again tomorrow.",
        answers: [
          { text: "talk", value: 2 },
          { text: "cry", value: 1 },
          { text: "run", value: 0 },
          { text: "sleep", value: 2 }
        ]
      },
      {
        guy: "Your smile is beautiful. It made my day.",
        girl: "I’m glad! I hope I ___ your day tomorrow too.",
        answers: [
          { text: "brighten", value: 2 },
          { text: "fix", value: 1 },
          { text: "break", value: 0 },
          { text: "ignore", value: -2 }
        ]
      },
      {
        guy: "I love when you wear that red dress. It’s so pretty.",
        girl: "You like it? Maybe I’ll ___ it again tonight.",
        answers: [
          { text: "wear", value: 2 },
          { text: "wash", value: 1 },
          { text: "hide", value: 0 },
          { text: "lose", value: 2 }
        ]
      },
      {
        guy: "I’m excited to see your new photo.",
        girl: "Just ___ me a minute, I’m uploading it now.",
        answers: [
          { text: "give", value: 2 },
          { text: "take", value: 1 },
          { text: "call", value: 0 },
          { text: "push", value: -2 }
        ]
      },
      {
        guy: "You look happy today.",
        girl: "Yes, the sun always makes me ___.",
        answers: [
          { text: "smile", value: 2 },
          { text: "sleep", value: 1 },
          { text: "shout", value: 0 },
          { text: "cry", value: 2 }
        ]
      },
      {
        guy: "I can’t wait to chat with you again.",
        girl: "Same here. Let’s ___ again this evening?",
        answers: [
          { text: "talk", value: 2 },
          { text: "cook", value: 1 },
          { text: "jump", value: 0 },
          { text: "shout", value: 2 }
        ]
      },
      {
        guy: "Your laugh sounds so cute.",
        girl: "Thank you! When I’m happy, I just ___ without thinking.",
        answers: [
          { text: "laugh", value: 2 },
          { text: "fall", value: 1 },
          { text: "run", value: 0 },
          { text: "hide", value: 2 }
        ]
      },
      {
        guy: "I love how simple and honest you are.",
        girl: "I always try to ___ true to myself.",
        answers: [
          { text: "stay", value: 2 },
          { text: "cry", value: 1 },
          { text: "jump", value: 0 },
          { text: "eat", value: -2 }
        ]
      },
      {
        guy: "Your voice note was sweet.",
        girl: "I’m glad you liked it. Next time I’ll ___ more softly.",
        answers: [
          { text: "speak", value: 2 },
          { text: "sleep", value: 1 },
          { text: "scream", value: 0 },
          { text: "push", value: -2 }
        ]
      },
      {
        guy: "I enjoy your stories; they make me smile.",
        girl: "I’m happy to ___ more stories if you want.",
        answers: [
          { text: "tell", value: 2 },
          { text: "miss", value: 1 },
          { text: "break", value: 0 },
          { text: "kick", value: 2 }
        ]
      },
      {
        guy: "I feel calm when I talk to you.",
        girl: "That’s lovely. I want to ___ that feeling for you.",
        answers: [
          { text: "keep", value: 2 },
          { text: "wash", value: 1 },
          { text: "drop", value: 0 },
          { text: "hit", value: -2 }
        ]
      },
      {
        guy: "I like how you say my name.",
        girl: "I enjoy saying it. It makes me ___ happy.",
        answers: [
          { text: "feel", value: 2 },
          { text: "run", value: 1 },
          { text: "shout", value: 0 },
          { text: "jump", value: 2 }
        ]
      },
      {
        guy: "You’re always so kind to me.",
        girl: "I believe kindness can ___ anyone’s day.",
        answers: [
          { text: "brighten", value: 2 },
          { text: "skip", value: 1 },
          { text: "end", value: 0 },
          { text: "bite", value: 2 }
        ]
      },
      {
        guy: "I love your simple outfit today.",
        girl: "Thanks, I ___ it myself this morning.",
        answers: [
          { text: "chose", value: 2 },
          { text: "lost", value: 1 },
          { text: "threw", value: 0 },
          { text: "broke", value: -2 }
        ]
      },
      {
        guy: "Hearing from you makes my afternoon better.",
        girl: "I’m glad! I hope I can ___ your mood tomorrow too.",
        answers: [
          { text: "lift", value: 2 },
          { text: "push", value: 1 },
          { text: "hide", value: 0 },
          { text: "sell", value: -2 }
        ]
      },
      {
        guy: "I love when you smile at the camera.",
        girl: "I do it because I want to ___ you happy.",
        answers: [
          { text: "make", value: 2 },
          { text: "leave", value: 2 },
          { text: "trick", value: 0 },
          { text: "break", value: -2 }
        ]
      },
      
      {
        guy: "Your message made me smile.",
        girl: "I love knowing I can ___ a smile on your face.",
        answers: [
          { text: "put", value: 2 },
          { text: "wash", value: 1 },
          { text: "lose", value: 0 },
          { text: "hit", value: -2 }
        ]
      },
      {
        guy: "I’m glad we have this time together.",
        girl: "Me too. Let’s ___ this moment special.",
        answers: [
          { text: "make", value: 2 },
          { text: "fix", value: 1 },
          { text: "drop", value: 0 },
          { text: "hurt", value: -2 }
        ]
      },
      {
        guy: "You seem relaxed tonight.",
        girl: "I am. Your presence helps me ___ calm.",
        answers: [
          { text: "stay", value: 2 },
          { text: "jump", value: 1 },
          { text: "cut", value: 0 },
          { text: "dig", value: -2 }
        ]
      },
      // B1 LEVEL (21-35)
      {
        guy: "Your idea about a small discount caught my attention.",
        girl: "I decided to ___ it because you’ve been polite.",
        answers: [
          { text: "offer", value: 2 },
          { text: "drop", value: 2 },
          { text: "hide", value: 0 },
          { text: "shout", value: -2 }
        ]
      },
      {
        guy: "I appreciate you understanding my budget.",
        girl: "No problem. I try to ___ flexible for good customers.",
        answers: [
          { text: "remain", value: 2 },
          { text: "vanish", value: 1 },
          { text: "scream", value: 0 },
          { text: "push", value: -2 }
        ]
      },
      {
        guy: "It’s nice how you keep things clear and honest.",
        girl: "Honesty helps me ___ trust with you.",
        answers: [
          { text: "build", value: 2 },
          { text: "flip", value: 1 },
          { text: "erase", value: 0 },
          { text: "kick", value: -2 }
        ]
      },
      {
        guy: "Your approach to chatting makes me comfortable.",
        girl: "I want to ___ a relaxed vibe here.",
        answers: [
          { text: "maintain", value: 2 },
          { text: "twist", value: 1 },
          { text: "lose", value: 0 },
          { text: "burn", value: -2 }
        ]
      },
      {
        guy: "You know how to make each moment count.",
        girl: "I believe small details can ___ an experience.",
        answers: [
          { text: "enhance", value: 2 },
          { text: "lock", value: 1 },
          { text: "steal", value: 0 },
          { text: "drop", value: -2 }
        ]
      },
      {
        guy: "Your last message was really charming.",
        girl: "I try to ___ my words carefully.",
        answers: [
          { text: "choose", value: 2 },
          { text: "break", value: 1 },
          { text: "ignore", value: 0 },
          { text: "throw", value: -2 }
        ]
      },
      {
        guy: "I notice you aren’t pushing me to buy more.",
        girl: "I prefer not to ___ you into spending.",
        answers: [
          { text: "pressure", value: 2 },
          { text: "break", value: 1 },
          { text: "store", value: 0 },
          { text: "lift", value: -2 }
        ]
      },
      {
        guy: "You make this place feel welcoming.",
        girl: "I want everyone here to ___ valued.",
        answers: [
          { text: "feel", value: 2 },
          { text: "melt", value: 1 },
          { text: "crash", value: 0 },
          { text: "tear", value: -2 }
        ]
      },
      {
        guy: "Your style of conversation keeps me intrigued.",
        girl: "I aim to ___ curiosity rather than force it.",
        answers: [
          { text: "spark", value: 2 },
          { text: "freeze", value: 1 },
          { text: "remove", value: 0 },
          { text: "shout", value: -2 }
        ]
      },
      {
        guy: "I respect how you handle yourself with confidence.",
        girl: "Confidence helps me ___ genuine.",
        answers: [
          { text: "remain", value: 2 },
          { text: "push", value: 1 },
          { text: "drown", value: 0 },
          { text: "dent", value: -2 }
        ]
      },
      {
        guy: "Your small compromises mean a lot.",
        girl: "I never want to ___ forced.",
        answers: [
          { text: "appear", value: 2 },
          { text: "confuse", value: 1 },
          { text: "smash", value: 0 },
          { text: "sting", value: -2 }
        ]
      },
      {
        guy: "I like how you adapt to different moods.",
        girl: "Flexibility lets me ___ a connection.",
        answers: [
          { text: "maintain", value: 2 },
          { text: "twist", value: 1 },
          { text: "freeze", value: 0 },
          { text: "harm", value: -2 }
        ]
      },
      {
        guy: "You’re good at reading my reactions.",
        girl: "I pay attention to cues. It helps me ___ what you enjoy.",
        answers: [
          { text: "understand", value: 2 },
          { text: "ignore", value: 1 },
          { text: "drop", value: 0 },
          { text: "rip", value: 2 }
        ]
      },
      {
        guy: "Your willingness to listen makes a difference.",
        girl: "I believe listening can ___ trust and comfort.",
        answers: [
          { text: "build", value: 2 },
          { text: "drill", value: 1 },
          { text: "blur", value: 0 },
          { text: "sink", value: 2 }
        ]
      },
      {
        guy: "Even if you adjust the price slightly, it feels fair.",
        girl: "It’s a balance I try to ___ carefully.",
        answers: [
          { text: "keep", value: 2 },
          { text: "cut", value: 1 },
          { text: "throw", value: 0 },
          { text: "stain", value: -2 }
        ]
      },
      {
        guy: "You mentioned something special for tonight.",
        girl: "I’m definitely ___ to reveal it once you’re ready.",
        answers: [
          { text: "going", value: 2 },
          { text: "planning", value: 1 },
          { text: "moving", value: 0 },
          { text: "forgetting", value: -2 }
        ]
      },
      {
        guy: "Do you think you will finish setting it up by 8 p.m.?",
        girl: "I ___ have it ready before you know it.",
        answers: [
          { text: "will", value: 2 },
          { text: "might", value: 1 },
          { text: "must", value: 0 },
          { text: "should", value: -2 }
        ]
      },
      {
        guy: "I hope I can understand all the details once shown.",
        girl: "I’m sure you ___, it’s not complicated.",
        answers: [
          { text: "can", value: 2 },
          { text: "may", value: 1 },
          { text: "should", value: 0 },
          { text: "must", value: -2 }
        ]
      },
      {
        guy: "Is there something I should know beforehand?",
        girl: "You ___ just relax and trust me.",
        answers: [
          { text: "should", value: 2 },
          { text: "can", value: 1 },
          { text: "mustn’t", value: 0 },
          { text: "will", value: -2 }
        ]
      },
      {
        guy: "You must have done this before.",
        girl: "I ___ admit I have some experience.",
        answers: [
          { text: "must", value: 2 },
          { text: "might", value: 1 },
          { text: "could", value: 0 },
          { text: "would", value: -2 }
        ]
      },
      {
        guy: "You must have practiced a lot.",
        girl: "I ___ have spent some time perfecting it.",
        answers: [
          { text: "must", value: 2 },
          { text: "could", value:2 },
          { text: "might", value: 0 },
          { text: "should", value: -2 }
        ]
      },
      {
        guy: "If I enjoy tonight’s surprise, I will return.",
        girl: "If you return, I ___ prepare something better.",
        answers: [
          { text: "will", value: 2 },
          { text: "may", value:  2},
          { text: "should", value: 0 },
          { text: "could", value: -2 }
        ]
      },
      {
        guy: "If I were richer, I’d pay any price.",
        girl: "If that were true, I ___ consider something luxurious.",
        answers: [
          { text: "would", value: 2 },
          { text: "had", value: 1 },
          { text: "have been", value: 0 },
          { text: "was being", value: -2 }
        ]
      },
      {
        guy: "If I had known you earlier, I wouldn’t have missed out.",
        girl: "If we had met sooner, I ___ have shown you many things.",
        answers: [
          { text: "wouldn’t", value: 2 },
          { text: "shouldn’t", value: 1 },
          { text: "couldn’t", value: 0 },
          { text: "won’t", value: -2 }
        ]
      },
      {
        guy: "Your approach is more unique than others.",
        girl: "I try to be ___ unique than the rest.",
        answers: [
          { text: "more", value: 2 },
          { text: "more better", value: 1 },
          { text: "gooder", value: 0 },
          { text: "more bad", value: -2 }
        ]
      },
      {
        guy: "You’re the best I’ve encountered.",
        girl: "I aim to be the ___ in this space.",
        answers: [
          { text: "best", value: 2 },
          { text: "better", value: 1 },
          { text: "godest", value: 2 },
          { text: "more best", value: -2 }
        ]
      }
        
      
    




  // ... all your existing questions array content ...
];

export default questions;