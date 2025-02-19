// At the top of the file, define default conversations
window.CONVOS = [
    ["Hey there!", "Hi! How are you?"],
    ["How's your day going?", "Pretty good, thanks for asking!"],
    ["What's new?", "Not much, just enjoying chatting with you!"]
];

window.CONVOS_SEXUAL = [
    ["You're looking amazing today!", "Aww, you're making me blush! 🔥"],
    ["I can't stop thinking about you...", "Oh really? Tell me more... 😏"],
    ["You're so hot!", "You know just what to say... 😘"]
];

window.JOBCONVOS = [
    ["What do you do for work?", "I'm an engineer!"],
    ["How's work going?", "Keeping busy but good!"],
    ["Do you enjoy your job?", "Yes, it's challenging but rewarding!"]
];

window.AGECONVOS = [
    ["How old are you?", "I'm 25!"],
    ["You seem very mature", "Thank you, I try to be!"],
    ["Age is just a number, right?", "Exactly! It's all about how you feel!"]
];

window.HOBBICONVOS = [
    ["What are your hobbies?", "I love gaming!"],
    ["What do you do for fun?", "I enjoy reading and hiking!"],
    ["Got any interesting hobbies?", "Yes, I love photography!"]
];

window.COUNTRYCONVOS = [
    ["Where are you from?", "I'm from the USA!"],
    ["Which city do you live in?", "I'm in New York!"],
    ["How's the weather there?", "It's beautiful today!"]
];

window.TVSERIESCONVOS = [
    ["What shows do you watch?", "I love Breaking Bad!"],
    ["Seen any good shows lately?", "Yes, just finished Stranger Things!"],
    ["What's your favorite series?", "Game of Thrones, definitely!"]
];

// Sexual versions
window.JOBCONVOS_SEXUAL = [
    ["Your job sounds exciting!", "It has its moments 😏"],
    ["Do you work hard?", "Very hard... want to see? 😈"],
    ["Busy at work?", "Never too busy for you... 🔥"]
];

window.AGECONVOS_SEXUAL = [
    ["Age is just a number!", "You're so right 😘"],
    ["You're so mature...", "I can show you how mature I am... 😏"],
    ["Looking good for your age!", "Want to see more? 😈"]
];

window.HOBBICONVOS_SEXUAL = [
    ["Your hobbies sound fun!", "Maybe we can do them together 😉"],
    ["What do you do for fun?", "I could show you some fun things... 😏"],
    ["Got any secret hobbies?", "Want to find out? 😘"]
];

window.COUNTRYCONVOS_SEXUAL = [
    ["I love your accent!", "You're making me blush 🥰"],
    ["Your country sounds hot!", "Not as hot as me... 😏"],
    ["Want to show me around?", "I'll give you a private tour... 😘"]
];

window.TVSERIESCONVOS_SEXUAL = [
    ["Netflix and chill?", "Sounds perfect 😏"],
    ["Want to watch something together?", "I might get distracted... 😘"],
    ["What's your favorite scene?", "The steamy ones... 🔥"]
];

// Remove any loadLines or other file-reading functions since we're in the browser

// Basic predetermined questions
const BASIC_QUESTIONS = [
    "Where are you from?",
    "How did you find my page?",
    "How old are you?",
    "What is your job?",
    "What are your hobbies?",
    "What's your favorite TV series?",
    "What do you enjoy most about your job?",
    "Tell me about your region."
];

