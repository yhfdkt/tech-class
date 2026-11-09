/* ==========================================================================
   Lesson 2 interactions · 互联网应用新特征
   Depends on window.ClassroomAPI exposed by app.js
   ========================================================================== */

(() => {
  'use strict';

  const API = window.ClassroomAPI;
  if (!API) return;
  const { $, $$, award, unlockBadge, toast, sfx, saveState, state } = API;

  const mediaEras = [
    { year: '1987', name: '字符邮件', layers: ['text'], range: '纯文本' },
    { year: '1998', name: '图文网页', layers: ['text', 'image'], range: '文本 + 图片' },
    { year: '2012', name: '富媒体门户', layers: ['text', 'image', 'audio', 'video'], range: '图文声像' },
    { year: '2024', name: '短视频 / 直播', layers: ['text', 'image', 'audio', 'video'], range: '实时互动' }
  ];

  const mediaInsights = [
    '只有文字，阅读单一。',
    '图文同屏，像电子报纸。',
    '声音、视频进入网页。',
    '图文声像并茂，还能实时互动。'
  ];

  const appServices = [
    { id: 'map', icon: '⌖', name: '地图导航', en: 'MAP' },
    { id: 'ride', icon: '◈', name: '网约车', en: 'RIDE' },
    { id: 'food', icon: '▤', name: '网上外卖', en: 'FOOD' },
    { id: 'pay', icon: '¥', name: '网络支付', en: 'PAY' },
    { id: 'hotel', icon: '▥', name: '酒店预订', en: 'HOTEL' },
    { id: 'ticket', icon: '▶', name: '电影票', en: 'TICKET' }
  ];

  const atlasApps = [
    { id: 'im', name: '即时通信', cat: 'basic' },
    { id: 'search', name: '搜索引擎', cat: 'basic' },
    { id: 'news', name: '网络新闻', cat: 'basic' },
    { id: 'social', name: '社交应用', cat: 'basic' },
    { id: 'food', name: '网上外卖', cat: 'commerce' },
    { id: 'shop', name: '网络购物', cat: 'commerce' },
    { id: 'pay', name: '网络支付', cat: 'commerce' },
    { id: 'ride', name: '网约车', cat: 'public' },
    { id: 'edu', name: '在线教育', cat: 'public' },
    { id: 'med', name: '在线医疗', cat: 'public' },
    { id: 'music', name: '网络音乐', cat: 'fun' },
    { id: 'video', name: '网络视频', cat: 'fun' }
  ];

  const atlasCats = {
    basic: { name: '基础应用', en: 'FOUNDATION', desc: '沟通、搜索、新闻、社交' },
    commerce: { name: '商务交易', en: 'COMMERCE', desc: '外卖、购物、支付' },
    public: { name: '公共服务', en: 'PUBLIC', desc: '出行、教育、医疗' },
    fun: { name: '网络娱乐', en: 'ENTERTAINMENT', desc: '音乐、视频、游戏' }
  };

  const dataApps = [
    { id: 'im', name: '即时通信', cat: '基础应用', pct: 98.0, users: '10.78', growth: '+1824 万', growthPct: '+1.7%' },
    { id: 'pay', name: '网络支付', cat: '商务交易', pct: 88.1, users: '9.69', growth: '+1498 万', growthPct: '+1.6%' },
    { id: 'music', name: '网络音乐', cat: '网络娱乐', pct: 66.3, users: '7.29', growth: '+1450 万', growthPct: '+2.0%' },
    { id: 'food', name: '网上外卖', cat: '商务交易', pct: 50.3, users: '5.53', growth: '+850 万', growthPct: '+1.6%' }
  ];

  const dataQuestions = [
    {
      q: '四类应用中，使用率最高的是哪一个？',
      options: ['即时通信', '网络支付', '网络音乐', '网上外卖'],
      answer: 0,
      explain: '即时通信 98.0%，用户 10.78 亿。'
    },
    {
      q: '用户规模约 9.69 亿、使用率 88.1% 的是哪一个？',
      options: ['网络支付', '网络音乐', '网上外卖', '即时通信'],
      answer: 0,
      explain: '网络支付 9.69 亿，使用率 88.1%。'
    },
    {
      q: '网上外卖的使用率约为多少？',
      options: ['50.3%', '66.3%', '88.1%', '98.0%'],
      answer: 0,
      explain: '网上外卖 5.53 亿，使用率 50.3%。'
    }
  ];

  const lifeScenarios = [
    {
      time: '07:30',
      title: '通勤路上',
      desc: '从家到学校，你会怎么安排这段路？',
      options: [
        { label: '扫码乘地铁，听 10 分钟播客', conv: 2, ctrl: 1, good: true, feedback: '省时，也保留了听觉边界。' },
        { label: '让家长开车送，途中刷短视频', conv: 1, ctrl: -1, feedback: '方便，但注意力容易被带走。' },
        { label: '边走边看直播，差点坐过站', conv: 2, ctrl: -2, feedback: '内容精彩，安全优先。' }
      ]
    },
    {
      time: '09:00',
      title: '课堂学习',
      desc: '老师布置了一个小组任务，你会？',
      options: [
        { label: '用在线文档协作，实时补充资料', conv: 2, ctrl: 1, good: true, feedback: '协作更高效。' },
        { label: '拍照存下板书，课后自己整理', conv: 1, ctrl: 0, feedback: '工具留存信息，理解靠自己。' },
        { label: '偷偷刷短视频，等下课再补', conv: 0, ctrl: -2, feedback: '课堂时间不会重来。' }
      ]
    },
    {
      time: '12:00',
      title: '午餐时间',
      desc: '午饭怎么解决？',
      options: [
        { label: '提前点好外卖，按时到取餐柜', conv: 2, ctrl: 1, good: true, feedback: '省下排队时间。' },
        { label: '去食堂，和同学面对面聊天', conv: 0, ctrl: 2, feedback: '面对面交流也很重要。' },
        { label: '边吃边追剧，一集接一集', conv: 1, ctrl: -2, feedback: '放松要有停止线。' }
      ]
    },
    {
      time: '18:00',
      title: '放学娱乐',
      desc: '完成作业后，你准备怎么放松？',
      options: [
        { label: '运动 30 分钟，再听一会儿音乐', conv: 0, ctrl: 2, good: true, feedback: '运动也是一种娱乐。' },
        { label: '看 30 分钟短视频，定时结束', conv: 1, ctrl: 1, feedback: '给娱乐设个闹钟。' },
        { label: '刷短视频 2 小时，停不下来', conv: 2, ctrl: -2, feedback: '别让算法替你管时间。' }
      ]
    },
    {
      time: '22:30',
      title: '睡前时刻',
      desc: '手机放在哪里？',
      options: [
        { label: '手机放到书桌，睡前读几页书', conv: 0, ctrl: 2, good: true, feedback: '屏幕不进卧室。' },
        { label: '听 20 分钟音乐，定时关闭', conv: 1, ctrl: 1, feedback: '有边界，才不偷走睡眠。' },
        { label: '刷手机到凌晨，困了才睡', conv: 2, ctrl: -2, feedback: '别透支明天的精力。' }
      ]
    }
  ];

  const lifePrinciples = ['先学习，后娱乐', '睡前 30 分钟放下手机', '不向陌生人透露个人信息', '遇到网络困扰，及时告诉家长或老师'];

  /* ---------- shared helpers ---------- */

  function setHtml(id, html) {
    const node = document.getElementById(id);
    if (node) node.innerHTML = html;
    return node;
  }

  function setFeedback(node, text, kind = '') {
    if (!node) return;
    node.textContent = text;
    node.className = `l2-feedback${kind ? ` is-${kind}` : ''}`;
  }

  function setStatus(node, text, ok = false) {
    if (!node) return;
    node.textContent = text;
    node.classList.toggle('is-ok', ok);
  }

  function buzz() {
    try { sfx('click'); } catch (err) { /* sound is optional */ }
  }

  function success(key, points, label) {
    const granted = award(key, points, label);
    if (granted) unlockBadge(key);
    return granted;
  }

  /* ========================================================================
     01 · Content time machine
     ======================================================================== */

  function renderMedia() {
    const mount = document.getElementById('l2ContentMount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="media-lab">
        <div class="media-console l2-panel">
          <div class="media-head">
            <div><span class="l2-mono">CONTENT TIME MACHINE</span><h3>内容形态时光机</h3></div>
            <b id="mediaEraName">1987 · 字符邮件</b>
          </div>
          <div class="media-screen" id="mediaScreen">
            <article class="media-era era-terminal is-active" data-era="0">
              <div class="era-bar"><i></i><i></i><i></i><span>mail://1987 · TEXT ONLY</span></div>
              <div class="era-terminal-body">
                <p class="era-prompt">$ mail -s "Across the Great Wall"</p>
                <pre>Across the Great Wall
we can reach every corner
in the world.

-- 1987.09.20
first electronic mail from China</pre>
                <span class="era-cursor"></span>
                <p class="era-annotation">屏幕上只有字符。没有图片，没有声音。</p>
              </div>
            </article>

            <article class="media-era era-web" data-era="1">
              <div class="era-bar"><i></i><i></i><i></i><span>www / 1998 · TEXT + IMAGE</span></div>
              <div class="era-web-body">
                <div class="era-web-nav"><b>The Daily Web</b><span>首页 · 新闻 · 生活 · 帮助</span></div>
                <div class="era-web-hero">
                  <div>
                    <h4>世界，进入书房</h4>
                    <div class="era-copyline w90"></div>
                    <div class="era-copyline w80"></div>
                    <div class="era-copyline w60"></div>
                    <div class="era-copyline w80"></div>
                    <div class="era-copyline w90"></div>
                  </div>
                  <div>
                    <div class="era-image"></div>
                    <div class="era-web-caption">网页第一次“看得见”。</div>
                  </div>
                </div>
                <div class="era-web-links"><span>文字为主</span><span>图片点缀</span><span>点击跳转</span></div>
              </div>
            </article>

            <article class="media-era era-portal" data-era="2">
              <div class="era-bar"><i></i><i></i><i></i><span>portal / 2012 · RICH MEDIA</span></div>
              <div class="era-portal-body">
                <div class="era-portal-top"><b>MEDIA PORTAL</b><span>NEWS · MUSIC · VIDEO</span></div>
                <div class="era-portal-grid">
                  <div class="era-portal-hero"><i>▶</i></div>
                  <div class="era-portal-copy">
                    <h4>新闻，可以看也可以听</h4>
                    <p>图片、音频、视频同屏。</p>
                    <div class="era-audio"><b>♪ AUDIO / 00:42</b><div class="era-wave"></div></div>
                  </div>
                </div>
                <div class="era-portal-bottom"><span></span><span></span><span></span></div>
              </div>
            </article>

            <article class="media-era era-feed" data-era="3">
              <div class="era-bar"><i></i><i></i><i></i><span>feed / 2024 · RICH MEDIA + LIVE</span></div>
              <div class="era-feed-body">
                <div class="era-feed-wrap">
                  <div class="era-video">
                    <span class="play">▶</span>
                    <span class="caption">15 秒视频：画面、配乐、字幕、实时评论。</span>
                  </div>
                  <div class="era-feed-side">
                    <h4>内容，不只是“看”</h4>
                    <p>点赞、评论、直播，让用户参与内容。</p>
                    <div class="era-feed-tags"><span># 图文</span><span># 声音</span><span># 视频</span><span># 互动</span></div>
                    <div class="era-chat"><span><b>@同学A</b> 这个实验我也做过！</span><span><b>@同学B</b> 主播能再演示一次吗？</span></div>
                    <div class="era-feed-wave"></div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div class="media-controls">
            <input class="media-time" id="mediaTime" type="range" min="0" max="3" step="1" value="0" aria-label="拖动查看不同年代的内容形态">
            <div class="media-ticks" id="mediaTicks">
              ${mediaEras.map((era, index) => `<button class="media-tick${index === 0 ? ' is-active' : ''}" data-era-jump="${index}" type="button"><b>${era.year}</b>${era.name}</button>`).join('')}
            </div>
          </div>
          <div class="media-layers" id="mediaLayers">
            <span class="media-layer is-on" data-layer="text"><i></i>文本</span>
            <span class="media-layer" data-layer="image"><i></i>图像</span>
            <span class="media-layer" data-layer="audio"><i></i>声音</span>
            <span class="media-layer" data-layer="video"><i></i>视频</span>
          </div>
        </div>

        <aside class="media-side">
          <div class="media-progress-card l2-panel">
            <div class="l2-panel-head">
              <div><span class="l2-mono">TIME TRAVEL / 穿越进度</span><h3>已访问 <b id="mediaVisited">0</b> / 4 个时代</h3></div>
            </div>
            <div class="media-progress"><i id="mediaProgress"></i></div>
            <p class="l2-hint" style="margin-top:10px;">看完 4 个时代，特征题出现。</p>
          </div>
          <div class="media-insight" id="mediaInsight">正在加载第一个时代…</div>
          <div class="media-quiz l2-panel" id="mediaQuiz" hidden>
            <span class="l2-mono">CHECK / 特征判断</span>
            <h4>当前内容形式，选哪一项？</h4>
            <div id="mediaOptions">
              <button class="l2-option" data-media-answer="text" type="button">以纯文本为主，图片很少</button>
              <button class="l2-option" data-media-answer="image" type="button">只有图片，没有声音和视频</button>
              <button class="l2-option" data-media-answer="rich" type="button">图文声像并茂，还能实时互动</button>
              <button class="l2-option" data-media-answer="command" type="button">只能通过字符命令查看</button>
            </div>
            <div class="l2-feedback" id="mediaFeedback" hidden></div>
          </div>
        </aside>
      </div>
    `;

    const visited = new Set();
    let current = 0;

    const time = $('#mediaTime');
    const ticks = $$('#mediaTicks [data-era-jump]');
    const eras = $$('#mediaScreen .media-era');
    const layers = $$('#mediaLayers .media-layer');
    const progress = $('#mediaProgress');
    const visitedNode = $('#mediaVisited');
    const insight = $('#mediaInsight');
    const quiz = $('#mediaQuiz');
    const feedback = $('#mediaFeedback');

    const update = () => {
      eras.forEach((era, index) => era.classList.toggle('is-active', index === current));
      ticks.forEach((tick, index) => {
        tick.classList.toggle('is-active', index === current);
        tick.classList.toggle('is-visited', visited.has(index));
      });
      layers.forEach(layer => layer.classList.toggle('is-on', mediaEras[current].layers.includes(layer.dataset.layer)));
      if (time) time.value = String(current);
      $('#mediaEraName').textContent = `${mediaEras[current].year} · ${mediaEras[current].name}`;
      visitedNode.textContent = String(visited.size);
      progress.style.width = `${(visited.size / mediaEras.length) * 100}%`;
      insight.innerHTML = `<b>${mediaEras[current].year} · ${mediaEras[current].name}</b><br>${mediaInsights[current]}`;
      if (visited.size === mediaEras.length && quiz) quiz.hidden = false;
    };

    const go = (index, opts = {}) => {
      current = Math.max(0, Math.min(mediaEras.length - 1, Number(index)));
      visited.add(current);
      if (!opts.silent) buzz();
      update();
    };

    time?.addEventListener('input', () => go(time.value));
    ticks.forEach(tick => tick.addEventListener('click', () => go(tick.dataset.eraJump)));
    $$('#mediaOptions [data-media-answer]').forEach(option => {
      option.addEventListener('click', () => {
        if (option.dataset.mediaAnswer === 'rich') {
          $$('#mediaOptions [data-media-answer]').forEach(btn => {
            btn.disabled = true;
            btn.classList.toggle('is-correct', btn === option);
          });
          feedback.hidden = false;
          setFeedback(feedback, '正确：图文声像并茂，能实时互动。', 'good');
          success('l2-media', 10, '穿越内容形态四阶段');
          sfx('success');
        } else {
          option.classList.add('is-wrong');
          feedback.hidden = false;
          setFeedback(feedback, '再想想：声音、视频、互动在哪里？', 'warn');
          window.setTimeout(() => option.classList.remove('is-wrong'), 650);
          sfx('error');
        }
      });
    });

    if (state.awards['l2-media']) {
      visited.add(0); visited.add(1); visited.add(2); visited.add(3);
      current = 3;
    } else {
      visited.add(0);
    }
    update();
  }

  /* ========================================================================
     02 · Character vs graphical interface
     ======================================================================== */

  function renderInterface() {
    const mount = document.getElementById('l2UiMount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="interface-lab">
        <div class="if-panel l2-panel">
          <div class="if-head">
            <div><span class="l2-mono">CHARACTER INTERFACE / 字符界面</span><h3>用命令完成任务</h3></div>
            <span class="l2-status" id="terminalStatus">等待输入</span>
          </div>
          <div class="terminal-screen" id="terminalScreen" aria-live="polite">
            <div class="terminal-line is-dim">NetOS 1.0 · 1989 · CHARACTER MODE</div>
            <div class="terminal-line">输入 <b>weather beijing</b> 查天气。</div>
          </div>
          <form class="terminal-form" id="terminalForm">
            <span>&gt;</span>
            <input id="terminalInput" type="text" autocomplete="off" spellcheck="false" placeholder="输入 weather beijing" aria-label="字符命令输入框">
            <button type="submit">执行</button>
          </form>
          <div class="terminal-chips">
            <button type="button" data-cmd="help">help</button>
            <button type="button" data-cmd="weather beijing">weather beijing</button>
            <button type="button" data-cmd="music">music</button>
            <button type="button" data-cmd="clear">clear</button>
          </div>
        </div>

        <div class="if-panel l2-panel">
          <div class="if-head">
            <div><span class="l2-mono">GRAPHICAL INTERFACE / 图形界面</span><h3>看图标，点一下</h3></div>
            <span class="l2-status" id="guiStatus">0 次操作</span>
          </div>
          <div class="gui-stage">
            <div class="gui-phone">
              <div class="gui-phone-top"><span>09:41</span><b>GUI HOME</b><span>▮▮▮</span></div>
              <div class="gui-grid" id="guiGrid">
                <button class="gui-app" data-app="weather" type="button"><b>☀</b><small>天气</small></button>
                <button class="gui-app" data-app="map" type="button"><b>⌖</b><small>地图</small></button>
                <button class="gui-app" data-app="music" type="button"><b>♫</b><small>音乐</small></button>
                <button class="gui-app" data-app="camera" type="button"><b>◉</b><small>相机</small></button>
                <button class="gui-app" data-app="pay" type="button"><b>¥</b><small>支付</small></button>
                <button class="gui-app" data-app="settings" type="button"><b>⚙</b><small>设置</small></button>
              </div>
              <div class="gui-panel" id="guiPanel">
                <div class="gui-placeholder">点「天气」，再点「查看明天」。</div>
              </div>
              <div class="gui-statusbar"><span>图形界面 · GUI</span><span>点击 / 拖拽</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="ui-compare l2-panel">
        <div class="compare-cell"><b id="uiTermSteps">0</b><span>字符命令步数</span></div>
        <i></i>
        <div class="compare-cell"><b id="uiGuiSteps">0</b><span>图形界面点击</span></div>
        <p id="uiCompareText">同一个“查天气”：命令要记，图标只需点。</p>
      </div>
    `;

    const screen = $('#terminalScreen');
    const form = $('#terminalForm');
    const input = $('#terminalInput');
    const status = $('#terminalStatus');
    const guiStatus = $('#guiStatus');
    const guiPanel = $('#guiPanel');
    const guiGrid = $('#guiGrid');
    const termStepsNode = $('#uiTermSteps');
    const guiStepsNode = $('#uiGuiSteps');
    let terminalSteps = 0;
    let guiSteps = 0;
    let terminalDone = false;
    let guiDone = false;

    function line(text, cls = '') {
      const div = document.createElement('div');
      div.className = `terminal-line${cls ? ` ${cls}` : ''}`;
      div.textContent = text;
      screen.appendChild(div);
      screen.scrollTop = screen.scrollHeight;
    }

    function checkUi() {
      if (!terminalDone || !guiDone || state.awards['l2-ui']) return;
      success('l2-ui', 10, '完成字符与图形双模任务');
      $('#uiCompareText').innerHTML = '<strong>图形界面：看得见，点得到。</strong> 操作更简单。';
      setStatus(status, '任务完成 · 字符界面', true);
      setStatus(guiStatus, '任务完成 · 图形界面', true);
    }

    function runCommand(raw) {
      const cmd = String(raw || '').trim();
      if (!cmd) return;
      terminalSteps += 1;
      termStepsNode.textContent = String(terminalSteps);
      line(`$ ${cmd}`, 'is-dim');
      const lower = cmd.toLowerCase();

      if (lower === 'help') {
        line('可用命令：weather [城市] · music · clear · help');
        line('提示：字符界面需要记住命令和参数。', 'is-dim');
      } else if (lower === 'weather' || lower.startsWith('weather ')) {
        line('北京 · 晴 · 24°C · 东南风 2 级');
        line('字符界面返回了一行文本。要看图形，需要另一套界面。', 'is-ok');
        terminalDone = true;
        setStatus(status, '已找到天气 ✓', true);
        checkUi();
      } else if (lower === 'music') {
        line('正在播放：Classroom Signal · 00:42');
      } else if (lower === 'clear') {
        screen.innerHTML = '';
        line('屏幕已清空。', 'is-dim');
      } else {
        line(`command not found: ${cmd}`, 'is-warn');
        line('输入 help 看看可用命令。', 'is-dim');
      }
      input.value = '';
      input.focus();
    }

    form?.addEventListener('submit', event => {
      event.preventDefault();
      runCommand(input.value);
      sfx('click');
    });

    $$('.terminal-chips [data-cmd]').forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.dataset.cmd;
        runCommand(btn.dataset.cmd);
        sfx('click');
      });
    });

    function openGuiApp(app) {
      guiSteps += 1;
      guiStepsNode.textContent = String(guiSteps);
      $$('.gui-app', guiGrid).forEach(btn => btn.classList.toggle('is-active', btn.dataset.app === app));

      if (app === 'weather') {
        guiPanel.innerHTML = `
          <h4>北京 · 今天</h4>
          <div class="gui-weather"><b>24°</b><span>晴 · 东南风 2 级<br>空气质量：良</span></div>
          <button class="gui-weather-btn" data-gui-next type="button">查看明天 →</button>
        `;
        guiPanel.querySelector('[data-gui-next]')?.addEventListener('click', () => {
          guiSteps += 1;
          guiStepsNode.textContent = String(guiSteps);
          guiDone = true;
          setStatus(guiStatus, `${guiSteps} 次操作 · 已完成`, true);
          guiPanel.innerHTML = `
            <h4>北京 · 明天</h4>
            <div class="gui-weather"><b>26°</b><span>多云 · 微风<br>适合户外活动</span></div>
            <p>没有输入命令，只是看见了「天气」图标，然后点了一下。</p>
          `;
          checkUi();
          sfx('success');
        });
        setStatus(guiStatus, `${guiSteps} 次操作 · 打开天气`);
      } else {
        const labels = { map: '地图', music: '音乐', camera: '相机', pay: '支付', settings: '设置' };
        guiPanel.innerHTML = `<div class="gui-placeholder">「${labels[app] || app}」已在图形界面中打开。<br>这里用图标代替了命令。</div>`;
        setStatus(guiStatus, `${guiSteps} 次操作`);
      }
      buzz();
    }

    $$('.gui-app', guiGrid).forEach(btn => btn.addEventListener('click', () => openGuiApp(btn.dataset.app)));

    if (state.awards['l2-ui']) {
      terminalDone = true;
      guiDone = true;
      setStatus(status, '任务完成 · 字符界面', true);
      setStatus(guiStatus, '任务完成 · 图形界面', true);
    }
  }

  /* ========================================================================
     03 · Super app fusion
     ======================================================================== */

  function renderFusion() {
    const mount = document.getElementById('l2FusionMount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="fusion-lab">
        <div class="fusion-stage l2-panel">
          <div class="fusion-stage-head">
            <div><span class="l2-mono">SUPER APP BUILDER / 超级应用拼装</span><h3>把 6 项服务装进手机</h3></div>
            <span class="fusion-count" id="fusionCount">0 / 6</span>
          </div>
          <div class="fusion-phone-wrap">
            <div class="fusion-phone" id="fusionPhone">
              <div class="fusion-phone-top"><span>09:41</span><span>SUPER APP</span><span>5G</span></div>
              <div class="fusion-screen">
                <div class="fusion-apps" id="fusionApps">
                  ${appServices.map(service => `
                    <div class="fusion-slot" data-service="${service.id}">
                      <span class="slot-icon">${service.icon}</span>
                      <span class="slot-label"><b>待接入</b><small>${service.en}</small></span>
                    </div>
                  `).join('')}
                </div>
                <div class="fusion-core"><i></i><span><b>ONE ENTRY</b><small>一个入口 · 多种服务</small></span></div>
              </div>
            </div>
          </div>
          <div class="fusion-meter" style="border-top:1px solid var(--line-soft);">
            <div class="fusion-meter-row"><span>融合进度</span><b id="fusionMeterLabel">0%</b></div>
            <div class="fusion-meter-track"><i id="fusionMeter"></i></div>
            <p class="l2-hint" style="margin-top:8px;">点右侧服务卡，接入手机。</p>
          </div>
        </div>

        <aside class="fusion-side">
          <div class="fusion-picker l2-panel">
            <span class="l2-mono">SERVICE MODULES / 服务模块</span>
            <h3>选择服务</h3>
            <p class="l2-hint">6 个独立 App → 1 个入口，就是应用融合。</p>
            <div class="fusion-chips" id="fusionChips">
              ${appServices.map(service => `
                <button class="fusion-chip" data-service="${service.id}" draggable="true" type="button">
                  <b>${service.icon}</b><span>${service.name}<small>${service.en}</small></span>
                </button>
              `).join('')}
            </div>
          </div>

          <div class="fusion-quiz l2-panel" id="fusionQuiz" hidden>
            <span class="l2-mono">CHECK / 特征判断</span>
            <h4>地图、打车、外卖、支付装进一个 App，这是？</h4>
            <button class="l2-option" data-fusion-answer="single" type="button">单一应用</button>
            <button class="l2-option" data-fusion-answer="fusion" type="button">应用融合</button>
            <button class="l2-option" data-fusion-answer="char" type="button">字符界面</button>
            <button class="l2-option" data-fusion-answer="media" type="button">图文声像</button>
            <div class="l2-feedback" id="fusionFeedback" hidden></div>
          </div>
        </aside>
      </div>
    `;

    const used = new Set();
    const phone = $('#fusionPhone');
    const countNode = $('#fusionCount');
    const meter = $('#fusionMeter');
    const meterLabel = $('#fusionMeterLabel');
    const quiz = $('#fusionQuiz');
    const feedback = $('#fusionFeedback');

    function addService(id) {
      const service = appServices.find(item => item.id === id);
      if (!service || used.has(id)) return;
      used.add(id);
      const chip = $(`#fusionChips [data-service="${id}"]`);
      chip?.classList.add('is-used');
      const slot = $(`#fusionApps [data-service="${id}"]`);
      if (slot) {
        slot.classList.add('is-filled');
        slot.querySelector('.slot-label').innerHTML = `<b>${service.name}</b><small>${service.en}</small>`;
      }
      countNode.textContent = `${used.size} / 6`;
      meter.style.width = `${(used.size / appServices.length) * 100}%`;
      meterLabel.textContent = `${Math.round((used.size / appServices.length) * 100)}%`;
      if (used.size === appServices.length) {
        phone.classList.add('is-super');
        quiz.hidden = false;
        setFeedback(feedback, '6 项服务已接入。一个入口，多种服务。', 'good');
        feedback.hidden = false;
        sfx('badge');
      } else {
        sfx('click');
      }
    }

    $$('#fusionChips [data-service]').forEach(chip => {
      chip.addEventListener('click', () => addService(chip.dataset.service));
      chip.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', chip.dataset.service);
        event.dataTransfer.effectAllowed = 'copy';
      });
    });

    phone?.addEventListener('dragover', event => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });
    phone?.addEventListener('drop', event => {
      event.preventDefault();
      addService(event.dataTransfer.getData('text/plain'));
    });

    $$('#fusionQuiz [data-fusion-answer]').forEach(option => {
      option.addEventListener('click', () => {
        if (option.dataset.fusionAnswer === 'fusion') {
          $$('#fusionQuiz [data-fusion-answer]').forEach(btn => {
            btn.disabled = true;
            btn.classList.toggle('is-correct', btn === option);
          });
          setFeedback(feedback, '正确：一个入口承载多种服务，就是应用融合。', 'good');
          feedback.hidden = false;
          success('l2-fusion', 15, '拼装 6 项服务的超级应用');
          sfx('success');
        } else {
          option.classList.add('is-wrong');
          feedback.hidden = false;
          setFeedback(feedback, '再想想：这些服务原来分属不同 App。', 'warn');
          window.setTimeout(() => option.classList.remove('is-wrong'), 650);
          sfx('error');
        }
      });
    });

    if (state.awards['l2-fusion']) {
      appServices.forEach(service => addService(service.id));
    }
  }

  /* ========================================================================
     04 · Application atlas
     ======================================================================== */

  function renderAtlas() {
    const mount = document.getElementById('l2AtlasMount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="atlas-lab">
        <div class="atlas-tray l2-panel">
          <div class="atlas-tray-head">
            <div><span class="l2-mono">APP ATLAS / 应用图谱</span><h3>待分类应用</h3></div>
            <span class="atlas-count" id="atlasCount">0 / 12</span>
          </div>
          <p class="l2-hint" style="margin-top:6px;">点应用，再点对应类别；也可拖拽。</p>
          <div class="atlas-chips" id="atlasChips">
            ${atlasApps.map(app => `<button class="atlas-chip" data-app="${app.id}" data-cat="${app.cat}" draggable="true" type="button">${app.name}</button>`).join('')}
          </div>
          <div class="atlas-feedback" id="atlasFeedback"><div class="l2-feedback">点应用，再点类别。</div></div>
        </div>

        <div class="atlas-bins" id="atlasBins">
          ${Object.entries(atlasCats).map(([cat, meta]) => `
            <div class="atlas-bin" data-cat="${cat}">
              <header><b>${meta.name}</b><span>${meta.en}</span></header>
              <p>${meta.desc}</p>
              <div class="atlas-placed" data-placed="${cat}"></div>
              <span class="atlas-empty">放这里</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    let selected = null;
    let placed = 0;
    const countNode = $('#atlasCount');
    const feedback = $('#atlasFeedback .l2-feedback');

    function updateCount() {
      countNode.textContent = `${placed} / ${atlasApps.length}`;
    }

    function setSelected(chip) {
      $$('#atlasChips .atlas-chip').forEach(item => item.classList.toggle('is-selected', item === chip));
      selected = chip;
      if (chip) setFeedback(feedback, `已选「${chip.textContent}」，点类别。`);
    }

    function place(chip, bin) {
      if (!chip || !bin || chip.classList.contains('is-placed')) return;
      const cat = chip.dataset.cat;
      if (cat === bin.dataset.cat) {
        chip.classList.add('is-placed');
        chip.classList.remove('is-selected');
        const slot = bin.querySelector(`[data-placed="${cat}"]`);
        if (slot) {
          const pill = document.createElement('span');
          pill.textContent = chip.textContent;
          slot.appendChild(pill);
        }
        bin.querySelector('.atlas-empty')?.remove();
        placed += 1;
        updateCount();
        setFeedback(feedback, `✓「${chip.textContent}」→ ${atlasCats[cat].name}`, 'good');
        selected = null;
        sfx('success');
        if (placed === atlasApps.length && !state.awards['l2-atlas']) {
          setFeedback(feedback, '12 个应用全部归位。', 'good');
          success('l2-atlas', 15, '完成 12 个应用分类');
          sfx('badge');
        }
      } else {
        bin.classList.add('is-wrong');
        setFeedback(feedback, `再想想：「${chip.textContent}」更常出现在${atlasCats[cat].name}。`, 'warn');
        window.setTimeout(() => bin.classList.remove('is-wrong'), 380);
        sfx('error');
      }
    }

    $$('#atlasChips .atlas-chip').forEach(chip => {
      chip.addEventListener('click', () => setSelected(chip));
      chip.addEventListener('dragstart', event => {
        setSelected(chip);
        event.dataTransfer.setData('text/plain', chip.dataset.app);
        event.dataTransfer.effectAllowed = 'move';
      });
    });

    $$('#atlasBins .atlas-bin').forEach(bin => {
      bin.addEventListener('click', () => {
        if (!selected) {
          setFeedback(feedback, '先选一个应用。', 'warn');
          return;
        }
        place(selected, bin);
      });
      bin.addEventListener('dragover', event => {
        event.preventDefault();
        bin.classList.add('is-over');
      });
      bin.addEventListener('dragleave', () => bin.classList.remove('is-over'));
      bin.addEventListener('drop', event => {
        event.preventDefault();
        bin.classList.remove('is-over');
        const chip = $(`#atlasChips [data-app="${event.dataTransfer.getData('text/plain')}"]`);
        place(chip, bin);
      });
    });

    if (state.awards['l2-atlas']) {
      placed = atlasApps.length;
      updateCount();
      $$('#atlasChips .atlas-chip').forEach(chip => chip.classList.add('is-placed'));
      $$('#atlasBins .atlas-bin').forEach(bin => {
        bin.querySelector('.atlas-empty')?.remove();
        const slot = bin.querySelector(`[data-placed="${bin.dataset.cat}"]`);
        atlasApps.filter(app => app.cat === bin.dataset.cat).forEach(app => {
          const pill = document.createElement('span');
          pill.textContent = app.name;
          slot.appendChild(pill);
        });
      });
    }
  }

  /* ========================================================================
     05 · Data insight
     ======================================================================== */

  function renderData() {
    const mount = document.getElementById('l2DataMount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="data-lab">
        <div class="data-panel l2-panel">
          <div class="data-head">
            <div><span class="l2-mono">CNNIC · 54TH REPORT</span><h3>应用数据扫描</h3></div>
            <div class="l2-status">2024.6<br>规模 · 使用率 · 增长</div>
          </div>
          <div class="data-rows" id="dataRows">
            ${dataApps.map(app => `
              <button class="data-row" data-app="${app.id}" type="button">
                <span class="data-app"><b>${app.name}</b><small>${app.cat}</small></span>
                <span class="data-track"><i style="--pct:${app.pct}%"></i></span>
                <span class="data-value"><b>${app.pct.toFixed(1)}%</b><small>${app.users} 亿人</small></span>
                <span class="data-growth">${app.growth}<br>${app.growthPct}</span>
              </button>
            `).join('')}
          </div>
          <p class="data-note">来源：第 54 次 CNNIC 报告（2024.6），增长为半年变化。</p>
        </div>

        <aside class="data-side">
          <div class="data-scan-card l2-panel">
            <span class="l2-mono">SCAN PROGRESS / 扫描进度</span>
            <div class="data-scan-big"><b id="dataScanned">0</b><small>/ 4 组</small></div>
            <div class="data-pulse" id="dataPulse">点左侧 4 条数据。</div>
          </div>

          <div class="data-quiz l2-panel" id="dataQuiz" hidden>
            <span class="l2-mono">DATA QUIZ / 数据判断</span>
            <h4 id="dataQuestion">正在加载题目…</h4>
            <div id="dataOptions"></div>
            <div class="l2-feedback" id="dataFeedback" hidden></div>
            <div class="data-quiz-foot"><span id="dataQuizIndex">01 / 03</span><span id="dataQuizScore">0 题正确</span></div>
          </div>
        </aside>
      </div>
    `;

    const scanned = new Set();
    let quizIndex = 0;
    let correct = 0;
    const scannedNode = $('#dataScanned');
    const pulse = $('#dataPulse');
    const quiz = $('#dataQuiz');
    const question = $('#dataQuestion');
    const options = $('#dataOptions');
    const feedback = $('#dataFeedback');
    const quizIndexNode = $('#dataQuizIndex');
    const scoreNode = $('#dataQuizScore');

    function showQuiz() {
      if (state.awards['l2-data']) return;
      quiz.hidden = false;
      renderQuestion();
    }

    function renderQuestion() {
      const item = dataQuestions[quizIndex];
      question.textContent = item.q;
      quizIndexNode.textContent = `${String(quizIndex + 1).padStart(2, '0')} / 03`;
      feedback.hidden = true;
      options.innerHTML = item.options.map((option, index) => `<button class="l2-option" data-data-answer="${index}" type="button">${option}</button>`).join('');
      $$('#dataOptions [data-data-answer]').forEach(btn => {
        btn.addEventListener('click', () => {
          const answer = Number(btn.dataset.dataAnswer);
          if (answer === item.answer) {
            $$('#dataOptions [data-data-answer]').forEach(button => {
              button.disabled = true;
              button.classList.toggle('is-correct', button === btn);
            });
            correct += 1;
            scoreNode.textContent = `${correct} 题正确`;
            feedback.hidden = false;
            setFeedback(feedback, item.explain, 'good');
            sfx('success');
            window.setTimeout(() => {
              quizIndex += 1;
              if (quizIndex >= dataQuestions.length) {
                setFeedback(feedback, '3 题完成。', 'good');
                question.textContent = '扫描完成，答 3 题。';
                options.innerHTML = '';
                quizIndexNode.textContent = '03 / 03';
                success('l2-data', 15, '扫描四组应用数据');
                sfx('badge');
              } else {
                renderQuestion();
              }
            }, 850);
          } else {
            btn.classList.add('is-wrong');
            feedback.hidden = false;
            setFeedback(feedback, '再看左侧数据。', 'warn');
            window.setTimeout(() => btn.classList.remove('is-wrong'), 650);
            sfx('error');
          }
        });
      });
    }

    function scanRow(row) {
      if (scanned.has(row.dataset.app)) return;
      scanned.add(row.dataset.app);
      row.classList.add('is-scanned');
      scannedNode.textContent = String(scanned.size);
      const app = dataApps.find(item => item.id === row.dataset.app);
      if (app) {
        pulse.innerHTML = `<b>${app.name}</b><br>${app.users} 亿人 · 使用率 ${app.pct.toFixed(1)}% · 半年增长 ${app.growth}（${app.growthPct}）`;
      }
      sfx('click');
      if (scanned.size === dataApps.length) {
        pulse.innerHTML = '<b>扫描完成。</b><br>4 类应用，增长最快。';
        showQuiz();
        sfx('badge');
      }
    }

    $$('#dataRows .data-row').forEach(row => row.addEventListener('click', () => scanRow(row)));

    if (state.awards['l2-data']) {
      dataApps.forEach(app => {
        scanned.add(app.id);
        $(`#dataRows [data-app="${app.id}"]`)?.classList.add('is-scanned');
      });
      scannedNode.textContent = '4';
      pulse.innerHTML = '<b>扫描完成。</b><br>98.0% / 88.1% / 66.3% / 50.3%';
      quiz.hidden = false;
      question.textContent = '扫描完成，答 3 题。';
      options.innerHTML = '';
      quizIndexNode.textContent = '03 / 03';
      scoreNode.textContent = '3 题正确';
    }
  }

  /* ========================================================================
     06 · Digital life
     ======================================================================== */

  function renderLife() {
    const mount = document.getElementById('l2LifeMount');
    if (!mount) return;

    mount.innerHTML = `
      <div class="life-lab">
        <div class="life-scenarios" id="lifeScenarios">
          ${lifeScenarios.map((scenario, index) => `
            <article class="life-card l2-panel" data-scenario="${index}">
              <div class="life-card-head"><span class="life-time">${scenario.time}</span><span class="life-step">SCENE ${String(index + 1).padStart(2, '0')}</span></div>
              <h3>${scenario.title}</h3>
              <p>${scenario.desc}</p>
              <div class="life-options">
                ${scenario.options.map((option, optionIndex) => `<button class="life-option" data-option="${optionIndex}" type="button">${option.label}</button>`).join('')}
              </div>
              <div class="life-feedback" hidden></div>
            </article>
          `).join('')}
        </div>

        <aside class="life-side">
          <div class="life-balance l2-panel">
            <span class="l2-mono">DIGITAL BALANCE / 数字生活平衡仪</span>
            <h3>便利与自控</h3>
            <div class="balance-line conv">
              <div><span>便利值</span><b id="lifeConvLabel">0</b></div>
              <div class="balance-track"><i id="lifeConv"></i></div>
            </div>
            <div class="balance-line ctrl">
              <div><span>自控值</span><b id="lifeCtrlLabel">0</b></div>
              <div class="balance-track"><i id="lifeCtrl"></i></div>
            </div>
            <div class="life-verdict" id="lifeVerdict">完成 5 个场景，查看平衡值。</div>
            <div class="life-progress">场景进度 <b id="lifeDone">0</b> / 5</div>
            <p class="l2-hint" style="margin-top:10px;">互联网政务少跑腿；未成年人上网需共同保护。</p>
          </div>

          <form class="life-form l2-panel" id="lifeForm" hidden>
            <span class="l2-mono">MY DIGITAL PROMISE / 我的承诺</span>
            <h3>写下数字生活承诺</h3>
            <p>选 1 条原则，写成自己的话。</p>
            <div class="life-principles" id="lifePrinciples">
              ${lifePrinciples.map((principle, index) => `<button class="life-principle" data-principle="${index}" type="button">${principle}</button>`).join('')}
            </div>
            <textarea id="lifeText" rows="3" maxlength="120" placeholder="例：作业完成后只看 30 分钟短视频，睡前手机放书桌。"></textarea>
            <div class="l2-actions">
              <button class="btn btn-primary btn-small" type="submit">提交我的承诺</button>
              <span class="l2-status" id="lifeFormStatus">还需完成 5 个场景</span>
            </div>
            <div class="l2-feedback" id="lifeFeedback" hidden></div>
          </form>

          <div class="life-summary l2-panel" id="lifeSummary" hidden>
            <span class="l2-mono">DIGITAL PORTRAIT / 我的数字画像</span>
            <h3>我的数字生活</h3>
            <p id="lifeSummaryText"></p>
            <blockquote id="lifeSummaryQuote"></blockquote>
          </div>
        </aside>
      </div>

      <div class="course-finish" id="courseFinish" hidden>
        <span class="finish-mark">✓</span>
        <h2>第二课 · 完成</h2>
        <p>6 个任务完成：内容、界面、融合、分类、数据、生活。技术给便利，选择给答案。</p>
        <div class="finish-badges" id="finishBadges"></div>
        <div class="finish-actions">
          <button class="btn btn-primary btn-small" data-course-forward="3" type="button">进入八年级第9课</button>
          <button class="btn btn-ghost btn-small" data-course-back type="button">查看第一课</button>
          <button class="btn btn-ghost btn-small" data-finish-teacher type="button">打开教师控制台</button>
        </div>
      </div>
    `;

    const cards = $$('#lifeScenarios .life-card');
    const form = $('#lifeForm');
    const text = $('#lifeText');
    const feedback = $('#lifeFeedback');
    const formStatus = $('#lifeFormStatus');
    const summary = $('#lifeSummary');
    const summaryText = $('#lifeSummaryText');
    const summaryQuote = $('#lifeSummaryQuote');
    const convNode = $('#lifeConv');
    const ctrlNode = $('#lifeCtrl');
    const convLabel = $('#lifeConvLabel');
    const ctrlLabel = $('#lifeCtrlLabel');
    const verdict = $('#lifeVerdict');
    const doneNode = $('#lifeDone');
    let done = 0;
    let conv = 0;
    let ctrl = 0;
    let selectedPrinciple = '';

    function updateMeters() {
      const convPct = Math.min(100, (conv / 10) * 100);
      const ctrlPct = Math.min(100, (Math.max(0, ctrl) / 10) * 100);
      convNode.style.width = `${convPct}%`;
      ctrlNode.style.width = `${ctrlPct}%`;
      convLabel.textContent = String(conv);
      ctrlLabel.textContent = String(Math.max(0, ctrl));
      doneNode.textContent = String(done);
      if (done < 5) {
        verdict.textContent = `已完成 ${done} / 5 个场景。便利与自控的曲线，会随着你的选择变化。`;
        verdict.classList.remove('is-good');
      } else if (ctrl >= 6) {
        verdict.textContent = '平衡探索者：便利在线，自控也在线。你知道什么时候用网络，也知道什么时候放下。';
        verdict.classList.add('is-good');
      } else if (ctrl >= 2) {
        verdict.textContent = '还不错，但有些场景可以更有节制。给娱乐设一个边界，数字生活会更从容。';
        verdict.classList.remove('is-good');
      } else {
        verdict.textContent = '便利很高，自控被透支。算法很懂你，但你也要学会比算法更懂自己的时间。';
        verdict.classList.remove('is-good');
      }
    }

    function showForm() {
      if (form.hidden) {
        form.hidden = false;
        formStatus.textContent = '5 个场景已完成，写下承诺';
      }
    }

    function renderSummary() {
      const stored = state.exit && state.exit.life;
      if (!stored) return;
      summary.hidden = false;
      summaryText.textContent = `5 个场景：便利值 ${conv}，自控值 ${Math.max(0, ctrl)}。会用，也要会停。`;
      summaryQuote.textContent = `“${stored.text}”`;
      form.hidden = true;
      showFinish();
    }

    function showFinish() {
      const finish = $('#courseFinish');
      if (!finish) return;
      finish.hidden = false;
      const badges = $('#finishBadges');
      if (badges) {
        const keys = ['l2-media', 'l2-ui', 'l2-fusion', 'l2-atlas', 'l2-data', 'l2-life'];
        const list = keys.map(key => state.badges[key]?.title).filter(Boolean);
        badges.innerHTML = list.length ? list.map(title => `<span>${title}</span>`).join('') : '<span>第二课徽章</span>';
      }
    }

    cards.forEach(card => {
      const scenario = lifeScenarios[Number(card.dataset.scenario)];
      const cardFeedback = card.querySelector('.life-feedback');
      $$('.life-option', card).forEach(button => {
        button.addEventListener('click', () => {
          if (card.classList.contains('is-done')) return;
          const option = scenario.options[Number(button.dataset.option)];
          card.classList.add('is-done');
          $$('.life-option', card).forEach(item => {
            item.disabled = true;
            item.classList.toggle('is-picked', item === button);
            if (item === button && option.ctrl < 0) item.classList.add('is-warn');
          });
          cardFeedback.hidden = false;
          cardFeedback.textContent = option.feedback;
          cardFeedback.classList.toggle('is-good', Boolean(option.good));
          cardFeedback.classList.toggle('is-warn', option.ctrl < 0);
          done += 1;
          conv += option.conv;
          ctrl += option.ctrl;
          updateMeters();
          buzz();
          if (done === 5) {
            showForm();
            sfx('badge');
          }
        });
      });
    });

    $$('#lifePrinciples .life-principle').forEach(button => {
      button.addEventListener('click', () => {
        selectedPrinciple = button.textContent.trim();
        $$('#lifePrinciples .life-principle').forEach(item => item.classList.toggle('is-picked', item === button));
        buzz();
      });
    });

    form?.addEventListener('submit', event => {
      event.preventDefault();
      const promise = text.value.trim();
      if (!selectedPrinciple) {
        feedback.hidden = false;
        setFeedback(feedback, '先选 1 条原则。', 'warn');
        return;
      }
      if (promise.length < 4) {
        feedback.hidden = false;
        setFeedback(feedback, '写具体：时间、场景或做法。', 'warn');
        return;
      }
      state.exit.life = { principle: selectedPrinciple, text: promise, at: Date.now() };
      saveState();
      feedback.hidden = false;
      setFeedback(feedback, '已记录到本机。', 'good');
      success('l2-life', 15, '写下数字生活承诺');
      sfx('success');
      renderSummary();
    });

    $$('[data-finish-teacher]').forEach(button => button.addEventListener('click', () => $('#teacherBtn')?.click()));
    $$('[data-course-back]').forEach(button => button.addEventListener('click', () => API.setCourse(1, { bridge: true })));
    $$('[data-course-forward]').forEach(button => button.addEventListener('click', () => API.setCourse(Number(button.dataset.courseForward) || 3, { bridge: true })));

    updateMeters();
    if (state.exit && state.exit.life) {
      conv = 8;
      ctrl = 6;
      done = 5;
      updateMeters();
      renderSummary();
    }
    if (state.awards['l2-life']) showFinish();
  }

  /* ---------- boot lesson 2 ---------- */

  renderMedia();
  renderInterface();
  renderFusion();
  renderAtlas();
  renderData();
  renderLife();
})();



