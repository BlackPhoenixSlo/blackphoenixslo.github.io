#datagen.py
import random
import json

# Basic predetermined questions.
BASIC_QUESTIONS = [
    "Where are you from?",
    "How did you find my page?",
    "How old are you?",
    "What is your job?",
    "What are your hobbies?",
    "What's your favorite TV series?",
    "What do you enjoy most about your job?",
    "Tell me about your region."
]


DEEP_QUESTIONS = {
    "Where are you from?": {
         "correct_generic": ["How is living in {detail} treating you?",  "Is life in {detail} really that exciting?"],
         "fake_generic": ["How is living in {alternative} treating you?",  "Is life in {alternative} really that exciting?"]
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
    # Fallback for any basic question not explicitly listed.
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
}

# Generic alternatives pool for deep questions (for topics other than hobbies).
GENERIC_ALTERNATIVES = {
    "Where are you from?": ["New York", "Los Angeles", "Paris", "Tokyo"],
    "How did you find my page?": ["a friend", "an ad", "word of mouth"],
    "How old are you?": ["30", "25", "35"],
    "What is your job?": ["engineer", "artist", "teacher", "doctor"],
    "What's your favorite TV series?": ["Friends", "Breaking Bad", "The Office", "How you met your mother"],
    "What do you enjoy most about your job?": ["creativity", "challenge", "passion"],
    "Tell me about your region.": ["urban life", "rural charm", "historic sites"],
    "What are your hobbies?golf": ["mini golf", "internet golf", "large golf"],
    "What are your hobbies?": ["dogs", "gaming", "sports", "music", "cooking", 'golf']
}



def generate_model():
    """Generate and save a model JSON with predetermined options."""
    ages = list(range(18, 35))
    cities = ["New York", "Los Angeles", "Miami", "Chicago", "Houston"]
    bobbies = ["fashion", "fitness", "music", "art", "gaming"]
    bustoms = [True, False]
    vidcalls = [True, False]
    snap = ["NA", "id123", "id456", "id789"]
    custom_speed = [1, 2, 3, 5, 7]
    vault_with_images = [True, False]
    anal = [True, False]
    bg_content = [True, False]

    model = {
        "age": random.choice(ages),
        "city": random.choice(cities),
        "bobbies": random.choice(bobbies),
        "bustoms": random.choice(bustoms),
        "vidcalls": random.choice(vidcalls),
        "snap": random.choice(snap),
        "custom_speed": random.choice(custom_speed),
        "vault_with_images": random.choice(vault_with_images),
        "anal": random.choice(anal),
        "bg_content": random.choice(bg_content)
    }
    with open("model_info.json", "w", encoding="utf-8") as f:
        json.dump(model, f, indent=2)
    return model

def generate_fan():
    """Generate and save a fan JSON with predetermined static and dynamic attributes."""
    names = ["Alex", "Ben", "Chris", "David", "Evan"]
    ages = list(range(18, 50))
    countries = ["USA", "UK", "Canada", "Australia"]
    regions = ["North", "South", "East", "West"]
    jobs = ["student", "engineer", "artist", "teacher", "doctor"]
    hobbies = ["dogs", "gaming", "sports", "music", "cooking", 'golf']
    tv_series = ["Breaking Bad", "Game of Thrones", "The Office", "Friends"]
    fetishes = ["feet", "roleplay", "cosplay", "lingerie"]

    fan = {
        "Name": random.choice(names),
        "age": random.choice(ages),
        "country": random.choice(countries),
        "region": random.choice(regions),
        "job": random.choice(jobs),
        "hobbies": random.choice(hobbies),
        "TV_series": random.choice(tv_series),
        "fetishes": random.choice(fetishes),
        "scammer": random.choice([True, False]),
        "sold": 0,
        "horny_level": 10,
        "sexiness": 100,
        "charisma": 10,
        "Teases": 0,
        "Cuddles": 0,
        "PPVtoBuy": 7,
        "Sexts": 0,
        "Convos": 0,
        "Questions": 0,
        "recurringTeases": -1,
        "recurringSexts": -1,
        "recurringConvos": -1,
        "recurringCuddles": -1,
        "recurringQuestions": -1,
        "PPVBought": 0,
        "MaxPPVValueTierBought": 0,
        "ConvoCounter": 0,
        "TurnCountOfLastPpvBought": -1,
        "images_sold": [],
        "captions_used": [],
        "DeepForNoReason" :  0.1

    }
    with open("fan_info.json", "w", encoding="utf-8") as f:
        json.dump(fan, f, indent=2)
    return fan



def load_lines(filename="gen_text_files/tease_lines.json"):
    try:
        with open(""+filename, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        # Fallback default list of tease pairs if file is not found.
        return [["1","2"]]

# Load the tease lines at module level.
TEASE_LINES = load_lines("gen_text_files/tease_lines.json")
# Load the tease lines at module level.
TEASE_LINES_REAL = load_lines("gen_text_files/tease_lines_real.json")


# Load the tease lines at module level.
SEXT_LINES_REAL = load_lines("gen_text_files/sext_lines_real.json")


# Load the tease lines at module level.
SEXT_LINES = load_lines("gen_text_files/sext_lines.json")


# Load the tease lines at module level.
CUDDLE_LINES = load_lines("gen_text_files/cuddle_lines.json")


TEASE_IMG_CAPTIONS = load_lines("gen_text_files/tease_img_captions.json")
TEASE_VID_CAPTIONS = load_lines("gen_text_files/tease_video_captions.json")
STRIP_TO_UNDERVEAR_VID_CAPTIONS = load_lines("gen_text_files/strip_to_undervear_video_captions.json")
STRIP_NAKED_CAPTIONS = load_lines("gen_text_files/strip_naked_video_captions.json")
SHORT_MASTURBATION_CAPTIONS = load_lines("gen_text_files/quick_masturbation_video_captions copy.json")
LONG_MASTURBATION_CAPTIONS = load_lines("gen_text_files/long_masturbation_video_captions.json")
END_SCRIPT_THANKS_CAPTIONS = load_lines("gen_text_files/end_script_video_captions.json")


CONVOS=load_lines("gen_text_files/convos.json")
JOBCONVOS=load_lines("gen_text_files/jobconvos.json")
AGECONVOS=load_lines("gen_text_files/ageconvos.json")
HOBBICONVOS=load_lines("gen_text_files/hobbyconvos.json")
COUNTRYCONVOS=load_lines("gen_text_files/countryconvos.json")
TVSERIESCONVOS=load_lines("gen_text_files/tvserieconvos.json")


PLAYFUL_NONSEXUAL_TEASES=load_lines("gen_text_files/playful_nonSexual_tease_lines.json")


CONVOS_SEXUAL=load_lines("gen_text_files/convos_sexual.json")
JOBCONVOS_SEXUAL=load_lines("gen_text_files/jobconvos_sexual.json")
AGECONVOS_SEXUAL=load_lines("gen_text_files/ageconvos_sexual.json")
HOBBICONVOS_SEXUAL=load_lines("gen_text_files/hobbyconvos_sexual.json")
COUNTRYCONVOS_SEXUAL=load_lines("gen_text_files/countryconvos_sexual.json")
TVSERIESCONVOS_SEXUAL=load_lines("gen_text_files/tvserieconvos_sexual.json")