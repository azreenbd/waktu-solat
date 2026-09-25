<template>
    <div class="p-3 max-width">
        <div v-if="!isDirectory && !waktuSolat && isLoading" class="d-flex align-items-center h-100">
            <div class="loader" role="status"><span class="sr-only">Memuatkan…</span></div>
        </div>
        <div v-else-if="!isDirectory && !waktuSolat && isError" class="d-flex align-items-center h-100">
            <div class="d-flex flex-column" role="alert">
                <logo color="#a2a2a2" class="m-4 align-self-center" />
                <p class="align-self-center">Ralat memuatkan data.</p>
                <small class="text-muted align-self-center">Maaf, terdapat masalah untuk memuatkan laman web. Sila cuba lagi.</small>
            </div>
        </div>
        <div v-else class="d-flex align-items-center h-100">
            <div>
                <div class="d-flex align-items-end m-1 mb-3">
                    <logo class="mr-1" />
                    <h1 ref="heading" class="h2 m-0" tabindex="-1"><span class="sr-only">Waktu Solat </span>{{ place }}</h1>
                </div>
                
                <div v-if="isDirectory" class="box" :class="{ dark: darkMode }">
                    <label for="zone-select" class="sr-only">Pilih zon</label>
                    <b-form-select id="zone-select" :value="null" :options="directoryOptions" class="mb-2" :class="{ dark: darkMode }" @change="onZoneChange"></b-form-select>

                    <div v-for="zone in currentState.zones" :key="zone.id" class="mt-4">
                        <h2 class="zone-title h6 mb-2">{{ zone.id }}</h2>
                        <div>
                            <router-link v-for="town in zoneTowns(zone.id)" :key="town.townSlug" :to="townPath(town)" class="pill-link" :class="{ dark: darkMode }">{{ town.town }}</router-link>
                        </div>
                    </div>
                </div>

                <div v-else class="box" :class="{ dark: darkMode }">
                    <label for="zone-select" class="sr-only">Pilih zon</label>
                    <b-form-select id="zone-select" v-model="zoneId" :options="options" class="mb-4" :class="{ dark: darkMode }" @change="onZoneChange"></b-form-select>

                    <div>
                        <div class="pl-1 mb-5">
                            <p class="text-muted mb-2">{{ translateDay(waktuSolat[0].day) }}, {{ formatDate(waktuSolat[0].date) }}</p>    

                            <p class="h1 text-green">{{ nowSolat.name }}</p>
                            <p class="h3">{{ formatTime(nowSolat.time) }}</p>
                        </div>
                        <h2 class="sr-only">Waktu solat hari ini</h2>
                        <ul class="d-flex flex-wrap list-unstyled mb-0">
                            <li class="sub-box" :class="{ dark: darkMode }">
                                <div class="mb-3 title">Imsak</div>
                                <div class="lead"><time :datetime="waktuSolat[0].imsak">{{ formatTime(waktuSolat[0].imsak) }}</time></div>
                            </li>
                            <li class="sub-box" :class="{ active: isSubuh, dark: darkMode }" :aria-current="isSubuh ? 'true' : null">
                                <div class="mb-3 title">Subuh<span v-if="isSubuh" class="sr-only"> (waktu sekarang)</span></div>
                                <div class="lead"><time :datetime="waktuSolat[0].fajr">{{ formatTime(waktuSolat[0].fajr) }}</time></div>
                            </li>
                            <li class="sub-box" :class="{ dark: darkMode }">
                                <div class="mb-3 title">Syuruk</div>
                                <div class="lead"><time :datetime="waktuSolat[0].syuruk">{{ formatTime(waktuSolat[0].syuruk) }}</time></div>
                            </li>
                            <li class="sub-box" :class="{ active: isZohor, dark: darkMode }" :aria-current="isZohor ? 'true' : null">
                                <div class="mb-3 title">Zohor<span v-if="isZohor" class="sr-only"> (waktu sekarang)</span></div>
                                <div class="lead"><time :datetime="waktuSolat[0].dhuhr">{{ formatTime(waktuSolat[0].dhuhr) }}</time></div>
                            </li>
                            <li class="sub-box" :class="{ active: isAsar, dark: darkMode }" :aria-current="isAsar ? 'true' : null">
                                <div class="mb-3 title">Asar<span v-if="isAsar" class="sr-only"> (waktu sekarang)</span></div>
                                <div class="lead"><time :datetime="waktuSolat[0].asr">{{ formatTime(waktuSolat[0].asr) }}</time></div>
                            </li>
                            <li class="sub-box" :class="{ active: isMaghrib, dark: darkMode }" :aria-current="isMaghrib ? 'true' : null">
                                <div class="mb-3 title">Maghrib<span v-if="isMaghrib" class="sr-only"> (waktu sekarang)</span></div>
                                <div class="lead"><time :datetime="waktuSolat[0].maghrib">{{ formatTime(waktuSolat[0].maghrib) }}</time></div>
                            </li>
                            <li class="sub-box" :class="{ active: isIsyak, dark: darkMode }" :aria-current="isIsyak ? 'true' : null">
                                <div class="mb-3 title">Isyak<span v-if="isIsyak" class="sr-only"> (waktu sekarang)</span></div>
                                <div class="lead"><time :datetime="waktuSolat[0].isha">{{ formatTime(waktuSolat[0].isha) }}</time></div>
                            </li>
                        </ul>
                    </div>
                </div>

                <theme-toggle />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { setCookie, getCookie } from "@/assets/js/cookie.js";
