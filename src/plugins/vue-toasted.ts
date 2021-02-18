import Vue from 'vue';
import Toasted, { ToastOptions } from 'vue-toasted';

const DEFAULT_OPTIONS: ToastOptions = {
  duration: 5000,
  position: 'bottom-right',
};
Vue.use(Toasted, DEFAULT_OPTIONS);

Vue.toasted.register(
  'backError',
  (payload) => {
    let message = payload.response?.data?.message || payload.message;
    // if there is no message passed show default message
    if (!message && typeof payload === 'string') {
      message = payload;
    }
    if (!message) {
      console.error(payload);
      return 'Something went wrong...';
    }
    // if there is a message show it with the message
    return message;
  },
  Object.assign({}, DEFAULT_OPTIONS, { type: 'error', singleton: true }),
);

Vue.mixin({
  methods: {
    $err(payload) {
      return this.$toasted.global.backError(payload);
    },
  },
});

declare module 'vue/types/vue' {
  // @NOTE: this.$err inside Vue components
  export interface Vue {
    $err: (payload: any) => void;
  }
}

// you can also pass options, check options reference below
// https://github.com/shakee93/vue-toasted
// Vue.use(Toasted, Options);
