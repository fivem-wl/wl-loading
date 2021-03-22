// Vanilla js document ready
export function ready(fn) {
    if (document.readyState === "complete" || document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}