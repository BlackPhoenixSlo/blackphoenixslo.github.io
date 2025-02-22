

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



// Basic conversations
// Basic conversations
window.CONVOS2 = [
    ["Hey, this breeze today feels amazing—enjoying it?", "Oh yeah, it’s perfect out here. You feeling it too?"],  
    ["The coffee I had this morning was unreal—how’s your day starting?", "Nice—mine’s kicking off with tea. How’s yours going?"],  
    ["Hey, it’s so quiet tonight—perfect for chilling, right?", "Totally, I’m loving the calm. What’s your night like?"],  
    ["This playlist I found is gold—got any tunes on repeat?", "Sweet, I’m stuck on a good beat too. What’s yours?"],  
    ["Hey, the sky’s so clear—great day for a walk, huh?", "For sure, I’m tempted to stroll. You heading out?"],  
    ["Just ate the best sandwich—what’s your food win today?", "Yum, I had a killer snack. What’s on your plate?"],  
    ["Hey, it’s getting cozy indoors—perfect weather, right?", "Yeah, I’m all about this vibe. How’s your spot?"],  
    ["The sun’s setting so pretty—catching it where you are?", "Oh, it’s gorgeous here too. You watching it fade?"],  
    ["Hey, my dog’s being extra cute—got any pet stories?", "Love that—my cat’s napping hard. What’s yours up to?"],  
    ["This book I’m reading is wild—into anything good?", "Nice, I’m hooked on a show. What’s your read?"],  
    ["Hey, the air smells so fresh today—loving it?", "Totally, it’s crisp and clean. You breathing it in?"],  
    ["Just saw the funniest meme—got any laughs to share?", "Oh, I’ve got a good one too. What’s yours?"],  
    ["Hey, it’s such a lazy day—perfect for napping, huh?", "For sure, I’m tempted to doze. You crashing too?"],  
    ["The clouds today are unreal—spotting any cool shapes?", "Yeah, I see a goofy one now. What’s in your sky?"],  
    ["Hey, I’m baking cookies—smells amazing, right?", "Yum, I can almost smell it. What kind you making?"],  
];

// Age-based conversations
window.ageconvos = [
    ["Your vibe at {age} years old is so full of life.", "At {age}, I’m soaking up every moment with joy."],  
    ["The way you shine at {age} years old—it’s inspiring.", "Being {age} keeps me glowing with every step."],  
    ["Your {age} years old energy is seriously contagious.", "At {age}, I’ve got this spark I can’t hold back."],  
    ["Living it up at {age} years old looks amazing on you.", "Thanks—{age} feels like my time to thrive."],  
    ["Your {age} years old journey—it’s such a cool ride.", "At {age}, every twist keeps me wide awake."],  
    ["The wisdom at {age} years old adds depth to you.", "Being {age} teaches me something new every day."],  
    ["Your {age} years old spirit brings so much warmth.", "At {age}, I’m all about spreading that love."],  
    ["Seeing you at {age} years old—it’s pure good vibes.", "Sweet—{age} keeps me buzzing with happiness."],  
    ["Your {age} years old confidence is totally magnetic.", "At {age}, I’m owning every bit of who I am."],  
    ["The way you roll at {age} years old—pure goals.", "Being {age} fuels my drive to chase it all."],  
    ["Your {age} years old charm lights up everything.", "At {age}, I’m embracing every chance to shine."],  
    ["Living bold at {age} years old suits you so well.", "Thanks—{age} keeps me fearless and free."],  
    ["Your {age} years old story—it’s one worth hearing.", "At {age}, I’ve got tales I love to share."],  
    ["The growth at {age} years old makes you stand out.", "Being {age} builds me up stronger every day."],  
    ["Your {age} years old outlook—it’s fresh and bright.", "At {age}, I see the world with open eyes."],  
];

// Job-based conversations
window.jobconvos = [
    ["Your drive as a {job} really lights up everything you do.", "Being a {job} fuels my fire every single day."],  
    ["The way you shine as a {job}—it’s seriously impressive.", "Thanks—being a {job} keeps me on my toes."],  
    ["Your {job} energy brings such a cool spark to you.", "Love that—my {job} role keeps me buzzing."],  
    ["Seeing you thrive as a {job} makes me wanna cheer.", "Sweet—being a {job} is my happy grind."],  
    ["Your {job} dedication—it’s got this awesome vibe.", "It’s true—my {job} life’s all about that vibe."],  
    ["The pride you take as a {job}—it’s contagious.", "Good—being a {job} pumps me up to share it."],  
    ["Your {job} skills add such a unique twist to you.", "Glad you see it—my {job} shapes who I am."],  
    ["Talking about you as a {job} is always a highlight.", "Same—being a {job} makes every chat better."],  
    ["Your {job} passion—it’s like a burst of inspiration.", "Love that—my {job} keeps the inspiration flowing."],  
    ["The way you rock as a {job}—it’s pure goals.", "Thanks—being a {job} is my dream in action."],  
    ["Your {job} hustle gives you this amazing glow.", "It does—my {job} hustle’s my shining light."],  
    ["Seeing you as a {job}—it’s a lesson in grit.", "True—being a {job} teaches me every day."],  
    ["Your {job} flair makes you stand out so bright.", "Sweet—my {job} flair’s what drives me forward."],  
    ["The heart you put in as a {job}—it’s unreal.", "It’s real—being a {job} comes from my core."],  
    ["Your {job} journey—it’s such a cool story.", "Love that—my {job} story’s still unfolding."],  
];

