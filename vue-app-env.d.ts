// declare module '*.vue' {
//     import { Component } from 'vue'
//     const mod: Component
//     export default mod
// }

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
