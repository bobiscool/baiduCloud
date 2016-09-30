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
var childs = [];
var OA_Group = [];
var OA_NowWhere = [];
var IdNumber = JsonData.length;
// console.log(O_Howmany);

F_RenderData(JsonData,0,'Cap','Up');

// setInterval(function(){
//     F_ChangeTheToolBar(OA_Group);
// },50);//定时监督
//添加 点击事件
//点击事件区域
OItemList.addEventListener('click',function(ev){
    if(ev.target.tagName=='LI'){
        F_Tool.removeClass(Old,'active');
        F_Tool.addClass(ev.target,'active');
        F_ShowWho(ev.target.dataset.showwhat);
        Old = ev.target;
    }else if(F_Tool.parents(ev.target,'li')!=null){
        var tem = F_Tool.parents(ev.target,'li');
        F_Tool.removeClass(Old,'active');
        F_Tool.addClass(tem,'active');
        F_ShowWho(tem.dataset.showwhat);
        Old = tem;
    }else {
        console.log('oh no');
    }

});
O_Lswich.addEventListener('click',function(){
    F_Tool.removeClass(Oview,'Gird-view');
    F_Tool.addClass(Oview,'List-view');
    F_Tool.removeClass(O_LGswich,'gird-switch-on');
    F_Tool.addClass(O_LGswich,'list-switch-on');
    O_Operation.className ='';
    F_Tool.addClass(O_Operation,'UchoosedItemList');
});
O_Gswich.addEventListener('click',function(){
    F_Tool.addClass(Oview,'Gird-view');
    F_Tool.removeClass(Oview,'List-view');
    F_Tool.addClass(O_LGswich,'gird-switch-on');
    F_Tool.removeClass(O_LGswich,'list-switch-on');
    O_Operation.className ='';
    F_Tool.addClass(O_Operation,'UchoosedItemGird');
});
O_NameUD.addEventListener('click',function (){
    if(O_NameUD.getElementsByTagName('span')[0].className == 'Down'){
        O_NameUD.getElementsByTagName('span')[0].className = 'Up';
        F_RenderData(JsonData,F_findlevel(),'Title','Up');
    }else{
        O_NameUD.getElementsByTagName('span')[0].className = 'Down';
        F_RenderData(JsonData,F_findlevel(),'Title','down');
    }
});
O_CapUD.addEventListener('click',function () {
    if(O_CapUD.getElementsByTagName('span')[0].className == 'Down'){
        O_CapUD.getElementsByTagName('span')[0].className = 'Up';
        F_RenderData(JsonData,F_findlevel(),'Cap','Up');
    }else{
        O_CapUD.getElementsByTagName('span')[0].className = 'Down';
        F_RenderData(JsonData,F_findlevel(),'Cap','down');
    }
});
O_TimeUD.addEventListener('click',function () {
    if(O_TimeUD.getElementsByTagName('span')[0].className == 'Down'){
        O_TimeUD.getElementsByTagName('span')[0].className = 'Up';
        F_RenderData(JsonData,F_findlevel(),'Time','Up');
    }else{
        O_TimeUD.getElementsByTagName('span')[0].className = 'Down';
        F_RenderData(JsonData,F_findlevel(),'Time','down');
    }
});
O_selectAll.addEventListener('click',function (ev){
    // console.log(ev.target);
        if(ev.target.checked){
            F_toSelectAll();
        }else {
            F_toSelectAllNot();
        }
});//全选建
var OviewDl = document.getElementsByTagName('dl')[0];
setInterval(function () {
    F_ChangeTheToolBar();
    O_Howmany.innerHTML =OA_Group.length;
    if(OA_NowWhere.length==0){
        O_Navtitle.className = 'Nav-title Notin';
    }else{
        O_Navtitle.className = 'Nav-title InaDrec';
    }
},50);

Oview.addEventListener('click',function (ev) {
    var tem = F_Tool.parents(ev.target,'.Ob');
    if(tem){
        if(ev.target.className!=''&&tem.dataset.filetype=='Drec'){
            F_RenderData(JsonData,tem.dataset.fileid,'Title','down');
            OA_NowWhere.push(tem.dataset.fileid);//保存ID
            F_createNav();
            //OA_Group = [];
            //这个地方就得 开始渲染导航框了
        }else{
            //push进入数组  开始打打勾 第二次点击 就取消打勾
            F_Tool.toggleClass(F_Tool.parents(ev.target,'dd'),'Unclick','Clicked');
            // console.log(tem);
            F_manageData.ToogleArray(OA_Group,tem.dataset.fileid);
            // console.log(OA_Group);
            if(OA_Group.length==childs.length){
                O_selectAll.checked =true;
            }else{
                O_selectAll.checked =false;
            }//判断 是否全选

        }
    }
});//文件点击操作

O_Navtitleul.addEventListener('click',function (ev) {
   console.log(F_Tool.parents(ev.target,'li').dataset.showwhat);
    if(F_Tool.parents(ev.target,'li')){
        if(F_Tool.parents(ev.target,'li').dataset.showwhat!=0){

            OA_NowWhere = F_deleteBehind(OA_NowWhere,F_Tool.parents(ev.target,'li').dataset.showwhat);
           // console.log(OA_NowWhere);
            F_NavRender(F_Tool.parents(ev.target,'li').dataset.showwhat);
        }else{
            OA_NowWhere=[];
            F_NavRender(F_Tool.parents(ev.target,'li').dataset.showwhat);
        }
    }

});

