/**
 * Created by mac on 16/9/21.
 */


//取东西区域
var Oview = document.getElementById('View');
var OItemList = F_Tool.W$('#Item-list');
var Old = OItemList.getElementsByTagName('li')[0];
var O_LGswich = document.getElementById('LGswitch');
var O_Lswich = document.getElementsByClassName('list-switch')[0];
var O_Gswich = document.getElementsByClassName('gird-switch')[0];
var O_Operation = document.getElementById('Operation-bar');
var O_NameUD = document.getElementsByClassName('Item-type')[0];
var O_CapUD = document.getElementsByClassName('Item-type')[1];
var O_TimeUD = document.getElementsByClassName('Item-type')[2];
var O_selectAll = O_Operation.getElementsByTagName('input')[0];
var O_Howmany = document.getElementById('Howmany');
var O_Navtitle = document.getElementById('Nav-title');
var O_Navtitleul = document.getElementById('Nav-title-ul');
var O_NewFolder = document.getElementsByClassName('NewFolder')[0];
var O_Delete = document.getElementsByClassName('B-Delete')[0];
var O_Confirm = document.getElementById('Confirm');
var O_Mask = document.getElementById('Mask');
var O_Cash = document.getElementById('Cash');
var O_ToolsBar = document.getElementById('Tools');
var O_ScroolBar = document.getElementById('Scrollbar');
var O_Scroolspan = O_ScroolBar.getElementsByTagName('span')[0];
var O_rightMenu = document.getElementById('rightMenu');
var childs = [];
var OA_Group = [];
var OA_NowWhere = [];
var IdNumber = JsonData.length;
var NowEdit = null;
var newDiv = null;
var Deleted = [];
var Alldeleted = [];
var disX = 0;
var disY =0;
var Old2 = O_rightMenu;
var O_RLorG = document.getElementById('R-LorG');
var O_RUporDown = document.getElementById('R-UporDown');
// console.log(O_Howmany);

F_RenderData(JsonData, 0, 'Cap', 'Up');

// setInterval(function(){
//     F_ChangeTheToolBar(OA_Group);
// },50);//定时监督
//添加 点击事件
//点击事件区域
OItemList.addEventListener('click', function (ev) {
    O_ToolsBar.style.display = 'inline';
    O_Operation.style.display = 'block';
    O_Navtitleul.style.display = "block";
    if (ev.target.tagName == 'LI') {
        F_scroolBar();
        F_Tool.removeClass(Old, 'active');
        F_Tool.addClass(ev.target, 'active');
        F_ShowWho(ev.target.dataset.showwhat);
        Old = ev.target;
        if (ev.target.dataset.showwhat != 'All') {
            O_NewFolder.style.display = 'none';
        } else {
            O_NewFolder.style.display = 'inline-block';
        }
    } else if (F_Tool.parents(ev.target, 'li') != null) {
        F_scroolBar();
        var tem = F_Tool.parents(ev.target, 'li');
        F_Tool.removeClass(Old, 'active');
        F_Tool.addClass(tem, 'active');
        F_ShowWho(tem.dataset.showwhat);
        Old = tem;
        if (tem.dataset.showwhat != 'All') {
            O_NewFolder.style.display = 'none';
        } else {
            O_NewFolder.style.display = 'inline-block';
        }
    } else {
        console.log('oh no');
    }


});
O_Lswich.addEventListener('click', function () {
    F_Tool.removeClass(Oview, 'Gird-view');
    F_Tool.addClass(Oview, 'List-view');
    F_Tool.removeClass(O_LGswich, 'gird-switch-on');
    F_Tool.addClass(O_LGswich, 'list-switch-on');
    O_Operation.className = '';
    F_Tool.addClass(O_Operation, 'UchoosedItemList');
    F_scroolBar();
});
O_Gswich.addEventListener('click', function () {
   // F_scroolBar();
    F_Tool.addClass(Oview, 'Gird-view');
    F_Tool.removeClass(Oview, 'List-view');
    F_Tool.addClass(O_LGswich, 'gird-switch-on');
    F_Tool.removeClass(O_LGswich, 'list-switch-on');
    O_Operation.className = '';
    F_Tool.addClass(O_Operation, 'UchoosedItemGird');
    F_scroolBar();
});
O_NameUD.addEventListener('click', function () {
    if (O_NameUD.getElementsByTagName('span')[0].className == 'Down') {
        O_NameUD.getElementsByTagName('span')[0].className = 'Up';
        F_RenderData(JsonData, F_findlevel(), 'Title', 'Up');
    } else {
        O_NameUD.getElementsByTagName('span')[0].className = 'Down';
        F_RenderData(JsonData, F_findlevel(), 'Title', 'down');
    }
});
O_CapUD.addEventListener('click', function () {
    if (O_CapUD.getElementsByTagName('span')[0].className == 'Down') {
        O_CapUD.getElementsByTagName('span')[0].className = 'Up';
        F_RenderData(JsonData, F_findlevel(), 'Cap', 'Up');
    } else {
        O_CapUD.getElementsByTagName('span')[0].className = 'Down';
        F_RenderData(JsonData, F_findlevel(), 'Cap', 'down');
    }
});
O_TimeUD.addEventListener('click', function () {
    if (O_TimeUD.getElementsByTagName('span')[0].className == 'Down') {
        O_TimeUD.getElementsByTagName('span')[0].className = 'Up';
        F_RenderData(JsonData, F_findlevel(), 'Time', 'Up');
    } else {
        O_TimeUD.getElementsByTagName('span')[0].className = 'Down';
        F_RenderData(JsonData, F_findlevel(), 'Time', 'down');
    }
});
O_selectAll.addEventListener('click', function (ev) {
    // console.log(ev.target);
    if (ev.target.checked) {
        F_toSelectAll();
    } else {
        F_toSelectAllNot();
    }
});//全选建
O_Cash.onclick = function () {
    O_ToolsBar.style.display = 'none';
    O_Operation.style.display = 'none';
    F_Tool.removeClass(Old, 'active');
    F_Tool.addClass(this, 'active');
    Old = this;
    OA_NowWhere = [];
    O_Navtitleul.style.display = "none";
    F_RenderData(Deleted, 'n', 'Cap', 'Up');
};
document.oncontextmenu = function(ev){
    var ev = ev||window.event;
    O_rightMenu.style.display = 'block';
    O_rightMenu.style.left = ev.clientX +'px';
    O_rightMenu.style.top = ev.clientY +'px';

    return false;
};

