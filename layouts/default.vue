<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data:()=> {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      overlay : false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon:'mdi-apps',
          title:'thermal',
          to: '/HelloTact'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'TestYogaApp'
    }
  },
}
</script>
