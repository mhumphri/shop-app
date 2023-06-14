const generateKey = (length) => {

  // sets default key length
  let keyLength = 10;
  // if length argument is specified, keyLength variable is set to value of length argument
  if (length) {
    keyLength = length;
  }
  // initalises result string
  let result = '';
  // selection of letters to be used in the key
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const charactersLength = characters.length;
let counter = 0;
// looprandomly selects a character and adds it to the key - keyLength sets number of iterations
while (counter < keyLength) {
  result += characters.charAt(Math.floor(Math.random() * charactersLength));
  counter += 1;
}
return result;
}

export default generateKey
