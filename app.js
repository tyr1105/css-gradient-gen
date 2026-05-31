/* ===== CSS 渐变生成器 - 主逻辑 ===== */

// 应用状态
const state = {
  type: 'linear', // linear | radial | conic
  angle: 90,
  radialX: 50,
  radialY: 50,
  radialShape: 'circle',
  conicAngle: 0,
  stops: [
    { color: '#6366f1', position: 0, opacity: 1 },
    { color: '#ec4899', position: 50, opacity: 1 },
    { color: '#f59e0b', position: 100, opacity: 1 }
  ],
  activeStop: 0,
  theme: 'light'
};

// 预设调色板
const palettes = {
  pastel: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#E8BAFF', '#FFC9DE', '#C9FFE5', '#D4BAFF', '#FFE4BA'],
  vibrant: ['#FF0055', '#FF6B00', '#FFD600', '#00FF87', '#00BFFF', '#8B5CF6', '#FF1493', '#00CED1', '#FF4500', '#7CFC00'],
  warm: ['#FF6B6B', '#FFA07A', '#FFD700', '#FF8C00', '#DC143C', '#B22222', '#CD853F', '#D2691E', '#F4A460', '#E9967A'],
  cool: ['#00CED1', '#1E90FF', '#4169E1', '#6A5ACD', '#7B68EE', '#87CEEB', '#00BFFF', '#4682B4', '#5F9EA0', '#48D1CC'],
  earth: ['#8B7355', '#A0522D', '#CD853F', '#DEB887', '#D2B48C', '#BC8F8F', '#C4A882', '#9E8B6E', '#7B6B4A', '#6B4423'],
  neon: ['#FF00FF', '#00FFFF', '#FF0080', '#80FF00', '#FF8000', '#0080FF', '#FF0040', '#40FF00', '#FF4000', '#0040FF']
};

