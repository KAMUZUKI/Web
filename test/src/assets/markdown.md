## 一、主要

#### 1、主展示头像修改

```php
https://s2.loli.net/2022/03/24/uRodcpYeQlULvkf.jpg
```

#### 2、侧栏作者信息底部链接

```html
<a class="social-icon" href="https://github.com/KAMUZUKI" target="_BLANK" title="Github"><i class="fa-brands "><img  src="/usr/themes/butterfly/img/github.ico" height="32" width="32"/></i></a>
<a class="social-icon" href="https://gitee.com/kamuzuki_admin" target="_BLANK" title="Gitee"><i class="fa-brands "><img  src="/usr/themes/butterfly/img/gitee.ico" height="32" width="32"/></i></a>
<a class="social-icon" href="https://blog.csdn.net/qq_52027688?spm=1010.2135.3001.5343" target="_BLANK" title="CSDN"><i class="fa-brands"><img src="/usr/themes/butterfly/img/csdn.ico" height="32" width="32"/></i></a>
```

#### 3、其它设置

- 作者描述：软件工程专业，爱好科技数码

- 建站时间：2021/03/20

## 二、音乐播放器

#### 1、 header.php中添加

```php
<?php $this->need('player.php'); ?>
```

#### 2、 添加 player.php 文件

```php
<link rel="stylesheet" href="<?php Helper::options()->themeUrl('font/iconfont.css'); ?>">
<link rel="stylesheet" href="<?php Helper::options()->themeUrl('css/playerStyle.css'); ?>">
<script src="<?php Helper::options()->themeUrl('js/jquery-3.4.1.min.js'); ?>"></script>
<script src="<?php Helper::options()->themeUrl('js/player.js'); ?>"></script>
<div id="player">
    <!-- 歌曲信息模块 -->
    <div id="player-content1">
        <!-- 歌曲名 -->
        <div class="music-name"></div>
        <!-- 歌手名 -->
        <div class="artist-name"></div>
        <!-- 歌曲时间 -->
        <div class="time">
            <!-- 当前播放的时间 -->
            <div class="current-time"></div>
            <!-- 歌曲总时长 -->
            <div class="total-time"></div>
        </div>
        <!-- 进度条 -->
        <div id="s-area">
            <!-- 鼠标移动到进度条上，显示的时间信息 -->
            <div id="ins-time"></div>
            <!-- 鼠标移动到进度条上，进度条变暗部分-->
            <div id="s-hover"></div>
            <!-- 表示当前歌曲播放进度的蓝色进度条 -->
            <div id="seek-bar"></div>
        </div>
    </div>

    <!-- 控制模块 -->
    <div id="player-content2">
        <!-- 左侧歌曲封面旋转模块 -->
        <div class="music-imgs">
            <!-- 封面图 -->
            <div class="img"></div>
            <!-- 歌曲缓冲时的提示文字 -->
            <div id="buffer-box">缓冲…</div>
        </div>
        <!-- 右侧歌曲操作模块 -->
        <div class="player-controls">
            <!-- 上一首按钮 -->
            <div class="btn prev iconfont">&#xe603;</div>
            <!-- 暂停/播放 按钮 -->
            <div class="btn play-pause icon-jiediankaishi iconfont"></div>
            <!-- 下一首按钮 -->
            <div class="btn next iconfont">&#xe602;</div>
            <p class="word">音</p>
            <p class="word">乐</p>
        </div>
    </div>
</div>
```

#### 3、playerStyle.css 添加

