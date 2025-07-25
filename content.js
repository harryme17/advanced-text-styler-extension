window.addEventListener("message", (event) => {
    if (event.source.window === window || !event.data.action) {
        return;
    }

    const iframe = document.getElementById('font-styler-iframe');
    if (!iframe || event.source !== iframe.contentWindow) {
        return;
    }
    
    if (event.data.action === 'apply_style') {
        document.execCommand('insertText', false, event.data.styledText);
        if (iframe.parentElement) {
            iframe.parentElement.remove();
        }
    }
}, false);