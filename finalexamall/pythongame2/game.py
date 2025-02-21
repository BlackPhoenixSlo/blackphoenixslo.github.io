#game.py
import json
from conversation import conversation_round, should_continue
from data_gen import generate_model, generate_fan


def load_json(filename, default):
    try:
        with open(filename, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        return default

def save_json(filename, data):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

def newFan():
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
        "DeepForNoReason" :  0

    })
    chat_info = {}
    return fan , chat_info
def main():
    print("Welcome to the OnlyFans Content Selling Game (Text-Based Prototype)!")
    print("\nFan: Hey babe.")
    
    # Load or generate static data.
    model = generate_model()
    
    # Load discovered chat info (tracks unique basic questions and their answers).
    chat_info = load_json("chat_discovered_fan_info.json", {"unique_questions": [], "answers": {}})
    
    try:
        fan = load_json("fan_info.json", {"unique_questions": [], "answers": {}})
        if fan["charisma"]<= 0 or fan["sexiness"] <= 0:
            
            fan["horny_level"]=  10
            fan["sexiness"]=  50
            fan["charisma"]=  10
            fan["images_sold"] = []
            fan["captions used"] = []
            fan["Teases"]=  0
            fan["Cuddles"]=  0
            fan["PPVtoBuy"]=  7
            fan["Sexts"]=  0
            fan["Convos"]=  0
            fan["Questions"]=  0
            fan["DeepForNoReason"]=  0.1


            fan["TurnCountOfLastPpvBought"]=  -1
            fan["recurringTeases"]=-1
            fan["recurringSexts"]=-1
            fan["recurringConvos"]=-1
            fan["recurringCuddles"]=-1
            fan["recurringQuestions"]=-1
            fan["PPVBought"]=0
            fan["MaxPPVValueTierBought"]=0
            fan["ConvoCounter"]=0



            

            chat_info = {}
    # Initialize dynamic fan stats.
    except:
        fan = generate_fan()
    
        fan["horny_level"]=  10
        fan["sexiness"]=  100
        fan["charisma"]=  10
        fan["Teases"]=  0
        fan["Cuddles"]=  0
        fan["PPVtoBuy"]=  7
        fan["Sexts"]=  0
        fan["Convos"]=  0
        fan["Questions"]=  0
        fan["recurringTeases"]=-1
        fan["recurringSexts"]=-1
        fan["recurringConvos"]=-1
        fan["recurringCuddles"]=-1
        fan["recurringQuestions"]=-1
        fan["PPVBought"]=0
        fan["MaxPPVValueTierBought"]=0
        fan["ConvoCounter"]=0
        fan["DeepForNoReason"]=  0.1





        fan["TurnCountOfLastPpvBought"]=  -1

        fan["images_sold"] = []
        fan["captions used"] = []
        chat_info = {}

    ##how to generate it 
    fan,chat_info = newFan()

    
    round_counter = 0
    while True:
        round_counter += 1

        print(f"\n[Dynamic Stats] Horny Level: {fan['horny_level']}, Sexiness: {fan['sexiness']}, Charisma: {fan['charisma']}, DeepForNoReason: {fan['DeepForNoReason']/10*100}% , Sold: {fan['sold']}, MaxPPVs he can buy: {fan['PPVtoBuy']}, MaxValuePPVsold:  {fan['MaxPPVValueTierBought']}, PPVs sold: {fan["images_sold"]}")

        print(f"\n=== Round {round_counter} ===")
        if fan["charisma"] <= 0 or fan["sexiness"] <= 0:
            print("\nChat ended because charisma or sexiness dropped to 0 or lower.")
            break
        
        
        end_conv = conversation_round(model, fan, chat_info, round_counter)
        fan["horny_level"] += 0
        fan["ConvoCounter"]=round_counter

        if fan["MaxPPVValueTierBought"] == 7:
            print("GG wel please  fan[MaxPPVValueTierBought] == 7: ")
            fan['DeepForNoReason'] = 4
            
    
        if fan["PPVtoBuy"] < 1:
            print("GG wel please  fan[PPVtoBuy] < 1: == 0 ")
            
            fan['DeepForNoReason'] = 4
            

        if fan["Cuddles"] > 2:
            print("GG well please  fan[Cuddles] > 2: ")
            fan['DeepForNoReason'] = 4
            

            


            

        
        if end_conv == "exit":
            break

    if fan["horny_level"] > 19  and fan["charisma"] > 50  and fan["sexiness"] > 50 : 
        sum = fan["horny_level"]+fan["charisma"]+fan["sexiness"]
        print(f"GG well please  fan[horny_level,charisma,sexiness] > 50, fan will come again tmr you will earn extra {sum}  ")
        
        print(f"earned:  {sum}  $ ")
        fan['sold'] += sum
        #fan[]

    save_json("chat_discovered_fan_info.json", chat_info)
    print("\nGame Over.")
    print("\nSold:")

    print(fan['sold'])

    print("\nFinal Chat Discovered Fan Info:")
    print(json.dumps(chat_info, indent=2))
    

    print("\nFinal Fan Info:")
    print(json.dumps(fan, indent=2))
    print("\nFinal Model Info:")
    with open("fan_info.json", "w", encoding="utf-8") as f:
        json.dump(fan, f, indent=2)
    print(json.dumps(model, indent=2))
    with open("model_info.json", "w", encoding="utf-8") as f:
        json.dump(model, f, indent=2)

if __name__ == "__main__":
    main()
