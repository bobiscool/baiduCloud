/**
 * Created by mac on 16/9/23.
 */

/*
 *
 * 此 js 文件 用于 创建 随机的 文件夹 json 数据   首先是
 * 随机创建 文件夹   随机所属关系 然后  随机 添加文件
 * 文件格式 的不同 图片也就不同
 */


var ClassiFy = {
    PictureData: [],
    VideoData: [],
    FileData: [],
    AudioData: [],
    OtherData: [],
    DrecData: [],
    Torrent:[]
}
var MaybeParent = [0];
var JsonData = (function () {
// 产生随机文件数目
    var a = Math.floor(Math.random() * 150 + 40);
// 随机 产生 文件  文件夹
    var b = Math.floor(Math.random() * (a * 0.4));//文件夹
    var c = a - b;  //文件
    var fileString = 'avi-ppt-css-eps-pdf-mp3-HTML-txt-doc-jpg-dll-xls-docx-psd-wav-zip';
    var file = fileString.split('-'); //文件类型

    var jsonData = [];
//产生随机文件夹
    function CreatData(call) {
        var Time = new Date();
        var newData = {};
        newData.pid = getRandom(MaybeParent);
        newData.idNumber = i;
        if (call == "Drec") {//如果是目录文件 那么在目录文件 出 加 上他
            MaybeParent.push(i);
        }
        newData.Title = randomWord(true, 3, 7);
        newData.Type = call;
        newData.Time = Time.getHours() + ':' + Time.getMinutes() + ':' + Time.getSeconds();
        if (call == "Drec") {
            newData.Cap = 'O__O "…';
            ClassiFy.DrecData.push(newData);
        } else {
            newData.Cap = Math.floor(Math.random() * 9000+1000) + 'KB';
        }


        switch (call) {
            case 'avi':
                ClassiFy.VideoData.push(newData);
                break;
            case 'mp3':
                ClassiFy.AudioData.push(newData);
                break;
            case 'wav':
                ClassiFy.AudioData.push(newData);
                break;
            case 'eps':
                ClassiFy.PictureData.push(newData);
                break;
            case 'jpg':
                ClassiFy.PictureData.push(newData);
                break;
            case 'psd':
                ClassiFy.PictureData.push(newData);
                break;
            case 'ppt':
                ClassiFy.FileData.push(newData);
                break;
            case 'css':
                ClassiFy.FileData.push(newData);
                break;
            case 'pdf':
                ClassiFy.FileData.push(newData);
                break;
            case 'HTML':
                ClassiFy.FileData.push(newData);
                break;
            case 'txt':
                ClassiFy.FileData.push(newData);
                break;
            case 'doc':
                ClassiFy.FileData.push(newData);
                break;
            case 'xls':
                ClassiFy.FileData.push(newData);
                break;
            case 'docx':
                ClassiFy.FileData.push(newData);
                break;
            case 'dll':
                ClassiFy.OtherData.push(newData);
                break;
            case 'zip':
                ClassiFy.OtherData.push(newData);
                break;
        }

        // console.log(newData);
        return newData;
    }


    for (var i = 1; i <= b; i++) {
        jsonData.push(CreatData('Drec'));// 保存目录数据
    }

    for (i = b + 1; i <= a; i++) {
        jsonData.push(CreatData(getRandom(file)));// 保存 文件数据
    }


    function getRandom(Array) {
        return Array[Math.floor(Math.random() * (Array.length - 1))];
    }

    function randomWord(randomFlag, min, max) {
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
            pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }

    return jsonData;
})();

// console.log(JsonData);


