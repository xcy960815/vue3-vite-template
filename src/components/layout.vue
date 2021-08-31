<template>
	<el-container class="layout-main">
		<el-header class="layout-header">
			<layout-header v-model:collapse="isCollapse"></layout-header>
		</el-header>
		<el-container class="layout-body">
			<el-aside
				:style="{ width: !isCollapse ? '200px' : '64px' }"
				class="layout-aside"
			>
				<husky-left-menu
					:collapse="isCollapse"
					:menu-data="routeList"
					:default-active="defaultActive"
				></husky-left-menu>
			</el-aside>
			<el-main class="layout-content">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// import LayoutMenu from './menu/menu.vue';
import LayoutHeader from './header/layout-header.vue';
import { RouteItem } from '../router/index';
import filterRoute from './filter-route';
// console.log('filterRoute', filterRoute);

export default defineComponent({
	components: { /*LayoutMenu*/ LayoutHeader },
	setup() {
		const isCollapse: Ref<Boolean> = ref(false);
		const defaultActive: Ref<String> = computed(() => {
			const path = useRouter().currentRoute.value.path;
			return path;
		});
		const routeList: Ref<Array<RouteItem>> = computed(() => {
			const { getRoutes } = useRouter();
			// @ts-ignore
			const routes = getRoutes() as Array<RouteItem>;
			const filterNoPermissionRoute = (list: Array<RouteItem>) => {
				return list.filter((route: RouteItem) => {
					const hasPermission = filterRoute(route);
					// 当前菜单有权限，并且存在子菜单，继续过滤子菜单
					// 当前菜单没有权限，其子菜单也没有再检查的必要了只是针对这种只存在左侧菜单栏的情况
					if (hasPermission && route.children) {
						route.children = filterNoPermissionRoute(route.children);
					}
					return hasPermission;
				});
			};

			return filterNoPermissionRoute(routes);
		});

		return { defaultActive, routeList, isCollapse };
	},
});
</script>
<style lang="less" scoped>
.layout-main {
	height: 100%;
	width: 100%;
	.layout-header {
		height: 52px;
		padding: 0;
		background-color: #ccc;
	}
	.layout-body {
		display: flex;
		overflow: hidden;
		.layout-aside {
			width: 200px;
			transition: all 0.4s ease 0s;
		}
		.layout-content {
			--el-main-padding: 10px;
			padding: var(--el-main-padding);
			overflow-y: auto;
			flex: 1;
		}
	}
}
</style>
