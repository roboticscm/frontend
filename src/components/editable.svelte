<script>
  import { tick } from "svelte";

  const getCurrentChildNodeIndex = (nodes, currentNode) => {
    for (let i = 0; i < nodes.length; i++) {
      if (currentNode === nodes[i]) {
        return i;
      }
    }

    return -1;
  };

  function setCursor(pos, nodeIndex = 0) {
    var tag = document.getElementById("editable");

    // Creates range object
    var setpos = document.createRange();

    // Creates object for selection
    var set = window.getSelection();

    const currentIndex = getCurrentChildNodeIndex(
      tag.childNodes,
      set.anchorNode
    );
    console.log(currentIndex);
    // Set start position of range
    setpos.setStart(tag.childNodes[currentIndex - 3], pos);

    // Collapse range within its boundary points
    // Returns boolean
    setpos.collapse(true);

    // Remove all ranges set
    set.removeAllRanges();

    // Add range with respect to range object.
    set.addRange(setpos);

    // Set cursor on focus
    tag.focus();
  }

  const onClick = () => {
    setCursor(document.querySelector("#position").value);
  };

  const onClick1 = async () => {
    const set = getCaretCharacterOffsetWithin(
      document.getElementById("editable")
    );

    document.execCommand(
      "InsertHTML",
      false,
      "<br>[script]<br><br>[/script]<br>"
    );

    setCursor(0);
  };

  function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }
</script>

<style>
  /* your styles go here */
</style>

<div id="editable" contenteditable="true" spellcheck="false">
  HTML stands for Hyper Text Markup Language. It is used to design web pages
  using markup language. HTML is the combination of Hypertext and Markup
  language. Hypertext defines the link between the web pages. Markup language is
  used to define the text document within tag which defines the structure of web
  pages. HTML is a markup language which is used by the browser to manipulate
  text, images and other content to display it in required format.
</div>
<br />

<input type="number" id="position" min="0" value="0" max="470" />

<button on:click={onClick}>Position Cursor</button>

<button on:click={onClick1}>Bold</button>
<!-- markup (zero or more items) goes here -->
