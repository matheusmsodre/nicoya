var videoAutostart = 1;
var vars = getUrlVars();
if (vars["ap"] == "1") {
    videoAutostart = 0;
}

if (vars["bl"] == "1") {
    removeStyle("getStarted");
}

if (vars["ttl"] == "3" || vars["ttl"] == undefined) {
    $("#conteinerVideoTitle").remove();
} else {
    $("#conteinerVideoTitle").addClass("d-none2");

}
if (vars["ttl"] == "1") {
    addStyle("videoTitle");
} else {
    removeStyle("videoTitle");
    $("#conteinerVideoTitle").removeClass("d-none2");
}
leaveOneTitle(vars["ttl"])

function leaveOneTitle(ttl) {
    if (!ttl) {
        ttl = 0;
    }
    for (var i = 0; i < 10; i++) {
        var list = document.getElementsByClassName("ttl" + i);
        for (var j = 0; j < list.length; j++) {
            if (i == ttl) {
                list[j].classList.remove("d-none2");
            } else {
                list[j].classList.add("d-none2");
            }
        }

    }
}

function removeStyle(id) {
    if (document.getElementById(id)) {
        document.getElementById(id).classList.remove("d-none2");
    } else {
        window.setTimeout(removeStyle, 10, id);
    }
}

function addStyle(id, cls) {
    if (!cls) {
        cls = "d-none2";
    }
    if (document.getElementById(id)) {
        document.getElementById(id).classList.add(cls);
    } else {
        window.setTimeout(addStyle, 10, id);
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

var videoID = "nTw_9-2fWcA";
videosize();

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

var playing = false;
var currentTime = 0;
var expandPeriod = 10000; //10 seconds
var needToView = 2470; //seconds

var savedCurrentTime = loadData("currentTime");
if (savedCurrentTime) {
    currentTime = savedCurrentTime;
}

var previousVisit = loadData("previousVisit");
if (previousVisit) {
    $(".hidden-content").show();
    $(".bg").addClass('sales-page');
    $(".bg-foot").addClass('delayed');
    $("body").removeClass('bg_temporary');
}
saveData("previousVisit", 1, 365 * 24 * 60); // save in local storage for 1 year

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}
var vars = getUrlVars();

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '720',
        width: '1280',
        videoId: videoID,
        playerVars: {
            autoplay: videoAutostart,
            cc_load_policy: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            playsinline: 1,
            modestbranding: 1,
            iv_load_policy: 3,
            rel: 0,
            showinfo: 0,
            host: 'https://www.youtube.com'
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    player.seekTo(currentTime);
    if (currentTime == 0) {
        if (videoAutostart) {
            player.mute();
            myPlayVideo();
            $("#mute-button").show();
            $("#pause-button").hide();
            $("#first-button").hide();
        } else {
            player.unMute();
            myPauseVideo();
            $("#mute-button").hide();
            $("#pause-button").hide();
            $("#first-button").show();
        }

    } else {
        $("#first-button").hide();
        $("#mute-button").hide();
        $("#pause-button").show();
        myPauseVideo();
    }
}


function onPlayerStateChange(event) {

    if (event.data == YT.PlayerState.PAUSED) {
        playing = false;
    }
    if (event.data == YT.PlayerState.PLAYING) {
        playing = true;
    }
}

window.setInterval(expandCurrentTime, expandPeriod)
var showed = false;

function expandCurrentTime() {
    if (playing) {
        currentTime += expandPeriod / 1000;
        saveData("currentTime", currentTime, 1 * 24 * 60); // save in local storage for 1 day
    }
    if (currentTime >= needToView) {
        $(".hidden-content").show();
        if (!showed) {
            firebase.analytics().logEvent('bottles_showed', {
                'currentTime': currentTime
            });
            console.log('bottle showed');
            showed = true;
        }
    }
    if (player && player.isMuted && player.isMuted() && playing) {
        $("#mute-button").show();
    }
}

function saveData(name, value, minutes) {
    var now = new Date();
    var expired = now.getTime() + minutes * 60 * 1000;
    var dataToSave = {
        value: value,
        expired: expired
    };
    localStorage.setItem(name, JSON.stringify(dataToSave));
}

function loadData(name) {
    var res = null;
    var dataFromStorage = localStorage.getItem(name);
    if (dataFromStorage) {
        var dataObj = JSON.parse(dataFromStorage);
        var now = new Date();
        if (dataObj.expired < now.getTime()) {
            localStorage.removeItem(name);
        } else {
            res = dataObj.value;
        }
    }
    return res;
}

function myPauseVideo() {
    player.pauseVideo();
    $("#videoRow").removeClass("playing");
    $('.glass-overlay').css("height", 'auto');
    $('.video_section').removeClass("playing");
    $('.youtube_player_body').addClass("container");
    $('.youtube_player_body>.text').removeClass("container");
    $('.sticky-top').css('z-index', 1020);
}

function myPlayVideo() {
    player.playVideo();
    $("#videoRow").addClass("playing");
    $('.glass-overlay').css("height", '100%');
    $('.video_section').addClass("playing");
    $('.youtube_player_body').removeClass("container");
    $('.youtube_player_body>.text').addClass("container");
    $('.sticky-top').css('z-index', -1);

    var md = new MobileDetect(window.navigator.userAgent);

    if (!md.mobile()) {
        $(window).scrollTop($('#videoRow').offset().top);
    } else {
        $(window).scrollTop($('#videoRow').offset());
    }

    if ($(window).width() < 768) {
        $(window).scrollTop($('#videoRow').offset().top);
    }
}

$("#mute-button").click(function() {
    if (player && player.unMute) {
        player.unMute();
        $("#mute-button").css('display', 'none');
    }
});
$("#pause-button, #first-button").click(function() {
    if (player && player.unMute && player.playVideo) {
        myPlayVideo();
        player.unMute();
        $("#pause-button").css('display', 'none');
        $("#first-button").css('display', 'none');
        console.log('continue_clicked');
        firebase.analytics().logEvent('continue_clicked', {
            'currentTime': currentTime
        });
    }
});
$(".glass-overlay").click(function() {
    if (player && player.pauseVideo) {
        myPauseVideo();
        player.setVolume(100);
        $("#pause-button").css('display', 'block');
    }
});

function videosize() {
    var w1 = $(window).width();
    var h1 = $(window).height();
    if (w1 > h1) {
        videoID = "nTw_9-2fWcA";
        $(".responsive-video").css({
            paddingBottom: "56.25%"
        })
    } else {
        videoID = "4Vpb1NI_4nQ";
        $(".responsive-video").css({
            paddingBottom: "82.78%"
        });
        $(".responsive-video.no-hd").css({
            paddingBottom: "152.78%"
        })
    }
}