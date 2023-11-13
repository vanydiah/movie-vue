<template>
  <q-item clickable :to="route" exact>
    <q-item-section v-if="icon" avatar style="padding-right: 0; min-width: 30px;">
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label><b>{{ title }}</b></q-item-label>
      <!-- <q-item-label caption>{{ caption }}</q-item-label> -->
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    route: {
      type: String,
      default: '',
    },

    icon: {
      type: String,
      default: '',
    },
  },
});
</script>
