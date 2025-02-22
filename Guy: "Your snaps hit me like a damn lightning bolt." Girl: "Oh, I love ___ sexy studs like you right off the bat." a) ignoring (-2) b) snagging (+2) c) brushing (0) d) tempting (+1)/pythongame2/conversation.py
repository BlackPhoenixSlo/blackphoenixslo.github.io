#conversation.py
import random
import sys
from data_gen import BASIC_QUESTIONS, DEEP_QUESTIONS, GENERIC_ALTERNATIVES, TEASE_LINES , TEASE_LINES_REAL , SEXT_LINES, SEXT_LINES_REAL, CUDDLE_LINES,TEASE_IMG_CAPTIONS,TEASE_VID_CAPTIONS,STRIP_TO_UNDERVEAR_VID_CAPTIONS,STRIP_NAKED_CAPTIONS,SHORT_MASTURBATION_CAPTIONS,LONG_MASTURBATION_CAPTIONS,END_SCRIPT_THANKS_CAPTIONS,TVSERIESCONVOS,COUNTRYCONVOS,HOBBICONVOS,AGECONVOS,JOBCONVOS,CONVOS,PLAYFUL_NONSEXUAL_TEASES,TVSERIESCONVOS_SEXUAL,COUNTRYCONVOS_SEXUAL,HOBBICONVOS_SEXUAL,AGECONVOS_SEXUAL,JOBCONVOS_SEXUAL,CONVOS_SEXUAL
import os
import json

def extract_answer_detail(answer):
    """
    Extract the key detail from the fan's response using a regular expression.
    (For long-term reliability, you might want to improve this function.)
    For now, it removes common prefixes.
    """
    answer = answer.strip()
    prefixes = ["I am ", "I love ", "I like ", "I am from ", "My region is known for its vibrant culture in the ","I found you ", "I found ", "from ","I really enjoy "]
    for prefix in prefixes:
        if answer.lower().startswith(prefix.lower()):
            detail = answer[len(prefix):].rstrip(".").strip()
            return detail
    return answer.rstrip(".").strip()

def extract_answer_detail(answer, question=None):
    """
    Extract the key detail from the fan's response.
    If a question (or topic) is provided and dedicated prefixes are defined for it,
    they can be used; otherwise, default prefixes are used.
    """
    answer = answer.strip()
    prefix_map = {
        "Where are you from?": ["I am from ", "from "],
        "How did you find my page?": ["I found you "],
        "How old are you?": ["I am "],
        "What is your job?": ["I am a "],
        "What are your hobbies?": ["I like "],
        "What's your favorite TV series?": ["I love "],
        "What do you enjoy most about your job?": ["I really enjoy "],
        "Tell me about your region.": ["My region is known for its vibrant culture in the "]
    }
    prefixes = prefix_map.get(question, ["I am ", "I love ", "I like ", "I am from ", "My region is known for its vibrant culture in the ","I found you ", "I found ", "from ","I really enjoy "])
    for prefix in prefixes:
        if answer.lower().startswith(prefix.lower()):
            detail = answer[len(prefix):].rstrip(".").strip()
            return detail
    return answer.rstrip(".").strip()


def recurringTracking(fan,msgtype):
    if msgtype == "":
        print("if msgtype == '' ")
        return
    a = int(fan[f"recurring{msgtype}"])
    fan["recurringTeases"]=-1
    fan["recurringSexts"]=-1
    fan["recurringConvos"]=-1
    fan["recurringCuddles"]=-1
    fan["recurringQuestions"]=-1
    fan[f"recurring{msgtype}"] = 1 + a
    fan[f"{msgtype}"] +=  1

def get_fan_response(question, fan):
    """Return a predetermined fan response based on the basic question and fan info."""
    if question == "Where are you from?":
        return f"I am from {fan.get('country', 'unknown')}."
    elif question == "How did you find my page?":
        return "I found you online."
    elif question == "How old are you?":
        return f"I am {fan.get('age', 'unknown')}."
    elif question == "What is your job?":
        return f"I am a {fan.get('job', 'professional')}."
    elif question == "What are your hobbies?":
        return f"I like {fan.get('hobbies', 'various things')}."
    elif question == "What's your favorite TV series?":
        return f"I love {fan.get('TV_series', 'a great show')}."
    elif question == "What do you enjoy most about your job?":
        return "I really enjoy the creative aspects."
    elif question == "Tell me about your region.":
        return f"My region is known for its vibrant culture in the {fan.get('region', 'area')}."
    else:
        return "I have nothing to say."

