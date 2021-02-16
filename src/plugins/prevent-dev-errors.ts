import { defineNuxtPlugin, onGlobalSetup } from '@nuxtjs/composition-api';
import Vue from 'vue';
import { onErrorCaptured } from 'vue-demi';

/**
 * Регистрация обработки глобальных ошибок, чтобы в development режиме автоматически не сваливаться в ошибку.
 * @description - Но всегда есть возможность нажать кнопку "Выбросить ошибку"
 */
export default defineNuxtPlugin((ctx): void => {
  const env = ctx.$config.env;

  onGlobalSetup(() => {
    onErrorCaptured((err: Error) => {
      if (env === 'development') {
        console.error(err);
        react(err).catch(ctx.error);
        return false;
      }
    });
  });
});

function react(err: Error) {
  return new Promise<void>((resolve, reject) => {
    if (!Vue.toasted) {
      if (confirm('Все сломалось, а тост-сообщения не подключены. Ошибка в консоли. Выбросить ее на странице?')) {
        return reject(err);
      }
    } else {
      const t = Vue.toasted.error(
        '!!! Произошла фатальная ошибка (всё сломалось, development режим включен), см. консоль !!!',
        {
          duration: Infinity,
          type: 'error',
          position: 'top-right',
          singleton: true,
          action: [
            {
              text: 'Выбросить ошибку',
              onClick: () => {
                reject(err);
                t.goAway();
              },
            },
            {
              text: 'Проигнорировать',
              class: 'btn btn-primary asd',
              onClick: () => {
                resolve();
                t.goAway();
              },
            },
          ],
        },
      );
    }
  });
}
