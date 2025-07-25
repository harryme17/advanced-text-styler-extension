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