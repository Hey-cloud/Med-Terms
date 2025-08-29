export function speak(text) {
  if (!('speechSynthesis' in window)) return Promise.reject('TTS not supported');
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.onend = () => resolve();
    speechSynthesis.speak(u);
  });
}
