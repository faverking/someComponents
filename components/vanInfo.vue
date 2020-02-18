<template>
    <div class="Info">
        <p>相关推荐</p>
        <div class="suggests">
            <div class="item" v-for="t in s_items">
                <a class="img" :href="domain+'book?id='+t._id" target="_blank">
                    <img :alt="t.name" :src="t.cover">
                </a>
                <div class="info">
                    <a :href="domain+'book?id='+t._id" target="_blank">{{t.name}}</a>
                    <div class="s-i">
                        <p>{{t.author.toString().replace(',',' ')}}</p>
                        <p>{{t.style.reduce((t,c)=>t+c.name+' ','')}}</p>
                        <p>共 {{t.total}} 话</p>
                    </div>
                </div>
            </div>
        </div>
        <p>相关统计</p>
        <div class="counts">
            <div class="item" v-for="t in c_items">
                <span class="c-a">
                    <i :style="{'background-image': 'url('+t.src+')'}"></i>
                </span>
                <span class="c-i">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="t.icon"></use>
                    </svg>{{t.count}}
                </span>
            </div>
        </div>
        <p class="last">相关链接</p>
        <div class="links">
            <a href="http://49.235.234.235/forum/anime" target="_blank" class="item">
                <img alt="同人站" title="同人站" src="//47.94.7.172/image/common/itemize/view1.png">
            </a>
            <a href="http://49.235.234.235/forum/comic" target="_blank" class="item">
                <img alt="漫画站" title="漫画站" src="//47.94.7.172/image/common/itemize/view2.png">
            </a>
            <a href="http://49.235.234.235/" target="_blank" class="item">
                <img alt="周边站" title="周边站" src="//47.94.7.172/image/common/itemize/view3.png">
            </a>
        </div>
    </div>
</template>
<script>
    import t from "../plugins/option.js"
    export default {
        props: {
            listSize: {
                type: Number,
                default: 4
            },
            listPart: {
                type: Number,
                default: 1
            }
        },
        inject: ["domain","book","statistic"],
        data() {
            return {
                c_items: [
                    {icon:'#icon-member',count:'成员: 233',src:'https://www.gtloli.net/./template/the_c_style/images/3.gif'},
                    {icon:'#icon-article',count:'文章: 233',src:'https://cdn.u1.huluxia.com/g3/M00/DD/B3/wKgBOV2WE8aABeOvAAAjcmGpsn86083.no'},
                    {icon:'#icon-book',count:'书籍: 233',src:'https://www.gtloli.net/./template/the_c_style/images/4.gif'},
                    {icon:'#icon-emoji',count:'留言: 233',src:'https://www.gtloli.net/./template/the_c_style/images/3.gif'}
                ],
                s_items: []
            }
        },
        created() {
            t.jsonp({
                url: this.domain + "api/book/" + this.book[1],
                method: "get",
                data: {
                    size: this.listSize,
                    part: this.listPart
                },
                call: r => {
                    this.s_items = r
                }
            })
        }
    }
</script>
<style>
    @keyframes shake {
        0%,11%,100%{
            transform: none;
        }
        22%{
            transform: skew(-12.5deg,-12.5deg);
        }
        33%{
            transform: skew(6.5deg,6.5deg);
        }
        44%{
            transform: skew(-3.1deg,-3.1deg);
        }
        55%{
            transform: skew(1.6deg,1.6deg);
        }
        66%{
            transform: skew(-0.8deg,-0.8deg);
        }
        77%{
            transform: skew(0.4deg,0.4deg);
        }
        88%{
            transform: skew(-0.2deg,-0.2deg);
        }
    }
    .Info > p{
        font-size: 16px;
        text-indent: 1em;
        padding: 10px 0 6px 0;
        color: #ac9850;
    }
    .Info .last{
        padding-bottom: 0;
        margin-bottom: -5px;
    }
    .Info .links{
        position: relative;
        display: flex;
        justify-content: space-around;
    }
    .Info .links .item{
        display: block;
        width: 150px;
    }
    .Info .links .item img{
        width: 100%;
    }
    .Info .counts .item{
        display: inline-block;
        width: 120px;
        height: 120px;
        text-align: center;
    }
    .Info .counts .c-a{
        display: block;
        width: 75px;
        height: 75px;
        padding: 5px;
        margin: 0 auto 8px;
        border-radius: 50%;
        background-color: #ffffff;
    }
    .Info .counts .c-a i{
        display: block;
        width: 75px;
        height: 75px;
        border-radius: 50%;
    }
    .Info .counts .c-a:hover{
        animation: shake 0.8s both;
    }
    .Info .counts .c-i{
        color: #4f4e59;
        font-size: 13px;
    }
    .Info .counts .icon{
        color: #73c9e5;
        font-size: 15px;
        margin-right: 4px;
    }

    .Info .suggests{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-left: 1.2em;
    }
    .Info .suggests .item{
        width: 260px;
        padding: 10px 0;
        margin: 5px 0 10px 0;
    }
    .Info .suggests .img{
        float: left;
        display: block;
        width: 102px;
        height: 136px;
        border-radius: 4px;
        overflow: hidden;
    }
    .Info .suggests img{
        width: 100%;
        border-radius: 4px;
    }
    .Info .suggests .info{
        position: relative;
        float: right;
        width: 146px;
        height: 100%;
    }
    .Info .suggests .s-i{
        position: absolute;
        bottom: 0;
    }
    .Info .suggests .info a:hover{
        color: #e56476;
    }
    .Info .suggests .info p{
        font-size: 12px;
        line-height: 24px;
        color: #b7b4ba;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>