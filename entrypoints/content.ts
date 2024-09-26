import aiIcon from "../assets/ai-icon.svg";

export default defineContentScript({
  matches: ["*://*.linkedin.com/*"],
  main() {
    const messageInputSelector = 'div[contenteditable="true"][role="textbox"]';

    document.addEventListener("focusin", (event) => {
      const target = event.target as HTMLElement;
      if (target.matches(messageInputSelector)) {
        let aiIconElement = document.querySelector(".ai-icon") as HTMLImageElement;
        if (!aiIconElement) {
          aiIconElement = document.createElement("img");
          aiIconElement.src = aiIcon;
          aiIconElement.style.position = "absolute";
          aiIconElement.style.bottom = "10px";
          aiIconElement.style.right = "10px";
          aiIconElement.classList.add("ai-icon");
          aiIconElement.style.cursor = "pointer";

          aiIconElement.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log("AI Icon Clicked");
            createModal();
          });

          const messageInput = document.querySelector(messageInputSelector);
          if (messageInput) {
            const parent = messageInput.parentElement;
            if (parent) {
              parent.style.position = "relative";
              parent.appendChild(aiIconElement);
            }
          }
        }
      }
    });

    function createModal() {
      let existingModal = document.querySelector(".ai-modal");
      if (existingModal) return;

      const modalContainer = document.createElement("div");
      modalContainer.classList.add("ai-modal");
      modalContainer.style.position = "fixed";
      modalContainer.style.top = "50%";
      modalContainer.style.left = "50%";
      modalContainer.style.transform = "translate(-50%, -50%)";
      modalContainer.style.zIndex = "1000";
      modalContainer.style.padding = "20px";
      modalContainer.style.backgroundColor = "white";
      modalContainer.style.border = "1px solid #ccc";
      modalContainer.style.borderRadius = "10px";
      modalContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      modalContainer.style.width = "300px";
      modalContainer.style.textAlign = "center";

      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.placeholder = "Type a command...";
      inputField.style.width = "100%";
      inputField.style.padding = "10px";
      inputField.style.marginBottom = "10px";
      inputField.style.border = "1px solid #ccc";
      inputField.style.borderRadius = "5px";

      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.justifyContent = "flex-end";
      buttonContainer.style.marginTop = "10px";

      const insertButton = document.createElement("button");
      insertButton.textContent = "Insert";
      insertButton.style.width = "25%";
      insertButton.style.height = "30px";
      insertButton.style.padding = "0";
      insertButton.style.border = "2px solid #666D80";
      insertButton.style.borderRadius = "8px";
      insertButton.style.backgroundColor = "#3B82F6";
      insertButton.style.color = "white";
      insertButton.style.cursor = "pointer";
      insertButton.style.display = "none";

      const generateButton = document.createElement("button");
      generateButton.textContent = "Generate";
      generateButton.style.width = "25%";
      generateButton.style.height = "30px";
      generateButton.style.padding = "0";
      generateButton.style.backgroundColor = "#0073b1";
      generateButton.style.color = "white";
      generateButton.style.border = "none";
      generateButton.style.borderRadius = "5px";
      generateButton.style.cursor = "pointer";

      buttonContainer.appendChild(insertButton);
      buttonContainer.appendChild(generateButton);
      modalContainer.appendChild(inputField);
      modalContainer.appendChild(buttonContainer);
      document.body.appendChild(modalContainer);

      generateButton.addEventListener("click", () => {
        const dummyResponse = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
        inputField.value = dummyResponse;

        insertButton.style.display = "block";
        generateButton.textContent = "Regenerate";
      });

      insertButton.addEventListener("click", () => {
        const messageInput = document.querySelector(messageInputSelector) as HTMLDivElement;
        if (messageInput) {
          messageInput.innerText = inputField.value;
        }
        modalContainer.remove();
      });

      modalContainer.addEventListener("click", (event) => {
        if (event.target === modalContainer) {
          modalContainer.remove();
        }
      });
    }
  },
});
