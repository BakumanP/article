# antd 中 RangePicker 跟随页面滚动问题

antd 中的 ` Select Dropdown DatePicker TimePicker Popover Popconfirm` 在默认状态下都有会跟随页面上下移动的问题，如果想要解决这个问题你需要在组件中设置`getPopupContainer={trigger => trigger.parentNode}`(将组件挂在父级组件而不是body)，可是有的时候并不管用，查阅之后才知道 还有一个一条件:

**父级(parentElement) 是 `position: relative` 或 `position: absolute`。**



## 想法 

我其实对这个问题有意见的，因为在datePicker没有提到对父级还有要求，只是api上表示有``getPopupContainer` ，而他的具体用法是在Select组件中用12px的灰白字写着 ，最后这个问题是翻到了官网上的FAQ中回答的，在组件那我没看见过对父级的要求，我只想对这个FAQ说 : "FA♂Q"

### 参考链接

[`Select Dropdown DatePicker TimePicker Popover Popconfirm` 会跟随滚动条上下移动？](https://ant.design/docs/react/faq-cn)

