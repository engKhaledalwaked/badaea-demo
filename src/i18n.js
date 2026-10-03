import { ref, computed, watchEffect } from 'vue'

const saved = (() => { try { return localStorage.getItem('bl-lang') } catch { return null } })()
export const lang = ref(saved === 'en' ? 'en' : 'ar')
watchEffect(() => {
  document.documentElement.lang = lang.value
  document.documentElement.dir = lang.value === 'ar' ? 'rtl' : 'ltr'
  try { localStorage.setItem('bl-lang', lang.value) } catch {}
})
export const toggleLang = () => { lang.value = lang.value === 'ar' ? 'en' : 'ar' }
export const tr = (o) => (o && typeof o === 'object' ? o[lang.value] ?? o.ar : o)

// من خرائط Google ومن لافتة المحل (الرقم مكتوب على الواجهة مع شعار واتساب)
export const site = {
  whatsapp: '966559941663',
  phone: { tel: '+966559941663', label: '055 994 1663' },
  rating: '4.3', reviews: '306',
  maps: 'https://www.google.com/maps/search/?api=1&query=24.7305938,46.666888',
  mapEmbed: 'https://www.google.com/maps?q=24.7305938,46.666888&z=17&output=embed',
}
export const img = (p) => `/img/${p}`
export const wa = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`

export const sectors = [
  { id: 'all', t: { ar: 'الكل', en: 'All' } },
  { id: 'retail', img: 'mannequins.jpg', t: { ar: 'محلات الملابس', en: 'Fashion retail' } },
  { id: 'hotel', img: 'trolleys.jpg', t: { ar: 'الفنادق', en: 'Hotels' } },
  { id: 'cafe', img: 'cafe-furniture.jpg', t: { ar: 'المقاهي والمطاعم', en: 'Cafés & restaurants' } },
  { id: 'event', img: 'flags.jpg', t: { ar: 'المعارض والمناسبات', en: 'Exhibitions & events' } },
  { id: 'jewel', img: 'jewelry-displays.jpg', t: { ar: 'المجوهرات والإكسسوار', en: 'Jewellery & accessories' } },
]

export const products = [
  { id: 'racks', img: 'garment-racks.jpg', s: ['retail', 'hotel'], t: { ar: 'علاقات ملابس ذهبية وفضية', en: 'Gold & silver garment racks' }, d: { ar: 'ستاندات عبايات وملابس بقاعدة رخام، ذهبي مطفي ولامع وفضي.', en: 'Abaya and garment stands on marble bases — matte gold, polished gold, silver.' } },
  { id: 'mannequins', img: 'mannequins.jpg', s: ['retail'], t: { ar: 'مانيكانات', en: 'Mannequins' }, d: { ar: 'رجالي ونسائي وأطفال — أبيض، أسود لامع، وذهبي.', en: 'Men, women and kids — white, glossy black and gold.' } },
  { id: 'hangers', img: 'hangers.jpg', s: ['retail', 'hotel'], t: { ar: 'تعليقات وشماعات', en: 'Hangers' }, d: { ar: 'خشب ومعدن وبلاستيك بكل المقاسات والألوان.', en: 'Wood, metal and plastic in every size and colour.' } },
  { id: 'shelving', img: 'shelving.jpg', s: ['retail', 'jewel'], t: { ar: 'أرفف وأنظمة عرض جدارية', en: 'Shelving & wall systems' }, d: { ar: 'أنظمة عرض جدارية معدنية وخشبية للمحلات.', en: 'Metal and wood wall display systems for shops.' } },
  { id: 'trolleys', img: 'trolleys.jpg', s: ['hotel', 'cafe'], t: { ar: 'ترولي خدمة فنادق', en: 'Hotel service trolleys' }, d: { ar: 'عربات تقديم ذهبية وفضية بزجاج.', en: 'Gold and silver glass serving trolleys.' } },
  { id: 'bins', img: 'gold-bins.jpg', s: ['hotel', 'cafe', 'event'], t: { ar: 'سلال ومطافئ ذهبية', en: 'Gold bins & ash stands' }, d: { ar: 'سلال مهملات ومطافئ سجائر للوبي والمداخل.', en: 'Waste bins and ash stands for lobbies and entrances.' } },
  { id: 'baskets', img: 'waste-baskets.jpg', s: ['hotel'], t: { ar: 'سلال غرف', en: 'Room bins' }, d: { ar: 'سلال غرف وحمّامات بتشطيبات فاخرة.', en: 'Room and bathroom bins in premium finishes.' } },
  { id: 'cafe', img: 'cafe-furniture.jpg', s: ['cafe'], t: { ar: 'طاولات وكراسي مقاهي', en: 'Café tables & chairs' }, d: { ar: 'طاولات رخام بأرجل ذهبية وكراسي ملوّنة.', en: 'Marble tables on gold legs and coloured chairs.' } },
  { id: 'mirrors', img: 'mirrors.jpg', s: ['retail', 'hotel'], t: { ar: 'مرايا قياس', en: 'Fitting mirrors' }, d: { ar: 'مرايا واقفة بإطارات ذهبية وفضية.', en: 'Standing mirrors with gold and silver frames.' } },
  { id: 'flags', img: 'flags.jpg', s: ['event'], t: { ar: 'أعلام وسواري', en: 'Flags & flagpoles' }, d: { ar: 'أعلام مطرّزة وسواري داخلية للمكاتب والقاعات.', en: 'Embroidered flags and indoor poles for offices and halls.' } },
  { id: 'hooks', img: 'hooks.jpg', s: ['hotel', 'retail'], t: { ar: 'مشاجب وإكسسوارات', en: 'Hooks & hardware' }, d: { ar: 'مشاجب ومواسير ذهبية وفضية.', en: 'Gold and silver hooks and rails.' } },
  { id: 'jewel', img: 'jewelry-displays.jpg', s: ['jewel'], t: { ar: 'ستاندات مجوهرات', en: 'Jewellery displays' }, d: { ar: 'مجسّمات عرض، علب، وصناديق.', en: 'Busts, boxes and display cases.' } },
]

const dict = {
  ar: {
    ribbon: 'نسخة عرض تجريبية — مُعدّة لبدائع لبنان للديكور',
    brand: 'بدائع لبنان', brandSub: 'للديكور', brandEn: 'Wonderful Lebanon for Decoration',
    nav: { catalog: 'المنتجات', sectors: 'لمن نجهّز', showroom: 'المعرض', reviews: 'آراء العملاء', visit: 'الموقع', quote: 'قائمة العرض' },
    hero: {
      kicker: 'لتجهيز المراكز والمعارض التجارية · شارع العليا، الرياض',
      title1: 'كل ما يحتاجه',
      title2: 'محلك أو فندقك.',
      lead: 'علاقات ملابس ومانيكانات وأرفف، ترولي فنادق وسلال ذهبية، مرايا وأعلام وأثاث مقاهي — في معرض واحد على شارع العليا.',
      cta1: 'تصفّح المنتجات', cta2: 'اطلب عرض سعر',
      stats: [{ n: '+٣٠٠', l: 'تقييم على Google' }, { n: '٢', l: 'فرعان في الرياض' }, { n: '٧', l: 'أيام في الأسبوع' }],
    },
    sectors: { kicker: 'لمن نجهّز', title: 'اختر نوع مشروعك' },
    catalog: { kicker: 'المنتجات', title: 'أضف ما تحتاجه لقائمة العرض', sub: 'اضغط "أضف" على المنتجات التي تهمك، ثم أرسل القائمة على واتساب لنرسل لك الأسعار.', add: 'أضف', added: 'مضاف ✓' },
    quote: {
      title: 'قائمة عرض السعر', empty: 'لم تضف منتجات بعد.', qty: 'الكمية', name: 'الاسم / الجهة', city: 'المدينة', note: 'تفاصيل المشروع (اختياري)',
      send: 'أرسل القائمة عبر واتساب', clear: 'مسح', count: 'منتج',
      msg: { hello: 'السلام عليكم، أرغب بعرض سعر للمنتجات التالية:', name: 'الاسم', city: 'المدينة', note: 'المشروع' },
    },
    showroom: { kicker: 'المعرض', title: 'معرض بطابقين على شارع العليا', p: 'تعال وشوف القطع بنفسك: تشطيبات الذهبي المطفي واللامع والفضي، وكل المقاسات متوفرة في المعرض.' },
    reviews: { kicker: 'آراء العملاء', title: 'ما يقوله عملاؤنا', count: 'تقييم على Google', note: 'مقتطفات حقيقية من مراجعات Google.' },
    visit: {
      kicker: 'الموقع والمواعيد', title: 'زورونا في العليا',
      addr: 'شارع العليا، حي العليا العام، الرياض',
      branch: 'ولنا فرع آخر في حي الخزان.',
      hours: [{ d: 'السبت – الخميس', h: '٩:٠٠ ص – ٢:٠٠ م · ٤:٠٠ – ١١:٠٠ م' }, { d: 'الجمعة', h: '٤:٠٠ – ١١:٠٠ م' }],
      dir: 'الاتجاهات', call: 'اتصال',
    },
    footer: { rights: 'جميع الحقوق محفوظة', demo: 'نسخة عرض تجريبية' },
    sticky: { call: 'اتصال', quote: 'قائمة العرض' },
  },
  en: {
    ribbon: 'Demo preview — prepared for Wonderful Lebanon for Decoration',
    brand: 'Wonderful Lebanon', brandSub: 'for Decoration', brandEn: 'بدائع لبنان للديكور',
    nav: { catalog: 'Products', sectors: 'Who we equip', showroom: 'Showroom', reviews: 'Reviews', visit: 'Location', quote: 'Quote list' },
    hero: {
      kicker: 'Fit-out for shops, malls & exhibitions · Olaya St., Riyadh',
      title1: 'Everything your',
      title2: 'shop or hotel needs.',
      lead: 'Garment racks, mannequins and shelving; hotel trolleys and gold bins; mirrors, flags and café furniture — in one showroom on Olaya Street.',
      cta1: 'Browse products', cta2: 'Request a quote',
      stats: [{ n: '300+', l: 'Google reviews' }, { n: '2', l: 'branches in Riyadh' }, { n: '7', l: 'days a week' }],
    },
    sectors: { kicker: 'Who we equip', title: 'Pick your project type' },
    catalog: { kicker: 'Products', title: 'Add what you need to your quote list', sub: 'Tap “Add” on the products you want, then send the list on WhatsApp and we’ll reply with prices.', add: 'Add', added: 'Added ✓' },
    quote: {
      title: 'Quote list', empty: 'No products added yet.', qty: 'Qty', name: 'Name / company', city: 'City', note: 'Project details (optional)',
      send: 'Send list on WhatsApp', clear: 'Clear', count: 'items',
      msg: { hello: 'Hello, I would like a quote for the following products:', name: 'Name', city: 'City', note: 'Project' },
    },
    showroom: { kicker: 'Showroom', title: 'A two-floor showroom on Olaya Street', p: 'Come and see the pieces yourself — matte gold, polished gold and silver finishes, every size on display.' },
    reviews: { kicker: 'Reviews', title: 'What our customers say', count: 'Google reviews', note: 'Real excerpts from Google reviews (in Arabic).' },
    visit: {
      kicker: 'Location & hours', title: 'Visit us on Olaya',
      addr: 'Olaya Street, Al Olaya Al Aam, Riyadh',
      branch: 'We also have a branch in Al Khazan.',
      hours: [{ d: 'Saturday – Thursday', h: '9:00 AM – 2:00 PM · 4:00 – 11:00 PM' }, { d: 'Friday', h: '4:00 – 11:00 PM' }],
      dir: 'Directions', call: 'Call',
    },
    footer: { rights: 'All rights reserved', demo: 'Demo preview' },
    sticky: { call: 'Call', quote: 'Quote list' },
  },
}
export const t = computed(() => dict[lang.value])

export const reviews = [
  { n: 'هاجر العبدالكريم', q: 'محل متخصص بتجهيزات المعارض والفنادق، وتوجد منتجات للمناسبات والاستقبالات. تشكيلة واسعة من علاقات العبايات بالألوان الرسمية (فضي، ذهبي المطفي واللامع).' },
  { n: 'AM', q: 'التقييم هذا عشان تعامل الموظفين اللي تعاملت معاهم، للأمانة أخلاق، وحصلت أغلب الاحتياجات من عندهم.' },
  { n: 'i i', q: 'محل جميل… تحصلون كل شي تبونه فالمشاريع أو خدمات الفنادق أو للبيت.' },
]
