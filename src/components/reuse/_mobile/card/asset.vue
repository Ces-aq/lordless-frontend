<template>
  <div class="mobile-candy-card">
    <div class="d-flex row-flex candy-card-container">
      <p class="line-height-0 card-candy-icon">
        <svg>
          <use :xlink:href="`#coin-${info.candy.symbol.toLocaleLowerCase()}`"/>
        </svg>
      </p>
      <div class="v-flex card-candy-cnt">
        <p>
          <span>{{ info.count | formatMoneyNumber }} {{ info.candy.symbol }}</span>
          <span class="candy-price">× $ {{ 1 / info.candy.USD2TokenCount | formatDecimal }}</span>
        </p>
        <p class="TTFontBolder candy-value">≈ $ {{ info.value | formatDecimal }}</p>
      </div>
      <p class="card-candy-percent">{{ info.value / ( totalValue || 1 ) | formatDecimal({ len: 2, percentage: true }) }}%</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobile-candy-card',
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    totalValue: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .mobile-candy-card {
    padding: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(111, 111, 111, .3);
  }
  .card-candy-icon {
    padding: 8px;
    width: 36px;
    height: 36px;
    fill: #fff;
    background-color: #4586fc;
    border-radius: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .card-candy-cnt {
    margin-left: 16px;
    font-size: 14px;
    color: #555;
  }
  .candy-price {
    margin-left: 12px;
    color: #777;
  }
  .candy-value {
    font-size: 16px;
    color: #4586fc;
  }
  .card-candy-percent {
    font-size: 14px;
    color: #777;
  }
</style>