import zoneJson from "@/assets/json/zone.json";
import stateJson from "@/assets/json/state.json";
import { findState, findStateByName, findTown } from "@/assets/js/locations.js";
import { homeMeta, stateMeta, townMeta } from "@/assets/js/seo.js";
import { setHead } from "@/assets/js/head.js";
import { setFooterLinks } from "@/assets/js/store.js";
import ThemeToggle from "@/components/ThemeToggle.vue";
import Logo from "@/components/Logo.vue";

const $ = axios.create({
    baseURL:'https://www.e-solat.gov.my/index.php?r=esolatApi/'
});

export default {
    components: { Logo, ThemeToggle },
    data() {
        return {
            isLoading: true,
            isError: false,
            zoneId: 'WLY01',
            interval: 0, /** 0=today, 1=week, 2=month, 3=year */
            waktuSolat: null,
            nowSolat: null,
            zones: zoneJson.zones,
            states: stateJson.states,
            options: [],
            zoneFromCookie: false,
            isSubuh: false,
            isZohor: false,
            isAsar: false,
            isMaghrib: false,
            isIsyak: false,
            isDark: this.$darkMode
        }
    },
    props: ['dark-mode'],
    computed: {
        routeTown() {
            return findTown(this.$route.params.stateSlug, this.$route.params.townSlug);
        },
        routeState() {
            return this.$route.params.townSlug ? null : findState(this.$route.params.stateSlug);
        },
        directoryOptions() {
            return [{ value: null, text: "Pilih negeri atau zon", disabled: true }].concat(this.options);
        },
        isDirectory() {
            // Several zones means several different times, so the state page
            // lists towns instead of quoting one zone's times for the whole state.
            return !!this.routeState && this.routeState.zones.length > 1;
        },
        currentState() {
            if(this.routeTown) {
                return findState(this.routeTown.stateSlug);
            }

            return this.routeState || findStateByName(this.getZone(this.zoneId).state);
        },
        pageMeta() {
            if(this.routeTown) {
                return townMeta(this.routeTown);
            }
            if(this.routeState) {
                return stateMeta(this.routeState);
            }
            return homeMeta();
        },
        place() {
            if(this.routeTown || this.routeState) {
                return this.pageMeta.place;
            }

            // A crawler has no cookie, so naming the default zone here would put
            // that district in the homepage heading for everyone.
            if(!this.zoneFromCookie) {
                return "";
            }

            let towns = this.currentState ? this.zoneTowns(this.zoneId) : [];

            return towns.length ? towns[0].town : this.getZone(this.zoneId).state;
        },
        siblingTowns() {
            if(!this.currentState) {
                return [];
            }

            return this.currentState.towns.filter(town => {
                return !this.routeTown || town.townSlug !== this.routeTown.townSlug;
            });
        }
    },
    watch: {
        siblingTowns: {
            immediate: true,
            handler() {
                this.publishFooterLinks();
            }
        },
        $route() {
            this.resolveZone();

            if(!this.isDirectory) {
                this.getWaktuSolat(this.interval, this.zoneId);
            }
        }
    },
    created() {
        this.resolveZone();
    },
    beforeDestroy() {
        setFooterLinks("", []);
    },
    mounted() {
        if(!this.isDirectory) {
            this.getWaktuSolat(this.interval, this.zoneId);
        }

        this.populateZoneSelect(this.zones, this.states);

    },
    methods: {
        resolveZone() {
            if(this.routeTown) {
                this.zoneId = this.routeTown.zoneId;
            }
            else if(this.routeState) {
                this.zoneId = this.routeState.defaultZoneId;
            }
            else {
                // check cookies for zone options
                let zoneCookie = getCookie("zone");
                if(zoneCookie != "" && this.zoneExist(zoneCookie)) {
                    this.zoneId = zoneCookie;
                    this.zoneFromCookie = true;
                }
            }

            setHead(this.pageMeta);
        },
        zonePath(zoneId) {
            let state = findStateByName(this.getZone(zoneId).state);

            if(!state) {
                return "/";
            }

            let town = state.towns.filter(town => town.zoneId === zoneId)[0];

            return town ? this.townPath(town) : "/" + state.stateSlug + "/";
        },
        publishFooterLinks() {
            if(this.isDirectory || !this.currentState) {
                setFooterLinks("", []);
                return;
            }

            setFooterLinks(this.currentState.state, this.siblingTowns.map(town => ({
                key: town.townSlug,
                name: town.town,
                path: this.townPath(town)
            })));
        },
        zoneTowns(zoneId) {
            return this.currentState.towns.filter(town => town.zoneId === zoneId);
        },
        townPath(town) {
            return "/" + town.stateSlug + "/" + town.townSlug + "/";
        },
        onZoneChange(zoneId) {
            // Off the home route every zone has its own URL, so keep the address
            // bar, the h1 and the data in step. The $route watcher refetches.
            let path = this.zonePath(zoneId);

            if(this.$route.name !== 'home' && this.$route.path !== path) {
                this.$router.push(path);
                return;
            }

            this.zoneFromCookie = true;

            setHead(this.pageMeta);
            this.getWaktuSolat(this.interval, zoneId);
        },
        getZone(id) {
            return this.zones.find(zone => zone.id === id);
        },
        zoneExist(zoneId) {
            for(var i in this.zones) {
                if(this.zones[i].id == zoneId) {
                    return true;
                }
            }
            return false;
        },
        async getWaktuSolat(interval, zone) {
            var period;

            // set cookie
            setCookie("zone", zone, 3650);

            switch(interval) {
                case 0:
                    period = 'today';
                    break;
                case 1:
                    period = 'week';
                    break;
                case 2:
                    period = 'month';
                    break;
                case 3:
                    period = 'year';
                    break;
                default:
                    period = 'today'
            }

            let cached = period === 'today' ? await this.cachedToday(zone) : null;

            if(cached) {
                this.showWaktuSolat([cached]);
                return;
            }

            await $.get(`TakwimSolat&period=${period}&zone=${zone}`).then(
                response => {
                    if(response.status == "200" && response.data.status =="OK!") {
                        this.showWaktuSolat(response.data.prayerTime);
                    } else {
                        this.isLoading = false;
                        this.isError = true;
                        window.alert('Error');
                    }
                }
            ).catch(() => {
                this.isLoading = false;
                this.isError = true;
            });
        },
        // Reads the yearly file scripts/fetch-times.js writes at build time.
        // Returns null when there is no usable row, so the caller hits the API.
        async cachedToday(zone) {
            // Malaysia has no DST, so a fixed +8h gives the MYT date whatever the
            // device timezone is.
            let now = new Date(Date.now() + 8 * 3600 * 1000);
            let year = now.getUTCFullYear();
            let dayOfYear = Math.floor((now - Date.UTC(year, 0, 1)) / 86400000);

            try {
                let response = await axios.get(`${process.env.BASE_URL}data/${year}/${zone}.json`);
                // The dev server answers unknown paths with index.html, not a 404.
                let row = Array.isArray(response.data) ? response.data[dayOfYear] : null;
                let day = String(now.getUTCDate()).padStart(2, '0');

                // Dates use Malay month names (e.g. 31-Dis-2026), so check day and
                // year only instead of parsing the string.
                if(row && row.date.slice(0, 2) === day && row.date.slice(-4) === String(year)) {
                    return row;
                }
            } catch(e) {
                // Missing file or network error: fall through to the API.
            }

            return null;
        },
        showWaktuSolat(prayerTime) {
            this.waktuSolat = prayerTime;
            this.isLoading = false;
            this.isError = false;

            // Find current/upcoming prayer time
            this.nowSolat = this.currentSolat(this.waktuSolat[0]);

            // App parks focus on <main> when a route change lands on the
            // loader; hand it to the heading once the heading exists.
            this.$nextTick(() => {
                if(document.activeElement && document.activeElement.tagName === 'MAIN') {
                    this.$refs.heading.focus();
                }
            });
        },
        populateZoneSelect(zones, states) {
            var options = [];
            var stateZone = [];
            
            for(var i in states) {
                stateZone = [];

                // find better way to filter this
                // this is bad for performance
                for(var j in zones) {
                    if(zones[j].state == states[i]) {
                        stateZone.push({
                            'value': zones[j].id,
                            'text': zones[j].name
                        });
                    }
                }

                options.push({
                    'label': states[i],
                    'options': stateZone
                });
            }
            
            this.options = options;
        },
        translateDay(day) {
            var hari;

            switch(day) {
                case 'Monday':
                    hari = 'Isnin';
                    break;
                case 'Tuesday':
                    hari = 'Selasa';
                    break;
                case 'Wednesday':
                    hari = 'Rabu';
                    break;
                case 'Thursday':
                    hari = 'Khamis';
                    break;
                case 'Friday':
                    hari = 'Jumaat';
                    break;
                case 'Saturday':
                    hari = 'Sabtu';
                    break;
                case 'Sunday':
                    hari = 'Ahad';
                    break;
                default:
                    hari = day;
            }

            return hari;
        },
        formatDate(date, format) {
            var d = date.split("-");
            var newDate;

            switch(format) {
                case 'DD Mon, YYYY':
                    newDate = d[0] + " " + d[1] + ", " + d[2];
                    break;
                case 'DD Mon':
                    newDate = d[0] + " " + d[1];
                    break;
                case 'YYYY':
                    newDate = d[2];
                    break;
                case 'Mon':
                    newDate = d[1];
                    break;
                case 'DD':
                    newDate = d[0];
                    break;
                case 'YY':
                    newDate = d[2];
                    break;
                default:
                    newDate = d[0] + " " + d[1] + " " + d[2];
            }
            
            return newDate;
        },
        formatTime(time) {
            var t = time.split(":");

            var hours = parseInt(t[0]);
            var minutes = parseInt(t[1]);
            var ampm = hours >= 12 ? 'pm' : 'am';

            hours = hours % 12;
            hours = hours ? hours : 12;
            hours = hours < 10 ? '0'+hours : hours;
            minutes = minutes < 10 ? '0'+minutes : minutes;

            return hours + ":" + minutes + ampm;
        },
        createDateObject(time) {
            var now = new Date();

            var t = time.split(":");

            now.setHours(t[0]);
            now.setMinutes(t[1]);
            now.setSeconds(t[2]);

            return now;
        },
        currentSolat(waktuSolat) {
            /** Current Solat 
             * Will keep display the current solat time after some time before changing to next solat time slot
             * This feature is for user that want to make sure if it is time to solat or unsure if it's already adhan */

            // Navigating between zones reuses this component, so clear the
            // previous zone's highlight before picking the new one.
            this.isSubuh = false;
            this.isZohor = false;
            this.isAsar = false;
            this.isMaghrib = false;
            this.isIsyak = false;

            var now = new Date();

            var fajr = this.createDateObject(waktuSolat.fajr);
            var dhuhr = this.createDateObject(waktuSolat.dhuhr);
            var asr = this.createDateObject(waktuSolat.asr);
            var maghrib = this.createDateObject(waktuSolat.maghrib);
            var isha = this.createDateObject(waktuSolat.isha);

            var waktu = [
                { name: 'Now', date: now },
                { name: 'Subuh', date: fajr, time: waktuSolat.fajr },
                { name: 'Zohor', date: dhuhr, time: waktuSolat.dhuhr },
                { name: 'Asar', date: asr, time: waktuSolat.asr },
                { name: 'Maghrib', date: maghrib, time: waktuSolat.maghrib },
                { name: 'Isyak', date: isha, time: waktuSolat.isha }
            ];

            const sortedwaktu = waktu.sort((a, b) => a.date - b.date)

            const nowIndex = sortedwaktu.findIndex(time => time.name == 'Now');

            var nowHours;
            var afterNowHours;
            var beforeNowHours;
            var midNowHours;
            var currentWaktu;

            nowHours = sortedwaktu[nowIndex].date.getHours();
            // now is first element
            if(nowIndex == 0) {
                currentWaktu = sortedwaktu[1];
            }
            // now is last element
            else if(nowIndex == (sortedwaktu.length - 1)) {
                beforeNowHours = sortedwaktu[sortedwaktu.length - 1].date.getHours();

                midNowHours = (beforeNowHours + 22)/2;

                if(nowHours >= midNowHours) {
                    currentWaktu = sortedwaktu[0];
                }
                else {
                    currentWaktu = sortedwaktu[nowIndex - 1];
                }
            }
            else {
                afterNowHours = sortedwaktu[nowIndex + 1].date.getHours();
                beforeNowHours = sortedwaktu[nowIndex - 1].date.getHours();

                midNowHours = (beforeNowHours + afterNowHours)/2;

                if(nowHours >= midNowHours) {
                    currentWaktu = sortedwaktu[nowIndex + 1];
                }
                else {
                    currentWaktu = sortedwaktu[nowIndex - 1];
                }
            }

            switch(currentWaktu.name) {
                case "Subuh":
                    this.isSubuh = true;
                    break;
                case "Zohor":
                    this.isZohor = true;
                    break;
                case "Asar":
                    this.isAsar = true;
                    break;
                case "Maghrib":
                    this.isMaghrib = true;
                    break;
                case "Isyak":
                    this.isIsyak = true;
                    break;
            }

            return currentWaktu;
        }
    }
}
</script>

