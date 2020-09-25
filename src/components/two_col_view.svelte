<script>
  import { onMount, onDestroy } from "svelte";
  import Split from "split-grid";

  export let id;
  export let defaultLeftWidth = "260px";
  export let leftMaxWidth = 350;

  const GUTTER_WIDTH = 10;
  let contentSplit;

  const createSplit = () => {
    const divElement = document.createElement("div");
    divElement.id = "leftGutter";
    divElement.classList.add("left-gutter-more");

    document
      .querySelector(".left-grid-vertical-gutter")
      .appendChild(divElement);
    // loadSettings
    let containerEle = document.querySelector(".view-container-2-col");
    const leftWidth = localStorage.getItem(`left-${id}`) || defaultLeftWidth;
    containerEle.style[
      "grid-template-columns"
    ] = `${leftWidth} ${GUTTER_WIDTH}px auto`;

    return Split({
      columnGutters: [
        {
          track: 1,
          element: document.querySelector(".left-grid-vertical-gutter"),
        },
      ],
      onDragEnd: (direction, track) => {
        let gridEle = document.querySelector(".view-container-2-col");

        let [leftWidth] = gridEle.style["grid-template-columns"].split(" ");

        if (+leftWidth.replace("px", "") > leftMaxWidth) {
          leftWidth = leftMaxWidth + "px";
        }

        gridEle.style[
          "grid-template-columns"
        ] = `${leftWidth} ${GUTTER_WIDTH}px auto`;

        localStorage.setItem(`left-${id}`, leftWidth);
      },
    });
  };

  onMount(() => {
    contentSplit = createSplit();
    console.log("contentSplit ", contentSplit);
  });

  onDestroy(() => {
    if (contentSplit) {
      contentSplit.destroy();
    }
  });
</script>

<main class="view-container-2-col">
  <div class="view-left">
    <slot name="viewLeft" />
  </div>

  <div class="left-grid-vertical-gutter" />
  <!-- {#if !window.isSmartPhone} -->
  <div class="view-content">
    <slot />
  </div>
  <!-- {/if} -->
</main>