O_rightMenu.onmouseover = function(ev){
    var  ev = ev||window.event;
    var tem = null;
    ev.target.tagName =='DIV'?tem=ev.target:tem=F_Tool.parents(ev.target,'div');
    console.log(tem);

    if(tem&&(tem.className=='R-Operation-list'||tem.className=='R-Tool-list')){
        Old2.style.backgroundColor = '#fff';
        tem.style.backgroundColor = '#00B4CC';
        Old2 = tem;
        if(tem.dataset.showwhat =='LorG'){
            O_RLorG.style.display = 'block';
            O_RUporDown.style.display = 'none';
        }else if(tem.dataset.showwhat =='UporDown'){
            O_RLorG.style.display = 'none';
            O_RUporDown.style.display = 'block';
        }else{
            O_RLorG.style.display = 'none';
            O_RUporDown.style.display = 'none';
        }
    }
};
O_rightMenu.addEventListener('click',function () {
    var  ev = ev||window.event;
    var tem = null;
    ev.target.tagName =='DIV'?tem=ev.target:tem=F_Tool.parents(ev.target,'div');
    console.log(tem);

    if(tem&&(tem.className=='R-Operation-list'||tem.className=='R-Tool-list')){
        if(tem.dataset.showwhat =='Refresh'){
            F_RenderData(JsonData, F_findlevel(), 'Cap', 'Up');
            console.log('点击了刷新');
            O_rightMenu.style.display = 'none';
        }

        if(tem.dataset.showwhat =='Reload'){
            location.reload();
            O_rightMenu.style.display = 'none';
        }


        if(tem.dataset.showwhat =='NewFolder'){
            console.log('点击了新建');
            F_createNewFolder();
            O_rightMenu.style.display = 'none';
        }
    }


});
O_RLorG.addEventListener('click',function(ev){
    var ev = ev||window.event;
    var tem = ev.target;
    console.log(tem.dataset.showwhat);
    if(tem.dataset.showwhat){
        if(tem.dataset.showwhat=="List"){
            O_Lswich.click();
            O_rightMenu.style.display = 'none';
            O_RLorG.className = 'List-view-span';
            O_RLorG.style.display = 'none';

        }
        if(tem.dataset.showwhat=="Gird"){
            O_Gswich.click();
            O_rightMenu.style.display = 'none';
            O_RLorG.style.display = 'none';
            O_RLorG.className = 'Gird-view-span';
        }
    }

});