// 预设渐变
const presets = {
  sunset: [
    { name: '日落余晖', stops: [{ color: '#ff6b35', position: 0, opacity: 1 }, { color: '#f7931e', position: 50, opacity: 1 }, { color: '#ff3860', position: 100, opacity: 1 }], angle: 135 },
    { name: '晚霞', stops: [{ color: '#ee9ca7', position: 0, opacity: 1 }, { color: '#ffdde1', position: 100, opacity: 1 }], angle: 135 },
    { name: '黄昏', stops: [{ color: '#fc5c7d', position: 0, opacity: 1 }, { color: '#6a82fb', position: 100, opacity: 1 }], angle: 135 },
    { name: '橘色天际', stops: [{ color: '#f12711', position: 0, opacity: 1 }, { color: '#f5af19', position: 100, opacity: 1 }], angle: 90 },
    { name: '玫瑰金', stops: [{ color: '#f5576c', position: 0, opacity: 1 }, { color: '#ff9a9e', position: 50, opacity: 1 }, { color: '#fad0c4', position: 100, opacity: 1 }], angle: 180 },
    { name: '霞光万丈', stops: [{ color: '#fa709a', position: 0, opacity: 1 }, { color: '#fee140', position: 100, opacity: 1 }], angle: 45 }
  ],
  ocean: [
    { name: '深海', stops: [{ color: '#0c3483', position: 0, opacity: 1 }, { color: '#a2b6df', position: 100, opacity: 1 }], angle: 180 },
    { name: '海浪', stops: [{ color: '#00c6fb', position: 0, opacity: 1 }, { color: '#005bea', position: 100, opacity: 1 }], angle: 135 },
    { name: '珊瑚礁', stops: [{ color: '#0093E9', position: 0, opacity: 1 }, { color: '#80D0C7', position: 100, opacity: 1 }], angle: 160 },
    { name: '冰蓝', stops: [{ color: '#4facfe', position: 0, opacity: 1 }, { color: '#00f2fe', position: 100, opacity: 1 }], angle: 90 },
    { name: '水面倒影', stops: [{ color: '#667eea', position: 0, opacity: 1 }, { color: '#764ba2', position: 100, opacity: 1 }], angle: 135 },
    { name: '浪花', stops: [{ color: '#a8edea', position: 0, opacity: 1 }, { color: '#fed6e3', position: 100, opacity: 1 }], angle: 45 }
  ],
  forest: [
    { name: '翠绿', stops: [{ color: '#11998e', position: 0, opacity: 1 }, { color: '#38ef7d', position: 100, opacity: 1 }], angle: 135 },
    { name: '竹林', stops: [{ color: '#134E5E', position: 0, opacity: 1 }, { color: '#71B280', position: 100, opacity: 1 }], angle: 160 },
    { name: '春芽', stops: [{ color: '#56ab2f', position: 0, opacity: 1 }, { color: '#a8e063', position: 100, opacity: 1 }], angle: 90 },
    { name: '深林', stops: [{ color: '#0B8457', position: 0, opacity: 1 }, { color: '#2D6A4F', position: 50, opacity: 1 }, { color: '#40916C', position: 100, opacity: 1 }], angle: 180 },
    { name: '苔藓', stops: [{ color: '#355C7D', position: 0, opacity: 1 }, { color: '#6C5B7B', position: 50, opacity: 1 }, { color: '#C06C84', position: 100, opacity: 1 }], angle: 135 },
    { name: '嫩叶', stops: [{ color: '#a1c4fd', position: 0, opacity: 1 }, { color: '#c2e9fb', position: 100, opacity: 1 }], angle: 90 }
  ],
  aurora: [
    { name: '北极光', stops: [{ color: '#43cea2', position: 0, opacity: 1 }, { color: '#185a9d', position: 100, opacity: 1 }], angle: 135 },
    { name: '星空', stops: [{ color: '#0F2027', position: 0, opacity: 1 }, { color: '#203A43', position: 50, opacity: 1 }, { color: '#2C5364', position: 100, opacity: 1 }], angle: 180 },
    { name: '紫光', stops: [{ color: '#7F00FF', position: 0, opacity: 1 }, { color: '#E100FF', position: 100, opacity: 1 }], angle: 135 },
    { name: '银河', stops: [{ color: '#2b5876', position: 0, opacity: 1 }, { color: '#4e4376', position: 100, opacity: 1 }], angle: 135 },
    { name: '幻彩', stops: [{ color: '#DA22FF', position: 0, opacity: 1 }, { color: '#9733EE', position: 50, opacity: 1 }, { color: '#00D2FF', position: 100, opacity: 1 }], angle: 90 },
    { name: '星云', stops: [{ color: '#1a2a6c', position: 0, opacity: 1 }, { color: '#b21f1f', position: 50, opacity: 1 }, { color: '#fdbb2d', position: 100, opacity: 1 }], angle: 135 }
  ],
  candy: [
    { name: '棉花糖', stops: [{ color: '#ffecd2', position: 0, opacity: 1 }, { color: '#fcb69f', position: 100, opacity: 1 }], angle: 135 },
    { name: '草莓', stops: [{ color: '#ff9a9e', position: 0, opacity: 1 }, { color: '#fecfef', position: 100, opacity: 1 }], angle: 135 },
    { name: '蓝莓', stops: [{ color: '#a18cd1', position: 0, opacity: 1 }, { color: '#fbc2eb', position: 100, opacity: 1 }], angle: 135 },
    { name: '柠檬', stops: [{ color: '#f6d365', position: 0, opacity: 1 }, { color: '#fda085', position: 100, opacity: 1 }], angle: 135 },
    { name: '彩虹糖', stops: [{ color: '#ff0844', position: 0, opacity: 1 }, { color: '#ffb199', position: 33, opacity: 1 }, { color: '#ffd1ff', position: 66, opacity: 1 }, { color: '#a8edea', position: 100, opacity: 1 }], angle: 90 },
    { name: '冰淇淋', stops: [{ color: '#fbc2eb', position: 0, opacity: 1 }, { color: '#a6c1ee', position: 100, opacity: 1 }], angle: 135 }
  ],
  business: [
    { name: '专业蓝', stops: [{ color: '#1e3c72', position: 0, opacity: 1 }, { color: '#2a5298', position: 100, opacity: 1 }], angle: 135 },
    { name: '金属灰', stops: [{ color: '#485563', position: 0, opacity: 1 }, { color: '#29323c', position: 100, opacity: 1 }], angle: 135 },
    { name: '科技感', stops: [{ color: '#0f0c29', position: 0, opacity: 1 }, { color: '#302b63', position: 50, opacity: 1 }, { color: '#24243e', position: 100, opacity: 1 }], angle: 180 },
    { name: '暗金', stops: [{ color: '#3E2C0A', position: 0, opacity: 1 }, { color: '#C6A04A', position: 50, opacity: 1 }, { color: '#3E2C0A', position: 100, opacity: 1 }], angle: 135 },
    { name: '商务红', stops: [{ color: '#8E0E00', position: 0, opacity: 1 }, { color: '#1F1C18', position: 100, opacity: 1 }], angle: 135 },
    { name: '银白', stops: [{ color: '#E8E8E8', position: 0, opacity: 1 }, { color: '#B0BEC5', position: 100, opacity: 1 }], angle: 180 }
  ]
};

