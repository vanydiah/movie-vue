<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-black">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          MovieVue
        </q-toolbar-title>

        <q-tabs v-model="tab" class="align-center">
          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered> <!-- show-if-above bordered> -->
      <q-list>
        <q-item-label header>
          Menus
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        <br /><br /><br /><br />
        <q-item-label header style="text-align: center;">
          Built with<br />Vue 3.0 &amp; Quasar v{{ $q.version }}
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-footer elevated class="bg-black">
      <q-toolbar class="justify-center">
        <q-toolbar-label>
          <div>MovieVue by <a href="http://vanydiah.carrd.co" target="_blank" style="color: #fff"><b>Vany Diah</b></a> | Data provided by <a href="https://www.themoviedb.org/" target="_blank" style="color: #fff">TMDB</a></div>
        </q-toolbar-label>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import { useRoute } from 'vue-router';

const linksList = [
  {
    title: 'Movies',
    caption: '',
    icon: 'home',
    route: { name: 'home' },
  },
  {
    title: 'My Collection',
    caption: '',
    icon: 'movie',
    route: { name: 'my-collection' },
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
