<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar>
        <avatar />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>
          {{ email }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ name }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click="() => {}">
      <v-list-item-title>
        ログアウト
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  components: {
    Avatar: () => import('~/components/atoms/Avatar.vue'),
  },
  props: {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
});
</script>
