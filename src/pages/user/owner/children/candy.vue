<template>
  <div class="d-flex user-candy-box">
    <div class="d-flex v-flex col-flex user-candy-container">
      <h1 class="d-flex f-align-baseline text-cap owner-children-title">
        <span class="v-flex">Candy</span>
        <el-tooltip class="item" effect="dark" content="Coming soon" placement="left">
          <span>
            <lordless-btn
              class="d-flex f-align-center user-withdraw-btn"
              theme="deep-blue"
              disabled
              shadow
              inverse>
              <svg>
                <use xlink:href="#icon-withdraw"/>
              </svg>
              <span>Withdraw</span>
            </lordless-btn>
          </span>
        </el-tooltip>
      </h1>
      <div
        class="v-flex d-flex relative owner-children-cnt user-tabs-box">
        <el-tabs
          class="relative v-flex"
          v-model="candyTab"
          @tab-click="switchTab">
          <el-tab-pane
            label="Balance"
            name="balance">
            <!-- <div v-if="candyLoading" class="user-candy-skeletion">
              <p></p>
              <div class="d-flex f-justify-around" v-for="item of [1,2]" :key="item">
                <p class="skeletion-breath"></p>
                <p class="skeletion-breath"></p>
                <p class="skeletion-breath"></p>
                <p class="skeletion-breath"></p>
              </div>
            </div> -->
            <transition name="ld-hide-fade">
              <div v-if="candyLoading" class="user-candy-skeletion">
                <p></p>
                <div class="d-flex f-justify-around" v-for="item of [1,2]" :key="item">
                  <p class="skeletion-breath"></p>
                  <p class="skeletion-breath"></p>
                  <p class="skeletion-breath"></p>
                  <p class="skeletion-breath"></p>
                </div>
              </div>
              <div
                v-else-if="!userAssets.total && !candyLoading"
                class="d-flex v-flex col-flex f-auto-center text-center no-asset-box absolute">
                <svg>
                  <use xlink:href="#icon-no-candy"/>
                </svg>
                <p>You have no candy now.</p>
                <div class="d-flex sm-col-flex f-auto-center TTFontBolder">
                  <span>Apply a</span>
                  <span class="inline-block sm-mar-t1">
                    <lordless-btn class="no-asset-btn TTFontBolder" theme="default" shadow @click="$router.push('/taverns')">Task</lordless-btn>
                  </span>
                  <span class="sm-mar-t3">or buy a Tavern in</span>
                  <span class="inline-block sm-mar-t1 sm-mar-b3">
                    <lordless-btn class="no-asset-btn TTFontBolder" theme="default" shadow @click="$router.push('/taverns')">Taverns</lordless-btn>
                  </span>
                </div>
              </div>
              <div v-else class="relative">
                <div class="d-flex f-align-center text-center candy-tabs-title">
                  <el-col :span="5" :xs="8">Asset</el-col>
                  <el-col :span="5" :xs="8">Quantity</el-col>
                  <!-- <el-col :span="5">Valued by ETH(≈)</el-col> -->
                  <el-col :span="6" :xs="0" class="sm-hidden">Price(≈)</el-col>
                  <el-col :span="6" :xs="8">Total(≈)</el-col>
                </div>
                <div
                  class="d-flex f-align-center text-center candy-balance-item candy-list-item"
                  v-for="(asset, index) of userAssets.list"
                  :key="index">
                  <el-col :span="5" :xs="8" class="d-flex f-auto-center candy-symbol">
                    <p class="d-flex f-align-end">
                      <span class="inline-block candy-coin-svg">
                        <svg>
                          <use :xlink:href="`#coin-${asset.candy.symbol.toLocaleLowerCase()}`"/>
                        </svg>
                      </span>
                      <span class="text-upper">{{ asset.candy.symbol }}</span>
                    </p>
                  </el-col>
                  <el-col :span="5" :xs="8">
                    <span>{{ asset.count | formatDecimal }}</span>
                    <span class="text-upper"> {{ asset.candy.symbol }}</span>
                  </el-col>
                  <!-- <el-col :span="5">
                    <span>{{ 1 / asset.candy.eth2TokenCount }}</span>
                    <span class="text-upper"> ETH</span>
                  </el-col> -->
                  <el-col :span="6" :xs="0" class="sm-hidden">
                    <span>$</span>
                    <span> {{ 1 / asset.candy.USD2TokenCount | formatDecimal }}</span>
                  </el-col>
                  <el-col :span="6" :xs="8">
                    <span>$</span>
                    <span> {{ asset.count / asset.candy.USD2TokenCount | formatDecimal }}</span>
                  </el-col>
                </div>
              </div>
            </transition>
          </el-tab-pane>
          <el-tab-pane
            class="d-flex candy-tab-box"
            :class="{ 'cursor-no-drop': !userAssets.total }"
            :disabled="!userAssets.total"
            label="History"
            name="history">
            <!-- <div v-if="candyLoading" class="user-candy-skeletion">
              <p></p>
              <div class="d-flex f-justify-around" v-for="item of [1,2]" :key="item">
                <p class="skeletion-breath"></p>
                <p class="skeletion-breath"></p>
                <p class="skeletion-breath"></p>
                <p class="skeletion-breath"></p>
              </div>
            </div> -->
            <transition name="ld-hide-fade">
              <div v-if="candyLoading" class="user-candy-skeletion">
                <p></p>
                <div class="d-flex f-justify-around" v-for="item of [1,2]" :key="item">
                  <p class="skeletion-breath"></p>
                  <p class="skeletion-breath"></p>
                  <p class="skeletion-breath"></p>
                  <p class="skeletion-breath"></p>
                </div>
              </div>
              <div
                v-else-if="!userRecords.total && !candyLoading"
                class="d-flex v-flex col-flex f-auto-center text-center no-asset-box absolute">
                <svg>
                  <use xlink:href="#icon-no-candy"/>
                </svg>
                <p>You have no records now.</p>
                <div class="d-flex sm-col-flex f-auto-center TTFontBolder">
                  <span>Apply a</span>
                  <span class="inline-block sm-mar-t1">
                    <lordless-btn class="no-asset-btn TTFontBolder" theme="default" shadow @click="$router.push('/taverns')">Task</lordless-btn>
                  </span>
                  <span class="sm-mar-t3">or buy a Tavern in</span>
                  <span class="inline-block sm-mar-t1 sm-mar-b3">
                    <lordless-btn class="no-asset-btn TTFontBolder" theme="default" shadow @click="$router.push('/taverns')">Taverns</lordless-btn>
                  </span>
                </div>
              </div>
              <div v-else class="v-flex relative candy-rewards-box">
                <div class="d-flex f-align-center text-center candy-tabs-title">
                  <el-col :span="aside.show ? 8 : 4" :xs="8">Asset</el-col>
                  <el-col :span="aside.show ? 8 : 6" :xs="8">Type</el-col>
                  <el-col v-if="!aside.show" :span="6" :xs="0">Date</el-col>
                  <el-col :span="aside.show ? 8 : 6" :xs="8">Quantity</el-col>
                </div>
                <div class="candy-reward-list">
                  <div
                    class="d-flex f-align-center text-center text-ellipsis candy-reward-item  candy-list-item"
                    :class="{ 'choose': rewardModels[record._id], 'drop': parseInt(record.status) === 1 }"
                    v-for="(record, index) of userRecords.list"
                    :key="index"
                    @click="chooseReward($event, record)">
                    <el-col :span="aside.show ? 8 : 4" :xs="8" class="d-flex f-auto-center candy-symbol">
                      <p class="d-flex f-align-end">
                        <span class="inline-block candy-coin-svg">
                          <svg>
                            <use :xlink:href="`#coin-${record.reward.candy.symbol.toLocaleLowerCase()}`"/>
                          </svg>
                        </span>
                        <span class="text-upper">{{ record.reward.candy.symbol }}</span>
                      </p>
                    </el-col>
                    <el-col :span="aside.show ? 8 : 6" :xs="8">
                      <span>{{ record.lord ? 'LORD' : 'Task' }}</span>
                      <span class="text-cap"> Reward</span>
                    </el-col>
                    <el-col v-if="!aside.show" :span="6" :xs="0">
                      <span>{{ record.update_at | dateFormat }}</span>
                    </el-col>
                    <el-col :span="aside.show ? 8 : 6" :xs="8" class="d-flex f-align-center candy-quantity">
                      <span class="line-height-0 candy-down-svg">
                        <svg>
                          <use xlink:href="#icon-download"/>
                        </svg>
                      </span>
                      <span class="TTFontBolder">+{{ record.lord ? record.lord.reward.count : record.executor.reward.count | formatDecimal }}</span>
                    </el-col>
                  </div>
                </div>
              </div>
            </transition>
            <candy-aside
              :loading="rewardLoading"
              :aside="aside"
              @close="initAside"/>
            <!-- <div class="candy-reward-aside">
              <transition name="ld-suspension-hide-fade">
                <div v-if="aside.show && rewardLoading" class="reward-aside-skeletion">
                  <div class="aside-skeletion-container skeletion-breath">
                    <h1></h1>
                    <p></p>
                    <div>
                      <p></p>
                      <p></p>
                    </div>
                    <div>
                      <p></p>
                      <p></p>
                    </div>
                    <div>
                      <p></p>
                      <p></p>
                    </div>
                    <div class="big">
                      <p></p>
                      <h2></h2>
                    </div>
                    <div class="big">
                      <p></p>
                      <p></p>
                    </div>
                    <div>
                      <p></p>
                      <p></p>
                    </div>
                    <div>
                      <p></p>
                      <div></div>
                    </div>
                  </div>
                </div>
              </transition>
              <transition name="ld-hide-fade">
                <div v-if="!rewardLoading && aside.data && aside.show" class="reward-aside-container text-nowrap">
                  <h1>+{{ (aside.lord ? aside.data.lord.reward.count : aside.data.executor.reward.count) | formatDecimal }} <span class="text-upper">{{ aside.data.reward.candy.symbol }}</span></h1>
                  <lordless-btn theme="green" inverse class="text-cap reward-aside-btn">{{ aside.lord ? 'LORD' : 'Task' }} Reward</lordless-btn>
                  <ul class="candy-aside-ul candy--value">
                    <li>
                      <p>Valued by <span class="text-upper">USD</span></p>
                      <p>$ {{ ((aside.lord ? aside.data.lord.reward.count : aside.data.executor.reward.count) / aside.data.reward.candy.USD2TokenCount) | formatDecimal }}</p>
                    </li>
                    <li>
                      <p>Date</p>
                      <p>{{ aside.data.update_at | dateFormat }}</p>
                    </li>
                  </ul>
                  <ul class="candy-aside-ul candy-ldb-related">
                    <li>
                      <p>Related Tavern</p>
                      <p class="aside-big-name"><link-symbol :link="`/tavern/${aside.data.ldb.info._id}`">#{{ aside.data.ldb.info._id }}</link-symbol></p>
                    </li>
                    <li>
                      <p>Name</p>
                      <p>{{ aside.data.ldb.info.name.zh }}</p>
                    </li>
                    <li>
                      <p>Coordinate</p>
                      <p>{{ aside.data.ldb.info.chain.lng | transferCoords | sliceStr }}, {{ aside.data.ldb.info.chain.lat | transferCoords | sliceStr }}</p>
                    </li>
                    <li>
                      <p>LORD</p>
                      <p class="candy-aside-blockies">
                        <lordless-blockies
                          :seed="aside.data.ldb.info.lord"
                          :scale="5"
                          jump
                          theme="light"
                          radius="5px"></lordless-blockies>
                      </p>
                    </li>
                  </ul>
                  <ul class="candy-aside-ul candy-task-related">
                    <li>
                      <p>Related Task</p>
                      <p class="aside-big-name"><link-symbol :link="`/task/${aside.data._id}`">#{{ aside.data._id }}</link-symbol></p>
                    </li>
                    <li>
                      <p>Detail</p>
                      <p>{{ aside.data.ldbTaskType.name }}</p>
                    </li>
                    <li>
                      <p>Reward percentage</p>
                      <p>{{ (aside.lord ? aside.data.lord.reward.percentage : aside.data.executor.reward.percentage) | formatDecimal({ len: 3, percentage: true }) }}%</p>
                    </li>
                    <li>
                      <p>Employee</p>
                      <p class="candy-aside-blockies">
                        <lordless-blockies
                          :seed="aside.lord ? aside.data.lord.info : aside.data.executor.info"
                          :scale="5"
                          jump
                          theme="light"
                          radius="5px"></lordless-blockies>
                      </p>
                    </li>
                  </ul>
                </div>
              </transition>
            </div> -->
          </el-tab-pane>
        </el-tabs>
        <lordless-pagination
          v-if="showPagination"
          class="owner-children-pagination"
          :scrollE="$el"
          :scrollPE="pageScrollPE"
          :total="userRecords.total"
          background
          @currentChange="pageChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import CandyAside from '@/components/reuse/owner/candy/aside.vue'