window.findconvos = [
    ["So I spotted you on {find}—pretty cool surprise, huh?", "Yeah, {find} threw me your way—glad it did!"],  
    ["Finding you via {find}—is this my lucky day?", "Maybe—{find} made me curious about you too."],  
    ["You popped up on {find}—caught my eye right away.", "Nice—{find} gave me a reason to smile today."],  
    ["I saw you through {find}—wanna chat and see where it goes?", "Sure—{find} started this, let’s keep it rolling."],  
    ["Your {find} vibe got my attention—tell me more!", "Good—{find} showed you off, and I’m here for it."],  
    ["Stumbled on you via {find}—happy accident?", "Totally—{find} made my day a little brighter."],  
    ["You’re my {find} gem—wanna make this fun?", "Found you on {find}—fun’s already starting!"],  
    ["Caught you on {find}—what’s your story, cutie?", "Via {find}, I saw you—story’s just beginning."],  
    ["Your {find} profile stood out—impressed yet?", "Thanks—{find} led you here, and I’m flattered."],  
    ["Found you through {find}—good vibes so far?", "Oh yeah—{find} kicked this off with a win."],  
    ["Seeing you on {find}—think we’ll hit it off?", "Spotted you on {find}—I’d bet on it!"],  
    ["You’re my {find} discovery—wanna trade secrets?", "From {find}, I found you—secrets sound tempting."],  
    ["Your {find} charm reeled me in—tell me something fun!", "Caught you on {find}—fun’s my middle name."],  
    ["Found you via {find}—are we vibing already?", "Through {find}, I saw you—vibes are strong!"],  
    ["Your {find} spark’s got me curious—what’s next?", "Via {find}, you’re here—next is more laughs!"],  
];

window.findconvos_sexual = [
    ["So you stumbled across {find}—like what you see?", "Oh yeah, {find} led me to you, and I’m already hard."],  
    ["Finding you on {find}—was that fate or just my luck?", "Call it luck—{find} showed me your sexy ass."],  
    ["I spotted you through {find}—wanna make it worth it?", "Hell yes—{find} hooked me, now I want you."],  
    ["You popped up on {find}—ready to tease me silly?", "Found you on {find}—gonna tease till you’re wet."],  
    ["Came across you via {find}—got any dirty secrets?", "Oh, {find} brought me here—secrets and all, babe."],  
    ["Seeing you on {find}—my night just got hotter.", "Good—{find} gave me you, and I’m throbbing now."],  
    ["You’re my {find} treasure—wanna play with me?", "Found you on {find}—let’s play till we’re moaning."],  
    ["Caught you on {find}—how’s this gonna get naughty?", "Via {find}, I saw you—naughty’s my next move."],  
    ["You showed up on {find}—wanna strip for me?", "Oh, {find} delivered you—I’m peeling off slow."],  
    ["Found you through {find}—is your body as wild as I think?", "Thanks to {find}, I’m here—wild and ready for you."],  
    ["Your {find} profile got me hooked—wanna fuck?", "Spotted you on {find}—fucking’s on my mind too."],  
    ["I saw you on {find}—wanna make me beg for it?", "Through {find}, I found you—I’ll beg if you tease."],  
    ["You’re my {find} fantasy—how do we heat this up?", "From {find}, I saw you—let’s heat it till we burst."],  
    ["Finding you on {find}—wanna feel me inside?", "Oh, {find} brought me here—I’m dying to fill you."],  
    ["Your {find} vibe’s got me horny—wanna play now?", "Caught you on {find}—playing’s my next step, sexy."],  
];
// Hobby-based conversations
window.hobbyconvos = [
    ["Your {hobby} skills really shine through when you talk about it.", "My {hobby} passion just can’t stay bottled up."],  
    ["Seeing you enjoy {hobby} makes me wanna join in.", "Come on—{hobby} is way more fun with you."],  
    ["Your {hobby} dedication is honestly so inspiring.", "Thanks—{hobby} keeps my fire burning bright."],  
    ["The way you dive into {hobby} is pure energy.", "That’s {hobby}—it’s my spark every single day."],  
    ["Your {hobby} flair adds such a cool twist to you.", "Love that—{hobby} shapes me in the best ways."],  
    ["Chatting about {hobby} with you is always a blast.", "Same—{hobby} talks keep me grinning ear to ear."],  
    ["Your {hobby} vibe just pulls me in every time.", "Good—{hobby} is my magnet for good company."],  
    ["Watching you with {hobby} feels like a masterclass.", "Sweet—{hobby} is my playground and I love it."],  
    ["Your {hobby} enthusiasm lights up every room.", "It does—{hobby} pumps joy straight into my veins."],  
    ["Talking {hobby} tricks with you keeps me hooked.", "Me too—{hobby} secrets are our little bond."],  
    ["Your {hobby} love makes even tough days brighter.", "Glad—{hobby} is my go-to for lifting spirits."],  
    ["The way you own {hobby}—it’s seriously impressive.", "Thanks—{hobby} is where I feel unstoppable."],  
    ["Your {hobby} stories always get me smiling.", "Love that—{hobby} tales are my happy fuel."],  
    ["Seeing your {hobby} groove is pure good vibes.", "Right?—{hobby} keeps my rhythm flowing free."],  
    ["Your {hobby} passion ties us together so well.", "It does—{hobby} builds the best connections."],  
];

// TV series conversations
window.tvserieconvos = [
    ["Your {tv_series} obsession brings such a cool vibe to our chats.", "My {tv_series} love keeps the good vibes flowing."],  
    ["Watching {tv_series} with you makes my nights so much better.", "Same—{tv_series} turns every evening into a win."],  
    ["Your {tv_series} theories always get me hyped for the next episode.", "Glad—my {tv_series} brain’s always buzzing with ideas."],  
    ["Quoting {tv_series} with you is my favorite kind of fun.", "Mine too—{tv_series} lines are our secret code."],  
    ["Your {tv_series} binge energy is totally contagious.", "Good—{tv_series} marathons are my happy place."],  
    ["Talking {tv_series} twists with you keeps me on my toes.", "Love that—{tv_series} keeps us guessing together."],  
    ["Your {tv_series} passion makes every watch party epic.", "It’s the best—{tv_series} fuels my hosting game."],  
    ["Catching {tv_series} references from you cracks me up every time.", "Perfect—{tv_series} humor’s my go-to move."],  
    ["Your {tv_series} love adds such a chill vibe to downtime.", "Always—{tv_series} is my unwind essential."],  
    ["Debating {tv_series} characters with you is pure gold.", "Same—{tv_series} fights are the best kind."],  
    ["Your {tv_series} excitement gets me pumped for every season.", "Sweet—{tv_series} hype keeps me alive."],  
    ["Rewatching {tv_series} with you feels fresh every time.", "It does—{tv_series} never gets old with us."],  
    ["Your {tv_series} trivia skills are seriously impressive.", "Thanks—{tv_series} nerd status is my badge."],  
    ["Laughing at {tv_series} scenes with you is my happy hour.", "Mine too—{tv_series} laughs hit different together."],  
    ["Your {tv_series} devotion makes me love it even more.", "Awesome—{tv_series} bonds us in the best way."],  
];