window.DEEP_QUESTIONS = {
    "Where are you from?": {
        correct_generic: ["How is living in {detail} treating you?", "Is life in {detail} really that exciting?"],
        fake_generic: ["How is living in {alternative} treating you?", "Is life in {alternative} really that exciting?"]
    },
    "How did you find my page?": {
         "correct_generic": ["What was it about finding me through {detail} that intrigued you?" , "Do you spend long hours on {detail}?"],
         "fake_generic": [
             "Was it really {alternative} that caught your eye?",
             "Do you really think {alternative} is how you found me?"
         ]
    },
    "How old are you?": {
         "correct_generic": ["How do you feel about being {detail} years old?",  "Is being {detail} really preferable?"],
         "fake_generic": ["How do you feel about being {alternative} years old?",  "Is being {alternative} really preferable?"]
    },
    "What is your job?": {
         "correct_generic": ["What makes being a {detail} so rewarding for you?", "Do you really enjoy being a {detail}?",
             "Is being a {detail} as fulfilling as you would like?"],
         "fake_generic": ["What makes being a {alternative} so rewarding for you?", "Do you really enjoy being a {alternative}?",
             "Is being a {alternative} as fulfilling as you would like?"]
    },
    "What are your hobbies?": {
         "correct_golf": ["How is Golf treating you?"],
         "fake_golf": [
             "What makes Basketball so fun for you?",
             "Are you pro in Volleyball?"
         ],
         "correct_generic":[ "Tell me more about {detail}.", "What do you love most about {detail}.", "How does {detail} make your life betta?"],
         "fake_generic": [ "Tell me more about {alternative}.", "What do you love about {alternative}.", "How does {alternative} make your life betta?"]
    },
    "What's your favorite TV series?": {
         "correct_generic":[ "Tell me more about {detail}.", "What do you love most about {detail}."],
         "fake_generic": [ "Tell me more about {alternative}.", "What do you love about {alternative}."]
   
    },
    "How did you find my page?": {
         "correct_generic":[ "Tell me more about how you found me through {detail}."],
         "fake_generic": [ "Tell me more about how you found me through {alternative}.", "What do you love about {alternative}."]
   
    },
    "What do you enjoy most about your job?": {
         "correct_generic":[ "What do you mean by {detail}?",  "Woow, {detail}! What's that?",
             "Do you ever find being a {detail} dull?"],
         "fake_generic": [ "What makes your work as a {alternative} so special?",  "Is being a {alternative} really that exciting?",
             "Do you ever find being a {alternative} dull?"]
    },
    "Tell me about your region.": {
         "correct_generic": ["How does living in the {detail} make you feel?", "Would you prefer living in the {detail}?"],
         "fake_generic": ["How does living in the {alternative} make you feel?", "Would you prefer living in the {alternative}?"]
    },
    //# Fallback for any basic question not explicitly listed.
    "generic": {
         "correct_generic": ["How is that {detail} treating you?"],
         "fake_generic": [
             "How is that {alternative} treating you?",
             "Are you sure about {alternative}?"
         ],
         "correct": ["How is that {detail} treating you?"],
         "fake": [
             "How is that {alternative} treating you?",
             "Are you sure about {alternative}?"
         ]
    }
    // ... existing deep questions structure remains the same ...
};

const GENERIC_ALTERNATIVES = {
    "Where are you from?": ["New York", "Los Angeles", "Paris", "Tokyo"],
    "How did you find my page?": ["a friend", "an ad", "word of mouth"],
    "How old are you?": ["30", "25", "35"],
    "What is your job?": ["engineer", "artist", "teacher", "doctor"],
    "What's your favorite TV series?": ["Friends", "Breaking Bad", "The Office", "How you met your mother"],
    "What do you enjoy most about your job?": ["creativity", "challenge", "passion"],
    "Tell me about your region.": ["urban life", "rural charm", "historic sites"],
    "What are your hobbies?golf": ["mini golf", "internet golf", "large golf"],
    "What are your hobbies?": ["dogs", "gaming", "sports", "music", "cooking", 'golf']
// ... existing alternatives remain the same ...
};

