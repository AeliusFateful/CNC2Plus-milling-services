/**
 * GSAP нужен только секциям с закреплением (Process, Advantages), поэтому в основной бандл он
 * не входит: модуль подгружается отдельным чанком, когда секция приближается к экрану.
 */
let modules: Promise<{
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  ScrollToPlugin: typeof import("gsap/ScrollToPlugin").ScrollToPlugin;
}> | null = null;

export function loadGsap() {
  modules ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("gsap/ScrollToPlugin"),
  ]).then(([{ gsap }, { ScrollTrigger }, { ScrollToPlugin }]) => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    return { gsap, ScrollTrigger, ScrollToPlugin };
  });
  return modules;
}

export type GsapModules = Awaited<ReturnType<typeof loadGsap>>;

/** За сколько высот экрана до секции начинаем загрузку. */
const LOAD_AHEAD = 1;

/**
 * Вызывает `onNear` один раз, когда верх секции ближе `LOAD_AHEAD` экранов к нижнему краю окна:
 * секция в окне, чуть ниже него или уже выше (страницу открыли по якорю ниже секции: закрепление
 * должно появиться сразу, иначе при прокрутке вверх вставка высоты над окном сдвинет страницу).
 * Проверка идёт по scroll, а не через IntersectionObserver: тот не срабатывает, если окно
 * «перепрыгнуло» секцию за один скачок (якорь, клавиша End). Возвращает функцию отмены.
 */
export function whenNear(element: Element, onNear: () => void) {
  let frame = 0;
  const stop = () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
  const check = () => {
    frame = 0;
    if (element.getBoundingClientRect().top > window.innerHeight * (1 + LOAD_AHEAD)) return;
    stop();
    onNear();
  };
  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(check);
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  schedule();
  return stop;
}

/** После вставки закреплений браузерная позиция якоря (#contact) сбита: возвращаем её на место. */
export function scrollToHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
}
