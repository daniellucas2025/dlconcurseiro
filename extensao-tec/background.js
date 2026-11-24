function extractTecQuestionInPage() {
  const pick = (root, sels, min, max) => {
    for (const sel of sels) {
      const list = Array.from(root.querySelectorAll(sel)).filter(
        (el) => (el.innerText || "").trim().length > 0
      );
      if (list.length >= min && list.length <= max) return list;
    }
    return [];
  };

  const qRoot =
    document.querySelector(
      '.questao-conteudo, article.questao, .questao, [ng-controller*="Questao"], main'
    ) || document.body;

  const enEl = qRoot.querySelector(
    '.questao-enunciado-texto, .enunciado-texto, [class*="enunciado-texto"]'
  );
  const altEls = pick(
    qRoot,
    [
      ".questao-enunciado-alternativa-texto",
      ".questao-enunciado-alternativas > li",
      "ul.questao-enunciado-alternativas li",
      '[ng-repeat*="alternativa"] .alternativa-texto',
      '[ng-repeat*="alternativa"]',
      ".questao-enunciado-alternativa",
      "ul.alternativas > li",
      ".alternativa-texto",
    ],
    2,
    5
  );

  // Verifica se o AngularJS do TEC já renderizou o enunciado e as alternativas
  if (!enEl || altEls.length < 2) {
    const loginWall = /faça o login|entrar na sua conta/i.test(document.title || "");
    return { ready: false, loginWall };
  }

  const bancaLink =
    qRoot.querySelector('a[href*="/bancas/"]') ||
    document.querySelector('a[href*="/bancas/"]');
  const concLink =
    qRoot.querySelector('a[href*="/concursos/"]') ||
    document.querySelector('a[href*="/concursos/"]');

  let banca = bancaLink ? bancaLink.innerText.trim() : "";
  const shortBanca = banca.replace(/\s*\([^)]*\)/g, "").trim() || banca;

  let ano = "";
  let cargo = "";
  if (concLink) {
    const concTxt = concLink.innerText.replace(/\s+/g, " ").trim();
    const ym = concTxt.match(/\b(20\d{2}|19\d{2})\b/);
    if (ym) ano = ym[1];
    cargo = concTxt
      .replace(/^(?:20\d{2}|19\d{2})\s*[-–]\s*/, "")
      .replace(/\/?\s*["“”]?Sem Especialidade["“”]?/gi, "")
      .replace(/\s*\/\s*/g, " • ")
      .trim();
  }

  if (!cargo) {
    const matEl = qRoot.querySelector('a[href*="/materias/"]') || document.querySelector('a[href*="/materias/"]');
    if (matEl) cargo = matEl.innerText.trim();
  }

  const bancaFormatted =
    shortBanca && ano
      ? `${shortBanca.toUpperCase()} • ${ano}`
      : shortBanca.toUpperCase();

  const enunciado = enEl.innerText.trim();
  const alts = altEls.slice(0, 5).map((el) => {
    const t = (el.innerText || "").replace(/\s+/g, " ").trim();
    return t
      .replace(/^(?:[•○●◦▪▫✂\s]+)?(?:\([A-Ea-e]\)\s*|[A-Ea-e][).:\-–—]\s+)/, "")
      .trim();
  });

  return {
    ready: true,
    banca: bancaFormatted,
    cargo,
    enunciado,
    alts,
  };
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg?.type !== "FETCH_TEC_QUESTION" || !msg.url) return false;

  (async () => {
    let tabId = null;
    try {
      const tab = await chrome.tabs.create({ url: msg.url, active: false });
      tabId = tab.id;

      // Aguarda a página carregar e o Angular do TEC renderizar (até ~9s)
      for (let attempt = 0; attempt < 26; attempt++) {
        await new Promise((r) => setTimeout(r, 350));
        try {
          const results = await chrome.scripting.executeScript({
            target: { tabId },
            func: extractTecQuestionInPage,
          });
          const res = results?.[0]?.result;
          if (res?.ready) {
            await chrome.tabs.remove(tabId);
            sendResponse({ ok: true, data: res });
            return;
          }
          if (attempt > 8 && res?.loginWall) {
            await chrome.tabs.remove(tabId);
            sendResponse({
              ok: false,
              error: "Faça login na sua conta do TEC Concursos no navegador primeiro.",
            });
            return;
          }
        } catch (_) {}
      }

      if (tabId !== null) await chrome.tabs.remove(tabId);
      sendResponse({
        ok: false,
        error: "Tempo esgotado aguardando a questão carregar no TEC (verifique se está logado).",
      });
    } catch (err) {
      if (tabId !== null) {
        try { await chrome.tabs.remove(tabId); } catch (_) {}
      }
      sendResponse({ ok: false, error: String(err?.message || err) });
    }
  })();

  return true;
});
