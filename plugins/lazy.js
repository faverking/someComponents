class Lazy {
    constructor() {
        this.IO = new IntersectionObserver(callFn.bind(this));
        this.queue = Array();
    }
    add(el, src) {
        this.IO.observe(el);
        this.queue.push(new Elem(el, src))
    }
    remove(el, st) {
        this.queue.some((t, i) => {
            if (t.el === el) {
                st && t.setSrc();
                this.IO.unobserve(el);
                return this.queue.splice(i,1)
            }
        })
    }
}
class Elem {
    constructor(el, src) {
        this.el = el;
        this.src = src;
    }
    setSrc() {
        this.el.setAttribute('src', this.src)
    }
}
function callFn(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            this.remove(entry.target, !0)
        }
    })
}

export default {
    install(Vue, option) {
        const l = new Lazy();
        Vue.directive('lazy',{
            bind: function (el, binding) {
                l.add(el, binding.value.src)
            },
            unbind: function (el, binding) {
                l.remove(el)
            }
        })
    }
}