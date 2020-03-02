<template>
  <div class="furniture-list">
    <h3><strong>{{ furnitureData.name }}</strong></h3>
    <p class="furniture-list__price">
      {{ furnitureData.price | toCurrencyFormat }}
    </p>
    <p class="furniture-list__description">
      {{ furnitureData.description }}
    </p>
    <label
      class="furniture-list__style"
      v-for="(furnitureDataStyle, index) in furnitureData.furniture_style"
      v-bind:key="index"
    >
      {{ furnitureDataStyle }}
    </label>
    <p class="furniture-list__delivery">
      <strong>{{ furnitureData.delivery_time }} Delivery Days</strong>
    </p>
  </div>
</template>

<script>
export default {
  name: 'FurnitureSection',
  props: {
    furnitureData: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style>
  .furniture-list{
    border-radius: 4px;
    padding: 15px;
    position: relative;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
  }
  .furniture-list__price{
    color: #FFD41D;
    position: absolute;
    top: 22px;
    right: 15px;
  }
  .furniture-list__description{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }  
  .furniture-list__style{
    background: #106CC8;
    color: #fff;
    border-radius: 4px;
    margin-right: 5px;
    padding: 2px 7px;
  }
  .furniture-list__delivery{
    color: #106CC8;
    text-decoration: underline;
    text-align: right;
  }
</style>
