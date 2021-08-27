import { RouteItem } from '../../../router/router'
export default function filterRoute(route: RouteItem): Boolean {
  const meta = route.meta
  const showInLeftMenu = meta.showInLeftMenu === undefined ? true : meta.showInLeftMenu
  const menuName = meta.menuName ? true : false
  const permission =
    // 默认不配置作为公共页面显示
    meta.permission === undefined ? true : Boolean(meta.permission)
  return showInLeftMenu && menuName && permission
}
