// Function to display strings in the DOM
export function displayStatsInDom(stringArray, rootRef) {
  //for loop to add each string as a p
  //   for (let i = 0; i < stringArray.length; i++)
  stringArray.forEach((str) => {
    const paragraph = document.createElement("p"); // creates a new HTML paragraph element (<p>).
    paragraph.innerHTML = str; //sets the text content of the paragraph element to the current string (str) from the array.
    rootRef.appendChild(paragraph); //appends the new paragraph to the rootRef
  });
}
