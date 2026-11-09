/* ==========================================================================
   互联网发展靠创新 · 课堂互动逻辑
   Vanilla JS · offline friendly · no external dependencies
   ========================================================================== */

(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STORAGE_KEY = 'internet-innovation-class-v1';
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const TEAMS = {
    q: { name: '量子队', short: '量子', code: 'Q', color: '#57e8ff', motto: '微观世界 · 连接无限' },
    s: { name: '星链队', short: '星链', code: 'S', color: '#a7ff6a', motto: '织网成链 · 覆盖全球' },
    p: { name: '光子队', short: '光子', code: 'P', color: '#ffc857', motto: '光速传输 · 毫秒必争' },
    d: { name: '深蓝队', short: '深蓝', code: 'D', color: '#ff6ec7', motto: '潜入深蓝 · 探索未知' }
  };
  const TEAM_ORDER = ['q', 's', 'p', 'd'];

  const BADGES = {
    'origin-decode': { title: '连接观察者', icon: '◇' },
    'origin-build': { title: '组网工程师', icon: '⌁' },
    timeline: { title: '时间旅行者', icon: 'T' },
    'stage-all': { title: '阶段全景员', icon: 'IV' },
    'year-quiz': { title: '中国时刻', icon: 'CN' },
    topology: { title: '韧性架构师', icon: 'M' },
    'china-5g': { title: '5G 观察员', icon: '5G' },
    plus: { title: '互联网+创想家', icon: '+' },
    beidou: { title: '北斗定位官', icon: 'B' },
    quiz: { title: '网络创新者', icon: '★' },
    'quiz-finish': { title: '闯关完成', icon: '✓' },
    'exit-ticket': { title: '课堂回声', icon: '◎' },
    'l2-media': { title: '内容形态观察员', icon: '▶' },
    'l2-ui': { title: '界面进化体验官', icon: 'GUI' },
    'l2-fusion': { title: '超级应用架构师', icon: '⊕' },
    'l2-atlas': { title: '应用分拣师', icon: '▦' },
    'l2-data': { title: '数据洞察员', icon: '%' },
    'l2-life': { title: '数字生活设计师', icon: '◎' },
    'l3-data': { title: '数据来源侦探', icon: '⇄' },
    'l3-api': { title: 'API 取数员', icon: '{ }' },
    'l3-http': { title: 'HTTP 快递员', icon: '↔' },
    'l3-limit': { title: '负载观察员', icon: 'λ' },
    'l3-feature': { title: '协议匹配师', icon: '⌁' },
    'l3-choice': { title: '物联协议决策者', icon: 'G8' }
  };

  const STATION_ORDER = [
    { id: 'origin', index: '01', name: '网之初', lesson: 1 },
    { id: 'timeline', index: '02', name: '时光轴', lesson: 1 },
    { id: 'topology', index: '03', name: '结构室', lesson: 1 },
    { id: 'china', index: '04', name: '中国答卷', lesson: 1 },
    { id: 'plus', index: '05', name: '互联网+', lesson: 1 },
    { id: 'beidou', index: '06', name: '北斗任务', lesson: 1 },
    { id: 'challenge', index: '07', name: '闯关', lesson: 1 },
    { id: 'l2-content', index: '01', name: '形态跃迁', lesson: 2 },
    { id: 'l2-ui', index: '02', name: '界面革命', lesson: 2 },
    { id: 'l2-fusion', index: '03', name: '超级融合', lesson: 2 },
    { id: 'l2-atlas', index: '04', name: '应用图谱', lesson: 2 },
    { id: 'l2-data', index: '05', name: '数据洞察', lesson: 2 },
    { id: 'l2-life', index: '06', name: '数字生活', lesson: 2 },
    { id: 'l3-data', index: '01', name: '数据接力', lesson: 3 },
    { id: 'l3-api', index: '02', name: 'API 取数', lesson: 3 },
    { id: 'l3-http', index: '03', name: 'HTTP 快线', lesson: 3 },
    { id: 'l3-limit', index: '04', name: '负载实验', lesson: 3 },
    { id: 'l3-feature', index: '05', name: '协议匹配', lesson: 3 },
    { id: 'l3-choice', index: '06', name: '协议决策', lesson: 3 }
  ];

  const STATION_REQUIREMENTS = {
    origin: {
      label: '点开 3 张网，连好 5 台设备',
      keys: ['origin-decode', 'origin-build'],
      steps: [
        { text: '点开球网、渔网、蜘蛛网', keys: ['origin-decode'] },
        { text: '连接 5 台设备并发送数据', keys: ['origin-build'] }
      ]
    },
    timeline: {
      label: '排好 4 张事件卡，看完 4 个阶段，答对年份题',
      keys: ['timeline', 'stage-all', 'year-quiz'],
      steps: [
        { text: '把 4 张事件卡放进正确年份', keys: ['timeline'] },
        { text: '查看诞生、形成、互联、高速网络 4 个阶段', keys: ['stage-all'] },
        { text: '答对中国接入国际互联网的年份', keys: ['year-quiz'] }
      ]
    },
    topology: {
      label: '切到网状，切断 2 条线，让数据送达',
      keys: ['topology'],
      steps: [
        { text: '切换为网状结构', keys: ['topology'] },
        { text: '切断 2 条线路，再发送数据包', keys: ['topology'] }
      ]
    },
    china: {
      label: '点亮“5G · 领跑”接力',
      keys: ['china-5g'],
      steps: [
        { text: '点亮“5G · 领跑”接力', keys: ['china-5g'] }
      ]
    },
    plus: {
      label: '配对 6 组应用，提交 1 条创意',
      keys: ['plus-all', 'idea-award-1'],
      steps: [
        { text: '把 6 个应用配对到吃、穿、住、行、学、医', keys: ['plus-all'] },
        { text: '写 1 条校园或生活创意并提交', keys: ['idea-award-1'] }
      ]
    },
    beidou: {
      label: '启动卫星，点中三环交点',
      keys: ['beidou-locate'],
      steps: [
        { text: '启动三颗卫星，生成三个定位环', keys: ['beidou-locate'] },
        { text: '点击三环交点，完成一次定位', keys: ['beidou-locate'] }
      ]
    },
    challenge: {
      label: '答完 8 题，提交 1 条课堂回声',
      keys: ['quiz-finish', 'exit-ticket'],
      steps: [
        { text: '完成 8 道闯关题', keys: ['quiz-finish'] },
        { text: '在任意一栏写 1 条课堂回声并提交', keys: ['exit-ticket'] }
      ]
    },
    'l2-content': {
      label: '看完 4 个内容时代，答对 1 道特征题',
      keys: ['l2-media'],
      steps: [
        { text: '拖动滑块或点年份，看完 1987、1998、2012、2024', keys: ['l2-media'] },
        { text: '在右侧选出“图文声像并茂”', keys: ['l2-media'] }
      ]
    },
    'l2-ui': {
      label: '用命令查天气，再用图标查一次',
      keys: ['l2-ui'],
      steps: [
        { text: '左侧输入 weather beijing，按“执行”', keys: ['l2-ui'] },
        { text: '右侧点“天气”，再点“查看明天”', keys: ['l2-ui'] }
      ]
    },
    'l2-fusion': {
      label: '接入 6 项服务，选出“应用融合”',
      keys: ['l2-fusion'],
      steps: [
        { text: '点右侧 6 个服务卡，全部接入手机', keys: ['l2-fusion'] },
        { text: '在判断题中选“应用融合”', keys: ['l2-fusion'] }
      ]
    },
    'l2-atlas': {
      label: '把 12 个应用放进 4 类场景',
      keys: ['l2-atlas'],
      steps: [
        { text: '先点一个应用，再点它所属的类别', keys: ['l2-atlas'] },
        { text: '把 12 个应用全部放对', keys: ['l2-atlas'] }
      ]
    },
    'l2-data': {
      label: '扫描 4 组数据，答对 3 道数据题',
      keys: ['l2-data'],
      steps: [
        { text: '点击 4 条应用数据，完成扫描', keys: ['l2-data'] },
        { text: '答对右侧 3 道数据题', keys: ['l2-data'] }
      ]
    },
    'l2-life': {
      label: '做完 5 个场景，写下 1 条承诺',
      keys: ['l2-life'],
      steps: [
        { text: '5 个场景，每个选 1 项', keys: ['l2-life'] },
        { text: '选 1 条原则，写 1 条承诺并提交', keys: ['l2-life'] }
      ]
    },
    'l3-data': {
      label: '把 8 条数据分到互联网或设备自采',
      keys: ['l3-data'],
      steps: [
        { text: '点一条数据，再点它的来源', keys: ['l3-data'] },
        { text: '8 条数据全部分对', keys: ['l3-data'] }
      ]
    },
    'l3-api': {
      label: '调用天气 API，取出 3 个观测字段',
      keys: ['l3-api'],
      steps: [
        { text: '选天气接口和北京，发送 API 请求', keys: ['l3-api'] },
        { text: '点出温度、湿度、风力 3 个字段', keys: ['l3-api'] }
      ]
    },
    'l3-http': {
      label: '组好 GET 请求，排出 HTTP 三步',
      keys: ['l3-http'],
      steps: [
        { text: '选择 GET、天气接口和北京，发送请求', keys: ['l3-http'] },
        { text: '按顺序点：发出请求 → 服务器处理 → 返回响应', keys: ['l3-http'] }
      ]
    },
    'l3-limit': {
      label: '运行轮询实验，找出 3 个瓶颈',
      keys: ['l3-limit'],
      steps: [
        { text: '调整设备数和间隔，运行一次实验', keys: ['l3-limit'] },
        { text: '点出占用资源、能耗、网络负担 3 个问题', keys: ['l3-limit'] }
      ]
    },
    'l3-feature': {
      label: '把 4 个物联要求匹配到真实场景',
      keys: ['l3-feature'],
      steps: [
        { text: '先点一个要求，再点对应场景', keys: ['l3-feature'] },
        { text: '完成低功耗、低带宽、低延时、兼容性 4 组匹配', keys: ['l3-feature'] }
      ]
    },
    'l3-choice': {
      label: '答 3 题，为校园农场选协议',
      keys: ['l3-choice'],
      steps: [
        { text: '答对 3 道协议判断题', keys: ['l3-choice'] },
        { text: '为智慧农场选择协议并提交 2 条理由', keys: ['l3-choice'] }
      ]
    }
  };

  let locksInitialized = false;
  let lastUnlocked = new Set();

  function defaultState() {
    return {
      activeTeam: 'q',
      scores: { q: 0, s: 0, p: 0, d: 0 },
      awards: {},
      badges: {},
      ideas: [],
      exit: {},
      sound: true
    };
  }

  function loadState() {
    const base = defaultState();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const parsed = JSON.parse(raw);
      return {
        ...base,
        ...parsed,
        scores: { ...base.scores, ...(parsed.scores || {}) },
        awards: { ...(parsed.awards || {}) },
        badges: { ...(parsed.badges || {}) },
        ideas: Array.isArray(parsed.ideas) ? parsed.ideas.slice(0, 30) : [],
        exit: parsed.exit && typeof parsed.exit === 'object' ? parsed.exit : {},
        activeTeam: TEAMS[parsed.activeTeam] ? parsed.activeTeam : 'q',
        sound: parsed.sound !== false
      };
    } catch (err) {
      return base;
    }
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      /* localStorage can be unavailable in private modes. The class still works. */
    }
  }

  const currentTeam = () => TEAMS[state.activeTeam] || TEAMS.q;

  /* ========================================================================
     Sound
     ======================================================================== */

  let audioCtx = null;
  let audioUnlocked = false;

  window.addEventListener('pointerdown', () => { audioUnlocked = true; }, { once: true, capture: true });
  window.addEventListener('keydown', () => { audioUnlocked = true; }, { once: true, capture: true });

  function ensureAudio() {
    if (!state.sound || !audioUnlocked) return null;
    try {
      if (!audioCtx) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) return null;
        audioCtx = new Ctx();
      }
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    } catch (err) {
      return null;
    }
  }

  function tone(freq, offset, duration, type = 'sine', volume = 0.035) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime + offset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  function sfx(name) {
    if (!state.sound) return;
    switch (name) {
      case 'click':
        tone(680, 0, 0.045, 'sine', 0.018);
        break;
      case 'link':
        tone(520, 0, 0.08, 'triangle', 0.03);
        tone(780, 0.05, 0.1, 'sine', 0.018);
        break;
      case 'success':
        tone(523.25, 0, 0.16, 'triangle', 0.03);
        tone(659.25, 0.08, 0.18, 'triangle', 0.03);
        tone(783.99, 0.16, 0.28, 'sine', 0.026);
        break;
      case 'badge':
        tone(659.25, 0, 0.14, 'sine', 0.03);
        tone(987.77, 0.1, 0.22, 'triangle', 0.03);
        tone(1318.51, 0.22, 0.3, 'sine', 0.02);
        break;
      case 'error':
        tone(170, 0, 0.16, 'sawtooth', 0.022);
        tone(120, 0.08, 0.2, 'sawtooth', 0.018);
        break;
      case 'data':
        tone(880, 0, 0.05, 'square', 0.015);
        tone(1046, 0.06, 0.06, 'square', 0.013);
        tone(1318, 0.13, 0.12, 'sine', 0.02);
        break;
      case 'boot':
        tone(130.81, 0, 0.55, 'sine', 0.032);
        tone(261.63, 0.12, 0.5, 'triangle', 0.025);
        tone(523.25, 0.3, 0.45, 'sine', 0.022);
        tone(783.99, 0.48, 0.55, 'sine', 0.02);
        break;
      default:
        tone(600, 0, 0.04, 'sine', 0.015);
    }
  }

  /* ========================================================================
     Toast / scores / badges
     ======================================================================== */

  function toast(title, detail = '', color = currentTeam().color) {
    const stack = $('#toastStack');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.style.setProperty('--accent', color);
    const b = document.createElement('b');
    b.textContent = title;
    const span = document.createElement('span');
    span.textContent = detail;
    el.append(b, span);
    stack.appendChild(el);
    while (stack.children.length > 3) stack.firstElementChild.remove();
    requestAnimationFrame(() => el.classList.add('is-show'));
    window.setTimeout(() => {
      el.classList.add('is-out');
      window.setTimeout(() => el.remove(), 360);
    }, 2800);
  }

  function renderScores() {
    $$('.team-chip').forEach(chip => {
      const team = TEAMS[chip.dataset.team];
      const score = Number(state.scores[chip.dataset.team] || 0);
      const scoreEl = $('.team-score', chip);
      if (scoreEl) scoreEl.textContent = String(score);
      chip.setAttribute('aria-label', `${team.name}，${score} 探索值`);
      chip.classList.toggle('is-active', chip.dataset.team === state.activeTeam);
      chip.setAttribute('aria-pressed', chip.dataset.team === state.activeTeam ? 'true' : 'false');
    });
    $$('.teacher-score').forEach(el => {
      const row = el.closest('[data-team]');
      if (row) el.textContent = String(Number(state.scores[row.dataset.team] || 0));
    });
    const quizTeamScore = $('#quizTeamScore');
    if (quizTeamScore) quizTeamScore.textContent = String(Number(state.scores[state.activeTeam] || 0));
  }

  function pulseTeam(teamId) {
    const chip = $(`.team-chip[data-team="${teamId}"]`);
    if (!chip) return;
    chip.classList.remove('is-pulse');
    void chip.offsetWidth;
    chip.classList.add('is-pulse');
    window.setTimeout(() => chip.classList.remove('is-pulse'), 760);
  }

  function applyTeam(teamId, opts = {}) {
    if (!TEAMS[teamId]) return;
    state.activeTeam = teamId;
    document.documentElement.style.setProperty('--team-color', TEAMS[teamId].color);
    $$('.team-choice').forEach(btn => {
      const active = btn.dataset.team === teamId;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    $$('.team-chip').forEach(btn => btn.classList.toggle('is-active', btn.dataset.team === teamId));
    const teamLabel = $('#ideaTeamLabel');
    if (teamLabel) teamLabel.textContent = `以 ${TEAMS[teamId].name} 名义提交`;
    const quizTeamName = $('#quizTeamName');
    if (quizTeamName) quizTeamName.textContent = TEAMS[teamId].name;
    const quizTeamDot = $('#quizTeamDot');
    if (quizTeamDot) quizTeamDot.style.background = TEAMS[teamId].color;
    renderScores();
    saveState();
    if (!opts.silent) {
      toast('已切换小队', `${TEAMS[teamId].name} · ${TEAMS[teamId].motto}`, TEAMS[teamId].color);
      sfx('click');
    }
  }

  function award(key, points, label, opts = {}) {
    if (state.awards[key]) return false;
    const teamId = state.activeTeam;
    state.awards[key] = Number(points);
    state.scores[teamId] = Number(state.scores[teamId] || 0) + Number(points);
    saveState();
    renderScores();
    pulseTeam(teamId);
    toast(`+${points} 探索值`, `${label} · ${TEAMS[teamId].name}`, TEAMS[teamId].color);
    if (!opts.silentSound) sfx('success');
    refreshStationLocks({ announce: true });
    return true;
  }

  function unlockBadge(key, fallbackTitle, fallbackIcon = '◆') {
    if (state.badges[key]) return false;
    const meta = BADGES[key] || { title: fallbackTitle || key, icon: fallbackIcon };
    state.badges[key] = { title: meta.title, icon: meta.icon, at: Date.now() };
    saveState();
    renderBadges();
    toast('徽章解锁', meta.title, '#ffc857');
    sfx('badge');
    return true;
  }

  function renderBadges() {
    const items = Object.values(state.badges);
    $$('.badge-list').forEach(list => {
      if (list.id === 'quizBadgeList' || list.id === 'teacherBadges') {
        list.innerHTML = '';
        if (!items.length) {
          const empty = document.createElement('span');
          empty.className = 'badge-empty';
          empty.textContent = list.id === 'teacherBadges' ? '暂无' : '完成挑战，点亮徽章';
          list.appendChild(empty);
          return;
        }
        items.forEach(item => {
          const pill = document.createElement('span');
          pill.className = 'badge-pill';
          pill.textContent = item.title;
          list.appendChild(pill);
        });
      }
    });
  }

  /* ========================================================================
     Confetti
     ======================================================================== */

  const fxCanvas = $('#fxCanvas');
  let fxCtx = null;
  let fxParticles = [];
  let fxRaf = 0;

  function resizeFx() {
    if (!fxCanvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    fxCanvas.width = Math.floor(window.innerWidth * dpr);
    fxCanvas.height = Math.floor(window.innerHeight * dpr);
    fxCanvas.style.width = `${window.innerWidth}px`;
    fxCanvas.style.height = `${window.innerHeight}px`;
    if (!fxCtx) fxCtx = fxCanvas.getContext('2d');
    if (fxCtx) fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function confettiBurst(x, y, count = 70, colors = null) {
    if (!fxCanvas || !fxCtx || reduceMotion) return;
    resizeFx();
    const palette = colors || [currentTeam().color, '#b7ff72', '#ffc857', '#ffffff', '#ff6ec7'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.2 + Math.random() * 6.6;
      fxParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 2 + Math.random() * 5,
        color: palette[Math.floor(Math.random() * palette.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        life: 1,
        decay: 0.008 + Math.random() * 0.01,
        shape: Math.random() > 0.55 ? 'rect' : 'dot'
      });
    }
    if (!fxRaf) fxRaf = requestAnimationFrame(drawFx);
  }

  function burstAt(el, count = 70) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    confettiBurst(r.left + r.width / 2, r.top + Math.min(r.height / 2, 260), count);
  }

  function drawFx() {
    if (!fxCtx || !fxCanvas) { fxRaf = 0; return; }
    const w = window.innerWidth;
    const h = window.innerHeight;
    fxCtx.clearRect(0, 0, w, h);
    fxParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.14;
      p.vx *= 0.992;
      p.rot += p.vr;
      p.life -= p.decay;
    });
    fxParticles = fxParticles.filter(p => p.life > 0 && p.y < h + 60);
    fxParticles.forEach(p => {
      fxCtx.save();
      fxCtx.globalAlpha = Math.max(0, p.life);
      fxCtx.translate(p.x, p.y);
      fxCtx.rotate(p.rot);
      fxCtx.fillStyle = p.color;
      if (p.shape === 'rect') {
        fxCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        fxCtx.beginPath();
        fxCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        fxCtx.fill();
      }
      fxCtx.restore();
    });
    if (fxParticles.length) {
      fxRaf = requestAnimationFrame(drawFx);
    } else {
      fxCtx.clearRect(0, 0, w, h);
      fxRaf = 0;
    }
  }

  /* ========================================================================
     Launch + global nav + sound controls
     ======================================================================== */

  function initLaunch() {
    const launch = $('#launch');
    const launchBtn = $('#launchBtn');
    let launchCourse = 1;
    applyTeam(state.activeTeam, { silent: true });

    $$('.team-choice').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.team === state.activeTeam);
      btn.addEventListener('click', () => {
        applyTeam(btn.dataset.team, { silent: true });
        sfx('click');
      });
    });

    const courseCards = $$('[data-launch-course]');
    const chooseCourse = course => {
      const next = Number(course);
      launchCourse = next === 3 ? 3 : (next === 2 ? 2 : 1);
      courseCards.forEach(card => {
        const active = Number(card.dataset.launchCourse) === launchCourse;
        card.classList.toggle('is-active', active);
        card.setAttribute('aria-checked', active ? 'true' : 'false');
      });
      const label = $('span', launchBtn);
      if (label) {
        label.textContent = launchCourse === 3 ? '进入第 9 课' : `进入第 ${launchCourse} 课`;
      }
    };
    courseCards.forEach(card => {
      card.addEventListener('click', () => {
        chooseCourse(card.dataset.launchCourse);
        sfx('click');
      });
    });
    chooseCourse(1);

    if (!launch || !launchBtn) return;
    launchBtn.addEventListener('click', async () => {
      const full = $('#launchFullscreen');
      if (full && full.checked) {
        try {
          if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
        } catch (err) { /* fullscreen is optional */ }
      }
      setCourse(launchCourse, { silent: true, noScroll: true });
      launch.classList.add('is-hidden');
      document.body.classList.remove('is-locked');
      sfx('boot');
      const courseName = launchCourse === 3 ? '八年级第9课' : (launchCourse === 2 ? '第二课' : '第一课');
      const target = launchCourse === 3 ? '#l3-data' : (launchCourse === 2 ? '#l2-content' : '#origin');
      window.setTimeout(() => {
        toast(`${courseName} · 开始闯关`, `${currentTeam().name} 就位，进入第 01 站`, currentTeam().color);
        document.querySelector(target)?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }, 650);
      window.setTimeout(() => {
        launch.setAttribute('aria-hidden', 'true');
      }, 900);
    });
  }

  function initTopbar() {
    $$('.team-chip').forEach(chip => {
      chip.addEventListener('click', () => applyTeam(chip.dataset.team));
    });

    const soundBtn = $('#soundBtn');
    if (soundBtn) {
      soundBtn.classList.toggle('is-muted', !state.sound);
      soundBtn.setAttribute('aria-pressed', state.sound ? 'true' : 'false');
      soundBtn.setAttribute('aria-label', state.sound ? '关闭音效' : '打开音效');
      soundBtn.addEventListener('click', () => setSound(!state.sound));
    }

    const teacherBtn = $('#teacherBtn');
    const teacherPanel = $('#teacherPanel');
    const teacherScrim = $('#teacherScrim');
    const closeTeacher = () => {
      teacherPanel?.classList.remove('is-open');
      teacherScrim?.classList.remove('is-open');
      teacherPanel?.setAttribute('aria-hidden', 'true');
    };
    teacherBtn?.addEventListener('click', () => {
      teacherPanel?.classList.add('is-open');
      teacherScrim?.classList.add('is-open');
      teacherPanel?.setAttribute('aria-hidden', 'false');
      sfx('click');
      const first = $('#fullscreenBtn');
      window.setTimeout(() => first?.focus(), 350);
    });
    teacherScrim?.addEventListener('click', closeTeacher);
    $('#teacherClose')?.addEventListener('click', closeTeacher);
    $$('#teacherJumps a').forEach(a => a.addEventListener('click', closeTeacher));
    window.closeTeacherPanel = closeTeacher;

    const missionBtn = $('#missionBtn');
    const missionDialog = $('#missionDialog');
    missionBtn?.addEventListener('click', () => {
      missionDialog?.showModal();
      sfx('click');
    });
    $$('[data-close-dialog]').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('dialog')?.close());
    });
    $$('dialog').forEach(dlg => {
      dlg.addEventListener('click', event => {
        if (event.target === dlg) dlg.close();
      });
    });

    initScrollUI();
    initTeacherTools();
    initKeyboard();
  }

  function setSound(enabled) {
    state.sound = Boolean(enabled);
    saveState();
    const soundBtn = $('#soundBtn');
    if (soundBtn) {
      soundBtn.classList.toggle('is-muted', !state.sound);
      soundBtn.setAttribute('aria-pressed', state.sound ? 'true' : 'false');
      soundBtn.setAttribute('aria-label', state.sound ? '关闭音效' : '打开音效');
    }
    const panelBtn = $('#soundTogglePanel');
    if (panelBtn) panelBtn.textContent = `音效：${state.sound ? '开' : '关'}`;
    if (state.sound) sfx('click');
  }

  function initKeyboard() {
    document.addEventListener('keydown', event => {
      const target = event.target;
      const typing = target.matches?.('input, textarea, select, [contenteditable="true"]');
      if (event.key === 'Escape') {
        window.closeTeacherPanel?.();
        if (document.fullscreenElement) {
          document.exitFullscreen?.().catch(() => {});
        }
        return;
      }
      if (typing) return;
      const key = event.key.toLowerCase();
      if (key === 't') {
        event.preventDefault();
        $('#teacherBtn')?.click();
      } else if (key === 'm') {
        event.preventDefault();
        setSound(!state.sound);
      } else if (key === 'f') {
        event.preventDefault();
        toggleFullscreen();
      }
    });
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
  }

  function initScrollUI() {
    const topbar = $('#topbar');
    const progress = $('#pageProgress');
    const links = $$('.station-link, .mobile-stations a');
    const sections = $$('main section[id]');
    let scheduled = false;

    const update = () => {
      scheduled = false;
      const top = window.scrollY || window.pageYOffset || 0;
      const topbarHeight = topbar?.offsetHeight || 74;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, (top / max) * 100));
      if (progress) progress.style.width = `${pct}%`;
      topbar?.classList.toggle('is-scrolled', top > 12);

      let current = '';
      sections.forEach(section => {
        if (section.offsetTop - topbarHeight - 120 <= top) current = section.id;
      });
      links.forEach(link => {
        const active = link.dataset.station === current;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();

    $$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        if (link.closest('dialog')) return;
        sfx('click');
      });
    });
  }

  /* ========================================================================
     Hero network sphere
     ======================================================================== */

  function initHeroCanvas() {
    const canvas = $('#netCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const N = 66;
    const points = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radius = Math.sqrt(Math.max(0, 1 - y * y));
      const phi = i * 2.399963229728653;
      points.push({
        x: radius * Math.cos(phi),
        y,
        z: radius * Math.sin(phi),
        seed: Math.random() * Math.PI * 2
      });
    }
    const edges = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dz = points[i].z - points[j].z;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 0.52) edges.push([i, j]);
      }
    }

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    function resize() {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function project(p, rotation, tilt) {
      const cosY = Math.cos(rotation);
      const sinY = Math.sin(rotation);
      const cosX = Math.cos(tilt);
      const sinX = Math.sin(tilt);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const y1 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      const cx = width * 0.5;
      const cy = height * 0.49;
      const base = Math.min(width, height) * 0.315;
      const scale = base * (1.85 / (1.95 - z2 * 0.5));
      return { x: cx + x1 * scale, y: cy + y1 * scale, z: z2 };
    }

    function draw(t) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;
      const rotation = t * 0.00011 + mouseX * 0.18;
      const tilt = -0.24 + mouseY * 0.08;

      const projected = points.map(p => project(p, rotation, tilt));

      edges.forEach(([a, b]) => {
        const p1 = projected[a];
        const p2 = projected[b];
        if (p1.z < -0.55 || p2.z < -0.55) return;
        const depth = (p1.z + p2.z + 1.2) / 2.2;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(87, 232, 255, ${0.035 + Math.max(0, depth) * 0.13})`;
        ctx.lineWidth = 0.55;
        ctx.stroke();
      });

      projected.forEach((p, i) => {
        if (p.z < -0.7) return;
        const pulse = 0.55 + 0.45 * Math.sin(t * 0.0011 + points[i].seed);
        const radius = 0.9 + (p.z + 1) * 1.25 + pulse * 0.4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = i % 7 === 0
          ? `rgba(183, 255, 114, ${0.35 + pulse * 0.4})`
          : `rgba(87, 232, 255, ${0.3 + pulse * 0.5})`;
        ctx.fill();
        if (i % 11 === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius + 3.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(87, 232, 255, ${0.08 + pulse * 0.12})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });

      const cx = width * 0.5;
      const cy = height * 0.49;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(width, height) * 0.35);
      glow.addColorStop(0, 'rgba(87, 232, 255, .055)');
      glow.addColorStop(0.55, 'rgba(87, 232, 255, .018)');
      glow.addColorStop(1, 'rgba(87, 232, 255, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      if (!reduceMotion && visible) raf = requestAnimationFrame(draw);
    }

    function start() {
      cancelAnimationFrame(raf);
      if (reduceMotion) {
        draw(0);
        return;
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    start();

    const visual = canvas.parentElement;
    visual?.addEventListener('pointermove', event => {
      const rect = visual.getBoundingClientRect();
      targetMouseX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    });
    visual?.addEventListener('pointerleave', () => {
      targetMouseX = 0;
      targetMouseY = 0;
    });

    window.addEventListener('resize', () => {
      resize();
      if (reduceMotion) draw(0);
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        visible = entry.isIntersecting;
        if (visible && !raf && !reduceMotion) start();
      });
    }, { threshold: 0.05 });
    observer.observe(canvas);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (visible && !reduceMotion) start();
    });
  }

  /* ========================================================================
     01 Origin: three nets + build a network
     ======================================================================== */

  const NET_COPY = {
    ball: {
      icon: '×',
      text: '球网用线把每个交点连起来，力量分散到整张网，形成受力整体。',
      label: '节点 × 连线 = 整体'
    },
    fish: {
      icon: '◇',
      text: '渔网用重复的结与线扩大覆盖面积，每一段都不是孤立的。',
      label: '节点 × 连线 = 覆盖'
    },
    spider: {
      icon: '◎',
      text: '蜘蛛网从中心向外辐射，用最少的丝覆盖最大的范围，还能感知震动。',
      label: '节点 × 连线 = 韧性'
    }
  };

  function initOrigin() {
    const opened = new Set();
    const countEl = $('#netDecoded');
    const insight = $('#netInsight');
    const definition = $('#definitionCard');

    $$('.net-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.net;
        const firstOpen = !opened.has(id);
        opened.add(id);
        card.classList.add('is-open');
        card.setAttribute('aria-pressed', 'true');
        if (countEl) countEl.textContent = String(opened.size);
        const copy = NET_COPY[id];
        if (insight && copy) {
          insight.innerHTML = '';
          const icon = document.createElement('span');
          icon.className = 'insight-icon';
          icon.textContent = copy.icon;
          const p = document.createElement('p');
          p.textContent = copy.text;
          insight.append(icon, p);
        }
        if (firstOpen) sfx('link');
        if (opened.size === 3) {
          definition?.classList.remove('is-locked');
          if (award('origin-decode', 5, '解码三张网')) {
            unlockBadge('origin-decode');
            burstAt(definition, 55);
          }
        }
      });
    });

    initBuildLab();
  }

  const BUILD_NODES = {
    server: { x: 12, y: 50, label: '服务器' },
    a: { x: 38, y: 18, label: '电脑A' },
    b: { x: 38, y: 78, label: '电脑B' },
    tablet: { x: 66, y: 50, label: '学习平板' },
    phone: { x: 88, y: 20, label: '手机' }
  };

  function initBuildLab() {
    const svg = $('#buildSvg');
    const board = $('#buildBoard');
    const linkCount = $('#linkCount');
    const status = $('#buildStatus');
    const sendBtn = $('#sendPacket');
    const resetBtn = $('#resetBuild');
    const hint = $('#boardHint');
    const awardEl = $('#buildAward');
    if (!svg || !board) return;

    let edges = [];
    let firstNode = null;
    let packetRaf = 0;

    function adjacency() {
      const map = {};
      Object.keys(BUILD_NODES).forEach(id => { map[id] = []; });
      edges.forEach(([a, b]) => {
        if (!map[a] || !map[b]) return;
        map[a].push(b);
        map[b].push(a);
      });
      return map;
    }

    function pathBetween(start, end) {
      const map = adjacency();
      const queue = [start];
      const previous = { [start]: null };
      while (queue.length) {
        const node = queue.shift();
        if (node === end) break;
        (map[node] || []).forEach(next => {
          if (!(next in previous)) {
            previous[next] = node;
            queue.push(next);
          }
        });
      }
      if (!(end in previous)) return null;
      const path = [];
      let node = end;
      while (node) {
        path.unshift(node);
        node = previous[node];
      }
      return path;
    }

    function isConnected() {
      return Object.keys(BUILD_NODES).every(id => Boolean(pathBetween('server', id)));
    }

    function pointFor(id, axis) {
      const node = BUILD_NODES[id];
      return axis === 'x' ? node.x * 10 : node.y * 6;
    }

    function render() {
      svg.innerHTML = '';
      edges.forEach(([a, b]) => {
        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', pointFor(a, 'x'));
        line.setAttribute('y1', pointFor(a, 'y'));
        line.setAttribute('x2', pointFor(b, 'x'));
        line.setAttribute('y2', pointFor(b, 'y'));
        line.setAttribute('class', 'build-line');
        svg.appendChild(line);
      });

      $$('.device-node', board).forEach(node => {
        node.classList.toggle('is-selected', node.dataset.node === firstNode);
      });

      if (linkCount) linkCount.textContent = String(edges.length);
      const connected = isConnected();
      if (status) {
        status.textContent = connected ? '已连通' : '未连通';
        status.classList.toggle('status-on', connected);
        status.classList.toggle('status-off', !connected);
      }
      if (sendBtn) sendBtn.disabled = !connected;
      if (hint) {
        hint.textContent = connected
          ? '网络已连通 · 点击“发送数据包”看看数据怎么走'
          : firstNode
            ? '再点一台设备，为它们拉一条线'
            : '点击两台设备，开始布线';
      }
      if (connected && awardEl) awardEl.classList.add('is-shown');

      if (connected && award('origin-build', 10, '亲手组网成功')) {
        unlockBadge('origin-build');
        burstAt(board, 70);
      }
    }

    function clearPacket() {
      cancelAnimationFrame(packetRaf);
      packetRaf = 0;
    }

    function animatePacket(path) {
      clearPacket();
      $$('.build-line', svg).forEach(line => line.classList.remove('is-packet-path'));
      const segments = path.length - 1;
      if (segments < 1) return;
      const dot = document.createElementNS(SVG_NS, 'circle');
      dot.setAttribute('class', 'packet-dot');
      dot.setAttribute('r', '6');
      svg.appendChild(dot);
      const start = performance.now();
      const duration = 900 + segments * 380;
      const points = path.map(id => ({ x: pointFor(id, 'x'), y: pointFor(id, 'y') }));
      const total = segments;
      const step = now => {
        const stamp = Number.isFinite(now) ? now : performance.now();
        const progress = Math.min(1, Math.max(0, (stamp - start) / duration));
        const scaled = progress * total;
        const seg = Math.min(total - 1, Math.floor(scaled));
        const local = scaled - seg;
        const p1 = points[seg];
        const p2 = points[seg + 1];
        dot.setAttribute('cx', String(p1.x + (p2.x - p1.x) * local));
        dot.setAttribute('cy', String(p1.y + (p2.y - p1.y) * local));
        if (progress < 1) {
          packetRaf = requestAnimationFrame(step);
        } else {
          dot.remove();
          packetRaf = 0;
          const target = $(`.device-node[data-node="${path[path.length - 1]}"]`, board);
          if (target) {
            target.classList.add('is-receiving');
            window.setTimeout(() => target.classList.remove('is-receiving'), 1000);
          }
          sfx('data');
          toast('数据送达', `${path.length} 台设备接力完成传输`, '#b7ff72');
        }
      };
      packetRaf = requestAnimationFrame(step);
    }

    $$('.device-node', board).forEach(node => {
      node.addEventListener('click', () => {
        const id = node.dataset.node;
        if (!firstNode) {
          firstNode = id;
          sfx('click');
          render();
          return;
        }
        if (firstNode === id) {
          firstNode = null;
          sfx('click');
          render();
          return;
        }
        const exists = edges.some(([a, b]) => (a === firstNode && b === id) || (a === id && b === firstNode));
        if (exists) {
          toast('这条线路已经存在', '换两台设备，继续扩展网络', '#ffc857');
          sfx('error');
          firstNode = null;
          render();
          return;
        }
        edges.push([firstNode, id]);
        firstNode = null;
        sfx('link');
        render();
      });
    });

    sendBtn?.addEventListener('click', () => {
      const path = pathBetween('server', 'phone');
      if (!path) {
        toast('还没有连通', '请先把服务器和手机接入同一张网', '#ff6078');
        sfx('error');
        return;
      }
      animatePacket(path);
    });

    resetBtn?.addEventListener('click', () => {
      clearPacket();
      edges = [];
      firstNode = null;
      if (awardEl && !state.awards['origin-build']) awardEl.classList.remove('is-shown');
      sfx('click');
      render();
    });

    render();
  }

  /* ========================================================================
     02 Timeline + stages + quick check
     ======================================================================== */

  const TIMELINE_EVENTS = {
    A: { code: 'A', label: '大规模启用 IPv6', year: '2017', fact: 'IPv6 拥有更大的地址空间，能支撑海量设备接入。' },
    B: { code: 'B', label: '万维网诞生', year: '1989', fact: '万维网让普通人也能通过浏览器访问信息。' },
    C: { code: 'C', label: 'IPv4 发布', year: '1981', fact: 'IPv4 为联网设备提供统一的“门牌号”。' },
    D: { code: 'D', label: '阿帕网改用 TCP/IP', year: '1983', fact: 'TCP/IP 让不同网络使用同一种“语言”互联。' }
  };
  const TIMELINE_YEARS = ['1981', '1983', '1989', '2017'];
  const TIMELINE_HINTS = [
    'IPv4 是互联网的“门牌号”，它出现得最早。',
    'IPv4 发布两年后，阿帕网改用 TCP/IP，协议开始标准化。',
    '万维网诞生在 20 世纪 80 年代末；IPv6 是时间轴上最晚的一次大升级。'
  ];
  const STAGES = [
    {
      name: '诞生阶段',
      period: '20 世纪 60 年代',
      desc: '计算机还很稀少、昂贵。多个终端通过通信线路共享一台主机，网络的思想开始萌芽。',
      key: '多终端共享',
      art: `<div class="art-share"><div class="mainframe">HOST</div><div class="term t1"></div><div class="term t2"></div><div class="term t3"></div><div class="term t4"></div><svg viewBox="0 0 180 130" aria-hidden="true"><path d="M90 65L16 25M90 65L16 105M90 65L164 25M90 65L164 105"/></svg></div>`
    },
    {
      name: '形成阶段',
      period: '1969 年',
      desc: '阿帕网连接起多台计算机，计算机之间可以直接交换信息，互联网的雏形出现。',
      key: '阿帕网出现',
      art: `<div class="art-mesh-mini"><svg viewBox="0 0 190 150" aria-hidden="true"><path d="M32 32L95 22 158 38 146 112 48 118 32 32M32 32L95 74 158 38M48 118L95 74 146 112M95 22v96M32 32l114 86"/><circle cx="32" cy="32" r="8"/><circle cx="95" cy="22" r="8"/><circle cx="158" cy="38" r="8"/><circle cx="146" cy="112" r="8"/><circle cx="48" cy="118" r="8"/><circle class="hot" cx="95" cy="74" r="9"/></svg></div>`
    },
    {
      name: '互联阶段',
      period: '1983 年',
      desc: '不同网络使用不同“语言”。TCP/IP 协议的标准化，让异构网络能够互联，互联网真正走向开放。',
      key: 'TCP/IP 标准化',
      art: `<div class="art-protocol"><div class="protocol-chips"><span>TCP</span><span>IP</span></div><div class="protocol-flow"><span>异构网络</span><i></i><span>同一种语言</span></div></div>`
    },
    {
      name: '高速网络阶段',
      period: '1990 年代 →',
      desc: '光纤、移动通信和云计算推动带宽与速度跃升，互联网成为“信息高速公路”，应用渗透到社会各领域。',
      key: '信息高速公路',
      art: `<div class="art-speed"><div class="speed-rings"></div><b>5G</b><span>HIGH SPEED · LOW LATENCY</span></div>`
    }
  ];

  function initTimeline() {
    const slots = $$('.year-slot');
    const cards = $$('.event-card');
    const tray = $('#eventTray');
    const status = $('#timelineStatus');
    const checkBtn = $('#timelineCheck');
    const hintBtn = $('#timelineHint');
    const hintText = $('#timelineHintText');
    const facts = $('#timelineFacts');
    if (!slots.length || !cards.length) return;

    let placements = {};
    let selected = null;
    let solved = false;
    let hintIndex = 0;

    function render() {
      const placedIds = Object.values(placements);
      cards.forEach(card => {
        const id = card.dataset.event;
        card.hidden = placedIds.includes(id);
        card.classList.toggle('is-selected', selected === id);
        card.setAttribute('aria-pressed', selected === id ? 'true' : 'false');
      });
      slots.forEach(slot => {
        const year = slot.dataset.year;
        const eventId = placements[year];
        const fill = $('.slot-fill', slot);
        if (fill) {
          fill.textContent = eventId ? `${eventId} · ${TIMELINE_EVENTS[eventId].label}` : '放入事件';
        }
        slot.classList.toggle('is-filled', Boolean(eventId));
        slot.setAttribute('aria-label', `${year} 年${eventId ? `，已放入 ${TIMELINE_EVENTS[eventId].label}` : '，空位'}`);
      });
    }

    function place(eventId, year) {
      if (solved) return;
      Object.keys(placements).forEach(key => {
        if (placements[key] === eventId) delete placements[key];
      });
      placements[year] = eventId;
      selected = null;
      render();
      sfx('link');
    }

    function pickCard(id) {
      if (solved) return;
      selected = selected === id ? null : id;
      render();
      if (selected) sfx('click');
    }

    function pickSlot(year) {
      if (solved) return;
      if (selected) {
        place(selected, year);
        return;
      }
      if (placements[year]) {
        const removed = placements[year];
        delete placements[year];
        selected = removed;
        render();
        toast('已取回事件', `可以重新放到别的年份`, '#ffc857');
        sfx('click');
      }
    }

    cards.forEach(card => {
      card.addEventListener('click', () => pickCard(card.dataset.event));
      card.addEventListener('dragstart', event => {
        if (solved) { event.preventDefault(); return; }
        event.dataTransfer.setData('text/plain', card.dataset.event);
        event.dataTransfer.effectAllowed = 'move';
        card.classList.add('is-selected');
      });
      card.addEventListener('dragend', () => {
        card.classList.remove('is-selected');
      });
    });

    slots.forEach(slot => {
      slot.addEventListener('click', () => pickSlot(slot.dataset.year));
      slot.addEventListener('dragover', event => {
        if (solved) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      });
      slot.addEventListener('drop', event => {
        if (solved) return;
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        if (TIMELINE_EVENTS[id]) place(id, slot.dataset.year);
      });
    });

    function showFacts() {
      if (!facts) return;
      facts.innerHTML = '';
      TIMELINE_YEARS.forEach(year => {
        const eventId = placements[year];
        if (!eventId) return;
        const card = document.createElement('article');
        const b = document.createElement('b');
        b.textContent = year;
        const span = document.createElement('span');
        span.textContent = TIMELINE_EVENTS[eventId].label;
        const p = document.createElement('p');
        p.textContent = TIMELINE_EVENTS[eventId].fact;
        card.append(b, span, p);
        facts.appendChild(card);
      });
      facts.hidden = false;
    }

    checkBtn?.addEventListener('click', () => {
      if (solved) return;
      const empty = TIMELINE_YEARS.filter(year => !placements[year]);
      if (empty.length) {
        if (status) {
          status.textContent = `还有 ${empty.length} 个空位`;
          status.classList.remove('is-ok');
          status.classList.add('is-error');
        }
        toast('时间轴还没填满', '把四张事件卡都放进去再校验', '#ffc857');
        sfx('error');
        return;
      }
      const wrong = TIMELINE_YEARS.filter(year => TIMELINE_EVENTS[placements[year]].year !== year);
      if (wrong.length) {
        wrong.forEach(year => {
          const slot = $(`.year-slot[data-year="${year}"]`);
          slot?.classList.add('is-wrong');
          window.setTimeout(() => slot?.classList.remove('is-wrong'), 520);
        });
        if (status) {
          status.textContent = `有 ${wrong.length} 个位置需要调整`;
          status.classList.remove('is-ok');
          status.classList.add('is-error');
        }
        if (hintText) hintText.textContent = '提示：IPv4 比 TCP/IP 早两年；万维网诞生在 20 世纪 80 年代末。';
        sfx('error');
        return;
      }

      solved = true;
      slots.forEach(slot => slot.classList.add('is-correct'));
      if (status) {
        status.textContent = '时间轴校准完成';
        status.classList.add('is-ok');
        status.classList.remove('is-error');
      }
      if (hintText) hintText.textContent = '关键事件归位成功，时间轴开始发光。';
      showFacts();
      if (award('timeline', 15, '关键事件全部归位')) {
        unlockBadge('timeline');
        burstAt($('.timeline-board'), 80);
      }
    });

    hintBtn?.addEventListener('click', () => {
      if (hintText) hintText.textContent = TIMELINE_HINTS[hintIndex % TIMELINE_HINTS.length];
      hintIndex += 1;
      sfx('click');
    });

    render();
    initStages();
    initYearQuiz();
  }

  function initStages() {
    const tabs = $$('.stage-tab');
    const number = $('#stageNumber');
    const period = $('#stagePeriod');
    const name = $('#stageName');
    const desc = $('#stageDesc');
    const key = $('#stageKey');
    const art = $('#stageArt');
    if (!tabs.length) return;

    const visited = new Set();

    function select(index) {
      const stage = STAGES[index];
      if (!stage) return;
      tabs.forEach((tab, i) => {
        tab.classList.toggle('is-active', i === index);
        tab.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      if (number) number.textContent = String(index + 1).padStart(2, '0');
      if (period) period.textContent = stage.period;
      if (name) name.textContent = stage.name;
      if (desc) desc.textContent = stage.desc;
      if (key) key.textContent = stage.key;
      if (art) art.innerHTML = stage.art;
      visited.add(index);
      sfx('click');
      if (visited.size === STAGES.length) {
        if (award('stage-all', 5, '走完四个发展阶段')) unlockBadge('stage-all');
      }
    }

    tabs.forEach((tab, index) => tab.addEventListener('click', () => select(index)));
    select(0);
    visited.add(0);
  }

  function initYearQuiz() {
    const quiz = $('#yearQuiz');
    const feedback = $('#yearFeedback');
    const buttons = $$('button[data-answer]', quiz);
    if (!quiz || !buttons.length) return;
    let answered = false;

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (answered) return;
        const answer = button.dataset.answer;
        if (answer === '1994') {
          answered = true;
          button.classList.add('is-correct');
          buttons.forEach(btn => { btn.disabled = true; });
          if (feedback) {
            feedback.textContent = '正确！1994 年 4 月 20 日，一条 64K 国际专线开通，中国实现全功能接入国际互联网。';
            feedback.classList.remove('is-error');
            feedback.classList.add('is-ok');
          }
          if (award('year-quiz', 5, '答对中国接入之年')) unlockBadge('year-quiz');
          sfx('success');
        } else {
          button.classList.add('is-wrong');
          if (feedback) {
            feedback.textContent = '再想想：1987 年是中国第一封电子邮件；2008 年网民规模世界第一。';
            feedback.classList.remove('is-ok');
            feedback.classList.add('is-error');
          }
          sfx('error');
        }
      });
    });
  }

  /* ========================================================================
     03 Topology lab
     ======================================================================== */

  function makeStarNodes() {
    const nodes = [{ x: 300, y: 190, label: '中心' }];
    for (let i = 0; i < 6; i++) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 6;
      nodes.push({
        x: 300 + Math.cos(angle) * 155,
        y: 190 + Math.sin(angle) * 132,
        label: `N${i + 1}`
      });
    }
    return nodes;
  }

  function makeRingNodes() {
    const nodes = [];
    for (let i = 0; i < 6; i++) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / 6;
      nodes.push({
        x: 300 + Math.cos(angle) * 145,
        y: 190 + Math.sin(angle) * 125,
        label: `N${i}`
      });
    }
    return nodes;
  }

  const TOPOLOGIES = {
    star: {
      label: '星型',
      score: 34,
      desc: '所有节点连接到一个中心。管理简单，但中心一旦故障，整张网可能瘫痪。',
      nodes: makeStarNodes(),
      edges: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]],
      source: 1,
      target: 4,
      center: 0
    },
    ring: {
      label: '环型',
      score: 62,
      desc: '节点首尾相接形成一个环。切断一条线路，数据还能从另一边绕行；断两处则可能分区。',
      nodes: makeRingNodes(),
      edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
      source: 0,
      target: 3,
      center: null
    },
    mesh: {
      label: '网状',
      score: 94,
      desc: '节点之间有多条线路。一条线路故障时，数据可以切换到别的路径继续传输，最难被“切断”。',
      nodes: [
        { x: 105, y: 190, label: 'N0' },
        { x: 215, y: 82, label: 'N1' },
        { x: 390, y: 70, label: 'N2' },
        { x: 500, y: 180, label: 'N3' },
        { x: 415, y: 300, label: 'N4' },
        { x: 235, y: 305, label: 'N5' },
        { x: 305, y: 190, label: 'N6' }
      ],
      edges: [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
        [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6],
        [0, 2], [3, 5]
      ],
      source: 0,
      target: 3,
      center: null
    }
  };

  let topoState = {
    mode: 'star',
    cuts: new Set(),
    centerDown: false,
    playing: false
  };

  function initTopology() {
    const svg = $('#topoSvg');
    const cards = $$('.topo-card');
    const label = $('#topoLabel');
    const desc = $('#topoDesc');
    const robustValue = $('#robustValue');
    const robustBar = $('#robustBar');
    const result = $('#topoResult');
    const sendBtn = $('#sendTopo');
    const cutBtn = $('#cutTopo');
    const resetBtn = $('#resetTopo');
    if (!svg) return;

    function config() {
      return TOPOLOGIES[topoState.mode];
    }

    function path() {
      const conf = config();
      if (topoState.centerDown && conf.center !== null) return null;
      const map = {};
      conf.nodes.forEach((_, i) => { map[i] = []; });
      conf.edges.forEach(([a, b], index) => {
        if (topoState.cuts.has(index)) return;
        if (topoState.centerDown && (a === conf.center || b === conf.center)) return;
        map[a].push(b);
        map[b].push(a);
      });
      const queue = [conf.source];
      const previous = { [conf.source]: null };
      while (queue.length) {
        const node = queue.shift();
        if (node === conf.target) break;
        (map[node] || []).forEach(next => {
          if (!(next in previous)) {
            previous[next] = node;
            queue.push(next);
          }
        });
      }
      if (!(conf.target in previous)) return null;
      const route = [];
      let node = conf.target;
      while (node !== null && node !== undefined) {
        route.unshift(node);
        node = previous[node];
      }
      return route;
    }

    function edgeMidpoint(edgeIndex) {
      const conf = config();
      const [a, b] = conf.edges[edgeIndex];
      return {
        x: (conf.nodes[a].x + conf.nodes[b].x) / 2,
        y: (conf.nodes[a].y + conf.nodes[b].y) / 2
      };
    }

    function render(packetRoute = null) {
      const conf = config();
      svg.innerHTML = '';
      const routeEdge = new Set();
      if (packetRoute) {
        for (let i = 0; i < packetRoute.length - 1; i++) {
          const a = packetRoute[i];
          const b = packetRoute[i + 1];
          const index = conf.edges.findIndex(([x, y]) => (x === a && y === b) || (x === b && y === a));
          if (index >= 0) routeEdge.add(index);
        }
      }

      conf.edges.forEach(([a, b], index) => {
        const n1 = conf.nodes[a];
        const n2 = conf.nodes[b];
        const cut = topoState.cuts.has(index);
        const hit = document.createElementNS(SVG_NS, 'line');
        hit.setAttribute('x1', n1.x);
        hit.setAttribute('y1', n1.y);
        hit.setAttribute('x2', n2.x);
        hit.setAttribute('y2', n2.y);
        hit.setAttribute('class', 'edge-hit');
        hit.setAttribute('data-edge', String(index));
        svg.appendChild(hit);

        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', n1.x);
        line.setAttribute('y1', n1.y);
        line.setAttribute('x2', n2.x);
        line.setAttribute('y2', n2.y);
        line.setAttribute('class', `topo-edge${cut ? ' is-cut' : ''}${routeEdge.has(index) ? ' is-route' : ''}`);
        line.setAttribute('pointer-events', 'none');
        svg.appendChild(line);

        if (cut) {
          const mid = edgeMidpoint(index);
          const text = document.createElementNS(SVG_NS, 'text');
          text.setAttribute('x', String(mid.x));
          text.setAttribute('y', String(mid.y));
          text.setAttribute('class', 'edge-x');
          text.textContent = '×';
          svg.appendChild(text);
        }
      });

      if (packetRoute && packetRoute.length > 1) {
        const trail = document.createElementNS(SVG_NS, 'polyline');
        trail.setAttribute('points', packetRoute.map(i => `${conf.nodes[i].x},${conf.nodes[i].y}`).join(' '));
        trail.setAttribute('class', 'route-trail');
        svg.appendChild(trail);
      }

      conf.nodes.forEach((node, index) => {
        const group = document.createElementNS(SVG_NS, 'g');
        const classes = ['topo-node'];
        if (index === conf.source) classes.push('is-source');
        if (index === conf.target) classes.push('is-target');
        if (index === conf.center) classes.push('is-center');
        if (topoState.centerDown && index === conf.center) classes.push('is-down');
        group.setAttribute('class', classes.join(' '));
        group.setAttribute('transform', `translate(${node.x} ${node.y})`);
        group.setAttribute('data-node', String(index));

        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('r', index === conf.source || index === conf.target ? '22' : '19');
        group.appendChild(circle);

        const text = document.createElementNS(SVG_NS, 'text');
        text.textContent = index === conf.source ? '源' : index === conf.target ? '宿' : node.label;
        group.appendChild(text);

        const title = document.createElementNS(SVG_NS, 'title');
        title.textContent = index === conf.center ? '中心节点：点击模拟宕机' : node.label;
        group.appendChild(title);

        svg.appendChild(group);
      });

      if (packetRoute) {
        const packet = document.createElementNS(SVG_NS, 'circle');
        packet.setAttribute('class', 'topo-packet');
        packet.setAttribute('r', '6');
        packet.setAttribute('cx', String(conf.nodes[packetRoute[0]].x));
        packet.setAttribute('cy', String(conf.nodes[packetRoute[0]].y));
        packet.setAttribute('id', 'topoPacket');
        svg.appendChild(packet);
      }

      label.textContent = `TOPOLOGY / ${conf.label}`;
      desc.textContent = conf.desc;
      robustValue.textContent = `${conf.score}%`;
      robustBar.style.width = `${conf.score}%`;
      cards.forEach(card => {
        const active = card.dataset.topo === topoState.mode;
        card.classList.toggle('is-active', active);
        card.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      if (!packetRoute && !topoState.centerDown) {
        const cutCount = topoState.cuts.size;
        result.className = 'topo-result';
        result.textContent = cutCount
          ? `已切断 ${cutCount} 条线路。点击“发送数据包”，看看是否还能送达。`
          : '点击“发送数据包”，观察路径。';
      }
      if (topoState.centerDown) {
        result.className = 'topo-result is-fail';
        result.textContent = '中心节点已宕机：星型结构中所有节点都依赖中心，网络被分区。';
      }
    }

    function animate(route, onDone) {
      const conf = config();
      const packet = $('#topoPacket');
      if (!packet) { onDone?.(); return; }
      const points = route.map(i => ({ x: conf.nodes[i].x, y: conf.nodes[i].y }));
      const segments = points.length - 1;
      if (segments < 1) {
        packet.remove();
        onDone?.();
        return;
      }
      const start = performance.now();
      const duration = 780 + segments * 330;
      const step = now => {
        const stamp = Number.isFinite(now) ? now : performance.now();
        const progress = Math.min(1, Math.max(0, (stamp - start) / duration));
        const scaled = progress * segments;
        const seg = Math.min(segments - 1, Math.floor(scaled));
        const local = scaled - seg;
        packet.setAttribute('cx', String(points[seg].x + (points[seg + 1].x - points[seg].x) * local));
        packet.setAttribute('cy', String(points[seg].y + (points[seg + 1].y - points[seg].y) * local));
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          packet.remove();
          topoState.playing = false;
          onDone?.();
        }
      };
      topoState.playing = true;
      requestAnimationFrame(step);
    }

    function selectMode(mode) {
      if (!TOPOLOGIES[mode] || topoState.playing) return;
      topoState = { mode, cuts: new Set(), centerDown: false, playing: false };
      sfx('click');
      render();
    }

    function send() {
      if (topoState.playing) return;
      const route = path();
      if (!route) {
        result.className = 'topo-result is-fail';
        result.innerHTML = '<b>数据无法送达</b>网络已被分割，源节点和目标节点之间不存在可用路径。';
        sfx('error');
        return;
      }
      result.className = 'topo-result';
      result.textContent = '数据包正在寻找路径……';
      render(route);
      const cutCount = topoState.cuts.size;
      animate(route, () => {
        result.className = 'topo-result is-ok';
        result.innerHTML = `<b>数据送达 · 经过 ${route.length - 1} 跳</b>路径：${route.map(i => config().nodes[i].label).join(' → ')}${cutCount >= 2 ? ' · 已绕开故障线路' : ''}`;
        sfx('success');
        if (topoState.mode === 'mesh' && cutCount >= 2) {
          if (award('topology', 20, '网状结构韧性验证')) {
            unlockBadge('topology');
            burstAt(svg, 65);
          }
        }
      });
    }

    function cutRandom() {
      if (topoState.playing) return;
      const conf = config();
      const options = conf.edges.map((_, i) => i).filter(i => !topoState.cuts.has(i));
      if (!options.length) {
        toast('线路已经全部切断', '点击“恢复网络”重新开始', '#ffc857');
        return;
      }
      const edge = options[Math.floor(Math.random() * options.length)];
      topoState.cuts.add(edge);
      sfx('error');
      render();
    }

    cards.forEach(card => card.addEventListener('click', () => selectMode(card.dataset.topo)));
    sendBtn?.addEventListener('click', send);
    cutBtn?.addEventListener('click', cutRandom);
    resetBtn?.addEventListener('click', () => {
      if (topoState.playing) return;
      topoState.cuts = new Set();
      topoState.centerDown = false;
      sfx('click');
      render();
    });

    svg.addEventListener('click', event => {
      if (topoState.playing) return;
      const edge = event.target.closest?.('.edge-hit');
      if (edge) {
        const index = Number(edge.dataset.edge);
        if (Number.isNaN(index)) return;
        if (topoState.cuts.has(index)) topoState.cuts.delete(index);
        else topoState.cuts.add(index);
        sfx('click');
        render();
        return;
      }
      const node = event.target.closest?.('.topo-node');
      if (node && topoState.mode === 'star' && Number(node.dataset.node) === 0) {
        topoState.centerDown = !topoState.centerDown;
        sfx('error');
        render();
      }
    });

    render();
  }

  /* ========================================================================
     04 China data cockpit
     ======================================================================== */

  const CHINA_DATA = [
    {
      year: '1987',
      tag: '从 0 到 1',
      stat: '1',
      unit: '封',
      title: '中国第一封电子邮件',
      desc: '被称为“中国互联网之父”的钱天白发出“越过长城，走向世界”，中国互联网从这里出发。',
      compare: null
    },
    {
      year: '1994',
      tag: '接入世界',
      stat: '64K',
      unit: '',
      title: '全功能接入国际互联网',
      desc: '1994 年 4 月 20 日，一条 64K 国际专线开通，中国成为国际互联网大家庭的一员。',
      compare: null
    },
    {
      year: '1995',
      tag: '走向社会',
      stat: '1995',
      unit: '年',
      title: '向社会提供互联网接入服务',
      desc: '互联网从科研机构走向社会，普通人开始有机会接触网络。',
      compare: null
    },
    {
      year: '2008',
      tag: '世界第一',
      stat: '2.53',
      unit: '亿',
      title: '网民规模世界第一',
      desc: '截至 2008 年 6 月，我国网民规模达到 2.53 亿人，位居世界第一。',
      compare: [
        { label: '2008', value: 2.53 },
        { label: '2023', value: 10.92 }
      ]
    },
    {
      year: '2013',
      tag: '市场第一',
      stat: 'NO.1',
      unit: '',
      title: '全球最大网络零售市场',
      desc: '2013 年，我国成为全球最大网络零售市场，互联网消费走进千家万户。',
      compare: null
    },
    {
      year: '2023',
      tag: '网络大国',
      stat: '10.92',
      unit: '亿',
      title: '网民规模达 10.92 亿',
      desc: '截至 2023 年底，我国网民规模达到 10.92 亿人，正在向网络强国迈进。',
      compare: [
        { label: '2008', value: 2.53 },
        { label: '2023', value: 10.92 }
      ]
    }
  ];

  const RELAY_DATA = [
    { g: '1G', status: '空白', text: '起步阶段，技术和产业基础薄弱，移动通信主要依赖国外标准。' },
    { g: '2G', status: '跟随', text: '开始跟随国际标准，移动通信产业逐步起步。' },
    { g: '3G', status: '突破', text: '在标准与技术上有突破，移动互联网应用开始生长。' },
    { g: '4G', status: '并跑', text: '与国际先进水平并跑，移动支付、短视频等应用爆发。' },
    { g: '5G', status: '领跑', text: '高速、低时延、容量大，我国成为 5G 标准和技术的引领者之一。' }
  ];

  function animateNumber(el, target, decimals = 0) {
    if (!el) return 0;
    const from = 0;
    const duration = 850;
    const start = performance.now();
    let raf = 0;
    const step = now => {
      const stamp = Number.isFinite(now) ? now : performance.now();
      const progress = Math.min(1, Math.max(0, (stamp - start) / duration));
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (from + (target - from) * eased).toFixed(decimals);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return raf;
  }

  function initChina() {
    const buttons = $$('.year-btn');
    const screen = $('#chinaScreen');
    const stat = $('#chinaStat');
    const unit = $('#chinaUnit');
    const yearEl = $('#chinaYear');
    const tag = $('#chinaTag');
    const title = $('#chinaTitle');
    const desc = $('#chinaDesc');
    const compare = $('#chinaCompare');
    if (!buttons.length || !screen) return;

    let active = 0;
    let statRaf = 0;

    function render(index, silent = false) {
      const item = CHINA_DATA[index];
      if (!item) return;
      active = index;
      buttons.forEach((btn, i) => {
        btn.classList.toggle('is-active', i === index);
        btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
      cancelAnimationFrame(statRaf);
      if (yearEl) yearEl.textContent = item.year;
      if (tag) tag.textContent = item.tag;
      if (unit) unit.textContent = item.unit;
      if (title) title.textContent = item.title;
      if (desc) desc.textContent = item.desc;
      if (stat) {
        if (item.stat === '64K' || item.stat === 'NO.1') {
          stat.textContent = item.stat;
        } else {
          const numeric = Number(item.stat);
          const decimals = String(item.stat).includes('.') ? 2 : 0;
          stat.textContent = '0';
          statRaf = animateNumber(stat, numeric, decimals);
        }
      }
      if (compare) {
        if (item.compare) {
          compare.hidden = false;
          compare.innerHTML = '';
          item.compare.forEach(row => {
            const div = document.createElement('div');
            div.className = 'compare-row';
            const label = document.createElement('span');
            label.textContent = `${row.label} 年`;
            const bar = document.createElement('i');
            bar.style.width = `${Math.min(100, (row.value / 10.92) * 100)}%`;
            const value = document.createElement('b');
            value.textContent = `${row.value} 亿`;
            div.append(label, bar, value);
            compare.appendChild(div);
          });
        } else {
          compare.hidden = true;
          compare.innerHTML = '';
        }
      }
      if (!silent) sfx('click');
    }

    buttons.forEach((btn, index) => btn.addEventListener('click', () => render(index)));
    render(0, true);
    initRelay();
  }

  function initRelay() {
    const steps = $$('.relay-step');
    const status = $('#relayStatus');
    const text = $('#relayText');
    const play = $('#relayPlay');
    if (!steps.length) return;
    let active = 0;
    let timer = 0;

    function set(index, auto = false) {
      active = Math.max(0, Math.min(RELAY_DATA.length - 1, index));
      const item = RELAY_DATA[active];
      steps.forEach((step, i) => {
        step.classList.toggle('is-lit', i <= active);
        step.classList.toggle('is-active', i === active);
        step.setAttribute('aria-pressed', i === active ? 'true' : 'false');
      });
      if (status) status.textContent = `${item.g} · ${item.status}`;
      if (text) text.textContent = item.text;
      if (!auto) sfx('click');
      if (active === RELAY_DATA.length - 1) {
        if (timer) { clearInterval(timer); timer = 0; }
        if (award('china-5g', 10, '读懂 5G 领跑')) unlockBadge('china-5g');
      }
    }

    steps.forEach((step, index) => step.addEventListener('click', () => {
      if (timer) { clearInterval(timer); timer = 0; }
      set(index);
    }));

    play?.addEventListener('click', () => {
      if (timer) { clearInterval(timer); timer = 0; }
      let i = 0;
      set(0);
      timer = window.setInterval(() => {
        i += 1;
        if (i >= RELAY_DATA.length) {
          clearInterval(timer);
          timer = 0;
          return;
        }
        set(i, i !== RELAY_DATA.length - 1);
        if (i === RELAY_DATA.length - 1) {
          clearInterval(timer);
          timer = 0;
          set(i);
        }
      }, 760);
    });

    set(0, true);
  }

  /* ========================================================================
     05 Internet+ matching + idea wall
     ======================================================================== */

  const PLUS_CATEGORIES = {
    food: { label: '吃 · 饮食', short: '吃' },
    wear: { label: '穿 · 穿搭', short: '穿' },
    home: { label: '住 · 居家', short: '住' },
    travel: { label: '行 · 出行', short: '行' },
    learn: { label: '学 · 学习', short: '学' },
    health: { label: '医 · 医疗', short: '医' }
  };

  const PLUS_TOKENS = [
    { id: 'takeout', label: '网上外卖', mark: '外卖', cat: 'food' },
    { id: 'fashion', label: '服装电商', mark: '电商', cat: 'wear' },
    { id: 'smarthome', label: '智能家居', mark: '家居', cat: 'home' },
    { id: 'ride', label: '网约车', mark: '网约', cat: 'travel' },
    { id: 'class', label: '在线课堂', mark: '课堂', cat: 'learn' },
    { id: 'telemed', label: '远程医疗', mark: '医疗', cat: 'health' }
  ];

  const IDEA_PROMPTS = [
    '食堂排队太久，怎样让人少等一会儿？',
    '校园太大，新生总是迷路，怎样帮他找到教室？',
    '爷爷奶奶不会用手机挂号，怎样让看病更简单？',
    '家里的老人独自在家，怎样远程关注他的安全？',
    '果园里的水果卖不出去，怎样让更多人知道？',
    '下雨天忘带伞，怎样让校园里的共享雨伞更好用？',
    '作业遇到难题，怎样既独立思考又能获得帮助？'
  ];

  function initPlus() {
    const tokensEl = $('#plusTokens');
    const grid = $('#categoryGrid');
    const progress = $('#plusProgress');
    const insight = $('#plusInsight');
    if (!tokensEl || !grid) return;

    const solved = new Set();
    let selectedToken = null;

    tokensEl.innerHTML = '';
    PLUS_TOKENS.forEach(token => {
      const button = document.createElement('button');
      button.className = 'app-token';
      button.type = 'button';
      button.dataset.token = token.id;
      button.draggable = true;
      button.setAttribute('aria-pressed', 'false');
      const mark = document.createElement('span');
      mark.className = 'app-mark';
      mark.textContent = token.mark;
      const label = document.createElement('span');
      label.textContent = token.label;
      button.append(mark, label);
      button.addEventListener('click', () => {
        if (solved.has(token.id)) return;
        selectedToken = selectedToken === token.id ? null : token.id;
        $$('.app-token', tokensEl).forEach(b => {
          b.classList.toggle('is-selected', b.dataset.token === selectedToken);
          b.setAttribute('aria-pressed', b.dataset.token === selectedToken ? 'true' : 'false');
        });
        sfx('click');
      });
      button.addEventListener('dragstart', event => {
        if (solved.has(token.id)) { event.preventDefault(); return; }
        event.dataTransfer.setData('text/plain', token.id);
        event.dataTransfer.effectAllowed = 'move';
      });
      tokensEl.appendChild(button);
    });

    function updateProgress() {
      if (progress) progress.textContent = `${solved.size} / ${PLUS_TOKENS.length}`;
      if (solved.size === PLUS_TOKENS.length) {
        if (insight) insight.hidden = false;
        if (award('plus-all', 10, '完成“互联网+”应用归位')) {
          unlockBadge('plus');
          burstAt(insight, 80);
        }
      }
    }

    function shakeCategory(cat) {
      const card = $(`.cat-card[data-cat="${cat}"]`);
      if (!card) return;
      card.classList.add('is-wrong');
      window.setTimeout(() => card.classList.remove('is-wrong'), 520);
    }

    function tryPlace(tokenId, catId) {
      const token = PLUS_TOKENS.find(item => item.id === tokenId);
      if (!token || solved.has(tokenId)) return;
      if (token.cat !== catId) {
        shakeCategory(catId);
        const category = PLUS_CATEGORIES[token.cat];
        toast('再想想它的主场景', `它更直接地改变了「${category.short}」这件事`, '#ffc857');
        sfx('error');
        return;
      }
      solved.add(tokenId);
      selectedToken = null;
      const tokenEl = $(`.app-token[data-token="${tokenId}"]`, tokensEl);
      if (tokenEl) tokenEl.hidden = true;
      const card = $(`.cat-card[data-cat="${catId}"]`);
      const slot = $(`.cat-slot[data-cat="${catId}"]`, card);
      if (slot) {
        slot.innerHTML = '';
        const chip = document.createElement('span');
        chip.className = 'token-chip';
        const mark = document.createElement('i');
        mark.textContent = token.mark;
        const label = document.createElement('span');
        label.textContent = token.label;
        chip.append(mark, label);
        slot.appendChild(chip);
      }
      card?.classList.add('is-correct');
      award(`plus-${tokenId}`, 5, `配对成功：${token.label}`);
      updateProgress();
      sfx('success');
    }

    grid.addEventListener('click', event => {
      const card = event.target.closest('.cat-card');
      if (!card) return;
      if (!selectedToken) {
        toast('先选一张应用卡', '点击下方应用，再点击场景', '#ffc857');
        return;
      }
      tryPlace(selectedToken, card.dataset.cat);
    });

    $$('.cat-card', grid).forEach(card => {
      card.addEventListener('dragover', event => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        card.classList.add('is-over');
      });
      card.addEventListener('dragleave', () => card.classList.remove('is-over'));
      card.addEventListener('drop', event => {
        event.preventDefault();
        card.classList.remove('is-over');
        const id = event.dataTransfer.getData('text/plain');
        if (id) tryPlace(id, card.dataset.cat);
      });
    });

    updateProgress();
    initIdeaWall();
  }

  function initIdeaWall() {
    const input = $('#ideaInput');
    const count = $('#ideaCount');
    const submit = $('#ideaSubmit');
    const cat = $('#ideaCat');
    const prompt = $('#ideaPrompt');
    const shuffle = $('#shufflePrompt');
    const wall = $('#ideaWall');
    const total = $('#ideaTotal');
    const form = $('.idea-form');
    if (!input || !submit || !wall) return;
    let promptIndex = 0;

    function updateInput() {
      const length = input.value.trim().length;
      if (count) count.textContent = String(input.value.length);
      submit.disabled = length < 5;
    }

    input.addEventListener('input', updateInput);
    updateInput();

    shuffle?.addEventListener('click', () => {
      promptIndex = (promptIndex + 1) % IDEA_PROMPTS.length;
      if (prompt) prompt.textContent = IDEA_PROMPTS[promptIndex];
      sfx('click');
    });

    submit.addEventListener('click', () => {
      const text = input.value.trim();
      if (text.length < 5) {
        toast('再多写一点', '至少 5 个字，让创意更清楚', '#ffc857');
        sfx('error');
        return;
      }
      const catId = cat?.value || 'food';
      const team = currentTeam();
      const idea = {
        id: `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`,
        text,
        cat: catId,
        catLabel: PLUS_CATEGORIES[catId]?.label || '生活',
        team: state.activeTeam,
        teamName: team.name,
        color: team.color,
        likes: 0,
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      state.ideas.unshift(idea);
      state.ideas = state.ideas.slice(0, 30);
      saveState();
      renderIdeas();
      input.value = '';
      updateInput();
      const slot = Math.min(3, state.ideas.length);
      const awardKey = ['idea-award-1', 'idea-award-2', 'idea-award-3'].find(key => !state.awards[key]);
      if (awardKey) award(awardKey, 5, '提交“互联网+”创意');
      toast('创意已上墙', `${team.name} 的点子 +5 探索值`, team.color);
      burstAt(form, 60);
      sfx('success');
    });

    function renderIdeas() {
      wall.innerHTML = '';
      if (total) total.textContent = String(state.ideas.length);
      if (!state.ideas.length) {
        const empty = document.createElement('div');
        empty.className = 'idea-empty';
        const b = document.createElement('b');
        b.textContent = '等待第一个改变生活的点子…';
        const span = document.createElement('span');
        span.textContent = '左边写下创意，它会立刻出现在这里。';
        empty.append(b, span);
        wall.appendChild(empty);
        return;
      }
      state.ideas.forEach(idea => {
        const card = document.createElement('article');
        card.className = 'idea-card';
        card.style.setProperty('--idea-color', idea.color || TEAMS[idea.team]?.color || '#57e8ff');

        const top = document.createElement('div');
        top.className = 'idea-card-top';
        const cat = document.createElement('span');
        cat.textContent = idea.catLabel || '生活';
        const time = document.createElement('small');
        time.textContent = idea.time || '';
        top.append(cat, time);

        const p = document.createElement('p');
        p.textContent = idea.text;

        const foot = document.createElement('div');
        foot.className = 'idea-card-foot';
        const author = document.createElement('span');
        author.className = 'idea-author';
        const dot = document.createElement('i');
        const name = document.createElement('span');
        name.textContent = idea.teamName || '探索小队';
        author.append(dot, name);
        const like = document.createElement('button');
        like.className = 'like-btn';
        like.type = 'button';
        like.setAttribute('aria-label', '为这个创意点赞');
        like.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-9.2A4.1 4.1 0 0 1 12 7a4.1 4.1 0 0 1 7 3.8C19 15.6 12 20 12 20z"/></svg><b>${Number(idea.likes || 0)}</b>`;
        like.addEventListener('click', () => {
          idea.likes = Number(idea.likes || 0) + 1;
          like.querySelector('b').textContent = String(idea.likes);
          like.classList.add('is-liked');
          saveState();
          sfx('click');
        });
        foot.append(author, like);
        card.append(top, p, foot);
        wall.appendChild(card);
      });
    }

    renderIdeas();
    window.renderIdeaWall = renderIdeas;
  }

  /* ========================================================================
     06 Beidou positioning mission
     ======================================================================== */

  const BEIDOU_SATS = [
    { x: 92, y: 76, label: '北斗-1' },
    { x: 560, y: 94, label: '北斗-2' },
    { x: 330, y: 370, label: '北斗-3' }
  ];
  const BEIDOU_TARGETS = [
    [210, 160], [450, 150], [180, 290], [480, 290],
    [320, 220], [260, 340], [520, 200], [130, 230], [380, 345]
  ];

  function initBeidou() {
    const map = $('#beidouMap');
    const rings = [$('#ring1'), $('#ring2'), $('#ring3')];
    const ringLayer = $('#ringLayer');
    const locateBtn = $('#locateBtn');
    const newBtn = $('#newTargetBtn');
    const feedback = $('#beidouFeedback');
    const status = $('#mapStatus');
    const marker = $('#targetMarker');
    const rippleLayer = $('#rippleLayer');
    const coords = $('#mapCoords');
    if (!map || rings.some(el => !el)) return;

    let target = [...BEIDOU_TARGETS[0]];
    let ringsOn = false;
    let done = false;

    function chooseTarget(exclude = null) {
      let next = BEIDOU_TARGETS[Math.floor(Math.random() * BEIDOU_TARGETS.length)];
      if (exclude && next[0] === exclude[0] && next[1] === exclude[1] && BEIDOU_TARGETS.length > 1) {
        next = BEIDOU_TARGETS[(BEIDOU_TARGETS.indexOf(next) + 1) % BEIDOU_TARGETS.length];
      }
      return [...next];
    }

    function distance(a, b) {
      return Math.hypot(a[0] - b[0], a[1] - b[1]);
    }

    function setFeedback(text, stateName = '') {
      if (feedback) {
        feedback.textContent = text;
        feedback.classList.toggle('is-ok', stateName === 'ok');
        feedback.classList.toggle('is-error', stateName === 'error');
      }
    }

    function drawRings() {
      ringsOn = true;
      ringLayer.setAttribute('opacity', '1');
      rings.forEach((ring, index) => {
        const sat = BEIDOU_SATS[index];
        const radius = distance([sat.x, sat.y], target);
        ring.setAttribute('cx', String(sat.x));
        ring.setAttribute('cy', String(sat.y));
        ring.setAttribute('r', String(radius));
        const circumference = 2 * Math.PI * radius;
        ring.style.transition = 'none';
        ring.style.strokeDasharray = `${circumference}`;
        ring.style.strokeDashoffset = `${circumference}`;
        ring.getBoundingClientRect();
        ring.style.transition = 'stroke-dashoffset 1.15s cubic-bezier(.2,.8,.2,1)';
        ring.style.strokeDashoffset = '0';
      });
      if (status) {
        status.textContent = '定位中';
        status.classList.add('is-live');
      }
      setFeedback('三组距离数据已回传。三个定位环的交点，就是配送目的地。');
      sfx('data');
    }

    function redrawRingsInstant() {
      if (!ringsOn) return;
      rings.forEach((ring, index) => {
        const sat = BEIDOU_SATS[index];
        const radius = distance([sat.x, sat.y], target);
        ring.setAttribute('r', String(radius));
        ring.style.strokeDasharray = 'none';
        ring.style.strokeDashoffset = '0';
      });
    }

    function showMarker() {
      if (!marker) return;
      marker.innerHTML = '';
      const pulse = document.createElementNS(SVG_NS, 'circle');
      pulse.setAttribute('cx', String(target[0]));
      pulse.setAttribute('cy', String(target[1]));
      pulse.setAttribute('r', '9');
      pulse.setAttribute('class', 'map-marker-pulse');
      const pin = document.createElementNS(SVG_NS, 'circle');
      pin.setAttribute('cx', String(target[0]));
      pin.setAttribute('cy', String(target[1]));
      pin.setAttribute('r', '5');
      pin.setAttribute('class', 'map-marker-pin');
      const label = document.createElementNS(SVG_NS, 'text');
      label.setAttribute('x', String(target[0]));
      label.setAttribute('y', String(target[1] - 14));
      label.setAttribute('class', 'map-marker-label');
      label.textContent = '送达点';
      const halo = document.createElementNS(SVG_NS, 'circle');
      halo.setAttribute('cx', String(target[0]));
      halo.setAttribute('cy', String(target[1]));
      halo.setAttribute('r', '12');
      halo.setAttribute('fill', 'rgba(183,255,114,.12)');
      halo.setAttribute('stroke', 'rgba(183,255,114,.5)');
      marker.append(halo, pulse, pin, label);
      marker.setAttribute('opacity', '1');
    }

    function resetMission(silent = false) {
      target = chooseTarget(target);
      ringsOn = false;
      done = false;
      ringLayer.setAttribute('opacity', '0');
      rings.forEach(ring => {
        ring.setAttribute('r', '0');
        ring.style.strokeDasharray = 'none';
      });
      marker.setAttribute('opacity', '0');
      marker.innerHTML = '';
      rippleLayer.innerHTML = '';
      if (status) {
        status.textContent = '等待启动';
        status.classList.remove('is-live');
      }
      setFeedback('点击“启动卫星定位”，获取三组距离数据。');
      if (!silent) sfx('click');
    }

    locateBtn?.addEventListener('click', () => {
      if (done) {
        setFeedback('本次目标已定位。点击“换一个目标”继续挑战。');
        return;
      }
      drawRings();
    });

    newBtn?.addEventListener('click', () => resetMission());

    map.addEventListener('click', event => {
      const rect = map.getBoundingClientRect();
      if (!rect.width) return;
      const point = map.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const matrix = map.getScreenCTM();
      if (!matrix) return;
      const local = point.matrixTransform(matrix.inverse());
      const x = Math.max(0, Math.min(640, local.x));
      const y = Math.max(0, Math.min(420, local.y));

      if (!ringsOn) {
        setFeedback('先点击“启动卫星定位”，让三颗卫星把距离数据传回来。', 'error');
        sfx('error');
        return;
      }

      const deviation = distance([x, y], target);
      if (deviation <= 20) {
        if (!done) {
          done = true;
          showMarker();
          if (status) status.textContent = '定位成功';
          setFeedback(`定位成功！与真实位置误差约 ${Math.max(1, Math.round(deviation * 4))} 米。`, 'ok');
          if (award('beidou-locate', 15, '用三环交汇锁定位置')) {
            unlockBadge('beidou');
            burstAt(map, 80);
          }
          sfx('success');
        }
      } else {
        const ripple = document.createElementNS(SVG_NS, 'circle');
        ripple.setAttribute('cx', String(x));
        ripple.setAttribute('cy', String(y));
        ripple.setAttribute('r', '3');
        ripple.setAttribute('class', 'map-ripple');
        rippleLayer.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 850);
        setFeedback(`偏差约 ${Math.round(deviation * 4)} 米。再看一眼三个定位环的交点。`, 'error');
        sfx('error');
      }
    });

    map.addEventListener('pointermove', event => {
      if (!coords) return;
      const point = map.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      const matrix = map.getScreenCTM();
      if (!matrix) return;
      const local = point.matrixTransform(matrix.inverse());
      coords.textContent = `X ${Math.round(local.x)} / Y ${Math.round(local.y)}`;
    });

    map.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!ringsOn) locateBtn?.click();
      }
    });

    $$('.app-flip').forEach(flip => {
      flip.addEventListener('click', () => {
        const pressed = flip.classList.toggle('is-flipped');
        flip.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        sfx('click');
      });
    });

    resetMission(true);
  }

  /* ========================================================================
     07 Quiz + exit ticket
     ======================================================================== */

  const QUIZ = [
    {
      q: '互联网的本质是什么？',
      options: [
        '一台速度特别快的超级计算机',
        '许多网络相互连接，实现信息交换和资源共享',
        '只能在城市里使用的局域网',
        '一种专门用来购物的手机软件'
      ],
      answer: 1,
      explain: '网络把若干台计算机连接起来，实现信息交换和资源共享；无数个这样的网络相互连接，就形成了互联网。'
    },
    {
      q: '中国实现全功能接入国际互联网是在哪一年？',
      options: ['1987 年', '1994 年', '2008 年', '2023 年'],
      answer: 1,
      explain: '1994 年 4 月 20 日，一条 64K 国际专线开通，中国实现全功能接入国际互联网。1987 年则是中国第一封电子邮件发出的年份。'
    },
    {
      q: '互联网发展的四个阶段，正确顺序是？',
      options: [
        '诞生 → 形成 → 互联 → 高速网络',
        '形成 → 诞生 → 高速网络 → 互联',
        '诞生 → 互联 → 形成 → 高速网络',
        '形成 → 互联 → 诞生 → 高速网络'
      ],
      answer: 0,
      explain: '从多终端共享主机，到阿帕网出现，再到 TCP/IP 标准化实现网络互联，最后进入“信息高速公路”阶段。'
    },
    {
      q: '下面哪种网络结构最健壮？',
      options: ['星型结构', '环型结构', '网状结构', '单线结构'],
      answer: 2,
      explain: '网状结构中节点之间有多条通信线路，一条线路故障时可以切换到别的线路，数据仍能送达。'
    },
    {
      q: '截至 2023 年底，我国网民规模约为？',
      options: ['2.53 亿', '6.18 亿', '10.92 亿', '14 亿'],
      answer: 2,
      explain: '截至 2023 年底，我国网民规模达到 10.92 亿人。2008 年 6 月的数据是 2.53 亿人。'
    },
    {
      q: '5G 的典型特点不包括？',
      options: ['高速', '低时延', '容量大', '完全不需要基站'],
      answer: 3,
      explain: '5G 具有高速、低时延、容量大的特点，但仍然需要基站等网络基础设施。'
    },
    {
      q: '网约车调用北斗系统，主要是为了？',
      options: [
        '给手机充电',
        '定位起点和终点，辅助车辆调配与路线规划',
        '提高屏幕亮度',
        '减少流量消耗'
      ],
      answer: 1,
      explain: '北斗帮助网约车确定行程起点和终点，辅助系统完成车辆调配、路线规划、显示行程等任务。'
    },
    {
      q: '“互联网+”写入政府工作报告是在哪一年？',
      options: ['2012 年', '2015 年', '2018 年', '2023 年'],
      answer: 1,
      explain: '2012 年“互联网+”理念开始在国内出现；2015 年写入政府工作报告，成为国家层面的重大举措。'
    }
  ];

  let quizState = {
    index: 0,
    correct: 0,
    answered: false,
    finished: false
  };

  function initQuiz() {
    const content = $('#quizContent');
    const questionEl = $('#quizQuestion');
    const optionsEl = $('#quizOptions');
    const explainEl = $('#quizExplain');
    const nextBtn = $('#quizNext');
    const indexEl = $('#quizIndex');
    const progress = $('#quizProgressBar');
    const headTitle = $('#quizHeadTitle');
    if (!content || !optionsEl) return;

    function updateSide() {
      const quizTeamName = $('#quizTeamName');
      const quizTeamDot = $('#quizTeamDot');
      const quizTeamScore = $('#quizTeamScore');
      if (quizTeamName) quizTeamName.textContent = currentTeam().name;
      if (quizTeamDot) quizTeamDot.style.background = currentTeam().color;
      if (quizTeamScore) quizTeamScore.textContent = String(Number(state.scores[state.activeTeam] || 0));
      renderBadges();
    }

    function renderQuestion() {
      if (quizState.finished) return;
      const item = QUIZ[quizState.index];
      if (!item || !questionEl || !optionsEl) return;
      if (indexEl) indexEl.textContent = String(quizState.index + 1).padStart(2, '0');
      if (progress) progress.style.width = `${((quizState.index) / QUIZ.length) * 100}%`;
      if (headTitle) headTitle.textContent = '知识闯关';
      questionEl.textContent = item.q;
      optionsEl.innerHTML = '';
      explainEl.hidden = true;
      explainEl.className = 'quiz-explain';
      explainEl.innerHTML = '';
      nextBtn.hidden = true;
      quizState.answered = false;

      item.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.type = 'button';
        const letter = document.createElement('span');
        letter.className = 'option-letter';
        letter.textContent = ['A', 'B', 'C', 'D'][index];
        const text = document.createElement('span');
        text.textContent = option;
        button.append(letter, text);
        button.addEventListener('click', () => answer(index));
        optionsEl.appendChild(button);
      });
      updateSide();
    }

    function answer(choice) {
      if (quizState.answered || quizState.finished) return;
      const item = QUIZ[quizState.index];
      if (!item) return;
      quizState.answered = true;
      const buttons = $$('.quiz-option', optionsEl);
      buttons.forEach(button => { button.disabled = true; });

      const correct = choice === item.answer;
      if (correct) {
        quizState.correct += 1;
        buttons[choice]?.classList.add('is-correct');
        buttons.forEach((button, i) => {
          if (i !== choice) button.classList.add('is-dim');
        });
        if (explainEl) {
          explainEl.hidden = false;
          explainEl.innerHTML = `<b>答对了。</b>${item.explain}`;
        }
        award(`quiz-${quizState.index}`, 10, `答对第 ${quizState.index + 1} 题`);
        sfx('success');
      } else {
        buttons[choice]?.classList.add('is-wrong');
        buttons[item.answer]?.classList.add('is-correct');
        buttons.forEach((button, i) => {
          if (i !== choice && i !== item.answer) button.classList.add('is-dim');
        });
        if (explainEl) {
          explainEl.hidden = false;
          explainEl.className = 'quiz-explain is-wrong';
          explainEl.innerHTML = `<b>正确答案：${['A', 'B', 'C', 'D'][item.answer]}。</b>${item.explain}`;
        }
        sfx('error');
      }

      if (nextBtn) {
        nextBtn.hidden = false;
        nextBtn.textContent = quizState.index === QUIZ.length - 1 ? '查看结果 →' : '下一题 →';
      }
      if (progress) progress.style.width = `${((quizState.index + 1) / QUIZ.length) * 100}%`;
    }

    function next() {
      if (!quizState.answered) return;
      if (quizState.index >= QUIZ.length - 1) {
        finish();
        return;
      }
      quizState.index += 1;
      renderQuestion();
      content.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
    }

    function finish() {
      quizState.finished = true;
      if (award('quiz-finish', 20, '完成知识闯关')) unlockBadge('quiz-finish');
      const accuracy = Math.round((quizState.correct / QUIZ.length) * 100);
      if (accuracy >= 60) unlockBadge('quiz');
      const sorted = TEAM_ORDER.map(id => ({ id, ...TEAMS[id], score: Number(state.scores[id] || 0) }))
        .sort((a, b) => b.score - a.score);
      const winner = sorted[0];

      content.innerHTML = '';
      const result = document.createElement('div');
      result.className = 'result-screen';
      const kicker = document.createElement('span');
      kicker.className = 'result-kicker';
      kicker.textContent = accuracy >= 75 ? 'MISSION COMPLETE / 探索完成' : 'MISSION LOGGED / 继续探索';
      const h3 = document.createElement('h3');
      h3.textContent = accuracy >= 75 ? '你就是今天的网络创新者。' : '知识已回收，探索才刚开始。';
      const score = document.createElement('div');
      score.className = 'result-score';
      const scoreB = document.createElement('b');
      scoreB.textContent = String(quizState.correct);
      const scoreSpan = document.createElement('span');
      scoreSpan.textContent = `/ ${QUIZ.length} 题正确 · 正确率 ${accuracy}%`;
      score.append(scoreB, scoreSpan);
      const meta = document.createElement('div');
      meta.className = 'result-meta';
      [`本队探索值 ${state.scores[state.activeTeam] || 0}`, `已解锁 ${Object.keys(state.badges).length} 枚徽章`, `本课行动：${accuracy >= 75 ? '优秀' : '继续'}`]
        .forEach(text => {
          const span = document.createElement('span');
          span.textContent = text;
          meta.appendChild(span);
        });
      const board = document.createElement('div');
      board.className = 'leaderboard';
      const boardTitle = document.createElement('h4');
      boardTitle.textContent = 'CLASS LEADERBOARD / 小队探索值';
      board.appendChild(boardTitle);
      sorted.forEach((team, index) => {
        const row = document.createElement('div');
        row.className = `leader-row${index === 0 ? ' is-first' : ''}`;
        const place = document.createElement('i');
        place.textContent = String(index + 1);
        const name = document.createElement('span');
        name.textContent = `${team.name}${team.id === state.activeTeam ? ' · 当前小队' : ''}`;
        const points = document.createElement('b');
        points.textContent = String(team.score);
        row.append(place, name, points);
        board.appendChild(row);
      });
      const actions = document.createElement('div');
      actions.className = 'result-actions';
      const restart = document.createElement('button');
      restart.id = 'quizRestart';
      restart.className = 'btn btn-quiet btn-small';
      restart.type = 'button';
      restart.textContent = '再练一轮（不重复计分）';
      restart.addEventListener('click', () => {
        quizState = { index: 0, correct: 0, answered: false, finished: false };
        content.innerHTML = '<p class="quiz-question" id="quizQuestion">正在加载题目…</p><div class="quiz-options" id="quizOptions"></div><div class="quiz-explain" id="quizExplain" aria-live="polite" hidden></div><div class="quiz-actions"><button class="btn btn-primary btn-small" id="quizNext" type="button" hidden>下一题 →</button></div>';
        initQuiz();
        toast('练习模式', '已重新开始，探索值不会重复累计', currentTeam().color);
      });
      const home = document.createElement('a');
      home.className = 'btn btn-primary btn-small';
      home.href = '#home';
      home.textContent = '回到首页';
      actions.append(restart, home);
      result.append(kicker, h3, score, meta, board, actions);
      content.appendChild(result);
      if (headTitle) headTitle.textContent = '挑战结果';
      if (nextBtn) nextBtn.hidden = true;
      burstAt(content, reduceMotion ? 0 : 120);
      sfx('badge');
    }

    nextBtn?.addEventListener('click', next);
    renderQuestion();
    updateSide();
  }

  function initExitTicket() {
    const form = $('#exitForm');
    const saved = $('#exitSaved');
    if (!form) return;
    const learn = $('#exitLearn');
    const wonder = $('#exitWonder');
    const idea = $('#exitIdea');
    if (state.exit) {
      if (learn) learn.value = state.exit.learn || '';
      if (wonder) wonder.value = state.exit.wonder || '';
      if (idea) idea.value = state.exit.idea || '';
      if (saved && (state.exit.learn || state.exit.wonder || state.exit.idea)) saved.hidden = false;
    }
    form.addEventListener('submit', event => {
      event.preventDefault();
      const payload = {
        learn: learn?.value.trim() || '',
        wonder: wonder?.value.trim() || '',
        idea: idea?.value.trim() || '',
        time: new Date().toLocaleString('zh-CN')
      };
      if (!payload.learn && !payload.wonder && !payload.idea) {
        toast('还没有写下内容', '至少留下一句话，让这堂课有回声', '#ffc857');
        sfx('error');
        return;
      }
      state.exit = payload;
      saveState();
      if (saved) saved.hidden = false;
      if (award('exit-ticket', 5, '留下课堂回声')) unlockBadge('exit-ticket');
      toast('课堂回声已收录', '保存在本机浏览器，刷新后仍会保留', currentTeam().color);
      sfx('success');
    });
  }

  /* ========================================================================
     Teacher controls
     ======================================================================== */

  let confirmAction = null;

  function askConfirm(message, action) {
    const dialog = $('#confirmDialog');
    const messageEl = $('#confirmMessage');
    if (!dialog) return;
    confirmAction = action;
    if (messageEl) messageEl.textContent = message;
    dialog.showModal();
  }

  function initTeacherTools() {
    const fullscreenBtn = $('#fullscreenBtn');
    const soundTogglePanel = $('#soundTogglePanel');
    if (soundTogglePanel) soundTogglePanel.textContent = `音效：${state.sound ? '开' : '关'}`;
    fullscreenBtn?.addEventListener('click', toggleFullscreen);
    soundTogglePanel?.addEventListener('click', () => setSound(!state.sound));

    document.addEventListener('fullscreenchange', () => {
      if (fullscreenBtn) fullscreenBtn.textContent = document.fullscreenElement ? '退出全屏' : '进入全屏';
    });

    const adjust = $('#scoreAdjust');
    adjust?.addEventListener('click', event => {
      const button = event.target.closest('button[data-delta]');
      const row = event.target.closest('[data-team]');
      if (!button || !row) return;
      const team = row.dataset.team;
      const delta = Number(button.dataset.delta);
      state.scores[team] = Math.max(0, Number(state.scores[team] || 0) + delta);
      saveState();
      renderScores();
      sfx('click');
    });

    $('#clearIdeasBtn')?.addEventListener('click', () => {
      askConfirm('清空创意墙后，本机保存的学生创意将全部删除，探索值不受影响。确定继续吗？', () => {
        state.ideas = [];
        saveState();
        window.renderIdeaWall?.();
        toast('创意墙已清空', '可以重新开始收集点子', '#ffc857');
      });
    });

    $('#resetAllBtn')?.addEventListener('click', () => {
      askConfirm('重置三课数据会清空所有小队探索值、徽章、创意和课堂回声。此操作不可撤销，确定继续吗？', () => {
        try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
        window.location.reload();
      });
    });

    $('#confirmYes')?.addEventListener('click', () => {
      const action = confirmAction;
      confirmAction = null;
      $('#confirmDialog')?.close();
      if (typeof action === 'function') action();
    });
    $('#confirmNo')?.addEventListener('click', () => {
      confirmAction = null;
      $('#confirmDialog')?.close();
    });

    renderBadges();
  }

  /* ========================================================================
     Sequential mission locks
     ======================================================================== */

  function stationComplete(id) {
    const requirement = STATION_REQUIREMENTS[id];
    if (!requirement) return false;
    return requirement.keys.every(key => Boolean(state.awards[key]));
  }

  function stationIsUnlocked(index) {
    const station = STATION_ORDER[index];
    if (!station) return false;
    if (station.index === '01') return true;
    const previous = STATION_ORDER[index - 1];
    return Boolean(previous && previous.lesson === station.lesson && stationComplete(previous.id));
  }

  function refreshStationLocks(options = {}) {
    const announce = Boolean(options.announce) && locksInitialized;
    const unlocked = new Set();
    STATION_ORDER.forEach((station, index) => {
      if (stationIsUnlocked(index)) unlocked.add(station.id);
    });

    STATION_ORDER.forEach((station, index) => {
      const section = document.getElementById(station.id);
      if (!section) return;
      const requirement = STATION_REQUIREMENTS[station.id];
      const complete = stationComplete(station.id);
      const locked = !unlocked.has(station.id);
      const previous = station.index === '01' ? null : STATION_ORDER[index - 1];
      section.classList.toggle('is-locked', locked);
      section.setAttribute('aria-disabled', locked ? 'true' : 'false');

      const gate = $('.mission-gate', section);
      if (gate && requirement) {
        const done = requirement.keys.filter(key => Boolean(state.awards[key])).length;
        const stateEl = $('.gate-state', gate);
        const meter = $('.gate-meter i', gate);
        gate.classList.toggle('is-complete', complete);
        if (stateEl) {
          if (!complete) {
            stateEl.textContent = `${done}/${requirement.keys.length} · ${done === 0 ? '未开始' : '进行中'}`;
          } else if (station.id === 'challenge') {
            stateEl.textContent = '第一课已完成 · 7 / 7';
          } else if (station.id === 'l2-life') {
            stateEl.textContent = '第二课已完成 · 6 / 6';
          } else if (station.id === 'l3-choice') {
            stateEl.textContent = '八年级第9课已完成 · 6 / 6';
          } else {
            stateEl.textContent = '已完成 · 下一站已解锁';
          }
        }
        if (meter) meter.style.width = `${Math.round((done / requirement.keys.length) * 100)}%`;
        $$('.gate-step', gate).forEach((stepEl, stepIndex) => {
          const step = requirement.steps?.[stepIndex];
          const stepDone = Boolean(step?.keys?.every(key => Boolean(state.awards[key])));
          stepEl.classList.toggle('is-done', stepDone);
        });
      }

      const lock = $('.station-lock', section);
      if (lock) {
        const title = $('.lock-title', lock);
        const requirementEl = $('.lock-requirement', lock);
        const back = $('[data-lock-back]', lock);
        if (title) {
          title.textContent = previous
            ? `先完成「${previous.index} ${previous.name}」`
            : '本课第一站，可直接开始';
        }
        if (requirementEl) {
          requirementEl.textContent = previous
            ? `通关条件：${STATION_REQUIREMENTS[previous.id].label}`
            : '按页面提示完成本课任务。';
        }
        if (back) {
          back.dataset.target = previous?.id || 'origin';
          back.textContent = previous ? `返回 ${previous.index} ${previous.name}` : '返回上一站';
        }
      }
    });

    $$('.station-link, .mobile-stations a').forEach(link => {
      const id = link.dataset.station;
      if (!id || !STATION_REQUIREMENTS[id]) return;
      const locked = !unlocked.has(id);
      const index = STATION_ORDER.findIndex(station => station.id === id);
      const station = STATION_ORDER[index];
      const previous = station?.index === '01' ? null : STATION_ORDER[index - 1];
      link.classList.toggle('is-locked', locked);
      link.dataset.locked = locked ? 'true' : 'false';
      link.setAttribute('aria-disabled', locked ? 'true' : 'false');
      if (locked) {
        link.setAttribute('tabindex', '-1');
        link.title = previous ? `完成「${previous.index} ${previous.name}」后解锁` : '完成上一站后解锁';
      } else {
        link.removeAttribute('tabindex');
        link.removeAttribute('title');
      }
    });

    const newlyUnlocked = STATION_ORDER.filter(station => unlocked.has(station.id) && !lastUnlocked.has(station.id));
    lastUnlocked = unlocked;
    syncCourseVisibility();
    if (announce && newlyUnlocked.length) {
      const next = newlyUnlocked[0];
      const isFinal = next.id === 'l2-life' || next.id === 'l3-choice';
      toast(
        isFinal ? (next.id === 'l3-choice' ? '八年级第9课通关' : '第二课通关') : '下一站已解锁',
        `${next.index} ${next.name} · 继续探索`,
        next.id === 'l3-choice' ? '#ffc857' : '#b7ff72'
      );
      sfx('badge');
    }
    locksInitialized = true;
  }

  function initStationLocks() {
    STATION_ORDER.forEach(station => {
      const section = document.getElementById(station.id);
      if (!section) return;
      const requirement = STATION_REQUIREMENTS[station.id];
      if (!requirement) return;

      if (!$('.mission-gate', section)) {
        const gate = document.createElement('div');
        gate.className = 'mission-gate';
        const steps = (requirement.steps || []).map((step, stepIndex) => `<li class="gate-step"><i>${stepIndex + 1}</i><span>${step.text}</span></li>`).join('');
        gate.innerHTML = `<div class="gate-copy"><span class="gate-kicker">任务要求 / 完成步骤</span><b>${requirement.label}</b><ol class="gate-steps">${steps}</ol></div><div class="gate-status"><em class="gate-state">未开始</em><span class="gate-meter"><i></i></span></div>`;
        const head = $('.section-head', section);
        if (head?.nextSibling) head.parentNode.insertBefore(gate, head.nextSibling);
        else (head?.parentNode || section).appendChild(gate);
      }

      if (!$('.station-lock', section)) {
        const lock = document.createElement('div');
        lock.className = 'station-lock';
        lock.innerHTML = `<div class="lock-icon" aria-hidden="true"><svg viewBox="0 0 64 64"><rect x="14" y="28" width="36" height="28" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M22 28v-7a10 10 0 0 1 20 0v7" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="32" cy="42" r="4" fill="currentColor"/><path d="M32 46v5" stroke="currentColor" stroke-width="2"/></svg></div><div class="lock-copy"><span class="lock-kicker">ACCESS LOCKED / 站点封锁</span><h3 class="lock-title">完成上一站后解锁</h3><p class="lock-requirement"></p></div><button class="btn btn-quiet btn-small" type="button" data-lock-back>返回上一站</button>`;
        section.appendChild(lock);
      }
    });

    document.addEventListener('click', event => {
      const back = event.target.closest('[data-lock-back]');
      if (!back) return;
      const target = document.getElementById(back.dataset.target || 'origin');
      target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      sfx('click');
    });

    $$('.station-link, .mobile-stations a').forEach(link => {
      link.addEventListener('click', event => {
        if (link.dataset.locked !== 'true') return;
        event.preventDefault();
        event.stopPropagation();
        const station = STATION_ORDER.find(item => item.id === link.dataset.station);
        const index = station ? STATION_ORDER.indexOf(station) : -1;
        const previous = index > 0 ? STATION_ORDER[index - 1] : null;
        toast(
          '站点尚未解锁',
          previous ? `先完成「${previous.index} ${previous.name}」` : '完成上一站任务后解锁',
          '#ffc857'
        );
        sfx('error');
      }, true);
    });

    refreshStationLocks();
  }

  /* ========================================================================
     Two-lesson course switcher
     ======================================================================== */

  let activeCourse = 1;

  function syncCourseVisibility() {
    document.body.dataset.course = String(activeCourse);

    $$('[data-course-nav]').forEach(nav => {
      nav.hidden = Number(nav.dataset.courseNav) !== activeCourse;
    });
    $$('[data-course-btn]').forEach(btn => {
      const active = Number(btn.dataset.courseBtn) === activeCourse;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    const activeReveal = activeCourse === 1
      ? '#home [data-reveal], .course1-section [data-reveal]'
      : activeCourse === 2
        ? '#lesson2 [data-reveal], .lesson2-section [data-reveal]'
        : '#lesson3 [data-reveal], .lesson3-section [data-reveal]';
    $$(activeReveal).forEach(el => el.classList.add('is-visible'));

    const brand = $('.brand');
    if (brand) {
      brand.setAttribute('href', activeCourse === 2 ? '#lesson2' : (activeCourse === 3 ? '#lesson3' : '#home'));
    }

    const status = $('#bridgeStatus');
    const meter = $('#bridgeMeter');
    const lessonTwo = STATION_ORDER.filter(station => station.lesson === 2);
    const doneTwo = lessonTwo.filter(station => stationComplete(station.id)).length;
    if (status) {
      status.textContent = doneTwo === 0
        ? '6 个任务 · 可独立完成'
        : `已完成 ${doneTwo} / ${lessonTwo.length} 站`;
    }
    if (meter) meter.style.width = `${Math.round((doneTwo / lessonTwo.length) * 100)}%`;

    const statusThree = $('#l3BridgeStatus');
    const meterThree = $('#l3BridgeMeter');
    const lessonThree = STATION_ORDER.filter(station => station.lesson === 3);
    const doneThree = lessonThree.filter(station => stationComplete(station.id)).length;
    if (statusThree) {
      statusThree.textContent = doneThree === 0
        ? '6 个任务 · 可独立完成'
        : `已完成 ${doneThree} / ${lessonThree.length} 站`;
    }
    if (meterThree) meterThree.style.width = `${Math.round((doneThree / lessonThree.length) * 100)}%`;
  }

  function setCourse(course, opts = {}) {
    const next = Number(course);
    activeCourse = next === 3 ? 3 : (next === 2 ? 2 : 1);
    syncCourseVisibility();
    if (!opts.silent && !opts.noScroll) {
      sfx('click');
      const target = activeCourse === 3
        ? (opts.bridge ? '#lesson3' : '#l3-data')
        : activeCourse === 2
          ? (opts.bridge ? '#lesson2' : '#l2-content')
          : (opts.bridge ? '#home' : '#origin');
      window.setTimeout(() => {
        document.querySelector(target)?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }, 40);
    }
    return true;
  }

  function initCourseUI() {
    $$('[data-course-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const course = Number(btn.dataset.courseBtn);
        setCourse(course, { bridge: true });
      });
    });

    $('.brand')?.addEventListener('click', event => {
      event.preventDefault();
      setCourse(activeCourse, { bridge: true });
    });

    $('#enterLesson2')?.addEventListener('click', () => {
      setCourse(2, { silent: true, noScroll: true });
      document.getElementById('l2-content')?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      sfx('success');
    });

    $('#enterLesson3')?.addEventListener('click', () => {
      setCourse(3, { silent: true, noScroll: true });
      document.getElementById('l3-data')?.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      sfx('success');
    });

    $$('[data-course-back]').forEach(btn => {
      btn.addEventListener('click', () => setCourse(Number(btn.dataset.courseBack) || 1, { bridge: true }));
    });

    $$('[data-course-forward]').forEach(btn => {
      btn.addEventListener('click', () => setCourse(Number(btn.dataset.courseForward) || 3, { bridge: true }));
    });

    $$('#teacherJumps a').forEach(link => {
      link.addEventListener('click', () => {
        const id = (link.getAttribute('href') || '').slice(1);
        const station = STATION_ORDER.find(item => item.id === id);
        if (station) setCourse(station.lesson, { silent: true, noScroll: true });
      });
    });

    syncCourseVisibility();
    setCourse(1, { silent: true, noScroll: true });
  }

  /* ========================================================================
     Reveal + boot
     ======================================================================== */

  function initReveal() {
    const items = $$('[data-reveal]');
    if (!items.length) return;
    if (reduceMotion) {
      items.forEach(item => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index, 4) * 45}ms`;
      observer.observe(item);
    });
  }

  window.ClassroomAPI = {
    $, $$, TEAMS, state, award, unlockBadge, toast, sfx, saveState,
    stationComplete, refreshStationLocks, setCourse, syncCourseVisibility,
    currentTeam: () => currentTeam(), reduceMotion
  };

  function init() {
    initLaunch();
    initTopbar();
    initHeroCanvas();
    initOrigin();
    initTimeline();
    initTopology();
    initChina();
    initPlus();
    initBeidou();
    initQuiz();
    initExitTicket();
    initStationLocks();
    initCourseUI();
    initReveal();
    renderScores();
    renderBadges();
    applyTeam(state.activeTeam, { silent: true });
    window.addEventListener('resize', resizeFx);
    resizeFx();
  }

  init();
})();
