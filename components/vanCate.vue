<template>
    <div class="catalog">
        <div class="item c-p">
            <h4>版块</h4>
            <div class="theme" @click="tick('part',$event)">
                <span data-i="0" class="on">全部</span>
                <span data-i="1">漫画</span>
                <span data-i="2">小说</span>
                <span data-i="3">其他</span>
            </div>
        </div>
        <div class="item c-f">
            <h4>题材</h4>
            <div class="theme" @click="tick('style',$event)">
                <span data-i="0" class="on">全部</span>
                <span data-i="1">剧情</span>
                <span data-i="2">恋爱</span>
                <span data-i="3">日常</span>
                <span data-i="4">搞笑</span>
                <span data-i="5">治愈</span>
                <span data-i="6">奇幻</span>
                <span data-i="7">冒险</span>
                <span data-i="8">校园</span>
                <span data-i="9">少年</span>
                <span data-i="10">少女</span>
                <span data-i="11">悬疑</span>
                <span data-i="12">历史</span>
                <span data-i="13">古风</span>
                <span data-i="14">其他</span>
            </div>
        </div>
        <div class="item c-a">
            <h4>地区</h4>
            <div class="theme" @click="tick('area',$event)">
                <span data-i="0" class="on">全部</span>
                <span data-i="1">大陆</span>
                <span data-i="2">日本</span>
                <span data-i="3">其他</span>
            </div>
        </div>
        <div class="item c-s">
            <h4>状态</h4>
            <div class="theme" @click="tick('status',$event)">
                <span data-i="0" class="on">全部</span>
                <span data-i="1">连载</span>
                <span data-i="2">完结</span>
            </div>
        </div>
        <div class="item c-o">
            <h4>排序</h4>
            <div class="theme" @click="tick('order',$event)">
                <span data-i="0" class="on">默认</span>
                <span data-i="1">热度</span>
                <span data-i="2">更新</span>
                <span data-i="3">上架</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                category: {
                    part: 0,
                    style: 0,
                    area: 0,
                    status: 0,
                    order: 0
                }
            }
        },
        methods:{
            tick(c, e) {
                let cur = e.target;
                if (cur.nodeName.toUpperCase() === "SPAN") {
                    let n = this.category[c];
                    let i = Number(cur.dataset.i);
                    let root = e.currentTarget;
                    if (n === i) return;
                    root.children[n].className = '';
                    root.children[i].className = 'on';
                    this.category[c] = i;
                    this.turn()
                }
            },
            turn() {
                let o = this.category
                    , b = Object.keys(o).map(t => t + "=" + o[t])
                    , c = b.join("&");
                this.$emit('change', c)
            }
        }
    }
</script>
<style>
    .catalog{
        width: 300px;
    }
    .catalog h4{
        width: 100%;
        height: 44px;
        line-height: 44px;
        font-weight: 400;
        text-indent: 1em;
        border-bottom: 1px solid rgba(0,0,0,.1);
        color: #4f4e59;
    }
    .catalog .theme{
        padding: 8px 0 0 1em;
        color: #aaa6ac;
        font-weight: normal;
    }
    .catalog .theme span{
        display: inline-block;
        width: 52px;
        text-align: center;
        line-height: 30px;
        margin-bottom: 15px;
        cursor: pointer;
    }
    .catalog .theme span:hover{
        color: #4f4e59;
    }
    .catalog .theme span.on{
        color: #ffffff;
        border-radius: 15px;
        background-color: #e56476;
    }
</style>