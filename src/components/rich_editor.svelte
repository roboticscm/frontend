<script>
  import { onMount } from "svelte";
  import { getParts } from "src/lib/code";
  import { Code } from "src/lib/constants";

  export let height = "200px";
  export let value;
  export let disabled = false;

  const oldValue = value;
  let inputRef, inputColorRef, prevSelection;

  const controllers = [
    {
      cmd: "bold",
      icon: '<i class="fa fa-bold"></i>',
      title: "BOLD",
    },
    {
      cmd: "italic",
      icon: '<i class="fa fa-italic"></i>',
      title: "ITALIC",
    },
    {
      cmd: "foreColor",
      icon: '<i class="fa fa-palette"></i>',
      title: "Text color",
    },
    {
      cmd: "code",
      icon: '<i class="fas fa-file-code"></i>',
      title: "Code",
    },
  ];

  const execCmd = (e, cmd) => {
    e.preventDefault();

    if (cmd === "foreColor") {
      prevSelection = saveSelection();
      inputColorRef.click();
    } else if (cmd === "code") {
      document.execCommand(
        "InsertHTML",
        false,
        `<br>${Code.openTag}<br>[language=javascript]<br><br>${Code.closeTag}<br>`
      );
      moveCaret(0);
    } else {
      document.execCommand(cmd, false, null);
    }
  };

  const saveSelection = () => {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    return null;
  };

  const restoreSelection = (range) => {
    if (range) {
      if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.selection && range.select) {
        range.select();
      }
    }
  };

  const onChangeForeColor = (e) => {
    restoreSelection(prevSelection);
    document.execCommand("foreColor", false, e.target.value);
  };

  const moveCaret = () => {
    const prevRange = saveSelection();
    const range = document.createRange();
    range.setStart(prevRange.startContainer.previousElementSibling, 0);
    restoreSelection(range);
  };

  const onInput = () => {
    value = prevFormat();
  };

  const prevFormat = () => {
    const html = inputRef.innerHTML;
    const text = inputRef.innerText;

    const htmlParts = getParts(html);
    const textParts = getParts(text);

    let result = "";

    for (let i = 0; i < htmlParts.length; i++) {
      if (htmlParts[i].includes(Code.openTag)) {
        result += textParts[i] + Code.closeTag;
      } else {
        result += htmlParts[i];
      }
    }

    return result;
  };

  onMount(() => {
    inputRef.style.height = height;
  });
</script>

<style>
</style>

<div class="rich-editor">
  <slot />
  <div class="rich-editor__controller">
    {#each controllers as item}
      <button title={item.title} on:click={(e) => execCmd(e, item.cmd)}>
        {@html item.icon}
      </button>
    {/each}
  </div>

  <div
    class="rich-editor__content"
    bind:this={inputRef}
    contenteditable={!disabled}
    spellcheck="false"
    on:input={onInput}>
    {@html oldValue}
  </div>
</div>

<input
  type="color"
  bind:this={inputColorRef}
  style="display: none;"
  on:change={onChangeForeColor} />