def ask_basic_question(chat_info, fan):
    """
    Present 3 basic question options.
    Returns (selected_question, is_new) or (None, None) if cancelled.
    A question is considered new only if it is not already in chat_info["unique_questions"].
    The fan's answer is processed so that only its key detail is stored.
    """
    discovered = chat_info.get("unique_questions", [])
    unique_asked = set(discovered)
    
    options = []
    new_questions = [q for q in BASIC_QUESTIONS if q not in unique_asked]
    if new_questions:
        options.append(random.choice(new_questions))
    while len(options) < 5:
        q = random.choice(BASIC_QUESTIONS)
        if q not in options:
            options.append(q)
    
    print("\nBasic Question Options:")
    for idx, q in enumerate(options, start=1):
        print(f"{idx}. {q}")
    print("0. Cancel and go back to action selection")
    
    while True:
        choice = input("Enter your choice (1-5 or 0): ").strip()
        if choice == "0":
            print("Returning to action selection.")
            return None, None
        elif choice in ["1", "2", "3","4","5"]:
            idx = int(choice) - 1
            if idx < len(options):
                selected = options[idx]
                is_new = selected not in unique_asked
                if is_new:
                    chat_info.setdefault("unique_questions", []).append(selected)
                full_response = get_fan_response(selected, fan)
                key_detail = extract_answer_detail(full_response)
                chat_info.setdefault("answers", {})[selected] = key_detail
                msgtype="Questions"
                recurringTracking(fan,msgtype)
                if fan["Sexts"] > 4:
                    fan["charisma"] -=1
                    fan["horny_level"] -=3
                    fan["sexiness"] -=1
                    fan["DeepForNoReason"] +=0.05

                return selected, is_new
            else:
                print("Invalid selection. Try again.")
        else:
            print("Invalid input. Please enter 1, 2, 3, 4, 5 or 0.")
    


def ask_deep_question(chat_info, fan):
    """
    Present 3 deep question options based on discovered basic questions.
    Only topics with a stored answer are offered.
    Returns the chosen topic (for follow-up) or None if cancelled.
    """
    discovered = chat_info.get("unique_questions", [])
    if not discovered:
        print("No discovered topics available. Please ask a basic question first.")
        return None
    print("\nDiscovered Topics:")
    for idx, topic in enumerate(discovered, start=1):
        answer = chat_info.get("answers", {}).get(topic, "N/A")
        print(f"{idx}. {topic} (Fan answered: {answer})")
    choice = input("Select a topic number for a deep question (or 0 to cancel): ").strip()
    if choice == "0":
        print("Cancelling deep question branch; returning to main action.")
        return None
    try:
        topic_idx = int(choice) - 1
        if topic_idx < 0 or topic_idx >= len(discovered):
            print("Invalid topic number.")
            return None
    except ValueError:
        print("Invalid input.")
        return None
    return discovered[topic_idx]

