/**
 * Created by mac on 16/9/24.
 */
//数据渲染成为  html
//事件  模板 要分开
var renderData = {// 利用EC6的特性  生成模板函数
    fileHtml:function (itemData,tempData) {
        return `<dd class="Unclick"><div class="Ob" data-fileid="${itemData.idNumber}" data-filetype="${itemData.Type}" data-pidNum="${itemData.pid}">
                        <div class="${itemData.Type}">
                                <span></span>
                        </div>
                        <span class="File-Title">${itemData.Title}${tempData}</span>
                         <span class="File-more">${itemData.Cap}</span>
                        <span class="File-more">${itemData.Time}</span>
                        </div>

                    </dd>`;
    },

    crNav:function(item){
        return `<li class="inDrectory-list" data-showwhat="${item.idNumber}" ><span class="Gray">></span><span class="Blue">${item.Title}</span></li>`
    },
    StaticHtml:function (Arr) {
        return `<li class="inDrectory-list" data-showwhat="${Arr[Arr.length-2]}"><span  class="Blue">返回上一级</span><span class="Gray">|</span></li><li class="Back-to-main" data-showwhat="0"><span class="Blue">全部文件</span></li>`;
    },
    CreatNewFolder:function(itemData){
        return `<div class="Ob" data-fileid="${itemData.idNumber}" data-filetype="${itemData.Type}" data-pidNum="${itemData.pid}">
                        <div class="${itemData.Type}">
                                <span></span>
                        </div>
                        <span class="File-Title">${itemData.Title}</span>
                         <span class="File-more">${itemData.Cap}</span>
                        <span class="File-more">${itemData.Time}</span>
                        </div>`;

    }

};

