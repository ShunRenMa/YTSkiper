console.log("YTCoooooooler is loaded");

// 略過廣告本體按鈕
const ad_skip = [
    "ytp-ad-skip-button",
    "ytp-ad-overlay-close-button",
    "ytp-ad-skip-button-modern",

    // 2024.04 add
    "ytp-skip-ad-button"
]

// 略過廣告外框
const ad_skip_span = [
    "ytp-ad-preview-container",

    // 2024.04 add
    "ytp-preview-ad"
]

// ADB 第一頁
// const ad_b_window_attr = ["允許放送 YouTube 廣告","重新整理網頁"]
const ad_b_window_attr = ["允許放送 YouTube 廣告"]

const videoDiv = "html5-video-container";

// 出現 ADB 時的背景遮罩
const bg_block_cover_tag = "tp-yt-iron-overlay-backdrop";

// ADB iframe
const adb_iframe_div_class = ['fc-whitelist-dialog']

const url = window.location.href
let hasAD = false;
let videoCurrentTime = 0;
if (url.indexOf("youtube") > -1) {
    setInterval(() => {

        for (const e of ad_skip_span) {
            let ad_skip_area = document.getElementsByClassName(e)
            if (ad_skip_area[0]) {
                const divs = document.getElementsByClassName(videoDiv)
                for (const div of divs) {
                    let video = div?.getElementsByTagName("video")[0];
                    if (video) {
                        console.log("[tracking] ad skip time")
                        video.currentTime = 1000;
                        hasAD = true;
                    }
                }
            }
        }

        for (const e of ad_skip) {
            const elements = document.getElementsByClassName(e);
            if (elements?.[0]) {
                console.log("[tracking] ad skip click")
                elements[0].click()
                hasAD = true;
            }
        }

        for(const e of ad_b_window_attr ){
            const elements = document.querySelectorAll(`[aria-label='${e}']`);
            if (elements?.[0]) {
                console.log("[tracking] ad skip for adb ",elements[0])
                elements[0].click()
                hasAD = true;
            }
        }

        

        for (const e of adb_iframe_div_class) {
            const elements = document.getElementsByClassName(e);
            const video = document.querySelector(`.${videoDiv} video`);
          
            if(video && !hasAD){
                videoCurrentTime = video.currentTime === 0 ? videoCurrentTime : video.currentTime;
                console.log("video c = ",videoCurrentTime);
            }
            if (elements?.[0]) {
                console.log("[tracking] ad skip for adb iframe ",elements[0])
                const targetTimeParam = `&t=${Math.ceil(videoCurrentTime)}s`;
                const isLive = !!document.querySelector(".ytp-live");
                window.location.href = `${window.location.href.replace(/&t=\d+s/, '')}${isLive ? '' : targetTimeParam}`;
                break;
            }
        }

        hasAD = false;
        document.getElementsByTagName(bg_block_cover_tag)[0]?.remove();

    }, 250)
}

function setBodyOverflow() {
    window.requestAnimationFrame(() => {
        document.body.style.setProperty('overflow', '', 'important');
        setBodyOverflow(); 
    });
}