export function sanitize(input: unknown): string {
  if (typeof input !== 'string' || input.length === 0) return '';

  const len = input.length;
  let result = '';
  let lastWasSpace = false;
  let start = 0;

  // skip leading whitespace
  while (start < len && input.charCodeAt(start) === 32) start++;

  for (let i = start; i < len; i++) {
    const c = input.charCodeAt(i);
    const isAlphaNum = (c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
    const isSpace = c === 32;

    if (isAlphaNum) {
      result += input[i];
      lastWasSpace = false;
    } else if (isSpace && !lastWasSpace) {
      result += ' ';
      lastWasSpace = true;
    }
  }

  // trim trailing space
  if (lastWasSpace && result.length > 0) result = result.slice(0, -1);

  return result;
}
