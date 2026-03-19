const contentArea = document.getElementById('story-content');
const choicesArea = document.getElementById('choices-container');
const titleElement = document.getElementById('story-title');

let storyData = null;
let historyData = null;
let variablesData = null;

async function loadStory() {
  try {
    const response = await fetch('test.json');
    storyData = await response.json();
      
    titleElement.textContent = storyData.story_title;
    historyData = storyData.history;
    variablesData = storyData.variables;

    renderHistory(historyData);
  } catch (error) {
    console.error("Błąd ładowania historii:", error);
    contentArea.innerHTML = "<p>Nie udało się załadować historii.</p>";
  }
}

function renderHistory(historyData) {
  let last_scene;
  historyData.forEach(scene => {
    last_scene = scene;
    const node = storyData.nodes[scene];

    const p = document.createElement('p');
    p.textContent = node.text;
    contentArea.appendChild(p);
  });

  storyData.nodes[last_scene].choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.className = 'choice-btn';
    
    btn.onclick = () => renderNode(choice.next_node);
    
    choicesArea.appendChild(btn);
  });
}

function renderNode(nodeId) {
  const node = storyData.nodes[nodeId];

  choicesArea.innerHTML = '';
  
  const p = document.createElement('p');
  p.textContent = node.text;
  contentArea.appendChild(p);

  node.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.className = 'choice-btn';
    
    btn.onclick = () => renderNode(choice.next_node);
    
    choicesArea.appendChild(btn);
  });
}

// Uruchomienie na starcie
loadStory();