import { getUserAssets, getUserCandyHistory, getTaskById } from 'api'

import { mapState } from 'vuex'
export default {
  data: () => {
    return {

      // 当前 tab 区域
      candyTab: 'balance',

      // 改变之前的 tab 区域
      currentTab: 'balance',

      candyLoading: true,

      // 用户账户信息
      userAssets: {
        list: [],
        pn: 1,
        ps: 10,
        total: 0
      },

      // 用户交易记录信息
      userRecords: {
        pn: 1,
        ps: 10,
        list: [],
        total: 0
      },

      // 选中的交易记录
      rewardModels: {},

      rewardLoading: false,

      // 交易记录侧边栏参数
      aside: {
        show: false,
        data: null,
        lord: true
      }
    }
  },
  computed: {
    ...mapState('user', [
      'userInfo'
    ]),
    showPagination () {
      return this.candyTab !== 'balance' && this.userRecords.total && !this.candyLoading
    },
    pageScrollPE () {
      return document.getElementById('user-main-content')
    }
  },
  components: {
    CandyAside
  },
  methods: {

    /**
     * 切换 tab
     */
    switchTab (evt) {
      if (this.currentTab === this.candyTab) return
      this.currentTab = this.candyTab
      this.initAside()
      if (this.candyTab === 'balance') this.getAssets()
      else this.getRecords()
    },

    /**
     * 查看糖果历史详情事件
     */
    async chooseReward (evt, data = {}) {
      const { _id } = data
      if (this.rewardModels[_id]) {
        this.initAside()
        return
      }
      this.rewardModels = {}
      this.rewardLoading = true
      this.$set(this.rewardModels, _id, true)
      this.$set(this.aside, 'show', true)
      const res = await getTaskById({ taskId: _id })
      if (res.code === 1000 && res.data) {
        this.$set(this.aside, 'data', res.data)
      }
      this.rewardLoading = false
      this.$set(this.aside, 'lord', !!data.lord)
    },

    /**
     * 初始化 candy aside
     */
    async initAside () {
      this.rewardModels = {}
      this.$set(this.aside, 'show', false)
      this.$set(this.aside, 'data', null)
    },

    /**
     * 获取用户糖果账户
     */
    async getAssets () {
      if (this.candyTab !== 'balance') return
      this.candyLoading = true
      const res = await getUserAssets()
      if (res.code === 1000 && res.data) {
        this.userAssets = res.data
      }
      this.candyLoading = false
    },

    /**
     * 获取用户糖果获取历史
     */
    async getRecords ({ address = this.userInfo.address, pn = 1, ps = 10 } = {}) {
      if (this.candyTab !== 'history') return
      this.candyLoading = true
      const params = {
        pn,
        ps
      }
      const res = await getUserCandyHistory(params)
      if (res.code === 1000) {
        this.userRecords = res.data
      }
      this.candyLoading = false
    },

    pageChange (pn) {
      this.getRecords({ pn })
    }
  },
  watch: {
    userInfo (val) {
      if (this.candyTab === 'balance') {
        this.getAssets()
      } else {
        this.getRecords()
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getAssets()
    })
  }
}
</script>

