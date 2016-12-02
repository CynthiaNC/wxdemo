!function() {
    var box = $("#box"), span = "span", 
    e = {
        lvT: ['傻A','傻B','傻Bc','傻D','傻E','傻F'],
        render: function(lvMap, f) {
            var h = Math.floor(Math.random() * lvMap * lvMap);  //Math.random() 0-1


            box.find(span).css({
                'background':'url(./img/black1.png)',
                'background-size':'cover'
            });
            box.find(span).eq(h).css({
                'background':'url(./img/black2.png)',
                'background-size':'cover'
            }).data("type", "a");


        },
        getGameOverText: function(lv) {
            var b = 20 > lv ? 0 : Math.ceil((lv - 20) / 10);
            var c = this.lvT[b] || _.last(this.lvT); 
            var d = c+"lv"+lv;
            return {txt: d}
        }};
    API.pic = e
}(); 