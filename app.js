const canvas = document.getElementById("post-canvas");
const ctx = canvas.getContext("2d");
const nativeFillText = ctx.fillText.bind(ctx);
const nativeMeasureText = ctx.measureText.bind(ctx);
function withCanvasFont(fn, args) {
  if (!state.manuscriptMode) return fn(...args);
  const previous = ctx.font;
  ctx.font = previous.replace(/Inter, Segoe UI, sans-serif|sans-serif$/, '"Caveat", cursive');
  try { return fn(...args); } finally { ctx.font = previous; }
}
ctx.fillText = (...args) => withCanvasFont(nativeFillText, args);
ctx.measureText = (...args) => withCanvasFont(nativeMeasureText, args);

const FORMATS = {
  portrait: { w: 1080, h: 1350, label: "1080 × 1350 px (Feed Retrato 4:5)" },
  portrait34: { w: 1080, h: 1440, label: "1080 × 1440 px (Feed Novo IG 3:4)" },
  square: { w: 1080, h: 1080, label: "1080 × 1080 px (Feed Quadrado 1:1)" },
  story: { w: 1080, h: 1920, label: "1080 × 1920 px (Stories / Reels 9:16)" },
};

const THEMES = {
  juridico: {
    bgTop: "#0a1128",
    bgBottom: "#132347",
    card: "rgba(255, 255, 255, 0.06)",
    cardBorder: "rgba(56, 189, 248, 0.25)",
    accent: "#38bdf8",
    accentText: "#082f49",
    text: "#f8fafc",
    muted: "#94a3b8",
    success: "#22c55e",
    successBg: "rgba(34, 197, 94, 0.18)",
  },
  policial: {
    bgTop: "#0b0b0f",
    bgBottom: "#1c1917",
    card: "rgba(255, 255, 255, 0.05)",
    cardBorder: "rgba(250, 204, 21, 0.30)",
    accent: "#facc15",
    accentText: "#1c1917",
    text: "#fafaf9",
    muted: "#a8a29e",
    success: "#4ade80",
    successBg: "rgba(74, 222, 128, 0.16)",
  },
  fiscal: {
    bgTop: "#052e2b",
    bgBottom: "#0f172a",
    card: "rgba(255, 255, 255, 0.06)",
    cardBorder: "rgba(52, 211, 153, 0.28)",
    accent: "#34d399",
    accentText: "#022c22",
    text: "#f0fdf4",
    muted: "#9ca3af",
    success: "#34d399",
    successBg: "rgba(52, 211, 153, 0.18)",
  },
  studygram: {
    bgTop: "#1e1b4b",
    bgBottom: "#3b0764",
    card: "rgba(255, 255, 255, 0.08)",
    cardBorder: "rgba(192, 132, 252, 0.32)",
    accent: "#c084fc",
    accentText: "#2e1065",
    text: "#faf5ff",
    muted: "#cbd5e1",
    success: "#4ade80",
    successBg: "rgba(74, 222, 128, 0.18)",
  },
  clean: {
    bgTop: "#f8fafc",
    bgBottom: "#e2e8f0",
    card: "#ffffff",
    cardBorder: "#cbd5e1",
    accent: "#2563eb",
    accentText: "#ffffff",
    text: "#0f172a",
    muted: "#475569",
    success: "#16a34a",
    successBg: "rgba(22, 163, 74, 0.14)",
  },
};

const EXAMPLES = {
  questao: {
    banca: "FGV • 2026",
    materia: "Língua Portuguesa",
    enunciado:
      "Assinale a alternativa em que o uso da vírgula está inteiramente de acordo com a norma-padrão da língua portuguesa:",
    altA: "A) Os candidatos que estudaram com constância, garantiram a vaga.",
    altB: "B) Embora estivesse cansado, o aluno resolveu mais vinte questões.",
    altC: "C) O edital foi publicado ontem, porém, ninguém leu o anexo.",
    altD: "D) Estudamos muito durante o ano, para passar no tribunal.",
    gabarito: "B",
    cta: "Acertei de primeira ou caiu na pegadinha da FGV?",
    comentario:
      "Na letra B, a oração subordinada adverbial concessiva ('Embora estivesse cansado') está deslocada no início do período, tornando a vírgula obrigatória.",
  },
  edital: {
    badge: "EDITAL IMINENTE",
    banca: "CEBRASPE",
    orgao: "Polícia Federal — Agente e Escrivão",
    vagas: "1.000 vagas imediatas",
    salario: "R$ 13.900,54",
    escolaridade: "Nível Superior (Qualquer Área)",
    prazo: "Previsão: 1º Semestre",
    prova: "Previsão: 2º Semestre",
    cta: "Marque um amigo que sonha com essa farda!",
  },
  rotina: {
    tag: "LEI SECA NA VEIA • ART. 37 CF",
    metric: "LIMPE • Decore!",
    title: "Princípios da Administração Pública",
    body: "A administração pública direta e indireta de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios obedecerá aos princípios de Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência.",
    footer: "Salve para revisar antes da prova! • #DireitoAdministrativo",
  },
  comparativo: {
    tag: "NÃO CONFUNDA • PORTUGUÊS",
    title: "Uso de MAS vs. MAIS",
    aTitle: "MAS (sem 'i')",
    aBody: "Ideia de oposição\nEquivale a 'porém', 'contudo'\nEx: Estudou muito, mas ficou nervoso.",
    bTitle: "MAIS (com 'i')",
    bBody: "Ideia de intensidade / soma\nAntônimo de 'menos'\nEx: Preciso resolver mais questões hoje.",
    cta: "Salve e mande para quem ainda confunde!",
  },
  checklist: {
    tag: "CHECKLIST PÓS-EDITAL",
    title: "4 passos para acelerar na reta final",
    items: "Verticalizar o edital e marcar o que mais cai\nResolver 50+ questões da banca por dia\nRevisar o caderno de erros todo domingo\nLer a Lei Seca grifando prazos e exceções",
    cta: "Qual desses passos você já está aplicando?",
  },
  metas: {
    tag: "RESUMO DA SEMANA • DL",
    title: "Semana fechada com disciplina!",
    v1: "26h",
    l1: "HORAS LÍQUIDAS",
    v2: "420",
    l2: "QUESTÕES FEITAS",
    v3: "84%",
    l3: "TAXA DE ACERTO",
    body: "Fechando a semana com revisão pesada de Constitucional e Raciocínio Lógico. Domingo é dia de simulado completo cronometrado!",
    cta: "Como foi a sua semana de estudos?",
  },
};

const state = {
  template: "questao",
  slide: 1,
  format: "portrait",
  theme: "juridico",
  logoTheme: "original",
  bgPattern: "gradient",
  bgPhotoImg: null,
  bgDim: 0.7,
  planMode: "pro",
  showGuides: false,
  customAccent: null,
  fontScale: 1,
  avatarImg: null,
  customAvatarUploaded: false,
  manuscriptMode: false,
  questionImg: null,
};

function getActiveTheme() {
  const base = { ...THEMES[state.theme] };
  if (state.customAccent) {
    base.accent = state.customAccent;
    // Contraste automático para texto dentro de badges
    const hex = state.customAccent.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    base.accentText = luminance > 0.62 ? "#0f172a" : "#ffffff";
  }
  return base;
}

function sc(px) {
  return Math.round(px * state.fontScale);
}

function $(id) {
  return document.getElementById(id);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth) {
  const paragraphs = String(text || "").split("\n");
  const lines = [];
  for (const para of paragraphs) {
    const words = para.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }
    let current = words[0];
    for (let i = 1; i < words.length; i++) {
      const test = `${current} ${words[i]}`;
      if (ctx.measureText(test.replace(/==/g, "")).width <= maxWidth) {
        current = test;
      } else {
        lines.push(current);
        current = words[i];
      }
    }
    lines.push(current);
  }
  return lines;
}

function wrapTextPreserveHighlight(ctx, text, maxWidth) {
  return wrapText(ctx, text, maxWidth);
}

function drawWrappedLines(ctx, lines, x, startY, lineHeight, theme) {
  let y = startY;
  const activeTheme = theme || getActiveTheme();
  let inHighlight = false;

  for (const line of lines) {
    if (!line.includes("==") && !inHighlight) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      continue;
    }

    const parts = line.split(/(==)/g);
    const savedAlign = ctx.textAlign;
    const cleanFull = line.replace(/==/g, "");
    let curX = x;
    if (savedAlign === "center") curX = x - ctx.measureText(cleanFull).width / 2;
    else if (savedAlign === "right") curX = x - ctx.measureText(cleanFull).width;

    const savedFill = ctx.fillStyle;
    ctx.textAlign = "left";
    for (const part of parts) {
      if (part === "==") {
        inHighlight = !inHighlight;
        continue;
      }
      if (!part) continue;
      const w = ctx.measureText(part).width;
      if (inHighlight) {
        ctx.save();
        ctx.fillStyle = activeTheme.accent;
        ctx.globalAlpha = 0.28;
        roundRect(ctx, curX - 3, y - 2, w + 6, lineHeight * 0.84, 6);
        ctx.fill();
        ctx.restore();
      }
      ctx.fillStyle = inHighlight ? activeTheme.accent : savedFill;
      ctx.fillText(part, curX, y);
      curX += w;
    }
    ctx.fillStyle = savedFill;
    ctx.textAlign = savedAlign;
    y += lineHeight;
  }
  return y;
}

