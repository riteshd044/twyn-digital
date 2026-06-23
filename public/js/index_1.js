// ✅ CORRECT — Returns a Promise
export function preloadImages(selector = 'img') {
    return new Promise((resolve) => {
        const images = document.querySelectorAll(selector);
        let loadedCount = 0;
        const totalImages = images.length;

        if (totalImages === 0) {
            resolve();
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
                if (loadedCount === totalImages) resolve();
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === totalImages) resolve();
                });
                img.addEventListener('error', () => {
                    loadedCount++;
                    if (loadedCount === totalImages) resolve();
                });
            }
        });
    });
}