def ask_followup_for_topic(topic, chat_info, fan):
    """
    For a given basic topic, offer 3 follow-up options.
    For the topic "What are your hobbies?" and if fan["hobbies"] (case-insensitive)
    equals "sports", use the special branch from DEEP_QUESTIONS for sports.
    Otherwise, use the generic deep branch.
    
    In the generic branch, the correct option is built from:
         DEEP_QUESTIONS["generic"]["correct"].format(detail=detail)
    Fake options are built by selecting alternatives from GENERIC_ALTERNATIVES[topic],
         ensuring the alternative is not equal (case-insensitive) to the discovered detail,
         then applying the fake template:
         DEEP_QUESTIONS["generic"]["fake"][i].format(alternative=chosen_alternative)
    
    The options are shuffled and presented.
    Selecting the correct option increases fan charisma by 10; a fake option decreases it by 20.
    
    Additionally, track how many times a deep follow-up for the same topic has been asked
    (stored in chat_info["deep_followups"] as a count). For each repetition beyond the first,
    apply an extra penalty of 10 per previous occurrence.
    """
    # Retrieve or generate the fan's answer for the topic.
    answer = chat_info.get("answers", {}).get(topic)
    if not answer:
        answer = get_fan_response(topic, fan)
        chat_info.setdefault("answers", {})[topic] = answer

    # Extract the key detail using your helper.
    detail = extract_answer_detail(answer, topic)
    
    # Select deep branch templates.
    print("topic: " + topic)
    if topic in DEEP_QUESTIONS :
        if topic == "What are your hobbies?":
            if  "golf" in detail:
                correct_deep = random.choice(DEEP_QUESTIONS[topic]["correct_golf"]).format(detail=detail)

                alternatives = GENERIC_ALTERNATIVES.get(f"{topic}golf", [])
                alternatives = [alt for alt in alternatives if alt.lower() != detail.lower()]
                if len(alternatives) < 2:
                    alternatives = ["OptionA", "OptionB"]
                fake_deeps = [
                    random.choice(DEEP_QUESTIONS[topic]["fake_golf"]).format(alternative=alternatives[0]),
                    random.choice(DEEP_QUESTIONS[topic]["fake_golf"]).format(alternative=alternatives[1])
                ]
            else:
                correct_deep = random.choice(DEEP_QUESTIONS[topic]["correct_generic"]).format(detail=detail)
                alternatives = GENERIC_ALTERNATIVES.get(f"{topic}", [])
                alternatives = [alt for alt in alternatives if alt.lower() != detail.lower()]
                if len(alternatives) < 2:
                    alternatives = ["OptionA", "OptionB"]
                fake_deeps = [
                    random.choice(DEEP_QUESTIONS[topic]["fake_generic"]).format(alternative=alternatives[0]),
                    random.choice(DEEP_QUESTIONS[topic]["fake_generic"]).format(alternative=alternatives[1])
                ]
        else:
            correct_deep = random.choice(DEEP_QUESTIONS[topic]["correct_generic"]).format(detail=detail)
            alternatives = GENERIC_ALTERNATIVES.get(topic, [])
            alternatives = [alt for alt in alternatives if alt.lower() != detail.lower()]
            if len(alternatives) < 2:
                alternatives = ["OptionA", "OptionB"]
            fake_deeps = [
                random.choice(DEEP_QUESTIONS[topic]["fake_generic"]).format(alternative=alternatives[0]),
                random.choice(DEEP_QUESTIONS[topic]["fake_generic"]).format(alternative=alternatives[1])
            ]
    else:
        correct_deep = random.choice(DEEP_QUESTIONS["generic"]["correct"]).format(detail=detail)
        alternatives = GENERIC_ALTERNATIVES.get(topic, [])
        alternatives = [alt for alt in alternatives if alt.lower() != detail.lower()]
        if len(alternatives) < 2:
            alternatives = ["Alternative1", "Alternative2"]
        fake_deeps = [
            random.choice(DEEP_QUESTIONS["generic"]["fake"]).format(alternative=alternatives[0]),
            random.choice(DEEP_QUESTIONS["generic"]["fake"]).format(alternative=alternatives[1])
        ]
    
    options = [correct_deep] + fake_deeps
    random.shuffle(options)
    
    print(f"\nFollow-up options for topic '{topic}':")
    for idx, opt in enumerate(options, start=1):
        print(f"{idx}. {opt}")
    print("0. Cancel follow-up and return to main action")
    
    # Retrieve (or initialize) the deep follow-up count for this topic.
    deep_followups = chat_info.setdefault("deep_followups", {})
    count = deep_followups.get(topic, 0)
    
    while True:
        choice = input("Enter your follow-up choice (0-3): ").strip()
        if choice == "0":
            print("Cancelling deep follow-up; returning to main action.")
            return
        elif choice in ["1", "2", "3"]:
            idx = int(choice) - 1
            selected = options[idx]
            if selected == correct_deep:
                fan["charisma"] += 5
                fan["horny_level"] += 5
                fan["DeepForNoReason"] -=0.2
                print("\nFan: 'That's exactly right!' [Charisma increased by 10]")
            else:
                fan["charisma"] -= 10
                fan["horny_level"] += 1
                fan["DeepForNoReason"] +=0.1


                print("\nFan: 'No, that's not correct.' [Charisma decreased by 20]")
            # Increase the deep follow-up count for this topic.
            deep_followups[topic] = count + 1
            msgtype="Questions"
            recurringTracking(fan,msgtype)
            # Apply extra penalty for repetition beyond the first.
            if count >= 1: ###### Modify this number to each circke 
                extra_penalty = 10 * count
                fan["charisma"] -= extra_penalty
                print(f"[Additional penalty of {extra_penalty} for repeated deep question]")
            return
        else:
            print("Invalid input. Please enter 0, 1, 2, or 3.")
    
    
def get_tease(fan,round_counter):
   # Randomly choose a tease pair from the TEASE_LINES list.
    if fan["MaxPPVValueTierBought"] + fan["Sexts"]< 2 :
        return random.choice(PLAYFUL_NONSEXUAL_TEASES)

    elif (round_counter < 30) :
        return random.choice(TEASE_LINES_REAL)
    else:
        return random.choice(TEASE_LINES)

def perform_tease(fan,round_counter, msg=[]):
   # Randomly choose a tease pair from the TEASE_LINES list.

    if msg ==[] :
        if fan["MaxPPVValueTierBought"] + fan["Sexts"]< 2 :
            tease_pair = random.choice(PLAYFUL_NONSEXUAL_TEASES)

        elif (round_counter < 30) :
            tease_pair = random.choice(TEASE_LINES_REAL)
        else:
            tease_pair = random.choice(TEASE_LINES)
    else:
        tease_pair = msg

        
    # Print the model's tease and then the fan's expected response on the next line.
    print(f"\nModel teases: '{tease_pair[0]}'")
    print(f"Fan replies: '{tease_pair[1]}'")
    msgtype="Teases"
    recurringTracking(fan,msgtype)

    if fan["recurringTeases"]<3 :
        fan["sexiness"] +=1
        fan["horny_level"] +=1

    else:
        fan["horny_level"] -=1
        fan["charisma"] -=2
        fan["DeepForNoReason"] +=0.05

