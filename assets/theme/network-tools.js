/* 按用户操作查询公网 IP 与真实 ICMP 探针；不在页面加载时发出测量请求。 */
(() => {
  const root = document.querySelector('[data-network-tools]');
  if (!root) return;
  const $ = id => document.getElementById(id);
  const node = (tag, value, className) => {
    const el = document.createElement(tag);
    if (value != null) el.textContent = String(value);
    if (className) el.className = className;
    return el;
  };
  const shown = value => value == null || value === '' ? '—' : String(value);
  const metric = (value, unit) => typeof value === 'number' && Number.isFinite(value) ? `${Number(value.toFixed(2))}${unit}` : '—';
  function address(value) {
    const raw = value.trim().replace(/^\[([^\]]+)\]$/, '$1');
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(raw)) {
      const parts = raw.split('.');
      if (parts.some(p => Number(p) > 255 || (p.length > 1 && p[0] === '0'))) return '';
      return parts.join('.');
    }
    if (raw.includes(':') && /^[0-9a-f:.]+$/i.test(raw)) {
      try { return new URL(`https://[${raw}]/`).hostname.slice(1, -1); } catch { return ''; }
    }
    return '';
  }
  function publicAddress(ip) {
    if (ip.includes(':')) return !/^(::|::1|f[cd]|fe[89ab]|ff|2001:db8|::ffff:)/i.test(ip);
    const [a,b,c] = ip.split('.').map(Number);
    return !(a === 0 || a === 10 || a === 127 || a >= 224 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && (b === 168 || b === 0 || (b === 0 && c === 2))) || (a === 100 && b >= 64 && b <= 127) || (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) || (a === 203 && b === 0 && c === 113));
  }
  function target(value) {
    const raw = value.trim();
    const ip = address(raw);
    if (ip) {
      if (!publicAddress(ip)) throw new Error('请输入公网 IP；内网、回环和保留地址不能用于此测试。');
      return ip;
    }
    if (!raw || raw.length > 253 || /[\s/@:#?\\]/.test(raw) || /^\d+(\.\d+)*$/.test(raw)) throw new Error('请输入有效域名或公网 IP，不要包含协议、路径或端口。');
    let host;
    try { host = new URL(`https://${raw}/`).hostname.replace(/\.$/, '').toLowerCase(); } catch { throw new Error('域名格式不正确。'); }
    if (!host.includes('.') || !host.split('.').every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(label))) throw new Error('请输入完整的公网域名，例如 example.com。');
    return host;
  }
  async function request(url, init, parentSignal) {
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (parentSignal.aborted) controller.abort();
    parentSignal.addEventListener('abort', abort, {once:true});
    const timer = setTimeout(abort, 15000);
    try {
      const response = await fetch(url, {...init, credentials:'omit', referrerPolicy:'no-referrer', signal:controller.signal});
      if (response.status === 429) {
        const wait = response.headers.get('Retry-After');
        throw new Error(`服务请求次数已达上限，请${wait && /^\d+$/.test(wait) ? `在 ${wait} 秒后` : '稍后'}再试。`);
      }
      if (!response.ok) throw new Error(`服务暂时无法完成请求（HTTP ${response.status}），请检查目标或稍后再试。`);
      return await response.json();
    } catch (error) {
      if (parentSignal.aborted) throw new DOMException('Stopped', 'AbortError');
      if (error.name === 'AbortError') throw new Error('请求超时，请检查网络或稍后重试。');
      if (error instanceof TypeError) throw new Error('无法连接查询服务，请检查网络、浏览器拦截设置或稍后重试。');
      throw error;
    } finally {
      clearTimeout(timer);
      parentSignal.removeEventListener('abort', abort);
    }
  }
  function status(el, text, error = false) {
    el.textContent = text;
    el.classList.toggle('tool-error', error);
  }
  const ipForm = $('ip-lookup-form'), ipResult = $('ip-result'), ipStatus = $('ip-status');
  async function queryIp(self) {
    if (root.dataset.toolsPreview === "restricted") return;
    if (ipForm.getAttribute("aria-busy") === "true") return;
    const raw = self ? '' : $('ip-query').value.trim();
    const ip = raw ? address(raw) : '';
    if (raw && (!ip || !publicAddress(ip))) {
      ipResult.hidden = true; status(ipStatus, '请输入有效的公网 IPv4 或 IPv6 地址。', true); return;
    }
    const controls = [...ipForm.querySelectorAll('button')];
    controls.forEach(b => b.disabled = true);
    ipForm.setAttribute('aria-busy', 'true');
    ipResult.hidden = true; ipResult.replaceChildren();
    status(ipStatus, '正在查询 IP 资料…');
    try {
      let data, source = 'ipwho.is';
      try {
        data = await request(`https://ipwho.is/${ip ? encodeURIComponent(ip) : ''}?lang=zh-CN&fields=ip,success,message,type,country,country_code,region,city,connection,timezone`, {}, new AbortController().signal);
        if (data.success !== true) throw new Error('主查询服务未返回结果。');
      } catch {
        status(ipStatus, '正在使用备用 IP 查询服务…');
        const backup = await request(`https://api.ip.sb/geoip${ip ? '/' + encodeURIComponent(ip) : ''}`, {}, new AbortController().signal);
        if (!backup.ip) throw new Error('IP 查询服务暂时不可用，请稍后重试。');
        source = 'IP.sb（备用）';
        data = {ip:backup.ip, type:backup.ip.includes(':') ? 'IPv6' : 'IPv4', country:backup.country, region:backup.region, city:backup.city, connection:{isp:backup.isp, org:backup.organization || backup.asn_organization, asn:backup.asn}, timezone:{id:backup.timezone}};
      }
      const heading = node('div', data.ip, 'tool-ip-address');
      const list = node('dl', null, 'tool-result-grid');
      for (const [label, value] of [
        ['地址类型', data.type], ['国家 / 地区', data.country], ['省 / 州', data.region], ['城市', data.city],
        ['运营商 ISP', data.connection?.isp], ['网络组织', data.connection?.org],
        ['自治系统 ASN', data.connection?.asn == null ? null : `AS${data.connection.asn}`], ['时区', data.timezone?.id]
      ]) {
        const row = node('div'); row.append(node('dt', label), node('dd', shown(value))); list.append(row);
      }
      ipResult.append(heading, list, node('p', `查询时间：${new Date().toLocaleString('zh-CN')} · 来源：${source}。地理位置为数据库估计。`, 'tool-note'));
      ipResult.hidden = false;
      status(ipStatus, '查询完成。');
    } catch (error) { status(ipStatus, error.message, true); }
    finally { controls.forEach(b => b.disabled = false); ipForm.removeAttribute('aria-busy'); }
  }
  ipForm.addEventListener('submit', event => { event.preventDefault(); queryIp(false); });
  $('ip-submit').addEventListener('click', () => queryIp(false));
  $('ip-query').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); queryIp(false); } });
  $('ip-self').addEventListener('click', () => queryIp(true));

  const pingForm = $('ping-form'), pingStatus = $('ping-status'), pingResult = $('ping-result');
  let active = null;
  const pause = (ms, signal) => new Promise((resolve, reject) => {
    const finish = () => { signal.removeEventListener('abort', cancel); resolve(); };
    const timer = setTimeout(finish, ms);
    const cancel = () => { clearTimeout(timer); signal.removeEventListener('abort', cancel); reject(new DOMException('Stopped', 'AbortError')); };
    signal.addEventListener('abort', cancel, {once:true});
    if (signal.aborted) cancel();
  });
  function renderPing(data, id, testedTarget) {
    pingResult.replaceChildren(); pingResult.hidden = false;
    const results = Array.isArray(data.results) ? data.results : [];
    const wrap = node('div', null, 'tool-table-wrap'), table = node('table');
    table.append(node('caption', `目标 ${testedTarget} · ICMP Ping 实时探针结果`));
    const head = node('thead'), hr = node('tr');
    for (const text of ['探针位置 / 网络', '解析地址', '平均延迟', '最小 / 最大', '丢包率', '状态']) {
      const th = node('th', text); th.scope = 'col'; hr.append(th);
    }
    head.append(hr); table.append(head);
    const body = node('tbody');
    let done = 0;
    for (const item of results) {
      const p = item.probe || {}, r = item.result || {}, s = r.stats || {};
      if (r.status !== 'in-progress') done++;
      const tr = node('tr'), location = node('td');
      location.append(node('strong', [p.city, p.country].filter(Boolean).join(' · ') || '未知位置'), node('small', shown(p.network)));
      const state = r.status === 'in-progress' ? '测量中' : r.status === 'finished' ? (s.rcv > 0 ? '完成' : '无响应') : '失败';
      tr.append(location, node('td', shown(r.resolvedAddress)), node('td', metric(s.avg, ' ms')), node('td', `${metric(s.min, ' ms')} / ${metric(s.max, ' ms')}`), node('td', metric(s.loss, '%')), node('td', state)); body.append(tr);
    }
    if (!results.length) { const tr = node('tr'), td = node('td', '探针正在准备结果…'); td.colSpan = 6; tr.append(td); body.append(tr); }
    table.append(body); wrap.append(table);
    pingResult.append(node('p', `${testedTarget} · ${done} / ${data.probesCount || results.length} 个探针已返回结果`, 'tool-summary'), wrap);
    for (const item of results) {
      if (!item.result?.rawOutput) continue;
      const details = node('details'), p = item.probe || {};
      details.append(node('summary', `原始输出 · ${[p.city,p.country].filter(Boolean).join(' · ')}`), node('pre', item.result.rawOutput)); pingResult.append(details);
    }
    const link = node('a', '查看原始测量数据 ↗');
    link.href = `https://api.globalping.io/v1/measurements/${encodeURIComponent(id)}`; link.target = '_blank'; link.rel = 'noopener noreferrer';
    pingResult.append(link, node('p', '延迟与丢包来自远程探针，不能直接代表你当前设备的连接质量。', 'tool-note'));
  }
  $('ping-stop').addEventListener('click', () => active?.abort());
  async function runPing() {
    if (root.dataset.toolsPreview === "restricted") return;
    if (active) return;
    let testedTarget;
    try { testedTarget = target($('ping-target').value); } catch (error) { status(pingStatus, error.message, true); return; }
    const controller = new AbortController(); active = controller;
    $('ping-start').disabled = true; $('ping-stop').disabled = false;
    pingForm.setAttribute('aria-busy', 'true');
    pingResult.hidden = true; pingResult.replaceChildren();
    status(pingStatus, '正在分配探针并发起 ICMP 测量…');
    let measurementId = '';
    try {
      const payload = {type:'ping', target:testedTarget, limit:3, inProgressUpdates:true, measurementOptions:{packets:3, protocol:'ICMP'}};
      const continent = {asia:'AS', europe:'EU', 'north-america':'NA'}[$('ping-location').value];
      if (continent) payload.locations = [{continent}];
      const created = await request('https://api.globalping.io/v1/measurements', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)}, controller.signal);
      if (!created.id || !/^[a-z0-9_-]+$/i.test(created.id)) throw new Error('服务未返回有效测量编号，请稍后再试。');
      measurementId = created.id;
      const started = performance.now();
      while (performance.now() - started < 45000) {
        const data = await request(`https://api.globalping.io/v1/measurements/${encodeURIComponent(measurementId)}`, {}, controller.signal);
        renderPing(data, measurementId, testedTarget);
        if (data.status !== 'in-progress') {
          status(pingStatus, data.status === 'finished' ? '测试完成，请结合探针位置查看结果。' : '测量已结束，部分探针可能失败。'); return;
        }
        status(pingStatus, '正在等待探针返回结果…');
        await pause(1200, controller.signal);
      }
      status(pingStatus, '等待已超时，已保留收到的结果。可通过原始测量数据链接稍后查看。', true);
    } catch (error) {
      status(pingStatus, controller.signal.aborted ? '已停止等待；远程已提交的测量仍可能继续完成。' : error.message, !controller.signal.aborted);
      if (measurementId && pingResult.hidden) {
        const link = node('a', '查看已提交测量的原始数据 ↗'); link.href = `https://api.globalping.io/v1/measurements/${encodeURIComponent(measurementId)}`; link.target='_blank'; link.rel='noopener noreferrer'; pingResult.append(link); pingResult.hidden=false;
      }
    } finally {
      active = null; $('ping-start').disabled = false; $('ping-stop').disabled = true; pingForm.removeAttribute('aria-busy');
    }
  }
  pingForm.addEventListener('submit', event => { event.preventDefault(); runPing(); });
  $('ping-start').addEventListener('click', runPing);
  $('ping-target').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); runPing(); } });
  if (/\/api\/v1\/blog\/preview\//.test(location.pathname)) {
    const notice = node('p', '当前为 XBlog 安全预览，外部查询连接被预览环境限制。工具已接入真实接口，请在公开站点使用。', 'tool-preview-notice');
    root.prepend(notice);
    root.querySelectorAll('button').forEach(button => button.disabled = true);
    status(ipStatus, '安全预览中暂停外部查询，发布后可使用。');
    status(pingStatus, '安全预览中暂停外部测量，发布后可使用。');
    root.dataset.toolsPreview = 'restricted';
  }
  root.dataset.toolsReady = 'true';
})();
