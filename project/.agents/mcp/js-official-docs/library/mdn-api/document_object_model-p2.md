---
title: "Document Object Model (DOM) (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document_object_model/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document Object Model (DOM) (part 2 of 2)

## Examples

### Setting text content

This example uses a `` element containing a `<textarea>` and two `` elements. When the user clicks the first button we set some text in the `<textarea>`. When the user clicks the second button we clear the text. We use:

- `Document.querySelector()` to access the `<textarea>` and the button
- `EventTarget.addEventListener()` to listen for button clicks
- `Node.textContent` to set and clear the text.

#### HTML

```html
<div class="container">
  <textarea class="story"></textarea>
  <button id="set-text" type="button">Set text content</button>
  <button id="clear-text" type="button">Clear text content</button>
</div>
```

#### CSS

```css
.container {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

button {
  width: 200px;
}
```

#### JavaScript

```js
const story = document.querySelector(".story");

const setText = document.querySelector("#set-text");
setText.addEventListener("click", () => {
  story.textContent = "It was a dark and stormy night...";
});

const clearText = document.querySelector("#clear-text");
clearText.addEventListener("click", () => {
  story.textContent = "";
});
```

#### Result

### Adding a child element

This example uses a `` element containing a `` and two `` elements. When the user clicks the first button we create a new element and add it as a child of the ``. When the user clicks the second button we remove the child element. We use:

- `Document.querySelector()` to access the `` and the buttons
- `EventTarget.addEventListener()` to listen for button clicks
- `Document.createElement` to create the element
- `Node.appendChild()` to add the child
- `Node.removeChild()` to remove the child.

#### HTML

```html
<div class="container">
  <div class="parent">parent</div>
  <button id="add-child" type="button">Add a child</button>
  <button id="remove-child" type="button">Remove child</button>
</div>
```

#### CSS

```css
.container {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

button {
  width: 100px;
}

div.parent {
  border: 1px solid black;
  padding: 5px;
  width: 100px;
  height: 100px;
}

div.child {
  border: 1px solid red;
  margin: 10px;
  padding: 5px;
  width: 80px;
  height: 60px;
  box-sizing: border-box;
}
```

#### JavaScript

```js
const parent = document.querySelector(".parent");

const addChild = document.querySelector("#add-child");
addChild.addEventListener("click", () => {
  // Only add a child if we don't already have one
  // in addition to the text node "parent"
  if (parent.childNodes.length > 1) {
    return;
  }
  const child = document.createElement("div");
  child.classList.add("child");
  child.textContent = "child";
  parent.appendChild(child);
});

const removeChild = document.querySelector("#remove-child");
removeChild.addEventListener("click", () => {
  const child = document.querySelector(".child");
  parent.removeChild(child);
});
```

#### Result

### Reading and modifying the tree

Suppose the author wants to change the header of the document in What is a DOM tree? and write two paragraphs instead of one. The following script would do the job:

#### HTML

```html
<html lang="en">
  <head>
    <title>My Document</title>
  </head>
  <body>
    <input type="button" value="Change this document." />
    <h2>Header</h2>
    <p>Paragraph</p>
  </body>
</html>
```

#### JavaScript

```js
document.querySelector("input").addEventListener("click", () => {
  // document.getElementsByTagName("h2") returns a NodeList of the <h2>
  // elements in the document, and the first is number 0:
  const header = document.getElementsByTagName("h2").item(0);

  // The firstChild of the header is a Text node:
  header.firstChild.data = "A dynamic document";

  // Now header is "A dynamic document".

  // Access the first paragraph
  const para = document.getElementsByTagName("p").item(0);
  para.firstChild.data = "This is the first paragraph.";

  // Create a new Text node for the second paragraph
  const newText = document.createTextNode("This is the second paragraph.");

  // Create a new Element to be the second paragraph
  const newElement = document.createElement("p");

  // Put the text in the paragraph
  newElement.appendChild(newText);

  // Put the paragraph on the end of the document by appending it to
  // the body (which is the parent of para)
  para.parentNode.appendChild(newElement);
});
```

### Creating a tree

You can create the tree in What is a DOM tree? entirely in JavaScript too.

```js
const root = document.createElement("html");
root.lang = "en";

const head = document.createElement("head");
const title = document.createElement("title");
title.appendChild(document.createTextNode("My Document"));
head.appendChild(title);

const body = document.createElement("body");
const header = document.createElement("h1");
header.appendChild(document.createTextNode("Header"));
const paragraph = document.createElement("p");
paragraph.appendChild(document.createTextNode("Paragraph"));
body.appendChild(header);
body.appendChild(paragraph);

root.appendChild(head);
root.appendChild(body);
```

### Event Propagation

This example demonstrates how events fire and are handled in the DOM in a very simple way. When the BODY of this HTML document loads, an event listener is registered with the top row of the TABLE. The event listener handles the event by executing the function stopEvent, which changes the value in the bottom cell of the table.

However, stopEvent also calls an event object method, `event.stopPropagation`, which keeps the event from bubbling any further up into the DOM. Note that the table itself has an `onclick` event handler that ought to display a message when the table is clicked. But the stopEvent method has stopped propagation, and so after the data in the table is updated, the event phase is effectively ended, and an alert box is displayed to confirm this.

```html
<table id="t-daddy">
  <tbody>
    <tr id="tbl1">
      <td id="c1">one</td>
    </tr>
    <tr>
      <td id="c2">two</td>
    </tr>
  </tbody>
</table>
```

```css
#t-daddy {
  border: 1px solid red;
}

#c1 {
  background-color: pink;
}
```

```js
function stopEvent(event) {
  const c2 = document.getElementById("c2");
  c2.textContent = "hello";

  // this ought to keep t-daddy from getting the click.
  event.stopPropagation();
  console.log("event propagation halted.");
}

const elem = document.getElementById("tbl1");
elem.addEventListener("click", stopEvent);

document.getElementById("t-daddy").addEventListener("click", () => {
  console.log("t-daddy clicked");
});
```

### Displaying event object properties

This example uses DOM methods to display all the properties of the `click` event object and their values in a table. It also shows a useful technique of using a `for...in` loop to iterate over the properties of an object to get their values.

The properties of event objects differs greatly between browsers, the WHATWG DOM Standard lists the standard properties, however many browsers have extended these greatly.

Put the following code into a blank text file and load it into a variety of browsers, you'll be surprised at the different number and names of properties. You might also like to add some elements in the page and call this function from different event handlers.

```html
<h1>Properties of the DOM <span id="eventType"></span> Event Object</h1>
```

```css
table {
  border-collapse: collapse;
  margin-top: 2em;
}
thead {
  font-weight: bold;
}
td {
  padding: 2px 10px;
}

.odd {
  background-color: #efdfef;
}
.even {
  background-color: white;
}
```

```js
function showEventProperties(event) {
  function addCell(row, text) {
    const cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(text));
  }

  document.getElementById("eventType").textContent = event.type;

  const table = document.createElement("table");
  const thead = table.createTHead();
  let row = thead.insertRow(-1);
  const labelList = ["#", "Property", "Value"];
  const len = labelList.length;

  for (let i = 0; i < len; i++) {
    addCell(row, labelList[i]);
  }

  const tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (const p in event) {
    row = tbody.insertRow(-1);
    row.className = row.rowIndex % 2 ? "odd" : "even";
    addCell(row, row.rowIndex);
    addCell(row, p);
    addCell(row, event[p]);
  }

  document.body.appendChild(table);
}

window.addEventListener("click", showEventProperties);
```

## See also

- CSS Object Model (CSSOM)
- HTML DOM API
- SVG API