```css
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
#player{
    position: fixed;
    top: 15vh;
    left:-282px;
    transform: scale(0.8);
    transition:0.4s;
    z-index: 1;
}

#player:hover{
    left: -33px;
    transition:0.4s;
}

#player-content1{
    position: absolute;
    top:0px;
    left:15px;
    width:320px;
    height:90px;
    padding:0 20px 0 130px;
    background: rgb(209, 226, 245);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    /* transition过渡动画：设置top属性过渡，过渡时间0.3s,速度曲线为ease(逐渐变慢) */
    transition:top 0.3s ease; 
}
#player-content1.active{
    top:-85px;
}
.music-name,
.artist-name{
    height: 20px;
    margin-top:5px;
    font-size:14px;
}
.artist-name{
    font-size:12px;
    color: #656565
}
.time{
    font-size:12px;
    height:15px;
    margin: 5px 0;
}
.current-time{
    float: left;
}
.total-time{
    float: right;
}
.current-time,.total-time{
    color: transparent;
    font-size: 11px;
    background-color: #e8f5ff;
    border-radius: 10px;
    transition: 0.3s ease all;
}
.time.active .current-time, .time.active .total-time{
    color: rgb(54, 127, 196);
    background-color: transparent;
}


#s-area, #seek-bar{
    position: relative;
    height: 4px;
    border-radius: 4px;
}

#s-area{
    background-color:#e8f5ff;
    cursor: pointer;
}

#ins-time{
    position: absolute;
    top: -29px;
    color: #fff;
    font-size: 12px;
    white-space: pre;
    padding: 5px 6px;
    border-radius: 4px;
    display:none;
}

#s-hover{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    opacity: 0.2;
    z-index: 2;
}

#ins-time, #s-hover{
    background-color: #4b4d5c;
}

#seek-bar{
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0;
    background-color: rgb(54, 127, 196);
    transition: 0.2s ease width;
}

#player-content2{
    position: relative;
    width:350px;
    height:90px;

    background: #fff;
    border-radius: 20px;
    box-shadow: 0 30px 80px #656565;
}
/* 左侧封面图模块 */
.music-imgs{
    position: absolute;
    top: -40px;
    width: 100px;
    height: 100px;
    margin-left: 30px;
    -webkit-transform: rotateZ(0);
    transform: rotateZ(0);
    transition: 0.3s ease all;
    box-shadow: 0 0 0 10px #fff;
    border-radius: 50%;
    overflow: hidden;
}
/* 左侧封面图模块添加了active类名 */
.music-imgs.active{
    top: -50px;
    box-shadow: 0 0 0 4px #e8f5ff, 0 30px 50px -15px #afb7c1;
}
.music-imgs:before{
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    width: 20px;
    height: 20px;
    margin: -10px auto 0 auto;
    background-color: #d6dee7;
    border-radius: 50%;
    box-shadow: inset 0 0 0 2px #fff;
    z-index: 2;
}
/* 左侧封面图模块下的 图片div */
.music-imgs .img{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
/* 封面图模块添加了active类名后，图片div的样式添加 */
.music-imgs.active .img{
    z-index: 1;
    -webkit-animation: rotateAlbumArt 3s linear 0s infinite forwards;
            animation: rotateAlbumArt 3s linear 0s infinite forwards;
}
@-webkit-keyframes rotateAlbumArt
{
    0%{ -webkit-transform: rotateZ(0); transform: rotateZ(0); }
    100%{ -webkit-transform: rotateZ(360deg); transform: rotateZ(360deg); }
}

@keyframes rotateAlbumArt
{
    0%{ -webkit-transform: rotateZ(0); transform: rotateZ(0); }
    100%{ -webkit-transform: rotateZ(360deg); transform: rotateZ(360deg); }
}
#buffer-box
{
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    height: 13px;
    color: #1f1f1f;
    font-size: 13px;
    font-family: Helvetica;
    text-align: center;
    font-weight: bold;
    line-height: 1;
    padding: 6px;
    margin: -12px auto 0 auto;
    background-color: rgba(255, 255, 255, 0.19);
    opacity: 0;
    z-index: 2;
}

.music-imgs .img, #buffer-box
{
    transition: 0.1s linear all;
}

.music-imgs.buffering .img
{
    opacity: 0.25;
}

.music-imgs.buffering .img.active
{
    opacity: 0.8;
    filter: blur(2px);
    -webkit-filter: blur(2px);
}

.music-imgs.buffering #buffer-box
{
    opacity: 1;
}

.player-controls{
    position: absolute;
    top:20px;
    left:150px;
}

.player-controls .word{
    position: relative;
    float: left;
    right: 8px;
    top: 4px;
}

.player-controls .btn{
    float: left;
    width:60px;
    height:60px;
    line-height: 60px;
    font-size:24px;
    color:#D6DEE7;
}
```

#### 4、player.js 添加

