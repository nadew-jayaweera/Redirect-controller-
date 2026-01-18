document.addEventListener('DOMContentLoaded', loadRules);
document.getElementById('addBtn').addEventListener('click', addRule);

async function addRule() {
  const targetInput = document.getElementById('targetUrl');
  const destinationInput = document.getElementById('redirectUrl');

  const target = targetInput.value;
  const destination = destinationInput.value;

  if (!target || !destination) {
    // Simple shake animation on error could go here
    alert("Please fill in all fields.");
    return;
  }

  // Generate automatic ID based on existing rules
  const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
  const id = existingRules.length > 0 ? Math.max(...existingRules.map(r => r.id)) + 1 : 1;

  // 2. Add new rule
  await chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [
      {
        id: id,
        priority: 1,
        action: {
          type: "redirect",
          redirect: { url: destination }
        },
        condition: {
          urlFilter: target,
          resourceTypes: ["script", "stylesheet", "image", "xmlhttprequest", "main_frame"] 
        }
      }
    ]
  });

  // Clear inputs for UX
  targetInput.value = '';
  destinationInput.value = '';
  
  loadRules();
}

async function removeRule(id) {
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [id]
  });
  loadRules();
}

async function loadRules() {
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  const container = document.getElementById('ruleList');
  container.innerHTML = '';

  if (rules.length === 0) {
    container.innerHTML = '<div style="color:#555; text-align:center; font-size:12px; padding:10px;">No active redirects.</div>';
    return;
  }

  rules.forEach(rule => {
    const div = document.createElement('div');
    div.className = 'rule-card';
    
    // Formatting the output for the new design
    div.innerHTML = `
      <div class="rule-info">ID: <strong>${rule.id}</strong></div>
      <span class="rule-url" style="color: #94a3b8;">${rule.condition.urlFilter}</span>
      <div style="text-align:center; color:#555; font-size:10px;">⬇</div>
      <span class="rule-url">${rule.action.redirect.url}</span>
    `;
    
    const delBtn = document.createElement('button');
    delBtn.innerText = "DELETE";
    delBtn.className = "remove";
    delBtn.onclick = () => removeRule(rule.id);
    
    div.appendChild(delBtn);
    container.appendChild(div);
  });
}