function drawBackground(theme, w, h) {
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, theme.bgTop);
  grad.addColorStop(1, theme.bgBottom);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  if (state.bgPhotoImg) {
    const img = state.bgPhotoImg;
    const scale = Math.max(w / img.width, h / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.fillStyle = `rgba(6, 10, 22, ${state.bgDim})`;
    ctx.fillRect(0, 0, w, h);
  }

  if (state.bgPattern === "grid") {
    ctx.save();
    ctx.strokeStyle = theme.text;
    ctx.globalAlpha = 0.045;
    ctx.lineWidth = 1;
    const step = 48;
    for (let x = 0; x <= w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();
  } else if (state.bgPattern === "dots") {
    ctx.save();
    ctx.fillStyle = theme.text;
    ctx.globalAlpha = 0.11;
    const step = 36;
    for (let x = 24; x < w; x += step) {
      for (let y = 24; y < h; y += step) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  // Subtle decorative glow circles
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = theme.accent;
  ctx.beginPath();
  ctx.arc(w * 0.9, h * 0.08, 260, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.1, h * 0.92, 220, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSafeGuides(w, h) {
  const { top, bottom } = getSafeVerticalBounds(h);
  ctx.save();
  ctx.strokeStyle = "#f43f5e";
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 8]);
  ctx.globalAlpha = 0.75;
  ctx.strokeRect(72, top - 10, w - 144, bottom - top + 20);
  ctx.fillStyle = "#f43f5e";
  ctx.font = "700 18px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText("ZONA SEGURA IG (não sai no PNG)", w - 76, top - 16);
  ctx.restore();
}

function drawVectorLogo(cx, cy, radius, pal, labelText, targetCtx = ctx) {
  targetCtx.save();
  // Fundo circular
  targetCtx.fillStyle = pal.bgTop;
  targetCtx.beginPath();
  targetCtx.arc(cx, cy, radius, 0, Math.PI * 2);
  targetCtx.fill();

  // Anel externo segmentado
  const ringW = Math.max(3, Math.round(radius * 0.095));
  const ringR = radius - Math.max(5, Math.round(radius * 0.12));
  targetCtx.strokeStyle = pal.accent;
  targetCtx.lineWidth = ringW;
  targetCtx.beginPath();
  targetCtx.arc(cx, cy, ringR, -Math.PI * 0.85, Math.PI * 0.45);
  targetCtx.stroke();

  targetCtx.beginPath();
  targetCtx.arc(cx, cy, ringR, Math.PI * 0.6, Math.PI * 1.0);
  targetCtx.stroke();

  // Monograma estilizado (ex: DL)
  const chars = (labelText || "DL").slice(0, 2).toUpperCase();
  const fontSize = Math.round(radius * 0.76);
  const offset = Math.round(radius * 0.24);
  targetCtx.font = `900 ${fontSize}px Inter, Segoe UI, sans-serif`;
  targetCtx.textAlign = "center";
  targetCtx.textBaseline = "middle";
  targetCtx.fillStyle = pal.text;
  targetCtx.fillText(chars[0] || "D", cx - offset, cy + Math.round(radius * 0.04));
  targetCtx.fillStyle = pal.accent;
  targetCtx.fillText(chars[1] || "L", cx + offset, cy + Math.round(radius * 0.04));
  targetCtx.restore();
}

function drawProfileHeader(theme, w, padX, topY) {
  const handle = $("profile-handle").value.trim() || "@dlconcurseiro";
  const name = $("profile-name").value.trim() || "DL Concurseiro";
  const avatarSize = 84;
  const cx = padX + avatarSize / 2;
  const cy = topY + avatarSize / 2;

  ctx.save();
  if (state.customAvatarUploaded && state.avatarImg) {
    ctx.beginPath();
    ctx.arc(cx, cy, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(state.avatarImg, padX, topY, avatarSize, avatarSize);
  } else if (state.logoTheme === "original" && state.avatarImg) {
    ctx.beginPath();
    ctx.arc(cx, cy, avatarSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(state.avatarImg, padX, topY, avatarSize, avatarSize);
  } else {
    const logoPal = THEMES[state.logoTheme] || theme;
    const initial = (handle.replace("@", "").slice(0, 2) || "DL").toUpperCase();
    drawVectorLogo(cx, cy, avatarSize / 2, logoPal, initial);
  }
  ctx.restore();

  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = theme.text;
  ctx.font = "800 31px Inter, Segoe UI, sans-serif";
  ctx.fillText(name, padX + avatarSize + 22, topY + 8);

  ctx.fillStyle = theme.muted;
  ctx.font = "600 25px Inter, Segoe UI, sans-serif";
  ctx.fillText(handle, padX + avatarSize + 22, topY + 46);

  if (state.template in DYNAMIC_TEMPLATES) {
    const firstField = DYNAMIC_TEMPLATES[state.template].fields[0]?.id;
    label = `${state.template.toUpperCase()} • ${getDyn(state.template, firstField).slice(0, 26) || "Post"}`;
  } else if (state.template === "questao") {
    const pillText = `${state.slide} / 2`;
    ctx.font = "800 22px Inter, Segoe UI, sans-serif";
    const pw = ctx.measureText(pillText).width + 32;
    const px = w - padX - pw;
    const py = topY + 18;
    ctx.fillStyle = theme.card;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, px, py, pw, 44, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.accent;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(pillText, px + pw / 2, py + 23);
  }

  return topY + avatarSize;
}

function drawBadge(theme, text, x, y) {
  ctx.font = "800 24px Inter, Segoe UI, sans-serif";
  const tw = ctx.measureText(text).width;
  const bw = tw + 44;
  const bh = 52;
  ctx.fillStyle = theme.accent;
  roundRect(ctx, x, y, bw, bh, 26);
  ctx.fill();

  ctx.fillStyle = theme.accentText;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x + 22, y + bh / 2 + 1);
  return { w: bw, h: bh };
}

function getSafeVerticalBounds(h) {
  if (state.format === "story") {
    return { top: 240, bottom: h - 210 };
  }
  if (state.format === "square") {
    return { top: 64, bottom: h - 64 };
  }
  return { top: 72, bottom: h - 72 };
}

function renderQuestao(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);

  const banca = $("q-banca").value.trim().toUpperCase();
  const materia = $("q-materia").value.trim();
  const enunciado = $("q-enunciado").value.trim();
  const alts = [
    { key: "A", text: $("q-alt-a").value.trim() },
    { key: "B", text: $("q-alt-b").value.trim() },
    { key: "C", text: $("q-alt-c").value.trim() },
    { key: "D", text: $("q-alt-d").value.trim() },
    { key: "E", text: $("q-alt-e").value.trim() },
  ].filter((a) => a.text.length > 0);
  const gabarito = $("q-gabarito").value;
  const cta = $("q-cta").value.trim();
  const comentario = $("q-comentario").value.trim();

  let cursorY = headerBottom + 40;

  const badgeText = state.slide === 1 ? (banca || "QUESTÃO DO DIA") : `GABARITO: LETRA ${gabarito}`;
  const b1 = drawBadge(theme, badgeText, padX, cursorY);

  if (materia) {
    ctx.font = "700 24px Inter, Segoe UI, sans-serif";
    ctx.fillStyle = theme.muted;
    ctx.textBaseline = "middle";
    ctx.fillText(`•  ${materia}`, padX + b1.w + 20, cursorY + b1.h / 2 + 1);
  }
  cursorY += b1.h + 34;

  const contentW = w - padX * 2;
  const maxContentBottom = bottom - 56;
  const isCompact = state.format === "square";

  // Adaptive sizing for Slide 1 so text is large on mobile and never overflows
  let enuncSize = sc(state.slide === 1 ? (isCompact ? 32 : 38) : (isCompact ? 27 : 31));
  let altSize = sc(isCompact ? 25 : 29);
  let enuncLines = [];
  let enuncLineH = 0;

  let imgRenderH = 0;
  if (state.slide === 1 && state.questionImg) {
    const maxImgH = isCompact ? 220 : (state.format === "story" ? 420 : 310);
    const scale = Math.min(contentW / state.questionImg.width, maxImgH / state.questionImg.height, 1);
    imgRenderH = Math.round(state.questionImg.height * scale);
  }

  if (state.slide === 1) {
    for (let step = 0; step < 5; step++) {
      ctx.font = `700 ${enuncSize}px Inter, Segoe UI, sans-serif`;
      enuncLines = wrapText(ctx, enunciado, contentW);
      enuncLineH = Math.round(enuncSize * 1.32);

      let totalAltH = 0;
      ctx.font = `600 ${altSize}px Inter, Segoe UI, sans-serif`;
      const altLineH = Math.round(altSize * 1.34);
      for (const alt of alts) {
        const lines = wrapText(ctx, alt.text, contentW - 56);
        totalAltH += Math.max(74, lines.length * altLineH + 34) + 14;
      }

      const imgBlock = imgRenderH > 0 ? imgRenderH + 24 : 0;
      const estimatedBottom = cursorY + enuncLines.length * enuncLineH + 24 + imgBlock + totalAltH;
      if (estimatedBottom <= maxContentBottom) break;
      enuncSize -= 3;
      altSize -= 2;
      if (imgRenderH > 160) imgRenderH = Math.round(imgRenderH * 0.85);
    }
  } else {
    ctx.font = `600 ${enuncSize}px Inter, Segoe UI, sans-serif`;
    enuncLines = wrapText(ctx, enunciado, contentW);
    enuncLineH = Math.round(enuncSize * 1.32);
  }

  ctx.fillStyle = theme.text;
  ctx.font = `${state.slide === 1 ? 700 : 600} ${enuncSize}px Inter, Segoe UI, sans-serif`;
  ctx.textBaseline = "top";
  cursorY = drawWrappedLines(ctx, enuncLines, padX, cursorY, enuncLineH) + 22;

  if (state.slide === 1 && state.questionImg && imgRenderH > 0) {
    const img = state.questionImg;
    const scale = Math.min(contentW / img.width, imgRenderH / img.height);
    const drawW = Math.round(img.width * scale);
    const drawH = Math.round(img.height * scale);
    const drawX = padX + Math.round((contentW - drawW) / 2);

    ctx.save();
    roundRect(ctx, drawX, cursorY, drawW, drawH, 16);
    ctx.clip();
    ctx.drawImage(img, drawX, cursorY, drawW, drawH);
    ctx.restore();

    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, drawX, cursorY, drawW, drawH, 16);
    ctx.stroke();

    cursorY += drawH + 22;
  }

  if (state.slide === 1) {
    const altLineH = Math.round(altSize * 1.34);
    for (const alt of alts) {
      ctx.font = `600 ${altSize}px Inter, Segoe UI, sans-serif`;
      const altLines = wrapText(ctx, alt.text, contentW - 56);
      const boxH = Math.max(82, altLines.length * altLineH + 36);

      ctx.fillStyle = theme.card;
      ctx.strokeStyle = theme.cardBorder;
      ctx.lineWidth = 2;
      roundRect(ctx, padX, cursorY, contentW, boxH, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = theme.text;
      ctx.textBaseline = "top";
      drawWrappedLines(ctx, altLines, padX + 28, cursorY + 18, altLineH);
      cursorY += boxH + 16;
    }
  } else {
    const correctAlt = alts.find((a) => a.key === gabarito);
    if (correctAlt) {
      ctx.font = "700 29px Inter, Segoe UI, sans-serif";
      const cLines = wrapText(ctx, correctAlt.text, contentW - 56);
      const boxH = Math.max(86, cLines.length * 39 + 38);

      ctx.fillStyle = theme.successBg;
      ctx.strokeStyle = theme.success;
      ctx.lineWidth = 3;
      roundRect(ctx, padX, cursorY, contentW, boxH, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = theme.text;
      drawWrappedLines(ctx, cLines, padX + 28, cursorY + 19, 39);
      cursorY += boxH + 28;
    }

    let commSize = isCompact ? 27 : 31;
    let commLines = [];
    let commLineH = 0;
    for (let step = 0; step < 3; step++) {
      ctx.font = `500 ${commSize}px Inter, Segoe UI, sans-serif`;
      commLines = wrapText(ctx, comentario, contentW - 64);
      commLineH = Math.round(commSize * 1.38);
      if (cursorY + commLines.length * commLineH + 100 <= maxContentBottom) break;
      commSize -= 3;
    }

    const commBoxH = Math.max(200, commLines.length * commLineH + 102);

    ctx.fillStyle = theme.card;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, padX, cursorY, contentW, commBoxH, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.accent;
    ctx.font = "800 23px Inter, Segoe UI, sans-serif";
    ctx.fillText("COMENTÁRIO DO GABARITO", padX + 32, cursorY + 28);

    ctx.fillStyle = theme.text;
    ctx.font = `500 ${commSize}px Inter, Segoe UI, sans-serif`;
    drawWrappedLines(ctx, commLines, padX + 32, cursorY + 74, commLineH);
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(cta || "Salve e compartilhe com quem está estudando!", w / 2, bottom);
}

function renderEdital(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 46);
  const badge = $("e-badge").value.trim().toUpperCase() || "EDITAL ABERTO";
  const b = drawBadge(theme, badge, padX, cursorY);
  cursorY += b.h + (isCompact ? 24 : 34);

  const orgao = $("e-orgao").value.trim();
  ctx.fillStyle = theme.text;
  const editalTitleSize = sc(isCompact ? 44 : 54);
  ctx.font = `800 ${editalTitleSize}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const titleLines = wrapText(ctx, orgao, contentW);
  cursorY = drawWrappedLines(ctx, titleLines, padX, cursorY, Math.round(editalTitleSize * 1.18)) + (isCompact ? 26 : 38);

  const items = [
    { label: "VAGAS", value: $("e-vagas").value.trim() },
    { label: "REMUNERAÇÃO", value: $("e-salario").value.trim() },
    { label: "ESCOLARIDADE", value: $("e-escolaridade").value.trim() },
    { label: "BANCA", value: $("e-banca").value.trim() },
    { label: "INSCRIÇÕES", value: $("e-prazo").value.trim() },
    { label: "DATA DA PROVA", value: $("e-prova").value.trim() },
  ].filter((i) => i.value.length > 0);

  const gap = isCompact ? 10 : 14;
  const availH = bottom - 48 - cursorY;
  const boxH = items.length ? Math.min(isCompact ? 80 : 102, Math.floor(availH / items.length) - gap) : 96;
  const valSize = sc(boxH < 86 ? 26 : (isCompact ? 28 : 32));

  for (const item of items) {
    ctx.fillStyle = theme.card;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, padX, cursorY, contentW, boxH, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.accent;
    ctx.font = `800 ${boxH < 86 ? 18 : 21}px Inter, Segoe UI, sans-serif`;
    ctx.fillText(item.label, padX + 28, cursorY + Math.round(boxH * 0.16));

    ctx.fillStyle = theme.text;
    ctx.font = `700 ${valSize}px Inter, Segoe UI, sans-serif`;
    ctx.fillText(item.value, padX + 28, cursorY + Math.round(boxH * 0.46));

    cursorY += boxH + gap;
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText($("e-cta").value.trim(), w / 2, bottom);
}

function renderRotina(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 40 : 54);
  const tag = $("r-tag").value.trim().toUpperCase();
  const metric = $("r-metric").value.trim();

  if (tag) {
    const b = drawBadge(theme, tag, padX, cursorY);
    if (metric) {
      ctx.fillStyle = theme.text;
      ctx.font = "800 28px Inter, Segoe UI, sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      ctx.fillText(metric, w - padX, cursorY + b.h / 2 + 1);
    }
    cursorY += b.h + 42;
  }

  const title = $("r-title").value.trim();
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = theme.text;
  const rotinaTitleSize = sc(isCompact ? 46 : 56);
  ctx.font = `800 ${rotinaTitleSize}px Inter, Segoe UI, sans-serif`;
  const titleLines = wrapText(ctx, title, contentW);
  cursorY = drawWrappedLines(ctx, titleLines, padX, cursorY, Math.round(rotinaTitleSize * 1.18)) + 36;

  const body = $("r-body").value.trim();
  const bodySize = sc(isCompact ? 31 : 35);
  const bodyLineH = Math.round(bodySize * 1.42);
  ctx.font = `500 ${bodySize}px Inter, Segoe UI, sans-serif`;
  const bodyLines = wrapText(ctx, body, contentW - 76);
  const cardH = Math.max(250, bodyLines.length * bodyLineH + 80);

  ctx.fillStyle = theme.card;
  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  roundRect(ctx, padX, cursorY, contentW, cardH, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  roundRect(ctx, padX, cursorY, 12, cardH, 6);
  ctx.fill();

  ctx.fillStyle = theme.text;
  drawWrappedLines(ctx, bodyLines, padX + 42, cursorY + 40, bodyLineH);

  ctx.fillStyle = theme.muted;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText($("r-footer").value.trim(), w / 2, bottom);
}

function renderComparativo(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 46);
  const tag = $("c-tag").value.trim().toUpperCase();
  if (tag) {
    const b = drawBadge(theme, tag, padX, cursorY);
    cursorY += b.h + (isCompact ? 22 : 32);
  }

  const title = $("c-title").value.trim();
  const titleSize = sc(isCompact ? 42 : 50);
  ctx.fillStyle = theme.text;
  ctx.font = `800 ${titleSize}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const titleLines = wrapText(ctx, title, contentW);
  cursorY = drawWrappedLines(ctx, titleLines, padX, cursorY, Math.round(titleSize * 1.18)) + (isCompact ? 26 : 36);

  const colGap = 24;
  const colW = (contentW - colGap) / 2;
  const cardH = Math.max(360, bottom - 60 - cursorY);

  const sides = [
    {
      x: padX,
      title: $("c-a-title").value.trim(),
      lines: $("c-a-body").value.split("\n").map((s) => s.trim()).filter(Boolean),
      accent: theme.accent,
    },
    {
      x: padX + colW + colGap,
      title: $("c-b-title").value.trim(),
      lines: $("c-b-body").value.split("\n").map((s) => s.trim()).filter(Boolean),
      accent: theme.success,
    },
  ];

  const itemSize = sc(isCompact ? 24 : 27);
  const itemLineH = Math.round(itemSize * 1.34);

  for (const side of sides) {
    ctx.fillStyle = theme.card;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, side.x, cursorY, colW, cardH, 24);
    ctx.fill();
    ctx.stroke();

    // Top bar
    ctx.fillStyle = side.accent;
    roundRect(ctx, side.x, cursorY, colW, 12, 6);
    ctx.fill();

    ctx.fillStyle = side.accent;
    ctx.font = `800 ${sc(isCompact ? 28 : 32)}px Inter, Segoe UI, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const headLines = wrapText(ctx, side.title, colW - 48);
    let innerY = drawWrappedLines(ctx, headLines, side.x + 24, cursorY + 34, 38) + 22;

    ctx.fillStyle = theme.text;
    ctx.font = `500 ${itemSize}px Inter, Segoe UI, sans-serif`;
    for (const pt of side.lines) {
      const wrapped = wrapText(ctx, `• ${pt}`, colW - 48);
      innerY = drawWrappedLines(ctx, wrapped, side.x + 24, innerY, itemLineH) + 18;
    }
  }

  // Central VS badge
  const vsX = w / 2;
  const vsY = cursorY + 46;
  ctx.fillStyle = theme.bgTop;
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(vsX, vsY, 32, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = theme.accent;
  ctx.font = "800 22px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("VS", vsX, vsY + 1);

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.fillText($("c-cta").value.trim(), w / 2, bottom);
}

function renderChecklist(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 46);
  const tag = $("l-tag").value.trim().toUpperCase();
  if (tag) {
    const b = drawBadge(theme, tag, padX, cursorY);
    cursorY += b.h + (isCompact ? 22 : 30);
  }

  const title = $("l-title").value.trim();
  const titleSize = sc(isCompact ? 40 : 48);
  ctx.fillStyle = theme.text;
  ctx.font = `800 ${titleSize}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const titleLines = wrapText(ctx, title, contentW);
  cursorY = drawWrappedLines(ctx, titleLines, padX, cursorY, Math.round(titleSize * 1.18)) + (isCompact ? 24 : 34);

  const items = $("l-items")
    .value.split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 5);

  const itemSize = sc(isCompact ? 25 : 29);
  const itemLineH = Math.round(itemSize * 1.32);

  items.forEach((item, idx) => {
    ctx.font = `600 ${itemSize}px Inter, Segoe UI, sans-serif`;
    const lines = wrapText(ctx, item, contentW - 120);
    const boxH = Math.max(isCompact ? 82 : 96, lines.length * itemLineH + 34);

    ctx.fillStyle = theme.card;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, padX, cursorY, contentW, boxH, 20);
    ctx.fill();
    ctx.stroke();

    // Number pill
    const numSize = 48;
    const numX = padX + 22;
    const numY = cursorY + (boxH - numSize) / 2;
    ctx.fillStyle = theme.accent;
    roundRect(ctx, numX, numY, numSize, numSize, 14);
    ctx.fill();

    ctx.fillStyle = theme.accentText;
    ctx.font = "800 24px Inter, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`0${idx + 1}`, numX + numSize / 2, numY + numSize / 2 + 1);

    ctx.fillStyle = theme.text;
    ctx.font = `600 ${itemSize}px Inter, Segoe UI, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const textBlockH = lines.length * itemLineH;
    drawWrappedLines(ctx, lines, padX + 92, cursorY + (boxH - textBlockH) / 2 + 2, itemLineH);

    cursorY += boxH + (isCompact ? 12 : 16);
  });

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText($("l-cta").value.trim(), w / 2, bottom);
}

function renderMetas(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 46);
  const tag = $("m-tag").value.trim().toUpperCase();
  if (tag) {
    const b = drawBadge(theme, tag, padX, cursorY);
    cursorY += b.h + (isCompact ? 22 : 32);
  }

  const title = $("m-title").value.trim();
  const titleSize = sc(isCompact ? 42 : 52);
  ctx.fillStyle = theme.text;
  ctx.font = `800 ${titleSize}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const titleLines = wrapText(ctx, title, contentW);
  cursorY = drawWrappedLines(ctx, titleLines, padX, cursorY, Math.round(titleSize * 1.18)) + (isCompact ? 26 : 36);

  const stats = [
    { val: $("m-v1").value.trim(), lbl: $("m-l1").value.trim().toUpperCase() },
    { val: $("m-v2").value.trim(), lbl: $("m-l2").value.trim().toUpperCase() },
    { val: $("m-v3").value.trim(), lbl: $("m-l3").value.trim().toUpperCase() },
  ];

  const gap = 18;
  const cardW = (contentW - gap * 2) / 3;
  const statH = isCompact ? 150 : 178;

  stats.forEach((st, i) => {
    const sx = padX + i * (cardW + gap);
    ctx.fillStyle = theme.card;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, sx, cursorY, cardW, statH, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.accent;
    ctx.font = `800 ${sc(isCompact ? 46 : 56)}px Inter, Segoe UI, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(st.val, sx + cardW / 2, cursorY + statH * 0.42);

    ctx.fillStyle = theme.muted;
    ctx.font = "800 18px Inter, Segoe UI, sans-serif";
    ctx.fillText(st.lbl, sx + cardW / 2, cursorY + statH * 0.76);
  });

  cursorY += statH + (isCompact ? 24 : 32);

  const body = $("m-body").value.trim();
  const bodySize = sc(isCompact ? 27 : 31);
  const bodyLineH = Math.round(bodySize * 1.4);
  ctx.font = `500 ${bodySize}px Inter, Segoe UI, sans-serif`;
  const bodyLines = wrapText(ctx, body, contentW - 68);
  const bodyH = Math.max(isCompact ? 160 : 210, bodyLines.length * bodyLineH + 68);

  ctx.fillStyle = theme.card;
  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  roundRect(ctx, padX, cursorY, contentW, bodyH, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.text;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  drawWrappedLines(ctx, bodyLines, padX + 34, cursorY + 34, bodyLineH);

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText($("m-cta").value.trim(), w / 2, bottom);
}

const DYNAMIC_TEMPLATES = {
  ...(window.EXTRA_TEMPLATES || {}),
  flashcard: {
    heading: "3. Flashcard (Pergunta & Resposta)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "FLASHCARD RÁPIDO • DIREITO", ex: "FLASHCARD • PORTUGUÊS" },
      { id: "front", label: "Frente (Pergunta)", type: "textarea", def: "Qual é o prazo da prisão temporária em crimes hediondos?", ex: "Qual a diferença entre 'a fim de' e 'afim'?" },
      { id: "back", label: "Verso (Resposta Direta)", type: "textarea", def: "30 dias, prorrogável por igual período em caso de extrema e comprovada necessidade (Lei 7.960/89).", ex: "'A fim de' (separado) indica finalidade (= para). 'Afim' (junto) indica afinidade, semelhança ou parentesco." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Respondeu antes de olhar o verso? Comenta!", ex: "Salve para revisar antes da prova!" },
    ],
  },
  mnemonico: {
    heading: "3. Mnemônico / Macete de Prova",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "MACETE INFALÍVEL • CONSTITUCIONAL", ex: "MACETE • DIREITO ADMINISTRATIVO" },
      { id: "title", label: "Tema do Mnemônico", type: "text", def: "Fundamentos da República (Art. 1º CF)", ex: "Poderes da Administração (L-H-D-P-R)" },
      { id: "acronym", label: "Sigla / Palavra-Chave", type: "text", def: "SO-CI-DI-VA-PLU", ex: "L-I-M-P-E" },
      { id: "lines", label: "Significados (1 por linha: LETRA = Significado)", type: "textarea", def: "SO = Soberania\nCI = Cidadania\nDI = Dignidade da Pessoa Humana\nVA = Valores Sociais do Trabalho\nPLU = Pluralismo Político", ex: "L = Legalidade\nI = Impessoalidade\nM = Moralidade\nP = Publicidade\nE = Eficiência" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Qual outro macete você usa? Manda nos comentários!", ex: "Salve esse macete para nunca mais esquecer!" },
    ],
  },
  jurisprudencia: {
    heading: "3. Súmula / Informativo STF & STJ",
    fields: [
      { id: "court", label: "Tribunal / Número", type: "text", def: "SÚMULA VINCULANTE 13 • STF", ex: "TEMA 1.199 • STF (REPERCUSSÃO GERAL)" },
      { id: "subject", label: "Matéria / Assunto", type: "text", def: "Nepotismo na Administração Pública", ex: "Improbidade Administrativa" },
      { id: "thesis", label: "Texto da Súmula / Tese", type: "textarea", def: "A nomeação de cônjuge, companheiro ou parente até o terceiro grau para cargo em comissão ou função gratificada viola a Constituição Federal.", ex: "A nova Lei de Improbidade exige comprovação de DOLO específico para condenação, não bastando culpa." },
      { id: "tip", label: "Como cai na prova", type: "textarea", def: "ATENÇÃO: Cargos de natureza POLÍTICA (ex: Ministro de Estado, Secretário) ficam fora da regra, salvo fraude!", ex: "PEGADINHA: Não existe mais improbidade culposa na Lei 8.429/92 após a reforma!" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Salve essa súmula para sua revisão semanal!", ex: "Compartilhe com quem vai prestar carreira jurídica ou policial!" },
    ],
  },
  contagem: {
    heading: "3. Contagem Regressiva para Prova",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "CONTAGEM REGRESSIVA", ex: "RETA FINAL • FOCO TOTAL" },
      { id: "days", label: "Número em Destaque", type: "text", def: "30", ex: "15" },
      { id: "unit", label: "Unidade (ex: DIAS PARA A PROVA)", type: "text", def: "DIAS PARA A PROVA", ex: "DIAS PARA O EDITAL" },
      { id: "exam", label: "Nome do Concurso", type: "text", def: "Polícia Federal • Agente & Escrivão", ex: "TRT • Analista e Técnico Judiciário" },
      { id: "progress", label: "Progresso da Preparação (0 a 100)", type: "text", def: "75", ex: "90" },
      { id: "quote", label: "Frase de Foco", type: "textarea", def: "Não é hora de inventar matéria nova: foco total em revisão, lei seca e simulados da banca!", ex: "Ajuste os últimos detalhes do caderno de erros. A vaga já tem dono!" },
    ],
  },
  cronograma: {
    heading: "3. Ciclo / Cronograma Semanal",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "CICLO DE ESTUDOS • 4H/DIA", ex: "CRONOGRAMA PÓS-EDITAL" },
      { id: "title", label: "Título do Cronograma", type: "text", def: "Minha semana de preparação", ex: "Rotina Foco Área Fiscal" },
      { id: "rows", label: "Blocos (1 por linha: DIA | Matéria • Foco)", type: "textarea", def: "SEG | Português + 40 questões FGV\nTER | Direito Constitucional + Lei Seca\nQUA | Direito Administrativo + Anki\nQUI | Raciocínio Lógico + Caderno de Erros\nSEX | Informática + Legislação Específica\nSÁB | Simulado Cronometrado + Correção", ex: "BLOCO 1 | Contabilidade Geral (2h)\nBLOCO 2 | Direito Tributário (2h)\nBLOCO 3 | Auditoria + Questões (1h30)\nBLOCO 4 | Português FGV (1h)\nBLOCO 5 | Revisão + Lei Seca (1h)" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Salve como modelo para montar o seu ciclo!", ex: "Qual matéria você tem mais dificuldade no ciclo?" },
    ],
  },
  banca: {
    heading: "3. Raio-X da Banca Examinadora",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "RAIO-X DA BANCA", ex: "PERFIL DA BANCA" },
      { id: "name", label: "Nome da Banca", type: "text", def: "FGV (Fundação Getulio Vargas)", ex: "CEBRASPE (Cespe)" },
      { id: "style", label: "Estilo das Questões", type: "text", def: "Casos práticos longos e interpretação pesada", ex: "Certo/Errado (1 errada anula 1 certa)" },
      { id: "trap", label: "Pegadinha Clássica", type: "text", def: "Alternativas muito parecidas em Português", ex: "Trocar 'poderá' por 'deverá' e exceções da lei" },
      { id: "tip", label: "Dica de Ouro", type: "textarea", def: "Treine exclusivamente provas recentes da FGV (2023–2026) para pegar o jeito dos enunciados longos e não perder tempo na prova.", ex: "Na dúvida real sem base nenhuma, deixe em branco! Chutar sem critério derruba sua nota líquida." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Qual banca você mais teme? Comenta aqui!", ex: "Salve esse Raio-X antes de fazer simulados!" },
    ],
  },
  erros: {
    heading: "3. Erros que Reprovam",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "ALERTA DE PROVA", ex: "PARE DE COMETER ESSES ERROS" },
      { id: "title", label: "Título Principal", type: "text", def: "3 erros que te afastam da aprovação", ex: "3 erros clássicos na reta final" },
      { id: "items", label: "Erros (1 por linha: Erro | Como evitar)", type: "textarea", def: "Só assistir videoaula | Troque 50% do tempo por resolução ativa de questões.\nNão revisar o que errou | Monte um caderno de erros e revise toda semana.\nEstudar sem edital base | Escolha 1 área (Tribunais, Policial ou Fiscal) e foque.", ex: "Madrugar sem dormir bem | Sono consolida a memória de longo prazo.\nIgnorar Português | É a matéria que mais desempata em qualquer concurso.\nPular simulados | Treine tempo de prova e controle emocional antes do dia D." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Com qual desses você já sofreu? Seja sincero!", ex: "Envie para um amigo que precisa ler isso hoje!" },
    ],
  },
  capa: {
    heading: "3. Capa de Reels / YouTube (Alta Impacto)",
    fields: [
      { id: "tag", label: "Selo Superior", type: "text", def: "ASSISTA ANTES DA PROVA", ex: "REVISÃO DE VÉSPERA" },
      { id: "title", label: "Título Gigante (2–4 palavras por linha)", type: "textarea", def: "COMO GABARITAR\nDIREITO\nCONSTITUCIONAL", ex: "O SEGREDO DOS\nAPROVADOS\nEM 2026" },
      { id: "sub", label: "Subtítulo Curto", type: "text", def: "O método prático que mudou meus acertos de 60% para 88%", ex: "Passo a passo direto ao ponto sem enrolação" },
      { id: "cta", label: "Rodapé / Ação", type: "text", def: "TOQUE PARA ASSISTIR  ▶", ex: "SALVE PARA VER DEPOIS  ▶" },
    ],
  },
  depoimento: {
    heading: "3. Aprovado / Prova Social",
    fields: [
      { id: "tag", label: "Selo de Conquista", type: "text", def: "NOMEADO / APROVADO", ex: "CONQUISTA DO DIA" },
      { id: "person", label: "Nome & Cargo Conquistado", type: "text", def: "Lucas M. • Técnico Judiciário (TRT)", ex: "Mariana S. • Agente da Polícia Civil" },
      { id: "score", label: "Classificação / Nota", type: "text", def: "14º Lugar Geral • 89% na objetiva", ex: "Aprovada dentro das vagas imediatas!" },
      { id: "quote", label: "Depoimento / Mensagem", type: "textarea", def: "\"Foram 14 meses acordando às 5h30 antes do trabalho. Reprovei 3 vezes antes de bater na trave e finalmente ver meu nome no Diário Oficial. Não desistam!\"", ex: "\"A constância nos dias ruins foi o que me trouxe até a posse. Cada questão comentada fez diferença!\"" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "O próximo nome no Diário Oficial será o seu!", ex: "Deixe um parabéns nos comentários! 👏" },
    ],
  },
  citacao: {
    heading: "3. Frase / Motivação Editorial",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "MENTALIDADE DE APROVADO", ex: "REFLEXÃO DO DIA" },
      { id: "quote", label: "Frase Principal", type: "textarea", def: "A disciplina é a ponte entre o sonho da posse e o nome no Diário Oficial.", ex: "Estudar cansado, sem vontade e mesmo assim cumprir a meta é o que separa quem passa de quem tenta." },
      { id: "author", label: "Autor / Assinatura", type: "text", def: "— @dlconcurseiro", ex: "— @dlconcurseiro • Rumo à Posse" },
      { id: "cta", label: "Rodapé / Hashtag", type: "text", def: "Salve para ler nos dias difíceis • #FocoNaVaga", ex: "Compartilhe nos Stories se você concorda!" },
    ],
  },
  salario: {
    heading: "3. Quanto Ganha? (Salário & Benefícios)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "QUANTO GANHA?", ex: "REMUNERAÇÃO REAL" },
      { id: "role", label: "Cargo / Órgão", type: "text", def: "Técnico Judiciário • Tribunais (TRT/TRE)", ex: "Auditor-Fiscal da Receita Federal" },
      { id: "initial", label: "Salário Inicial", type: "text", def: "R$ 9.773,56", ex: "R$ 21.029,09" },
      { id: "final", label: "Topo da Carreira", type: "text", def: "R$ 14.382,70", ex: "R$ 30.303,62" },
      { id: "benefits", label: "Benefícios (1 por linha)", type: "textarea", def: "Auxílio-Alimentação: R$ 1.393,10\nAuxílio-Saúde + Assistência Pré-Escolar\nEstabilidade + 30 dias de férias + Recesso Forense", ex: "Bônus de Eficiência e Produtividade\nAuxílio-Alimentação + Saúde\nTeletrabalho após estágio probatório" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Teria interesse nesse cargo? Comenta aqui!", ex: "Marque quem merece ganhar esse salário!" },
    ],
  },
  dica_rapida: {
    heading: "3. Dica Relâmpago (Pílula de Conteúdo)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "DICA RELÂMPAGO • PORTUGUÊS", ex: "PÍLULA DE DIREITO" },
      { id: "title", label: "Título da Dica", type: "text", def: "Crase antes de palavras masculinas", ex: "Prazo da Decadência Administrativa" },
      { id: "rule", label: "Regra Direta", type: "textarea", def: "Em regra, NÃO se usa crase antes de palavra masculina. Exceção: quando estiver subentendida a expressão 'à moda de' (ex: bife à milanesa).", ex: "A Administração tem 5 anos para anular atos dos quais decorram efeitos favoráveis aos destinatários (salvo má-fé)." },
      { id: "right", label: "Exemplo Certo", type: "text", def: "✓ Foi a pé para a prova.", ex: "✓ Anulação em até 5 anos (Lei 9.784/99)." },
      { id: "wrong", label: "Exemplo Errado", type: "text", def: "✕ Foi à pé para a prova.", ex: "✕ Pode anular a qualquer tempo mesmo de boa-fé." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Salve para não cair nessa pegadinha!", ex: "Você acertaria essa na prova?" },
    ],
  },
  noticia: {
    heading: "3. Plantão / Última Hora (News)",
    fields: [
      { id: "badge", label: "Selo de Urgência", type: "text", def: "URGENTE • NOVO CONCURSO", ex: "ATUALIZAÇÃO DE EDITAL" },
      { id: "headline", label: "Manchete Principal", type: "textarea", def: "Banca definida para o próximo concurso do INSS com previsão de 1.000 vagas!", ex: "Saiu a autorização oficial para novo concurso da Polícia Rodoviária Federal!" },
      { id: "summary", label: "Resumo da Notícia", type: "textarea", def: "O contrato foi publicado no Diário Oficial da União hoje. A expectativa é de edital nos próximos 60 dias para nível médio e superior.", ex: "Serão ofertadas vagas com salário inicial acima de R$ 11 mil e provas previstas em todas as capitais." },
      { id: "source", label: "Fonte / Data", type: "text", def: "Fonte: Diário Oficial da União • Hoje", ex: "Fonte: Ministério da Gestão • 2026" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Envie para quem está esperando esse concurso!", ex: "Siga @dlconcurseiro para acompanhar!" },
    ],
  },
  enquete: {
    heading: "3. Enquete / Debate nos Comentários",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "QUAL VOCÊ PREFERE?", ex: "DEBATE DE CONCURSEIROS" },
      { id: "question", label: "Pergunta do Debate", type: "textarea", def: "Na sua preparação diária, o que funciona melhor para você?", ex: "Qual carreira você escolheria hoje se pudesse tomar posse amanhã?" },
      { id: "optA", label: "Opção A", type: "text", def: "A) Estudar por PDF + Questões", ex: "A) Área Policial (PF / PRF)" },
      { id: "subA", label: "Detalhe A", type: "text", def: "Mais rápido, objetivo e fácil de revisar", ex: "Ação, porte, escala e adrenalina" },
      { id: "optB", label: "Opção B", type: "text", def: "B) Videoaula + Resumos", ex: "B) Tribunais (TRT / TRE / TJ)" },
      { id: "subB", label: "Detalhe B", type: "text", def: "Ajuda a fixar matérias do zero", ex: "Rotina previsível, recesso e home office" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Vote comentando A ou B aqui embaixo! 👇", ex: "Qual é a sua escolha? Comenta A ou B!" },
    ],
  },
};

const dynamicValues = {};
for (const [tpl, cfg] of Object.entries(DYNAMIC_TEMPLATES)) {
  dynamicValues[tpl] = {};
  for (const f of cfg.fields) {
    dynamicValues[tpl][f.id] = f.def;
  }
}

function getDyn(tpl, id) {
  return (dynamicValues[tpl]?.[id] ?? "").trim();
}

let quoteCursor = 0;

function getFilteredQuotes(category, query) {
  const bank = window.MOTIVATION_QUOTES || {};
  const entries = [];
  const q = (query || "").trim().toLowerCase();
  for (const [cat, list] of Object.entries(bank)) {
    if (category !== "ALL" && cat !== category) continue;
    for (const text of list) {
      if (!q || text.toLowerCase().includes(q)) {
        entries.push({ cat, text });
      }
    }
  }
  return entries;
}

function renderDynamicFields(tpl) {
  const cfg = DYNAMIC_TEMPLATES[tpl];
  const container = $("fields-dynamic");
  if (!cfg) return;
  container.innerHTML = `<h2>${cfg.heading}</h2>`;

  if (tpl === "citacao" && window.MOTIVATION_QUOTES) {
    const bank = window.MOTIVATION_QUOTES;
    const cats = Object.keys(bank);
    const totalCount = cats.reduce((acc, c) => acc + bank[c].length, 0);

    const box = document.createElement("div");
    box.className = "quote-bank-box";
    box.innerHTML = `
      <div class="quote-bank-header">
        <span>Banco de ${totalCount} Frases Motivacionais</span>
        <span class="quote-bank-count" id="qb-count">${totalCount} disponíveis</span>
      </div>
      <label class="field">
        <span>Temática</span>
        <select id="qb-category">
          <option value="ALL">Todas as temáticas (${totalCount})</option>
          ${cats.map((c) => `<option value="${c}">${c} (${bank[c].length})</option>`).join("")}
        </select>
      </label>
      <label class="field">
        <span>Buscar palavra-chave (opcional)</span>
        <input id="qb-search" type="text" placeholder="Ex: café, FGV, posse, reprovação..." />
      </label>
      <div class="grid-2">
        <button id="qb-random" class="btn btn-primary" type="button">Sortear Frase</button>
        <button id="qb-next" class="btn btn-secondary" type="button">Próxima Frase →</button>
      </div>
      <button id="qb-batch-zip" class="btn btn-secondary" type="button">Baixar Lote (5 Frases .ZIP)</button>
    `;
    container.appendChild(box);

    const applyEntry = (entry, index, total) => {
      if (!entry) return;
      dynamicValues.citacao.tag = entry.cat.toUpperCase();
      dynamicValues.citacao.quote = entry.text;
      const tagInput = $("dyn-citacao-tag");
      const quoteInput = $("dyn-citacao-quote");
      if (tagInput) tagInput.value = entry.cat.toUpperCase();
      if (quoteInput) quoteInput.value = entry.text;
      const countEl = $("qb-count");
      if (countEl) countEl.textContent = `Frase ${index + 1} de ${total}`;
      render();
    };

    const catSel = box.querySelector("#qb-category");
    const searchInp = box.querySelector("#qb-search");

    const updateCount = () => {
      const list = getFilteredQuotes(catSel.value, searchInp.value);
      box.querySelector("#qb-count").textContent = `${list.length} disponíveis`;
      quoteCursor = 0;
    };

    catSel.addEventListener("change", updateCount);
    searchInp.addEventListener("input", updateCount);

    box.querySelector("#qb-random").addEventListener("click", () => {
      const list = getFilteredQuotes(catSel.value, searchInp.value);
      if (!list.length) return;
      quoteCursor = Math.floor(Math.random() * list.length);
      applyEntry(list[quoteCursor], quoteCursor, list.length);
    });

    box.querySelector("#qb-next").addEventListener("click", () => {
      const list = getFilteredQuotes(catSel.value, searchInp.value);
      if (!list.length) return;
      quoteCursor = (quoteCursor + 1) % list.length;
      applyEntry(list[quoteCursor], quoteCursor, list.length);
    });

    box.querySelector("#qb-batch-zip").addEventListener("click", async () => {
      const list = getFilteredQuotes(catSel.value, searchInp.value);
      if (!list.length) return;
      const btn = box.querySelector("#qb-batch-zip");
      const orig = btn.textContent;
      btn.textContent = "Gerando ZIP...";

      const prevQuote = dynamicValues.citacao.quote;
      const files = [];
      const captions = [];
      const count = Math.min(5, list.length);

      for (let i = 0; i < count; i++) {
        const idx = (quoteCursor + i) % list.length;
        dynamicValues.citacao.quote = list[idx].text;
        render(true);
        const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
        const buf = new Uint8Array(await blob.arrayBuffer());
        files.push({ name: `frase-${i + 1}.png`, data: buf });
        captions.push(`--- POST ${i + 1} (${list[idx].cat}) ---\n${list[idx].text}\n`);
      }

      dynamicValues.citacao.quote = prevQuote;
      render(false);

      const txtBytes = new TextEncoder().encode(captions.join("\n"));
      files.push({ name: "legendas.txt", data: txtBytes });

      const zipBlob = createZipBlob(files);
      const link = document.createElement("a");
      link.download = `dlconcurseiro-lote-${count}-frases.zip`;
      link.href = URL.createObjectURL(zipBlob);
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 5000);

      btn.textContent = "ZIP Baixado!";
      setTimeout(() => { btn.textContent = orig; }, 2000);
    });
  }

  for (const f of cfg.fields) {
    const label = document.createElement("label");
    label.className = "field";
    const span = document.createElement("span");
    span.textContent = f.label;
    label.appendChild(span);

    const input = document.createElement(f.type === "textarea" ? "textarea" : "input");
    if (f.type !== "textarea") input.type = "text";
    else input.rows = 3;
    input.id = `dyn-${tpl}-${f.id}`;
    input.value = dynamicValues[tpl][f.id] ?? "";
    input.addEventListener("input", () => {
      dynamicValues[tpl][f.id] = input.value;
      render();
    });
    label.appendChild(input);
    container.appendChild(label);
  }
}

function renderFlashcard(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 48);
  const tag = getDyn("flashcard", "tag").toUpperCase();
  if (tag) {
    const b = drawBadge(theme, tag, padX, cursorY);
    cursorY += b.h + (isCompact ? 24 : 34);
  }

  const front = getDyn("flashcard", "front");
  const back = getDyn("flashcard", "back");

  const fSize = sc(isCompact ? 34 : 40);
  const fLineH = Math.round(fSize * 1.3);
  ctx.font = `800 ${fSize}px Inter, Segoe UI, sans-serif`;
  const fLines = wrapText(ctx, front, contentW - 68);
  const fBoxH = Math.max(isCompact ? 180 : 220, fLines.length * fLineH + 104);

  ctx.fillStyle = theme.card;
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 3;
  roundRect(ctx, padX, cursorY, contentW, fBoxH, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  ctx.font = "800 22px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("PERGUNTA (FRENTE)", padX + 34, cursorY + 28);

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${fSize}px Inter, Segoe UI, sans-serif`;
  drawWrappedLines(ctx, fLines, padX + 34, cursorY + 72, fLineH);
  cursorY += fBoxH + (isCompact ? 22 : 30);

  const bSize = sc(isCompact ? 27 : 31);
  const bLineH = Math.round(bSize * 1.38);
  ctx.font = `600 ${bSize}px Inter, Segoe UI, sans-serif`;
  const bLines = wrapText(ctx, back, contentW - 68);
  const bBoxH = Math.max(isCompact ? 180 : 230, bLines.length * bLineH + 104);

  ctx.fillStyle = theme.successBg;
  ctx.strokeStyle = theme.success;
  ctx.lineWidth = 2;
  roundRect(ctx, padX, cursorY, contentW, bBoxH, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.success;
  ctx.font = "800 22px Inter, Segoe UI, sans-serif";
  ctx.fillText("RESPOSTA (VERSO)", padX + 34, cursorY + 28);

  ctx.fillStyle = theme.text;
  ctx.font = `600 ${bSize}px Inter, Segoe UI, sans-serif`;
  drawWrappedLines(ctx, bLines, padX + 34, cursorY + 72, bLineH);

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("flashcard", "cta"), w / 2, bottom);
}

function renderMnemonico(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 32 : 44);
  const tag = getDyn("mnemonico", "tag").toUpperCase();
  if (tag) {
    const b = drawBadge(theme, tag, padX, cursorY);
    cursorY += b.h + 24;
  }

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${sc(isCompact ? 38 : 44)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const tLines = wrapText(ctx, getDyn("mnemonico", "title"), contentW);
  cursorY = drawWrappedLines(ctx, tLines, padX, cursorY, sc(52)) + 22;

  // Big acronym banner
  const acro = getDyn("mnemonico", "acronym");
  ctx.fillStyle = theme.accent;
  roundRect(ctx, padX, cursorY, contentW, isCompact ? 86 : 102, 20);
  ctx.fill();
  ctx.fillStyle = theme.accentText;
  ctx.font = `900 ${sc(isCompact ? 44 : 52)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(acro, w / 2, cursorY + (isCompact ? 44 : 52));
  cursorY += (isCompact ? 86 : 102) + 26;

  const rawLines = getDyn("mnemonico", "lines").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 6);
  const rowSize = sc(isCompact ? 25 : 29);
  for (const line of rawLines) {
    const parts = line.split("=");
    const key = (parts[0] || "").trim();
    const val = (parts.slice(1).join("=") || "").trim();
    const rowH = isCompact ? 68 : 82;

    ctx.fillStyle = theme.card;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, padX, cursorY, contentW, rowH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.accent;
    ctx.font = `900 ${rowSize + 2}px Inter, Segoe UI, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(key, padX + 26, cursorY + rowH / 2);

    const keyW = Math.max(76, ctx.measureText(key).width + 24);
    ctx.fillStyle = theme.text;
    ctx.font = `600 ${rowSize}px Inter, Segoe UI, sans-serif`;
    ctx.fillText(val, padX + 26 + keyW, cursorY + rowH / 2);
    cursorY += rowH + 12;
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("mnemonico", "cta"), w / 2, bottom);
}

function renderJurisprudencia(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 46);
  const b = drawBadge(theme, getDyn("jurisprudencia", "court").toUpperCase(), padX, cursorY);
  cursorY += b.h + 26;

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const subLines = wrapText(ctx, getDyn("jurisprudencia", "subject"), contentW);
  cursorY = drawWrappedLines(ctx, subLines, padX, cursorY, sc(56)) + 30;

  const thSize = sc(isCompact ? 27 : 31);
  const thLineH = Math.round(thSize * 1.4);
  ctx.font = `600 ${thSize}px Inter, Segoe UI, sans-serif`;
  const thLines = wrapText(ctx, getDyn("jurisprudencia", "thesis"), contentW - 72);
  const thH = Math.max(180, thLines.length * thLineH + 74);

  ctx.fillStyle = theme.card;
  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  roundRect(ctx, padX, cursorY, contentW, thH, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  roundRect(ctx, padX, cursorY, 12, thH, 6);
  ctx.fill();

  ctx.fillStyle = theme.text;
  drawWrappedLines(ctx, thLines, padX + 40, cursorY + 36, thLineH);
  cursorY += thH + 26;

  const tipSize = sc(isCompact ? 25 : 28);
  const tipLineH = Math.round(tipSize * 1.38);
  ctx.font = `600 ${tipSize}px Inter, Segoe UI, sans-serif`;
  const tipLines = wrapText(ctx, getDyn("jurisprudencia", "tip"), contentW - 64);
  const tipH = Math.max(130, tipLines.length * tipLineH + 86);

  ctx.fillStyle = theme.successBg;
  ctx.strokeStyle = theme.success;
  ctx.lineWidth = 2;
  roundRect(ctx, padX, cursorY, contentW, tipH, 20);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.success;
  ctx.font = "800 22px Inter, Segoe UI, sans-serif";
  ctx.fillText("COMO CAI NA PROVA", padX + 32, cursorY + 24);

  ctx.fillStyle = theme.text;
  ctx.font = `600 ${tipSize}px Inter, Segoe UI, sans-serif`;
  drawWrappedLines(ctx, tipLines, padX + 32, cursorY + 62, tipLineH);

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("jurisprudencia", "cta"), w / 2, bottom);
}

function renderContagem(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 50);
  const b = drawBadge(theme, getDyn("contagem", "tag").toUpperCase(), padX, cursorY);
  cursorY += b.h + (isCompact ? 26 : 38);

  const days = getDyn("contagem", "days") || "30";
  const unit = getDyn("contagem", "unit").toUpperCase();
  const heroH = isCompact ? 250 : 300;

  ctx.fillStyle = theme.card;
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = 3;
  roundRect(ctx, padX, cursorY, contentW, heroH, 28);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  ctx.font = `900 ${isCompact ? 130 : 165}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(days, w / 2, cursorY + heroH * 0.44);

  ctx.fillStyle = theme.text;
  ctx.font = "800 28px Inter, Segoe UI, sans-serif";
  ctx.fillText(unit, w / 2, cursorY + heroH * 0.82);
  cursorY += heroH + 34;

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${sc(isCompact ? 34 : 42)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  const examLines = wrapText(ctx, getDyn("contagem", "exam"), contentW);
  cursorY = drawWrappedLines(ctx, examLines, w / 2, cursorY, sc(48)) + 26;

  // Progress bar
  const pct = Math.max(0, Math.min(100, Number(getDyn("contagem", "progress")) || 75));
  const barH = 26;
  ctx.fillStyle = theme.card;
  roundRect(ctx, padX, cursorY, contentW, barH, 13);
  ctx.fill();
  ctx.fillStyle = theme.accent;
  roundRect(ctx, padX, cursorY, Math.max(26, (contentW * pct) / 100), barH, 13);
  ctx.fill();
  cursorY += barH + 36;

  ctx.fillStyle = theme.muted;
  ctx.font = `600 ${sc(isCompact ? 26 : 30)}px Inter, Segoe UI, sans-serif`;
  const qLines = wrapText(ctx, getDyn("contagem", "quote"), contentW - 40);
  drawWrappedLines(ctx, qLines, w / 2, cursorY, sc(42));

  ctx.fillStyle = theme.accent;
  ctx.font = "700 25px Inter, Segoe UI, sans-serif";
  ctx.textBaseline = "middle";
  ctx.fillText("Rumo à aprovação!", w / 2, bottom);
}

function renderCronograma(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 30 : 42);
  const b = drawBadge(theme, getDyn("cronograma", "tag").toUpperCase(), padX, cursorY);
  cursorY += b.h + 24;

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const tLines = wrapText(ctx, getDyn("cronograma", "title"), contentW);
  cursorY = drawWrappedLines(ctx, tLines, padX, cursorY, sc(54)) + 26;

  const rows = getDyn("cronograma", "rows").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 6);
  const rowH = isCompact ? 76 : 92;
  const gap = isCompact ? 12 : 16;

  for (const r of rows) {
    const [dayRaw, ...rest] = r.split("|");
    const day = (dayRaw || "").trim();
    const subject = rest.join("|").trim() || day;

    ctx.fillStyle = theme.card;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, padX, cursorY, contentW, rowH, 18);
    ctx.fill();
    ctx.stroke();

    const pillW = 136;
    ctx.fillStyle = theme.accent;
    roundRect(ctx, padX + 14, cursorY + 14, pillW, rowH - 28, 12);
    ctx.fill();

    ctx.fillStyle = theme.accentText;
    ctx.font = "800 23px Inter, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(day, padX + 14 + pillW / 2, cursorY + rowH / 2 + 1);

    ctx.fillStyle = theme.text;
    ctx.font = `600 ${sc(isCompact ? 25 : 28)}px Inter, Segoe UI, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(subject, padX + pillW + 34, cursorY + rowH / 2 + 1);

    cursorY += rowH + gap;
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("cronograma", "cta"), w / 2, bottom);
}

function renderBanca(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 46);
  const b = drawBadge(theme, getDyn("banca", "tag").toUpperCase(), padX, cursorY);
  cursorY += b.h + 26;

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${sc(isCompact ? 42 : 52)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const nLines = wrapText(ctx, getDyn("banca", "name"), contentW);
  cursorY = drawWrappedLines(ctx, nLines, padX, cursorY, sc(60)) + 30;

  const blocks = [
    { lbl: "ESTILO DAS QUESTÕES", txt: getDyn("banca", "style"), col: theme.accent },
    { lbl: "PEGADINHA CLÁSSICA", txt: getDyn("banca", "trap"), col: "#f59e0b" },
    { lbl: "DICA DE OURO", txt: getDyn("banca", "tip"), col: theme.success },
  ];

  for (const blk of blocks) {
    const fSize = sc(isCompact ? 25 : 29);
    const lH = Math.round(fSize * 1.35);
    ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
    const lines = wrapText(ctx, blk.txt, contentW - 64);
    const boxH = Math.max(116, lines.length * lH + 86);

    ctx.fillStyle = theme.card;
    ctx.strokeStyle = theme.cardBorder;
    ctx.lineWidth = 2;
    roundRect(ctx, padX, cursorY, contentW, boxH, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = blk.col;
    ctx.font = "800 21px Inter, Segoe UI, sans-serif";
    ctx.fillText(blk.lbl, padX + 30, cursorY + 24);

    ctx.fillStyle = theme.text;
    ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
    drawWrappedLines(ctx, lines, padX + 30, cursorY + 60, lH);
    cursorY += boxH + 18;
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("banca", "cta"), w / 2, bottom);
}

function renderErros(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 46);
  const b = drawBadge(theme, getDyn("erros", "tag").toUpperCase(), padX, cursorY);
  cursorY += b.h + 24;

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${sc(isCompact ? 42 : 50)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const tLines = wrapText(ctx, getDyn("erros", "title"), contentW);
  cursorY = drawWrappedLines(ctx, tLines, padX, cursorY, sc(58)) + 30;

  const items = getDyn("erros", "items").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 4);
  for (const item of items) {
    const [errPart, fixPart] = item.split("|");
    const errTitle = (errPart || "").trim();
    const fixText = (fixPart || "").trim();
    const fSize = sc(isCompact ? 24 : 27);
    const lH = Math.round(fSize * 1.35);
    ctx.font = `500 ${fSize}px Inter, Segoe UI, sans-serif`;
    const fixLines = wrapText(ctx, fixText, contentW - 110);
    const boxH = Math.max(120, fixLines.length * lH + 88);

    ctx.fillStyle = theme.card;
    ctx.strokeStyle = "rgba(244, 63, 94, 0.4)";
    ctx.lineWidth = 2;
    roundRect(ctx, padX, cursorY, contentW, boxH, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#f43f5e";
    roundRect(ctx, padX + 22, cursorY + 26, 44, 44, 12);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 24px Inter, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✕", padX + 44, cursorY + 49);

    ctx.fillStyle = "#fda4af";
    ctx.font = `800 ${sc(27)}px Inter, Segoe UI, sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(errTitle, padX + 86, cursorY + 28);

    ctx.fillStyle = theme.text;
    ctx.font = `500 ${fSize}px Inter, Segoe UI, sans-serif`;
    drawWrappedLines(ctx, fixLines, padX + 86, cursorY + 68, lH);
    cursorY += boxH + 18;
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("erros", "cta"), w / 2, bottom);
}

function renderCapa(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  const centerY = (headerBottom + bottom) / 2;
  const titleLines = getDyn("capa", "title").split("\n").map((s) => s.trim()).filter(Boolean);
  const tSize = sc(isCompact ? 68 : 84);
  const tLineH = Math.round(tSize * 1.12);
  const totalH = titleLines.length * tLineH + 210;
  let cursorY = Math.max(headerBottom + 40, centerY - totalH / 2);

  const b = drawBadge(theme, getDyn("capa", "tag").toUpperCase(), padX, cursorY);
  cursorY += b.h + 36;

  ctx.fillStyle = theme.text;
  ctx.font = `900 ${tSize}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  cursorY = drawWrappedLines(ctx, titleLines, padX, cursorY, tLineH) + 32;

  ctx.fillStyle = theme.muted;
  ctx.font = `600 ${sc(isCompact ? 30 : 35)}px Inter, Segoe UI, sans-serif`;
  const subLines = wrapText(ctx, getDyn("capa", "sub"), contentW);
  drawWrappedLines(ctx, subLines, padX, cursorY, sc(44));

  ctx.fillStyle = theme.accent;
  ctx.font = "800 28px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("capa", "cta"), w / 2, bottom);
}

function renderDepoimento(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 40 : 56);
  const b = drawBadge(theme, getDyn("depoimento", "tag").toUpperCase(), padX, cursorY);
  cursorY += b.h + 32;

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const pLines = wrapText(ctx, getDyn("depoimento", "person"), contentW);
  cursorY = drawWrappedLines(ctx, pLines, padX, cursorY, sc(56)) + 16;

  ctx.fillStyle = theme.success;
  ctx.font = `800 ${sc(28)}px Inter, Segoe UI, sans-serif`;
  ctx.fillText(getDyn("depoimento", "score"), padX, cursorY);
  cursorY += 56;

  const qSize = sc(isCompact ? 29 : 34);
  const qLineH = Math.round(qSize * 1.42);
  ctx.font = `500 ${qSize}px Inter, Segoe UI, sans-serif`;
  const qLines = wrapText(ctx, getDyn("depoimento", "quote"), contentW - 76);
  const boxH = Math.max(240, qLines.length * qLineH + 90);

  ctx.fillStyle = theme.card;
  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  roundRect(ctx, padX, cursorY, contentW, boxH, 24);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.text;
  drawWrappedLines(ctx, qLines, padX + 38, cursorY + 45, qLineH);

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("depoimento", "cta"), w / 2, bottom);
}

function renderCitacao(theme, w, h) {
  const padX = 80;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  const qSize = sc(isCompact ? 44 : 54);
  const qLineH = Math.round(qSize * 1.3);
  ctx.font = `800 ${qSize}px Inter, Segoe UI, sans-serif`;
  const qLines = wrapText(ctx, getDyn("citacao", "quote"), contentW);
  const blockH = qLines.length * qLineH + 70;
  let cursorY = Math.max(headerBottom + 60, (headerBottom + bottom) / 2 - blockH / 2);

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${qSize}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  cursorY = drawWrappedLines(ctx, qLines, padX, cursorY, qLineH) + 34;

  ctx.fillStyle = theme.accent;
  ctx.font = `700 ${sc(28)}px Inter, Segoe UI, sans-serif`;
  ctx.fillText(getDyn("citacao", "author"), padX, cursorY);

  ctx.fillStyle = theme.muted;
  ctx.font = "700 25px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("citacao", "cta"), w / 2, bottom);
}

function renderSalario(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 46);
  const b = drawBadge(theme, getDyn("salario", "tag").toUpperCase(), padX, cursorY);
  cursorY += b.h + 24;

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${sc(isCompact ? 38 : 46)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const rLines = wrapText(ctx, getDyn("salario", "role"), contentW);
  cursorY = drawWrappedLines(ctx, rLines, padX, cursorY, sc(54)) + 30;

  const colGap = 20;
  const colW = (contentW - colGap) / 2;
  const boxH = isCompact ? 150 : 180;
  const boxes = [
    { lbl: "SALÁRIO INICIAL", val: getDyn("salario", "initial"), col: theme.accent },
    { lbl: "TOPO DA CARREIRA", val: getDyn("salario", "final"), col: theme.success },
  ];

  boxes.forEach((bx, idx) => {
    const x = padX + idx * (colW + colGap);
    ctx.fillStyle = theme.card;
    ctx.strokeStyle = bx.col;
    ctx.lineWidth = 3;
    roundRect(ctx, x, cursorY, colW, boxH, 22);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = theme.muted;
    ctx.font = "800 20px Inter, Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(bx.lbl, x + colW / 2, cursorY + boxH * 0.30);

    ctx.fillStyle = bx.col;
    ctx.font = `900 ${sc(isCompact ? 38 : 46)}px Inter, Segoe UI, sans-serif`;
    ctx.fillText(bx.val, x + colW / 2, cursorY + boxH * 0.66);
  });

  cursorY += boxH + 28;
  const bLines = getDyn("salario", "benefits").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 4);
  const bSize = sc(isCompact ? 25 : 28);
  const bLineH = Math.round(bSize * 1.45);
  const benH = Math.max(180, bLines.length * bLineH + 92);

  ctx.fillStyle = theme.card;
  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  roundRect(ctx, padX, cursorY, contentW, benH, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  ctx.font = "800 22px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("BENEFÍCIOS & VANTAGENS", padX + 30, cursorY + 26);

  ctx.fillStyle = theme.text;
  ctx.font = `600 ${bSize}px Inter, Segoe UI, sans-serif`;
  let by = cursorY + 68;
  for (const bl of bLines) {
    const wrapped = wrapText(ctx, `✓  ${bl}`, contentW - 60);
    by = drawWrappedLines(ctx, wrapped, padX + 30, by, bLineH) + 8;
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("salario", "cta"), w / 2, bottom);
}

function renderDicaRapida(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 46);
  const b = drawBadge(theme, getDyn("dica_rapida", "tag").toUpperCase(), padX, cursorY);
  cursorY += b.h + 26;

  ctx.fillStyle = theme.text;
  ctx.font = `800 ${sc(isCompact ? 42 : 50)}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const tLines = wrapText(ctx, getDyn("dica_rapida", "title"), contentW);
  cursorY = drawWrappedLines(ctx, tLines, padX, cursorY, sc(58)) + 28;

  const rSize = sc(isCompact ? 27 : 31);
  const rLineH = Math.round(rSize * 1.4);
  ctx.font = `500 ${rSize}px Inter, Segoe UI, sans-serif`;
  const rLines = wrapText(ctx, getDyn("dica_rapida", "rule"), contentW - 68);
  const rH = Math.max(160, rLines.length * rLineH + 68);

  ctx.fillStyle = theme.card;
  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  roundRect(ctx, padX, cursorY, contentW, rH, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  roundRect(ctx, padX, cursorY, 12, rH, 6);
  ctx.fill();

  ctx.fillStyle = theme.text;
  drawWrappedLines(ctx, rLines, padX + 38, cursorY + 34, rLineH);
  cursorY += rH + 24;

  const exBoxes = [
    { txt: getDyn("dica_rapida", "right"), bg: theme.successBg, border: theme.success },
    { txt: getDyn("dica_rapida", "wrong"), bg: "rgba(244, 63, 94, 0.14)", border: "#f43f5e" },
  ];

  for (const ex of exBoxes) {
    const eSize = sc(isCompact ? 26 : 29);
    ctx.font = `700 ${eSize}px Inter, Segoe UI, sans-serif`;
    const eLines = wrapText(ctx, ex.txt, contentW - 56);
    const eH = Math.max(82, eLines.length * 38 + 38);
    ctx.fillStyle = ex.bg;
    ctx.strokeStyle = ex.border;
    ctx.lineWidth = 2;
    roundRect(ctx, padX, cursorY, contentW, eH, 18);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = theme.text;
    drawWrappedLines(ctx, eLines, padX + 28, cursorY + 20, 38);
    cursorY += eH + 16;
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("dica_rapida", "cta"), w / 2, bottom);
}

function renderNoticia(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 40 : 56);

  // Red/Accent urgent badge
  ctx.font = "900 24px Inter, Segoe UI, sans-serif";
  const badgeTxt = getDyn("noticia", "badge").toUpperCase();
  const bw = ctx.measureText(badgeTxt).width + 44;
  ctx.fillStyle = "#ef4444";
  roundRect(ctx, padX, cursorY, bw, 52, 12);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(badgeTxt, padX + 22, cursorY + 27);
  cursorY += 84;

  const hSize = sc(isCompact ? 44 : 54);
  const hLineH = Math.round(hSize * 1.18);
  ctx.fillStyle = theme.text;
  ctx.font = `900 ${hSize}px Inter, Segoe UI, sans-serif`;
  ctx.textBaseline = "top";
  const hLines = wrapText(ctx, getDyn("noticia", "headline"), contentW);
  cursorY = drawWrappedLines(ctx, hLines, padX, cursorY, hLineH) + 34;

  const sSize = sc(isCompact ? 28 : 32);
  const sLineH = Math.round(sSize * 1.4);
  ctx.font = `500 ${sSize}px Inter, Segoe UI, sans-serif`;
  const sLines = wrapText(ctx, getDyn("noticia", "summary"), contentW - 68);
  const sH = Math.max(180, sLines.length * sLineH + 74);

  ctx.fillStyle = theme.card;
  ctx.strokeStyle = theme.cardBorder;
  ctx.lineWidth = 2;
  roundRect(ctx, padX, cursorY, contentW, sH, 22);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = theme.text;
  drawWrappedLines(ctx, sLines, padX + 34, cursorY + 36, sLineH);
  cursorY += sH + 24;

  ctx.fillStyle = theme.muted;
  ctx.font = "600 23px Inter, Segoe UI, sans-serif";
  ctx.fillText(getDyn("noticia", "source"), padX, cursorY);

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("noticia", "cta"), w / 2, bottom);
}

function renderEnquete(theme, w, h) {
  const padX = 72;
  const { top, bottom } = getSafeVerticalBounds(h);
  const headerBottom = drawProfileHeader(theme, w, padX, top);
  const contentW = w - padX * 2;
  const isCompact = state.format === "square";

  let cursorY = headerBottom + (isCompact ? 34 : 48);
  const b = drawBadge(theme, getDyn("enquete", "tag").toUpperCase(), padX, cursorY);
  cursorY += b.h + 28;

  const qSize = sc(isCompact ? 40 : 48);
  ctx.fillStyle = theme.text;
  ctx.font = `800 ${qSize}px Inter, Segoe UI, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const qLines = wrapText(ctx, getDyn("enquete", "question"), contentW);
  cursorY = drawWrappedLines(ctx, qLines, padX, cursorY, Math.round(qSize * 1.2)) + 34;

  const opts = [
    { title: getDyn("enquete", "optA"), sub: getDyn("enquete", "subA"), col: theme.accent },
    { title: getDyn("enquete", "optB"), sub: getDyn("enquete", "subB"), col: theme.success },
  ];

  for (const op of opts) {
    const boxH = isCompact ? 150 : 180;
    ctx.fillStyle = theme.card;
    ctx.strokeStyle = op.col;
    ctx.lineWidth = 3;
    roundRect(ctx, padX, cursorY, contentW, boxH, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = op.col;
    ctx.font = `800 ${sc(isCompact ? 32 : 36)}px Inter, Segoe UI, sans-serif`;
    ctx.fillText(op.title, padX + 34, cursorY + 34);

    ctx.fillStyle = theme.muted;
    ctx.font = `500 ${sc(isCompact ? 25 : 28)}px Inter, Segoe UI, sans-serif`;
    const subLines = wrapText(ctx, op.sub, contentW - 68);
    drawWrappedLines(ctx, subLines, padX + 34, cursorY + 92, 36);

    cursorY += boxH + 22;
  }

  ctx.fillStyle = theme.accent;
  ctx.font = "700 26px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getDyn("enquete", "cta"), w / 2, bottom);
}

const RENDERERS = {
  ...(window.EXTRA_RENDERERS || {}),
  questao: renderQuestao,
  edital: renderEdital,
  rotina: renderRotina,
  comparativo: renderComparativo,
  checklist: renderChecklist,
  metas: renderMetas,
  flashcard: renderFlashcard,
  mnemonico: renderMnemonico,
  jurisprudencia: renderJurisprudencia,
  contagem: renderContagem,
  cronograma: renderCronograma,
  banca: renderBanca,
  erros: renderErros,
  capa: renderCapa,
  depoimento: renderDepoimento,
  citacao: renderCitacao,
  salario: renderSalario,
  dica_rapida: renderDicaRapida,
  noticia: renderNoticia,
  enquete: renderEnquete,
};

function drawWatermark(theme, w, h) {
  ctx.save();
  ctx.fillStyle = theme.muted;
  ctx.globalAlpha = 0.55;
  ctx.font = "700 18px Inter, Segoe UI, sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "bottom";
  ctx.fillText("Criado com ConcursoStudio (Modo Free)", w - 36, h - 22);
  ctx.restore();
}

function render(forExport = false) {
  const fmt = FORMATS[state.format];
  const theme = getActiveTheme();
  canvas.width = fmt.w;
  canvas.height = fmt.h;
  $("preview-dimensions").textContent = fmt.label;

  drawBackground(theme, fmt.w, fmt.h);

  const fn = RENDERERS[state.template] || renderQuestao;
  fn(theme, fmt.w, fmt.h);

  if (state.planMode === "free") {
    drawWatermark(theme, fmt.w, fmt.h);
  }

  if (state.showGuides && !forExport) {
    drawSafeGuides(fmt.w, fmt.h);
  }
}

function switchTemplate(tpl) {
  state.template = tpl;
  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.template === tpl);
  });
  const isDyn = tpl in DYNAMIC_TEMPLATES;
  $("fields-questao").classList.toggle("hidden", tpl !== "questao");
  $("fields-edital").classList.toggle("hidden", tpl !== "edital");
  $("fields-rotina").classList.toggle("hidden", tpl !== "rotina");
  $("fields-comparativo").classList.toggle("hidden", tpl !== "comparativo");
  $("fields-checklist").classList.toggle("hidden", tpl !== "checklist");
  $("fields-metas").classList.toggle("hidden", tpl !== "metas");
  $("fields-dynamic").classList.toggle("hidden", !isDyn);
  $("slide-toggle-wrap").classList.toggle("hidden", tpl !== "questao");
  updateDownloadLabels(tpl);
  if (isDyn) renderDynamicFields(tpl);
  render();
}

