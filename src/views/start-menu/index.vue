<template>
  <div class="menu-container">
    <div class="menu-content win98-bezel">
      <div class="branding">
        <div class="logo--text">
          <span>Window</span>
          <span>ME</span>
        </div>
      </div>
      <template v-for="(menu, index) in menus">
        <div :key="index" class="menu-content--item">
          <div class="item-icon">
            <img
              class="icon"
              name="programs"
              size="24"
              width="24"
              height="24"
              src="data:image/gif;base64,R0lGODlhGAAXAIQKAAAAAAYAfQYAfggAlQgAlhcA/4MAAIQAfP8AAAB7AICAgI6QAI+RANGOAAD+ALi4uLm5ucbITMfJSwD9+//HAP/Gh+Dgzvf5APf5fvf5f/j6f/j45vj45/n554CAgICAgCH5BAEKAB8ALAAAAAAYABcAAAXi4PcxZEkCYqquy5a9MMaga81IeK6bvNpunI1wCCQOJbRRB5apNDXO6LOCTDE2mKZOEtniukkGJ6Mom89oNOBKHlAIgQBBAK8HNgLOPbDeVBQEDQSDcnV2g4h9ZA+MjY6Pjn1/DxaVlpeYlQ8ALYsWRkFGRRabDB2Tn0IdohurQqR9GAqUQggGQgVGCa+lYwoQnwgXtxsTBblACQkdsFeoGwa2HBzHD0IJDrnNJLOfD8QHDwcHQcq7sB8AAN2s7egi7GZC8hvy7x/sRKGgG/fdmQAtbUoxC5LBR0kUqFvIsKHDEAA7"
              alt=""
            >
          </div>
          <div class="item-title">
            <span>关于我</span>
          </div>
          <div v-if="menu.hasChildren" class="item-open--btn">
            <span>
              <img
                class="black"
                size="custom"
                name="chevron-black-right"
                src="data:image/gif;base64,R0lGODlhBAAHAIABAAAAAAQz/yH5BAEKAAEALAAAAAAEAAcAAAIIRA4WaeyrVCgAOw=="
                alt=""
              >
              <img
                class="white"
                size="custom"
                name="chevron-white-right"
                src="data:image/gif;base64,R0lGODlhBAAHAIABAP///wQz/yH5BAEKAAEALAAAAAAEAAcAAAIIRA4WaeyrVCgAOw=="
                alt=""
              >
            </span>
          </div>
        </div>
        <div v-if="menu.divider" :key="index" class="divider" />
      </template>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'StartMenu',
  props: {
    window: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menus: [
        {
          title: '关于我',
          divider: true,
          hasChildren: true,
          children: [
            {
              title: '关于我',
              divider: true
            }
          ]
        }, {
          title: '关于我',
          divider: false,
          hasChildren: false
        }, {
          title: '关于我',
          divider: false,
          hasChildren: false
        }, {
          title: '关于我',
          divider: true,
          hasChildren: false
        }
      ]
    }
  },
  created() {},
  methods: {
    eventCallBack({ event, eventName }) {
      this.$emit('windowEventCallBack', {
        uuid: this.window.uuid,
        event: event,
        eventName: eventName
      })
    }
  }
}
</script>

<style lang="less" scoped>
.menu-container {
  z-index: 9999;
  position: absolute;
  top: -256px;
  .menu-content {
    height: 256px;
    width: 150px;
    display: flex;
    flex-direction: column;
    padding-left: 22px;
    .menu-content--item {
      &:hover {
        background: var(--highlightBackground);
        color: var(--highlightForeground);
        .item-open--btn > span > .black {
          display: none;
        }
        .item-open--btn > span > .white {
          display: inline-block;
        }
      }
      height: 36px;
      line-height: 40px;
      display: flex;
      font-family: system;
      font-size: 10px;
      color: var(--black);
      text-decoration: none;
      position: relative;
      white-space: nowrap;
      cursor: default;
      justify-content: space-between;
      .item-icon {
        width: 30px;
        padding: 5px 0 0 7px;
      }
      .item-title {
        text-align: left;
        flex: 1;
        padding-left: 18px;
        span {
          font-size: calc(14 * var(--px));
          font-weight: 400;
        }
      }
      .item-open--btn {
        padding-right: 15px;
        width: 10px;
        span > .black {
          display: inline-block;
        }
        span > .white {
          display: none;
        }
      }
    }
    .branding {
      position: absolute;
      background: var(--highlightBackground);
      background-image: linear-gradient(
        0deg,
        var(--highlightBackground),
        var(--highlightBackground2)
      );
      color: var(--highlightForeground);
      line-height: 21px;
      left: var(--px);
      top: var(--px);
      bottom: var(--px);
      font-size: 16px;
      width: 21px;
      font-family: system;
      background-repeat: no-repeat;
      background-position: bottom;
      .logo--text {
        position: absolute;
        left: 100%;
        bottom: 0;
        transform-origin: bottom left;
        transform: rotate(-90deg);
        width: 100px;
        padding-left: 5px;
        white-space: nowrap;
      }
    }
  }
}
.divider {
  display: block;
  border-top: var(--px) solid var(--grayDark);
  border-bottom: var(--px) solid var(--white);
}
</style>
