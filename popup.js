document.getElementById('translateBtn').addEventListener('click', () => {
  const selectedLang = document.getElementById('lang').value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: translateChats,
          args: [selectedLang]
      });
  });
});

async function translateChats(language) {
  const chats = document.querySelectorAll('.message-text');
  const translations = [];

  for (const chat of chats) {
      const originalText = chat.innerText;
      const translatedText = await translateText(originalText, language);
      translations.push({ original: originalText, translated: translatedText });
  }

  // Update the chat messages
  chats.forEach((chat, index) => {
      chat.innerText = `Translated (${language}): ${translations[index].translated}`;
  });
}

async function translateText(text, targetLanguage) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`;

  const response = await fetch(url);
  const data = await response.json();
  
  return data.responseData.translatedText || "Translation Error";
}
