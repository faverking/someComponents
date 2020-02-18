export default {
    data: function ({url, method, data, call, ...e}) {
        const t = this;
        return new Promise(function (s, j) {
            let r = [
                'application/json; charset=utf-8'
            ]   , xhr = new XMLHttpRequest()
                , b = 'GET' === method.toUpperCase();
            xhr.responseType = e.dataType || 'json';
            xhr.withCredentials = !0;
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4)
                    if (xhr.status >= 200 && xhr.status <= 304) {
                        let e = 'text' !== xhr.responseType
                            ? xhr.response
                            : xhr.responseText;
                        call && call(e); s(e)
                    }
            };
            xhr.onerror = function () {
                e.error && e.error(xhr.status)
            };
            xhr.open(method.toUpperCase(),
                b && data ? url + '?' + t.turn(data, b) : url,!0);
            xhr.setRequestHeader('content-type', r[0]);
            if (e.setHeader)
                Object.keys(e.setHeader).forEach(function (t) {
                    xhr.setRequestHeader(t, e.setHeader[t])
                });
            xhr.send(b ? null : t.turn(data, b))
        })
    },
    jsonp: function ({url, data, call}) {
        let callback = 'callback_' + Math.random().toString().substr(2)
            , l = data ? url + '?' + this.serialize(data) : url
            , t = document.createElement('script')
            , _ = Date.now();
        t.src = l + '&callback=' + callback + '&_=' + _;
        document.body.appendChild(t);
        window[callback] = function (r) {
            call && call(r);
            document.body.removeChild(t);
            delete window[callback]
        }
    },
    serialize: function (d) {
        if (d && 'object' === typeof d)
            return Object.keys(d)
                .map(t => t + '=' + d[t])
                .join('&');
        return ''
    },
    turn: function (d, b) {
        switch (b) {
            case !0: return this.serialize(d);
            case !1: return d && 'object' === typeof d
                ? JSON.stringify(d) : d
        }
    }
};