function loadExample() {
  if (state.template in DYNAMIC_TEMPLATES) {
    const cfg = DYNAMIC_TEMPLATES[state.template];
    for (const f of cfg.fields) {
      dynamicValues[state.template][f.id] = f.ex || f.def;
    }
    renderDynamicFields(state.template);
    render();
    return;
  }
  if (state.template in DYNAMIC_TEMPLATES) {
    const firstField = DYNAMIC_TEMPLATES[state.template].fields[0]?.id;
    label = `${state.template.toUpperCase()} • ${getDyn(state.template, firstField).slice(0, 26) || "Post"}`;
  } else if (state.template === "questao") {
    const ex = EXAMPLES.questao;
    $("q-banca").value = ex.banca;
    $("q-materia").value = ex.materia;
    $("q-enunciado").value = ex.enunciado;
    $("q-alt-a").value = ex.altA;
    $("q-alt-b").value = ex.altB;
    $("q-alt-c").value = ex.altC;
    $("q-alt-d").value = ex.altD;
    $("q-alt-e").value = "";
    $("q-gabarito").value = ex.gabarito;
    $("q-cta").value = ex.cta;
    $("q-comentario").value = ex.comentario;
  } else if (state.template === "edital") {
    const ex = EXAMPLES.edital;
    $("e-badge").value = ex.badge;
    $("e-banca").value = ex.banca;
    $("e-orgao").value = ex.orgao;
    $("e-vagas").value = ex.vagas;
    $("e-salario").value = ex.salario;
    $("e-escolaridade").value = ex.escolaridade;
    $("e-prazo").value = ex.prazo;
    $("e-prova").value = ex.prova;
    $("e-cta").value = ex.cta;
  } else if (state.template === "rotina") {
    const ex = EXAMPLES.rotina;
    $("r-tag").value = ex.tag;
    $("r-metric").value = ex.metric;
    $("r-title").value = ex.title;
    $("r-body").value = ex.body;
    $("r-footer").value = ex.footer;
  } else if (state.template === "comparativo") {
    const ex = EXAMPLES.comparativo;
    $("c-tag").value = ex.tag;
    $("c-title").value = ex.title;
    $("c-a-title").value = ex.aTitle;
    $("c-a-body").value = ex.aBody;
    $("c-b-title").value = ex.bTitle;
    $("c-b-body").value = ex.bBody;
    $("c-cta").value = ex.cta;
  } else if (state.template === "checklist") {
    const ex = EXAMPLES.checklist;
    $("l-tag").value = ex.tag;
    $("l-title").value = ex.title;
    $("l-items").value = ex.items;
    $("l-cta").value = ex.cta;
  } else {
    const ex = EXAMPLES.metas;
    $("m-tag").value = ex.tag;
    $("m-title").value = ex.title;
    $("m-v1").value = ex.v1;
    $("m-l1").value = ex.l1;
    $("m-v2").value = ex.v2;
    $("m-l2").value = ex.l2;
    $("m-v3").value = ex.v3;
    $("m-l3").value = ex.l3;
    $("m-body").value = ex.body;
    $("m-cta").value = ex.cta;
  }
  render();
}