def get_cuddle():
   
    return random.choice(CUDDLE_LINES)


def perform_cuddle(fan,msg=[]):
   
    # Randomly choose a tease pair from the TEASE_LINES list.
   
    if msg ==[] :
        tease_pair = random.choice(CUDDLE_LINES)
    else:
        tease_pair = msg

    # Print the model's tease and then the fan's expected response on the next line.
    print(f"\nModel cuddles: '{tease_pair[1]}'")
    print(f"Fan replies: '{tease_pair[0]}'")
    msgtype="Cuddles"
    recurringTracking(fan,msgtype)

    if fan["PPVtoBuy"] > 2 :
        fan["DeepForNoReason"] +=1
        fan["charisma"] +=1

        fan["horny_level"] //= 1.3
        fan["sexiness"] +=1
    elif fan["PPVtoBuy"] > 0 :
        fan["PPVtoBuy"] = 1
        fan["charisma"] +=1

        fan["horny_level"] -= 2
        fan["sexiness"] +=3
    elif   fan["PPVtoBuy"] < 2 :
        fan["charisma"] +=10
        fan["sexiness"] +=3

    
def get_sext(fan,round_counter):
    
    if (round_counter < 20) :
        return random.choice(SEXT_LINES_REAL)
    else:
        return random.choice(SEXT_LINES)


def perform_sext(fan,round_counter,msg=[]):
   
    fan["DeepForNoReason"] +=0.05
    if msg == []:
        if (round_counter < 20) :
            sext_pair = random.choice(SEXT_LINES_REAL)
        else:
            sext_pair = random.choice(SEXT_LINES)
    else:
        print(f"\nModel convo:{msg[0]}")
        print(f"\nGuy convo:{msg[1]}")
        sext_pair=msg
        
    # Print the model's tease and then the fan's expected response on the next line.
    print(f"\nModel sexts: '{sext_pair[0]}'")
    print(f"Fan replies: '{sext_pair[1]}'")
    msgtype="Sexts"

    recurringTracking(fan,msgtype)

    if fan["recurringSexts"]<4 :
        fan["horny_level"] +=1

    else:
        fan["horny_level"] -=1
        fan["charisma"] -=1
        fan["DeepForNoReason"] +=1

    if fan["Questions"]<1 and  fan["Teases"]<1 and fan["horny_level"] <25 :
        fan["sexiness"] -=2
        fan["horny_level"] -=2
        fan["DeepForNoReason"] +=0.05


    if fan["Questions"]<1 or  fan["Teases"]<1 and fan["horny_level"] <29:
        fan["sexiness"] -=1
        fan["horny_level"] -=1
        fan["DeepForNoReason"] +=0.05




def get_convo(fan, chat_info):

    if (fan['Sexts']>1) or fan['horny_level']> 29:
        if len(chat_info.get("unique_questions", [])) < 1:
            sext_pair = random.choice(CONVOS_SEXUAL)
            return [sext_pair[0],sext_pair[1]]
            
        else:
            sext_pair = random.choice(chat_info.get("unique_questions", []))
            print(sext_pair)

            if sext_pair == "Where are you from?":
                sext_pair = random.choice(COUNTRYCONVOS_SEXUAL)
                print("sadfsd")
                return [sext_pair[0].format(country = fan['country']),sext_pair[1]]
                
                
            elif sext_pair ==  "How old are you?":
                print("sadfsd")

                sext_pair = random.choice(AGECONVOS_SEXUAL)
                return [sext_pair[0].format(age = fan['age']),sext_pair[1]]

            elif sext_pair == "What is your job?":
                print("sadfsd")

                sext_pair = random.choice(JOBCONVOS_SEXUAL)
                return [sext_pair[0].format(job = fan['job']),sext_pair[1]]
                
            elif sext_pair == "What are your hobbies?":
                print("sadfsd")

                sext_pair = random.choice(HOBBICONVOS_SEXUAL)
                return [sext_pair[0].format(hobby = fan['hobbies']),sext_pair[1]]
                
            elif sext_pair == "What's your favorite TV series?":
                print("sadfsd")

                sext_pair = random.choice(TVSERIESCONVOS_SEXUAL)
                return [sext_pair[0].format(tv_series = fan['TV_series']),sext_pair[1]]
            
            else: 
                print("elseelse")

                sext_pair = random.choice(CONVOS_SEXUAL)
                return [sext_pair[0],sext_pair[1]]



    
    if len(chat_info.get("unique_questions", [])) < 1:
        sext_pair = random.choice(CONVOS)
        return [sext_pair[0],sext_pair[1]]
        
    else:
        sext_pair = random.choice(chat_info.get("unique_questions", []))
        print(sext_pair)

        if sext_pair == "Where are you from?":
            sext_pair = random.choice(COUNTRYCONVOS)
            print("sadfsd")
            return [sext_pair[0].format(country = fan['country']),sext_pair[1]]
            
            
        elif sext_pair ==  "How old are you?":
            print("sadfsd")

            sext_pair = random.choice(AGECONVOS)
            return [sext_pair[0].format(age = fan['age']),sext_pair[1]]

        elif sext_pair == "What is your job?":
            print("sadfsd")

            sext_pair = random.choice(JOBCONVOS)
            return [sext_pair[0].format(job = fan['job']),sext_pair[1]]
            
        elif sext_pair == "What are your hobbies?":
            print("sadfsd")

            sext_pair = random.choice(HOBBICONVOS)
            return [sext_pair[0].format(hobby = fan['hobbies']),sext_pair[1]]
            
        elif sext_pair == "What's your favorite TV series?":
            print("sadfsd")

            sext_pair = random.choice(TVSERIESCONVOS)
            return [sext_pair[0].format(tv_series = fan['TV_series']),sext_pair[1]]
           
        else: 
            print("elseelse")

            sext_pair = random.choice(CONVOS)
            return [sext_pair[0],sext_pair[1]]

        