// DOM 引用
const dom = {
  gradientPreview: document.getElementById('gradientPreview'),
  gradientBar: document.getElementById('gradientBar'),
  stopsContainer: document.getElementById('stopsContainer'),
  stopEditors: document.getElementById('stopEditors'),
  angleSlider: document.getElementById('angleSlider'),
  angleValue: document.getElementById('angleValue'),
  angleIndicator: document.getElementById('angleIndicator'),
  angleSection: document.getElementById('angleSection'),
  radialSection: document.getElementById('radialSection'),
  conicSection: document.getElementById('conicSection'),
  radialXSlider: document.getElementById('radialX'),
  radialYSlider: document.getElementById('radialY'),
  radialXVal: document.getElementById('radialXVal'),
  radialYVal: document.getElementById('radialYVal'),
  conicAngle: document.getElementById('conicAngle'),
  conicAngleValue: document.getElementById('conicAngleValue'),
  paletteColors: document.getElementById('paletteColors'),
  presetGrid: document.getElementById('presetGrid'),
  cssCode: document.getElementById('cssCode'),
  tailwindCode: document.getElementById('tailwindCode'),
  svgCode: document.getElementById('svgCode'),
  exportCanvas: document.getElementById('exportCanvas'),
  previewText: document.getElementById('previewText'),
  previewButton: document.getElementById('previewButton'),
  previewCard: document.getElementById('previewCard'),
  previewHero: document.getElementById('previewHero')
};

// ===== 生成 CSS 渐变字符串 =====
function generateGradientCSS() {
  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);
  const stopsStr = sortedStops.map(s => {
    const rgba = hexToRgba(s.color, s.opacity);
    return `${rgba} ${s.position}%`;
  }).join(', ');

  switch (state.type) {
    case 'linear':
      return `linear-gradient(${state.angle}deg, ${stopsStr})`;
    case 'radial':
      return `radial-gradient(${state.radialShape} at ${state.radialX}% ${state.radialY}%, ${stopsStr})`;
    case 'conic':
      return `conic-gradient(from ${state.conicAngle}deg at 50% 50%, ${stopsStr})`;
    default:
      return `linear-gradient(${state.angle}deg, ${stopsStr})`;
  }
}

// 颜色工具
function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (opacity < 1) {
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return hex;
}

function randomHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

// ===== 更新界面 =====
function updateAll() {
  const gradient = generateGradientCSS();

  // 更新预览
  dom.gradientPreview.style.background = gradient;

  // 更新渐变条
  const barGradient = generateBarGradient();
  dom.gradientBar.style.background = barGradient;

  // 更新色标位置
  renderStops();

  // 更新色标编辑器
  renderStopEditors();

  // 更新角度指示器
  updateAngleIndicator();

  // 更新代码
  updateCodeOutput();

  // 更新元素预览
  updateElementPreviews(gradient);
}

function generateBarGradient() {
  const sorted = [...state.stops].sort((a, b) => a.position - b.position);
  const stopsStr = sorted.map(s => `${s.color} ${s.position}%`).join(', ');
  return `linear-gradient(90deg, ${stopsStr})`;
}

