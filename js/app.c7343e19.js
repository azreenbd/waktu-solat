(function(a){function e(e){for(var t,i,o=e[0],s=e[1],l=e[2],g=0,m=[];g<o.length;g++)i=o[g],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&m.push(r[i][0]),r[i]=0;for(t in s)Object.prototype.hasOwnProperty.call(s,t)&&(a[t]=s[t]);d&&d(e);while(m.length)m.shift()();return u.push.apply(u,l||[]),n()}function n(){for(var a,e=0;e<u.length;e++){for(var n=u[e],t=!0,o=1;o<n.length;o++){var s=n[o];0!==r[s]&&(t=!1)}t&&(u.splice(e--,1),a=i(i.s=n[0]))}return a}var t={},r={app:0},u=[];function i(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return a[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=a,i.c=t,i.d=function(a,e,n){i.o(a,e)||Object.defineProperty(a,e,{enumerable:!0,get:n})},i.r=function(a){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},i.t=function(a,e){if(1&e&&(a=i(a)),8&e)return a;if(4&e&&"object"===typeof a&&a&&a.__esModule)return a;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:a}),2&e&&"string"!=typeof a)for(var t in a)i.d(n,t,function(e){return a[e]}.bind(null,t));return n},i.n=function(a){var e=a&&a.__esModule?function(){return a["default"]}:function(){return a};return i.d(e,"a",e),e},i.o=function(a,e){return Object.prototype.hasOwnProperty.call(a,e)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],s=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var d=s;u.push([0,"chunk-vendors"]),n()})({0:function(a,e,n){a.exports=n("56d7")},"034f":function(a,e,n){"use strict";n("85ec")},"118f":function(a){a.exports=JSON.parse('{"zones":[{"id":"JHR01","name":"Pulau Aur dan Pulau Pemanggil","state":"Johor"},{"id":"JHR02","name":"Johor Bahru, Kota Tinggi, Mersing","state":"Johor"},{"id":"JHR03","name":"Kluang, Pontian","state":"Johor"},{"id":"JHR04","name":"Batu Pahat, Muar, Segamat, Gemas Johor","state":"Johor"},{"id":"KDH01","name":"Kota Setar, Kubang Pasu, Pokok Sena (Daerah Kecil)","state":"Kedah"},{"id":"KDH02","name":"Kuala Muda, Yan, Pendang","state":"Kedah"},{"id":"KDH03","name":"Padang Terap, Sik","state":"Kedah"},{"id":"KDH04","name":"Baling","state":"Kedah"},{"id":"KDH05","name":"Bandar Baharu, Kulim","state":"Kedah"},{"id":"KDH06","name":"Langkawi","state":"Kedah"},{"id":"KDH07","name":"Puncak Gunung Jerai","state":"Kedah"},{"id":"KTN01","name":"Bachok, Kota Bharu, Machang, Pasir Mas, Pasir Puteh, Tanah Merah, Tumpat, Kuala Krai, Mukim Chiku","state":"Kelantan"},{"id":"KTN03","name":"Gua Musang (Daerah Galas Dan Bertam), Jeli","state":"Kelantan"},{"id":"MLK01","name":"Seluruh Negeri Melaka","state":"Melaka"},{"id":"NGS01","name":"Tampin, Jempol","state":"Negeri Sembilan"},{"id":"NGS02","name":"Jelebu, Kuala Pilah, Port Dickson, Rembau, Seremban","state":"Negeri Sembilan"},{"id":"PHG01","name":"Pulau Tioman","state":"Pahang"},{"id":"PHG02","name":"Kuantan, Pekan, Rompin, Muadzam Shah","state":"Pahang"},{"id":"PHG03","name":"Jerantut, Temerloh, Maran, Bera, Chenor, Jengka","state":"Pahang"},{"id":"PHG04","name":"Bentong, Lipis, Raub","state":"Pahang"},{"id":"PHG05","name":"Genting Sempah, Janda Baik, Bukit Tinggi","state":"Pahang"},{"id":"PHG06","name":"Cameron Highlands, Genting Higlands, Bukit Fraser","state":"Pahang"},{"id":"PLS01","name":"Kangar, Padang Besar, Arau","state":"Perlis"},{"id":"PNG01","name":"Seluruh Negeri Pulau Pinang","state":"Pulau Pinang"},{"id":"PRK01","name":"Tapah, Slim River, Tanjung Malim","state":"Perak"},{"id":"PRK02","name":"Kuala Kangsar, Sg. Siput (Daerah Kecil), Ipoh, Batu Gajah, Kampar","state":"Perak"},{"id":"PRK03","name":"Lenggong, Pengkalan Hulu, Grik","state":"Perak"},{"id":"PRK04","name":"Temengor, Belum","state":"Perak"},{"id":"PRK05","name":"Kg Gajah, Teluk Intan, Bagan Datuk, Seri Iskandar, Beruas, Parit, Lumut, Sitiawan, Pulau Pangkor","state":"Perak"},{"id":"PRK06","name":"Selama, Taiping, Bagan Serai, Parit Buntar","state":"Perak"},{"id":"PRK07","name":"Bukit Larut","state":"Perak"},{"id":"SBH01","name":"Bahagian Sandakan (Timur), Bukit Garam, Semawang, Temanggong, Tambisan, Bandar Sandakan, Sukau","state":"Sabah"},{"id":"SBH02","name":"Beluran, Telupid, Pinangah, Terusan, Kuamut, Bahagian Sandakan (Barat)","state":"Sabah"},{"id":"SBH03","name":"Lahad Datu, Silabukan, Kunak, Sahabat, Semporna, Tungku, Bahagian Tawau  (Timur)","state":"Sabah"},{"id":"SBH04","name":"Bandar Tawau, Balong, Merotai, Kalabakan, Bahagian Tawau (Barat)","state":"Sabah"},{"id":"SBH05","name":"Kudat, Kota Marudu, Pitas, Pulau Banggi, Bahagian Kudat","state":"Sabah"},{"id":"SBH06","name":"Gunung Kinabalu","state":"Sabah"},{"id":"SBH07","name":"Kota Kinabalu, Ranau, Kota Belud, Tuaran, Penampang, Papar, Putatan, Bahagian Pantai Barat","state":"Sabah"},{"id":"SBH08","name":"Pensiangan, Keningau, Tambunan, Nabawan, Bahagian Pendalaman (Atas)","state":"Sabah"},{"id":"SBH09","name":"Beaufort, Kuala Penyu, Sipitang, Tenom, Long Pa Sia, Membakut, Weston, Bahagian Pendalaman (Bawah)","state":"Sabah"},{"id":"SGR01","name":"Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, S.Alam","state":"Selangor"},{"id":"SGR02","name":"Kuala Selangor, Sabak Bernam","state":"Selangor"},{"id":"SGR03","name":"Klang, Kuala Langat","state":"Selangor"},{"id":"SWK01","name":"Limbang, Lawas, Sundar, Trusan","state":"Sarawak"},{"id":"SWK02","name":"Miri, Niah, Bekenu, Sibuti, Marudi","state":"Sarawak"},{"id":"SWK03","name":"Pandan, Belaga, Suai, Tatau, Sebauh, Bintulu","state":"Sarawak"},{"id":"SWK04","name":"Sibu, Mukah, Dalat, Song, Igan, Oya, Balingian, Kanowit, Kapit","state":"Sarawak"},{"id":"SWK05","name":"Sarikei, Matu, Julau, Rajang, Daro, Bintangor, Belawai","state":"Sarawak"},{"id":"SWK06","name":"Lubok Antu, Sri Aman, Roban, Debak, Kabong, Lingga, Engkelili, Betong, Spaoh, Pusa, Saratok","state":"Sarawak"},{"id":"SWK07","name":"Serian, Simunjan, Samarahan, Sebuyau, Meludam","state":"Sarawak"},{"id":"SWK08","name":"Kuching, Bau, Lundu, Sematan","state":"Sarawak"},{"id":"SWK09","name":"Zon Khas (Kampung Patarikan)","state":"Sarawak"},{"id":"TRG01","name":"Kuala Terengganu, Marang, Kuala Nerus","state":"Terengganu"},{"id":"TRG02","name":"Besut, Setiu","state":"Terengganu"},{"id":"TRG03","name":"Hulu Terengganu","state":"Terengganu"},{"id":"TRG04","name":"Dungun, Kemaman","state":"Terengganu"},{"id":"WLY01","name":"Kuala Lumpur, Putrajaya","state":"Wilayah Persekutuan"},{"id":"WLY02","name":"Labuan","state":"Wilayah Persekutuan"}]}')},"56d7":function(a,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var t=n("2b0e"),r=function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},u=[],i={name:"App"},o=i,s=(n("034f"),n("2877")),l=Object(s["a"])(o,r,u,!1,null,null,null),d=l.exports,g=n("8c4f"),m=function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("div",{staticClass:"p-3"},[!a.waktuSolat&&a.isLoading?n("div",[a._v(" loading... ")]):!a.waktuSolat&&a.isError?n("div",[a._v(" error ")]):n("div",[n("h2",[a._v(a._s(a.getZone(a.zoneId).state))]),n("b-form-select",{attrs:{options:a.options},on:{change:function(e){return a.getWaktuSolat(a.interval,a.zoneId)}},model:{value:a.zoneId,callback:function(e){a.zoneId=e},expression:"zoneId"}}),a._v(" "+a._s(a.waktuSolat[0].date)+" "+a._s(a.waktuSolat[0].day)+" "),n("p",[a._v("Imsak "+a._s(a.waktuSolat[0].imsak))]),n("p",[a._v("Subuh "+a._s(a.waktuSolat[0].fajr))]),n("p",[a._v("Syuruk "+a._s(a.waktuSolat[0].syuruk))]),n("p",[a._v("Zuhur "+a._s(a.waktuSolat[0].dhuhr))]),n("p",[a._v("Asar "+a._s(a.waktuSolat[0].asr))]),n("p",[a._v("Maghrib "+a._s(a.waktuSolat[0].maghrib))]),n("p",[a._v("Isyak "+a._s(a.waktuSolat[0].isha))])],1)])},h=[],S=n("1da1"),c=(n("96cf"),n("7db0"),n("99af"),n("b0c0"),n("bc3a")),p=n.n(c),k=n("118f"),b=p.a.create({baseURL:"https://www.e-solat.gov.my/index.php?r=esolatApi/"}),P={data:function(){return{isLoading:!0,isError:!1,zoneId:"WLY01",interval:0,waktuSolat:null,zones:k.zones,options:[]}},mounted:function(){this.getWaktuSolat(this.interval,this.zoneId),this.populateZoneSelect(this.zones)},methods:{getZone:function(a){return this.zones.find((function(e){return e.id===a}))},getWaktuSolat:function(a,e){var n=this;return Object(S["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:t.t0=a,t.next=0===t.t0?3:1===t.t0?5:2===t.t0?7:3===t.t0?9:11;break;case 3:return r="today",t.abrupt("break",12);case 5:return r="week",t.abrupt("break",12);case 7:return r="month",t.abrupt("break",12);case 9:return r="year",t.abrupt("break",12);case 11:r="today";case 12:return t.next=14,b.get("TakwimSolat&period=".concat(r,"&zone=").concat(e)).then((function(a){"200"==a.status&&"OK!"==a.data.status?(n.waktuSolat=a.data.prayerTime,n.isLoading=!1,n.isError=!1,console.log(n.waktuSolat)):(n.isLoading=!1,n.isError=!0,window.alert("Error"))})).catch((function(){n.isLoading=!1,n.isError=!0,window.alert("Error")}));case 14:case"end":return t.stop()}}),t)})))()},populateZoneSelect:function(a){var e=[];for(var n in a)e.push({value:a[n].id,text:a[n].name});e.push={value:"asdad",text:"afaff"},this.options=e}}},f=P,K=(n("cccb"),Object(s["a"])(f,m,h,!1,null,null,null)),B=K.exports;t["default"].use(g["a"]);var w=[{path:"/",name:"home",component:B}],v=new g["a"]({mode:"history",base:"/",routes:w}),T=v,y=n("5f5b"),H=n("b1e0");n("f9e3"),n("2dd8");t["default"].config.productionTip=!1,t["default"].use(y["a"]),t["default"].use(H["a"]),new t["default"]({el:"#app",router:T,render:function(a){return a(d)}})},"5ced":function(a,e,n){},"85ec":function(a,e,n){},cccb:function(a,e,n){"use strict";n("5ced")}});
//# sourceMappingURL=app.c7343e19.js.map