<style lang="scss">
/* Animation */
$bg-url: "~@/assets/img/pattern.png";
$bg-width: 300px;
$bg-height: 346px;

@keyframes bg-scrolling-diamond {
  0% { background-position: 0px 0px; }
  25% { background-position: 100px 100px; }
  50% { background-position: 0px 200px; }
  75% { background-position: -100px 100px; }
  100% { background-position: 0 0; }
}

@keyframes bg-scrolling-side {
  0% { background-position: $bg-width 0; }
}

/* loading */
.loader {
  border: 4px solid #7a7a7a1e;
  border-top: 4px solid #0adf3f;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
  margin: 2em;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Main CSS */
.max-width {
    max-width: 980px;
}
.text-green {
    color: #0adf3f;
}
.box, .sub-box {
    border-radius: .75em;
    padding: .75em .75em;
    margin: .25em;
    color: #2f6c77;
}

.box.dark, .sub-box.dark {
    color: #e7f2f5;
}

.box {
    background: #fff;
    box-shadow: 0px 8px 20px rgba(0,0,0,.04);
}

.box.dark {
    background: rgb(31, 31, 31);
}

.sub-box {
    background: #f2fafc;
    width: calc(14% - .29em);
}

.sub-box.dark {
    background: #303030;
}

.sub-box.active {
    background: url($bg-url) repeat 0 0;
    background-color: #0adf3f;
    animation: bg-scrolling-side 30s infinite;
    animation-timing-function: linear;
}

.sub-box .title, .zone-title {
    color: #0adf3f;
    font-weight: 600;
    text-transform: uppercase;
}

/* Zone directory entries, built from the same parts as the prayer-time boxes. */
.pill-link {
    display: inline-block;
    background: #f2fafc;
    color: #6c757d;
    font-weight: 600;
    border-radius: .75em;
    padding: .35em .75em;
    margin: 0 .5em .5em 0;
}

.pill-link.dark {
    background: #303030;
    color: #b1c0c4;
}

.pill-link:hover, .pill-link:focus,
.pill-link.dark:hover, .pill-link.dark:focus {
    background: #0adf3f;
    color: #ffffff;
    text-shadow: 0 .09em 0 #11b139;
    text-decoration: none;
}

.sub-box.active .title {
    color: #ffffff;
    text-shadow: 0 .09em 0 #11b139;
}

.sub-box.active.dark .lead {
    color: #303030;
}

.sub-box:first-child {
    margin-left: 0;
}

.sub-box:last-child {
    margin-right: 0;
}

select {
    background-color: #e7f2f5 !important;
    color: #2f6c77 !important;
    border: 2px solid #e7f2f5 !important;
    border-radius: .5em !important;
}

select.dark {
    background-color: #303030 !important;
    color: #b1c0c4 !important;
    border: 2px solid #303030 !important;
    border-radius: .5em !important;
}

@media only screen and (min-width: 480px) and (max-width: 840px) {
    .sub-box {
        width: calc(25% - .4em);
    }

    .sub-box:nth-child(4n) {
        margin-right: 0;
    }

    .sub-box:nth-child(5n) {
        margin-left: 0;
    }
}

@media only screen and (min-width: 240px) and (max-width: 479.98px) {
    .sub-box {
        width: calc(50% - .4em);
        margin-left: 0;
        margin-right: .5em;
    }

    .sub-box:nth-child(2n) {
        margin-right: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .sub-box.active {
        animation: none;
    }

    // Slowed, not stopped: a still ring reads as a frozen page.
    .loader {
        animation-duration: 6s;
    }
}
</style>