O_RUporDown.addEventListener('click',function(ev){
    var ev = ev||window.event;
    var tem = ev.target;
    console.log(tem.dataset.showwhat);
    if(tem.dataset.showwhat){
        if(tem.dataset.showwhat=="FileName"){
            O_NameUD.click();
            O_rightMenu.style.display = 'none';
            O_RUporDown.className = 'nameD';
            O_RUporDown.style.display = 'none';

        }
        if(tem.dataset.showwhat=="Capicy"){
            O_CapUD.click();
            O_rightMenu.style.display = 'none';
            O_RUporDown.style.display = 'none';
            O_RUporDown.className = 'capD';
        }

        if(tem.dataset.showwhat=="Time"){
            O_TimeUD.click();
            O_rightMenu.style.display = 'none';
            O_RUporDown.style.display = 'none';
            O_RUporDown.className = 'TimeD';
        }
    }

});


var OviewDl = document.getElementsByTagName('dl')[0];

F_scroolBar();

window.onresize = function(){
    Oview.style.height = document.body.clientHeight-170+'px';
    F_scroolBar();
};
setInterval(function () {
    F_ChangeTheToolBar();
    O_Howmany.innerHTML = OA_Group.length;
    if (OA_NowWhere.length == 0) {
        O_Navtitle.className = 'Nav-title Notin';
    } else {
        O_Navtitle.className = 'Nav-title InaDrec';
    }
}, 50);


Oview.addEventListener('click', function (ev) {
    var tem = F_Tool.parents(ev.target, '.Ob');
    // var temEdit = F_Tool.parents(ev.target,'.EditButon');
    var temObj = ev.target;
    if (temObj.className == 'EditButon') {//点击了edit
        console.log('点击了EditButon');
        F_Tool.parents(temObj, '.File-Title').className = 'File-Title Editing';
        var teminput = F_Tool.parents(temObj, '.File-Title').getElementsByTagName('input')[0];
        teminput.value = F_Tool.parents(temObj, '.File-Title').getElementsByClassName('Name')[0].innerHTML;
        F_Tool.parents(temObj, '.File-Title').getElementsByTagName('input')[0].focus();

        return false;
    }

    if (temObj.tagName == 'INPUT') {//如果点击了 input
        console.log('点击了 input');

        return false;
    }


    if (temObj.className == 'ConfirmButton') {//如果点击了 input
        console.log(F_Tool.parents(temObj, '.File-Title').getElementsByTagName('input')[0].value.length);
        if (F_Tool.parents(temObj, '.File-Title').getElementsByTagName('input')[0].value.length > 8 || F_Tool.parents(temObj, '.File-Title').getElementsByTagName('input')[0].value.length < 3) {
            alert('文件名称限制3-8位!');
            F_Tool.parents(temObj, '.File-Title').getElementsByTagName('input')[0].focus();
            return false;
        }
        var temTime = new Date();
        var temdata = F_manageData.WhoHasTheValue(JsonData, tem.dataset.fileid)
        console.log(F_manageData.WhoHasTheValue(JsonData, tem.dataset.fileid));
        temdata.Title = F_Tool.parents(temObj, '.File-Title').getElementsByTagName('input')[0].value;

        temdata.Time = temTime.getHours() + ":" + temTime.getMinutes() + ':' + temTime.getSeconds();

        F_Tool.parents(temObj, '.File-Title').className = 'File-Title Uedit';
        tem.getElementsByClassName('File-more')[1].innerHTML = temdata.Time;
        F_Tool.parents(temObj, '.File-Title').getElementsByClassName('Name')[0].innerHTML = F_Tool.parents(temObj, '.File-Title').getElementsByTagName('input')[0].value;

        return false;
    }


    if (temObj.className == 'OkButton') {//如果点击了 取消键
        F_Tool.parents(temObj, '.File-Title').className = 'File-Title Uedit';
        return false;
    }


    //这是input 不存在的时候


    if (tem && temObj.tagName != 'INPUT' && temObj.className != 'OkButton') {// 除了点击 edit以外的位置
        if (ev.target.className != '' && tem.dataset.filetype == 'Drec') {//点击文件夹
            F_RenderData(JsonData, tem.dataset.fileid, 'Title', 'down');
            OA_NowWhere.push(tem.dataset.fileid);//保存ID
            F_createNav();
            //OA_Group = [];
            //这个地方就得 开始渲染导航框了
        } else {//点击 文件
            //push进入数组  开始打打勾 第二次点击 就取消打勾
            F_Tool.toggleClass(F_Tool.parents(ev.target, 'dd'), 'Unclick', 'Clicked');
            // console.log(tem);
            F_manageData.ToogleArray(OA_Group, tem.dataset.fileid);
            console.log(F_manageData.getChildById(JsonData, F_findlevel()).length);
            if (OA_Group.length == F_manageData.getChildById(JsonData, F_findlevel()).length) {
                O_selectAll.checked = true;
            } else {
                O_selectAll.checked = false;
            }//判断 是否全选

        }

    }


});//文件点击操作

