function generateLoremIpsum(length) {
    const loremIpsum =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  
    let result = "";
  
    while (result.length < length) {
      result += loremIpsum;
    }
  
    return result.slice(0, length);
  }
  
  function replaceTextWithLoremIpsum(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const originalLength = node.textContent.trim().length;
  
      if (originalLength > 0) {
        node.textContent = generateLoremIpsum(originalLength);
      }
    } else {
      for (const child of node.childNodes) {
        replaceTextWithLoremIpsum(child);
      }
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getDescription'){
      console.log("Got description");
      const additonalText = request.additionalText;
      const jobDescription = document.querySelector('.description');
      const textArea = document.querySelector('.up-textarea');
      chrome.runtime.sendMessage({ action: 'generateProposal', jobDescription: jobDescription.textContent, additonalText: additonalText}, (response) => {
        if (response.error) {
          textArea.value = `error: ${response.error}`;
        } else {
          textArea.value = response.proposal};
        });
    }
  });