<script>
  import { onMount } from "svelte";
  import { StringUtil } from "src/lib/string";

  export let className = "rich-editor";
  export let height = "100px";
  export let value;
  export let disabled = false;

  let iframeRef;
  let controllerRef;
  let inputColorRef;
  let editMode = false;

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
  export const getTextContent = () => {
    return iframeRef.contentWindow.document.getElementsByTagName("body")[0]
      .textContent;
  };

  export const getHtmlContent = () => {
    return iframeRef.contentWindow.document.getElementsByTagName("body")[0]
      .innerHTML;
  };

  export const setHtmlContent = (htmlContent) => {
    if (iframeRef) {
      iframeRef.contentWindow.document.getElementsByTagName(
        "body"
      )[0].innerHTML = htmlContent;
      setHeight();
    }
  };

  const setHeight = () => {
    if (iframeRef) {
      if (StringUtil.countDiv(getHtmlContent()) > 4) {
        height = "180px";
      } else {
        height = "100px";
      }
      iframeRef.height = height;
    }
  };

  onMount(() => {
    if (iframeRef) {
      setHeight();
      iframeRef.contentWindow.document.addEventListener("input", onEdit);
      const body = iframeRef.contentWindow.document.getElementsByTagName(
        "body"
      )[0];
      body.style.fontFamily = "Roboto";
      body.style.fontSize = "15px";

      const head = iframeRef.contentWindow.document.getElementsByTagName(
        "head"
      )[0];

      head.innerHTML = `<style ✂prettier:content✂="CiAgICAgICAgICAgICAgOjotd2Via2l0LXNjcm9sbGJhciB7CiAgICAgICAgICAgICAgICB3aWR0aDogOHB4OwogICAgICAgICAgICAgIH0KICAKICAgICAgICAgICAgICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNrIHsKICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICR7dGhlbWVDb2xvcnNbMl1bJy0tYmctcHJpbWFyeSddfTsKICAgICAgICAgICAgICB9CiAgICAgICAgICAgICAgOjotd2Via2l0LXNjcm9sbGJhci10cmFjazpob3ZlciB7CiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICR7dGhlbWVDb2xvcnNbNV1bJy0tYmctdGVydGlhcnknXX07CiAgICAgICAgICAgICAgfQogIAogICAgICAgICAgICAgIDo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIgewogICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJHt0aGVtZUNvbG9yc1syXVsnLS1iZy1wcmltYXJ5J119OwogICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4OwogICAgICAgICAgICAgIH0KICAKICAgICAgICAgICAgICA6Oi13ZWJraXQtc2Nyb2xsYmFyLXRodW1iOmhvdmVyIHsKICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJHt0aGVtZUNvbG9yc1s4XVsnLS1yZWFkb25seS10ZXh0LWNvbG9yJ119OwogICAgICAgICAgICAgIH0KICAgICAgICAgIA==" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂="" ✂prettier:content✂=""></style>`;
    }
  });

  const execCmd = (e, cmd) => {
    e.preventDefault();

    if (cmd === "foreColor") {
      inputColorRef.click();
    } else if (cmd === "code") {
      iframeRef.contentWindow.document.execCommand(
        "InsertHTML",
        false,
        "<br>[script]<br><br>[/script]<br>"
      );

      const body = iframeRef.contentWindow.document.getElementsByTagName(
        "body"
      )[0];

      var selectobj = window.getSelection();
      var rangeobj = iframeRef.contentWindow.document.createRange();
      rangeobj.setStart(body, 1);
      selectobj.addRange(rangeobj);
      body.focus();
    } else {
      iframeRef.contentWindow.document.execCommand(cmd, false, null);
    }
  };

  const onChangeForeColor = (e) => {
    iframeRef.contentWindow.document.execCommand(
      "foreColor",
      false,
      e.target.value
    );
  };

  $: {
    if (!editMode) {
      setHtmlContent(value);
    }
  }

  $: {
    if (disabled && iframeRef) {
      iframeRef.contentWindow.document.designMode = "Off";
    } else if (iframeRef) {
      iframeRef.contentWindow.document.designMode = "On";
    }
  }

  const onEdit = (e) => {
    editMode = true;
    value = getHtmlContent();
    setHeight();
  };
</script>

<input
  type="color"
  bind:this={inputColorRef}
  style="display: none;"
  on:change={onChangeForeColor} />
<div class={className}>
  <slot />
  <div class="rich-editor__body">
    <div class="rich-editor__body__controller" bind:this={controllerRef}>
      {#each controllers as item}
        <button
          data-id="controller"
          title={item.title}
          on:click={(e) => execCmd(e, item.cmd)}>
          {@html item.icon}
        </button>
      {/each}
    </div>

    <iframe bind:this={iframeRef} title="" class="rich-editor__body__content" />
  </div>
</div>
