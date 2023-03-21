const resultDiv = document.getElementById('result');
const details = document.getElementById('detailsText');

// Load the stored value when the popup is opened
chrome.storage.local.get('additionalInfo', (data) => {
  if (data.additionalInfo) {
    details.value = data.additionalInfo;
  }
});

// Save the value in the textarea when it changes
details.addEventListener('input', () => {
  chrome.storage.local.set({ additionalInfo: details.value });
});

document.getElementById('generateProposal').addEventListener('click', () => {
  resultDiv.innerHTML = 'Generating proposal...';
  const additionalText = details.value.trim();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getDescription', additionalText: additionalText});
    });
  });

// http://localhost/test_upwork_page/Submit%20a%20Proposal.html