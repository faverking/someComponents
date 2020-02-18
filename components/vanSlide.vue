<template>
    <div class="Slide">
        <div class="items" @mouseenter="clearTimer" @mouseleave="startTimer">
            <div class="item" v-for="(t,i) in items">
                <img alt="" :src="t.src">
            </div>
        </div>
        <div class="dots">
            <span v-for="(t,i) in items" @click="tick(i)" :class="{'on': i == dot}"></span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            direct: {
                type: String,
                default: "next"
            },
            timeout: {
                default: 4e3,
                type: Number
            }
        },
        data() {
            return {
                dot: 0,
                total: 0,
                timer: null,
                elem: null,
                nexted: !0,
                width: 0,
                index: 0,
                items: [
                    {src: 'http://49.235.234.235/image/archive/qegl.jpg'},
                    {src: 'http://49.235.234.235/image/archive/qegl.jpg'},
                    {src: 'http://49.235.234.235/image/archive/qegl.jpg'},
                    {src: 'http://49.235.234.235/image/archive/qegl.jpg'},
                    {src: 'http://49.235.234.235/image/archive/qegl.jpg'}
                ]
            }
        },
        watch: {
            dot: function (n, o) {
                this.slide(n, o)
            }
        },
        methods: {
            startTimer() {
                this.clearTimer();
                this.timer = setInterval(() => {
                    this[this.direct]()
                }, this.timeout)
            },
            clearTimer() {
                clearInterval(this.timer)
            },
            prev() {
                this.dot = this.getDot(this.dot - 1);
                this.nexted = !1;
            },
            next() {
                this.dot = this.getDot(this.dot + 1);
                this.nexted = !0;
            },
            tick(t) {
                this.nexted = this.dot < t;
                this.dot = t
            },
            getDot(t) {
                return t > this.total - 1 ? 0 : t < 0 ? this.total - 1 : t;
            },
            slide(t, e) {
                let n = this.elem[t],
                    o = this.elem[e],
                    w = this.width;
                for (let i = 0; i < this.total; i ++) {
                    this.elem[i].style.transition = "none";
                    this.elem[i].style.transform = "translate3d(" +
                        (this.nexted ? w : -w) + "px, 0, 0)"
                }
                o.style.transition = "all 0.5s ease";
                o.style.transform = "translate3d(" + (this.nexted ? -w : w) + "px,0,0)";
                setTimeout(() => {
                    n.style.zIndex = (++ this.index).toString();
                    n.style.transition = "all 0.2s ease";
                    n.style.transform = "translate3d(0,0,0)"
                }, 20)
            }
        },
        created() {
            this.$nextTick(() =>{
                let slider = this.$el.children[0];
                this.elem = slider.children;
                this.total = this.elem.length;
                this.width = slider.offsetWidth;
                this.startTimer()
            })
        }
    }
</script>
<style>
    .Slide .items{
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 10;
    }
    .Slide .items .item{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .Slide .items img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .Slide .dots{
        z-index: 20;
        position: absolute;
        left: 20%;
        bottom: 10%;
        width: 60%;
        height: 18px;
        display: flex;
        justify-content: space-around;
    }
    .Slide .dots span{
        display: block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: rgba(0,0,0,.2);
        cursor: pointer;
    }
    .Slide .dots .on{
        background-color: hsla(0,0%,100%,.5);
    }
</style>