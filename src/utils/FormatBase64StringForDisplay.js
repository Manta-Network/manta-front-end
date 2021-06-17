const DEFAULT_LINE_LENGTH = 75;

export const formatBase64StringForDisplay = (base64String, lineLength = DEFAULT_LINE_LENGTH) => {
  if (!base64String) {
    return '';
  }
  let formattedString = '\n';
  for (let i = 0; i < base64String.length; i++) {
    formattedString += base64String.slice(i, i + lineLength);
    formattedString += '\n';
    i += lineLength;
  }
  return formattedString;
};
