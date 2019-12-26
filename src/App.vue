<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// (function(para) {
//   var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
//   if(typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
//       return false;
//   }
//   w['sensorsDataAnalytic201505'] = n;
//   w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
//   var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
//   for (var i = 0; i < ifs.length; i++) {
//     w[n][ifs[i]] = w[n].call(null, ifs[i]);
//   }
//   if (!w[n]._t) {
//     x = d.createElement(s), y = d.getElementsByTagName(s)[0];
//     x.async = 1;
//     x.src = p;
//     x.setAttribute('charset','UTF-8');
//     w[n].para = para;
//     y.parentNode.insertBefore(x, y);
//   }
// })({
//   sdk_url: 'https://cdn.jsdelivr.net/npm/sa-sdk-javascript@1.13.14/sensorsdata.min.js',
//   heatmap_url: 'https://cdn.jsdelivr.net/npm/sa-sdk-javascript@1.13.14/heatmap.min.js',
//   name: 'sensors',
//   server_url: 'http://159.138.166.17:8106/sa',
//   heatmap:{},
//   is_track_single_page:true
// });
//  sensors.quick('autoTrack');
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>

<style>
* {
  outline: 0;
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
  -moz-user-select:none;/*火狐*/
  -webkit-user-select:none;/*webkit浏览器*/
  -ms-user-select:none;/*IE10*/
  -khtml-user-select:none;/*早期浏览器*/
  user-select:none;
}
body {
  background-color: #fafafa;
}
#app {
  font-family: Helvetica,"Avenir", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a{
  color: #333;
}
</style>