(function (l) {
    const config = {
        key_name: 'cache',
        dom_name: '.history-box',
        max_count: 10,
        is_signing: !0,
        is_repeat: !0
    };
    function Cache(option) {
        this._ = Object.assign(config,option || {});
        this.bindEvent();
        this.saveHistory();
    }
    function parseUrl() {
        let o = Object();
        if (location.search) {
            let t = location.search.split('?')[1];
            let r = t.split('&');
            r.forEach(function (e) {
                let a = e.split('=');
                o[a[0]] = a[1]
            })
        }
        return o
    }
    function retModel() {
        let d = new Date(Date.now() + 28800000);
        return {
            title: document.title,
            date: d.toJSON().replace(/(^[^-]+-)|T|(:[^:]+$)/g,' ').trim(),
            time: Date.now(),
            url: location.href,
            part: location.pathname.substr(1),
            id: parseUrl().id
        }
    }
    function initGuideBox(e, r) {
        if (r.length <= 0) {
            let d = document.createElement('p');
            d.className = 'no-data';
            d.innerText = '暂无历史记录';
            return e.appendChild(d);
        }
        for (let a of r) {
            e.appendChild(c('a',{
                href: a.url,
                title: a.title,
                target: '_blank',
                class: 'h-item'
            },[
                c('span',{class: 'h-icon'}),
                c('span',{class: 'h-title', text: a.title}),
                c('span',{class: 'h-date', text: a.date})
            ]))
        }
        function c(n, t, e = []) {
            let d = document.createElement(n);
            Object.keys(t).forEach(function (k) {
                'class' !== k ? k === 'text' ? d.innerText = t.text
                    : d.setAttribute(k, t[k])
                    : d.className = t.class
            });
            e.forEach(function (t) {
                d.appendChild(t)
            });
            return d
        }
    }
    Cache.prototype.bindEvent = function () {
        let t = document.querySelector(this._.dom_name);
        let r = this.readHistory();
        initGuideBox(t, r)
    };
    Cache.prototype.readHistory = function () {
        return JSON.parse(l.getItem(this._.key_name)) || [];
    };
    Cache.prototype.saveHistory = function () {
        let d = this.readHistory()
            , m = retModel()
            , r = d.filter(function (e) {
                return e.part !== m.part || m.id !== e.id
            });
        r.length >= this._.max_count && r.pop();
        r.unshift(m);
        l.setItem(this._.key_name, JSON.stringify(r))
    };
    new Cache();
})(localStorage);