// Event listeners
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => switchTemplate(btn.dataset.template));
});

document.querySelectorAll(".pill-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    state.slide = Number(btn.dataset.slide);
    document.querySelectorAll(".pill-btn").forEach((b) => {
      b.classList.toggle("active", Number(b.dataset.slide) === state.slide);
    });
    render();
  });
});

$("format-select").addEventListener("change", (e) => {
  state.format = e.target.value;
  render();
});

$("theme-select").addEventListener("change", (e) => {
  state.theme = e.target.value;
  if (!state.customAccent) {
    $("accent-color").value = THEMES[state.theme].accent;
  }
  saveBrandPrefs();
  render();
});

$("accent-color").addEventListener("input", (e) => {
  state.customAccent = e.target.value;
  saveBrandPrefs();
  render();
});

$("btn-reset-accent").addEventListener("click", () => {
  state.customAccent = null;
  $("accent-color").value = THEMES[state.theme].accent;
  saveBrandPrefs();
  render();
});

$("manuscript-mode").addEventListener("change", (e) => {
  state.manuscriptMode = e.target.checked;
  if (state.manuscriptMode && document.fonts?.load) {
    document.fonts.load('600 34px "Caveat"').then(() => render()).catch(() => render());
  } else render();
});

$("font-scale").addEventListener("input", (e) => {
  const pct = Number(e.target.value);
  state.fontScale = pct / 100;
  $("font-scale-label").textContent = `${pct}%`;
  render();
});