// ===== 渲染色标 =====
function renderStops() {
  dom.stopsContainer.innerHTML = '';
  state.stops.forEach((stop, index) => {
    const el = document.createElement('div');
    el.className = 'color-stop' + (index === state.activeStop ? ' active' : '');
    el.style.left = stop.position + '%';
    el.style.backgroundColor = stop.color;
    el.dataset.index = index;

    // 拖拽事件
    el.addEventListener('mousedown', (e) => startDrag(e, index));
    el.addEventListener('touchstart', (e) => startDrag(e, index), { passive: false });

    // 点击选中
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      state.activeStop = index;
      updateAll();
    });

    dom.stopsContainer.appendChild(el);
  });
}

// ===== 拖拽色标 =====
let dragInfo = null;

function startDrag(e, index) {
  e.preventDefault();
  e.stopPropagation();
  state.activeStop = index;
  dragInfo = { index };
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', endDrag);
  document.addEventListener('touchmove', onDrag, { passive: false });
  document.addEventListener('touchend', endDrag);
}

function onDrag(e) {
  if (!dragInfo) return;
  e.preventDefault();

  const rect = dom.gradientBar.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  let pos = ((clientX - rect.left) / rect.width) * 100;
  pos = Math.max(0, Math.min(100, Math.round(pos)));

  state.stops[dragInfo.index].position = pos;
  updateAll();
}

function endDrag() {
  dragInfo = null;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', endDrag);
  document.removeEventListener('touchmove', onDrag);
  document.removeEventListener('touchend', endDrag);
}

// ===== 渐变条点击添加色标 =====
dom.gradientBar.addEventListener('click', (e) => {
  const rect = dom.gradientBar.getBoundingClientRect();
  const pos = Math.round(((e.clientX - rect.left) / rect.width) * 100);
  // 采样渐变条颜色
  const color = sampleGradientColor(pos);
  state.stops.push({ color, position: Math.max(0, Math.min(100, pos)), opacity: 1 });
  state.activeStop = state.stops.length - 1;
  updateAll();
});

// 右键删除色标
dom.gradientBar.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  if (state.stops.length <= 2) return; // 至少保留2个色标

  const rect = dom.gradientBar.getBoundingClientRect();
  const clickPos = ((e.clientX - rect.left) / rect.width) * 100;

  // 找到最近的色标
  let closestIdx = 0;
  let closestDist = Infinity;
  state.stops.forEach((s, i) => {
    const d = Math.abs(s.position - clickPos);
    if (d < closestDist) {
      closestDist = d;
      closestIdx = i;
    }
  });

  if (closestDist < 10) {
    state.stops.splice(closestIdx, 1);
    state.activeStop = Math.min(state.activeStop, state.stops.length - 1);
    updateAll();
  }
});

function sampleGradientColor(position) {
  // 简单的颜色采样：根据已有色标插值
  const sorted = [...state.stops].sort((a, b) => a.position - b.position);
  if (position <= sorted[0].position) return sorted[0].color;
  if (position >= sorted[sorted.length - 1].position) return sorted[sorted.length - 1].color;

  for (let i = 0; i < sorted.length - 1; i++) {
    if (position >= sorted[i].position && position <= sorted[i + 1].position) {
      const t = (position - sorted[i].position) / (sorted[i + 1].position - sorted[i].position);
      return interpolateColor(sorted[i].color, sorted[i + 1].color, t);
    }
  }
  return randomHex();
}