function generateModel() {
    const ages = Array.from({length: 17}, (_, i) => i + 18);
    const cities = ["New York", "Los Angeles", "Miami", "Chicago", "Houston"];
    const bobbies = ["fashion", "fitness", "music", "art", "gaming"];
    const bustoms = [true, false];
    const vidcalls = [true, false];
    const snap = ["NA", "id123", "id456", "id789"];
    const custom_speed = [1, 2, 3, 5, 7];
    const vault_with_images = [true, false];
    const anal = [true, false];
    const bg_content = [true, false];

    const model = {
        age: ages[Math.floor(Math.random() * ages.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        bobbies: bobbies[Math.floor(Math.random() * bobbies.length)],
        bustoms: bustoms[Math.floor(Math.random() * bustoms.length)],
        vidcalls: vidcalls[Math.floor(Math.random() * vidcalls.length)],
        snap: snap[Math.floor(Math.random() * snap.length)],
        custom_speed: custom_speed[Math.floor(Math.random() * custom_speed.length)],
        vault_with_images: vault_with_images[Math.floor(Math.random() * vault_with_images.length)],
        anal: anal[Math.floor(Math.random() * anal.length)],
        bg_content: bg_content[Math.floor(Math.random() * bg_content.length)]
    };

    // Write to file using Node.js fs module
    const fs = require('fs');
    fs.writeFileSync('model_info.json', JSON.stringify(model, null, 2));
    return model;
}

function generateFan() {
    const names = ["Alex", "Ben", "Chris", "David", "Evan"];
    const ages = Array.from({length: 32}, (_, i) => i + 18);
    const countries = ["USA", "UK", "Canada", "Australia"];
    const regions = ["North", "South", "East", "West"];
    const jobs = ["student", "engineer", "artist", "teacher", "doctor"];
    const hobbies = ["dogs", "gaming", "sports", "music", "cooking", "golf"];
    const tv_series = ["Breaking Bad", "Game of Thrones", "The Office", "Friends"];
    const fetishes = ["feet", "roleplay", "cosplay", "lingerie"];

    const fan = {
        Name: names[Math.floor(Math.random() * names.length)],
        age: ages[Math.floor(Math.random() * ages.length)],
        country: countries[Math.floor(Math.random() * countries.length)],
        region: regions[Math.floor(Math.random() * regions.length)],
        job: jobs[Math.floor(Math.random() * jobs.length)],
        hobby: hobbies[Math.floor(Math.random() * hobbies.length)],
        tv_series: tv_series[Math.floor(Math.random() * tv_series.length)],
        fetish: fetishes[Math.floor(Math.random() * fetishes.length)],
        charisma: Math.floor(Math.random() * 5) + 3,
        hornyLevel: Math.floor(Math.random() * 5) + 3,
        sexiness: Math.floor(Math.random() * 50) + 30,
        convos: 0,
        recurringConvos: 0,
        teases: 0, 
        recurringTeases: 0,
        sexts: 0,
        recurringSexts: 0,
        cuddles: 0,
        recurringCuddles: 0,
        ppvToBuy: Math.floor(Math.random() * 5) + 3,
        maxPPVValueTierBought: 0,
        DeepForNoReason: 0.1
    };

    const fs = require('fs');
    fs.writeFileSync('fan_info.json', JSON.stringify(fan, null, 2));
    return fan;
}


console.log("CONVOS:", CONVOS);
console.log("JOBCONVOS:", JOBCONVOS);
console.log("AGECONVOS:", AGECONVOS);
console.log("HOBBICONVOS:", HOBBICONVOS);
console.log("COUNTRYCONVOS:", COUNTRYCONVOS);
console.log("TVSERIESCONVOS:", TVSERIESCONVOS);
console.log("CONVOS_SEXUAL:", CONVOS_SEXUAL);
console.log("JOBCONVOS_SEXUAL:", JOBCONVOS_SEXUAL);
console.log("AGECONVOS_SEXUAL:", AGECONVOS_SEXUAL);
console.log("HOBBICONVOS_SEXUAL:", HOBBICONVOS_SEXUAL);
console.log("COUNTRYCONVOS_SEXUAL:", COUNTRYCONVOS_SEXUAL);
console.log("TVSERIESCONVOS_SEXUAL:", TVSERIESCONVOS_SEXUAL);

// Basic conversations
window.CONVOS2 = [
    ["Hey, it's such a sunny day—hope you're soaking it all in.","Totally, I'm basking in the sunshine. How about you?"],
    // ... existing convos array content ...
];

// Age-based conversations
window.ageconvos = [
    ["Your journey at {age} years old is a remarkable adventure.","Every new experience is embraced with enthusiasm."],
    ["Your jwerwerurney at {age} years old is a remarkable adventure.","Every new experiencewerwe is embraced with enthusiasm."],

    // ... existing ageconvos array content ...
];

// Job-based conversations
window.jobconvos = [
    ["Your passion as a {job} is incredibly inspiring.","That truly resonates with me."],
    // ... existing jobconvos array content ...
];

// Hobby-based conversations
window.hobbyconvos = [
    ["Your love for {hobby} lights up your personality.","That passion brings genuine joy."],
    // ... existing hobbyconvos array content ...
];

// TV series conversations
window.tvserieconvos = [
    ["Your love for {tv_series} brings a special spark to your evenings.","That spark fills my evenings with joy."],
    // ... existing tvserieconvos array content ...
];

// Country-based conversations
window.countryconvos = [
    ["Your roots in {country} give you a rich cultural tapestry.","That heritage is a deep source of inspiration."],
    // ... existing countryconvos array content ...
];

// Sexual conversations and content
window.convos_sexual = [
    ["Mmm convos_sexual convos_sexual, it's such a hot day… hope you're soaking it all in.", "Oh, I am… and I can feel the heat rising between us."],
    // ... existing convos_sexual array content ...
];

window.sext_lines = [
    ["Slide your hand along my inner thigh and tell me how you feel", "Run your hand on my thigh - I want to feel every inch of you."],
    // ... existing sext_lines array content ...
];

window.tease_lines = [
    ["I've got a surprise that will make you melt, want a peek?", "I'm ready to melt with you."],
    ["I dressed up just for you in my naughtiest outfit, care to see?", "Show me – I love your style."],
    ["My body's charged with desire and waiting for your touch, interested?", "I can't wait to feel every spark."],
    ["I'm playing with my favorite toy just for you, do you dare watch?", "I dare – show me all your moves."],
     // ... existing tease_lines array content ...
];

window.playful_nonSexual_tease_lines = [
  
  ["If I sent you a wink emoji right now, would you blush or wink back?", "I’d wink back… while blushing, obviously."],
  
  ["Be honest, do you always text this smoothly, or am I just special?", "You’re definitely special… but I’ve got to keep my charm consistent."],
  
    // ... existing tease_lines array content ...
];

// Video captions

window.tease_img_captions = [
    ["Just dropped a new tease image – hope you enjoy every second 😘"],
    // ... existing tease_video_captions array content ...
];

window.tease_video_captions = [
    ["Just dropped a new tease video – hope you enjoy every second 😘"],
    // ... existing tease_video_captions array content ...
];
window.strip_to_undervear_video_captions = [
    ["In my lacy lingerie, ready to tease you."],
    // ... existing strip_to_undervear_video_captions array content ...
];

window.strip_naked_video_captions = [
    ["Watch me go from dressed to completely naked – just for you."],
    // ... existing strip_naked_video_captions array content ...
];

window.quick_masturbation_video_captions = [
    ["Just a quick self-love session to heat up your day."],
    // ... existing quick_masturbation_video_captions array content ...
];

window.long_masturbation_video_captions = [
    ["I'm taking my time with my favorite toy – let me show you how I play."],
    // ... existing long_masturbation_video_captions array content ...
];



window.end_script_video_captions = [
    ["Thanks for watching, babe – that was an unforgettable ride."],
    // ... existing end_script_video_captions array content ...
];

// Additional conversation types
window.cuddle_lines = [
    ["Hey sexy - I'm tapping out for tonight, got an early shift tomorrow.","That cuddle session was unforgettable - can't wait for next time."],
   ["That was insane, babe - gotta rest up. See you in my dreams.","I had an amazing cuddle tonight - thanks for making me feel so loved."],
["I'm signing off, love - work calls in the morning. Dream sweet!","Your hugs wrapped up my night perfectly - sweet dreams, love."],
["Night, babe - you left me breathless. Catch you tomorrow.","That cozy embrace was pure magic - thank you for every moment."],
["I'm out for the night, sexy - thanks for the wild ride. Good night!","I'm ending the night with a full heart - thanks for the cuddle."],
 // ... existing cuddle_lines array content ...
];


// Sexual conversation variations
window.tvserieconvos_sexual = [
    ["Mmm, the way you get lost in {tv_series}… I want you to get lost in me like that.", "Oh, I am… and I don't ever want to find my way out."],
    // ... existing tvserieconvos_sexual array content ...
];

window.countryconvos_sexual = [
    ["Mmm, I can feel the passion of {country} flowing through you.", "Let me show you just how deep that passion runs."],
    // ... existing countryconvos_sexual array content ...
];

window.hobbyconvos_sexual = [
    ["Mmm, the way you lose yourself in {hobby}… it's intoxicating.", "Then let me pull you in deeper, lose yourself in me."],
    // ... existing hobbyconvos_sexual array content ...
];

window.jobconvos_sexual = [
    ["Mmm… the way you take control like a true {job}—it's so hot.", "Then let me show you just how in control I can be."],
    // ... existing jobconvos_sexual array content ...
];

window.ageconvos_sexual = [
    ["Mmm, the way you move at {age}… so confident, so irresistible.", "Then let me show you just how confident I can be… deeper, slower, until you can't take it anymore."],
    // ... existing ageconvos_sexual array content ...
]; 

window.sext_real = [
    ["tell me what would you like to do to me right now", "Take off your top, Your ass does look very comfortable"],
  ["do you mind taking this off me rn", "what did you do after you took that off me"],
  ["while you unbuckle my bra, i want to feel your cock with my hands, give it a gently stroke and make you want me more as you gradually make your way to my panties", "As I slide down your panties kissing my way down"],
  ["I put my lips on your ripples and slid my hands down your back to your ass pulling you against me", "Your ass does look very comfortable"],
  ["oh fuck baby , im so wet for you", "Then I take my tongue to your sweet wet pussy and squeeze your ass so you can't pull away"],
  ["as you make your way down, i want you to push me to the bed spread my legs, and let your tongue deep into pussy and suck o my juices, after which i want you to take your fingers caressing my inner thigh gently and use your thumbs and tease my clits", "Tasty"],
  ["is your cock throbbing for me baby", "i want you so badly that i want to ride on your cock until you make me moan so loud"],
  ["tell me baby, what's below and what you gonna do", "Below is your sweet pussy and I'm going to spell out the alphabet on your clit with my tongue, What are you going to do"],
  ["i'd love it when i feel your tongue deep inside my pussy", "gosh baby"],
  ["while your tongue is deep into my pussy i'd take my hands grab your cock and give a little tease and then stroke it a bit", "Just a bit?"],
  ["let me crawl up to you on all fours while you lay down, I take off your pants and start licking your balls slowly going up your hard cock until I reach the tip, then I wrap my tongue around it right before I start deepthroating it, face fuck me just like this daddy \uD83E\uDD2B\uD83D\uDE08\uD83D\uDCA6\uD83D\uDCA6", "That's so hot"],
  ["baby bend me over and drill my pussy from behind until you breed me", "Joyous want my hands on your hips or your tit's and what are you doing with your hand"],
  ["my hands on your cock I'd start by sucking your big balls one at a time, slowly moving up and taking that head, so BIG!! making my cheeks spread. going deeper and deeper until I deepthroat hard on that huge cock, you like that Daddy?? \uD83E\uDD2B\uD83E\uDD2B and your deep in my kitty", "How do you want my load"],
  ["so fucking bad right now", "I'm enjoying your mouth on my cock"],
  ["When I'm in a sweet sensual mood, I would love to ride you, so you can admire my sexy body, and the way I move it, feel you slide your cock slowly inside me, as deep as you want and can, moving my hips in circles so you can feel your hard cock everywhere inside me, while you can see my face getting twisted with pleasure, while caressing my legs, massaging my amazing tits, and taking care of my clit.\uD83C\uDF4E\uD83C\uDF4E\uD83D\uDE2B\uD83D\uDD25", "babeee\uD83E\uDD2F\uD83E\uDD2F"],
  ["tell me what would you like to do to me right now", "Take off your top, Your ass does look very comfortable"]

]; 

window.sext_lines = [
    ["Slide your hand along my inner thigh and tell me how you feel", "Run your hand on my thigh - I want to feel every inch of you."],
    ["Whisper your naughtiest thought into my ear", "I'm thinking about taking you right now."],
    ["Look at me and say you want me", "I want you so damn much."],
    ["Tell me, how do you want my lips on you?", "I want my lips all over every curve of you."],
    ["Caress my hair and lean in close - do you crave my touch?", "Every touch of yours makes me melt."],
    ["Light a fire inside me with your sultry gaze", "Your eyes set me on fire."],
  
]; 


