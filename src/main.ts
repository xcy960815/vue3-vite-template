import { createApp } from 'vue';
import App from './App.vue';

// import Layout from './components/layout.vue'
import './index.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import huskyLeftMenuPlus from 'husky-left-menu-plus';

import 'husky-left-menu-plus/dist/index.css';
import store from './store/index';
import router from './router/index';

createApp(App)
	.use(router)
	.use(store)
	.use(ElementPlus)
	.use(huskyLeftMenuPlus)
	.mount('#app');
