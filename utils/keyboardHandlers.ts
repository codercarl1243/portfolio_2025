type KeyCallbackMap = {
  [key: string]: () => void;
};

export function handleKey(
  event: React.KeyboardEvent,
  keyMap: KeyCallbackMap
) {
  const callback = keyMap[event.key];
  if (callback) {
    event.preventDefault();
    callback();
  }
}