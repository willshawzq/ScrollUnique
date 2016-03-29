## 阻止父元素滚动 ##
因为项目需要在浮动的选择框里用鼠标滚动滚动条时，需要确保父元素不跟着滚动。所以呢主要问题就在于如何阻止浏览器的默认滚动行为。

**React**对事件进行了封装，不过阻止浏览器默认行为的方式和原生**JS**是一致的，都是通过`ev.preventDefault()`来完成。

但是呢**React**中滚轮事件和原生`JS`还是有很大区别的。

#### 原生滚轮事件 ####
在原生**JS**中滚轮事件分两种情况：
IE，Chrome：

    domNode.onmousewheel = funciton(ev){};

FireFox: 

    domNode.addEventListener('DOMMouseScroll', function(ev) {});

在原生**JS**中不仅Firefox对应事件名称不同，同时事件返回的参数也不尽相同。其中和滚轮事件相关的主要为： 



- Firefox：判断鼠标滚动方向的属性为`event.detail`, 向下滚动值为`3`。


- 其他浏览器：判断鼠标滚动方向的属性为`event.wheelDelta`, 向下滚动值为`-120`。

从上面可以看出Firefox和其他浏览器滚动方向对应数值的正负是相反的。

#### React中的滚轮事件 ####
在**React**中，对应的滚轮事件为：`onWheel`，**React**对事件进行了处理，传入的事件对象包含以下与滚轮相关的属性：

**deltaMode**： 值为`0`时对应的是非Firefox浏览器，值为`1`是对应的是Firefox浏览器。

**deltaY**： 对应的是滚轮上下滚动的值，但是每个浏览器对应的值不同。比如：Chrome：±100，Firefox：±3，IE则和每个浏览器版本相关。具体值在各个浏览器下面输出便可看到，具体为何输出结果如此奇怪，可以参考这两篇文章：
[ReactWheelHandler](https://github.com/facebook/fixed-data-table/blob/master/src/vendor_upstream/dom/ReactWheelHandler.js)/
[normalizeWheel](https://github.com/facebook/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js)

#### 事件处理 ####

参照张鑫旭大神的[这篇文章](http://www.zhangxinxu.com/wordpress/2015/12/element-scroll-prevent-parent-element-scroll-js/)并针对**React**的特殊之处进行修改，便得到以下方法：

    ....
	handleWheel(ev) {
        let {deltaMode, deltaY} = ev,
            oContainer = ReactDOM.findDOMNode(this),
            scrollTop = oContainer.scrollTop,
            scrollHeight = oContainer.scrollHeight,
            height = oContainer.clientHeight;

        if((deltaY < 0 && scrollTop <= -deltaY) ||
           (deltaY > 0 && scrollHeight - height - scrollTop <= deltaY)) {
           oContainer.scrollTop = deltaY < 0 ? 0 : scrollHeight;
           ev.preventDefault();
       }
    },
	....

#### 结语 ####
这是工作中遇到的一个小问题，这里重温其中牵涉到的一些知识小点。
