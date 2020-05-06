<template>
  <v-app-bar
    color="primary"
    dark
    dense
    clipped-left
    fixed
    elevate-on-scroll
    app
  >
    <toolbar-nav-icon @click="onClickNavIcon" />
    <logo :title="title" />
    <v-spacer />
    <v-toolbar-items>
      <v-menu v-model="menuToggle" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <toolbar-account :email="email" />
          </v-btn>
        </template>
        <toolbar-account-menu :email="email" :name="name" />
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  toRefs,
} from '@vue/composition-api';

import { settingsKeys, useBreakpoint } from '~/hooks';

export default defineComponent({
  components: {
    Logo: () => import('~/components/atoms/Logo.vue'),
    ToolbarNavIcon: () => import('~/components/atoms/ToolbarNavIcon.vue'),
    ToolbarAccount: () => import('~/components/molecules/ToolbarAccount.vue'),
    ToolbarAccountMenu: () =>
      import('~/components/molecules/ToolbarAccountMenu.vue'),
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  setup(props, ctx) {
    const title = inject(settingsKeys.title, '');
    const { smAndDown } = useBreakpoint(ctx, ['smAndDown']);
    const state = reactive({
      menuToggle: false,
      email: 'reiwa@leafage.co.jp',
      name: '令和 太郎',
    });
    const onClickNavIcon = () => {
      ctx.emit('input', !props.value);
    };
    return {
      ...toRefs(state),
      onClickNavIcon,
      title,
      smAndDown,
    };
  },
});
</script>
