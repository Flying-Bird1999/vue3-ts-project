import { App } from 'vue'
import 'element-plus/lib/theme-chalk/index.css'
import { 
    ElButton, 
    ElForm, 
    ElInput,
    ElTabPane,
    ElTabs,
    ElFormItem,
    ElCheckbox,
    ElLink
} from "element-plus"

const components = [
    ElButton, 
    ElForm, 
    ElInput,
    ElTabPane,
    ElTabs,
    ElFormItem,
    ElCheckbox,
    ElLink
]

export default function (app: App): void {
    for(const component of components) {
        app.component(component.name, component)
    }
}