<style lang="scss" scoped>
  .user-candy-box {
    // padding: 30px;
    font-size: 16px;
  }

  .user-withdraw-btn {
    padding: 10px 15px;
    font-size: 16px;
    >svg {
      margin-right: 5px;
      width: 25px;
      height: 25px;
    }
  }

  // user-candy-skeletion
  .user-candy-skeletion {
    position: absolute;
    width: 100%;
    left: 0;
    top: 70px;
    // margin-top: 35px;
    >p {
      height: 25px;
      background-color: $--skeletion-light;
    }
    >div {
      margin-top: 15px;
      padding: 20px;
      background-color: $--skeletion-light;
      border-radius: 5px;
      >p {
        width: 150px;
        height: 25px;
        background-color: $--skeletion-dark;
      }
    }
  }

  // .ld-candy-pagination {
  //   position: absolute;
  //   left: 0;
  //   bottom: -70px;
  // }

  // .user-candy-tabs {
  //   position: relative;
  //   @include margin('top', 35px, 1);
  //   @include margin('bottom', 120px, 1);
  // }

  .candy-tabs-title {
    margin-top: 25px;
    margin-bottom: 10px;
    color:#bbb;
  }
  .candy-list-item {
    color: #999;
    .candy-symbol {
      color: #777;
      >p {
        margin-left: 15%;
        width: 90px;
      }
    }
  }

  .candy-balance-item {
    padding-top: 25px;
    padding-bottom: 25px;
    background-color: #fff;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, .1);
    border-radius: 5px;
    span {
      display: inline-block;
    }
    &:not(:first-of-type) {
      margin-top: 15px;
    }
  }
  .candy-coin-svg {
    margin-right: 10px;
    width: 24px;
    height: 24px;
  }
  .candy-down-svg {
    margin-right: 5px;
    margin-left: 35%;
    width: 20px;
    height: 20px;
  }
  .candy-reward-list {
    box-shadow: 0px 5px 20px 2px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .candy-reward-item {
    padding-top: 25px;
    padding-bottom: 25px;
    background-color: #fff;
    cursor: pointer;
    @include padding('right', 10px, 1, -2);
    span {
      display: inline-block;
    }
    &:first-of-type {
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    &:last-of-type {
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    &:not(:last-of-type) {
      border-bottom: 1px solid rgba(0, 0, 0, .1);
    }
    &.choose {
      color: #fff;
      fill: #fff;
      background-image: linear-gradient(45deg, rgba(22, 34, 42, 1), rgba(58, 96, 115, 1));
      .candy-quantity {
        color: #fff;
        fill: #fff;
      }
      .candy-symbol {
        color: #fff;
      }

      // background-image: linear-gradient(45deg, #16222A, #3A6073);
    }
    &.drop {
      .candy-quantity {
        color: $--text-red-color;
        fill: $--text-red-color;
      }
    }
  }
  .candy-quantity {
    color: #4586FC;
    fill: #4586FC;
    .candy-down-svg {
      margin-right: 3px;
    }
  }

  // reward-aside-skeletion
  .reward-aside-skeletion {
    margin-left: 30px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 30px 20px 50px 40px;
    background-color: $--skeletion-light;
  }
  .aside-skeletion-container {
    border-radius: 5px;
    >h1 {
      width: 80px;
      height: 50px;
      background-color: $--skeletion-dark;
    }
    >p {
      margin-top: 6px;
      width: 60px;
      height: 25px;
      border-radius: 5px;
      background-color: $--skeletion-dark;
    }
    >div {
      margin-top: 10px;
      &.big {
        margin-top: 25px;
      }
      >p {
        background-color: $--skeletion-dark;
        &:nth-of-type(1) {
          width: 120px;
          height: 20px;
        }
        &:nth-of-type(2) {
          margin-top: 6px;
          width: 120px;
          height: 25px;
        }
      }
      >h2 {
        margin-top: 10px;
        height: 30px;
        background-color: $--skeletion-dark;
      }
      >div {
        width: 30px;
        height: 30px;
        border-radius: 5px;
        background-color: $--skeletion-dark;
      }
    }
  }

  // // candy-reward-aside
  // .candy-tab-box {
  //   &.showAside {
  //     .candy-reward-aside {
  //       padding-left: 30px;
  //       width: 350px;
  //       height: inherit;
  //       opacity: 1;
  //       visibility: visible;
  //     }
  //     .reward-aside-container {
  //       opacity: 1;
  //       visibility: visible;
  //       transition: all .3s .2s;
  //     }
  //   }
  // }
  // .candy-reward-aside {
  //   position: relative;
  //   color: #fff;
  //   width: 0;
  //   height: 0;
  //   opacity: 0;
  //   visibility: hidden;
  //   overflow: hidden;
  //   transition: all .3s;
  // }
  // .reward-aside-container {
  //   position: relative;
  //   padding: 30px 20px 50px 40px;
  //   border-radius: 5px;
  //   background-image: linear-gradient(45deg, rgba(22, 34, 42, 1), rgba(58, 96, 115, 1));

  //   opacity: 0;
  //   background-color: transparent;
  //   transition: all .3s;
  //   z-index: 1;
  //   >h1 {
  //     font-family: $--font-TTNormsMedium;
  //     font-weight: normal;
  //     font-size: 38px;
  //     >span {
  //       font-size: 28px;
  //     }
  //   }
  // }
  // .reward-aside-btn {
  //   padding: 4px 6px;
  //   font-size: 12px;
  // }
  // .candy-aside-ul {
  //   @include margin('top', 25px, 1);
  //   >li {
  //     font-size: 16px;
  //     @include margin('top', 10px, 1);
  //     >p {
  //       &:first-of-type {
  //         font-size: 14px;
  //       }
  //     }
  //     .aside-big-name {
  //       font-size: 28px;
  //     }
  //   }
  // }
  // .candy-aside-blockies {
  //   width: 30px;
  //   height: 30px;
  //   @include margin('top', 6px, 1);
  // }
</style>
