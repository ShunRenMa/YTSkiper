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

// 重新整理網頁
const ad_b_window_attr = {
    closeADBW :"允許放送 YouTube 廣告",
    reload:"重新整理網頁"
}

const videoDiv = "html5-video-container"

const url = window.location.href
if (url.indexOf("youtube") > -1) {
    setInterval(() => {
        for (const e of ad_skip_span) {
            let ad_skip_area = document.getElementsByClassName(e)
            if (ad_skip_area[0]) {
                let divs = document.getElementsByClassName(videoDiv)
                for (const div of divs) {
                    let video = div?.getElementsByTagName("video")[0];
                    if (video) {
                        console.log("[tracking] ad skip time")
                        video.currentTime = 1000;
                    }
                }
            }
        }

        for (const e of ad_skip) {
            const elements = document.getElementsByClassName(e);
            if (elements?.[0]) {
                console.log("[tracking] ad skip click")
                elements[0].click()
            }
        }

        for(const e of ad_b_window_attr ){
            const elements = document.querySelectorAll(`[aria-label=${e}]`);
            if (elements?.[0]) {
                console.log("[tracking] ad skip for adb")
                elements[0].click()
            }
        }
    }, 250)
}