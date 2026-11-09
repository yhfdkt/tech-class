/* ==========================================================================
   八年级上册 · 第 9 课《互联协议仍沿用》
   Vanilla JS · 6 个互动任务 · offline friendly
   ========================================================================== */

(() => {
  'use strict';

  const API = window.ClassroomAPI;
  if (!API) return;

  const { state, award, unlockBadge, toast, sfx, refreshStationLocks, reduceMotion } = API;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const has = key => Boolean(state?.awards?.[key]);

  const PHOTO = {
    speaker: 'assets/images/g8/speaker.webp?v=20261108-g8e',
    watch: 'assets/images/g8/watch.webp?v=20261108-g8e',
    phone: 'assets/images/g8/phone.webp?v=20261108-g8e',
    car: 'assets/images/g8/car.webp?v=20261108-g8e',
    weather: 'assets/images/g8/weather.webp?v=20261108-g8e',
    server: 'assets/images/g8/server.webp?v=20261108-g8e',
    switch: 'assets/images/g8/switch.webp?v=20261108-g8e',
    water: 'assets/images/g8/water.webp?v=20261108-g8e',
    soil: 'assets/images/g8/soil.webp?v=20261108-g8e',
    robot: 'assets/images/g8/robot.webp?v=20261108-g8e',
    home: 'assets/images/g8/home.webp?v=20261108-g8e',
    greenhouse: 'assets/images/g8/greenhouse.webp?v=20261108-g8e',
    farm: 'assets/images/g8/farm.webp?v=20261108-g8e'
  };

  const BADGE_META = [
    { key: 'l3-data', title: '数据来源侦探', icon: '⇄' },
    { key: 'l3-api', title: 'API 取数员', icon: '{ }' },
    { key: 'l3-http', title: 'HTTP 快递员', icon: '↔' },
    { key: 'l3-limit', title: '负载观察员', icon: 'λ' },
    { key: 'l3-feature', title: '协议匹配师', icon: '⌁' },
    { key: 'l3-choice', title: '物联协议决策者', icon: 'G8' }
  ];

  function grant(key, label) {
    if (has(key)) {
      refreshStationLocks();
      return false;
    }
    const ok = award(key, 10, label);
    if (ok) unlockBadge(key);
    return ok;
  }

  function setFeedback(node, text, tone = '') {
    if (!node) return;
    node.textContent = text;
    node.className = `l3-feedback${tone ? ` is-${tone}` : ''}`;
  }

  function addRetry(root, key) {
    const head = $('.l3-lab-head', root);
    if (!head || $('.l3-retry', head)) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'l3-retry';
    btn.dataset.l3Retry = key;
    btn.setAttribute('aria-label', '重做本任务');
    btn.innerHTML = '<span aria-hidden="true">↻</span> 重做';
    head.appendChild(btn);
  }

  function mount(id, markup) {
    const root = document.getElementById(id);
    if (!root) return null;
    root.innerHTML = markup;
    return root;
  }

  /* ========================================================================
     01 · 数据接力
     ======================================================================== */

  const DATA_ITEMS = [
    { id: 'weather', label: '天气预报', icon: '☀', from: 'internet', note: '物联音箱' },
    { id: 'traffic', label: '实时路况', icon: '⌁', from: 'internet', note: '汽车导航' },
    { id: 'news', label: '新闻推送', icon: '▤', from: 'internet', note: '手机' },
    { id: 'music', label: '在线音乐', icon: '♫', from: 'internet', note: '音箱 / 手机' },
    { id: 'room', label: '室内温度', icon: '°', from: 'local', note: '温度传感器' },
    { id: 'heart', label: '心率', icon: '♥', from: 'local', note: '手表传感器' },
    { id: 'gps', label: 'GPS 位置', icon: '⌖', from: 'local', note: '卫星定位' },
    { id: 'battery', label: '剩余电量', icon: '▮', from: 'local', note: '设备自检' }
  ];

  function initData(forceReplay = false) {
    const root = mount('l3DataMount', `
      <div class="l3-lab tech-panel">
        <div class="l3-lab-head">
          <div><span class="l3-kicker">DATA RELAY / 数据接力</span><h3>数据从哪条路进来？</h3></div>
          <span class="l3-counter" id="l3DataCount">0 / 8</span>
        </div>
        <p class="l3-instruction">先点一条数据，再点它进入的来源。</p>
        <div class="l3-real-strip">
          <figure class="l3-photo">
            <img src="${PHOTO.speaker}" alt="真实的智能音箱设备" loading="lazy" decoding="async">
            <figcaption><b>物联音箱</b><small>天气、新闻从互联网来</small></figcaption>
          </figure>
          <figure class="l3-photo">
            <img src="${PHOTO.phone}" alt="手持智能手机的真实场景" loading="lazy" decoding="async">
            <figcaption><b>手机</b><small>天气、新闻、社交通知</small></figcaption>
          </figure>
          <figure class="l3-photo">
            <img src="${PHOTO.watch}" alt="真实的智能手表设备" loading="lazy" decoding="async">
            <figcaption><b>手表</b><small>运动建议、天气情况</small></figcaption>
          </figure>
          <figure class="l3-photo">
            <img src="${PHOTO.car}" alt="汽车中使用手机导航的真实场景" loading="lazy" decoding="async">
            <figcaption><b>汽车</b><small>实时路况、导航数据</small></figcaption>
          </figure>
        </div>
        <div class="l3-data-layout">
          <div class="l3-chip-bank" id="l3DataChips">
            ${DATA_ITEMS.map(item => `
              <button class="l3-data-chip" type="button" data-data-id="${item.id}">
                <i>${item.icon}</i><span><b>${item.label}</b><small>${item.note}</small></span>
              </button>`).join('')}
          </div>
          <div class="l3-bins">
            <button class="l3-bin" type="button" data-bin="internet">
              <span class="l3-bin-head"><b>互联网 / 云端</b><em id="l3InternetCount">0</em></span>
              <small>服务器通过 API 提供的数据</small>
              <span class="l3-bin-list" id="l3InternetList"></span>
            </button>
            <button class="l3-bin" type="button" data-bin="local">
              <span class="l3-bin-head"><b>设备 / 卫星自采</b><em id="l3LocalCount">0</em></span>
              <small>传感器直接测量，不经过互联网</small>
              <span class="l3-bin-list" id="l3LocalList"></span>
            </button>
          </div>
        </div>
        <div class="l3-feedback" id="l3DataFeedback" aria-live="polite">选一条数据，开始分流。</div>
      </div>
    `);
    if (!root) return;
    addRetry(root, 'data');

    let selected = null;
    const placed = new Set();
    if (has('l3-data') && !forceReplay) DATA_ITEMS.forEach(item => placed.add(item.id));

    const chips = $$('#l3DataChips .l3-data-chip', root);
    const bins = $$('.l3-bin', root);
    const feedback = $('#l3DataFeedback', root);

    const render = () => {
      chips.forEach(chip => {
        const item = DATA_ITEMS.find(entry => entry.id === chip.dataset.dataId);
        const isPlaced = placed.has(item.id);
        chip.classList.toggle('is-placed', isPlaced);
        chip.classList.toggle('is-selected', selected === item.id);
        chip.disabled = isPlaced;
        chip.setAttribute('aria-pressed', selected === item.id ? 'true' : 'false');
      });
      const internet = DATA_ITEMS.filter(item => placed.has(item.id) && item.from === 'internet');
      const local = DATA_ITEMS.filter(item => placed.has(item.id) && item.from === 'local');
      $('#l3DataCount', root).textContent = `${placed.size} / 8`;
      $('#l3InternetCount', root).textContent = String(internet.length);
      $('#l3LocalCount', root).textContent = String(local.length);
      $('#l3InternetList', root).innerHTML = internet.map(item => `<span>${item.label}</span>`).join('');
      $('#l3LocalList', root).innerHTML = local.map(item => `<span>${item.label}</span>`).join('');
    };

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        if (chip.disabled) return;
        selected = chip.dataset.dataId;
        render();
        sfx('click');
        const item = DATA_ITEMS.find(entry => entry.id === selected);
        setFeedback(feedback, `已选中「${item.label}」，它来自哪里？`);
      });
    });

    bins.forEach(bin => {
      bin.addEventListener('click', () => {
        if (placed.size === DATA_ITEMS.length) return;
        if (!selected) {
          setFeedback(feedback, '先在上方点一条数据。', 'warn');
          sfx('error');
          return;
        }
        const item = DATA_ITEMS.find(entry => entry.id === selected);
        if (item.from !== bin.dataset.bin) {
          bin.classList.add('is-wrong');
          window.setTimeout(() => bin.classList.remove('is-wrong'), 420);
          setFeedback(feedback, `「${item.label}」不是从这里来的，再看看。`, 'warn');
          sfx('error');
          return;
        }
        placed.add(item.id);
        selected = null;
        bin.classList.add('is-received');
        window.setTimeout(() => bin.classList.remove('is-received'), 420);
        render();
        sfx('success');
        if (placed.size === DATA_ITEMS.length) {
          setFeedback(feedback, '分流完成：4 条来自互联网，4 条由设备或卫星自采。互联网数据，是物联设备的重要外援。', 'ok');
          if (grant('l3-data', '分清互联网数据与设备自采')) {
            toast('数据接力完成', '物联设备会借用互联网的数据', '#ffc857');
          }
        } else {
          const left = DATA_ITEMS.length - placed.size;
          setFeedback(feedback, `分对了。还剩 ${left} 条数据。`, 'ok');
        }
      });
    });

    if (has('l3-data') && !forceReplay) {
      setFeedback(feedback, '分流完成：4 条来自互联网，4 条由设备或卫星自采。互联网数据，是物联设备的重要外援。', 'ok');
    }
    render();
  }

  /* ========================================================================
     02 · API 取数
     ======================================================================== */

  const API_ENDPOINTS = [
    { id: 'weather', label: '天气 API', base: 'https://api.weather.cn/v1/now' },
    { id: 'traffic', label: '路况 API', base: 'https://api.traffic.cn/v1/flow' },
    { id: 'news', label: '新闻 API', base: 'https://api.news.cn/v1/top' }
  ];
  const API_CITIES = [
    { id: 'beijing', label: '北京' },
    { id: 'shanghai', label: '上海' },
    { id: 'guangzhou', label: '广州' }
  ];
  const API_FIELDS = [
    { key: 'temp', label: 'temp', value: '18', good: true },
    { key: 'humidity', label: 'humidity', value: '42', good: true },
    { key: 'wind', label: 'wind', value: '"西北风 3 级"', good: true },
    { key: 'city', label: 'city', value: '"北京"', good: false },
    { key: 'updated', label: 'updated', value: '"09:30"', good: false }
  ];

  function initApi(forceReplay = false) {
    const root = mount('l3ApiMount', `
      <div class="l3-lab tech-panel">
        <div class="l3-lab-head">
          <div><span class="l3-kicker">API REQUEST / 接口取数</span><h3>向服务器要一份天气数据</h3></div>
          <span class="l3-status-tag" id="l3ApiState">待请求</span>
        </div>
        <figure class="l3-photo-banner">
          <img src="${PHOTO.weather}" alt="真实的气象观测站" loading="lazy" decoding="async">
          <figcaption><b>真实气象站</b><span>气象传感器观测后，数据由服务器通过 API 提供给设备。</span></figcaption>
        </figure>
        <div class="l3-api-grid">
          <div class="l3-api-builder">
            <p class="l3-instruction">① 选接口　② 选城市　③ 发送请求</p>
            <span class="l3-mini-label">接口</span>
            <div class="l3-endpoint-row" id="l3ApiEndpoints">
              ${API_ENDPOINTS.map(item => `<button class="l3-option" type="button" data-endpoint="${item.id}">${item.label}</button>`).join('')}
            </div>
            <span class="l3-mini-label">城市参数</span>
            <div class="l3-city-row" id="l3ApiCities">
              ${API_CITIES.map(item => `<button class="l3-option" type="button" data-city="${item.id}">${item.label}</button>`).join('')}
            </div>
            <div class="l3-request-line"><span>请求</span><code id="l3ApiRequest">先选接口和城市</code></div>
            <button class="btn btn-primary btn-small" id="l3ApiSend" type="button" disabled>发送 API 请求</button>
          </div>
          <div class="l3-api-response">
            <div class="l3-response-head"><span>RESPONSE</span><b id="l3ApiCode">—</b></div>
            <pre class="l3-json" id="l3ApiJson">等待请求…</pre>
            <p class="l3-instruction" id="l3ApiHint">服务器返回后，点出温度、湿度、风力 3 个字段。</p>
            <div class="l3-field-bank" id="l3ApiFields">
              ${API_FIELDS.map(item => `<button class="l3-field" type="button" data-field="${item.key}" disabled><b>${item.label}</b><span>${item.value}</span></button>`).join('')}
            </div>
          </div>
        </div>
        <div class="l3-feedback" id="l3ApiFeedback" aria-live="polite">API 是服务器留给外部程序的取数窗口。</div>
      </div>
    `);
    if (!root) return;
    addRetry(root, 'api');

    const already = has('l3-api') && !forceReplay;
    let endpoint = already ? 'weather' : '';
    let city = already ? 'beijing' : '';
    let responded = already;
    let loading = false;
    const picked = new Set(already ? ['temp', 'humidity', 'wind'] : []);
    const feedback = $('#l3ApiFeedback', root);

    const endpoints = $$('#l3ApiEndpoints .l3-option', root);
    const cities = $$('#l3ApiCities .l3-option', root);
    const fieldButtons = $$('#l3ApiFields .l3-field', root);
    const send = $('#l3ApiSend', root);

    const preview = () => {
      const ep = API_ENDPOINTS.find(item => item.id === endpoint);
      const currentCity = API_CITIES.find(item => item.id === city);
      if (!ep || !currentCity) return '先选接口和城市';
      return `GET ${ep.base}?city=${city}`;
    };

    const render = () => {
      endpoints.forEach(btn => {
        const active = btn.dataset.endpoint === endpoint;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      cities.forEach(btn => {
        const active = btn.dataset.city === city;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      $('#l3ApiRequest', root).textContent = preview();
      send.disabled = Boolean(!endpoint || !city || responded || loading);
      fieldButtons.forEach(btn => {
        const field = API_FIELDS.find(item => item.key === btn.dataset.field);
        const active = picked.has(field.key);
        btn.classList.toggle('is-picked', active);
        btn.disabled = !responded || picked.size >= 3 || active;
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    };

    const showResponse = () => {
      responded = true;
      $('#l3ApiCode', root).textContent = '200 OK';
      $('#l3ApiJson', root).textContent = `{
  "city": "北京",
  "temp": 18,
  "humidity": 42,
  "wind": "西北风 3 级",
  "updated": "09:30"
}`;
      $('#l3ApiHint', root).textContent = '这些字段，就是设备可以直接使用的数据。';
      setFeedback(feedback, '请求成功。点出温度、湿度、风力 3 个观测字段。', 'ok');
      render();
    };

    endpoints.forEach(btn => btn.addEventListener('click', () => {
      if (responded || loading) return;
      endpoint = btn.dataset.endpoint;
      render();
      sfx('click');
    }));
    cities.forEach(btn => btn.addEventListener('click', () => {
      if (responded || loading) return;
      city = btn.dataset.city;
      render();
      sfx('click');
    }));

    send.addEventListener('click', () => {
      if (!endpoint || !city || responded || loading) return;
      loading = true;
      $('#l3ApiState', root).textContent = '请求中…';
      setFeedback(feedback, '正在通过 API 请求服务器…');
      render();
      window.setTimeout(() => {
        loading = false;
        if (endpoint !== 'weather' || city !== 'beijing') {
          $('#l3ApiState', root).textContent = '接口不匹配';
          $('#l3ApiCode', root).textContent = '200 · 非目标数据';
          $('#l3ApiJson', root).textContent = endpoint === 'weather'
            ? '{ "msg": "请把城市参数改为北京" }'
            : '{ "msg": "这个接口返回的不是天气观测值" }';
          setFeedback(feedback, endpoint !== 'weather'
            ? '这是别的接口。任务要的是天气数据，换一个接口。'
            : '接口对了，但城市参数要选北京。', 'warn');
          render();
          return;
        }
        $('#l3ApiState', root).textContent = '返回成功';
        showResponse();
        sfx('success');
      }, reduceMotion ? 80 : 760);
    });

    fieldButtons.forEach(btn => btn.addEventListener('click', () => {
      if (!responded || picked.size >= 3) return;
      const field = API_FIELDS.find(item => item.key === btn.dataset.field);
      if (!field.good) {
        setFeedback(feedback, `「${field.label}」只是查询参数或时间戳，不是观测值。`, 'warn');
        sfx('error');
        return;
      }
      if (picked.has(field.key)) return;
      picked.add(field.key);
      btn.classList.add('is-picked');
      sfx('click');
      render();
      if (picked.size === 3) {
        setFeedback(feedback, '取数完成：设备拿到了温度、湿度和风力，可以据此调节环境。', 'ok');
        if (grant('l3-api', '通过 API 取出物联数据')) {
          toast('API 取数完成', '设备只取自己需要的字段', '#ffc857');
        }
      } else {
        setFeedback(feedback, `已取出 ${picked.size} / 3 个字段。`, 'ok');
      }
    }));

    if (already) {
      $('#l3ApiState', root).textContent = '返回成功';
      showResponse();
      setFeedback(feedback, '取数完成：设备拿到了温度、湿度和风力，可以据此调节环境。', 'ok');
    }
    render();
  }

  /* ========================================================================
     03 · HTTP 快线
     ======================================================================== */

  function initHttp(forceReplay = false) {
    const root = mount('l3HttpMount', `
      <div class="l3-lab tech-panel">
        <div class="l3-lab-head">
          <div><span class="l3-kicker">HTTP EXPRESS / 请求快线</span><h3>设备怎样向服务器要数据？</h3></div>
          <span class="l3-status-tag" id="l3HttpState">待组装</span>
        </div>
        <figure class="l3-photo-banner is-compact">
          <img src="${PHOTO.switch}" alt="真实的网络交换机与网线" loading="lazy" decoding="async">
          <figcaption><b>真实网络设备</b><span>请求与响应，最终都要经过交换机、路由器和服务器。</span></figcaption>
        </figure>
        <div class="l3-http-stage">
          <div class="l3-node is-client"><span>CLIENT</span><b>物联设备</b><small>发出请求</small></div>
          <div class="l3-http-track" aria-hidden="true">
            <span class="l3-http-line"></span>
            <i class="l3-packet" id="l3HttpPacket">GET</i>
            <small>请求 / 响应</small>
          </div>
          <div class="l3-node is-server"><span>SERVER</span><b>互联网服务器</b><small>处理并返回</small></div>
        </div>
        <div class="l3-http-grid">
          <div class="l3-http-builder">
            <p class="l3-instruction">① 组好请求　② 点击发送</p>
            <span class="l3-mini-label">方法</span>
            <div class="l3-option-row" id="l3HttpMethods">
              <button class="l3-option" type="button" data-method="GET">GET</button>
              <button class="l3-option" type="button" data-method="POST">POST</button>
            </div>
            <span class="l3-mini-label">资源路径</span>
            <div class="l3-option-row" id="l3HttpPaths">
              <button class="l3-option" type="button" data-path="weather">/v1/weather</button>
              <button class="l3-option" type="button" data-path="news">/v1/news</button>
              <button class="l3-option" type="button" data-path="order">/v1/order</button>
            </div>
            <span class="l3-mini-label">查询参数</span>
            <div class="l3-option-row" id="l3HttpQueries">
              <button class="l3-option" type="button" data-query="beijing">city=beijing</button>
              <button class="l3-option" type="button" data-query="watch">device=watch</button>
            </div>
            <div class="l3-request-line"><span>请求行</span><code id="l3HttpPreview">GET /v1/weather?city=beijing HTTP/1.1</code></div>
            <button class="btn btn-primary btn-small" id="l3HttpSend" type="button">发送请求</button>
          </div>
          <div class="l3-http-result">
            <div class="l3-response-head"><span>RESPONSE</span><b id="l3HttpCode">—</b></div>
            <pre class="l3-json" id="l3HttpResponse">等待请求…</pre>
            <div class="l3-sequence">
              <p class="l3-instruction">② 按真实顺序点三步</p>
              <div class="l3-sequence-buttons" id="l3HttpSequence">
                <button class="l3-step" type="button" data-order="2">服务器处理请求</button>
                <button class="l3-step" type="button" data-order="1">设备发出请求</button>
                <button class="l3-step" type="button" data-order="3">服务器返回响应</button>
              </div>
            </div>
          </div>
        </div>
        <div class="l3-feedback" id="l3HttpFeedback" aria-live="polite">HTTP 把一次数据交换，拆成请求和响应。</div>
      </div>
    `);
    if (!root) return;
    addRetry(root, 'http');

    const already = has('l3-http') && !forceReplay;
    let method = already ? 'GET' : '';
    let path = already ? 'weather' : '';
    let query = already ? 'beijing' : '';
    let requestOk = already;
    let sequenceStage = already ? 3 : 0;
    let sending = false;
    const feedback = $('#l3HttpFeedback', root);

    const methodButtons = $$('#l3HttpMethods .l3-option', root);
    const pathButtons = $$('#l3HttpPaths .l3-option', root);
    const queryButtons = $$('#l3HttpQueries .l3-option', root);
    const stepButtons = $$('#l3HttpSequence .l3-step', root);
    const send = $('#l3HttpSend', root);

    const preview = () => {
      if (!method || !path || !query) return '先选方法、路径和参数';
      const pathMap = { weather: '/v1/weather', news: '/v1/news', order: '/v1/order' };
      return `${method} ${pathMap[path]}?${query === 'beijing' ? 'city=beijing' : 'device=watch'} HTTP/1.1`;
    };

    const render = () => {
      const setActive = (buttons, attr, value) => buttons.forEach(btn => {
        const active = btn.dataset[attr] === value;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      setActive(methodButtons, 'method', method);
      setActive(pathButtons, 'path', path);
      setActive(queryButtons, 'query', query);
      $('#l3HttpPreview', root).textContent = preview();
      send.disabled = Boolean(!method || !path || !query || sending);
      stepButtons.forEach(btn => {
        const order = Number(btn.dataset.order);
        const active = order <= sequenceStage;
        btn.classList.toggle('is-done', active);
        btn.disabled = !requestOk || order <= sequenceStage;
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    };

    const sendRequest = () => {
      if (!method || !path || !query || sending) return;
      sending = true;
      requestOk = false;
      sequenceStage = 0;
      $('#l3HttpState', root).textContent = '传输中…';
      $('#l3HttpPacket', root).classList.add('is-moving');
      setFeedback(feedback, '请求正在沿网络发往服务器…');
      render();
      window.setTimeout(() => {
        sending = false;
        $('#l3HttpPacket', root).classList.remove('is-moving');
        if (method === 'GET' && path === 'weather' && query === 'beijing') {
          requestOk = true;
          $('#l3HttpState', root).textContent = '200 OK';
          $('#l3HttpCode', root).textContent = '200 OK';
          $('#l3HttpResponse', root).textContent = `{
  "status": "ok",
  "temp": 18,
  "humidity": 42
}`;
          setFeedback(feedback, '响应回来了。现在按真实顺序点三步：发出请求 → 服务器处理 → 返回响应。', 'ok');
          sfx('success');
        } else {
          $('#l3HttpState', root).textContent = '资源不匹配';
          $('#l3HttpCode', root).textContent = '404 Not Found';
          $('#l3HttpResponse', root).textContent = '{ "error": "请使用 GET /v1/weather?city=beijing" }';
          setFeedback(feedback, '这次请求没有拿到天气数据。检查方法、路径和参数。', 'warn');
          sfx('error');
        }
        render();
      }, reduceMotion ? 100 : 900);
    };

    methodButtons.forEach(btn => btn.addEventListener('click', () => { if (sending || requestOk) return; method = btn.dataset.method; render(); sfx('click'); }));
    pathButtons.forEach(btn => btn.addEventListener('click', () => { if (sending || requestOk) return; path = btn.dataset.path; render(); sfx('click'); }));
    queryButtons.forEach(btn => btn.addEventListener('click', () => { if (sending || requestOk) return; query = btn.dataset.query; render(); sfx('click'); }));
    send.addEventListener('click', sendRequest);

    stepButtons.forEach(btn => btn.addEventListener('click', () => {
      if (!requestOk || sequenceStage >= 3) return;
      const order = Number(btn.dataset.order);
      if (order !== sequenceStage + 1) {
        setFeedback(feedback, '顺序不对。先由设备发出请求。', 'warn');
        sequenceStage = 0;
        render();
        sfx('error');
        return;
      }
      sequenceStage = order;
      render();
      sfx('click');
      const labels = ['设备发出请求', '服务器处理请求', '服务器返回响应'];
      if (sequenceStage === 3) {
        setFeedback(feedback, '三步走完：设备发出请求，服务器处理，再把响应送回设备。HTTP 就是这样完成一次数据交换。', 'ok');
        if (grant('l3-http', '走完一次 HTTP 请求与响应')) {
          toast('HTTP 快线完成', '请求 → 处理 → 响应', '#ffc857');
        }
      } else {
        setFeedback(feedback, `第 ${sequenceStage} 步正确：${labels[sequenceStage - 1]}。`, 'ok');
      }
    }));

    if (already) {
      $('#l3HttpState', root).textContent = '200 OK';
      $('#l3HttpCode', root).textContent = '200 OK';
      $('#l3HttpResponse', root).textContent = `{
  "status": "ok",
  "temp": 18,
  "humidity": 42
}`;
      setFeedback(feedback, '三步走完：设备发出请求，服务器处理，再把响应送回设备。HTTP 就是这样完成一次数据交换。', 'ok');
    }
    render();
  }

  /* ========================================================================
     04 · 负载实验
     ======================================================================== */

  const LIMIT_ISSUES = [
    { id: 'resource', label: '占用设备资源', note: '内存、电量被反复请求消耗' },
    { id: 'energy', label: '能耗增加', note: '电池设备撑不了多久' },
    { id: 'network', label: '服务器与网络负担', note: '大量请求同时涌入' },
    { id: 'security', label: '数据更安全', note: '这并不解决协议负载问题' },
    { id: 'picture', label: '画面更清晰', note: '和通信效率无关' }
  ];

  function initLimit(forceReplay = false) {
    const root = mount('l3LimitMount', `
      <div class="l3-lab tech-panel">
        <div class="l3-lab-head">
          <div><span class="l3-kicker">LOAD LAB / 轮询实验</span><h3>每台设备都来问一遍</h3></div>
          <span class="l3-status-tag" id="l3LimitState">待运行</span>
        </div>
        <figure class="l3-photo-banner is-compact">
          <img src="${PHOTO.server}" alt="真实的机房服务器机柜" loading="lazy" decoding="async">
          <figcaption><b>真实机房</b><span>成千上万台设备的轮询，最后都会压到服务器和网络上。</span></figcaption>
        </figure>
        <div class="l3-limit-grid">
          <div class="l3-limit-control">
            <span class="l3-mini-label">设备数量</span>
            <div class="l3-segment" id="l3LimitDevices">
              <button class="l3-option" type="button" data-devices="20">20 台</button>
              <button class="l3-option is-active" type="button" data-devices="200">200 台</button>
              <button class="l3-option" type="button" data-devices="500">500 台</button>
            </div>
            <span class="l3-mini-label">轮询间隔</span>
            <div class="l3-segment" id="l3LimitIntervals">
              <button class="l3-option is-active" type="button" data-interval="1">1 秒</button>
              <button class="l3-option" type="button" data-interval="5">5 秒</button>
              <button class="l3-option" type="button" data-interval="30">30 秒</button>
            </div>
            <button class="btn btn-primary btn-small" id="l3LimitRun" type="button">运行 10 秒轮询</button>
            <p class="l3-hint">HTTP 模式下，设备要不断主动问服务器：“有新的指令吗？”</p>
          </div>
          <div class="l3-gauges">
            <div class="l3-gauge"><span>10 秒请求次数</span><b id="l3LimitRequests">0</b><div class="l3-gauge-bar"><i id="l3LimitReqBar"></i></div></div>
            <div class="l3-gauge"><span>服务器负载</span><b id="l3LimitLoad">0%</b><div class="l3-gauge-bar is-hot"><i id="l3LimitLoadBar"></i></div></div>
            <div class="l3-gauge"><span>设备能耗</span><b id="l3LimitEnergy">低</b><div class="l3-gauge-bar is-warm"><i id="l3LimitEnergyBar"></i></div></div>
          </div>
        </div>
        <div class="l3-poll-log" id="l3LimitLog">等待实验：运行后观察请求数量和负载。</div>
        <div class="l3-issues">
          <p class="l3-instruction">③ 运行后，点出 3 个 HTTP 瓶颈。</p>
          <div class="l3-issue-grid" id="l3LimitIssues">
            ${LIMIT_ISSUES.map(item => `<button class="l3-issue" type="button" data-issue="${item.id}"><b>${item.label}</b><small>${item.note}</small></button>`).join('')}
          </div>
        </div>
        <div class="l3-feedback" id="l3LimitFeedback" aria-live="polite">先用默认参数运行一次。</div>
      </div>
    `);
    if (!root) return;
    addRetry(root, 'limit');

    const already = has('l3-limit') && !forceReplay;
    let devices = already ? 500 : 200;
    let interval = 1;
    let hasRun = already;
    let running = false;
    const selectedIssues = new Set(already ? ['resource', 'energy', 'network'] : []);
    const feedback = $('#l3LimitFeedback', root);

    const deviceButtons = $$('#l3LimitDevices .l3-option', root);
    const intervalButtons = $$('#l3LimitIntervals .l3-option', root);
    const issueButtons = $$('#l3LimitIssues .l3-issue', root);
    const run = $('#l3LimitRun', root);

    const renderControls = () => {
      deviceButtons.forEach(btn => btn.classList.toggle('is-active', Number(btn.dataset.devices) === devices));
      intervalButtons.forEach(btn => btn.classList.toggle('is-active', Number(btn.dataset.interval) === interval));
      run.disabled = running;
      issueButtons.forEach(btn => {
        const active = selectedIssues.has(btn.dataset.issue);
        btn.classList.toggle('is-picked', active);
        btn.disabled = !hasRun || active || selectedIssues.size >= 3;
        if (selectedIssues.has(btn.dataset.issue)) btn.classList.add('is-picked');
      });
    };

    const setGauges = (requests, load, energyText, energyPct) => {
      $('#l3LimitRequests', root).textContent = String(requests);
      $('#l3LimitLoad', root).textContent = `${load}%`;
      $('#l3LimitEnergy', root).textContent = energyText;
      $('#l3LimitReqBar', root).style.width = `${Math.min(100, requests / 50)}%`;
      $('#l3LimitLoadBar', root).style.width = `${load}%`;
      $('#l3LimitEnergyBar', root).style.width = `${energyPct}%`;
    };

    const runExperiment = () => {
      if (running) return;
      running = true;
      hasRun = false;
      selectedIssues.clear();
      $('#l3LimitState', root).textContent = '轮询中…';
      renderControls();
      const requests = Math.round(devices * (10 / interval));
      const load = Math.min(100, Math.round(requests / 50));
      const energyPct = Math.min(100, Math.round(devices / 5));
      const energyText = energyPct >= 70 ? '高' : energyPct >= 30 ? '中' : '低';
      $('#l3LimitLog', root).textContent = `${devices} 台设备，每 ${interval} 秒请求一次\n` +
        `10 秒内约 ${requests} 次请求\n` +
        `每台设备都在问：“有新的指令吗？”`;
      setFeedback(feedback, '实验运行中，观察三条仪表。', 'warn');
      const started = performance.now();
      const duration = reduceMotion ? 60 : 850;
      const tick = now => {
        const progress = Math.min(1, (now - started) / duration);
        setGauges(Math.round(requests * progress), Math.round(load * progress), energyText, Math.round(energyPct * progress));
        if (progress < 1) {
          requestAnimationFrame(tick);
          return;
        }
        running = false;
        hasRun = true;
        $('#l3LimitState', root).textContent = '实验完成';
        setFeedback(feedback, `${devices} 台设备在 10 秒内发出约 ${requests} 次请求。现在点出 3 个瓶颈。`, 'ok');
        renderControls();
        sfx('success');
      };
      requestAnimationFrame(tick);
    };

    deviceButtons.forEach(btn => btn.addEventListener('click', () => {
      if (running) return;
      devices = Number(btn.dataset.devices);
      renderControls();
      sfx('click');
    }));
    intervalButtons.forEach(btn => btn.addEventListener('click', () => {
      if (running) return;
      interval = Number(btn.dataset.interval);
      renderControls();
      sfx('click');
    }));
    run.addEventListener('click', runExperiment);

    issueButtons.forEach(btn => btn.addEventListener('click', () => {
      if (!hasRun) {
        setFeedback(feedback, '先运行一次实验，再判断瓶颈。', 'warn');
        sfx('error');
        return;
      }
      const issue = LIMIT_ISSUES.find(item => item.id === btn.dataset.issue);
      if (['resource', 'energy', 'network'].includes(issue.id)) {
        selectedIssues.add(issue.id);
        btn.classList.add('is-picked');
        renderControls();
        sfx('success');
        if (selectedIssues.size === 3) {
          setFeedback(feedback, '三个瓶颈都找到了：占用设备资源、能耗增加、服务器和网络负担。HTTP 擅长互联网应用，但物联场景需要更轻的协议。', 'ok');
          if (grant('l3-limit', '找出 HTTP 在物联场景的瓶颈')) {
            toast('负载实验完成', 'HTTP 不适合高频轮询', '#ffc857');
          }
        } else {
          setFeedback(feedback, `已找到 ${selectedIssues.size} / 3 个瓶颈。`, 'ok');
        }
      } else {
        setFeedback(feedback, `「${issue.label}」不是 HTTP 轮询造成的瓶颈。`, 'warn');
        btn.classList.add('is-wrong');
        window.setTimeout(() => btn.classList.remove('is-wrong'), 380);
        sfx('error');
      }
    }));

    if (already) {
      const requests = Math.round(500 * 10);
      setGauges(requests, 100, '高', 100);
      $('#l3LimitState', root).textContent = '实验完成';
      $('#l3LimitLog', root).textContent = `500 台设备，每 1 秒请求一次\n10 秒内约 5000 次请求\n每台设备都在问：“有新的指令吗？”`;
      setFeedback(feedback, '三个瓶颈都找到了：占用设备资源、能耗增加、服务器和网络负担。HTTP 擅长互联网应用，但物联场景需要更轻的协议。', 'ok');
    }
    renderControls();
  }

  /* ========================================================================
     05 · 协议匹配
     ======================================================================== */

  const FEATURES = [
    { id: 'low-power', title: '低功耗', note: '电池供电，能省一点是一点。' },
    { id: 'low-bandwidth', title: '低带宽', note: '网络窄，只传必要的数据。' },
    { id: 'low-latency', title: '低延时', note: '指令要快，毫秒级响应。' },
    { id: 'compatibility', title: '兼容性', note: '不同品牌、不同设备能互通。' }
  ];
  const SCENARIOS = [
    { id: 'water', title: '智能水表', text: '电池供电，装一次要用 5 年。', answer: 'low-power', tag: 'SCENE 01', photo: 'water' },
    { id: 'farm', title: '农田传感器', text: '只有窄带网络，每次只传土壤湿度。', answer: 'low-bandwidth', tag: 'SCENE 02', photo: 'soil' },
    { id: 'arm', title: '工业机械臂', text: '检测到人靠近，必须毫秒级停下。', answer: 'low-latency', tag: 'SCENE 03', photo: 'robot' },
    { id: 'home', title: '多品牌家居', text: '不同厂商的灯、锁、空调要联动。', answer: 'compatibility', tag: 'SCENE 04', photo: 'home' }
  ];

  function initFeature(forceReplay = false) {
    const root = mount('l3FeatureMount', `
      <div class="l3-lab tech-panel">
        <div class="l3-lab-head">
          <div><span class="l3-kicker">PROTOCOL MATCH / 协议匹配</span><h3>把要求放进真实场景</h3></div>
          <span class="l3-counter" id="l3FeatureCount">0 / 4</span>
        </div>
        <p class="l3-instruction">先点一个协议要求，再点最需要它的场景。</p>
        <div class="l3-feature-grid">
          <div class="l3-req-panel" id="l3FeatureReqs">
            ${FEATURES.map(item => `<button class="l3-req-card" type="button" data-req="${item.id}"><b>${item.title}</b><small>${item.note}</small></button>`).join('')}
          </div>
          <div class="l3-scenario-grid" id="l3FeatureScenarios">
            ${SCENARIOS.map(item => `<button class="l3-scenario" type="button" data-scenario="${item.id}"><span class="l3-scenario-photo"><img src="${PHOTO[item.photo]}" alt="${item.title}的真实场景" loading="lazy" decoding="async"></span><span>${item.tag}</span><b>${item.title}</b><small>${item.text}</small><em>选择场景</em></button>`).join('')}
          </div>
        </div>
        <div class="l3-feedback" id="l3FeatureFeedback" aria-live="polite">物联协议不是一条协议，而是一组更适合设备的设计要求。</div>
      </div>
    `);
    if (!root) return;
    addRetry(root, 'feature');

    let selectedReq = null;
    const already = has('l3-feature') && !forceReplay;
    const matched = new Set(already ? FEATURES.map(item => item.id) : []);
    const feedback = $('#l3FeatureFeedback', root);
    const reqButtons = $$('#l3FeatureReqs .l3-req-card', root);
    const scenarioButtons = $$('#l3FeatureScenarios .l3-scenario', root);

    const render = () => {
      reqButtons.forEach(btn => {
        const active = btn.dataset.req === selectedReq;
        const done = matched.has(btn.dataset.req);
        btn.classList.toggle('is-selected', active);
        btn.classList.toggle('is-matched', done);
        btn.disabled = done;
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      scenarioButtons.forEach(btn => {
        const scenario = SCENARIOS.find(item => item.id === btn.dataset.scenario);
        const done = matched.has(scenario.answer);
        btn.classList.toggle('is-matched', done);
        btn.disabled = done;
      });
      $('#l3FeatureCount', root).textContent = `${matched.size} / 4`;
    };

    reqButtons.forEach(btn => btn.addEventListener('click', () => {
      if (btn.disabled) return;
      selectedReq = btn.dataset.req;
      render();
      sfx('click');
      const item = FEATURES.find(entry => entry.id === selectedReq);
      setFeedback(feedback, `已选「${item.title}」，哪个场景最需要它？`);
    }));

    scenarioButtons.forEach(btn => btn.addEventListener('click', () => {
      if (btn.disabled) return;
      if (!selectedReq) {
        setFeedback(feedback, '先点左侧的一个协议要求。', 'warn');
        sfx('error');
        return;
      }
      const scenario = SCENARIOS.find(item => item.id === btn.dataset.scenario);
      if (scenario.answer !== selectedReq) {
        btn.classList.add('is-wrong');
        window.setTimeout(() => btn.classList.remove('is-wrong'), 400);
        setFeedback(feedback, `「${scenario.title}」最需要的不是这个要求，再想想。`, 'warn');
        sfx('error');
        return;
      }
      const feature = FEATURES.find(item => item.id === selectedReq);
      matched.add(feature.id);
      selectedReq = null;
      render();
      sfx('success');
      setFeedback(feedback, `匹配成功：${scenario.title} → ${feature.title}。`, 'ok');
      if (matched.size === FEATURES.length) {
        setFeedback(feedback, '四组匹配完成：低功耗、低带宽、低延时、兼容性，就是物联协议的四个关键词。', 'ok');
        if (grant('l3-feature', '匹配物联协议的四个要求')) {
          toast('协议匹配完成', '物联协议按场景取舍', '#ffc857');
        }
      }
    }));

    if (already) {
      setFeedback(feedback, '四组匹配完成：低功耗、低带宽、低延时、兼容性，就是物联协议的四个关键词。', 'ok');
    }
    render();
  }

  /* ========================================================================
     06 · 协议决策
     ======================================================================== */

  const QUIZ = [
    {
      id: 'q1',
      text: '物联网发展前期，沿用了哪种互联网协议？',
      options: [['http', 'HTTP'], ['api', 'API'], ['html', 'HTML']],
      answer: 'http'
    },
    {
      id: 'q2',
      text: '设备通过什么从互联网服务器取数据？',
      options: [['api', 'API'], ['battery', '电池'], ['screen', '屏幕']],
      answer: 'api'
    },
    {
      id: 'q3',
      text: 'HTTP 用于大量物联设备时，主要问题不包括？',
      options: [['resource', '占用设备资源'], ['energy', '增加能耗'], ['clear', '画面更清晰']],
      answer: 'clear'
    }
  ];
  const REASONS = [
    { id: 'low-power', label: '低功耗' },
    { id: 'low-bandwidth', label: '低带宽' },
    { id: 'low-latency', label: '低延时' },
    { id: 'compatibility', label: '兼容性' }
  ];

  function initChoice(forceReplay = false) {
    const root = mount('l3ChoiceMount', `
      <div class="l3-lab tech-panel">
        <div class="l3-lab-head">
          <div><span class="l3-kicker">PROTOCOL DECISION / 协议决策</span><h3>给校园农场选一条通信路线</h3></div>
          <span class="l3-status-tag" id="l3ChoiceState">待答题</span>
        </div>
        <div class="l3-quiz-grid" id="l3ChoiceQuiz">
          ${QUIZ.map((item, index) => `
            <article class="l3-quiz-card" data-question="${item.id}">
              <span>0${index + 1} / 判断题</span>
              <h4>${item.text}</h4>
              <div class="l3-quiz-options">
                ${item.options.map(([value, label]) => `<button class="l3-option" type="button" data-answer="${value}">${label}</button>`).join('')}
              </div>
            </article>`).join('')}
        </div>
        <div class="l3-case" id="l3Case" hidden>
          <div class="l3-case-copy">
            <span class="l3-kicker">FIELD CASE / 真实场景</span>
            <h4>校园智慧农场</h4>
            <p>土壤传感器靠电池供电，网络信号弱，每 10 分钟上报一次湿度。选哪种协议？</p>
            <div class="l3-case-photo is-pair">
              <img src="${PHOTO.greenhouse}" alt="真实的温室大棚场景" loading="lazy" decoding="async">
              <img src="${PHOTO.farm}" alt="真实的农田灌溉场景" loading="lazy" decoding="async">
              <span>真实农业场景 · 图片来源 Wikimedia Commons</span>
            </div>
          </div>
          <div class="l3-case-controls">
            <span class="l3-mini-label">协议方案</span>
            <div class="l3-segment" id="l3ChoiceProtocols">
              <button class="l3-option" type="button" data-protocol="http">HTTP</button>
              <button class="l3-option" type="button" data-protocol="iot">物联协议</button>
            </div>
            <span class="l3-mini-label">选择 2 条理由</span>
            <div class="l3-reason-row" id="l3ChoiceReasons">
              ${REASONS.map(item => `<button class="l3-reason" type="button" data-reason="${item.id}">${item.label}</button>`).join('')}
            </div>
            <button class="btn btn-primary btn-small" id="l3ChoiceSubmit" type="button" disabled>提交协议方案</button>
          </div>
        </div>
        <div class="l3-feedback" id="l3ChoiceFeedback" aria-live="polite">先答对 3 道判断题，再进入农场场景。</div>
        <div class="l3-finish" id="l3Finish" hidden>
          <span class="l3-finish-mark">✓</span>
          <span class="l3-kicker">LESSON 09 COMPLETE</span>
          <h3>协议选对了，设备才能长久在线。</h3>
          <p>6 个任务完成：互联网数据、API、HTTP、负载、协议要求、场景决策。</p>
          <div class="l3-finish-badges" id="l3FinishBadges"></div>
          <div class="l3-finish-actions">
            <button class="btn btn-primary btn-small" type="button" data-l3-retry="choice">重做本任务</button>
            <button class="btn btn-ghost btn-small" type="button" data-l3-back="2">查看七年级第2课</button>
            <button class="btn btn-ghost btn-small" type="button" data-l3-back="1">查看七年级第1课</button>
          </div>
        </div>
      </div>
    `);
    if (!root) return;
    addRetry(root, 'choice');

    const completed = has('l3-choice') && !forceReplay;
    let quizDone = completed ? 3 : 0;
    let protocol = completed ? 'iot' : '';
    const reasons = new Set(completed ? ['low-power', 'low-bandwidth'] : []);
    const feedback = $('#l3ChoiceFeedback', root);

    const quizCards = $$('#l3ChoiceQuiz .l3-quiz-card', root);
    const protocolButtons = $$('#l3ChoiceProtocols .l3-option', root);
    const reasonButtons = $$('#l3ChoiceReasons .l3-reason', root);
    const submit = $('#l3ChoiceSubmit', root);

    const renderQuiz = () => {
      quizCards.forEach(card => {
        const answered = card.dataset.done === 'true';
        card.classList.toggle('is-done', answered);
      });
    };

    const renderCase = () => {
      const revealed = quizDone === 3;
      $('#l3Case', root).hidden = !revealed;
      protocolButtons.forEach(btn => {
        const active = btn.dataset.protocol === protocol;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        btn.disabled = !revealed || completed;
      });
      reasonButtons.forEach(btn => {
        const active = reasons.has(btn.dataset.reason);
        btn.classList.toggle('is-picked', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        btn.disabled = !revealed || completed;
      });
      submit.disabled = !revealed || !protocol || reasons.size !== 2 || completed;
    };

    quizCards.forEach(card => {
      const question = QUIZ.find(item => item.id === card.dataset.question);
      const buttons = $$('.l3-option', card);
      buttons.forEach(btn => btn.addEventListener('click', () => {
        if (card.dataset.done === 'true' || completed) return;
        if (btn.dataset.answer !== question.answer) {
          btn.classList.add('is-wrong');
          window.setTimeout(() => btn.classList.remove('is-wrong'), 380);
          setFeedback(feedback, '这题不对，再选一次。', 'warn');
          sfx('error');
          return;
        }
        card.dataset.done = 'true';
        buttons.forEach(item => { item.disabled = true; });
        btn.classList.add('is-correct');
        quizDone += 1;
        renderQuiz();
        renderCase();
        sfx('success');
        if (quizDone === 3) {
          $('#l3ChoiceState', root).textContent = '进入场景';
          setFeedback(feedback, '判断题完成。现在给校园农场选协议，并点 2 条理由。', 'ok');
        } else {
          setFeedback(feedback, `答对 ${quizDone} / 3 题。`, 'ok');
        }
      }));
    });

    protocolButtons.forEach(btn => btn.addEventListener('click', () => {
      if (completed) return;
      protocol = btn.dataset.protocol;
      renderCase();
      sfx('click');
    }));

    reasonButtons.forEach(btn => btn.addEventListener('click', () => {
      if (completed) return;
      const id = btn.dataset.reason;
      const label = REASONS.find(item => item.id === id)?.label || '理由';
      if (reasons.has(id)) {
        reasons.delete(id);
        setFeedback(feedback, `已取消「${label}」，可以重新选择。`);
      } else if (reasons.size < 2) {
        reasons.add(id);
        setFeedback(feedback, `已选「${label}」。再选 1 条理由。`);
      } else {
        const replaced = REASONS.find(item => item.id === [...reasons][0])?.label || '理由';
        reasons.delete([...reasons][0]);
        reasons.add(id);
        setFeedback(feedback, `已用「${label}」替换「${replaced}」，可直接换到正确答案。`);
      }
      renderCase();
      sfx('click');
    }));

    submit.addEventListener('click', () => {
      if (protocol === 'iot' && reasons.has('low-power') && reasons.has('low-bandwidth')) {
        setFeedback(feedback, '方案正确：电池供电、弱网环境，优先低功耗和低带宽。HTTP 仍可用在互联网侧，但物联设备需要更轻的协议。', 'ok');
        if (grant('l3-choice', '为校园农场选出合适协议')) {
          toast('八年级第9课完成', 'API、HTTP、物联协议，全部打通', '#ffc857');
        }
        renderCase();
        showFinish();
        return;
      }
      reasonButtons.forEach(btn => {
        if (reasons.has(btn.dataset.reason)) btn.classList.add('is-wrong');
      });
      window.setTimeout(() => reasonButtons.forEach(btn => btn.classList.remove('is-wrong')), 650);
      if (protocol === 'http') {
        setFeedback(feedback, 'HTTP 能让设备取数，但高频轮询会消耗电池和网络。再选一次；理由可直接点选替换。', 'warn');
      } else {
        setFeedback(feedback, '协议方向对了，但理由要选“低功耗”和“低带宽”。直接点其他理由即可替换。', 'warn');
      }
      sfx('error');
    });

    function showFinish() {
      const finish = $('#l3Finish', root);
      if (!finish) return;
      finish.hidden = false;
      $('#l3ChoiceState', root).textContent = '第9课完成';
      $('#l3FinishBadges', root).innerHTML = BADGE_META.map(item => `<span><i>${item.icon}</i>${item.title}</span>`).join('');
      finish.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }

    $$('[data-l3-back]', root).forEach(btn => {
      btn.addEventListener('click', () => API.setCourse(Number(btn.dataset.l3Back) || 1, { bridge: true }));
    });

    if (completed) {
      quizCards.forEach(card => {
        card.dataset.done = 'true';
        $$('.l3-option', card).forEach(btn => {
          btn.disabled = true;
          const q = QUIZ.find(item => item.id === card.dataset.question);
          if (btn.dataset.answer === q.answer) btn.classList.add('is-correct');
        });
      });
      setFeedback(feedback, '方案正确：电池供电、弱网环境，优先低功耗和低带宽。HTTP 仍可用在互联网侧，但物联设备需要更轻的协议。', 'ok');
      showFinish();
    }
    renderQuiz();
    renderCase();
  }

  function initRetryButtons() {
    const resets = {
      data: () => initData(true),
      api: () => initApi(true),
      http: () => initHttp(true),
      limit: () => initLimit(true),
      feature: () => initFeature(true),
      choice: () => initChoice(true)
    };
    const resetAll = () => {
      Object.values(resets).forEach(reset => reset());
      sfx('success');
      toast('第9课已重置', '六个任务都可重新操作；不重复加分', '#ffc857');
      window.setTimeout(() => {
        document.querySelector('#l3-data')?.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'start'
        });
      }, 120);
    };
    window.Lesson3ReplayAll = resetAll;
    document.addEventListener('click', event => {
      const all = event.target.closest('[data-l3-replay-all]');
      if (all) {
        resetAll();
        return;
      }
      const button = event.target.closest('[data-l3-retry]');
      if (!button) return;
      const reset = resets[button.dataset.l3Retry];
      if (!reset) return;
      reset();
      sfx('click');
      toast('已重置本任务', '可以重新操作；本次练习不重复加分', '#ffc857');
    });
  }

  function initAll() {
    initRetryButtons();
    initData();
    initApi();
    initHttp();
    initLimit();
    initFeature();
    initChoice();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }
})();