```javascript
$(function(){
    var playerContent1 = $('#player-content1');// 歌曲信息模块部分dom元素
    var musicName = $('.music-name');          // 歌曲名部分dom元素 
    var artistName = $('.artist-name');        // 歌手名部分dom元素

    var musicImgs = $('.music-imgs');          // 左侧封面图dom元素

    var playPauseBtn = $('.play-pause');       // 播放/暂停按钮 dom元素
    var playPrevBtn = $('.prev');              // 上一首按钮 dom元素
    var playNextBtn = $('.next')               // 下一首按钮 dom元素

    var time = $('.time');                     // 时间信息部分 dom元素
    var tProgress = $('.current-time');        // 当前播放时间文本部分 dom元素
    var totalTime = $('.total-time');          // 歌曲总时长文本部分 dom元素

    var sArea = $('#s-area');                  // 进度条部分
    var insTime = $('#ins-time');              // 鼠标移动至进度条上面，显示的信息部分
    var sHover = $('#s-hover');                // 鼠标移动至进度条上面，前面变暗的进度条部分
    var seekBar = $('#seek-bar');              // 播放进度条部分

    // 一些计算所需的变量
    var seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0
    var musicImgsData = ['http://175.178.212.207/usr/uploads/2022/03/857869969.jpg','http://175.178.212.207/usr/uploads/2022/03/187290108.jpg','http://175.178.212.207/usr/uploads/2022/03/3850525059.jpgg','http://175.178.212.207/usr/uploads/2022/03/1571923816.jpg']    // 图片地址数组
    var musicNameData = ['You','Lonely Day','Born a Stranger','Between Worlds'];                   // 歌曲名数组
    var artistNameData = ['Approaching Nirvana','Jurrivh','Kan Gao Laura Shigihara','Roger Subirana']            // 创作歌手数组
    var musicUrls=['http://175.178.212.207/usr/uploads/2022/03/2699581898.mp3','http://175.178.212.207/usr/uploads/2022/03/2127341736.mp3','http://175.178.212.207/usr/uploads/2022/03/1564076114.mp3','http://175.178.212.207/usr/uploads/2022/03/864516063.mp3'];// 歌曲mp3数组
    var currIndex = -1;              // 当前播放索引

    var buffInterval = null          // 初始化定时器 判断是否需要缓冲
    var len = musicNameData.length;  // 歌曲长度


    // 点击 播放/暂停 按钮，触发该函数
    // 作用：根据audio的paused属性 来检测当前音频是否已暂停  true:暂停  false:播放中
    function playPause(){
        if(audio.paused){
            playerContent1.addClass('active'); // 内容栏上移
            musicImgs.addClass('active');      // 左侧图片开始动画效果
            playPauseBtn.attr('class','btn play-pause icon-zanting iconfont') // 显示暂停图标
            checkBuffering(); // 检测是否需要缓冲
            audio.play();     // 播放
        }else{
            playerContent1.removeClass('active'); // 内容栏下移
            musicImgs.removeClass('active');      // 左侧图片停止旋转等动画效果
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont'); // 显示播放按钮
            clearInterval(buffInterval);          // 清除检测是否需要缓冲的定时器
            musicImgs.removeClass('buffering');    // 移除缓冲类名
            audio.pause(); // 暂停
        }  
    }


    // 鼠标移动在进度条上， 触发该函数    
    function showHover(event){
        seekBarPos = sArea.offset();    // 获取进度条长度
        seekT = event.clientX - seekBarPos.left;  //获取当前鼠标在进度条上的位置
        seekLoc = audio.duration * (seekT / sArea.outerWidth()); //当前鼠标位置的音频播放秒数： 音频长度(单位：s)*（鼠标在进度条上的位置/进度条的宽度）

        sHover.width(seekT);  //设置鼠标移动到进度条上变暗的部分宽度

        cM = seekLoc / 60;    // 计算播放了多少分钟： 音频播放秒速/60

        ctMinutes = Math.floor(cM);  // 向下取整
        ctSeconds = Math.floor(seekLoc - ctMinutes * 60); // 计算播放秒数

        if( (ctMinutes < 0) || (ctSeconds < 0) )
            return;

        if( (ctMinutes < 0) || (ctSeconds < 0) )
            return;

        if(ctMinutes < 10)
            ctMinutes = '0'+ctMinutes;
        if(ctSeconds < 10)
            ctSeconds = '0'+ctSeconds;

        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
            insTime.text(ctMinutes+':'+ctSeconds);  // 设置鼠标移动到进度条上显示的信息

        insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);  // 淡入效果显示

    }

    // 鼠标移出进度条，触发该函数
    function hideHover()
    {
        sHover.width(0);  // 设置鼠标移动到进度条上变暗的部分宽度 重置为0
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0); // 淡出效果显示
    }

    // 鼠标点击进度条，触发该函数
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc; // 设置音频播放时间 为当前鼠标点击的位置时间
        seekBar.width(seekT);        // 设置进度条播放长度，为当前鼠标点击的长度
        hideHover();                 // 调用该函数，隐藏原来鼠标移动到上方触发的进度条阴影
    }

    // 在音频的播放位置发生改变是触发该函数
    function updateCurrTime()
    {
        nTime = new Date();      // 获取当前时间
        nTime = nTime.getTime(); // 将该时间转化为毫秒数

        // 计算当前音频播放的时间
        curMinutes = Math.floor(audio.currentTime  / 60);
        curSeconds = Math.floor(audio.currentTime  - curMinutes * 60);

        // 计算当前音频总时间
        durMinutes = Math.floor(audio.duration / 60);
        durSeconds = Math.floor(audio.duration - durMinutes * 60);

        // 计算播放进度百分比
        playProgress = (audio.currentTime  / audio.duration) * 100;

        // 如果时间为个位数，设置其格式
        if(curMinutes < 10)
            curMinutes = '0'+curMinutes;
        if(curSeconds < 10)
            curSeconds = '0'+curSeconds;

        if(durMinutes < 10)
            durMinutes = '0'+durMinutes;
        if(durSeconds < 10)
            durSeconds = '0'+durSeconds;

        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
            tProgress.text(curMinutes+':'+curSeconds);

        if( isNaN(durMinutes) || isNaN(durSeconds) )
            totalTime.text('00:00');
        else
            totalTime.text(durMinutes+':'+durSeconds);

        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            time.removeClass('active');
        else
            time.addClass('active');

        // 设置播放进度条的长度
        seekBar.width(playProgress+'%');

        // 进度条为100 即歌曲播放完时
        if( playProgress == 100 )
        {
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont'); // 显示播放按钮
            seekBar.width(0);              // 播放进度条重置为0
            tProgress.text('00:00');       // 播放时间重置为 00:00
            musicImgs.removeClass('buffering').removeClass('active');  // 移除相关类名
            clearInterval(buffInterval);   // 清除定时器

            selectTrack(1);  // 添加这一句，可以实现自动播放
        }
    }

    // 定时器检测是否需要缓冲
    function checkBuffering(){
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            // 这里如果音频播放了，则nTime为当前时间毫秒数，如果没播放则为0；如果时间间隔过长，也将缓存
            if( (nTime == 0) || (bTime - nTime) > 1000  ){ 
                musicImgs.addClass('buffering');  // 添加缓存样式类
            } else{
                musicImgs.removeClass('buffering'); // 移除缓存样式类
            }

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    // 点击上一首/下一首时，触发该函数。 
    //注意：后面代码初始化时，会触发一次selectTrack(0)，因此下面一些地方需要判断flag是否为0
    function selectTrack(flag){
        if( flag == 0 || flag == 1 ){  // 初始 || 点击下一首
            ++ currIndex;
            if(currIndex >=len){      // 当处于最后一首时，点击下一首，播放索引置为第一首
                currIndex = 0;
            }
        }else{                    // 点击上一首
            --currIndex;
            if(currIndex<=-1){    // 当处于第一首时，点击上一首，播放索引置为最后一首
                currIndex = len-1;
            }
        }

        if( flag == 0 ){
            playPauseBtn.attr('class','btn play-pause icon-jiediankaishi iconfont'); // 显示播放图标
        }else{
            musicImgs.removeClass('buffering');   
            playPauseBtn.attr('class','btn play-pause icon-zanting iconfont') // 显示暂停图标
        }

        seekBar.width(0);           // 重置播放进度条为0
        time.removeClass('active');
        tProgress.text('00:00');    // 播放时间重置
        totalTime.text('00:00');    // 总时间重置

        // 获取当前索引的:歌曲名，歌手名，图片，歌曲链接等信息
        currMusic = musicNameData[currIndex];
        currArtist = artistNameData[currIndex];
        currImg = musicImgsData[currIndex];
        audio.src = musicUrls[currIndex];

        nTime = 0;
        bTime = new Date();
        bTime = bTime.getTime();

        // 如果点击的是上一首/下一首 则设置开始播放，添加相关类名，重新开启定时器
        if(flag != 0){
            audio.play();
            playerContent1.addClass('active');
            musicImgs.addClass('active');

            clearInterval(buffInterval);
            checkBuffering();
        }

        // 将歌手名，歌曲名，图片链接，设置到元素上
        artistName.text(currArtist);
        musicName.text(currMusic);
        musicImgs.find('.img').css({'background':'url('+currImg+')'})
    }


    // 初始化函数
    function initPlayer() {
        audio = new Audio();  // 创建Audio对象
        selectTrack(0);       // 初始化第一首歌曲的相关信息
        audio.loop = false;   // 取消歌曲的循环播放功能

        playPauseBtn.on('click',playPause); // 点击播放/暂停 按钮，触发playPause函数

        // 进度条 移入/移出/点击 动作触发相应函数
        sArea.mousemove(function(event){ showHover(event); }); 
        sArea.mouseout(hideHover);
        sArea.on('click',playFromClickedPos);  

        // 实时更新播放时间
        $(audio).on('timeupdate',updateCurrTime); 

        // 上下首切换
        playPrevBtn.on('click',function(){ selectTrack(-1);} );
        playNextBtn.on('click',function(){ selectTrack(1);});
    }

    // 调用初始化函数
    initPlayer();

});
```

#### 5、jquery文件

- 复制jquery-3.4.1.min.js到js文件夹中
