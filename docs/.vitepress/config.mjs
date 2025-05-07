import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "TIMESlice",
  vite: {     // <=== insert this section
    ssr: {
      noExternal: ["vuetify"]
    }
  },
  description: "医学影像管理与分析平台，备份地址：https://mountainandmorning.github.io/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/icon.png',
    footer: {
      message: '辽宁省心血管病影像医学重点实验室提供支持'
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '下载', link: '/download' }
    ],

    sidebar: [
      {
        text: '简介', link: '/manual/index',
      },
      {
        text: '软件激活', link: '/manual/activation',
      },
      {
        text: '数据库管理',link: '/manual/database',
      },
      {
        text: '帮助',link: '/manual/help',
      },
      {
        text: '动物园',
        link: '/manual/model',
        items: [
          { text: '图像分割', link: '/manual/pericardiumModel' },
        ]
      },
      { text: '下载', link: '/download' },
      { text: '问题', link: '/QA' }
    ],

    socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
