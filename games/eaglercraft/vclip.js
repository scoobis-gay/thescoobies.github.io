(function VClipExploit() {
    ModAPI.meta.title("VClip Exploit");
    ModAPI.meta.description("example Vclip exploit");
    ModAPI.meta.credits("By turtletown73");

    ModAPI.require("player");

    ModAPI.addEventListener("sendchatmessage", (ev) => {
        var string = ev.message.toLowerCase();
        if (string.startsWith(".vclip")) {
            ev.preventDefault = true;
            var yOffset = 1;
            var args = string.split(" ");
            if (args[1]) {
                yOffset = parseFloat(args[1]) || 0;
            }
            
            ModAPI.player.setPosition(
                ModAPI.player.posX,
                ModAPI.player.posY + yOffset,
                ModAPI.player.posZ
            ); 

            //Finally, log the amount we've VClipped into the chat.
            ModAPI.displayToChat("[VClip] VClipped " + yOffset + " blocks.");
        }
    });
})();