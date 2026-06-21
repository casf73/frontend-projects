<template>
  <div class="home">
    <div class="container">
      <div class="card">
        <div class="card-body text-start">
            <slot></slot> <!--在复用的时候，slot可以实现具体内容的输入-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.container{
  margin-top:10px;
}
</style>
