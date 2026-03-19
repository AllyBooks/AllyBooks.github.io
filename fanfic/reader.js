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

    const savedHistory = localStorage.getItem('lorely_history');

    if (savedHistory) {
      historyData = JSON.parse(savedHistory);
    } else {
      historyData = storyData.history;
    }
    variablesData = storyData.variables;

    renderHistory(historyData);
  } catch (error) {
    console.error("Błąd ładowania historii:", error);
    contentArea.innerHTML = "<p>Nie udało się załadować historii.</p>";
  }
}

function renderHistory(historyData) {
  contentArea.innerHTML = '';
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

  historyData.push(nodeId);
  localStorage.setItem('lorely_history', JSON.stringify(historyData));

  const p = document.createElement('p');
  p.textContent = node.text;
  contentArea.appendChild(p);

  //^ elementy \n na rózne <p> jezeli zamienie to w historyRender te
  // const paragraphs = node.text.split('\n\n');
  // paragraphs.forEach(text => {
  //   const p = document.createElement('p');
  //   p.textContent = text;
  //   contentArea.appendChild(p);
  // });

  if (node.auto_next) {
    renderNode(node.auto_next);
    return;
  }

  // W przeciwnym razie renderuj przyciski
  node.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice.text;
    btn.onclick = () => renderNode(choice.next_node);
    choicesArea.appendChild(btn);
  });
}

function resetStory() {
  localStorage.removeItem('lorely_history');
  location.reload(); // Odśwież stronę, żeby zacząć od zera
}

// Uruchomienie na starcie
loadStory();
