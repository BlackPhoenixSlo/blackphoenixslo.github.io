print("jaka")
import os

def create_folder_and_modify_files():
    # Get user inputs
    username = input("Enter username: ")
    password = input("Enter password: ")
    
    iframes = []
    files = [
        "SalesOverview",
        "SalesInput"
    ]
    for file in files:
        iframes.append(input(f"Enter iframe for {file}.html: "))
    
    # Call the main function with provided inputs
    modify_files(username, password, iframes)

def modify_files(username, password, iframes):
    # Create the folder with name usernamepassword
    folder_name = username + password
    folder_path = os.path.join("chatter",folder_name)
    #    folder_path = os.path.join("preset123", "chatter", folder_name)

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    
    # List of HTML files
    files = [
        "SalesOverview.html",
        "SalesInput.html"
    ]
    
    for index, file in enumerate(files):
        with open(os.path.join("/Users/jakabasej/Downloads/pageTM/skoll-shit-site/chatter/preset12big", file), "r") as f:
            content = f.read()
        
        # Replace the iframe and "Sensual-Speech" text
        print(f"[{file.split('.')[0]}-iframe]")
        content = content.replace(f"[{file.split('.')[0]}-iframe]", iframes[index])
        content = content.replace("Sensual-Speech", username)
        
        # Write the replaced content to the new folder
        with open(os.path.join(folder_path, file), "w") as f:
            f.write(content)
            print("jaka")

create_folder_and_modify_files()

# To run the script that asks for inputs, simply call:
# create_folder_and_modify_files()
