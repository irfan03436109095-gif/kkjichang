/* 原站套餐资料与筛选增强；卡片及原生详情正文均由 XBlog 输出。 */
(() => {
const catalog = {"checkedDate":"2026-10-25","services":{"flybit":{"name":"FlyBit","en":"FLYBIT","color":"#76f8bb","bg":"#17382f","url":"https://goflybit.com/#/register?code=gPinVG8C","protocol":"VLESS","transport":"VLESS · Secure 隧道","speed":"官网标称不限速","trial":"注册免费试用 2GB","refund":"不支持退款","startPrice":15,"summary":"周期套餐与不限时流量包，按自己的节奏选择。","deviceInfo":"周期套餐 30 / 50 台，不限时设备不限","media":"官网标称支持流媒体与 ChatGPT","notes":["周期套餐支持家庭成员共享；128G、192G、256G 档标注 30 台设备，512G 档标注 50 台。","不限时套餐按一次性总流量使用，页面标注无期限、设备不限。","公开导航页标注注册免费试用 2GB，领取条件和可用期限请到官网确认。","官网提示先试用后下单，当前套餐均标注不支持退款。"]},"99ba":{"name":"99吧","en":"99BA NETWORK","color":"#a2b7ff","bg":"#273550","url":"https://99ba.net/#/register?code=sExBbdk9","protocol":"SS","transport":"SS 协议 · 加密通道","speed":"官网标注限速 999Mbps","trial":"注册免费试用 1GB","refund":"暂不支持退款","startPrice":9.9,"summary":"低门槛月付、年付特惠与不限时套餐，覆盖不同用量。","deviceInfo":"套餐标注同时登录设备数 99","media":"官网标称支持流媒体、ChatGPT、Gemini、Grok 等","notes":["套餐页标注同时登录设备数 99，限速 999Mbps；该数字是套餐上限，不是实测速度。","官网注明仅限内地使用；校园网、新疆地区用户请先试用。","公开导航页标注注册免费试用 1GB，领取条件和可用期限请到官网确认。","全年特惠页面列出 9 折码 2026-99，是否适用及优惠金额以结算页为准，本站按未优惠标价展示。","部分套餐描述与付款选项的小数价格不同，铂金、钻石套餐以配置页付款选项为准。","当前套餐页面标注暂不支持退款。"],"checkedDate":"2026-10-26"}},"plans":[{"id":"fb-128-month","service":"flybit","name":"每月-128G","billing":"monthly","price":15,"traffic":128,"devices":"30 台","periods":[15,42,75,148],"reset":12,"featured":true,"detailSlug":"plan-fb-128-month"},{"id":"fb-192-month","service":"flybit","name":"每月-192G","billing":"monthly","price":22,"traffic":192,"devices":"30 台","periods":[22,62,110,216],"reset":18,"detailSlug":"plan-fb-192-month"},{"id":"fb-256-month","service":"flybit","name":"每月-256G","billing":"monthly","price":28,"traffic":256,"devices":"30 台","periods":[28,80,140,268],"reset":22,"detailSlug":"plan-fb-256-month"},{"id":"fb-512-month","service":"flybit","name":"每月-512G","billing":"monthly","price":52,"traffic":512,"devices":"50 台","periods":[52,148,260,498],"reset":42,"detailSlug":"plan-fb-512-month"},{"id":"fb-128-once","service":"flybit","name":"不限时-128G","billing":"once","price":36,"traffic":128,"devices":"不限","detailSlug":"plan-fb-128-once"},{"id":"fb-256-once","service":"flybit","name":"不限时-256G","billing":"once","price":68,"traffic":256,"devices":"不限","detailSlug":"plan-fb-256-once"},{"id":"fb-512-once","service":"flybit","name":"不限时-512G","billing":"once","price":128,"traffic":512,"devices":"不限","detailSlug":"plan-fb-512-once"},{"id":"fb-1024-once","service":"flybit","name":"不限时-1024G","billing":"once","price":238,"traffic":1024,"devices":"不限","detailSlug":"plan-fb-1024-once"},{"id":"99-year","service":"99ba","name":"全年特惠套餐","billing":"yearly","price":99.99,"traffic":66,"devices":"99 台","detailSlug":"plan-99-year"},{"id":"99-special-month","service":"99ba","name":"特惠月套餐","billing":"monthly","price":9.9,"traffic":70,"devices":"99 台","detailSlug":"plan-99-special-month"},{"id":"99-star-month","service":"99ba","name":"星耀 VIP","billing":"monthly","price":12.99,"traffic":99,"devices":"99 台","periods":[12.99,36.99,72.99,139.99],"detailSlug":"plan-99-star-month"},{"id":"99-platinum-month","service":"99ba","name":"铂金 VIP","billing":"monthly","price":24.99,"traffic":199,"devices":"99 台","periods":[24.99,72.99,139.99,274.99],"priceNote":"官网介绍文案与付款选项存在小数差异，本表采用配置订阅页的付款选项。","detailSlug":"plan-99-platinum-month"},{"id":"99-diamond-month","service":"99ba","name":"钻石 VIP","billing":"monthly","price":36.99,"traffic":299,"devices":"99 台","periods":[36.99,108.99,212.99,419.99],"priceNote":"官网介绍文案与付款选项存在小数差异，本表采用配置订阅页的付款选项。","detailSlug":"plan-99-diamond-month"},{"id":"99-stardiamond-once","service":"99ba","name":"星钻 SVIP","billing":"once","price":35.9,"traffic":111,"devices":"99 台","detailSlug":"plan-99-stardiamond-once"},{"id":"99-supreme-once","service":"99ba","name":"至尊 SVIP","billing":"once","price":69.9,"traffic":222,"devices":"99 台","detailSlug":"plan-99-supreme-once"},{"id":"99-crown-once","service":"99ba","name":"皇冠 SVIP","billing":"once","price":139.99,"traffic":555,"devices":"99 台","detailSlug":"plan-99-crown-once"},{"id":"99-glory-once","service":"99ba","name":"尊耀 SVIP","billing":"once","price":259.99,"traffic":1111,"devices":"99 台","priceNote":"官网套餐卡片标价为 ¥259.99，描述中写作 ¥259.9。此处按卡片标价展示，请在下单前核对结算金额。","detailSlug":"plan-99-glory-once"}]};
const {services, plans} = catalog;
const root = document.getElementById('route-catalog');
const homeValue = document.body.dataset.routeHome;
if (!homeValue) return;
const home = new URL(homeValue,location.href).href;
const byId = new Map(plans.map(p => [p.id,p]));
const labels = {monthly:'月付套餐',once:'不限时流量包',yearly:'年付特惠'};
const units = {monthly:'/ 月',once:'/ 次',yearly:'/ 年'};
const money = v => Number(v).toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1');
const escape = v => String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fullName = p => services[p.service].name+' · '+p.name;
const trafficUnit = p => p.billing==='once'?'一次性总流量':'每月流量';
const articleURL = slug => new URL('posts/'+slug+'/',home).href;
const comparisonURL = () => {
  const url = new URL(articleURL('airport-plan-comparison'));
  url.searchParams.set('plans',[...comparison].join(','));
  return url.href;
};
const homeURL = () => {
  const url=new URL(home);url.searchParams.set('plans',[...comparison].join(','));url.hash='route-catalog';return url.href;
};
const detailURL = p => {
  const url=new URL(articleURL(p.detailSlug));url.searchParams.set('plans',[...comparison].join(','));return url.href;
};
const readSet = key => {
  try {const v=JSON.parse(localStorage.getItem(key)||'[]');return new Set(Array.isArray(v)?v.filter(id=>byId.has(id)):[]);} catch {return new Set();}
};
let comparison = new Set([...readSet('route-guide-comparison')].slice(0,3));
let saved = readSet('route-guide-saved');
const persist = () => {try {localStorage.setItem('route-guide-comparison',JSON.stringify([...comparison]));}catch {}};
const params = new URL(location.href).searchParams;
if (params.has('plans')) comparison=new Set(params.get('plans').split(',').filter(id=>byId.has(id)).slice(0,3));
let selectionNotice='';
if (document.body.dataset.routeArticleSlug==='airport-plan-comparison') {
  if (byId.has(params.get('add'))&&!comparison.has(params.get('add'))) {
    if(comparison.size<3)comparison.add(params.get('add'));
    else selectionNotice='已选满 3 款，请先移除一款再加入新套餐。';
  }
  persist();
}
let comparisonPanel;
function renderComparison() {
  if (document.body.dataset.routeArticleSlug!=='airport-plan-comparison') return;
  const prose=document.querySelector('.prose');
  if (!prose) return;
  if (!comparisonPanel) {
    comparisonPanel=document.createElement('section');
    comparisonPanel.className='route-comparison-selection';
    comparisonPanel.setAttribute('aria-label','已选套餐对比');
    const firstHeading=prose.querySelector('h2');
    if (firstHeading) firstHeading.before(comparisonPanel); else prose.append(comparisonPanel);
  }
  const selected=[...comparison].map(id=>byId.get(id));
  if (!selected.length) {
    comparisonPanel.innerHTML=`<h2>把需要的套餐，放在一起看。</h2><p>从首页选择最多 3 款套餐，再打开本页比较。下方保留全部 17 款套餐目录。</p><a class="route-button primary" href="${escape(homeURL())}">选择套餐 ↗</a>`;
    return;
  }
  const row=(name,fn)=>`<tr><th scope="row">${name}</th>${selected.map(p=>`<td>${fn(p)}</td>`).join('')}</tr>`;
  comparisonPanel.innerHTML=`<div class="route-comparison-heading"><h2>已选 ${selected.length} 款套餐</h2><button type="button" class="outline-link" data-comparison-clear>清空清单</button></div>${selectionNotice?`<p class="route-plan-note" role="status">${selectionNotice}</p>`:''}<div class="route-plan-table-wrap"><table class="route-plan-table"><thead><tr><th scope="col">对比项目</th>${selected.map(p=>`<th scope="col"><a href="${escape(detailURL(p))}">${escape(fullName(p))}</a><button type="button" class="route-remove-plan" data-comparison-remove="${p.id}" aria-label="移除${escape(fullName(p))}">移除 ×</button></th>`).join('')}</tr></thead><tbody>${row('付款方式',p=>labels[p.billing])}${row('单次付款',p=>'¥'+money(p.price)+' '+units[p.billing])}${row('流量额度',p=>p.traffic+' GB<br><small>'+trafficUnit(p)+'</small>')}${row('设备标注',p=>escape(p.devices))}${row('传输方式',p=>escape(services[p.service].transport))}${row('速度标注',p=>escape(services[p.service].speed))}${row('退款说明',p=>escape(services[p.service].refund))}${row('官网入口',p=>`<a href="${escape(services[p.service].url)}" target="_blank" rel="sponsored noopener noreferrer">访问官网 ↗</a>`)}</tbody></table></div><p class="route-plan-note">${new Set(selected.map(p=>p.billing)).size>1?'你正在跨付款周期比较：年付为全年总价，不限时为一次性总流量。':'当前清单按相同计费方式展示。'} 官网标称不代表实测结果，付款前请核对当前条件。</p><a class="outline-link" href="${escape(homeURL())}">继续挑选套餐 ↗</a>`;
}
function updateComparisonLinks() {
  document.querySelectorAll('[data-plan-comparison-link]').forEach(a=>{a.href=comparisonURL();});
  document.querySelectorAll('.route-plan-actions > a').forEach(a=>{const url=new URL(a.href);url.searchParams.set('plans',[...comparison].join(','));a.href=url.href;});
  const destination=new URL(articleURL('airport-plan-comparison'));
  const contextPaths=new Set([...plans.map(p=>p.detailSlug),'airport-plan-comparison','flybit-invite-start','99ba-invite-trial','flybit-99ba-comparison'].map(s=>new URL(articleURL(s)).pathname));
  document.querySelectorAll('.prose a[href],.service-bottom a[href],.hero-secondary').forEach(a=>{const url=new URL(a.href);if(url.origin===destination.origin&&contextPaths.has(url.pathname)){url.searchParams.set('plans',[...comparison].join(','));a.href=url.href;}});
}
document.addEventListener('click',e=>{
  const remove=e.target.closest('[data-comparison-remove]');
  const clear=e.target.closest('[data-comparison-clear]');
  if (!remove&&!clear) return;
  if (remove) comparison.delete(remove.dataset.comparisonRemove); else comparison.clear();
  persist(); renderComparison(); updateComparisonLinks();
  comparisonPanel?.querySelector('[data-comparison-remove], a')?.focus({preventScroll:true});
  const url=new URL(location.href);url.searchParams.delete('add');url.searchParams.delete('plans');
  url.searchParams.set('plans',[...comparison].join(','));
  try {history.replaceState(null,'',url.href);} catch {location.replace(url.href);}
});
renderComparison();updateComparisonLinks();
if (!root) return;
const find=s=>root.querySelector(s);
const all=s=>Array.from(root.querySelectorAll(s));
const cards=new Map(all('[data-plan-id]').map(c=>[c.dataset.planId,c]));
const state={billing:'monthly',provider:'all',budget:'all',query:'',sort:'default',favorites:false};
try {
  const v=JSON.parse(sessionStorage.getItem('route-guide-filters')||'{}');
  for (const [k,values] of Object.entries({billing:['monthly','once','yearly'],provider:['all','flybit','99ba'],budget:['all','20','40','high'],sort:['default','price','traffic']})) if (values.includes(v[k])) state[k]=v[k];
  if (typeof v.query==='string') state.query=v.query.slice(0,200);
  if (typeof v.favorites==='boolean') state.favorites=v.favorites;
} catch {}
let previousSort='default',toastTimer;
function toast(message) {
  const target=find('#route-plan-toast');target.textContent=message;target.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>target.classList.remove('show'),2600);
}
function matches(p) {
  const budget=state.budget==='all'||(state.budget==='20'?p.price<=20:state.budget==='40'?p.price>20&&p.price<=40:p.price>40);
  return p.billing===state.billing&&(state.provider==='all'||p.service===state.provider)&&budget&&(!state.favorites||saved.has(p.id))&&[fullName(p),services[p.service].protocol,labels[p.billing],p.traffic+'GB'].join(' ').toLowerCase().includes(state.query.toLowerCase());
}
function render() {
  let count=0;
  for (const p of plans) {
    const c=cards.get(p.id);if(!c)continue;c.hidden=!matches(p);if(!c.hidden)count++;
    const save=c.querySelector('[data-plan-save]');save.setAttribute('aria-pressed',String(saved.has(p.id)));save.setAttribute('aria-label',(saved.has(p.id)?'取消收藏':'收藏')+fullName(p));save.querySelector('span').textContent=saved.has(p.id)?'♥':'♡';
    const compare=c.querySelector('[data-plan-compare]');compare.setAttribute('aria-pressed',String(comparison.has(p.id)));compare.setAttribute('aria-label',(comparison.has(p.id)?'移出对比':'加入对比')+fullName(p));compare.textContent=comparison.has(p.id)?'✓ 已加入对比':'＋ 加入对比';
  }
  if(previousSort!==state.sort){const ordered=[...plans].sort((a,b)=>state.sort==='price'?a.price-b.price:state.sort==='traffic'?b.traffic-a.traffic:0);for(const p of ordered)find('#route-plan-grid').append(cards.get(p.id));previousSort=state.sort;}
  for(const [attr,key] of [['billing','billing'],['provider','provider'],['budget','budget']])for(const b of all(`[data-plan-${attr}]`)){const on=b.getAttribute(`data-plan-${attr}`)===state[key];b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));}
  find('#route-plan-search').value=state.query;find('#route-plan-sort').value=state.sort;
  find('#route-plan-count').textContent=count;find('#route-plan-empty').hidden=count!==0;find('#route-saved-count').textContent=saved.size;find('#route-plan-favorites').setAttribute('aria-pressed',String(state.favorites));find('#route-favorites-label').textContent=state.favorites?' · 仅看收藏':'';find('#route-budget-label').textContent=state.billing==='monthly'?'月付预算':state.billing==='yearly'?'年付预算':'单次预算';
  const selected=[...comparison].map(id=>byId.get(id));find('#route-compare-bar').hidden=!selected.length;find('#route-compare-count').textContent=selected.length;find('#route-compare-names').textContent=selected.map(fullName).join(' / ');document.body.classList.toggle('route-has-comparison',!!selected.length);
  updateComparisonLinks();try{sessionStorage.setItem('route-guide-filters',JSON.stringify(state));}catch{}
}
root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||!root.contains(b))return;
  if(b.hasAttribute('data-plan-billing')){state.billing=b.dataset.planBilling;state.budget='all';}
  else if(b.hasAttribute('data-plan-provider'))state.provider=b.dataset.planProvider;
  else if(b.hasAttribute('data-plan-budget'))state.budget=b.dataset.planBudget;
  else if(b.hasAttribute('data-plan-reset'))Object.assign(state,{billing:'monthly',provider:'all',budget:'all',query:'',sort:'default',favorites:false});
  else if(b.id==='route-plan-favorites')state.favorites=!state.favorites;
  else if(b.hasAttribute('data-plan-save')){const id=b.dataset.planSave;if(saved.has(id))saved.delete(id);else saved.add(id);try{localStorage.setItem('route-guide-saved',JSON.stringify([...saved]));}catch{toast('收藏已在当前页面保留。');}}
  else if(b.hasAttribute('data-plan-compare')){const id=b.dataset.planCompare;if(comparison.has(id))comparison.delete(id);else{if(comparison.size>=3){toast('最多对比 3 款套餐，请先移除一款。');return;}comparison.add(id);}persist();}
  else if(b.id==='route-compare-clear'){comparison.clear();persist();}
  render();
});
find('#route-plan-search').addEventListener('input',e=>{state.query=e.target.value.trim();render();});
find('#route-plan-sort').addEventListener('change',e=>{state.sort=e.target.value;render();});
window.addEventListener('pageshow',e=>{if(e.persisted){comparison=new Set([...readSet('route-guide-comparison')].slice(0,3));saved=readSet('route-guide-saved');render();}});
document.addEventListener('keydown',e=>{if(e.key!=='/'||e.ctrlKey||e.metaKey||e.altKey||document.querySelector('dialog[open]')||e.target.closest('input,textarea,select,[contenteditable="true"]'))return;e.preventDefault();root.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});find('#route-plan-search').focus({preventScroll:true});});
render();root.classList.add('catalog-ready');

})();
