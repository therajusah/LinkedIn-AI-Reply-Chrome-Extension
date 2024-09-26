export default defineBackground({
  main() {
    console.log("Background script running.");

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log("Message received in background:", message);

      if (message.type === "GENERATE_RESPONSE") {
        const dummyResponse =
          "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
        sendResponse({ response: dummyResponse });
      }

      return true;
    });
  },
});



