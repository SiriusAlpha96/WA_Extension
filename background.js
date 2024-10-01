chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === "translate") {
          const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(request.data.q)}&langpair=${request.data.source}|${request.data.target}`;
  
          fetch(url)
              .then(response => response.json())
              .then(data => {
                  sendResponse({ translatedText: data.responseData.translatedText });
              })
              .catch(error => {
                  console.error('Translation Error:', error);
                  sendResponse({ translatedText: null });
              });
          
          return true; // Keep the message channel open for sendResponse
      }
  });
  