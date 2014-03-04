(function($) {
    $.fn.showabsolute = function($ele, pos) {
        //pos:  top | bottom | over
        var p = {
                left: $ele.offset().left
                ,top: $ele.offset().top
                ,width: $ele.width()
                ,height: $ele.height()
            },
            m = {
                left: p.left
                ,width: $ele.width()
                ,height: this.height()
            };
        switch (pos) {
        case 'top':
            m.top = p.top - m.height;
            break;
        case 'over':
            m.top = p.top;
            break;
        case 'bottom':
        default:
            m.top = p.top + p.height;
        }
        this.css({
            position: 'absolute'
            ,left: m.left
            ,width: m.width
            ,top: m.top
            ,'z-index': 2147483647
        });
        this.show();
        return this;
    };
})(jQuery);
