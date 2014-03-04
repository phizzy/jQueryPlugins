jQueryPlugins
=============

my plugins for jQuery

*   dropdown.js:
    *  $('select').dropdown(): 默认为render，不传入任何参数
    *  $('select').dropdown('render', params): render, 传入自定义的变量params==={}
        *   params.change: function, select的change事件的回调函数
        *   params.id: string, 替代元素的id，可选
        *   params.className: string, 替代元素的class，默认'dropdown'
        *   params.contentClass: string, 替代元素的选中值显示容器class，默认'dropdown-text'
        *   params.optionsClass: string, 替代元素的选中值显示容器class，默认'dropdown-options'
        *   params.selectedClass: string, 替代元素的选中值显示容器class，默认'dropdown-selected'
    *  $('select').dropdown('fill', options)
        *   render调用结束后，修改待选集合
        *   是一个obj数组
        *   obj.text: 显示文本，必选
        *   obj.value: value，可选，不选时，===obj.text
        *   obj.selected: boolean, 是否选中
    *  $('select').dropdown('destroy', true)
*   showsbsolute.js: 用absolute方式，显示一个元素eleA，位置通过eleB在文档流中的位置确定
    *  $('#eleA').showabsolute($('#eleB', 'top|over|bottom');
