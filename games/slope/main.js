(function fixWindowOpen() {
    let nativeOpen = window.open
    window.open = (a, b) => nativeOpen(a, b) // strip third param
})()