O_NewFolder.addEventListener('mouseup',function(ev){
    if(F_Tool.parents(ev.target,'.NewFolder')){
        //function new folder
        F_createNewFolder();
    }
});


//点击事件区域

function F_ShowWho(showwho) {
    if(showwho=='All'){
        //这里就直接 跑到根目录
        F_RenderData(JsonData,0,'Cap','Up');
    }else{
        F_RenderData(ClassiFy[showwho],'n','Cap','Up');
        OA_NowWhere =[];
        //console.log(ClassiFy[showwho]);
    }
}//此函数 是 侧边栏 的函数

function F_RenderData(data,renderId,Attr,UD){
    clearAll();//不知道这样设置 是否是个坑  一旦重新渲染 就清空
    OviewDl = document.getElementsByTagName('dl')[0];
    // console.log(data);
    var tempData='';
    var html="";
    if(!isNaN(renderId)){
        childs = F_manageData.UpOrDown(F_manageData.getChildById(data,renderId),Attr,UD);

    }else{
        // console.log(data);
        // console.log(childs);
        childs =  F_manageData.UpOrDown(data,Attr,UD);  //两种渲染模式  一种是渲染子集  一种是渲染 当前 数据  现在没用它
    }

    childs.map(function (item) {
        tempData='';
        if(item.Type!="Drec"){
            tempData = '.'+item.Type;
        }
        html+=renderData.fileHtml(item,tempData);
    });

    Oview.innerHTML = '<dl>'+html+'</dl>';
}//渲染函数

function F_ChangeTheToolBar(){
     if(OA_Group.length==0){
            if(F_Tool.hasClass(Oview,'Gird-view')){
                O_Operation.className = 'UchoosedItemGird';
            }else{
                O_Operation.className = 'UchoosedItemList';
            }
     }else{
         O_Operation.className = 'ChoosedItem';
     }



}
function F_toSelectAll(){
    var A_tem=Oview.getElementsByTagName('dd');
    F_manageData.each(A_tem,function (a) {
        F_Tool.addClass(a,'Clicked');
        F_Tool.removeClass(a,'Unclick');
        OA_Group.push(a.getElementsByClassName('Ob')[0].dataset.fileid);
    });

}

function F_toSelectAllNot(){
    var A_tem=Oview.getElementsByTagName('dd');
    F_manageData.each(A_tem,function (a) {
        F_Tool.addClass(a,'Unclick');
        F_Tool.removeClass(a,'Clicked');
    });
    OA_Group =[];

}

function clearAll() {
    O_Howmany.innerHTML=0;
    OA_Group=[];
    O_selectAll.checked =false;
}

function F_createNav(){//id 与 第几个是对应得 但是 是减去一的关系!!!!!
    O_Navtitleul.innerHTML=renderData.StaticHtml(OA_NowWhere);
    OA_NowWhere.forEach(function (item) {
       O_Navtitleul.innerHTML +=renderData.crNav(F_manageData.WhoHasTheValue(JsonData,item));
       console.dir(JsonData[item-1]);
    });
}




function F_NavRender(id) {
    F_RenderData(JsonData,id,'Cap','Up');
    F_createNav();
}
function F_fromArraygetData(Arr,data) {
    var tem =[];
    Arr.forEach(function(item){
        tem.push(data[item-1]);
    });
    return tem;
}

function F_deleteBehind(Arr,number) {
    return Arr.slice(0,F_manageData.whereTheValue(Arr,number)+1);
}

function F_createNewFolder() {
    //数据层 新建 这时候跟 i有关了 卧槽。。。
    //点击新建IDnumber就加1
    var Time = new Date();
    IdNumber++;
    //数据层
    var newData={};
    newData.pid = F_findlevel();//现在所处文件夹的位置
    newData.Time=  newData.Time = Time.getHours() + ':' + Time.getMinutes() + ':' + Time.getSeconds();
    newData.Cap = 'O__O "…';
    newData.Title='新建文件夹'+IdNumber;
    newData.Type ='Drec';
    newData.idNumber = IdNumber;
    JsonData.push(newData);
    //DOM 阶段 新建 一个 DOM 添加一个修改界面
    var temDOM = document.createElement('dd');
    temDOM.className ='Unclick';
    temDOM.innerHTML = renderData.CreatNewFolder(newData);
    console.log(temDOM);
    Oview.getElementsByTagName('dl')[0].insertBefore(temDOM,  Oview.getElementsByTagName('dl')[0].firstChild);
    console.log(OviewDl);
}

function  F_findlevel() {
    return OA_NowWhere.length==0?0:OA_NowWhere[OA_NowWhere.length-1];
}

function F_changeName(targetid) {
    //点击重命名时  先是隐藏现在的标题 然后是 显示value  vlue 就是 现在所在id的name
    //当点击  编辑时  显示 input框  然后 后面跟着 勾和叉

}