// Country-based conversations
window.countryconvos = [
    ["Your {country} roots bring such a vibrant energy to you.", "It’s in my blood—{country} fuels my zest for life."],  
    ["The way {country} shapes you—it’s a beautiful story.", "Glad you see it—{country}’s legacy runs deep in me."],  
    ["Your {country} heritage adds such a unique flavor to you.", "It’s my core—{country} spices up everything I do."],  
    ["I love how {country}’s spirit shines through in your smile.", "That’s {country}—it’s joy woven into my soul."],  
    ["Your {country} background paints you in such bold colors.", "True—{country}’s palette inspires every step I take."],  
    ["The strength from {country} in you—it’s magnetic.", "It’s my anchor—{country} built me tough and proud."],  
    ["Your {country} roots give you this amazing warmth.", "That’s {country}—it’s all heart and home in me."],  
    ["I can feel {country}’s rhythm in the way you move.", "You caught it—{country}’s beat keeps me alive."],  
    ["Your {country} heritage—it’s like a hidden treasure.", "Glad you think so—{country}’s my buried gold."],  
    ["The pride you carry from {country}—it’s inspiring.", "It’s my backbone—{country} lifts me every day."],  
    ["Your {country} essence—it’s a blend of grace and grit.", "Spot on—{country} taught me balance and fire."],  
    ["I see {country}’s beauty reflected in your every word.", "That’s sweet—{country} shapes how I speak and feel."],  
    ["Your {country} ties give you such a worldly vibe.", "It’s my lens—{country} opens my eyes to everything."],  
    ["The traditions of {country} in you—they’re so alive.", "They are—{country} keeps my roots growing strong."],  
    ["Your {country} spirit—it’s a spark that lights you up.", "Love that—{country}’s flame keeps me glowing."],  
];

// Sexual conversations and content
// Sexual conversations and content
window.convos_sexual = [
    ["Mmm, it’s so damn hot today—makes me wanna strip down for you.", "Oh, I’m feeling it—picturing you bare is heating me up."],  
    ["This heat’s got me sweaty—wanna lick it off me slow?", "Fuck yes—I’d taste every drop and keep going lower."],  
    ["I’m fanning myself, but it’s you making me flushed—thoughts?", "I’m burning too—thinking of fucking you till we’re soaked."],  
    ["God, it’s steamy out—makes me wanna ride you all day.", "Bring it on—I’d thrust up hard till we’re dripping."],  
    ["The sun’s blazing—wanna cool off naked with me?", "Hell yeah—I’d press you wet and cold against me."],  
    ["Mmm, this heat’s unbearable—wanna peel my clothes off?", "I’d rip them off—then tease you till you’re begging."],  
    ["I’m melting today—wanna feel how hot I am inside?", "Oh, I’d slide in deep—your heat’s calling my name."],  
    ["This weather’s got me horny—wanna fuck the tension out?", "Fuck yes—I’d pound you till we’re both spent."],  
    ["It’s so warm—my skin’s begging for your tongue, babe.", "I’d lick you slow—tasting every inch of that heat."],  
    ["I’m sticky from this heat—wanna clean me up with kisses?", "Kissing you all over—I’d savor every sweaty spot."],  
    ["Mmm, it’s sweltering—wanna grind till we’re breathless?", "Let’s grind—I’d make you moan through the haze."],  
    ["The air’s thick today—wanna feel me thicker inside you?", "Oh, I do—fill me up till I can’t take it."],  
    ["This heat’s got me wild—wanna tame me with your hands?", "I’d grip you tight—fucking you till you’re mine."],  
    ["I’m overheating—wanna cool me down with your mouth?", "On it—I’d suck you slow till the heat breaks."],  
    ["Mmm, it’s scorching—wanna fuck me till we’re dripping?", "Hell yes—I’d thrust deep till we’re a sweaty mess."],  
];




window.tease_lines = [
    ["I’m dripping wet thinking of you—wanna taste the proof?", "Oh, I’m dying to savor every drop."],  
    ["I’ve got my fingers teasing myself—care to guess where?", "Tell me—I’ll imagine every naughty spot."],  
    ["My panties are barely on—should I slip them off for you?", "Slide them down—I’m watching every move."],  
    ["I’m throbbing just for you—wanna hear how loud I get?", "Fuck yes—let me hear you lose it."],  
    ["I’m in bed, naked and ready—want a private show?", "Show me—I’m already hard for it."],  
    ["My toy’s buzzing low—should I crank it up for you?", "Turn it up—I wanna see you squirm."],  
    ["I’m rubbing slow and deep—wanna see how wet I am?", "God, yes—show me how you soak."],  
    ["I’ve got my ass up high—care to picture spanking it?", "I’d spank it red—tell me more."],  
    ["My nipples are hard as fuck—wanna see me pinch them?", "Pinch away—I’m loving this tease."],  
    ["I’m stroking myself silly—should I go faster for you?", "Faster, babe—I’m right there with you."],  
    ["I’ve got something tight and wet—guess what’s waiting?", "Your pussy?—I’m ready to dive in."],  
    ["I’m spreading wide just for you—wanna peek inside?", "Fuck, yes—open up for me."],  
    ["My body’s begging for you—should I play harder?", "Play hard—I’m aching to join you."],  
    ["I’m moaning your name—wanna hear it get louder?", "Louder, baby—I’m hooked on that sound."],  
    ["I’ve got a surprise under my skirt—ready to find out?", "Lift it up—I’m dying to see."],  
];

