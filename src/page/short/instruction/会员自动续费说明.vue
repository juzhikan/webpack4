<template>
    <div style="height:100%;">
        <div class="tab">
            <div :class="activeIndex === 0 ? 'active' : ''" @click="activeIndex = 0">会员自动续费</div>
            <div :class="activeIndex === 1 ? 'active' : ''" @click="activeIndex = 1">取消自动续费</div>
            <div class="tabLine" :style="computedLeft"></div>
        </div>
        <div v-show="activeIndex === 0" class="tab-content-renew">
            <h2>会员自动续费说明</h2>
            <p>会员自动续费是指：当您选择购买自动续费类型的阅读时长，App Store会在每月固定时间为您自动续费并自动增加相应的有效阅读天数；</p>
            <p emphasize-paragraph>开通后，您可在App Store中随时取消次月的自动续费服务。</p>
            <p>1、您可以选择开通连续包月，并在接下来的包月周期（31天）内享受VIP特权；</p>
            <p>2、App Store会在次月扣费前24小时检查您的账号状态，当您的余额不足下月扣费额度或支付方式出现问题时，自动续费将停止，您会收到苹果的系统提示；</p>
            <p>3、苹果公司规定，对于同一种订阅服务，一个Apple ID仅限开通一个。如您的Apple ID已开通连续包月且需要在设备上为其他网易漫画账号开通此订阅服务，请切换Apple ID后重新开通；</p>
            <p>4、自动续费功能不支持多平台同时订阅，当您在iOS平台开通了自动续费时，则不允许在其他平台再次使用其他支付方式进行自动续费；</p>
            <p>5、通过网易漫画官方途径或其他第三方合作平台获得的网易漫画会员天数累加不受自动续费影响；</p>
            <p>6、当您订购了自动续费额外的VIP会员产品时，AppStore仍会按照每月固定时间扣费，因此可能会与到期时间存在时间差，敬请谅解；</p>
            <p>7、您可以随时查看网易漫画<a href="/static/agreement.html" emphasize-sentence>用户协议</a>、<a href="/static/privacy-policy.html" emphasize-sentence>隐私条款</a>及<a href="/static/autorenew_agreement_ios.html" emphasize-sentence>自动续费用户协议</a>。</p>
        </div>
        <div v-show="activeIndex === 1" class="tab-content-break">
            <img src="~assets/agreements/account_openvip_cancel_01.png" alt=""/>
            <img src="~assets/agreements/account_openvip_cancel_02.png" alt=""/>
            <img src="~assets/agreements/account_openvip_cancel_03.png" alt=""/>
            <img src="~assets/agreements/account_openvip_cancel_04.png" alt=""/>
            <img src="~assets/agreements/account_openvip_cancel_05.png" alt=""/>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    data () {
        return {
            activeIndex: 0
        }
    },
    created () {
        
    },
    computed: {
        computedLeft () {
            if (this.activeIndex == 0) {
                return `left: ${128/75}rem;`
            }
            return `left: ${503/75}rem;`
        }
    }
}
</script>
<style type="text/css">
    .tab {
        display: flex;
        text-align: center;
        height: 100px;
        line-height: 100px;
        background: #F5F5F5;
        box-shadow: inset 0 -1px 0 0 #D9D9D9;
        font-size: 32px;
        color: #666666;
        position: relative;
    }

    .tab .tabLine {
        position: absolute;
        width: 120px;
        height: 4px;
        bottom: 0;
        left: 128px;
        background: #F75F3A;
        border-radius: 5px;
        transition: 0.2s left;
    }

    .tab > div {
        flex: 1;
    }

    .tab > div.active {
        color: #1A1A1A;
    }

    .tab-content-renew {
        font-size: 28px;
        color: #666666;
        text-align: justify;
        line-height: 44px;
        padding: 40px 30px;
    }

    .tab-content-renew h2 {
        font-size: 32px;
        color: #1A1A1A;
        margin-bottom: 40px;
    }

    .tab-content-renew p {
        margin-bottom: 20px;
    }

    .tab-content-renew p[emphasize-paragraph] {
        margin-bottom: 40px;
        color: #F75F3A;
    }

    .tab-content-renew a[emphasize-sentence] {
        color: #1885F2;
    }

    .tab-content-break img {
        width: 100%;
        height: auto;
        display: block;
    }
</style>