function interpolateColor(c1, c2, t) {
  const r1 = parseInt(c1.slice(1, 3), 16);
  const g1 = parseInt(c1.slice(3, 5), 16);
  const b1 = parseInt(c1.slice(5, 7), 16);
  const r2 = parseInt(c2.slice(1, 3), 16);
  const g2 = parseInt(c2.slice(3, 5), 16);
  const b2 = parseInt(c2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

// ===== 色标编辑器 =====
function renderStopEditors() {
  dom.stopEditors.innerHTML = '';
  state.stops.forEach((stop, index) => {
    const editor = document.createElement('div');
    editor.className = 'stop-editor';
    editor.innerHTML = `
      <input type="color" value="${stop.color}" data-index="${index}" class="editor-color">
      <input type="number" value="${stop.position}" min="0" max="100" class="stop-position" data-index="${index}">%
      <input type="range" value="${Math.round(stop.opacity * 100)}" min="0" max="100" class="stop-opacity" data-index="${index}">
      <span class="opacity-label">${Math.round(stop.opacity * 100)}%</span>
      <button class="btn-remove" data-index="${index}" title="删除色标" ${state.stops.length <= 2 ? 'disabled style="opacity:0.3"' : ''}>✕</button>
    `;
    dom.stopEditors.appendChild(editor);

    // 颜色更改
    editor.querySelector('.editor-color').addEventListener('input', (e) => {
      state.stops[index].color = e.target.value;
      updateAll();
    });

    // 位置更改
    editor.querySelector('.stop-position').addEventListener('input', (e) => {
      let val = parseInt(e.target.value);
      val = Math.max(0, Math.min(100, isNaN(val) ? 0 : val));
      state.stops[index].position = val;
      updateAll();
    });

    // 不透明度更改
    editor.querySelector('.stop-opacity').addEventListener('input', (e) => {
      state.stops[index].opacity = parseInt(e.target.value) / 100;
      editor.querySelector('.opacity-label').textContent = e.target.value + '%';
      updateAll();
    });

    // 删除按钮
    editor.querySelector('.btn-remove').addEventListener('click', (e) => {
      if (state.stops.length <= 2) return;
      const idx = parseInt(e.target.dataset.index);
      state.stops.splice(idx, 1);
      state.activeStop = Math.min(state.activeStop, state.stops.length - 1);
      updateAll();
    });
  });
}

// ===== 角度控制 =====
function updateAngleIndicator() {
  dom.angleIndicator.style.transform = `rotate(${state.angle}deg)`;
  dom.angleValue.textContent = state.angle;
  dom.angleSlider.value = state.angle;

  // 更新方向按钮高亮
  document.querySelectorAll('.dir-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.angle) === state.angle);
  });
}

dom.angleSlider.addEventListener('input', (e) => {
  state.angle = parseInt(e.target.value);
  updateAll();
});

document.querySelectorAll('.dir-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    state.angle = parseInt(btn.dataset.angle);
    updateAll();
  });
});

// ===== 径向控制 =====
dom.radialXSlider.addEventListener('input', (e) => {
  state.radialX = parseInt(e.target.value);
  dom.radialXVal.textContent = state.radialX;
  updateAll();
});

dom.radialYSlider.addEventListener('input', (e) => {
  state.radialY = parseInt(e.target.value);
  dom.radialYVal.textContent = state.radialY;
  updateAll();
});

document.querySelectorAll('.shape-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.radialShape = btn.dataset.shape;
    updateAll();
  });
});

// ===== 锥形角度 =====
dom.conicAngle.addEventListener('input', (e) => {
  state.conicAngle = parseInt(e.target.value);
  dom.conicAngleValue.textContent = state.conicAngle;
  updateAll();
});

// ===== 渐变类型切换 =====
document.querySelectorAll('.type-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.type = btn.dataset.type;

    // 显示/隐藏对应控制
    dom.angleSection.classList.toggle('hidden', state.type !== 'linear');
    dom.radialSection.classList.toggle('hidden', state.type !== 'radial');
    dom.conicSection.classList.toggle('hidden', state.type !== 'conic');

    updateAll();
  });
});

// ===== 代码输出 =====
function updateCodeOutput() {
  const gradient = generateGradientCSS();

  // CSS
  dom.cssCode.textContent = `background: ${gradient};`;

  // Tailwind
  dom.tailwindCode.textContent = generateTailwindCode();

  // SVG
  dom.svgCode.textContent = generateSVGCode();
}

function generateTailwindCode() {
  const sorted = [...state.stops].sort((a, b) => a.position - b.position);
  const colors = sorted.map(s => s.color).join(', ');
  let code = `/* Tailwind CSS - 自定义渐变 */\n`;
  code += `/* 在 tailwind.config.js 中添加：*/\n`;
  code += `theme: {\n  extend: {\n    backgroundImage: {\n      'custom-gradient': '${generateGradientCSS()}',\n    }\n  }\n}\n\n`;
  code += `/* 使用: class="bg-custom-gradient" */`;
  return code;
}

