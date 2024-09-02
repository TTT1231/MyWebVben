<script lang="tsx">
import {
   type CSSProperties,
   type FunctionalComponent,
   type PropType,
   defineComponent,
   nextTick,
   onMounted,
   onUnmounted,
   ref,
   unref
} from 'vue';
import type { ContextMenuItem, ItemContentProps, Axis } from './typing';
import { Menu } from 'ant-design-vue';
import { computed } from 'vue';
/**函数式组件 */
const props = {
   width: { type: Number, default: 156 },
   customEvent: { type: Object as PropType<Event>, default: null },
   styles: { type: Object as PropType<CSSProperties> },
   front: { type: Boolean, default: true },
   showIcon: { type: Boolean, default: true },
   axis: {
      type: Object as PropType<Axis>,
      default() {
         return { x: 0, y: 0 };
      }
   },
   items: {
      type: Array as PropType<ContextMenuItem[]>,
      default() {
         return [];
      }
   }
};
//定义一个功能组件，简单式
const ItemContent: FunctionalComponent<ItemContentProps> = (props) => {
   const { item } = props;
   return (
      <span
         style="display: inline-block; width: 100%; "
         class="px-4"
         onClick={props.handler.bind(null, item)}
      >
         {props.showIcon && item.front}
         <span>{item.label}</span>
      </span>
   );
};
export default defineComponent({
   name: 'ContextMenu',
   props,
   setup(props) {
      /**wrapRef时contextMenu引用 */
      const wrapRef = ref(null);
      const showRef = ref(false);
      //getStyle
      const getStyle = computed((): CSSProperties => {
         const { axis, items, styles, width } = props;
         const { x, y } = axis || { x: 0, y: 0 };
         const menuHeight = (items || []).length * 40;
         const menuWidth = width;
         const body = document.body;
         const left = body.clientWidth < x + menuWidth ? x - menuWidth : x;
         const top = body.clientHeight < y + menuHeight ? y - menuHeight : y;
         return {
            position: 'absolute',
            width: `${width}`,
            left: `${left + 1}px`,
            top: `${top + 40}px`,
            zIndex: 9999,
            ...styles
         };
      });
      onMounted(() => {
         //dom更新之后
         nextTick(() => (showRef.value = true));
      });
      onUnmounted(() => {
         const el = unref(wrapRef);
         el && document.body.removeChild(el);
      });
      //处理传递过来props中函数
      function handleAction(item: ContextMenuItem, e: MouseEvent) {
         const { handler, diabled } = item;
         if (diabled) {
            return;
         }
         showRef.value = false;
         e?.preventDefault();
         handler?.();
      }
      function renderMenuItem(items: ContextMenuItem[]) {
         const visibleItems = items.filter((item) => !item.hidden);
         //返回一个新数组，不影响原数组
         return visibleItems.map((item) => {
            const { diabled, label, children } = item;
            const contentProps = {
               item,
               handler: handleAction,
               showIcon: props.showIcon
            };
            //没有孩子
            if (!children || children.length === 0) {
               return (
                  <>
                     <Menu.Item disabled={diabled} key={label}>
                        <ItemContent {...contentProps} />
                     </Menu.Item>
                  </>
               );
            }
            if (!unref(showRef)) return null;
            return (
               <Menu.SubMenu key={label} disabled={diabled}>
                  {{
                     title: () => <ItemContent {...contentProps} />,
                     default: () => renderMenuItem(children)
                  }}
               </Menu.SubMenu>
            );
         });
      }
      return () => {
         if (!unref(showRef)) return null;
         const { items } = props;
         return (
            <Menu mode="vertical" ref={wrapRef} style={unref(getStyle)}>
               {renderMenuItem(items)}
            </Menu>
         );
      };
   }
});
</script>
