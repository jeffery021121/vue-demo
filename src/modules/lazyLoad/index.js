// 该插件要实现图片懒加载的功能
// 图片懒加载的核心就是计算当前图片是否在需要显示的区域内，如果是，进行加载，没有加载成功前先显示loading图占位
// v-lazy指令是用在一个个图片上的

const getScrollParent = (el) => {
    let parent = el.parentNode
    while (parent) {
        const overflowType = getComputedStyle(parent).overflow
        if (overflowType === 'scroll' || overflowType === 'auto') {
            break;
        }
        parent = parent.parentNode
    }
    return parent
}

// 缺点，不能缓存一些已经获取好的数据，例如scrollParent每个el都会获取，虽然都是一个，高度计算除了滚动高度是变量其他可以先计算出来
// 如果图片加载错误，没有对应的处理。应该用new Image先把资源加载到，然后才替换src属性
// 每个元素都会给父元素添加滚动监听
export default {
    install(Vue, options) {
        Vue.directive('selfLazy', {
            inserted(el, bindings) {
                // 获取最近的滚动父级元素。
                const scrollParent = getScrollParent(el)
                const { top, height } = el.getBoundingClientRect() // 相对于视口的高度
                const { height: scrollParentHeight, top: containerTop } = scrollParent.getBoundingClientRect()
                const { preLoad = 0, loading } = options
                el.src = loading
                el.handler = (e) => { // 计算目前父元素滚动的高度，和preload进行合并计算出来总共高度
                    const scrollTop = e ? e.target.scrollTop : 0
                    // 查看对应图片是否应该出现，元素的top-容器的top 和 滚动容器滚动的距离+容器高度做对比，如果有预设，应该加上对应的图片高度
                    const shouldShow = top - containerTop <= scrollTop + scrollParentHeight + preLoad * height
                    if (shouldShow && el.src === loading) el.src = bindings.value
                }
                //先自己执行一下，让应该渲染的元素渲染出来
                el.handler()
                // 给该父元素添加滚动监听
                scrollParent.addEventListener('scroll', el.handler)
            },
            unbind(el) {
                const scrollParent = getScrollParent(el)
                if(scrollParent)scrollParent.removeEventListener('scroll', el.handler)
            }
        })
    }
}