<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { t, tr, lang, toggleLang, site, img, wa, sectors, products, reviews } from './i18n'

const scrolled = ref(false)
const menu = ref(false)
const drawer = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
const links = ['sectors', 'catalog', 'showroom', 'reviews', 'visit']

const sector = ref('all')
const list = computed(() => sector.value === 'all' ? products : products.filter((p) => p.s.includes(sector.value)))
const pickSector = (id) => { sector.value = id; document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }) }

// قائمة عرض السعر
const cart = reactive({})
const count = computed(() => Object.keys(cart).length)
const toggle = (id) => { if (cart[id]) delete cart[id]; else cart[id] = 1 }
const form = reactive({ name: '', city: '', note: '' })
const send = () => {
  const m = t.value.quote.msg
  const items = Object.entries(cart).map(([id, q]) => `• ${tr(products.find((p) => p.id === id).t)} × ${q}`)
  const lines = [m.hello, ...items, form.name.trim() ? `${m.name}: ${form.name.trim()}` : null, form.city.trim() ? `${m.city}: ${form.city.trim()}` : null, form.note.trim() ? `${m.note}: ${form.note.trim()}` : null].filter(Boolean)
  window.open(wa(lines.join('\n')), '_blank', 'noopener')
}
const showroom = ['showroom.jpg', 'storefront-night.jpg', 'bins-flags.jpg', 'storefront-day.jpg']
const year = new Date().getFullYear()
</script>

