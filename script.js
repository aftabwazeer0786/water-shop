const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
let cart = [];
const cartCount = $('#cartCount');
const toast = $('#toast');
const modal = $('#modal');

function showToast(msg){toast.textContent=msg;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2300)}
function openModal(title='Order Water'){ $('#modalTitle').textContent=title; modal.classList.add('show'); }
function closeModal(){modal.classList.remove('show')}
$$('[data-order]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.order)));
$('.modal-close').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});

$('.menu-toggle').addEventListener('click',()=>$('.nav-links').classList.toggle('open'));
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>$('.nav-links').classList.remove('open')));

$$('.qty').forEach(q=>{
  const minus=q.children[0], count=q.children[1], plus=q.children[2];
  minus.addEventListener('click',()=>count.textContent=Math.max(1,+count.textContent-1));
  plus.addEventListener('click',()=>count.textContent=+count.textContent+1);
});

$$('.add-cart').forEach(btn=>btn.addEventListener('click',()=>{
  const card=btn.closest('.product-card'), qty=+card.querySelector('.qty span').textContent;
  const product=card.dataset.product, price=+card.dataset.price;
  cart.push({product,qty,price}); cartCount.textContent=cart.reduce((a,b)=>a+b.qty,0);
  showToast(`${qty} × ${product} added to cart`);
}));

$$('.counter-sale').forEach(btn=>btn.addEventListener('click',()=>{
  const card=btn.closest('.product-card');
  showToast(`${card.dataset.product} selected for counter sale`);
  openModal('Counter Sale — '+card.dataset.product);
}));

$$('.mode').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.mode').forEach(x=>x.classList.remove('active'));btn.classList.add('active');
  showToast(btn.dataset.mode==='counter'?'Counter sale selected — visit our outlet':'Online ordering selected — home delivery');
}));

$('#cartBtn').addEventListener('click',()=>{
  if(!cart.length) return showToast('Your cart is empty');
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0);
  openModal(`Cart — ${cart.reduce((a,b)=>a+b.qty,0)} item(s)`);
  $('#modalTitle').insertAdjacentHTML('afterend',`<p><strong>Total: Rs. ${total.toLocaleString()}</strong></p>`);
});
$('#onlineModal').addEventListener('click',()=>{closeModal();$('#delivery').scrollIntoView({behavior:'smooth'})});
$('#counterModal').addEventListener('click',()=>{closeModal();$('#products').scrollIntoView({behavior:'smooth'});showToast('Counter sale is available on every product')});
$('#searchBtn').addEventListener('click',()=>showToast('Search is ready to connect to your product catalog'));

$('#orderForm').addEventListener('submit',e=>{
  e.preventDefault(); const data=new FormData(e.target);
  showToast(`Order received for ${data.get('quantity')} × ${data.get('product')}`);
  e.target.reset();
});
$('#whatsappBtn').addEventListener('click',()=>{
  window.open('https://wa.me/923331234567?text=Hello%20Nowshehra%20Waters%2C%20I%20want%20to%20place%20a%20water%20order.','_blank');
});
$('#contactBtn').addEventListener('click',()=>showToast('Message form submitted — connect this to PHP/MySQL for real messages'));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

window.addEventListener('scroll',()=>{
  const sections=$$('section[id]');
  let current='home';
  sections.forEach(sec=>{if(scrollY>=sec.offsetTop-150) current=sec.id});
  $$('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));
});