def perform_convo(fan, chat_info, msg=[]):

    if msg == []:
        if len(chat_info.get("unique_questions", [])) < 1:
            sext_pair = random.choice(CONVOS)
            print(f"\nModel convo:{sext_pair[0]}")
            print(f"\nGuy convo:{sext_pair[1]}")
        else:
            sext_pair = random.choice(chat_info.get("unique_questions", []))
            print(sext_pair)

            if sext_pair == "Where are you from?":
                sext_pair = random.choice(COUNTRYCONVOS)
                print("sadfsd")
                print(f"\nModel convo:{sext_pair[0].format(country = fan['country'])}")
                print(f"\nGuy convo:{sext_pair[1]}")
                
            elif sext_pair ==  "How old are you?":
                print("sadfsd")

                sext_pair = random.choice(AGECONVOS)
                print(f"\nModel convo:{sext_pair[0].format(age = fan['age'])}")
                print(f"\nGuy convo:{sext_pair[1]}")
            elif sext_pair == "What is your job?":
                print("sadfsd")

                sext_pair = random.choice(JOBCONVOS)
                print(f"\nModel convo:{sext_pair[0].format(job = fan['job'])}")
                print(f"\nGuy convo:{sext_pair[1]}")
            elif sext_pair == "What are your hobbies?":
                print("sadfsd")

                sext_pair = random.choice(HOBBICONVOS)
                print(f"\nModel convo:{sext_pair[0].format(hobby = fan['hobbies'])}")
                print(f"\nGuy convo:{sext_pair[1]}")
            elif sext_pair == "What's your favorite TV series?":
                print("sadfsd")

                sext_pair = random.choice(TVSERIESCONVOS)
                print(f"\nModel convo:{sext_pair[0].format(tv_series = fan['TV_series'])}")
                print(f"\nGuy convo:{sext_pair[1]}")    
            else: 
                print("elseelse")

                sext_pair = random.choice(CONVOS)
                
                print(f"\nModel convo:{sext_pair[0]}")
                print(f"\nGuy convo:{sext_pair[1]}")
    else:
        print(f"\nModel convo:{msg[0]}")
        print(f"\nGuy convo:{msg[1]}")

    if fan["recurringConvos"]<4 :
        fan["charisma"] +=1
    else:
        fan["horny_level"] -=1
        fan["sexiness"] -=1
        fan["DeepForNoReason"] +=0.05



    msgtype="Convos"

    recurringTracking(fan,msgtype)




def perform_sell_content(fan, chat_info):
    fan["PPVtoBuy"] -= 0.5
    fan["DeepForNoReason"] +=0.05


    if fan.get("charisma", 0) < 20:
