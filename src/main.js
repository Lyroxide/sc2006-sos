import { createApp } from 'vue'
import naive from 'naive-ui'
import router from "./router";
import { createMetaManager, plugin as metaPlugin } from 'vue-meta'
import store from './store'
import SOS from './SOS/SOS.vue'
import {FontAwesomeIcon} from "./plugins/font-awesome";
import './style.css'
import 'bootstrap'


const metaManager = createMetaManager();

const app = createApp(SOS);
app.use(naive);
app.use(router);
app.use(metaManager);
app.use(metaPlugin);
app.use(store);
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app');