window.playful_nonSexual_tease_lines = [
    ["Think you could beat me in a staring contest, or would you crack first?", "I’d win… but only ‘cause you’d get lost in my eyes."],  
    ["Am I the only one who makes your phone buzz this much, or nah?", "You’re the VIP buzz… everyone else can wait their turn."],  
    ["If I stole your snack right now, would you chase me or just pout?", "I’d chase you… but I’d probably trip over my own grin."],  
    ["Bet I could guess your favorite song—am I cocky or just that good?", "Go for it… but I’ll laugh when you’re adorably wrong."],  
    ["Do I get bonus points for making you smile this wide?", "Only if I get some for keeping you guessing all day."],  
    ["If I dared you to dance right now, would you bust a move or freeze?", "I’d dance… badly, just to see you crack up."],  
    ["Think you’d win at trivia night, or am I the secret weapon here?", "You’re the weapon… but I’d still outsmart you with a smirk."],  
    ["Am I your favorite distraction, or is there competition?", "You’re top tier… but I’ll never admit it that easy."],  
    ["If I texted you a pun, would you groan or fire one back?", "I’d groan… then hit you with a worse one, obviously."],  
    ["Do you practice being this cute, or is it just natural talent?", "All natural… but I could ask you the same, pro."],  
    ["Think I could make you laugh in under ten seconds?", "Try it… but I’m warning you, I’m a tough crowd."],  
    ["If I challenged you to a pillow fight, who’s winning?", "Me, hands down… but you’d look cute losing."],  
    ["Am I the reason you’re smiling at your phone right now?", "Maybe… but don’t let it go to your head too fast."],  
    ["Bet I could guess your coffee order—wanna test me?", "Go ahead… but I’ll sip smugly when you miss."],  
    ["If I sent you a goofy selfie, would you save it or tease me?", "I’d save it… then tease you about it forever."],  
];

// Video captions

window.tease_img_captions = [
    ["New tease pic just dropped – can you handle this heat? 😏"],  
    ["Snapped a sexy shot for you – like what you see? 😉"],  
    ["This tease image is all yours – enjoy the view, babe! 💋"],  
    ["Fresh pic to make you stare – I’m teasing slow! 🔥"],  
    ["Just posted a naughty glimpse – caught your eye yet? 😈"],  
    ["Here’s a flirty frame – wanna peek closer? 😘"],  
    ["New tease shot for you – I’m feeling spicy! 💖"],  
    ["Captured this to mess with you – thoughts, sexy? 😜"],  
    ["Tease pic up now – hope it leaves you thirsty! 🌹"],  
    ["Fresh image to tempt you – I’m all in this pose! 🔥"],  
    ["Dropped a hot little snap – what’s your vibe? 😏"],  
    ["This pic’s pure tease – soak it in, babe! 💦"],  
    ["New shot just for you – I’m flirting hard here! 😘"],  
    ["Tease image posted – let me rile you up! 😉"],  
    ["Snapped a steamy still – ready to blush? 💋"],  
    ["This pic’s a tease game – can you resist me? 😈"],  
    ["Fresh frame to toy with you – loving this vibe! 🌟"],  
    ["New image to heat you up – I’m posing sexy! 🔥"],  
    ["Tease shot for your eyes – caught you looking! 😜"],  
    ["Dropped a flirty pic – hope it gets you going! 💖"],  
    ["This snap’s a tease – wanna see more, huh? 😏"],  
    ["New image to play with you – I’m feeling bold! 😘"],  
    ["Just posted a hot tease – soak up every detail! 💦"],  
    ["Here’s a quick snap – teasing you silly! 😉"],  
    ["Fresh pic to flirt with you – I’m all yours! 🌹"],  
    ["Tease image dropped – watch me work this angle! 😈"],  
    ["New shot to catch your breath – like it, sexy? 🔥"],  
    ["This pic’s pure flirt fuel – enjoy the tease! 💋"],  
    ["Just uploaded a spicy snap – I’m feeling it! 😏"],  
    ["Dropped a tease pic – let’s spark something fun! 😘"],  
];

window.tease_video_captions = [
    ["New tease clip just for you – ready to get hooked? 😏"],  
    ["Dropped a little something sexy – can you handle it? 😉"],  
    ["This tease is all yours – watch me play, babe! 💋"],  
    ["Fresh video to drive you wild – enjoy the slow burn! 🔥"],  
    ["Just uploaded a tease – catch me being naughty! 😈"],  
    ["Here’s a peek to rile you up – like what you see? 😘"],  
    ["New tease vid dropped – I’m flirting hard for you! 💖"],  
    ["Shot this just to mess with you – dive in, sexy! 😜"],  
    ["Teasing you in this clip – hope it leaves you wanting! 🌹"],  
    ["Fresh tease alert – watch me turn up the heat! 🔥"],  
    ["Dropped a sexy little vid – can’t wait for your reaction! 😏"],  
    ["This tease is pure fire – get lost in it, babe! 💦"],  
    ["New clip to tempt you – I’m all yours to watch! 😘"],  
    ["Just posted a tease – let me get under your skin! 😉"],  
    ["Here’s a flirty vid for you – ready to blush? 💋"],  
    ["Tease video up now – I’m playing hard to get! 😈"],  
    ["Fresh drop to tease you silly – enjoy every bit! 🌟"],  
    ["New vid to get you hot – watch me work it! 🔥"],  
    ["This tease is for you – catch me being a flirt! 😜"],  
    ["Dropped a spicy clip – hope it drives you crazy! 💖"],  
    ["Teasing you in this one – ready for the thrill? 😏"],  
    ["New video to toy with you – dive in, sexy! 😘"],  
    ["Just uploaded a tease – I’m all about that vibe! 💦"],  
    ["Here’s a quick tease – can you keep up with me? 😉"],  
    ["Fresh clip to tempt you – I’m feeling flirty! 🌹"],  
    ["Tease vid dropped – watch me make you squirm! 😈"],  
    ["New tease for your eyes – hope it hits the spot! 🔥"],  
    ["This one’s a flirty tease – enjoy me playing coy! 💋"],  
    ["Just posted some heat – tease time starts now! 😏"],  
    ["Dropped a vid to tease you – let’s have some fun! 😘"],  
];
window.strip_to_undervear_video_captions = [
    ["Peeling off to my silk panties – wanna peek?"],  
    ["Top’s gone – just my bra to tease you now."],  
    ["Down to my boxers – sexy enough for you?"],  
    ["Skirt off, lace thong on – I’m all yours to watch."],  
    ["Shirt’s dropping – my bra’s stealing the show."],  
    ["Jeans sliding off – briefs hugging me tight."],  
    ["Dress gone – this satin set’s for your eyes."],  
    ["Jacket off – my thong’s barely covering me."],  
    ["Unzipping to my bra – wanna see more, babe?"],  
    ["Pants down – boxer briefs teasing you hard."],  
    ["Top peeled off – lace lingerie’s all that’s left."],  
    ["Shorts off – my panties are a flirty little tease."],  
    ["Sweater gone – bra and thong, just for you."],  
    ["Leggings stripped – silk briefs keeping it hot."],  
    ["Blouse off – my bra’s begging for your stare."],  
    ["Skirt dropping – boxers showing off for you."],  
    ["Hoodie’s gone – lace set hugging every curve."],  
    ["Shirt unbuttoned – panties teasing you silly."],  
    ["Jacket shed – my briefs are all you get."],  
    ["Tank top off – bra clinging tight and sexy."],  
    ["Pants unzipped – thong’s my little secret now."],  
    ["Dress slipping down – boxers keeping it spicy."],  
    ["Top’s history – satin bra driving you wild."],  
    ["Jeans off – panties barely holding me in."],  
    ["Sweatshirt gone – briefs teasing every glance."],  
    ["Skirt peeled away – lace bra’s your reward."],  
    ["Shirt’s off – boxer briefs hugging me right."],  
    ["Blouse dropping – thong’s all I’m leaving on."],  
    ["Hoodie shed – silk set screaming sexy vibes."],  
    ["All down to my lace – wanna touch this tease?"],  
];