# print("\nModel: My charisma isn't high enough to sell content right now. (chat more with her)")
# return False
        fan["DeepForNoReason"] +=0.5
     
    # Load all image names from the JSON file
    image_folder = "photos_Jaky"
    filelist_path = os.path.join(image_folder, "filelist.json")
    try:
        with open(filelist_path, 'r', encoding="utf-8") as f:
            all_images = json.load(f)
    except Exception as e:
        print(f"Error reading {filelist_path}: {e}")
        return False

    # Get the list of images already sold by this fan
    sold_images = fan.get("images_sold", [])
    
    # Filter available images (only those not sold yet)
    available_images = [img for img in all_images if img not in sold_images]
    
    if not available_images:
        print("No images available for sale (all images have been sold).")
        return False

    selected_image = ""
    while True:
        
        
        # Print the available images with numbers in front
        print("Available images:")
        for idx, image in enumerate(available_images, start=1):
            print(f"{idx}. {image}")

        # Ask the user to select an image by entering the number
        choice = input("Enter the number of the image you want to sell, (0 to cancel): ").strip()
        if choice == "0":
            print("Cancelling sale; returning to main action.")
            return None
        try:
            choice_index = int(choice) - 1
            if choice_index < 0 or choice_index >= len(available_images):
                print("Invalid selection. Try Again.")
            else:
                selected_image = available_images[choice_index]
                print(f"Selected image: {selected_image}")
                break        
        except ValueError:
            print("Invalid selection. Cancelling sale.")
          

        


    
    # Pick one random caption from each caption list
    option1 = random.choice(TEASE_IMG_CAPTIONS)
    option2 = random.choice(TEASE_VID_CAPTIONS)
    option3 = random.choice(STRIP_TO_UNDERVEAR_VID_CAPTIONS)
    option4 = random.choice(STRIP_NAKED_CAPTIONS)
    option5 = random.choice(SHORT_MASTURBATION_CAPTIONS)
    option6 = random.choice(LONG_MASTURBATION_CAPTIONS)
    option7 = random.choice(END_SCRIPT_THANKS_CAPTIONS)

    caption_choice_index = -1
    while True:
        print("\nCaption Options:")
        print(f"1. {option1}")
        print(f"2. {option2}")
        print(f"3. {option3}")
        print(f"4. {option4}")
        print(f"5. {option5}")
        print(f"6. {option6}")
        print(f"7. {option7}")


        caption_choice = input("Enter the number of the caption you want to use (1-7), (0 to cancel): ").strip()
        if caption_choice == "0":
            print("Cancelling sale; returning to main action.")
            return None
        try:
            caption_choice_index = int(caption_choice)
            if caption_choice_index < 1 or caption_choice_index > 7:
                print("Invalid caption selection. Try Again.")
            else:
                break
                
        except ValueError:
            print("Invalid input for caption selection. Try Again.")

    # Determine the selected caption based on the user's choice
    can_Simp_buy = False
    MaxPPVBuy = fan["PPVtoBuy"]
    MaxPriceToBuy = fan["horny_level"]
    comment = ""
    comment3 =""
    MaxPPVValueTierBought = fan["MaxPPVValueTierBought"]
    if caption_choice_index == 1:
        selected_caption = option1
        # MaxPPVBuy -= fan["Sexts"]
        
        fan["DeepForNoReason"] +=fan["Sexts"] / 6

        MaxPriceToBuy /=3
        if len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", []))*2 > 3 or len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", []))*2 > 2 and fan["Teases"] > 0 :
            can_Simp_buy = True
        else:
            comment = "I would like some more teases or questions first."

        if MaxPPVValueTierBought > caption_choice_index:
            can_Simp_buy = False
            comment = "I already bought better content from you today."



    elif caption_choice_index == 2:
        selected_caption = option2
        fan["DeepForNoReason"] +=fan["Sexts"] / 11
        # MaxPPVBuy -= fan["Sexts"]

        MaxPriceToBuy /=2

        if len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", []))*2 > 3 or len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", []))*2 > 2 and fan["Teases"]>0 :
            can_Simp_buy = True
        else:
            comment = "I would like some more teases or questions first."

        if MaxPPVValueTierBought > caption_choice_index:
            can_Simp_buy = False
            comment = "I already bought better content from you today."


    elif caption_choice_index == 3:
        selected_caption = option3
        if len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 2 or len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 1 and fan["Teases"] + fan["Sexts"] > 0 :
            can_Simp_buy = True
        else:
            comment = "I would like some more teases or sexting first."

        if MaxPPVValueTierBought > caption_choice_index:
            can_Simp_buy = False
            comment = "I already bought better content from you today."


    elif caption_choice_index == 4:
        selected_caption = option4
        if len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 2 or len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 1 and  fan["Sexts"] > 0 :
            can_Simp_buy = True
        else:
            comment = "I would like some more teases or sexting first."

        if MaxPPVValueTierBought > caption_choice_index:
            can_Simp_buy = False
            comment = "I already bought better content from you today."
        
        if  fan["PPVBought"] == 0:
            comment3 = "You cute, but are you selling your ass on the first mesage?? wooow <3"
            fan["sexiness"] -=5 


    elif caption_choice_index == 5:
        if len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 2 or len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 1 and  fan["Sexts"] > 2 :
            can_Simp_buy = True
        else:
            comment = "I would like some more teases or sexting first."

        if MaxPPVValueTierBought > caption_choice_index:
            can_Simp_buy = False
            comment = "I already bought better content from you today."
        if  fan["PPVBought"] == 0:
            comment3 = "You cute, but are you masterbation your ass on the first mesage?? wooow <3"
            fan["sexiness"] -=10
        if  fan["PPVBought"] == 1:
            comment3 = "You cute, but are you masterbation so soon? wooow <3"
            fan["sexiness"] -=5

        selected_caption = option5
    elif caption_choice_index == 6:
        if len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 2 or len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 1 and  fan["Sexts"] > 4 :
            can_Simp_buy = True
        else:
            comment = "I would like some more teases or sexting first."

        if MaxPPVValueTierBought > caption_choice_index:
            can_Simp_buy = False
            comment = "I already bought better content from you today."
        if  fan["PPVBought"] == 0:
            comment3 = "You cute, but are you masterbation your ass on the first mesage?? wooow <3"
            fan["sexiness"] -=20
        
        if  fan["PPVBought"] == 1:
            comment3 = "You cute, but are you masterbation so soon? wooow <3"
            fan["sexiness"] -=10
        if  fan["PPVBought"] == 1:
            comment3 = "You cute, but are you masterbation so soon? wooow <3"
            fan["sexiness"] -=5

        selected_caption = option6
    elif caption_choice_index == 7:
        MaxPriceToBuy /=2.5

        if MaxPPVBuy > 1 :
            MaxPPVBuy = 1
        comment3 = "You cute, thanks for the experience, Yee you tomorrow"

        if len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 2 or len(chat_info.get("unique_questions", [])) + len(chat_info.get("deep_followups", [])) > 1 and  fan["Sexts"] > 0  and fan["PPVBought"] > 0:
            can_Simp_buy = True
        else:
            comment = "I would like to buy something else first."

        if MaxPPVValueTierBought > caption_choice_index:
            can_Simp_buy = False
            comment = "I already bought better content from you today."

        selected_caption = option7

    selected_caption = selected_caption[0]
    print(f"Selected caption: {selected_caption}")
    # ---------------------------------

    
   
    
    
    
    

    while True:
        # Ask for the price of the content
        price_str = input("Set a price for the content (in $), 0 to cancel: ").strip()
        if price_str == "0":
            print("Cancelling sale; returning to main action.")
            return None
        try:
            price = float(price_str)
            break
        except ValueError:
            print("Invalid price. Try again.")
            
    if fan["PPVBought"] > MaxPPVBuy+6:
        print("\nSimp: I bought Enough for today.")
        return False

    comment2 = ""
    numbersincelastbought = fan["ConvoCounter"] - fan["TurnCountOfLastPpvBought"]
    if numbersincelastbought < 3 :
        print(f"There is {(1 - numbersincelastbought /3) *100}% chance guy will skip this sale, cause you sold PPVs so close together  ")
        skip_sale = random.uniform(0, 100) < (1 - numbersincelastbought /3) *100
        if skip_sale:
            
            return None
    # Check if the fan agrees to the price based on their 'horny_level'
    if price < MaxPriceToBuy and price < fan["sexiness"] and can_Simp_buy:
        print(f"\nFan: That price works for me—I buy it for ${price}!")
        # Append the sold image to the fan's "images sold" list
        fan.setdefault("images_sold", []).append(selected_image)
        print(f"Sale recorded. {selected_image} added to fan's sold images.")
        fan["sold"] += price
        fan["MaxPPVValueTierBought"] = caption_choice_index
        # Optionally record the selected caption too
        fan.setdefault("captions used", []).append(selected_caption)

        ## increase horny levels if they sell teasing/strip content
        if caption_choice_index < 3:
            fan["horny_level"] += 1
        if caption_choice_index < 4:
            fan["horny_level"] += 2
        if caption_choice_index < 4:
            fan["horny_level"] += 2
        

        valueTieOfSoldContent = int(selected_image[0])

        if valueTieOfSoldContent < caption_choice_index :
            comment2 = "I feel scammed you sold me worse than you said you will."
            fan["horny_level"] /=2
            fan["sexiness"] /=2
            fan["charisma"] /=2

        if valueTieOfSoldContent > caption_choice_index :
            comment2 = "OO thanks that is more that what I was told I am going to buy"
            fan["horny_level"] -=5
            fan["sexiness"] +=2
            fan["charisma"] +=2
            fan["MaxPPVValueTierBought"] = valueTieOfSoldContent

        if valueTieOfSoldContent == caption_choice_index and caption_choice_index ==7:
            comment2 = "OO thanks for suchh great ending"
            fan["horny_level"] /=3
            fan["horny_level"] -= 10

            fan["sexiness"] *=2
            fan["charisma"] *=2
            fan["MaxPPVValueTierBought"] = valueTieOfSoldContent


        allSoldImages = fan.get("images_sold", [])

        Acount= 0
        Bcount= 0
        for image in allSoldImages:
            if image[1] == "A":
                Acount += 1
            if image[1] == "B":
                Bcount += 1

        
        if Acount > 0 and  Bcount > 0:
            comment2 = "I feel scammed you sold me 2 different scenarios, You are not real. You must be selling prerecorded :/"
            fan["horny_level"] /=2
            fan["sexiness"] /=2
            fan["charisma"] /=2

            

        fan["TurnCountOfLastPpvBought"] = fan["ConvoCounter"]



        fan["PPVtoBuy"] -= 0.5
        print(comment2)
        print(comment3)
        fan["PPVBought"] += 1
        return True
    else:
        print("\nFan: That's too expensive or I'm not ready to buy.")
        print(comment)
        print(comment3)
        fan["DeepForNoReason"] +=0.2
        return False

