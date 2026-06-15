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
    ],

    

    socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
