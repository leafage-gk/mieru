<template>
  <v-container class="pa-0">
    <v-row align="center" justify="center">
      <v-col class="pa-1">
        <v-avatar height="38px">
          <avatar />
        </v-avatar>
      </v-col>
      <v-col style="text-transform: none;">{{ email }}</v-col>
      <v-col>
        <v-icon>{{ mdiChevronDown }}</v-icon>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { mdiChevronDown } from '@mdi/js';
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
  },
  setup() {
    return {
      mdiChevronDown,
    };
  },
});
</script>
