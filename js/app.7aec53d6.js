(function(a){function e(e){for(var n,u,s=e[0],o=e[1],l=e[2],m=0,g=[];m<s.length;m++)u=s[m],Object.prototype.hasOwnProperty.call(i,u)&&i[u]&&g.push(i[u][0]),i[u]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(a[n]=o[n]);d&&d(e);while(g.length)g.shift()();return r.push.apply(r,l||[]),t()}function t(){for(var a,e=0;e<r.length;e++){for(var t=r[e],n=!0,s=1;s<t.length;s++){var o=t[s];0!==i[o]&&(n=!1)}n&&(r.splice(e--,1),a=u(u.s=t[0]))}return a}var n={},i={app:0},r=[];function u(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return a[e].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=a,u.c=n,u.d=function(a,e,t){u.o(a,e)||Object.defineProperty(a,e,{enumerable:!0,get:t})},u.r=function(a){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},u.t=function(a,e){if(1&e&&(a=u(a)),8&e)return a;if(4&e&&"object"===typeof a&&a&&a.__esModule)return a;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:a}),2&e&&"string"!=typeof a)for(var n in a)u.d(t,n,function(e){return a[e]}.bind(null,n));return t},u.n=function(a){var e=a&&a.__esModule?function(){return a["default"]}:function(){return a};return u.d(e,"a",e),e},u.o=function(a,e){return Object.prototype.hasOwnProperty.call(a,e)},u.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],o=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var d=o;r.push([0,"chunk-vendors"]),t()})({0:function(a,e,t){a.exports=t("56d7")},"034f":function(a,e,t){"use strict";t("85ec")},"118f":function(a){a.exports=JSON.parse('{"zones":[{"id":"JHR01","name":"Pulau Aur dan Pulau Pemanggil","state":"Johor"},{"id":"JHR02","name":"Johor Bahru, Kota Tinggi, Mersing","state":"Johor"},{"id":"JHR03","name":"Kluang, Pontian","state":"Johor"},{"id":"JHR04","name":"Batu Pahat, Muar, Segamat, Gemas Johor","state":"Johor"},{"id":"KDH01","name":"Kota Setar, Kubang Pasu, Pokok Sena (Daerah Kecil)","state":"Kedah"},{"id":"KDH02","name":"Kuala Muda, Yan, Pendang","state":"Kedah"},{"id":"KDH03","name":"Padang Terap, Sik","state":"Kedah"},{"id":"KDH04","name":"Baling","state":"Kedah"},{"id":"KDH05","name":"Bandar Baharu, Kulim","state":"Kedah"},{"id":"KDH06","name":"Langkawi","state":"Kedah"},{"id":"KDH07","name":"Puncak Gunung Jerai","state":"Kedah"},{"id":"KTN01","name":"Bachok, Kota Bharu, Machang, Pasir Mas, Pasir Puteh, Tanah Merah, Tumpat, Kuala Krai, Mukim Chiku","state":"Kelantan"},{"id":"KTN03","name":"Gua Musang (Daerah Galas Dan Bertam), Jeli","state":"Kelantan"},{"id":"MLK01","name":"Seluruh Negeri Melaka","state":"Melaka"},{"id":"NGS01","name":"Tampin, Jempol","state":"Negeri Sembilan"},{"id":"NGS02","name":"Jelebu, Kuala Pilah, Port Dickson, Rembau, Seremban","state":"Negeri Sembilan"},{"id":"PHG01","name":"Pulau Tioman","state":"Pahang"},{"id":"PHG02","name":"Kuantan, Pekan, Rompin, Muadzam Shah","state":"Pahang"},{"id":"PHG03","name":"Jerantut, Temerloh, Maran, Bera, Chenor, Jengka","state":"Pahang"},{"id":"PHG04","name":"Bentong, Lipis, Raub","state":"Pahang"},{"id":"PHG05","name":"Genting Sempah, Janda Baik, Bukit Tinggi","state":"Pahang"},{"id":"PHG06","name":"Cameron Highlands, Genting Higlands, Bukit Fraser","state":"Pahang"},{"id":"PLS01","name":"Kangar, Padang Besar, Arau","state":"Perlis"},{"id":"PNG01","name":"Seluruh Negeri Pulau Pinang","state":"Pulau Pinang"},{"id":"PRK01","name":"Tapah, Slim River, Tanjung Malim","state":"Perak"},{"id":"PRK02","name":"Kuala Kangsar, Sg. Siput (Daerah Kecil), Ipoh, Batu Gajah, Kampar","state":"Perak"},{"id":"PRK03","name":"Lenggong, Pengkalan Hulu, Grik","state":"Perak"},{"id":"PRK04","name":"Temengor, Belum","state":"Perak"},{"id":"PRK05","name":"Kg Gajah, Teluk Intan, Bagan Datuk, Seri Iskandar, Beruas, Parit, Lumut, Sitiawan, Pulau Pangkor","state":"Perak"},{"id":"PRK06","name":"Selama, Taiping, Bagan Serai, Parit Buntar","state":"Perak"},{"id":"PRK07","name":"Bukit Larut","state":"Perak"},{"id":"SBH01","name":"Bahagian Sandakan (Timur), Bukit Garam, Semawang, Temanggong, Tambisan, Bandar Sandakan, Sukau","state":"Sabah"},{"id":"SBH02","name":"Beluran, Telupid, Pinangah, Terusan, Kuamut, Bahagian Sandakan (Barat)","state":"Sabah"},{"id":"SBH03","name":"Lahad Datu, Silabukan, Kunak, Sahabat, Semporna, Tungku, Bahagian Tawau  (Timur)","state":"Sabah"},{"id":"SBH04","name":"Bandar Tawau, Balong, Merotai, Kalabakan, Bahagian Tawau (Barat)","state":"Sabah"},{"id":"SBH05","name":"Kudat, Kota Marudu, Pitas, Pulau Banggi, Bahagian Kudat","state":"Sabah"},{"id":"SBH06","name":"Gunung Kinabalu","state":"Sabah"},{"id":"SBH07","name":"Kota Kinabalu, Ranau, Kota Belud, Tuaran, Penampang, Papar, Putatan, Bahagian Pantai Barat","state":"Sabah"},{"id":"SBH08","name":"Pensiangan, Keningau, Tambunan, Nabawan, Bahagian Pendalaman (Atas)","state":"Sabah"},{"id":"SBH09","name":"Beaufort, Kuala Penyu, Sipitang, Tenom, Long Pa Sia, Membakut, Weston, Bahagian Pendalaman (Bawah)","state":"Sabah"},{"id":"SGR01","name":"Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, S.Alam","state":"Selangor"},{"id":"SGR02","name":"Kuala Selangor, Sabak Bernam","state":"Selangor"},{"id":"SGR03","name":"Klang, Kuala Langat","state":"Selangor"},{"id":"SWK01","name":"Limbang, Lawas, Sundar, Trusan","state":"Sarawak"},{"id":"SWK02","name":"Miri, Niah, Bekenu, Sibuti, Marudi","state":"Sarawak"},{"id":"SWK03","name":"Pandan, Belaga, Suai, Tatau, Sebauh, Bintulu","state":"Sarawak"},{"id":"SWK04","name":"Sibu, Mukah, Dalat, Song, Igan, Oya, Balingian, Kanowit, Kapit","state":"Sarawak"},{"id":"SWK05","name":"Sarikei, Matu, Julau, Rajang, Daro, Bintangor, Belawai","state":"Sarawak"},{"id":"SWK06","name":"Lubok Antu, Sri Aman, Roban, Debak, Kabong, Lingga, Engkelili, Betong, Spaoh, Pusa, Saratok","state":"Sarawak"},{"id":"SWK07","name":"Serian, Simunjan, Samarahan, Sebuyau, Meludam","state":"Sarawak"},{"id":"SWK08","name":"Kuching, Bau, Lundu, Sematan","state":"Sarawak"},{"id":"SWK09","name":"Zon Khas (Kampung Patarikan)","state":"Sarawak"},{"id":"TRG01","name":"Kuala Terengganu, Marang, Kuala Nerus","state":"Terengganu"},{"id":"TRG02","name":"Besut, Setiu","state":"Terengganu"},{"id":"TRG03","name":"Hulu Terengganu","state":"Terengganu"},{"id":"TRG04","name":"Dungun, Kemaman","state":"Terengganu"},{"id":"WLY01","name":"Kuala Lumpur, Putrajaya","state":"Wilayah Persekutuan"},{"id":"WLY02","name":"Labuan","state":"Wilayah Persekutuan"}]}')},"3fa2":function(a){a.exports=JSON.parse('{"states":["Johor","Kedah","Kelantan","Melaka","Negeri Sembilan","Pahang","Perak","Perlis","Pulau Pinang","Sabah","Sarawak","Selangor","Terengganu","Wilayah Persekutuan"]}')},"56d7":function(a,e,t){"use strict";t.r(e);t("e260"),t("e6cf"),t("cca6"),t("a79d");var n=t("2b0e"),i=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},r=[],u={name:"App"},s=u,o=(t("034f"),t("2877")),l=Object(o["a"])(s,i,r,!1,null,null,null),d=l.exports,m=t("8c4f"),g=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",{staticClass:"p-3 max-width"},[!a.waktuSolat&&a.isLoading?t("div",[a._v(" loading... ")]):!a.waktuSolat&&a.isError?t("div",[a._v(" error ")]):t("div",[t("div",{staticClass:"m-1"},[t("h2",[a._v(a._s(a.getZone(a.zoneId).state))])]),t("div",{staticClass:"box"},[t("b-form-select",{staticClass:"mb-4",attrs:{options:a.options},on:{change:function(e){return a.getWaktuSolat(a.interval,a.zoneId)}},model:{value:a.zoneId,callback:function(e){a.zoneId=e},expression:"zoneId"}}),t("div",{staticClass:"px-3"},[t("h4",[a._v(a._s(a.waktuSolat[0].day))]),t("p",[a._v(a._s(a.waktuSolat[0].date))]),t("div",{staticClass:"d-flex flex-wrap"},[t("div",{staticClass:"box-muted"},[t("b",[a._v("Imsak")]),a._v(" "+a._s(a.waktuSolat[0].imsak))]),t("div",{staticClass:"box-muted"},[t("b",[a._v("Subuh")]),a._v(" "+a._s(a.waktuSolat[0].fajr))]),t("div",{staticClass:"box-muted"},[t("b",[a._v("Syuruk")]),a._v(" "+a._s(a.waktuSolat[0].syuruk))]),t("div",{staticClass:"box-muted"},[t("b",[a._v("Zuhur")]),a._v(" "+a._s(a.waktuSolat[0].dhuhr))]),t("div",{staticClass:"box-muted"},[t("b",[a._v("Asar")]),a._v(" "+a._s(a.waktuSolat[0].asr))]),t("div",{staticClass:"box-muted"},[t("b",[a._v("Maghrib")]),a._v(" "+a._s(a.waktuSolat[0].maghrib))]),t("div",{staticClass:"box-muted"},[t("b",[a._v("Isyak")]),a._v(" "+a._s(a.waktuSolat[0].isha))])])])],1)])])},h=[],c=t("1da1"),S=(t("96cf"),t("7db0"),t("99af"),t("b0c0"),t("bc3a")),p=t.n(S),b=t("118f"),k=t("3fa2"),P=p.a.create({baseURL:"https://www.e-solat.gov.my/index.php?r=esolatApi/"}),f={data:function(){return{isLoading:!0,isError:!1,zoneId:"WLY01",interval:0,waktuSolat:null,zones:b.zones,states:k.states,options:[]}},mounted:function(){this.getWaktuSolat(this.interval,this.zoneId),this.populateZoneSelect(this.zones,this.states)},methods:{getZone:function(a){return this.zones.find((function(e){return e.id===a}))},getWaktuSolat:function(a,e){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:n.t0=a,n.next=0===n.t0?3:1===n.t0?5:2===n.t0?7:3===n.t0?9:11;break;case 3:return i="today",n.abrupt("break",12);case 5:return i="week",n.abrupt("break",12);case 7:return i="month",n.abrupt("break",12);case 9:return i="year",n.abrupt("break",12);case 11:i="today";case 12:return n.next=14,P.get("TakwimSolat&period=".concat(i,"&zone=").concat(e)).then((function(a){"200"==a.status&&"OK!"==a.data.status?(t.waktuSolat=a.data.prayerTime,t.isLoading=!1,t.isError=!1,console.log(t.waktuSolat)):(t.isLoading=!1,t.isError=!0,window.alert("Error"))})).catch((function(){t.isLoading=!1,t.isError=!0,window.alert("Error")}));case 14:case"end":return n.stop()}}),n)})))()},populateZoneSelect:function(a,e){var t=[],n=[];for(var i in e){for(var r in n=[],a)a[r].state==e[i]&&n.push({value:a[r].id,text:a[r].name});t.push({label:e[i],options:n})}this.options=t,console.log(this.options)}}},K=f,v=(t("cccb"),Object(o["a"])(K,g,h,!1,null,null,null)),w=v.exports;n["default"].use(m["a"]);var B=[{path:"/",name:"home",component:w}],T=new m["a"]({mode:"history",base:"/",routes:B}),_=T,y=t("5f5b"),H=t("b1e0");t("f9e3"),t("2dd8");n["default"].config.productionTip=!1,n["default"].use(y["a"]),n["default"].use(H["a"]),new n["default"]({el:"#app",router:_,render:function(a){return a(d)}})},"5ced":function(a,e,t){},"85ec":function(a,e,t){},cccb:function(a,e,t){"use strict";t("5ced")}});
//# sourceMappingURL=app.7aec53d6.js.map