<template>
	<div class="user-info">
		<el-tooltip
			effect="dark"
			:content="fullscreen ? `退出全屏` : `全屏`"
			placement="bottom"
		>
			<i
				:class="['el-icon-rank', 'fullscreen-icon']"
				@click="handleFullscreen"
			></i>
		</el-tooltip>
		<el-dropdown style="cursor: pointer" @command="handleDropDownClick">
			<div class="basic-info">
				<img
					src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
					alt="avatar"
				/>
				<span :style="{ color: '#fff' }">{{ username }}</span>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="logout" class="logout el-icon-back">
						退出登录
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted } from 'vue';
import createAxios from '../../utils/axios-config';
const axiosInstance = createAxios();
import { login, logout } from './config';
export default defineComponent({
	setup() {
		const username: Ref<String> = ref('');
		// 是否全屏的标志
		const fullscreen: Ref<Boolean> = ref(false);

		const handleFullscreen = async function () {
			const exitFullscreen =
				document['webkitCancelFullScreen'] ||
				document['mozCancelFullScreen'] ||
				document['msExitFullscreen'] ||
				document['exitFullscreen'];
			const element: HTMLElement = document.documentElement;
			const requestFullscreen =
				element['requestFullscreen'] ||
				element['webkitRequestFullScreen'] ||
				element['mozRequestFullScreen'] ||
				element['msRequestFullscreen'];

			if (fullscreen.value) {
				exitFullscreen.call(document);
			} else {
				requestFullscreen.call(element);
			}

			fullscreen.value = !fullscreen.value;
		};
		const handleDropDownClick = function (cmd: string) {
			if (cmd === 'logout') {
				logout();
			} else {
				login();
			}
		};

		const getUserInfo = async () => {
			const r = await axiosInstance.get('/api/permission/userInfo', '', {
				baseURL: '$$_ORIGIN_$$',
			});
			username.value = r.data.name;
			localStorage.setItem('username', JSON.stringify(username.value));
		};
		onMounted(() => {
			// getUserInfo()
		});
		return { username, fullscreen, handleFullscreen, handleDropDownClick };
	},
});
</script>
<style lang="less" scoped>
.user-info {
	height: 100%;
	display: flex;
	align-items: center;

	.fullscreen-icon {
		transition: all 0.5s;
		color: #fff;
		font-size: 20px;
		transform: rotate(45deg);
	}
	.fullscreen-icon:hover {
		transform: rotate(320deg);
	}
	.basic-info {
		display: flex;
		align-items: center;

		img {
			width: 28px;
			height: 28px;
			margin: 0 12px;
			border-radius: 50%;
		}
	}
}

.logout {
	line-height: 36px;
}
</style>
