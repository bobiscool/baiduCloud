/**
 * Created by mac on 16/9/21.
 */
//此函数 是用于操作DOM的函数库 ,模仿 jquery 自己写的一个封装函数库
var F_Tool = (function(){
    var F_ToolObj = {
        W$:function(selector,context){
            //context 是选择器的上级
            context = context || document;
            if(selector.indexOf(" ") !== -1){
                return context.querySelectorAll(selector);
            }else if( selector.charAt(0) === "#" ){  //  有井号键  就选择 ID
                return document.getElementById(selector.slice(1))
            }else if( selector.charAt(0) === "." ){//有小数点 选择 Class
                return context.getElementsByClassName(selector.slice(1));
            }else{//空格键 存在  选择元素
                return context.getElementsByTagName(selector);
            }
        }, addClass:function (element,clsNames){//添加 class
            if( typeof clsNames === "string" ){
                if(!F_Tool.hasClass(element,clsNames)){
                    element.className += " "+clsNames;
                }
            }
        },
        removeClass:function (element,clsNames){
            var classNameArr = element.className.split(" ");//class 拆分
            for( var i = 0; i < classNameArr.length; i++ ){
                if( classNameArr[i] === clsNames ){
                    classNameArr.splice(i,1);  //数组 删除 一个
                    i--;
                }
            }
            element.className = classNameArr.join(" "); // 数组 合起来 添加 class
        },
        hasClass:function(ele,classNames){

            var classNameArr = ele.className.split(" ");
            for( var i = 0; i < classNameArr.length; i++ ){
                if( classNameArr[i] === classNames ){ //如果有这个class  就返回true
                    return true;
                }
            }

            return false;
        },
        toggleClass:function (ele,classNames1,classNames2){ //  如果 有这个class  就删除class
            if( F_Tool.hasClass(ele,classNames1) ){
                F_Tool.removeClass(ele,classNames1);
                F_Tool.addClass(ele,classNames2);
                return false;
            }else{
                F_Tool.removeClass(ele,classNames2);
                F_Tool.addClass(ele,classNames1);
                return true;
            }
        },
        parents:function(obj,selector){
            /*  这里 是找寻 具有 selector 的父级
             * selector
             * 分为  id
             *      class
             *      标签
             * */

            if( selector.charAt(0) === "#" ){// id 找父集
                while(obj.id !== selector.slice(1)){  //如果obj的id 不等于selector的ID
                    obj = obj.parentNode;
                }
            }else if( selector.charAt(0) === "." ){//如果obj的class不等于selector的Class
                while((obj && obj.nodeType !== 9) && !F_Tool.hasClass(obj,selector.slice(1))){ // 如果obj 存在 并且 obj 不是 document
                    obj = obj.parentNode;
                }
            }else{
                while(obj && obj.nodeType !== 9 && obj.nodeName.toLowerCase() !== selector){
                    obj = obj.parentNode;
                }
            }

            // 找到obj  返回obj  没有找到 就返回 null
            return obj && obj.nodeType === 9  ? null : obj;
        }, getEleRect:function(obj){
            return obj.getBoundingClientRect(); //获取元素 上下左右 距离 对应的页边的距离
        },
        collisionRect:function(obj1,obj2){  // 判断自己 画的框是否与文件夹 相遇
            var obj1Rect = F_Tool.getEleRect(obj1);
            var obj2Rect = F_Tool.getEleRect(obj2);

            var obj1W = obj1Rect.width;
            var obj1H = obj1Rect.height;
            var obj1L = obj1Rect.left;
            var obj1T = obj1Rect.top;

            var obj2W = obj2Rect.width;
            var obj2H = obj2Rect.height;
            var obj2L = obj2Rect.left;
            var obj2T = obj2Rect.top;
            //碰上返回true 否则返回false
            if( obj1W+obj1L>obj2L && obj1T+obj1H > obj2T && obj1L < obj2L+obj2W && obj1T<obj2T+obj2H ){
                return true
            }else{
                false;
            }
        },
        store:function (namespace, data)  {//保存 用户名
            if (data) {
                return localStorage.setItem(namespace, JSON.stringify(data));
            }

            var store = localStorage.getItem(namespace);
            return (store && JSON.parse(store)) || [];
        },
        hide:function (element){ // 隐藏
            return element.style.display = "none";
        },
        show:function (element){
            return element.style.display = "block";
        },
        getOffset:function (obj){//得到物体的真实 宽高
            return {
                width:obj.offsetWidth,
                height:obj.offsetHeight
            }
        },

    }

    return F_ToolObj;

}());