function generateSVGCode() {
  const sorted = [...state.stops].sort((a, b) => a.position - b.position);
  const id = 'customGradient';
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">\n`;

  if (state.type === 'linear') {
    const rad = (state.angle - 90) * Math.PI / 180;
    const x1 = Math.round(50 + Math.cos(rad) * 50);
    const y1 = Math.round(50 + Math.sin(rad) * 50);
    const x2 = Math.round(50 - Math.cos(rad) * 50);
    const y2 = Math.round(50 - Math.sin(rad) * 50);
    svg += `  <defs>\n    <linearGradient id="${id}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">\n`;
    sorted.forEach(s => {
      svg += `      <stop offset="${s.position}%" stop-color="${s.color}"${s.opacity < 1 ? ` stop-opacity="${s.opacity}"` : ''} />\n`;
    });
    svg += `    </linearGradient>\n  </defs>\n`;
  } else if (state.type === 'radial') {
    svg += `  <defs>\n    <radialGradient id="${id}" cx="${state.radialX}%" cy="${state.radialY}%" r="50%">\n`;
    sorted.forEach(s => {
      svg += `      <stop offset="${s.position}%" stop-color="${s.color}"${s.opacity < 1 ? ` stop-opacity="${s.opacity}"` : ''} />\n`;
    });
    svg += `    </radialGradient>\n  </defs>\n`;
  } else {
    svg += `  <defs>\n    <!-- 锥形渐变在SVG中不直接支持，使用CSS -->\n`;
    svg += `  </defs>\n`;
  }

  svg += `  <rect width="100%" height="100%" fill="url(#${id})" />\n</svg>`;
  return svg;
}

// ===== 元素预览 =====
function updateElementPreviews(gradient) {
  // 文字渐变
  dom.previewText.style.backgroundImage = gradient;

  // 按钮
  dom.previewButton.style.background = gradient;

  // 卡片
  dom.previewCard.style.background = gradient;

  // Hero
  dom.previewHero.style.background = gradient;
}

// ===== 调色板 =====
function renderPalette(paletteName) {
  dom.paletteColors.innerHTML = '';
  const colors = palettes[paletteName];
  colors.forEach(color => {
    const swatch = document.createElement('div');
    swatch.className = 'palette-swatch';
    swatch.style.backgroundColor = color;
    swatch.title = color;
    swatch.addEventListener('click', () => {
      // 将颜色应用到当前活动色标
      if (state.activeStop >= 0 && state.activeStop < state.stops.length) {
        state.stops[state.activeStop].color = color;
        updateAll();
      }
    });
    dom.paletteColors.appendChild(swatch);
  });
}

document.querySelectorAll('.palette-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.palette-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderPalette(tab.dataset.palette);
  });
});

// ===== 预设渐变 =====
function renderPresets(category) {
  dom.presetGrid.innerHTML = '';
  const items = presets[category];
  items.forEach(preset => {
    const item = document.createElement('div');
    item.className = 'preset-item';
    const stopsStr = preset.stops.map(s => `${s.color} ${s.position}%`).join(', ');
    item.style.background = `linear-gradient(${preset.angle}deg, ${stopsStr})`;
    item.innerHTML = `<span class="preset-name">${preset.name}</span>`;
    item.addEventListener('click', () => {
      state.type = 'linear';
      state.angle = preset.angle;
      state.stops = preset.stops.map(s => ({ ...s }));
      state.activeStop = 0;

      // 更新类型按钮
      document.querySelectorAll('.type-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.type === 'linear');
      });
      dom.angleSection.classList.remove('hidden');
      dom.radialSection.classList.add('hidden');
      dom.conicSection.classList.add('hidden');

      updateAll();
    });
    dom.presetGrid.appendChild(item);
  });
}

document.querySelectorAll('.preset-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.preset-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderPresets(tab.dataset.category);
  });
});