window.strip_naked_video_captions = [
    ["Peeling off every layer – wanna see me bare for you?"],  
    ["Top’s coming off slow – ready for what’s underneath?"],  
    ["Sliding my jeans down – watch me reveal it all."],  
    ["Unbuttoning one by one – I’m stripping just for you."],  
    ["Bra’s dropping now – enjoy the view, babe."],  
    ["Skirt’s hitting the floor – I’m getting naked fast."],  
    ["Teasing my shirt off – wanna see more skin?"],  
    ["Panties slipping down – I’m all yours to watch."],  
    ["Jacket’s gone – let’s heat this up step by step."],  
    ["Unzipping slow – I’m baring it all for you."],  
    ["Topless already – shorts are next, sexy."],  
    ["Socks off, then the rest – stripping down’s my game."],  
    ["Dress sliding off – naked’s just a sec away."],  
    ["Undoing my belt – watch me get free and wild."],  
    ["Lingerie’s falling – I’m naked for your eyes only."],  
    ["Shirt’s off, pants next – I’m stripping to the core."],  
    ["Slow tease with my top – ready for me bare?"],  
    ["Leggings peeling off – I’m almost all exposed."],  
    ["Bra’s unhooked – watch me drop it all now."],  
    ["Shorts sliding down – naked’s coming up quick."],  
    ["Sweater’s gone – I’m stripping down to nothing."],  
    ["Thong’s slipping off – fully bare for you, babe."],  
    ["Unbuttoning my blouse – wanna see me naked yet?"],  
    ["Jacket’s off, then more – I’m stripping slow and hot."],  
    ["Tank top’s hitting the floor – naked’s my next move."],  
    ["Pants unzipped – I’m baring it all, sexy."],  
    ["Lace is dropping – watch me get completely nude."],  
    ["Hoodie’s off now – stripping down’s getting real."],  
    ["Skirt’s off, panties too – I’m naked just for you."],  
    ["All clothes gone – I’m bare and ready, babe."],  
];

window.quick_masturbation_video_captions = [
    ["Fast and dirty – watch me get off quick for you."],  
    ["No time to waste – I’m rubbing one out real fast."],  
    ["Quick tease with my toy – blink and you’ll miss it."],  
    ["I’m stroking hard and fast – ready for a quick thrill?"],  
    ["Short and sweet – making myself cum in a flash."],  
    ["Just a speedy vibe sesh – watch me lose it quick."],  
    ["Fast fingers, hot finish – this one’s for you."],  
    ["Quick clit play – I’m buzzing off in record time."],  
    ["Rapid rub-down – catch me cumming fast as hell."],  
    ["Toy’s on high – I’m getting there quick and loud."],  
    ["Swift and sexy – watch me hit that peak fast."],  
    ["No slowing down – I’m fingering fast for you."],  
    ["Quickie with my vibe – I’m soaked and done in a snap."],  
    ["Fast strokes, big moans – this won’t take long."],  
    ["Speedy self-love – watch me explode in a hurry."],  
    ["Racing to the finish – my toy’s working overtime."],  
    ["Quick and wild – I’m cumming hard in a flash."],  
    ["Fast tease, faster peak – ready for my quick show?"],  
    ["Short burst of heat – I’m rubbing off real quick."],  
    ["Toy’s on max – I’m done fast and dripping."],  
    ["Swift clit grind – watch me finish in a heartbeat."],  
    ["Quick and messy – I’m cumming for you now."],  
    ["Fast finger fuck – this is gonna be a blur."],  
    ["Speedy vibe play – I’m soaked in seconds flat."],  
    ["Rapid release – watch me shake it off quick."],  
    ["No time, all pleasure – I’m cumming fast as fuck."],  
    ["Quick rub, hot rush – this one’s over fast."],  
    ["Fast and furious – I’m teasing till I burst quick."],  
    ["Short and steamy – watch me hit it in a snap."],  
    ["Blink and it’s done – I’m cumming quick for you."],  
];

