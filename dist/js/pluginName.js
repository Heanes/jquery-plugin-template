/**
 * @doc pluginName
 * @author Heanes
 * @time 2018-06-07 11:27:48 周四
 */
;(function($, window, document, undefined) {
    "use strict";
    var pluginName = 'pluginName';
    var _default = {};
    _default.option = {
        option1: undefined
    };

    var PluginName = function (element, options) {
        this._name = pluginName;
        this.v = this.version = 'v1.0.0';
        this._defaults = _default;

        this.$element = $(element);
        this.$el_ = this.$element.clone(true);  // 保留一份原始dom

        this.options = $.extend(true, {}, this._defaults.option, options);
        this.handleToStandardOption(this.options);

        this.init();

        return {
            // Options (public access)
            options: this.options,

            // Method
            // Initialize / destroy methods
            init:           $.proxy(this.init, this),
            destroy:        $.proxy(this.destroy, this),
            refreshOption:  $.proxy(this.refreshOption, this)
        };
    };

    PluginName.prototype = {

        /**
         * @doc 初始化
         * @returns {PluginName}
         */
        init: function () {

            // do something
            this.render();

            return this;
        },

        /**
         * @doc 处理为合法的标准option
         * @param option
         * @returns {PluginName}
         */
        handleToStandardOption: function (option) {
            return this;
        },

        /**
         * @doc 刷新option
         * @param options
         * @returns {PluginName}
         */
        refreshOption: function (options) {
            this.options = $.extend(true, {}, this.options, options);
            this.handleToStandardOption(this.options);

            this.destroy();
            this.init();
            return this;
        },

        /**
         * @doc 销毁插件功能
         * @returns {PluginName}
         */
        destroy: function () {
            this.$element.html(this.$el_.html());
            return this;
        },

        /**
         * 渲染相关
         * @returns {PluginName}
         */
        render: function () {
            return this;
        }

    };

    /* --------------------------- 开发用内部功能函数 --------------------------- */
    function logError(message) {
        if(window.console){
            window.console.error(message);
        }
    }

    /**
     * @doc 加载插件到jquery
     * @param options
     * @param args
     * @returns {undefined|*}
     */
    $.fn[pluginName] = function (options, args) {
        var result = undefined;
        this.each(function () {
            var $this = $(this);
            var _this = $.data(this, pluginName);
            if (typeof options === 'string') {
                if (!_this) {
                    logError('Not initialized, can not call method : ' + options);
                }
                else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
                    logError('No such method : ' + options);
                }
                else {
                    if (options === 'destroy') {
                        $this.removeData(pluginName);
                    }
                    if (!(args instanceof Array)) {
                        args = [ args ];
                    }
                    result = _this[options].apply(_this, args);
                }
            }
            else if (typeof options === 'boolean') {
                result = _this;
            }
            else {
                $.data(this, pluginName, new PluginName(this, $.extend(true, {}, options)));
            }
        });
        return result || this;
    };

})(jQuery, window, document);