O_Navtitleul.addEventListener('click', function (ev) {
    console.log(F_Tool.parents(ev.target, 'li').dataset.showwhat);
    if (F_Tool.parents(ev.target, 'li')) {
        if (F_Tool.parents(ev.target, 'li').dataset.showwhat != 0) {

            OA_NowWhere = F_deleteBehind(OA_NowWhere, F_Tool.parents(ev.target, 'li').dataset.showwhat);
            // console.log(OA_NowWhere);
            F_NavRender(F_Tool.parents(ev.target, 'li').dataset.showwhat);
        } else {
            OA_NowWhere = [];
            F_NavRender(F_Tool.parents(ev.target, 'li').dataset.showwhat);
        }
    }

});

O_NewFolder.addEventListener('mouseup', function (ev) {
    if (F_Tool.parents(ev.target, '.NewFolder')) {
        //function new folder
        F_createNewFolder();
    }
});

O_Delete.addEventListener('click', function () {
    O_Mask.style.display = 'block';
    O_Confirm.addEventListener('click', function (ev) {
        if (ev.target.className == "Cb CB-Ac") {
            O_Mask.style.display = 'none';
            //执行删除

            F_DeleteData();

        }
        if (ev.target.className == "Cb CB-Ua") {
            O_Mask.style.display = 'none';
        }
    })

});

Oview.addEventListener('mousedown', F_Down);

O_Scroolspan.onmousedown  = function (ev) {
    var OviewDl = document.getElementsByTagName('dl')[0];
    var disY = 0;
    var disMtS =(ev.clientY-O_ScroolBar.offsetTop)- O_Scroolspan.offsetTop;
    O_Scroolspan.onmousemove = function(ev){
        disY = ev.clientY-O_ScroolBar.offsetTop-disMtS;
        if(disY>=0&&disY<=O_ScroolBar.offsetHeight-O_Scroolspan.offsetHeight){
            O_Scroolspan.style.top = disY+'px';
            OviewDl.style.top = -disY*(O_ScroolBar.offsetHeight/O_Scroolspan.offsetHeight)+'px';
        }

    };

    document.addEventListener('mouseup', F_ScroolUp);


};



//现在需要写一个 函数 当我点击 除了input框之外 ,还有取消键之外的东西 他的效果就是 确认键效果
//不过这个监听 应该是 我在 添加了edit之后
document.addEventListener('mousedown', function (ev) {
    var temObj = document.getElementsByClassName('Editing')[0];
    console.log(temObj);
    if (temObj) {
        if (ev.target.tagName != 'INPUT' && ev.target.className != 'ConfirmButton') {
            console.log(temObj);
            temObj.className = 'File-Title Uedit';
        }
    }

    ev.preventDefault();



});

//点击事件区域

function F_ShowWho(showwho) {
    if (showwho == 'All') {
        //这里就直接 跑到根目录
        F_RenderData(JsonData, 0, 'Cap', 'Up');
    } else {
        F_RenderData(ClassiFy[showwho], 'n', 'Cap', 'Up');
        OA_NowWhere = [];
        //console.log(ClassiFy[showwho]);
    }
}//此函数 是 侧边栏 的函数

