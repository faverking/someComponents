<template>
    <div class="jumpPage">
        <div class="hit" @click="jump($event)"></div>
        <div class="put" v-if="pageSize > 1">
            共{{pageSize}}页，跳至<input @keydown.enter="input($event)" type="text">页
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            pageNum: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            }
        },
        data() {
            return {
                current: this.pageNum
            }
        },
        watch: {
            pageSize: function (s) {
                this.fill(1, s)
            }
        },
        methods: {
            solve(n) {
                let s = this.pageSize;
                n = n < 1 ? 1 : n > s ? s : n;
                this.current = n;
                this.$emit("change", n);
                this.fill(n, s)
            },
            jump(e) {
                let cur = this.getSuit(e.target);
                if ( cur ) {
                    let n = this.current;
                    switch (cur.className) {
                        case 'prev': this.solve(n - 1); break;
                        case 'next': this.solve(n + 1); break;
                        case 'on': return;
                        default: this.solve(Number(cur.innerText))
                    }
                }
            },
            input(e) {
                let n = parseInt(e.target.value);
                n && this.solve(n)
            },
            fill(n, s) {
                let el = this.$el.children[0];
                let html = '', i = n - 2, c = n + 2;
                n > 1 && (html += '<a class="prev">' +this.appendIcon('prev')+ '</a>');
                n >= 4 && n <= s && (html += '<a>1</a>');
                n - 2 > 2 && s > 5 && (html += '<span class="dot">...</span>');
                for ((n === 1 && s > 4) && c ++, (n === s && n > 4) && i --; i <= c && i <= s; i ++)
                    i >= 1 && s > 1 && (html += i === n ? '<a class="on">'+ i +'</a>': '<a>'+ i +'</a>');
                n + 2 < s - 1 && s > 5 && (html += '<span class="dot">...</span>');
                n <= s - 3 && n >= 1 && (html += '<a>'+ s +'</a>');
                n < s && (html += '<a class="next">' +this.appendIcon('next')+ '</a>');
                el.innerHTML = html
            },
            appendIcon(n) {
                return '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-'+n+'"></use></svg>';
            },
            getSuit(node) {
                switch (node.nodeName.toUpperCase()) {
                    case "A": return node;
                    case "DIV": return null;
                    default: return this.getSuit(node.parentNode);
                }
            }
        },
        mounted() {
            this.fill(this.pageNum, this.pageSize)
        }
    }
</script>
<style>
    .jumpPage{
        width: 620px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 15px 0;
        padding: 0 20px;
    }
    .jumpPage .hit{
        height: 40px;
        font-weight: normal;
    }
    .jumpPage .hit a,
    .jumpPage .hit span{
        display: inline-block;
        text-align: center;
        padding: 0 10px;
        margin: 0 2px;
        min-width: 16px;
        height: 36px;
        line-height: 36px;
        border-radius: 5px;
        border: 1px solid #aaa6ac;
        color: #39383d;
        cursor: pointer;
    }
    .jumpPage .hit a:hover,
    .jumpPage .hit .on{
        color: #ffffff;
        background-color: #e56476;
        border-color: #e56476;
    }
    .jumpPage .hit .dot{
        border: unset;
        background-color: transparent;
        cursor: default;
    }
    .jumpPage .put{
        color: #aaa6ac;
        font-size: 13px;
    }
    .jumpPage .put input{
        padding: 0 8px;
        width: 24px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        margin: 0 5px;
        border-radius: 4px;
        border: 1px solid #aaa6ac;
        outline: unset;
    }
    .jumpPage .put input:focus{
        border-color: #e56476;
    }
</style>