window.long_masturbation_video_captions = [
    ["I’m starting slow with my fingers – watch me tease myself silly."],  
    ["This toy’s buzzing just right – let me show you how deep it goes."],  
    ["Mmm, I’m stroking so soft – wanna see me build it up?"],  
    ["I’ve got all night with this vibe – feel me take it nice and slow."],  
    ["My hands are wandering everywhere – let’s drag this out together."],  
    ["This rhythm’s got me dripping – watch me play for a long, hot minute."],  
    ["I’m circling slow with my toy – can you handle how I tease?"],  
    ["Fuck, I’m edging myself silly – wanna see how long I last?"],  
    ["My fingers are slick and steady – let me stretch this pleasure out."],  
    ["This vibe’s humming low – I’m gonna make it last till I’m shaking."],  
    ["I’m rubbing so slow it hurts – watch me lose it bit by bit."],  
    ["Toy’s sliding in deep now – let’s see how far I can take it."],  
    ["Mmm, I’m rocking this pace – wanna join me for the long haul?"],  
    ["I’m teasing my clit so soft – this buildup’s gonna wreck me."],  
    ["Hands and toys in sync – I’m drawing this out till I’m moaning."],  
    ["I’m pulsing slow with this vibe – watch me ride it for ages."],  
    ["Fuck, I’m stretching every second – let me show you how I unwind."],  
    ["My toy’s buzzing deep – I’m taking my sweet time with this."],  
    ["I’m gliding so slow it’s torture – wanna see me squirm for you?"],  
    ["This session’s long and wet – watch me play till I’m a mess."],  
    ["I’m working it slow and steady – let’s make this last forever."],  
    ["Toy’s hitting all the spots – I’m dragging it out till I scream."],  
    ["Mmm, I’m lost in this rhythm – wanna see how long I can go?"],  
    ["I’m stroking soft and deep – this tease is gonna break me."],  
    ["Vibe’s on low and humming – I’m savoring every damn second."],  
    ["I’m rocking slow with my fingers – watch me build it up nice and easy."],  
    ["This toy’s got me throbbing – let’s stretch this out till I’m begging."],  
    ["I’m circling my clit so slow – wanna see me melt over time?"],  
    ["Fuck, I’m taking it easy – this long play’s gonna ruin me."],  
    ["I’m all in with this vibe – watch me tease myself senseless."],  
];



window.end_script_video_captions = [
    ["Thanks for watching, sexy – hope I left you wanting more."],  
    ["Catch you next time, babe – that was a wild tease, huh?"],  
    ["Night, love – thanks for riding this wave with me."],  
    ["Hope you enjoyed that, sweetie – I’m still buzzing."],  
    ["Thanks for sticking around, hot stuff – till next time!"],  
    ["That’s a wrap, babe – dream of me tonight, okay?"],  
    ["You made it to the end, sexy – was it good for you?"],  
    ["Thanks for the view, love – let’s make it hotter next time."],  
    ["All done, cutie – hope I got your heart racing."],  
    ["See ya soon, babe – thanks for the steamy watch."],  
    ["That’s it, sexy – you’ve got me blushing over here."],  
    ["Thanks for tuning in, sweetie – more fun coming your way."],  
    ["End of the line, love – did I leave you breathless?"],  
    ["Night, hot stuff – thanks for keeping me company."],  
    ["Wrapped up, babe – hope you’re as hooked as I am."],  
    ["Thanks for watching, sexy – let’s play again soon."],  
    ["Catch you later, love – that was a spicy little ride."],  
    ["All finished, cutie – hope I made your night."],  
    ["Thanks for the time, babe – you’re my favorite viewer."],  
    ["That’s all, sweetie – dream dirty till next time."],  
    ["End scene, sexy – thanks for the hot attention."],  
    ["Night, love – hope I left you tingling all over."],  
    ["Thanks for sticking with me, babe – more heat soon."],  
    ["Done for now, hot stuff – you keep me going."],  
    ["See you next round, sexy – thanks for the vibe."],  
    ["That’s a cut, sweetie – hope you’re craving more."],  
    ["Thanks for watching, love – let’s make it real next time."],  
    ["All over, babe – you’ve got me smiling big."],  
    ["Night, cutie – thanks for the sexy watch party."],  
    ["End credits, sexy – stay tuned for the encore."],  
];

// Additional conversation types
window.cuddle_lines = [
    ["Hey gorgeous, I’m crashing—early day tomorrow. Night!", "That cuddle was pure bliss—can’t wait to hold you again."],  
    ["Babe, I’m done for tonight—gotta rest. Sweet dreams!", "Your arms tonight were heaven—thanks for the perfect cuddle."],  
    ["Signing off, love—work’s calling early. Sleep tight!", "That hug was everything—my night’s complete because of you."],  
    ["Night, sexy—you wore me out. See you soon!", "Your cuddle wrapped me up so tight—dreaming of you already."],  
    ["I’m out, babe—long day ahead. Good night!", "That snuggle session was unreal—thanks for making me feel so safe."],  
    ["Hey love, I’m tapping out—early start tomorrow.", "Your embrace tonight was magic—can’t wait for more cuddles."],  
    ["Night, sweetie—gotta recharge. Dream of me!", "That cozy moment in your arms—perfect end to my day."],  
    ["I’m off to sleep, sexy—work’s early. Night!", "Your hug was the best part of tonight—sweet dreams, my love."],  
    ["Babe, I’m calling it—busy morning ahead. Sleep well!", "That cuddle melted me—thanks for being my comfort."],  
    ["Good night, love—exhausted from today. Catch you later!", "Your arms made tonight so warm—already missing that snuggle."],  
    ["Hey cutie, I’m out—early shift tomorrow. Night!", "That embrace was pure gold—thanks for the sweetest cuddle."],  
    ["Night, babe—need rest for tomorrow. See you in dreams!", "Your hug tonight was perfection—can’t wait to feel it again."],  
    ["I’m done for, love—work’s soon. Sweet dreams!", "That snuggle was my happy place—thanks for holding me close."],  
    ["Signing off, sexy—big day ahead. Good night!", "Your cuddle tonight was unreal—my heart’s still warm from it."],  
    ["Night, sweetie—I’m spent. Early wake-up tomorrow!", "That cozy wrap in your arms—best way to end the night."],  
];


// Sexual conversation variations
window.tvserieconvos_sexual = [
    ["Mmm, your {tv_series} obsession’s got me hot for you.", "Then let me binge you like {tv_series}—deep and all night long."],  
    ["God, the way you talk {tv_series} makes me want your mouth.", "My {tv_series} lips are gonna tease your pussy till you’re soaked."],  
    ["Your {tv_series} vibe’s got me hooked—fuck me like that.", "This {tv_series} fan’s gonna lick you slow till you’re screaming."],  
    ["I love how intense you get about {tv_series}—unleash it on me.", "My {tv_series} passion’s gonna eat you out till you’re trembling."],  
    ["Mmm, your {tv_series} energy—I need it all over my body.", "This {tv_series} heat’s gonna fuck you hard till you’re moaning."],  
    ["The way you watch {tv_series}—I’m jealous of the screen.", "Good, my {tv_series} eyes are locked on you, thrusting deep."],  
    ["Your {tv_series} binge mood’s got me aching for your touch.", "My {tv_series} hands are gonna pin you down and fill you up."],  
    ["Fuck, your {tv_series} vibe has me dripping already.", "Then this {tv_series} tongue’s gonna lap your pussy till you’re mine."],  
    ["A {tv_series} addict like you—I’m craving your next move.", "This {tv_series} junkie’s gonna fuck you till you’re shaking."],  
    ["Your {tv_series} reactions—god, I want them under me.", "My {tv_series} groans are gonna sound off while I pound you."],  
    ["Mmm, your {tv_series} hype—I need it riding me now.", "This {tv_series} buzz’s gonna make you bounce till you scream."],  
    ["Your {tv_series} fantasy talk—fuck, my lips are jealous.", "My {tv_series} mouth’s gonna suck you deep till you’re begging."],  
    ["The way you geek out over {tv_series}—fuck me with that.", "This {tv_series} nerd’s gonna slam into you till you’re wrecked."],  
    ["Your {tv_series} chill has me throbbing for you, baby.", "My {tv_series} flow’s gonna thrust slow till you’re yelling my name."],  
    ["You’re a {tv_series} dream—make me your next episode.", "This {tv_series} plot’s gonna fuck you senseless till we’re done."],  
];

