<template>
	<el-menu
		:default-active="defaultActive"
		background-color="#001529"
		class="layout-menu"
		text-color="rgba(255,255,255,.65)"
		active-text-color="#fff"
		:collapse="isCollapse"
		:collapse-transition="false"
		route
	>
		<layout-menu-item
			v-for="route in routeList"
			:route="route"
			:key="route.name"
		></layout-menu-item>
	</el-menu>
</template>

<script lang="ts">
import { defineComponent, Ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import LayoutMenuItem from './menu-item.vue';
import { RouteItem } from '../../router/index';
import filterRoute from '../filter-route';
export default defineComponent({
	components: { LayoutMenuItem },
	props: { isCollapse: { default: () => false, type: Boolean } },
	setup() {
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
		// const isCollapse: Ref<Boolean> = ref(false)
		return { defaultActive, routeList };
	},
});
</script>
<style lang="less" scoped>
.layout-menu {
	position: relative;
	height: 100%;
	border: none;

	:deep(.el-menu-item.is-active) {
		background: #1890ff !important;
	}
}
</style>
