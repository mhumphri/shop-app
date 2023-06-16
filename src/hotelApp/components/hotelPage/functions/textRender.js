/* returns render of text and line breaks in response to array of text and false (for line break) elements */
const textRender = (textArray) => {
  let newText = []
for (let i=0; i<textArray.length;i++) {

  if (!textArray[i]) (
    newText.push(<br />)
  )
  else if (textArray[i].header) {
    newText.push(<span class="_1di55y9">{textArray[i].header}</span>)
  }
  else {
    newText.push(textArray[i])
  }

}
return newText
}

export default textRender
