// @NOTE: иначе модуль добавляет свою обёртку для ошибок
import { config } from 'vuex-module-decorators';

config.rawError = true;