def truncate_text(text, length=80):
    """Truncate text if it's longer than 'length' characters and add '...' at the end."""
    return text if len(text) <= length else text[:length] + "..."

def conversation_round(model, fan, chat_info, round_counter):

    while True:

        msg = get_convo(fan,chat_info)
        sext_msg = get_sext(fan,round_counter)
        tease_msg = get_tease(fan,round_counter)
        cuddle_msg = get_cuddle()


        print("\nModel, choose an action:")
        print(f"1. Convo - {truncate_text(msg[0])}")
        print(f"2. Tease - {truncate_text(tease_msg[0])}")
        print("3. Ask a question")
        print(f"4. Sext - {truncate_text(sext_msg[0])}")  
        print("5. Sell content")
        print(f"6. Cuddle - {truncate_text(cuddle_msg[0])}")



        
        action = input("Enter your choice (1-6) ('exit' to end the convo):  ").strip()
        if action == "3":
            if fan["recurringQuestions"]<4 :
                fan["horny_level"] +=1
                fan["charisma"] +=1
            else:
                fan["horny_level"] -=1
                fan["charisma"] -=1
                fan["DeepForNoReason"] +=0.1

                

            if not chat_info.get("unique_questions"):
                branch = "b"
            elif  len(chat_info.get("unique_questions"))>6:
                branch = "d"
            else:
                branch = input("\nEnter B for Basic question or D for Deep follow-up: ").strip().lower()
                if branch not in ["b", "d","B","D"]:
                    print("Invalid input. Defaulting to Basic question.")
                    branch = "b"
            if branch == "b" or branch == "B":
                q, is_new = ask_basic_question(chat_info, fan)
                if q is None:
                    continue
                response = chat_info.get("answers", {}).get(q)
                print(f"\nModel asks: {q}")
                print(f"Fan replies: {response}")
                if is_new:
                    fan["charisma"] += 2
                    print("[Charisma increased by 5 for new question]")
                else:
                    fan["charisma"] -= 2
                    fan["DeepForNoReason"] +=0.2

                    print("[Charisma decreased by 10 for repeated question]")
                break
            elif branch == "d":
                topic = ask_deep_question(chat_info, fan)
                if topic is None:
                    continue
                ask_followup_for_topic(topic, chat_info, fan)
                break
        elif action == "2":
            perform_tease(fan,round_counter,tease_msg)
            break
        elif action == "6":
            perform_cuddle(fan,cuddle_msg)
            break
        elif action == "5":
            q = perform_sell_content(fan,chat_info)
            if q is None:
                continue
            break

        
               
        elif action == "4":
            perform_sext(fan,round_counter,sext_msg)
            break
        elif action == "1":
            perform_convo(fan,chat_info,msg)
            break
        elif action == "exit":
            return "exit"
        else:
            print("Invalid action. Please try again.")
    
    fan["horny_level"] += 0

    deepForNoReason = fan["DeepForNoReason"] 
    deepForNoReasonBool = random.uniform(0, 100) < deepForNoReason*10
    if deepForNoReasonBool:
        print(f"\nFan dipped for no reason: was on {deepForNoReason*10}%")
        if fan["horny_level"] > 50  and fan["charisma"] > 50  and fan["sexiness"] > 50 : 
            sum = fan["horny_level"]+fan["charisma"]+fan["sexiness"]
            print(f"GG well please  fan[horny_level,charisma,sexiness] > 50, fan will come again tmr you will earn extra {sum}  ")
            
            print(f"earned:  {sum}  $ ")
            #fan[]
        return "exit"


    if fan['charisma'] <= 0 or fan['sexiness'] <= 0:
        print("\nFan: My interest has dropped to 0 or lower. Ending chat.")
        return False
        sys.exit(0)

def should_continue():
    cont = input("\nPress Enter to continue or type 'exit' to quit: ").strip().lower()
    return cont != "exit"