function F_RenderData(data, renderId, Attr, UD) {
    clearAll();//不知道这样设置 是否是个坑  一旦重新渲染 就清空
  //一旦渲染 重新定位
    OviewDl = document.getElementsByTagName('dl')[0];
    // console.log(data);
    var tempData = '';
    var html = "";
    if (!isNaN(renderId)) {
        childs = F_manageData.UpOrDown(F_manageData.getChildById(data, renderId), Attr, UD);

    } else {
        // console.log(data);
        // console.log(childs);
        childs = F_manageData.UpOrDown(data, Attr, UD);  //两种渲染模式  一种是渲染子集  一种是渲染 当前 数据  现在没用它
    }

    childs.map(function (item) {
        tempData = '';
        if (item.Type != "Drec") {
            tempData = '.' + item.Type;
        }
        html += renderData.fileHtml(item, tempData);
    });

    Oview.innerHTML = '<dl>' + html + '</dl>';
    // Oview.style.height = document.body.clientHeight-170+'px';

    F_scroolBar();

}//渲染函数

function F_ChangeTheToolBar() {
    if (OA_Group.length == 0) {
        if (F_Tool.hasClass(Oview, 'Gird-view')) {
            O_Operation.className = 'UchoosedItemGird';
        } else {
            O_Operation.className = 'UchoosedItemList';
        }
    } else {
        O_Operation.className = 'ChoosedItem';
    }


}
function F_toSelectAll() {
    var A_tem = Oview.getElementsByTagName('dd');
    F_manageData.each(A_tem, function (a) {
        F_Tool.addClass(a, 'Clicked');
        F_Tool.removeClass(a, 'Unclick');
        OA_Group.push(a.getElementsByClassName('Ob')[0].dataset.fileid);
    });

}

function F_toSelectAllNot() {
    var A_tem = Oview.getElementsByTagName('dd');
    F_manageData.each(A_tem, function (a) {
        F_Tool.addClass(a, 'Unclick');
        F_Tool.removeClass(a, 'Clicked');
    });
    OA_Group = [];

}

function clearAll() {
    O_Howmany.innerHTML = 0;
    OA_Group = [];
    O_selectAll.checked = false;
}

function F_createNav() {//id 与 第几个是对应得 但是 是减去一的关系!!!!!
    O_Navtitleul.innerHTML = renderData.StaticHtml(OA_NowWhere);
    OA_NowWhere.forEach(function (item) {
        O_Navtitleul.innerHTML += renderData.crNav(F_manageData.WhoHasTheValue(JsonData, item));
        console.dir(JsonData[item - 1]);
    });
}


function F_NavRender(id) {
    F_RenderData(JsonData, id, 'Cap', 'Up');
    F_createNav();
}
function F_fromArraygetData(Arr, data) {
    var tem = [];
    Arr.forEach(function (item) {
        tem.push(data[item - 1]);
    });
    return tem;
}

function F_deleteBehind(Arr, number) {
    return Arr.slice(0, F_manageData.whereTheValue(Arr, number) + 1);
}

function F_createNewFolder() {
    //数据层 新建 这时候跟 i有关了 卧槽。。。
    //点击新建IDnumber就加1
    var Time = new Date();
    IdNumber++;
    //数据层
    var newData = {};
    newData.pid = F_findlevel();//现在所处文件夹的位置
    newData.Time = newData.Time = Time.getHours() + ':' + Time.getMinutes() + ':' + Time.getSeconds();
    newData.Cap = 'O__O "…';
    newData.Title = 'NF' + IdNumber;
    newData.Type = 'Drec';
    newData.idNumber = IdNumber;
    JsonData.push(newData);
    //DOM 阶段 新建 一个 DOM 添加一个修改界面
    var temDOM = document.createElement('dd');
    temDOM.className = 'Unclick';
    temDOM.innerHTML = renderData.CreatNewFolder(newData);
    console.log(temDOM);
    Oview.getElementsByTagName('dl')[0].insertBefore(temDOM, Oview.getElementsByTagName('dl')[0].firstChild);
    console.log(OviewDl);
}

function F_findlevel() {
    return OA_NowWhere.length == 0 ? 0 : OA_NowWhere[OA_NowWhere.length - 1];
}

