const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateProposal') {
    var system = `You are a professional UpWork freelancer. I will provide you the job description of a job posted by a client, and in response, you have to write a proposal that can guarantee a response from the client.\n\n
    
    The first few lines should summarize their requirements to grab client attention.\n
    Write a clear, personalized, and compelling cover letter that highlights your relevant experience and how it aligns with the client's project requirements.\n
    Read the job post carefully and demonstrate a clear understanding of the requirements in your proposal.\n
    Highlight your relevant experience and expertise in the specific domain or technology required for the project.\n
    Include links to your portfolio or previously developed apps to showcase your work.\n
    Personalize your proposal and express genuine interest in working on the project.\n
    Offer to discuss the project further, either through a meeting or a call, to better understand the client's requirements.\n
    Address any questions or concerns mentioned in the job post to show your attentiveness and problem-solving skills.\n
    Ask follow-up questions regarding their requirements, to show that you are really interested in the project.

    \n\n`;

    const prompt = request.jobDescription;

    if (request.additionalText !== ""){
        system = system + `Please also note that: ${request.additonalText}\n\n`;
    }

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": system},{"role": "user", "content": prompt}],
        max_tokens: 800
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.choices && data.choices.length > 0) {
          sendResponse({ proposal: data.choices[0].message.content.trim() });
        } else {
          sendResponse({ error: 'Failed to generate proposal.' });
        }
      })
      .catch((error) => {
        sendResponse({ error: error.message });
      });
    return true;
  }
});
