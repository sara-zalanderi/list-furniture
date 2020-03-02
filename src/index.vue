<template>
  <div id="app">
    <div class="furniture-header">
      <div class="furniture-header__searchbox">
        <input 
          type="text" 
          class="width-100"
          placeholder="Search Furniture" 
          v-model="searchQuery" 
        />
      </div>
      <div class="furniture-header__checkbox">
        <input
          type="text"
          class="furniture-header__checkbox--input"
          placeholder="Furniture Style"
          @click="showStyle = !showStyle"
          readonly
        />
        <div
          class="furniture-header__style"
          v-show="showStyle"
        >
          <div
            class="furniture-header__style--dropdown"
            v-for="(item, index) in furnitureLists.furniture_styles"
            :key="index"
          >
            {{ item }}
            <input
              type="checkbox"
              class="furniture-header__style--check"
              v-model="furnitureStyle"
              :value="item"
            />
          </div>
        </div>
      </div>
      <div class="furniture-header__checkbox">
        <input
          type="text"
          class="furniture-header__checkbox--input"
          placeholder="Delivery Time"
          @click="showDelivery = !showDelivery"
          readonly
        />
        <div
          class="furniture-header__style"
          v-show="showDelivery"
        >
          <div
            class="furniture-header__style--dropdown"
            v-for="(item, index) in deliveryTime"
            :key="index"
          >
            {{ item }}
            <input
              type="checkbox"
              class="furniture-header__style--check"
              v-model="deliveryDays"
              :value="item"
            />
          </div>
        </div>
      </div>
    </div>
    <div 
      class="furniture-body"
      v-if="furnitureList.length"
    >
      <div
        class="furniture-body__list"
        v-for="(item, index) in resultQuery"
        :key="index"
      >
        <furniture-section :furniture-data="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import furnitureLists from './config/furniture-list.json';
import furnitureSection from './components/FurnitureSection';

export default {
  name: 'App',
  components: {
    furnitureSection,
  },
  data() {
    return {
      furnitureList: {},
      furnitureLists,
      searchQuery: null,
      showStyle: false,
      showDelivery: false,
      furnitureStyle: [],
      deliveryDays: [],
      deliveryTime: ['1 week', '2 weeks', '1 month', 'More than 1 month']
    };
  },
  computed: {
    resultQuery() {
      let filtered = this.furnitureList;
      if (this.searchQuery) {
        filtered = filtered.filter(
          m => this.searchQuery.toLowerCase().split(' ').every(v => m.name.toLowerCase().includes(v))
        );
      }
      if (this.deliveryDays.length) {
        let delivDays = this.deliveryDays;
        let minDays;
        if(delivDays == "1 week"){
          delivDays = 8;
          minDays = 0;
        }else if(delivDays == "2 weeks"){
          delivDays = 15;
          minDays = 7
        }else if(delivDays == "1 month"){
          delivDays = 31;
          minDays = 14;
        }else{
          delivDays = 30;
        }

        if(this.deliveryDays == "More than 1 month"){
          filtered = filtered.filter(
            m => m.delivery_time > delivDays
          );
        }else{
          filtered = filtered.filter(
            m => (m.delivery_time < delivDays) && (m.delivery_time > minDays)
          );
        }
      }
      if (this.furnitureStyle.length) {
        filtered = filtered.filter(
          item => item.furniture_style.find(
            m => this.furnitureStyle.includes(m)
          ),
        );
      }
      return filtered;
    },
  },
  mounted() {
    this.$http
      .get('http://www.mocky.io/v2/5c9105cb330000112b649af8')
      .then(response => (this.furnitureList = response.data.products))
      .catch(error => (this.furnitureList = furnitureLists.products));
  },
}
</script>

<style>
  body{
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }
  input[type="text"]{
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,.75);
    display: block;
    margin: 0;
    padding: 4px 0;
    background: 0 0;
    outline: none;
  }
  ::placeholder {
    color: rgba(255,255,255,.75);
  }
  .width-100{
    width: 100%;
  }
  .furniture-header{
    background: #106CC8;
    padding: 0 20%;
    box-sizing: border-box;
    position: relative;
    white-space: nowrap;
  }
  .furniture-header__searchbox{
    width: 50%;
    box-sizing: border-box;
    padding: 10px;
  }
  .furniture-header__checkbox{
    width: 50%;
    box-sizing: border-box;
    display: inline-block;
    padding: 10px;
  }
  .furniture-header__checkbox--input{
    width: 100%;
    cursor: pointer;
  }
  .furniture-header__style{
    position: absolute;
    background: #fff;
    width: 300px;
    box-sizing: border-box;
    z-index: 10;
    border: 1px solid #ddd;
    padding: 5px 0;
  }
  .furniture-header__style--dropdown{
    padding: 5px 10px;
  }
  .furniture-header__style--check{
    position: absolute;
    right: 5px;
  }
  .furniture-header__options{
    width: 50%;
    box-sizing: border-box;
    display: inline-block;
    padding: 10px;
  }
  .furniture-body{
    padding: 0 20%;
    box-sizing: border-box;
  }
  .furniture-body__list{
    width: 50%;
    box-sizing: border-box;
    display: inline-block;
    padding: 10px;
  }
</style>
