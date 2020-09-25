<script>
  export let courses;
</script>

<style lang="scss">
  .course-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .course-list__item {
      border: 1px solid gray;
      border-radius: 10px;
      padding: 20px;
      min-width: 300px;
      margin: 5px;
      &__title {
        font-weight: 700;
      }

      &__old-price {
        color: gray;
        text-decoration: line-through;
      }

      &__price {
        color: blue;
        font-size: 2rem;
      }
    }
  }
</style>

<div class="course-list">
  {#each courses as course}
    <div class="course-list__item">
      <div class="course-list__item__title">{course.name}</div>

      <div class="course-list__item__desc">{course.description}</div>

      <div class="course-list__item__old-price">{course.oldPrice}</div>

      <div class="course-list__item__price">{course.price}</div>
      <a class="btn" href={`/course/details?cid=${course.id}`}>Join now</a>
    </div>
  {/each}
</div>
