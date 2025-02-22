import json
import signal
import sys
from conversation import conversation_round, should_continue
from data_gen import generate_model, generate_fan


def load_json(filename, default):
    """Loads JSON data from a file, returns default if file is missing."""
    try:
        with open(filename, "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return default

def save_json(filename, data):
    """Saves JSON data to a file."""
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def handle_exit(signum, frame):
    """Handles forced exits like Ctrl+C and saves data before quitting."""
    print("\n\n[!] Detected interruption! Saving progress before exiting...")
    save_json("fan_info.json", fan)
    save_json("chat_discovered_fan_info.json", chat_info)
    save_json("model_info.json", model)
    print("[✔] Progress saved. Exiting safely.")
    sys.exit(0)


# Attach the signal handler to handle Ctrl+C (SIGINT)
signal.signal(signal.SIGINT, handle_exit)


def main():
    print("Welcome to the OnlyFans Content Selling Game (Text-Based Prototype)!")
    print("\nFan: Hey babe.")

    
    # Load or generate static data.
    global model, fan, chat_info  # Make them global for safe exit handling
    model = generate_model()
    
    # Load discovered chat info (tracks unique basic questions and their answers).
    chat_info = load_json("chat_discovered_fan_info.json", {"unique_questions": [], "answers": {}})
    
    try:
        fan = load_json("fan_info.json", {})
        if fan.get("charisma", 0) <= 0 or fan.get("sexiness", 0) <= 0:
            raise ValueError("Fan data is invalid. Resetting.")
    except (ValueError, KeyError):
        fan = generate_fan()
        fan.update({
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

        })
        chat_info = {}

    round_counter = 0
    try:
        while True:
            round_counter += 1
            print(f"\n=== Round {round_counter} ===")
            
            if fan["charisma"] <= 0 or fan["sexiness"] <= 0:
                print("\nChat ended because charisma or sexiness dropped to 0 or lower.")
                break
            
            end_conv = conversation_round(model, fan, chat_info, round_counter)
            fan["ConvoCounter"] = round_counter

            if fan["MaxPPVValueTierBought"] == 7:
                print("GG well played! Max PPV tier bought.")
                break
            
            if fan["PPVtoBuy"] < 1:
                print("GG well played! No more PPVs to buy.")
                break

            if fan["Cuddles"] > 2:
                print("GG well played! Too many cuddles.")
                if fan["horny_level"] > 50 and fan["charisma"] > 50 and fan["sexiness"] > 50:
                    earnings = fan["horny_level"] + fan["charisma"] + fan["sexiness"]
                    print(f"Fan will return tomorrow! You earned an extra ${earnings}.")
                break

            print(f"\n[Dynamic Stats] Horny Level: {fan['horny_level']}, Sexiness: {fan['sexiness']}, Charisma: {fan['charisma']}, DeepForNoReason: {fan['DeepForNoReason']/10}% , Sold: {fan['sold']}, MaxPPVs he can buy: {fan['PPVtoBuy']}, MaxValuePPVsold:  {fan['MaxPPVValueTierBought']}, PPVs sold: {fan["images_sold"]}")
        
            # if not should_continue():
            #     break
            if end_conv == "exit":
                break
        
        if fan["horny_level"] > 19  and fan["charisma"] > 50  and fan["sexiness"] > 50 : 
            sum = fan["horny_level"]+fan["charisma"]+fan["sexiness"]
            print(f"GG well please  fan[horny_level,charisma,sexiness] > 50, fan will come again tmr you will earn extra {sum}  ")
            
            print(f"earned:  {sum}  $ ")
            fan['sold'] += sum
            #fan[]

    except Exception as e:
        print(f"\n[!] An unexpected error occurred: {e}")
        print("[!] Saving progress before exiting...")
    
    finally:
        # Ensuring the data is saved whether it exits normally or crashes
        save_json("chat_discovered_fan_info.json", chat_info)
        save_json("fan_info.json", fan)
        save_json("model_info.json", model)
        print("\n[✔] Progress saved successfully.")

    print("\nGame Over.")
    print("\nFinal Fan Info:")
    print(json.dumps(fan, indent=2))
    print("\nFinal Model Info:")
    print(json.dumps(model, indent=2))
    print("\nFinal Chat Discovered Fan Info:")
    print(json.dumps(chat_info, indent=2))


if __name__ == "__main__":
    main()
