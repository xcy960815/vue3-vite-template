<template>
	<div ref="refHeaderMenu" class="header-menu">
		<el-menu
			:defaultActive="selectKeys"
			mode="horizontal"
			backgroundColor="#001529"
			textColor="rgba(255,255,255,0.65)"
			activeTextColor="#fff"
		>
			<template v-for="menu in menus" :key="menu.key">
				<el-submenu
					v-if="menu.children && menu.children.length > 0"
					:index="menu.key"
					popper-class="husky-header-popper"
					:popper-append-to-body="true"
				>
					<template #title>{{ menu.name }}</template>
					<template
						v-for="childrenMenu in menu.children"
						:key="childrenMenu.key"
					>
						<el-submenu
							v-if="childrenMenu.children && childrenMenu.children.length > 0"
							:index="childrenMenu.key"
							popper-class="husky-header-popper"
							:popper-append-to-body="true"
						>
							<template #title>{{ childrenMenu.name }}</template>
							<template
								v-for="childrenMenuItem in childrenMenu.children"
								:key="childrenMenuItem.key"
							>
								<el-menu-item :index="childrenMenuItem.key">
									<a
										:href="childrenMenuItem.href"
										:style="{ width: childrenMenuItem.width }"
										rel="noopener"
										style="
											display: block;
											padding: 0 20px;
											text-decoration: none;
											color: inherit;
										"
										target="_blank"
										class="menu-trigger"
										>{{ childrenMenuItem.name }}</a
									>
								</el-menu-item>
							</template>
						</el-submenu>
						<el-menu-item v-else :index="childrenMenu.key">
							<a
								:href="menu.href"
								:style="{ width: menu.width }"
								rel="noopener"
								style="
									display: block;
									padding: 0 20px;
									text-decoration: none;
									color: inherit;
								"
								target="_blank"
								class="menu-trigger"
								>{{ childrenMenu.name }}</a
							>
						</el-menu-item>
					</template>
				</el-submenu>
				<el-menu-item :index="menu.key" v-else>
					<a
						:href="menu.href"
						:style="{ width: menu.width }"
						rel="noopener"
						style="
							display: block;
							padding: 0 20px;
							text-decoration: none;
							color: inherit;
						"
						target="_blank"
						class="menu-trigger"
						>{{ menu.name }}</a
					>
				</el-menu-item>
			</template>
		</el-menu>
	</div>
</template>
<script lang="ts">
import createAxios from '../../utils/axios-config';
const axiosInstance = createAxios();
import {
	defineComponent,
	ref,
	Ref,
	onMounted,
	reactive,
	toRefs,
	onUnmounted,
} from 'vue';

// 计算文件宽度的function
const getElemWidth = (text: string) => {
	const element = document.createElement('span');
	element.textContent = text;
	element.style.position = 'absolute';
	element.style.top = '-999px';
	element.style.left = '-999px';
	element.style.padding = '0px';
	document.body.appendChild(element);
	const rect = element.getBoundingClientRect();
	document.body.removeChild(element);
	return rect.width;
};
interface MenuItem {
	href: string;
	index: number;
	key: string;
	name: string;
	width?: number;
	children?: Array<MenuItem>;
}
export default defineComponent({
	name: 'Menu',
	setup() {
		const originMenusState = reactive<{ originMenus: Array<MenuItem> }>({
			originMenus: [],
		});

		const menusState = reactive<{ menus: Array<MenuItem> }>({
			menus: [],
		});

		const selectKeys: Ref<String> = ref('');

		const refHeaderMenu: Ref<any> = ref(null);

		const getMenus = async () => {
			const res = await axiosInstance.get('$$_ORIGIN_$$/api/menu/getList');

			if (res && res.statusCode === 200) {
				await setMenuItemWidth(res.data);
				generateMenus();
			}
		};
		// 给获取回来的数据添加width属性
		const setMenuItemWidth = (menus: Array<MenuItem>) => {
			originMenusState.originMenus = menus.map((menu) => {
				if (menu.children && menu.children.length) {
					menu.width = getElemWidth(menu.name) + 30;
				} else {
					menu.width = getElemWidth(menu.name) + 30;
				}
				return menu;
			});
		};

		const generateMenus = () => {
			// 获取header-menu的全部宽度
			const menuWrapWidth = (
				refHeaderMenu.value as HTMLDivElement
			).getBoundingClientRect().width;
			const menus: Array<MenuItem> = [];
			const moreMenuItem: {
				href: string;
				index: number;
				key: string;
				name: string;
				width?: number;
				children?: Array<MenuItem>;
			} = {
				href: '',
				index: 0,
				key: 'more',
				name: '更多',
				children: [],
			};

			let width = getElemWidth(moreMenuItem.name) + 60;

			originMenusState.originMenus.forEach((menu: MenuItem) => {
				if (width + menu.width! <= menuWrapWidth) {
					menus.push(menu);
					width += menu.width!;
				} else {
					moreMenuItem.children!.push(menu);
				}
			});

			menusState.menus = menus.sort((a, b) => {
				return a.index! - b.index!;
			});

			if (moreMenuItem.children!.length) {
				menus.push(moreMenuItem);
			}

			menusState.menus = menus;
			setSelectKeys();
		};

		const setSelectKeys = () => {
			let pathname = location.pathname;
			pathname = pathname === '/' ? '/index.html' : pathname;

			const findSelectedKey = (menus: Array<MenuItem>) => {
				for (let i = 0, len = menus.length; i < len; i++) {
					const menu = menus[i];

					if (!menu.children) {
						if (pathname.includes(menu.key)) {
							selectKeys.value = menu.key;
							break;
						}
					} else {
						findSelectedKey(menu.children);
					}
				}
			};

			findSelectedKey(menusState.menus);
		};

		// const handleClick = ($event) => {
		//   $event.stopPropagation()
		// }

		const debounce = (fn: Function, delay: number): Function => {
			let timer: number = 0;
			return function () {
				const arg = arguments;
				// @ts-ignore
				const _this = this;
				if (timer) {
					window.clearTimeout(timer);
				}
				timer = window.setTimeout(function () {
					fn.apply(_this, arg);
				}, delay);
			};
		};
		const debounceInstance = debounce(generateMenus, 300);
		onMounted(() => {
			// getMenus()
			// window.onresize = () => {
			//   debounceInstance()
			// }
		});

		onUnmounted(() => {
			window.onresize = null;
		});
		return {
			...toRefs(originMenusState),
			...toRefs(menusState),
			selectKeys,
			refHeaderMenu,
		};
	},
});
</script>

<style lang="less" scoped>
.header-menu {
	:deep(.el-menu--horizontal) {
		border-bottom: none;
		:deep(.el-menu-item),
		:deep(.el-submenu__title) {
			height: 52px;
			line-height: 52px;
			border-bottom: none !important;

			&:hover {
				color: #fff !important;
				background: #1890ff !important;
			}

			&.is-active {
				background: #1890ff !important;
			}
		}
		:deep(.el-menu-item) {
			padding: 0 !important;
		}
	}
}
</style>
<style lang="less">
.husky-header-popper {
	background: red;
	.el-menu-item {
		padding: 0 !important;
		&:hover {
			color: #fff !important;
			background: #1890ff !important;
		}

		&.is-active {
			background: #1890ff !important;
		}
	}
	.el-submenu__title {
		padding: 0 20px !important;
		&:hover {
			color: #fff !important;
			background: #1890ff !important;
		}

		&.is-active {
			background: #1890ff !important;
		}
	}
}
</style>
