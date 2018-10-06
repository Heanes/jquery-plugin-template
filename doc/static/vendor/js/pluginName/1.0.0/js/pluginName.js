/**
 * @doc pluginName
 * @author Heanes
 * @time 2018-06-07 11:27:48 周四
 */
;(function($, window, document, undefined) {
    "use strict";
    let pluginName = 'pluginName';
    let version = '1.0.0';
    const DEFAULTS = {};
    DEFAULTS.option = {
        option1: undefined
    };

    let PluginName = function (element, options) {
        this._name = pluginName;
        this.v = this.version = 'v1.0.0';
        this._defaults = this.getDefaultOption();

        this.init(element, options);

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
        init: function (element, options) {
            this.$element = $(element);
            this.$el_ = this.$element.clone(true);  // 保留一份原始dom
            this.options = this.getOptions(options);

            // do something
            this.render();

            return this;
        },

        /**
         * @doc 获取options
         * @param options
         * @returns {void | {}}
         */
        getOptions: function (options) {
            return this.handleToStandardOption(options);
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
         * @doc 获取默认选项
         * @returns Object
         */
        getDefaultOption: function () {
            return PluginName.DEFAULTS;
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

    PluginName.V = PluginName.VERSION = version;
    /**
     * @doc 默认选项
     * @type Object
     */
    PluginName.DEFAULTS = DEFAULTS;
    /**
     * @doc 语言包
     * @type {{}}
     */
    PluginName.LANGUAGES = {};


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
        let result = undefined;
        this.each(function () {
            let $this = $(this);
            let _this = $.data(this, pluginName);
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

    $.fn.pluginName.Constructor = PluginName;
    $.fn.pluginName.defaults = PluginName.DEFAULTS;
    $.fn.pluginName.languages = PluginName.LANGUAGES;

})(jQuery, window, document);