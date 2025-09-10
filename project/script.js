// script.js
document.addEventListener('DOMContentLoaded', function () {
  const langBtn = document.getElementById('langBtn');
  if (!langBtn) return; // اگر دکمه نباشد کاری انجام نمی‌دهد

  const storageKey = 'siteLang';
  const defaultLang = 'fa'; // زبان پیش‌فرض صفحه
  let lang = localStorage.getItem(storageKey) || defaultLang;

  // تنظیم اولیه بر اساس localStorage یا پیش‌فرض
  setLanguage(lang);

  // کلیک روی دکمه -> تغییر زبان
  langBtn.addEventListener('click', function () {
    lang = (lang === 'en') ? 'fa' : 'en';
    setLanguage(lang);
    localStorage.setItem(storageKey, lang);
  });

  function setLanguage(l) {
    // عناصری که متون دو زبانه دارند (data-fa / data-en)
    document.querySelectorAll('[data-fa], [data-en]').forEach(el => {
      const text = el.getAttribute('data-' + l);
      if (text !== null) {
        // برای بیشتر عناصر textContent کافی است
        el.textContent = text;
      }
      // اگر placeholder دوزبانه تعریف شده بود، آن را هم بروزرسانی کن
      if (el.hasAttribute('data-en-placeholder') || el.hasAttribute('data-fa-placeholder')) {
        const ph = el.getAttribute('data-' + l + '-placeholder') || '';
        if ('placeholder' in el) el.placeholder = ph;
      }
    });

    // جهت و زبان سند
    document.documentElement.lang = (l === 'en') ? 'en' : 'fa';
    document.body.dir = (l === 'en') ? 'ltr' : 'rtl';

    // متن روی دکمه (نمایش زبانی که الان فعال است یا معکوس؟)
    // من اینجا متن دکمه را به صورت 'EN' زمانی که زبان فعلی انگلیسی است نشان می‌دهم
    langBtn.textContent = (l === 'en') ? 'EN' : 'FA';
    langBtn.setAttribute('aria-label', (l === 'en') ? 'Switch to English' : 'تغییر زبان به فارسی');
  }
});