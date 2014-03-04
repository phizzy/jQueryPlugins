
/**
 * $('select').dropdown();  默认为render，不传入任何参数
 * $('select').dropdown('render', params);
 * $('select').dropdown('fill', options')
 * $('select').dropdown('destroy', true)
 * @params:
    params = {
        change: function() {}   // change的回调函数
        ,id: '' // 替代元素的id
        ,contentClass: ''   // 替代元素的选中值显示容器class
        ,optionsClass: ''   // 替代元素的列表项容器class
        ,selectedClass: ''  // 替代元素的选中的class
    }
 */

(function($) {
    var run = function(action, params) {
        var action = action || '';
        if (!handler[action]) return;
        if (!(typeof handler[action] === 'function')) return;
        return handler[action].apply(this, params===undefined ? [] : [params]);
    };
    var template = [
        '<div>'
        ,'</div>'
    ].join('');
    var handler = {
        init: function(params) {
            // 初始化检测
            //      如果是第一次，需要进行必要的初始化操作
            //      方便reset操作
            if (this.options) return;
            var options = [];
            this.find('option').each(function(index) {
                options.push({
                    text: this.text
                    ,value: this.value===undefined ? this.text : this.value
                    ,selected: this.selected
                });
            });

            var that = this;
            var params = params || {};
            if (params.change) {
                that.changeHandler = params.change;
            }
            if (this.options===undefined) {
                this.on('change', function() {
                    that.dropdown('change', this.selectedIndex);
                });
                this.parents('form').on('reset', function() {
                    that.dropdown('reset');
                });
            }
            this.options = options;
        }
        ,change: function(index) {
            var that = this;
            var sc = that.data('selectedClass');
            this.theme.find('.'+that.data('optionsClass')).children().each(function(i) {
                if ($(this).hasClass(sc)) {
                    $(this).removeClass(sc);
                }
                if (i === index) {
                    $(this).addClass(sc);
                    that.theme.find('.'+that.data('contentClass')).text($(this).text());
                }
            });
            if (that.changeHandler && typeof that.changeHandler === 'function') {
                that.changeHandler.call(that[0]);
            }
        }
        ,reset: function() {
            for (var i=0,l=this.options.length; i<l; i++) {
                if (this.options[i].selected) {
                    break;
                }
            }
            this.dropdown('change', i);
        }
        ,destroy: function(showMe) {
            $(document).trigger('click:dropdown');
            this.options = '';
            this.theme.remove();
            if (showMe) this.show();
        }
        ,fill: function(options) {
            // options = [{text:'', value:'', selected: false}];
            this.dropdown('destroy');
            this.empty();
            for (var i=0,l=options.length; i<l; i++) {
                this.append('<option value="'+options[i].value+'"'+(options[i].selected ? ' selected="selected"' : '')+'>'+options[i].text+'</option>');
            }
            this.dropdown('render');
            return this;
        }
        ,render: function(params) {
            this.hide();
            this.dropdown('init', params);

            var params = params || {};
            var that = this;

            var id = params.id,
                className = params.className || 'dropdown',
                contentClass = params.contentClass || 'dropdown-text',
                optionsClass = params.optionsClass || 'dropdown-options',
                selectedClass = params.selectedClass || 'dropdown-selected';

            var $theme = $(template);
            if (id) $theme.attr('id', id);
            if (className) $theme.addClass(className);
            var $eos = $(template);
            for (var i=0,l=this.options.length; i<l; i++) {
                var $tmp = $(template);
                $tmp.text(this.options[i].text);
                $tmp.data('value', this.options[i].value);
                if (this.options[i].selected) {
                    $tmp.addClass(selectedClass);
                    var $ctmp = $(template);
                    $ctmp.addClass(contentClass);
                    $ctmp.text(this.options[i].text);
                    $theme.prepend($ctmp);
                }
                $eos.append($tmp);
            }
            $eos.hide();
            $eos.addClass(optionsClass);
            $theme.append($eos);

            this.data('className', className);
            this.data('contentClass', contentClass);
            this.data('optionsClass', optionsClass);
            this.data('selectedClass', selectedClass);
            this.theme = $theme;
            this.after($theme);

            this.theme.find('.'+contentClass).on('click', function() {
                var $opts = $(this).next('.'+optionsClass);
                if (!$opts.length) return;
                var $cc = $(template);
                $cc.append($opts);
                $('body').append($cc)
                $cc.showabsolute(that.theme);
                $opts.show();
                var uh = function(i) {
                    $opts.hide();
                    $opts.appendTo(that.theme);
                    if (i!==undefined) {
                        that.change();
                    }
                    $opts.children().off('click', func);
                    $cc.remove();
                };
                var func = function() {
                    var i = $(this).index();
                    that.find('option').each(function(mi) {
                        if (mi===i) {
                            $(this)[0].selected = 'selected';
                        }
                        else {
                            $(this)[0].selected = '';
                        }
                    });
                    uh(i);
                };
                $opts.children().on('click', func);
                $(document).one('click:dropdown', function() {
                    uh();
                });
                setTimeout(function() {
                    $(document).one('click', function() {
                        $(document).trigger('click:dropdown');
                    });
                }, 10);
            });

            return this;
        }
    };
    $.fn.dropdown = run;
})(jQuery);
