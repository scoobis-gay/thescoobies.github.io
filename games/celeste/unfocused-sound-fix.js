const audios = [];

class PatchedAudioContext extends AudioContext {
    constructor(...args) {
        super(...args);
        const gainNode = this.createGain();
        gainNode.connect(this.destination);
        gainNode.gain.value = 1;
        this.gainNode = gainNode;
        audios.push(new WeakRef(this));
    }
}

globalThis.AudioContext = PatchedAudioContext;

function sweep() {
    audios.forEach((audio, index) => {
        const aud = audio.deref();
        if (aud === undefined) {
            audios.splice(index, 1);
        }
    });
}

document.addEventListener('visibilitychange', async function() {
    sweep();
    audios.forEach(async audioRef => {
        const audioContext = audioRef.deref();
        if (audioContext) {
            try {
                if (document.hidden) {
                    await audioContext.suspend()
                } else {
                    await audioContext.resume()
                }
            } catch (e) {
                // probably a closed context
                audios.splice(audios.indexOf(audioRef), 1)
            }
        }
    });
});