// ===== 随机渐变 =====
document.getElementById('btnRandom').addEventListener('click', () => {
  const numStops = 2 + Math.floor(Math.random() * 3); // 2-4 个色标
  state.stops = [];
  for (let i = 0; i < numStops; i++) {
    state.stops.push({
      color: randomHex(),
      position: Math.round((i / (numStops - 1)) * 100),
      opacity: 1
    });
  }
  state.angle = Math.floor(Math.random() * 360);
  state.activeStop = 0;
  updateAll();
});

// ===== 反转渐变 =====
document.getElementById('btnReverse').addEventListener('click', () => {
  state.stops.forEach(s => {
    s.position = 100 - s.position;
  });
  updateAll();
});

// ===== 主题切换 =====
document.getElementById('btnTheme').addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('btnTheme').textContent = state.theme === 'light' ? '🌙' : '☀️';
  localStorage.setItem('gradient-theme', state.theme);
});

// 加载保存的主题
const savedTheme = localStorage.getItem('gradient-theme');
if (savedTheme) {
  state.theme = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('btnTheme').textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

// ===== 代码 Tab 切换 =====
document.querySelectorAll('.code-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.code;
    document.getElementById('codeCSS').classList.toggle('hidden', target !== 'css');
    document.getElementById('codeTailwind').classList.toggle('hidden', target !== 'tailwind');
    document.getElementById('codeSVG').classList.toggle('hidden', target !== 'svg');
  });
});

// ===== 复制按钮 =====
document.querySelectorAll('.btn-copy').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    navigator.clipboard.writeText(target.textContent).then(() => {
      btn.textContent = '✅ 已复制';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 复制';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});

// ===== 添加色标 =====
document.getElementById('addStop').addEventListener('click', () => {
  const pos = 50;
  const color = sampleGradientColor(pos);
  state.stops.push({ color, position: pos, opacity: 1 });
  state.activeStop = state.stops.length - 1;
  updateAll();
});

// ===== 导出 =====
document.getElementById('exportCSS').addEventListener('click', () => {
  const css = `background: ${generateGradientCSS()};`;
  navigator.clipboard.writeText(css).then(() => {
    showNotification('CSS 已复制到剪贴板！');
  });
});

document.getElementById('exportPNG').addEventListener('click', () => {
  const canvas = dom.exportCanvas;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const sorted = [...state.stops].sort((a, b) => a.position - b.position);

  let gradient;
  if (state.type === 'linear') {
    const rad = (state.angle - 90) * Math.PI / 180;
    const cx = w / 2;
    const cy = h / 2;
    const len = Math.sqrt(w * w + h * h) / 2;
    gradient = ctx.createLinearGradient(
      cx - Math.cos(rad) * len, cy - Math.sin(rad) * len,
      cx + Math.cos(rad) * len, cy + Math.sin(rad) * len
    );
  } else if (state.type === 'radial') {
    const rx = w * state.radialX / 100;
    const ry = h * state.radialY / 100;
    const radius = Math.max(w, h);
    gradient = ctx.createRadialGradient(rx, ry, 0, rx, ry, radius);
  } else {
    // conic - Canvas doesn't natively support, fallback to linear for PNG
    gradient = ctx.createLinearGradient(0, 0, w, h);
  }

  sorted.forEach(s => {
    const r = parseInt(s.color.slice(1, 3), 16);
    const g = parseInt(s.color.slice(3, 5), 16);
    const b = parseInt(s.color.slice(5, 7), 16);
    gradient.addColorStop(s.position / 100, `rgba(${r},${g},${b},${s.opacity})`);
  });

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  const link = document.createElement('a');
  link.download = 'gradient.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
  showNotification('PNG 已下载！');
});

document.getElementById('exportSVG').addEventListener('click', () => {
  const svgContent = generateSVGCode();
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'gradient.svg';
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
  showNotification('SVG 已下载！');
});

// ===== 通知提示 =====
function showNotification(message) {
  const notif = document.createElement('div');
  notif.textContent = message;
  notif.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: #22c55e;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
  `;
  document.body.appendChild(notif);

  requestAnimationFrame(() => {
    notif.style.opacity = '1';
    notif.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    notif.style.opacity = '0';
    notif.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}

// ===== 初始化 =====
function init() {
  renderPalette('pastel');
  renderPresets('sunset');
  updateAll();
}

init();