$("bg-pattern").addEventListener("change", (e) => {
  state.bgPattern = e.target.value;
  saveBrandPrefs();
  render();
});

$("safe-guides").addEventListener("change", (e) => {
  state.showGuides = e.target.value === "on";
  render();
});

$("logo-theme-select").addEventListener("change", (e) => {
  state.logoTheme = e.target.value;
  saveBrandPrefs();
  render();
});

$("avatar-input").addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.avatarImg = img;
      state.customAvatarUploaded = true;
      render();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

$("btn-clear-avatar").addEventListener("click", () => {
  state.customAvatarUploaded = false;
  state.avatarImg = defaultLogo.complete ? defaultLogo : null;
  $("avatar-input").value = "";
  render();
});

$("btn-preset-example").addEventListener("click", loadExample);


/* Navegação do editor por etapas */
let lastNonPreviewTab = "modelos";
function setEditorTab(tab, skipScroll = false) {
  if (tab !== "previa") lastNonPreviewTab = tab;
  const panel = $("controls-panel");
  panel.dataset.editorSection = tab;
  document.body.classList.toggle("preview-mode", tab === "previa");
  document.querySelectorAll("[data-editor-tab]").forEach((b) => b.classList.toggle("active", b.dataset.editorTab === tab));
  $("mobile-preview-action").textContent = tab === "previa" ? "Editar" : "Prévia";
  if (!skipScroll) {
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
const editorGroups = [...document.querySelectorAll("#controls-panel > .control-group")];
editorGroups.forEach((group, index) => {
  group.dataset.editorSection = index === 0 ? "modelos" : index === 1 ? "personalizacao" : "conteudo";
});
setEditorTab("modelos", true);
document.querySelectorAll("[data-editor-tab]").forEach((button) => {
  button.addEventListener("click", () => setEditorTab(button.dataset.editorTab));
});

$("btn-export-logo")?.addEventListener("click", () => {
  const size = 1080;
  const off = document.createElement("canvas");
  off.width = size;
  off.height = size;
  const octx = off.getContext("2d");

  const handle = $("profile-handle").value.trim() || "@dlconcurseiro";
  const initial = (handle.replace("@", "").slice(0, 2) || "DL").toUpperCase();

  if (state.customAvatarUploaded && state.avatarImg) {
    const img = state.avatarImg;
    const scale = Math.max(size / img.width, size / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    octx.drawImage(img, (size - dw) / 2, (size - dh) / 2, dw, dh);
  } else if (state.logoTheme === "original" && state.avatarImg) {
    const img = state.avatarImg;
    const scale = Math.max(size / img.width, size / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    octx.drawImage(img, (size - dw) / 2, (size - dh) / 2, dw, dh);
  } else {
    const logoPal = THEMES[state.logoTheme] || getActiveTheme();
    octx.fillStyle = logoPal.bgTop;
    octx.fillRect(0, 0, size, size);
    drawVectorLogo(size / 2, size / 2, 430, logoPal, initial, octx);
  }

  const link = document.createElement("a");
  link.download = `dlconcurseiro-logo-${state.logoTheme}.png`;
  link.href = off.toDataURL("image/png");
  link.click();
});
$("floating-preview-button").addEventListener("click", () => setEditorTab("previa"));
$("mobile-preview-action").addEventListener("click", () => {
  if (document.body.classList.contains("preview-mode")) setEditorTab(lastNonPreviewTab);
  else setEditorTab("previa");
});
$("btn-fullscreen-preview").addEventListener("click", () => {
  const panel = $("preview-panel");
  const active = panel.classList.toggle("is-fullscreen");
  $("btn-fullscreen-preview").textContent = active ? "Fechar tela cheia" : "Tela cheia";
});
$("mobile-copy-action").addEventListener("click", () => $("btn-copy-image").click());
$("mobile-download-action").addEventListener("click", () => $("btn-download").click());

function saveBrandPrefs() {
  try {
    localStorage.setItem(
      "concursostudio_prefs",
      JSON.stringify({
        handle: $("profile-handle").value,
        name: $("profile-name").value,
        format: state.format,
        theme: state.theme,
        logoTheme: state.logoTheme,
        bgPattern: state.bgPattern,
        customAccent: state.customAccent,
      })
    );
  } catch (_) {}
}

function loadBrandPrefs() {
  try {
    const raw = localStorage.getItem("concursostudio_prefs");
    if (!raw) return;
    const prefs = JSON.parse(raw);
    if (prefs.handle) $("profile-handle").value = prefs.handle;
    if (prefs.name) $("profile-name").value = prefs.name;
    if (prefs.format && FORMATS[prefs.format]) {
      state.format = prefs.format;
      $("format-select").value = prefs.format;
    }
    if (prefs.theme && THEMES[prefs.theme]) {
      state.theme = prefs.theme;
      $("theme-select").value = prefs.theme;
    }
    if (prefs.logoTheme && (prefs.logoTheme === "original" || THEMES[prefs.logoTheme])) {
      state.logoTheme = prefs.logoTheme;
      $("logo-theme-select").value = prefs.logoTheme;
    }
    if (prefs.bgPattern) {
      state.bgPattern = prefs.bgPattern;
      $("bg-pattern").value = prefs.bgPattern;
    }
    if (prefs.customAccent) {
      state.customAccent = prefs.customAccent;
      $("accent-color").value = prefs.customAccent;
    } else {
      $("accent-color").value = THEMES[state.theme].accent;
    }
  } catch (_) {}
}

const DRAFT_FIELDS = [
  "q-banca", "q-materia", "q-enunciado", "q-alt-a", "q-alt-b", "q-alt-c", "q-alt-d", "q-alt-e", "q-gabarito", "q-cta", "q-comentario",
  "e-badge", "e-banca", "e-orgao", "e-vagas", "e-salario", "e-escolaridade", "e-prazo", "e-prova", "e-cta",
  "r-tag", "r-metric", "r-title", "r-body", "r-footer",
  "c-tag", "c-title", "c-a-title", "c-a-body", "c-b-title", "c-b-body", "c-cta",
  "l-tag", "l-title", "l-items", "l-cta",
  "m-tag", "m-title", "m-v1", "m-l1", "m-v2", "m-l2", "m-v3", "m-l3", "m-body", "m-cta",
];

function getDrafts() {
  try {
    return JSON.parse(localStorage.getItem("concursostudio_drafts") || "[]");
  } catch (_) {
    return [];
  }
}

function refreshDraftsDropdown(selectedId = "") {
  const select = $("drafts-select");
  const drafts = getDrafts();
  select.innerHTML = `<option value="">Selecione um rascunho (${drafts.length})...</option>`;
  for (const d of drafts) {
    const opt = document.createElement("option");
    opt.value = d.id;
    opt.textContent = d.title;
    select.appendChild(opt);
  }
  if (selectedId) select.value = selectedId;
}

function saveCurrentDraft() {
  const drafts = getDrafts();
  const id = String(Date.now());
  let label = "";
  if (state.template in DYNAMIC_TEMPLATES) {
    const firstField = DYNAMIC_TEMPLATES[state.template].fields[0]?.id;
    label = `${state.template.toUpperCase()} • ${getDyn(state.template, firstField).slice(0, 26) || "Post"}`;
  } else if (state.template === "questao") {
    label = `Questão • ${$("q-materia").value.trim() || "Geral"} (${$("q-banca").value.trim() || "Sem banca"})`;
  } else if (state.template === "edital") {
    label = `Edital • ${$("e-orgao").value.trim() || "Concurso"}`;
  } else if (state.template === "rotina") {
    label = `Rotina • ${$("r-title").value.trim().slice(0, 28) || "Card"}`;
  } else if (state.template === "comparativo") {
    label = `Comparativo • ${$("c-title").value.trim().slice(0, 28) || "VS"}`;
  } else if (state.template === "checklist") {
    label = `Checklist • ${$("l-title").value.trim().slice(0, 28) || "Top"}`;
  } else {
    label = `Metas • ${$("m-title").value.trim().slice(0, 28) || "Check-in"}`;
  }
  const data = {};
  for (const fid of DRAFT_FIELDS) {
    data[fid] = $(fid).value;
  }
  const dynData = state.template in DYNAMIC_TEMPLATES ? { ...dynamicValues[state.template] } : null;
  drafts.unshift({ id, title: label, template: state.template, data, dynData });
  localStorage.setItem("concursostudio_drafts", JSON.stringify(drafts.slice(0, 30)));
  refreshDraftsDropdown(id);
}

function loadDraftById(id) {
  const draft = getDrafts().find((d) => d.id === id);
  if (!draft) return;
  for (const fid of DRAFT_FIELDS) {
    if (fid in draft.data) $(fid).value = draft.data[fid];
  }
  if (draft.dynData && draft.template in DYNAMIC_TEMPLATES) {
    dynamicValues[draft.template] = { ...dynamicValues[draft.template], ...draft.dynData };
  }
  switchTemplate(draft.template);
}

function deleteSelectedDraft() {
  const id = $("drafts-select").value;
  if (!id) return;
  const remaining = getDrafts().filter((d) => d.id !== id);
  localStorage.setItem("concursostudio_drafts", JSON.stringify(remaining));
  refreshDraftsDropdown();
}

function parseRawQuestion() {
  let raw = $("q-raw-paste").value.replace(/\r\n/g, "\n").trim();
  if (!raw) return;

  // 1. Detecta gabarito no final (ex: "Gabarito: B" ou "Resposta: Letra C")
  const gabMatch = raw.match(/(?:^|\n)\s*(?:gabarito|resposta)\s*[:\-]?\s*(?:letra\s*)?([A-Ea-e])\b[^\n]*$/i);
  if (gabMatch) {
    $("q-gabarito").value = gabMatch[1].toUpperCase();
    raw = raw.slice(0, gabMatch.index).trim();
  }

  // 2. Remove linhas de ruído comuns de cópia do TEC / QConcursos / Gran
  const noiseLineRe = /^(?:responder|pular|estatísticas|comentários|cadernos|anotações|notificar erro|texto associado|salvar|q\d{5,}|#\d{5,})$/i;
  const rawLines = raw.split("\n").filter((l) => !noiseLineRe.test(l.trim()));

  // 3. Tenta extrair Banca + Ano das primeiras 3 linhas
  const boardRe = /\b(FGV|CEBRASPE|CESPE|FCC|VUNESP|IBFC|QUADRIX|INSTITUTO AOCP|AOCP|IDECAN|CONSULPLAN|FUNDATEC|IADES|CESGRANRIO|SELECON|FEPESE|FUMARC)\b/i;
  const yearRe = /\b(20[1-2][0-9])\b/;
  for (let i = 0; i < Math.min(3, rawLines.length); i++) {
    const line = rawLines[i].trim();
    const bMatch = line.match(boardRe);
    const yMatch = line.match(yearRe);
    if (bMatch && (yMatch || /ano\s*:/i.test(line) || /banca\s*:/i.test(line) || line.length < 110)) {
      const boardName = bMatch[1].toUpperCase();
      $("q-banca").value = yMatch ? `${boardName} • ${yMatch[1]}` : boardName;
      if (/^ano\s*:|^banca\s*:|^\w+\s*[-–•|/]\s*20\d{2}/i.test(line)) {
        rawLines.splice(i, 1);
      }
      break;
    }
  }
  raw = rawLines.join("\n").trim();

  // 4. Suporta: (A) txt | A) txt | A. txt | A - txt | A – txt | A\ntxt (início de linha ou após espaço)
  const altRegex = /(?:^|\n)\s*\(?([A-Ea-e])(?:\)\s*|\.(?=\s)|\s*[-–—:]\s*|\s*\n(?=\S))/g;
  let matches = [...raw.matchAll(altRegex)];

  // Fallback: alternativas na mesma linha (ex: "A) xxx B) yyy C) zzz")
  if (matches.length < 2) {
    const inlineRegex = /(?:^|\s)\(?([A-Ea-e])\)\s+/g;
    const inlineMatches = [...raw.matchAll(inlineRegex)];
    if (inlineMatches.length >= 2) matches = inlineMatches;
  }

  // Filtra para manter apenas sequência válida começando em A (A, B, C...)
  const firstA = matches.findIndex((m) => m[1].toUpperCase() === "A");
  if (firstA !== -1) {
    matches = matches.slice(firstA);
  }

  const map = { A: "", B: "", C: "", D: "", E: "" };
  let count = 0;

  if (matches.length >= 2) {
    const enunciado = raw.slice(0, matches[0].index).trim();
    if (enunciado) $("q-enunciado").value = enunciado;

    for (let i = 0; i < matches.length; i++) {
      const letter = matches[i][1].toUpperCase();
      const start = matches[i].index + matches[i][0].length;
      const end = i + 1 < matches.length ? matches[i + 1].index : raw.length;
      const body = raw.slice(start, end).replace(/\s+/g, " ").trim();
      if (letter in map && !map[letter] && body) {
        map[letter] = `${letter}) ${body}`;
        count++;
      }
    }
  } else if (/\n\s*(?:\(\s*\)\s*)?certo\s*\n\s*(?:\(\s*\)\s*)?errado\s*$/i.test(raw)) {
    // Suporte a Certo / Errado colado direto
    const ceIdx = raw.search(/\n\s*(?:\(\s*\)\s*)?certo\s*\n\s*(?:\(\s*\)\s*)?errado\s*$/i);
    $("q-enunciado").value = raw.slice(0, ceIdx).trim();
    map.A = "A) CERTO";
    map.B = "B) ERRADO";
    count = 2;
  } else {
    $("q-enunciado").value = raw;
  }

  $("q-alt-a").value = map.A;
  $("q-alt-b").value = map.B;
  $("q-alt-c").value = map.C;
  $("q-alt-d").value = map.D;
  $("q-alt-e").value = map.E;

  const btn = $("btn-parse-raw");
  if (btn) {
    const orig = "Extrair Enunciado e Alternativas";
    btn.textContent = count > 0 ? `Extraído (${count} alt.)!` : "Enunciado preenchido!";
    setTimeout(() => { btn.textContent = orig; }, 1800);
  }
  render();
}

function buildInstagramCaption() {
  const handle = $("profile-handle").value.trim() || "@dlconcurseiro";
  if (state.template in DYNAMIC_TEMPLATES) {
    const cfg = DYNAMIC_TEMPLATES[state.template];
    const lines = cfg.fields.map((f) => getDyn(state.template, f.id)).filter(Boolean);
    return (
      `📌 ${lines[0] || ""}\n\n` +
      `${lines.slice(1, -1).join("\n\n")}\n\n` +
      `👉 ${lines[lines.length - 1] || "Salve e compartilhe!"}\n` +
      `📲 Siga ${handle} para mais conteúdos de concurso!\n\n` +
      `#concursopublico #estudaquepassa #concurseiro #dlconcurseiro`
    );
  }
  if (state.template === "questao") {
    const banca = $("q-banca").value.trim();
    const materia = $("q-materia").value.trim();
    const gabarito = $("q-gabarito").value;
    const comentario = $("q-comentario").value.trim();
    return (
      `📌 Questão Comentada | ${materia} (${banca})\n\n` +
      `Qual alternativa você marcaria? Comenta aqui embaixo antes de arrastar para o lado! 👇\n\n` +
      `✅ Gabarito no 2º slide (Letra ${gabarito})\n` +
      `💡 Resumo: ${comentario}\n\n` +
      `📲 Siga ${handle} para questões e rotina de estudos todos os dias!\n\n` +
      `#concursopublico #questaocomentada #estudaquepassa #concurseiro #dlconcurseiro`
    );
  }
  if (state.template === "edital") {
    const orgao = $("e-orgao").value.trim();
    const vagas = $("e-vagas").value.trim();
    const salario = $("e-salario").value.trim();
    const banca = $("e-banca").value.trim();
    const prazo = $("e-prazo").value.trim();
    const prova = $("e-prova").value.trim();
    return (
      `🚨 ${$("e-badge").value.trim()}: ${orgao}\n\n` +
      `📋 Vagas: ${vagas}\n` +
      `💰 Remuneração: ${salario}\n` +
      `🏛️ Banca: ${banca}\n` +
      `📅 Inscrições: ${prazo}\n` +
      (prova ? `🗓️ Data da Prova: ${prova}\n` : "") +
      `\n` +
      `Salve este post para não perder o prazo e envie para um amigo concurseiro! 🚀\n` +
      `Siga ${handle} para mais editais.\n\n` +
      `#editalaberto #concursopublico #concursos2026 #foconavaga #dlconcurseiro`
    );
  }
  if (state.template === "comparativo") {
    return (
      `⚖️ Não confunda na prova: ${$("c-title").value.trim()}\n\n` +
      `📌 ${$("c-a-title").value.trim()} vs. ${$("c-b-title").value.trim()}\n\n` +
      `Salve esse resumo para revisar antes da prova! 🚀\n` +
      `Siga ${handle} para mais dicas.\n\n` +
      `#concursopublico #naoconfunda #resumodeconcurso #dlconcurseiro`
    );
  }
  if (state.template === "checklist") {
    return (
      `📋 ${$("l-title").value.trim()}\n\n` +
      `${$("l-cta").value.trim()} 👇\n\n` +
      `Salve esse checklist para acompanhar sua evolução!\n` +
      `Siga ${handle}\n\n` +
      `#concursopublico #checklist #estudaquepassa #dlconcurseiro`
    );
  }
  if (state.template === "metas") {
    return (
      `📊 ${$("m-title").value.trim()}\n\n` +
      `⏱️ ${$("m-v1").value.trim()} ${$("m-l1").value.trim().toLowerCase()}\n` +
      `📝 ${$("m-v2").value.trim()} ${$("m-l2").value.trim().toLowerCase()}\n` +
      `🎯 ${$("m-v3").value.trim()} ${$("m-l3").value.trim().toLowerCase()}\n\n` +
      `${$("m-body").value.trim()}\n\n` +
      `Siga ${handle}\n` +
      `#rotinadeestudos #studygramconcursos #dlconcurseiro`
    );
  }
  return (
    `🔥 ${$("r-title").value.trim()}\n\n` +
    `${$("r-body").value.trim()}\n\n` +
    `Como estão os estudos hoje por aí? Conta nos comentários! 👇\n` +
    `Siga ${handle}\n\n` +
    `${$("r-footer").value.trim()} #concursopublico #rotinadeestudos #dlconcurseiro`
  );
}

const MULTI_SLIDE_TEMPLATES = new Set(["questao"]);

function updateDownloadLabels(tpl) {
  const isMulti = MULTI_SLIDE_TEMPLATES.has(tpl);
  if ($("btn-download")) {
    $("btn-download").textContent = isMulti ? "Baixar PNG (2 Slides)" : "Baixar PNG (1080px)";
  }
  if ($("mobile-download-action")) {
    $("mobile-download-action").textContent = isMulti ? "Baixar 2 PNGs" : "Baixar PNG";
  }
}

function downloadCurrentCanvas(filename) {
  render(true);
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
  render(false);
}

$("btn-download").addEventListener("click", () => {
  if (MULTI_SLIDE_TEMPLATES.has(state.template)) {
    const prevSlide = state.slide;
    state.slide = 1;
    downloadCurrentCanvas(`dlconcurseiro-${state.template}-slide1-pergunta-${state.format}.png`);

    setTimeout(() => {
      state.slide = 2;
      downloadCurrentCanvas(`dlconcurseiro-${state.template}-slide2-gabarito-${state.format}.png`);
      state.slide = prevSlide;
      render(false);
    }, 320);
    return;
  }
  downloadCurrentCanvas(`dlconcurseiro-${state.template}-${state.format}.png`);
});

$("btn-copy-image").addEventListener("click", () => {
  const btn = $("btn-copy-image");
  const orig = btn.textContent;
  render(true);
  canvas.toBlob(async (blob) => {
    render(false);
    try {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      btn.textContent = "Imagem Copiada!";
    } catch (_) {
      btn.textContent = "Use Baixar PNG";
    }
    setTimeout(() => {
      btn.textContent = orig;
    }, 1800);
  }, "image/png");
});

$("btn-save-draft").addEventListener("click", () => {
  saveCurrentDraft();
  const btn = $("btn-save-draft");
  const orig = btn.textContent;
  btn.textContent = "Salvo!";
  setTimeout(() => {
    btn.textContent = orig;
  }, 1500);
});

$("drafts-select").addEventListener("change", (e) => {
  if (e.target.value) loadDraftById(e.target.value);
});

$("btn-delete-draft").addEventListener("click", deleteSelectedDraft);

$("btn-copy-caption").addEventListener("click", async () => {
  const caption = buildInstagramCaption();
  const btn = $("btn-copy-caption");
  const orig = btn.textContent;
  try {
    await navigator.clipboard.writeText(caption);
    btn.textContent = "Legenda Copiada!";
  } catch (_) {
    btn.textContent = "Erro ao copiar";
  }
  setTimeout(() => {
    btn.textContent = orig;
  }, 1800);
});

$("btn-cebraspe-mode").addEventListener("click", () => {
  $("q-banca").value = "CEBRASPE (Certo / Errado)";
  $("q-alt-a").value = "A) CERTO";
  $("q-alt-b").value = "B) ERRADO";
  $("q-alt-c").value = "";
  $("q-alt-d").value = "";
  $("q-alt-e").value = "";
  $("q-gabarito").value = "A";
  render();
});

$("btn-parse-raw").addEventListener("click", parseRawQuestion);
$("q-raw-paste")?.addEventListener("paste", () => {
  setTimeout(parseRawQuestion, 30);
});

document
  .querySelectorAll("input[type='text'], textarea, select")
  .forEach((el) => {
    el.addEventListener("input", () => {
      saveBrandPrefs();
      render();
    });
  });

// Carrega a logo padrão do DL Concurseiro se disponível
const defaultLogo = new Image();
defaultLogo.onload = () => {
  if (!state.avatarImg) {
    state.avatarImg = defaultLogo;
    render();
  }
};
defaultLogo.src = "dl-concurseiro-logo.jpg";

// Pure-JS Store-mode ZIP builder (zero dependencies)
function crc32(bytes) {
  let c = -1;
  for (let i = 0; i < bytes.length; i++) {
    c ^= bytes[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return (c ^ -1) >>> 0;
}

function createZipBlob(files) {
  const chunks = [];
  const central = [];
  let offset = 0;

  for (const f of files) {
    const nameBytes = new TextEncoder().encode(f.name);
    const crc = crc32(f.data);
    const size = f.data.length;

    const local = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(8, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, size, true);
    lv.setUint32(22, size, true);
    lv.setUint16(26, nameBytes.length, true);
    local.set(nameBytes, 30);
    chunks.push(local, f.data);

    const cd = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(cd.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, size, true);
    cv.setUint32(24, size, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint32(42, offset, true);
    cd.set(nameBytes, 46);
    central.push(cd);

    offset += local.length + size;
  }

  const cdSize = central.reduce((a, b) => a + b.length, 0);
  const eocd = new Uint8Array(22);
  const ev = new DataView(eocd.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, cdSize, true);
  ev.setUint32(16, offset, true);

  return new Blob([...chunks, ...central, eocd], { type: "application/zip" });
}

// Expor helpers compartilhados para templates-extra.js
window.CS = {
  ctx,
  state,
  getDyn,
  sc,
  wrapText,
  wrapTextPreserveHighlight,
  drawWrappedLines,
  roundRect,
  drawProfileHeader,
  drawBadge,
  getSafeVerticalBounds,
};

// Filtros por categoria de modelo
document.querySelectorAll(".filter-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    const f = pill.dataset.filter;
    document.querySelectorAll(".filter-pill").forEach((p) => p.classList.toggle("active", p === pill));
    document.querySelectorAll(".template-tabs .tab-btn").forEach((btn) => {
      const show = f === "all" || btn.dataset.cat === f;
      btn.classList.toggle("hidden", !show);
    });
  });
});

$("bg-photo-input").addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.bgPhotoImg = img;
      render();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

$("btn-clear-bg").addEventListener("click", () => {
  state.bgPhotoImg = null;
  $("bg-photo-input").value = "";
  render();
});

function loadQuestionImageFromBlob(blob) {
  if (!blob) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      state.questionImg = img;
      if ($("q-img-status")) {
        $("q-img-status").textContent = `Imagem anexada (${img.width}×${img.height} px)`;
      }
      render();
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(blob);
}

$("q-enunc-img-input")?.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (file) loadQuestionImageFromBlob(file);
});

$("btn-clear-q-img")?.addEventListener("click", () => {
  state.questionImg = null;
  if ($("q-enunc-img-input")) $("q-enunc-img-input").value = "";
  if ($("q-img-status")) {
    $("q-img-status").textContent = "Nenhuma imagem anexada. Você também pode colar com Ctrl+V.";
  }
  render();
});

$("btn-paste-q-img")?.addEventListener("click", async () => {
  const btn = $("btn-paste-q-img");
  const orig = btn.textContent;
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      const imgType = item.types.find((t) => t.startsWith("image/"));
      if (imgType) {
        const blob = await item.getType(imgType);
        loadQuestionImageFromBlob(blob);
        btn.textContent = "Colada!";
        setTimeout(() => { btn.textContent = orig; }, 1400);
        return;
      }
    }
    btn.textContent = "Sem imagem";
  } catch (_) {
    btn.textContent = "Use Ctrl+V";
  }
  setTimeout(() => { btn.textContent = orig; }, 1600);
});

$("fields-questao")?.addEventListener("paste", (e) => {
  const items = e.clipboardData?.items;
  if (!items) return;
  for (const item of items) {
    if (item.type.startsWith("image/")) {
      e.preventDefault();
      loadQuestionImageFromBlob(item.getAsFile());
      return;
    }
  }
});

$("bg-dim").addEventListener("input", (e) => {
  const pct = Number(e.target.value);
  state.bgDim = pct / 100;
  $("bg-dim-label").textContent = `${pct}%`;
  render();
});

$("plan-mode").addEventListener("change", (e) => {
  state.planMode = e.target.value;
  render();
});

/* Rascunho automático local: restaura o trabalho mais recente neste dispositivo */
const AUTO_DRAFT_KEY = "concursostudio_autosave_v1";
let autoSaveTimer = null;
function saveAutoDraft() {
  try {
    const fields = {};
    for (const id of [...DRAFT_FIELDS, "profile-handle", "profile-name"]) {
      const el = $(id);
      if (el) fields[id] = el.value;
    }
    localStorage.setItem(AUTO_DRAFT_KEY, JSON.stringify({
      savedAt: Date.now(), template: state.template, slide: state.slide,
      format: state.format, theme: state.theme, logoTheme: state.logoTheme,
      bgPattern: state.bgPattern, bgDim: state.bgDim, planMode: state.planMode,
      fontScale: state.fontScale, customAccent: state.customAccent,
      manuscriptMode: state.manuscriptMode, fields, dynamicValues
    }));
  } catch (error) { console.warn("Não foi possível salvar o rascunho automático.", error); }
}
function scheduleAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(saveAutoDraft, 450);
}
function restoreAutoDraft() {
  try {
    const raw = localStorage.getItem(AUTO_DRAFT_KEY);
    if (!raw) return;
    const draft = JSON.parse(raw);
    if (!draft || !draft.fields || Date.now() - draft.savedAt > 60 * 24 * 60 * 60 * 1000) return;
    Object.entries(draft.fields).forEach(([id, value]) => { if ($(id)) $(id).value = value; });
    if (draft.dynamicValues) {
      Object.keys(draft.dynamicValues).forEach((key) => {
        if (dynamicValues[key]) Object.assign(dynamicValues[key], draft.dynamicValues[key]);
      });
    }
    ["format","theme","logoTheme","bgPattern","planMode"].forEach((key) => {
      if (draft[key] !== undefined) state[key] = draft[key];
    });
    ["bgDim","fontScale","customAccent","manuscriptMode","slide"].forEach((key) => {
      if (draft[key] !== undefined) state[key] = draft[key];
    });
    if (draft.template) state.template = draft.template;
    ["format-select","theme-select","logo-theme-select","bg-pattern","plan-mode"].forEach((id) => {
      const key = ({ "format-select":"format", "theme-select":"theme", "logo-theme-select":"logoTheme", "bg-pattern":"bgPattern", "plan-mode":"planMode" })[id];
      if ($(id)) $(id).value = state[key];
    });
    if ($("font-scale")) $("font-scale").value = Math.round(state.fontScale * 100);
    if ($("font-scale-label")) $("font-scale-label").textContent = Math.round(state.fontScale * 100) + "%";
    if ($("bg-dim")) $("bg-dim").value = Math.round(state.bgDim * 100);
    if ($("manuscript-mode")) $("manuscript-mode").checked = state.manuscriptMode;
    if ($("accent-color") && state.customAccent) $("accent-color").value = state.customAccent;
    if ($("slide-toggle-wrap")) {
      document.querySelectorAll(".pill-btn").forEach((b) => b.classList.toggle("active", Number(b.dataset.slide) === state.slide));
    }
  } catch (error) { console.warn("Rascunho automático inválido.", error); }
}
document.addEventListener("input", scheduleAutoSave, true);
document.addEventListener("change", scheduleAutoSave, true);
window.addEventListener("beforeunload", saveAutoDraft);
document.addEventListener("click", (event) => {
  if (event.target.closest(".tab-btn, .pill-btn, [data-editor-tab], #btn-preset-example")) scheduleAutoSave();
});

loadBrandPrefs();
restoreAutoDraft();
switchTemplate(state.template);
refreshDraftsDropdown();
render();
if (state.manuscriptMode && document.fonts?.load) document.fonts.load('600 34px "Caveat"').then(() => render()).catch(() => {});