window.countryconvos_sexual = [
    ["Mmm, your {country} fire’s got me burning for you.", "Then let this {country} heat fuck you till you’re melting."],  
    ["God, that {country} charm has me weak for your touch.", "My {country} hands are gonna tease your pussy till you’re soaked."],  
    ["Your {country} vibe’s driving me wild—don’t stop.", "This {country} soul’s gonna lick you slow till you’re screaming."],  
    ["I feel that {country} spice making me wet for you.", "Good, my {country} flavor’s gonna eat you out till you’re shaking."],  
    ["Mmm, your {country} boldness—I need it all over me.", "My {country} strength’s gonna fuck you hard till you moan."],  
    ["That {country} swagger when you move—so damn hot.", "This {country} strut’s gonna thrust deep, making you beg."],  
    ["Your {country} passion’s got my body aching for you.", "My {country} grip’s gonna pin you down and fill you up."],  
    ["The way you carry that {country} heat—I’m dripping.", "Then this {country} tongue’s gonna lap your pussy till you’re mine."],  
    ["A {country} lover like you—I’m craving your every move.", "This {country} heart’s gonna fuck you till you’re trembling."],  
    ["Your {country} rhythm’s got me grinding on you, baby.", "My {country} beat’s gonna pound you steady till you scream."],  
    ["Mmm, that {country} flair—I can’t get enough of it.", "This {country} flair’s gonna ride you hard till you’re moaning."],  
    ["Your {country} lips on me—fuck, it’s electric.", "My {country} mouth’s gonna suck you deep till you’re begging."],  
    ["God, your {country} energy—I want it fucking me now.", "This {country} vibe’s gonna slam into you till you’re a mess."],  
    ["That {country} groove has me throbbing for you, baby.", "My {country} flow’s gonna thrust slow till you’re yelling my name."],  
    ["You’re pure {country} magic—make me yours tonight.", "This {country} spell’s gonna fuck you senseless till we’re wrecked."],  
];
window.hobbyconvos_sexual = [
    ["Mmm, the way you get into {hobby}—it’s turning me on.", "Then let this {hobby} lover fuck you till you’re lost in it too."],  
    ["Your {hobby} focus has my hands itching to touch you.", "Good, my {hobby} hands are gonna tease your pussy till you’re wet."],  
    ["God, watching you do {hobby} makes me want you bad.", "This {hobby} pro’s gonna pin you down and lick you slow."],  
    ["Your {hobby} passion’s got me dripping for you, baby.", "Then my {hobby} energy’s gonna eat you out till you scream."],  
    ["I love how wild you get with {hobby}—unleash it on me.", "My {hobby} intensity’s gonna fuck you hard till you’re moaning."],  
    ["Mmm, your {hobby} vibe when you’re deep in it—so sexy.", "This {hobby} vibe’s gonna thrust deep, making you beg for more."],  
    ["Your {hobby} hands are so skilled—I need them on me.", "My {hobby} fingers are sliding in, working you till you shake."],  
    ["The way you move doing {hobby} has me fucking aching.", "Then this {hobby} rhythm’s gonna pound your pussy till you’re mine."],  
    ["A {hobby} master like you—I’m dying to feel your touch.", "This {hobby} expert’s gonna tongue your clit till you’re soaked."],  
    ["Your {hobby} groove’s got me grinding against you, baby.", "My {hobby} flow’s gonna fuck you steady till you can’t hold back."],  
    ["Mmm, your {hobby} style is so hot—I’m losing it.", "Then my {hobby} style’s gonna ride you hard till you’re screaming."],  
    ["Your {hobby} finesse when you work it—I’m throbbing.", "This {hobby} finesse is gonna suck you deep till you’re begging."],  
    ["God, a {hobby} addict like you—fuck me with that energy.", "My {hobby} drive’s gonna slam into you till you’re a mess."],  
    ["Your {hobby} rhythm’s got me craving you right now.", "Good, my {hobby} beat’s gonna thrust slow and deep till you moan."],  
    ["You’re so damn good at {hobby}—show me that in bed.", "This {hobby} champ’s gonna make you cum till we’re both wrecked."],  
];

window.jobconvos_sexual = [
    ["Mmm, the way you handle me like a {job}—so fucking sexy.", "Then let this {job} take charge and fuck you till you’re moaning."],  
    ["God, your {job} hands know just where to touch me.", "These {job} fingers are gonna tease your pussy till you’re soaking."],  
    ["At work you’re a {job}, but here you’re driving me wild.", "Good, this {job} is gonna pound you slow and deep tonight."],  
    ["Your {job} confidence has me wet just thinking about it.", "Then let this {job} spread you wide and lick you till you scream."],  
    ["I love how you boss me around like a {job} in bed.", "My {job} voice is gonna whisper dirty shit while I fuck you hard."],  
    ["Mmm, a {job} like you stripping down is pure fire.", "This {job} cock’s rock hard, ready to bend you over right now."],  
    ["Your {job} strength pinning me down—fuck, it’s hot.", "My {job} grip’s gonna hold you tight while I fill you up."],  
    ["The way you move like a {job} has me aching for you.", "Then this {job} tongue’s diving into your pussy till you’re dripping."],  
    ["A {job} like you knows how to turn me on so good.", "And this {job} knows how to fuck you till you’re trembling."],  
    ["Your {job} vibes are making me crave your touch, baby.", "My {job} hands are gonna grab your ass and rail you senseless."],  
    ["God, a {job} rocking those hips—I can’t get enough.", "This {job} is gonna make you ride me till you’re screaming my name."],  
    ["Your {job} lips on me—fuck, it’s driving me crazy.", "Then my {job} mouth’s gonna suck you off till you’re begging."],  
    ["A {job} talking dirty like that—I’m throbbing for you.", "Good, this {job} is gonna fuck you till you can’t talk back."],  
    ["Mmm, your {job} style has me grinding against you.", "My {job} thrust’s gonna hit deep, making you moan louder."],  
    ["You’re a {job} in charge, and I’m your willing little toy.", "This {job} is gonna play with you till we’re both a sweaty mess."],  
];