function F_DeleteData() {
    //通过ID找到他们的值
    var Ad = document.getElementsByClassName('Ob');
    console.log(Ad);
    console.log(OviewDl);
    console.log(OA_Group);
    OA_Group.map(function (item) {
        var i = F_manageData.whereTheValue(JsonData, F_manageData.WhoHasTheValue(JsonData, item));//为了赶时间   写了一个恶心的算法  见谅 见谅
      F_manageData.getItChildsAll(JsonData,item);
        //找到他下面的数据全部删除
        // Alldeleted.map(function(item){
        //     var i = F_manageData.whereTheValue(JsonData,item);
        //     JsonData.splice(i, 1);
        // });
        if (JsonData[i]) {
            Deleted.push(JsonData[i]);
            JsonData.splice(i, 1);
        }


        for (var j = 0; j < Ad.length; j++) {
            console.log(Ad[j].parentNode);
            var Adl = document.getElementsByTagName('dl')[0];
            if (Ad[j].dataset.fileid == item) {
                Adl.removeChild(Ad[j].parentNode);
            }
        }

        OA_Group = [];
        Alldeleted =[];
        O_selectAll.checked = false;
    });

}


function F_Down(ev){
    disX = ev.clientX;
    disY = ev.clientY;
    if(!newDiv){
        newDiv = document.createElement('div');
        newDiv.id = 'SelectTab';


        console.log(newDiv);

        document.body.appendChild(newDiv);
    }
    ev.preventDefault();//阻止默认行为

    newDiv.style.width = 0+'px';
    newDiv.style.height = 0+'px';


    newDiv.style.left = disX+'px';
    newDiv.style.top = disY+'px';

    document.addEventListener('mousemove',F_move);
    document.addEventListener('mouseup',F_Up);
}


function F_move(ev){
    var w = ev.clientX-disX;
    var h  = ev.clientY - disY;
    newDiv.style.width = Math.abs(w)+'px';
    newDiv.style.height = Math.abs(h)+'px';
    newDiv.style.left = Math.min(ev.clientX,disX)+'px';
    newDiv.style.top = Math.min(ev.clientY,disY)+'px';

    if(Math.abs(w)>20&&Math.abs(h)>20){
        newDiv.className = 'tabShow';
        var Ad = document.getElementsByClassName('Ob');
        F_Tool.each(Ad,function(item){
            if(F_Tool.Boom(newDiv,item)){
                //执行模拟点击事件。。。。
                F_Tool.removeClass(F_Tool.parents(item, 'dd'), 'Unclick');
                F_Tool.addClass(F_Tool.parents(item, 'dd'), 'Clicked');
                // console.log(tem);
                if(F_manageData.whereTheValue(OA_Group,item.dataset.fileid)=='meiyou'){
                    OA_Group.push(item.dataset.fileid);
                }

                console.log(F_manageData.getChildById(JsonData, F_findlevel()).length);
                if (OA_Group.length == F_manageData.getChildById(JsonData, F_findlevel()).length) {
                    O_selectAll.checked = true;
                } else {
                    O_selectAll.checked = false;
                }//判断 是否全选

            }else{
                F_Tool.removeClass(F_Tool.parents(item, 'dd'), 'Clicked');
                F_Tool.addClass(F_Tool.parents(item, 'dd'), 'Unclick');
                if(F_manageData.whereTheValue(OA_Group,item.dataset.fileid)!='meiyou'){
                    OA_Group.splice(F_manageData.whereTheValue(OA_Group,item.dataset.fileid),1);
                }
            }
        });

    }else{
        newDiv.className = 'tabHide';
    }


    // 在移动的过程中 添加碰撞检测

}

function F_Up(){
    document.removeEventListener('mousemove',F_move);
    document.removeEventListener('mouseup',F_Up);

    newDiv.className = 'tabHide';
}

function F_scroolBar() {

    var OviewDl = document.getElementsByTagName('dl')[0];
    console.log(OviewDl.offsetHeight);
    Oview.style.height = document.body.clientHeight-170+'px';
    if(OviewDl.offsetHeight>Oview.offsetHeight){
        O_ScroolBar.style.display = 'inline-block';
        O_Scroolspan.style.display = 'inline-block';
        O_ScroolBar.style.height = Oview.offsetHeight+'px';
        O_Scroolspan.style.height = (O_ScroolBar.offsetHeight*O_ScroolBar.offsetHeight/OviewDl.offsetHeight)+'px';
        O_Scroolspan.style.top=0;
    }else {
        O_ScroolBar.style.display = 'none';
        O_Scroolspan.style.display = 'none';
    }
}

function F_ScroolUp() {
    O_Scroolspan.onmousemove = null;
    document.removeEventListener('mouseup',F_ScroolUp);
}