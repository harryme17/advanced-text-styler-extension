function setupContextMenu() {
    chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
            id: "style-text-modal-final",
            title: "Style Selected Text",
            contexts: ["selection"]
        });
    });
}

chrome.runtime.onInstalled.addListener(setupContextMenu);
chrome.runtime.onStartup.addListener(setupContextMenu);

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "style-text-modal-final" && info.selectionText) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: showModalOnPage,
            args: [info.selectionText]
        });
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "open-style-text-modal") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: () => {
                        const selectedText = window.getSelection().toString();
                        if (selectedText) {
                            const existingModal = document.getElementById('font-styler-modal-container');
                            if (existingModal) { existingModal.remove(); }

                            const modalContainer = document.createElement('div');
                            modalContainer.id = 'font-styler-modal-container';
                            modalContainer.onclick = () => modalContainer.remove();

                            const iframe = document.createElement('iframe');
                            iframe.id = 'font-styler-iframe';
                            iframe.src = chrome.runtime.getURL(`popup.html?text=${encodeURIComponent(selectedText)}`);
                            iframe.onclick = (e) => e.stopPropagation();

                            modalContainer.appendChild(iframe);
                            document.body.appendChild(modalContainer);
                        } else {
                            console.error("No text selected.");
                        }
                    }
                });
            } else {
                console.error("No active tab found.");
            }
        });
    }
});

function getSelectedTextAndShowModal() {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
        showModalOnPage(selectedText);
    } else {
        console.error("No text selected.");
    }
}

function showModalOnPage(selectedText) {
    const existingModal = document.getElementById('font-styler-modal-container');
    if (existingModal) { existingModal.remove(); }

    const modalContainer = document.createElement('div');
    modalContainer.id = 'font-styler-modal-container';
    modalContainer.onclick = () => modalContainer.remove();

    const iframe = document.createElement('iframe');
    iframe.id = 'font-styler-iframe';
    iframe.src = chrome.runtime.getURL(`popup.html?text=${encodeURIComponent(selectedText)}`);
    iframe.onclick = (e) => e.stopPropagation();

    modalContainer.appendChild(iframe);
    document.body.appendChild(modalContainer);
}