<template>
  <!-- نسخة عرض: احذف هذا الشريط عند الإطلاق الرسمي -->
  <div class="demo-ribbon">{{ t.ribbon }}</div>

  <header class="nav" :class="{ scrolled }">
    <div class="container nav-in">
      <a href="#top" class="brand" @click="menu = false">
        <span class="mark">✦</span>
        <span class="bt"><b>{{ t.brand }} <em>{{ t.brandSub }}</em></b><small>{{ t.brandEn }}</small></span>
      </a>
      <nav class="links"><a v-for="l in links" :key="l" :href="`#${l}`">{{ t.nav[l] }}</a></nav>
      <div class="acts">
        <button type="button" class="lang" @click="toggleLang">{{ lang === 'ar' ? 'EN' : 'ع' }}</button>
        <button type="button" class="cart-btn" @click="drawer = true">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12l1 4H5zM5 8h14v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zM9 12h6" /></svg>
          <span class="hide-sm">{{ t.nav.quote }}</span><i v-if="count">{{ count }}</i>
        </button>
        <button type="button" class="burger" :aria-expanded="menu" aria-label="Menu" @click="menu = !menu"><i></i><i></i></button>
      </div>
    </div>
    <div v-if="menu" class="mobile-menu"><a v-for="l in links" :key="l" :href="`#${l}`" @click="menu = false">{{ t.nav[l] }}</a></div>
  </header>

  <main>
    <section class="hero" id="top">
      <img class="hero-bg" :src="img('storefront-night.jpg')" alt="" fetchpriority="high" />
      <div class="hero-shade"></div>
      <div class="container hero-in">
        <p class="kicker light">{{ t.hero.kicker }}</p>
        <h1><span>{{ t.hero.title1 }}</span><span class="gold">{{ t.hero.title2 }}</span></h1>
        <p class="lead">{{ t.hero.lead }}</p>
        <div class="ctas">
          <a class="btn btn-lime" href="#catalog">{{ t.hero.cta1 }}</a>
          <a class="btn btn-glass" :href="wa(t.quote.msg.hello)" target="_blank" rel="noopener">{{ t.hero.cta2 }}</a>
        </div>
        <dl class="stats"><div v-for="s in t.hero.stats" :key="s.l"><dt>{{ s.n }}</dt><dd>{{ s.l }}</dd></div></dl>
      </div>
    </section>

    <section class="section sectors" id="sectors">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.sectors.kicker }}</p><h2>{{ t.sectors.title }}</h2></div>
        <div class="sec-grid">
          <button v-for="s in sectors.slice(1)" :key="s.id" type="button" class="sec" :class="'sec-' + s.id" @click="pickSector(s.id)" v-reveal>
            <img :src="img(s.img)" alt="" loading="lazy" />
            <span>{{ tr(s.t) }} <b>←</b></span>
          </button>
        </div>
      </div>
    </section>

    <section class="section catalog" id="catalog">
      <div class="container">
        <div class="cat-head" v-reveal>
          <div><p class="kicker">{{ t.catalog.kicker }}</p><h2>{{ t.catalog.title }}</h2><p class="sub">{{ t.catalog.sub }}</p></div>
        </div>
        <div class="filters">
          <button v-for="s in sectors" :key="s.id" type="button" :class="{ on: sector === s.id }" @click="sector = s.id">{{ tr(s.t) }}</button>
        </div>
        <TransitionGroup tag="div" name="list" class="grid">
          <article v-for="p in list" :key="p.id" class="card" :class="{ inq: cart[p.id] }">
            <div class="ph"><img :src="img(p.img)" :alt="tr(p.t)" loading="lazy" /></div>
            <div class="cb">
              <h3>{{ tr(p.t) }}</h3>
              <p>{{ tr(p.d) }}</p>
              <button type="button" class="add" @click="toggle(p.id)">{{ cart[p.id] ? t.catalog.added : '+ ' + t.catalog.add }}</button>
            </div>
          </article>
        </TransitionGroup>
      </div>
    </section>

    <section class="section showroom" id="showroom">
      <div class="container sr-in">
        <div class="sr-copy" v-reveal><p class="kicker light">{{ t.showroom.kicker }}</p><h2>{{ t.showroom.title }}</h2><p>{{ t.showroom.p }}</p></div>
        <div class="sr-grid">
          <img v-for="(s, i) in showroom" :key="s" :src="img(s)" :class="'g' + i" alt="" loading="lazy" v-reveal />
        </div>
      </div>
    </section>

    <section class="section reviews" id="reviews">
      <div class="container">
        <div class="rv-head" v-reveal>
          <div><p class="kicker">{{ t.reviews.kicker }}</p><h2>{{ t.reviews.title }}</h2></div>
          <div class="score"><b>{{ site.rating }}</b><span>★★★★☆</span><small>{{ site.reviews }} {{ t.reviews.count }}</small></div>
        </div>
        <div class="rv-grid">
          <blockquote v-for="r in reviews" :key="r.n" class="rv" dir="rtl" v-reveal><p>{{ r.q }}</p><footer>{{ r.n }}</footer></blockquote>
        </div>
        <p class="note">{{ t.reviews.note }}</p>
      </div>
    </section>

    <section class="section visit" id="visit">
      <div class="container vs-in">
        <div class="vs-card" v-reveal>
          <p class="kicker">{{ t.visit.kicker }}</p>
          <h2>{{ t.visit.title }}</h2>
          <p class="addr">{{ t.visit.addr }}</p>
          <dl><div v-for="h in t.visit.hours" :key="h.d"><dt>{{ h.d }}</dt><dd>{{ h.h }}</dd></div></dl>
          <p class="branch">{{ t.visit.branch }}</p>
          <div class="ctas">
            <a class="btn btn-dark" :href="site.maps" target="_blank" rel="noopener">{{ t.visit.dir }}</a>
            <a class="btn btn-line" :href="`tel:${site.phone.tel}`">{{ t.visit.call }} <span dir="ltr">{{ site.phone.label }}</span></a>
          </div>
        </div>
        <div class="map" v-reveal><iframe :src="site.mapEmbed" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container foot">
      <b>{{ t.brand }} {{ t.brandSub }}</b>
      <span>{{ t.brandEn }}</span>
      <a :href="`tel:${site.phone.tel}`" dir="ltr">{{ site.phone.label }}</a>
      <small>© {{ year }} {{ t.footer.rights }} · <em>{{ t.footer.demo }}</em></small>
    </div>
  </footer>

  <Transition name="slide">
    <aside v-if="drawer" class="drawer" role="dialog" aria-modal="true">
      <div class="dr-head"><h3>{{ t.quote.title }}</h3><button type="button" class="x" aria-label="Close" @click="drawer = false">✕</button></div>
      <p v-if="!count" class="empty">{{ t.quote.empty }}</p>
      <ul v-else class="items">
        <li v-for="(q, id) in cart" :key="id">
          <img :src="img(products.find((p) => p.id === id).img)" alt="" />
          <span>{{ tr(products.find((p) => p.id === id).t) }}</span>
          <div class="qty"><button type="button" @click="cart[id] = Math.max(1, q - 1)">−</button><b>{{ q }}</b><button type="button" @click="cart[id] = q + 1">+</button></div>
          <button type="button" class="rm" @click="delete cart[id]">✕</button>
        </li>
      </ul>
      <div class="dr-form">
        <input v-model="form.name" :placeholder="t.quote.name" />
        <input v-model="form.city" :placeholder="t.quote.city" />
        <textarea v-model="form.note" rows="2" :placeholder="t.quote.note"></textarea>
        <button type="button" class="btn btn-lime block" @click="send">{{ t.quote.send }}</button>
      </div>
    </aside>
  </Transition>
  <div v-if="drawer" class="scrim" @click="drawer = false"></div>

  <div class="sticky">
    <a :href="`tel:${site.phone.tel}`">{{ t.sticky.call }}</a>
    <button type="button" class="main" @click="drawer = true">{{ t.sticky.quote }} <i v-if="count">{{ count }}</i></button>
  </div>
</template>