window.ageconvos_sexual = [
    ["God, at {age} you’ve got me hooked with that sexy smirk.", "Then watch me at {age} pin you down and make you moan louder than ever."],  
    ["Mmm, your {age}-year-old body feels so good pressed against me.", "Let my {age}-year-old hands explore every curve till you’re begging for more."],  
    ["At {age}, you know just how to tease me, don’t you?", "And at {age}, I know how to fuck you slow till you’re dripping for me."],  
    ["Your {age} energy’s driving me wild—keep going, baby.", "Good, my {age} stamina’s gonna pound you till you can’t think straight."],  
    ["I love how bold you are at {age}, touching me like that.", "Then feel my {age} confidence as I lick you from top to bottom."],  
    ["At {age}, you’re so damn hot when you strip for me.", "At {age}, I’m hard as hell, ready to bend you over right now."],  
    ["Your {age}-year-old ass looks perfect bouncing on me.", "My {age}-year-old cock’s gonna fill you up till you scream my name."],  
    ["Mmm, at {age} you’ve got that fire that keeps me aching.", "Then let my {age} tongue put out that fire, deep in your pussy."],  
    ["At {age}, you’re so fucking good at turning me on.", "And at {age}, I’m damn good at fucking you till you’re shaking."],  
    ["Your {age} hands on me… I can’t get enough, baby.", "My {age} grip’s gonna hold you tight while I rail you hard."],  
    ["God, at {age} you’re a tease with that sexy little dance.", "At {age}, I’ll make you sway on my cock till you’re moaning loud."],  
    ["Your {age}-year-old lips feel so good wrapped around me.", "Then my {age}-year-old thrusts are gonna fuck your mouth just right."],  
    ["At {age}, you’ve got me throbbing with that dirty talk.", "Good, my {age} dirty mind’s gonna fuck you till you’re speechless."],  
    ["Mmm, your {age} confidence is so hot when you ride me.", "My {age} strength’s gonna lift you up and slam you down harder."],  
    ["At {age}, you’re a fucking goddess—keep driving me crazy.", "At {age}, I’m your god, fucking you till we’re both wrecked."],  
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
    ["What’s running through your dirty mind about me right now, baby?", "I’d tear your dress off and kiss every inch of you, starting at your lips."]	,
["Can you unzip me slow and feel me up while you do?", "I’d slide it down, hands on your tits, then lick my way to your neck."]	,
["I’d grab your cock through your pants, teasing it till it’s rock hard.", "Fuck, I’d groan and suck your nipples while I grind against you."]	,
["I’d shove my ass against you, begging you to spank it.", "That ass is mine—I’d smack it red, then kiss it better."]	,
["I’m so wet thinking about you, baby—check for yourself.", "I’d dive between your legs, tongue lapping up every drop of you."]	,
["Push me against the wall and eat me out till I’m screaming.", "So fucking tasty—I’d suck that clit hard, fingers sliding in deep."]	,
["Your cock pulsing for me yet, daddy?", "I want you so bad, I’d grind on it till you’re dying to fuck me."]	,
["What’s waiting down there for your tongue, baby?", "Your dripping pussy—I’d lick slow circles around your clit till you beg."]	,
["Oh fuck, I’d lose it with your mouth on me like that.", "Good—I’d bury my tongue deeper till you’re soaking my chin."]	,
["I’d stroke your cock slow, then squeeze it just how you like.", "Shit, more—I’d thrust into your hand, craving your touch."]	,
["I’d crawl up, lick your shaft from base to tip, then suck you deep.", "So hot—I’d grip your head and fuck your mouth till I’m leaking."]	,
["Flip me over and pound my pussy from behind, baby.", "Hands on your hips or tits? I’d drill you till the bed shakes."]	,
["I’d slobber on your balls, then deepthroat you—good, daddy?", "Fuck yes—I’d slam into your pussy, making you feel every inch."]	,
["I need your cum so bad—where you giving it to me?", "Your throat’s perfect—I’d bust there while you gag on it."]	,
["I’d climb on top, ride you hard till I’m moaning your name.", "I’d grab your ass, thrusting up till you’re screaming for more."]	,
["Fuck me on my knees, baby, make me take it all.", "I’d spank you, then ram you deep, loving how you push back."]	,
["I’d suck your cock sloppy, drooling all over it—like that?", "Hell yeah—I’d pull your hair and fuck your face harder."]	,
["Shove me down and fuck my pussy till I’m a mess.", "I’d pin you, slamming in so deep you’d claw the sheets."]	,
["I’d tease your tip with my tongue, then swallow you whole.", "Goddamn—I’d groan and thrust, filling your throat with me."]	,
["Rail me from behind till I’m begging for your load, baby.", "Hands on your waist—I’d pound you till you’re dripping with me."]	,
["I’d lick your balls slow, then gag on your cock—how’s that?", "Perfect—I’d fuck your pussy raw, making you shake."]	,
["I want you to fill me up—where you putting it, daddy?", "Your pussy’s too good—I’d explode inside while you moan."]	,
["I’d ride you reverse, letting you watch my ass bounce.", "Fuck, I’d smack it and thrust up, hitting every spot."]	,
["Take me hard on the floor, baby, make me scream.", "I’d spread you wide, slamming in till you’re yelling my name."]	,
["I’d deepthroat you till my eyes water—ready for me?", "So ready—I’d fuck you senseless, unloading wherever you want."]	
]; 


