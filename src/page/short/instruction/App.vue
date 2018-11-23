<template>
    <div class="container">
        <div class="item item-1" @click="goAvg(0)"></div>
        <div class="item item-2" @click="goAvg(1)"></div>
        <div class="item item-3" @click="goAvg(2)"></div>
        <div class="item item-4" @click="goAvg(3)"></div>
        <div class="item item-5" @click="goAvg(4)"></div>
        <div class="topic" @click="goTopic"></div>
    </div>
</template>
<script type="text/javascript">

import {isComicApp} from 'nw-detect'
import Toast from '@/common/toast'
import { updateClient } from '@/common/utils'
import {openAppComic} from 'nw-app-comic'
import { Dialog } from 'vant'
import {setOrUpdate, share} from 'nw-share'
import {callHandler} from 'nejsbridge/dist/bridge.comic.es.js'
import log from "@/common/log"

export default {
    data () {
        return {
            avgInfo: [
                {
                    ititle: '尘沙惑',id:32
                },
                {
                   ititle: '剑起风云之凤凰劫',id:361
                },
                {
                    ititle: '蓝桥几顾',id:13
                },
                {
                    ititle: '结恋',id:44
                },
                {
                    ititle: '恋爱大神求放过',id:64
                }
            ]
        }
    },
    created () {
        setOrUpdate({
            title: '跟着文字去冒险',
            description: '5款超好玩的互动漫画登录网易漫画啦！体验还有机会免费获得7天VIP和周边礼包哟~  ',
            activityId: '20180904',
            picurl: 'https://easyread.nosdn.127.net/web/trunk/1536030825097/share.jpg',
            text: '5款超好玩的互动漫画登录网易漫画啦！体验还有机会免费获得7天VIP和周边礼包哟~  ',
            link: location.href
        }, function () {})
    },
    computed: {
        
    },
    methods: {
        goAvg (index) {
            let query = this.avgInfo[index]
            
            query.action = 33

            log.capture(`avg-1:avg,click,avg-1_${query.id}`)

            if (isComicApp()) {
                var versionMatch = navigator.userAgent.match(/NeteaseComic\/([0-9]+)\.([0-9]+)\.([0-9]+)/i)
                var _a = Number(versionMatch[1])
                var _b = Number(versionMatch[2])
                var _c = Number(versionMatch[3])
                var versionNumber = _a*100 + _b*10 + _c
                if (versionNumber < 441) {
                    Dialog.confirm({
                        title: '',
                        message: '互动漫画仅支持最新版本网易漫画客户端，去升级？'
                    }).then(() => {
                        updateClient()
                    }).catch(() => {
                        // on cancel
                    });
                    
                    return
                }
                location.href = `necomics://manhua.163.com/v1?action=33&id=${query.id}&name=${encodeURIComponent(query.title)}`
            } else {
                Dialog.confirm({
                    title: '',
                    message: '互动漫画仅支持网易漫画客户端内体验，是否下载网易漫画客户端？'
                }).then(() => {
                    location.href = 'https://h5.manhua.163.com/download'
                }).catch(() => {
                    // on cancel
                });

            }
        },
        goTopic () {
            if (isComicApp()) {
                callHandler('pageRedirect', {
                    path: 'topic',
                    query: {
                        id: '7350945'
                    }
                })
            } else {
                location.href = 'https://h5.manhua.163.com/share/topic?tid=7350945'
            }
            
        }
    }
}
</script>
<style type="text/css">
    .container {
        height: 6554px;
        background-image: url(~assets/short/public_back.png);
        background-size: 100%;
        overflow: hidden;
    }

    .container .topic {
        display: block;
        margin-top: 380px;
        margin-left: 215px;
        width: 110px;
        height: 42px;
    }

    .container .item {
        width: 678px;
        background-size: 100% auto;
        margin: 0 auto;
        margin-top: 40px; 
    }

    .container .item-1 {
        margin-top: 936px;
        height: 497px;
        background-image: url(~assets/short/public_back.png);
    }

    .container .item-2 {
        height: 495px;
        background-image: url(~assets/short/public_back.png);
    }

    .container .item-3 {
        height: 497px;
        background-image: url(~assets/short/public_back.png);
    }

    .container .item-4 {
        height: 500px;
        background-image: url(~assets/short/public_back.png);
    }

    .container .item-5 {
        height: 505px;
        background-image: url(~assets/short/public_back.png);
    }
</style>