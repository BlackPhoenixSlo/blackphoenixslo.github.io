// === Global Data Structures & Variables ===
const modelGuyMapping = {
    'Jaky': ['John', 'Mike', 'David', 'Chris'],
    'Beth': ['Tom', 'Sam', 'Alex'],
    'Clara': ['Kevin', 'Joe', 'Ben']
  };
  
  let guyInfos = {
    'Jaky': {
      'John': { bio: "Default bio for John." },
      'Mike': { bio: "Default bio for Mike." },
      'David': { bio: "Default bio for David." },
      'Chris': { bio: "Default bio for Chris." }
    },
    'Beth': {
      'Tom': { bio: "Default bio for Tom." },
      'Sam': { bio: "Default bio for Sam." },
      'Alex': { bio: "Default bio for Alex." }
    },
    'Clara': {
      'Kevin': { bio: "Default bio for Kevin." },
      'Joe': { bio: "Default bio for Joe." },
      'Ben': { bio: "Default bio for Ben." }
    }
  };
  
  let chatHistory = {
    'Jaky': {
      'John': [{sender: 'guy', text: 'Hi there!'}, {sender: 'girl', text: 'Hello John!'}],
      'Mike': [],
      'David': [],
      'Chris': []
    },
    'Beth': {
      'Tom': [],
      'Sam': [],
      'Alex': []
    },
    'Clara': {
      'Kevin': [],
      'Joe': [],
      'Ben': []
    }
  };
  
  let currentModel = 'Jaky';
  let currentGuy = 'John';
  let currentAttachments = [];  // Attachments to be added to the next message
  let modalSelectedPhotos = []; // Temporary selections in the modal
  
  // Global variable to store the currently selected game action option.
  let currentActionOption = "";
  
  // === DOM Elements ===
  const leftSidebar = document.getElementById('leftSidebar');
  const chatHeaderElem = document.getElementById('chatHeader');
  const chatMessages = document.getElementById('chatMessages');
  const messageInput = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendBtn');
  const modelInfoDiv = document.getElementById('modelInfo');
  const guyInfoSection = document.getElementById('guyInfoSection');
  const guyNameDisplay = document.getElementById('guyNameDisplay');
  const guyBio = document.getElementById('guyBio');
  const saveGuyInfoBtn = document.getElementById('saveGuyInfoBtn');
  const addPhotoBtn = document.getElementById('addPhotoBtn');
  const priceInput = document.getElementById('priceInput');
  const selectedAttachmentsContainer = document.getElementById('selectedAttachmentsContainer');
  
  // Modal Elements
  const photoModal = document.getElementById('photoModal');
  const closeModal = document.getElementById('closeModal');
  const cancelAttachmentsBtn = document.getElementById('cancelAttachmentsBtn');
  const addAttachmentsBtn = document.getElementById('addAttachmentsBtn');
  const availablePhotos = document.getElementById('availablePhotos');
  const actionOptionsDiv = document.getElementById('actionOptions');
  
  // Function to fetch the file list from a folder (expects a JSON file in the folder)
  async function fetchPhotosForModel(model) {
    const folder = 'photos_' + model;
    try {
      const response = await fetch(folder + '/filelist.json');
      if (response.ok) {
        const data = await response.json(); // Expects an array of filenames
        
        // Filter out purchased images
        if (ConversationGame.state.fan && ConversationGame.state.fan.imagesSold) {
          return data.filter(filename => {
            // Remove file extensions and underscores
            const cleanName = filename.replace(/\.(jpg|jpeg|png)$/i, '').replace(/_/g, ' ');
            
            // Check if cleaned name exists in purchased images
            const isPurchased = ConversationGame.state.fan.imagesSold.some(purchasedFile => {
              const cleanPurchased = purchasedFile.replace(/\.(jpg|jpeg|png)$/i, '').replace(/_/g, ' ');
              return cleanName === cleanPurchased;
            });
            
            return !isPurchased;
          });
        }
        
        return data;
      } else {
        console.error('Could not fetch file list for ' + model);
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // === Helper Functions ===
  function clearGuySelection() {
    document.querySelectorAll('.left-sidebar .guy.active').forEach(el => el.classList.remove('active'));
    currentGuy = null;
    chatHeaderElem.textContent = "Chat with [Select a Guy]";
    chatMessages.innerHTML = "";
    guyInfoSection.style.display = "none";
  }
  
  function populateGuys() {
    leftSidebar.innerHTML = "";
    const guys = modelGuyMapping[currentModel];
    guys.forEach(function(guy) {
      const guyDiv = document.createElement('div');
      guyDiv.className = 'guy';
      guyDiv.dataset.guy = guy;
      guyDiv.textContent = guy;
      guyDiv.addEventListener('click', function() {
        clearGuySelection();
        guyDiv.classList.add('active');
        currentGuy = guyDiv.dataset.guy;
        chatHeaderElem.textContent = "Chat with " + currentGuy;
        loadChatHistory();
      });
      leftSidebar.appendChild(guyDiv);
    });
  }
  
  function loadChatHistory() {
    chatMessages.innerHTML = "";
    if (currentGuy && chatHistory[currentModel] && chatHistory[currentModel][currentGuy]) {
      chatHistory[currentModel][currentGuy].forEach(msg => {
        renderMessage(msg);
      });
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }

  function renderMessage(msg) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + (msg.sender === 'girl' ? 'from-girl' : 'from-guy');
  
    // If an action option was selected, display it at the top of the message.
    if (msg.action && msg.action.trim() !== "") {
      const actionP = document.createElement('p');
      actionP.textContent = "Action: " + msg.action;
      actionP.style.fontSize = "12px";
      actionP.style.fontWeight = "bold";
      messageDiv.appendChild(actionP);
    }
  
    if (msg.text) {
      const textP = document.createElement('p');
      textP.textContent = msg.text;
      messageDiv.appendChild(textP);
    }
  
    if (msg.attachments && msg.attachments.length > 0) {
      const attachmentsContainer = document.createElement('div');
      attachmentsContainer.className = 'attachments';
      msg.attachments.forEach(att => {
        const attDiv = document.createElement('div');
        attDiv.className = 'attachment';
        attDiv.style.border = "1px solid #444";
        attDiv.style.padding = "5px";
        attDiv.style.marginTop = "5px";
        attDiv.style.display = "inline-block";
        attDiv.style.marginRight = "5px";
  
        const attImg = document.createElement('img');
        attImg.src = att.previewUrl;
        attImg.style.width = "100px";
        attImg.style.height = "auto";
        attImg.style.display = "block";
        attDiv.appendChild(attImg);
  
        attachmentsContainer.appendChild(attDiv);
      });
      messageDiv.appendChild(attachmentsContainer);
    }
  
    if (msg.price && msg.price.trim() !== "" && msg.price.trim() !== "0") {
      const priceP = document.createElement('p');
      priceP.textContent = "Price: " + msg.price + "$";
      priceP.style.fontSize = "12px";
      messageDiv.appendChild(priceP);
    }
  
    chatMessages.appendChild(messageDiv);
  }
  
  function loadGuyInfo() {
    if (currentGuy && guyInfos[currentModel] && guyInfos[currentModel][currentGuy]) {
      guyInfoSection.style.display = "block";
      guyNameDisplay.textContent = currentGuy;
      guyBio.value = guyInfos[currentModel][currentGuy].bio;
    } else {
      guyInfoSection.style.display = "none";
    }
  }
  
  function updateModelInfo(modelName) {
    modelInfoDiv.innerHTML = '<h3>Model Info</h3>' +
      '<p>Name: ' + modelName + '</p>' +
      '<p>Bio: This is the bio for ' + modelName + '.</p>';
  }
  
  function updateSelectedAttachmentsUI() {
    selectedAttachmentsContainer.innerHTML = "";
    
    if (currentAttachments.length > 0) {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'selected-thumb';
    
        const img = document.createElement('img');
        img.src = currentAttachments[0].previewUrl;
        thumbDiv.appendChild(img);
    
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-attachment';
        removeBtn.textContent = "×";
        removeBtn.addEventListener('click', function() {
            currentAttachments = [];
            updateSelectedAttachmentsUI();
            priceInput.style.display = "none";
        });
        
        thumbDiv.appendChild(removeBtn);
        selectedAttachmentsContainer.appendChild(thumbDiv);
        priceInput.style.display = "block";
    } else {
        priceInput.style.display = "none";
    }
  }
  
  // Populate the modal with available photos by reading the folder's file list.
  async function populateAvailablePhotos() {
    availablePhotos.innerHTML = "";
    modalSelectedPhotos = [];  // Reset selected photos
    const photos = await fetchPhotosForModel(currentModel);
    
    photos.forEach((filename) => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'available-photo';
        const folder = 'photos_' + currentModel;
        const imgUrl = folder + '/' + filename;
        const imgElem = document.createElement('img');
        imgElem.src = imgUrl;
        photoDiv.appendChild(imgElem);

        // Compute display name
        let displayName = filename;
        if (displayName.toLowerCase().endsWith('.jpg') || displayName.toLowerCase().endsWith('.png')) {
            displayName = displayName.slice(0, -4);
        }
        displayName = displayName.replace(/_/g, ' ');

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.textContent = displayName;
        photoDiv.appendChild(overlay);

        photoDiv.addEventListener('click', function() {
            // Remove 'selected' class from all photos
            document.querySelectorAll('.available-photo').forEach(photo => {
                photo.classList.remove('selected');
            });
            
            // Clear modalSelectedPhotos array
            modalSelectedPhotos = [];
            
            // Add selection to clicked photo
            photoDiv.classList.add('selected');
            modalSelectedPhotos.push({
                previewUrl: imgUrl,
                name: displayName
            });
        });
        
        availablePhotos.appendChild(photoDiv);
    });
  }
  
  // === Event Listeners ===
  document.addEventListener("DOMContentLoaded", function() {
    populateGuys();
  
    // Top tab click event for model selection
    const tabs = document.querySelectorAll('.top-tabs .tab');
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.top-tabs .tab.active').forEach(function(el) {
          el.classList.remove('active');
        });
        tab.classList.add('active');
        currentModel = tab.dataset.girl;
        updateModelInfo(currentModel);
        populateGuys();
        clearGuySelection();
      });
    });
  
    // Set up Action Options (Game Options) event listeners
    const actionButtons = actionOptionsDiv.querySelectorAll('.action-option');
    actionButtons.forEach(button => {
      button.addEventListener('click', function() {
        actionButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentActionOption = button.dataset.action;
      });
    });
  
    // Send button: send message with text, attachments, price and selected action.
    // sendBtn.addEventListener('click', function() {
    //   const text = messageInput.value.trim();
    //   if ((text !== "" || currentAttachments.length > 0) && currentGuy) {
    //     if (!chatHistory[currentModel][currentGuy]) {
    //       chatHistory[currentModel][currentGuy] = [];
    //     }
    //     const messageObject = {
    //       sender: 'girl',
    //       text: text,
    //       attachments: [],
    //       price: currentAttachments.length > 0 ? priceInput.value : "",
    //       action: currentActionOption || ""
    //     };
    //     currentAttachments.forEach(att => {
    //       messageObject.attachments.push({
    //         previewUrl: att.previewUrl,
    //         name: att.name
    //       });
    //     });
    //     chatHistory[currentModel][currentGuy].push(messageObject);
    //     renderMessage(messageObject);
    //     messageInput.value = "";
    //     currentAttachments = [];
    //     updateSelectedAttachmentsUI();
    //     priceInput.value = "";
    //     chatMessages.scrollTop = chatMessages.scrollHeight;
    //   }
    // });
    if (messageInput) {
      messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendBtn.click();
        }
      });
    }
  
    saveGuyInfoBtn.addEventListener('click', function() {
      if (currentGuy) {
        guyInfos[currentModel][currentGuy].bio = guyBio.value;
        alert("Guy info updated!");
      }
    });
  
    // Modal Event Listeners for Photo Selection
    addPhotoBtn.addEventListener('click', async function() {
      await populateAvailablePhotos();
      photoModal.style.display = "block";
    });
    closeModal.addEventListener('click', function() {
      photoModal.style.display = "none";
    });
    cancelAttachmentsBtn.addEventListener('click', function() {
      photoModal.style.display = "none";
    });
    addAttachmentsBtn.addEventListener('click', function() {
        // Clear existing attachments
        currentAttachments = [];
        
        // Add only the selected photo
        if (modalSelectedPhotos.length > 0) {
            currentAttachments.push(modalSelectedPhotos[0]);
        }
        
        updateSelectedAttachmentsUI();
        photoModal.style.display = "none";
    });
  });
  