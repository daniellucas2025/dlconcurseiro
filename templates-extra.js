window.EXTRA_TEMPLATES = {
  lacuna: {
    heading: "3. Complete a Lacuna (Desafio)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "COMPLETE A LACUNA", ex: "DESAFIO DE LEI SECA" },
      { id: "subject", label: "Matéria / Assunto", type: "text", def: "Direito Constitucional • Art. 5º", ex: "Português • Crase & Regência" },
      { id: "sentence", label: "Frase com ________", type: "textarea", def: "Todos são iguais perante a lei, sem ________ de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida...", ex: "O servidor público ________ responderá pelos danos que causar a terceiros, assegurado o direito de ________." },
      { id: "hint", label: "Dica Rápida (opcional)", type: "text", def: "Dica: começa com a letra D...", ex: "Dica: Art. 37, § 6º da Constituição Federal" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Qual palavra completa a lacuna? Comenta aí! 👇", ex: "Escreva a resposta nos comentários sem olhar o Vade!" },
    ],
  },
  vf: {
    heading: "3. Verdadeiro ou Falso (Combo I, II, III)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "VERDADEIRO OU FALSO?", ex: "COMBO 3 AFIRMAÇÕES" },
      { id: "title", label: "Tema do Desafio", type: "text", def: "Atos Administrativos • Responda V ou F", ex: "Direito Penal • Parte Geral" },
      { id: "items", label: "3 Afirmações (1 por linha)", type: "textarea", def: "I. Todo ato administrativo goza de presunção absoluta de legitimidade.\nII. A autoexecutoriedade está presente em todos os atos administrativos.\nIII. A revogação ocorre por motivo de conveniência e oportunidade.", ex: "I. O erro de tipo essencial exclui sempre o dolo.\nII. A tentativa punida tem sempre a mesma pena do crime consumado.\nIII. O arrependimento posterior reduz a pena de 1 a 2/3." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Deixe sua sequência (ex: F-F-V) nos comentários!", ex: "Qual é o gabarito? Comenta V ou F para I, II e III!" },
    ],
  },
  meme: {
    heading: "3. Meme (Expectativa vs. Realidade)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "HUMOR CONCURSEIRO", ex: "VIDA DE CONCURSEIRO" },
      { id: "title", label: "Título do Meme", type: "text", def: "Domingo de Sol", ex: "Quando sai o Edital" },
      { id: "leftTitle", label: "Quadro 1 (Ex: Expectativa)", type: "text", def: "EXPECTATIVA", ex: "ANTES DO EDITAL" },
      { id: "leftText", label: "Texto Quadro 1", type: "textarea", def: "Acordar tarde, ir à praia, tomar sorvete e não pensar em boleto.", ex: "\"Vou estudar 3 horinhas por dia bem tranquilo com calma...\"" },
      { id: "rightTitle", label: "Quadro 2 (Ex: Realidade)", type: "text", def: "REALIDADE", ex: "PÓS-EDITAL" },
      { id: "rightText", label: "Texto Quadro 2", type: "textarea", def: "Café preto, 120 questões da FGV e brigando com a crase às 14h.", ex: "Lendo Lei Seca no ônibus, no almoço e sonhando com a banca." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Quem mais se identifica? Marca um amigo! 😂", ex: "Comenta se você está exatamente assim hoje!" },
    ],
  },
  mito: {
    heading: "3. Mito vs. Verdade",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "MITO VS. VERDADE", ex: "DESMISTIFICANDO" },
      { id: "title", label: "Tema Central", type: "text", def: "Sobre passar em concurso público", ex: "Sobre horas de estudo" },
      { id: "myth", label: "O MITO (Falso)", type: "textarea", def: "\"Só passa quem tem 10 horas livres por dia e não trabalha.\"", ex: "\"Precisa ler o PDF inteiro 5 vezes antes de fazer questões.\"" },
      { id: "truth", label: "A VERDADE (Fato)", type: "textarea", def: "Constância de 2h a 3h líquidas bem direcionadas com questões aprova milhares de trabalhadores todos os anos.", ex: "Fazer questões desde o início acelera a fixação e mostra exatamente o que a banca cobra." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Concorda? Salve e compartilhe!", ex: "Qual outro mito você já ouviu por aí?" },
    ],
  },
  vademecum: {
    heading: "3. Vade Mecum Grifado (Use ==palavra==)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "VADE MECUM GRIFADO", ex: "LEI SECA COM MARCA-TEXTO" },
      { id: "article", label: "Artigo / Norma", type: "text", def: "Art. 37, II da Constituição Federal", ex: "Art. 5º, XL da Constituição Federal" },
      { id: "text", label: "Texto da Lei (use ==texto== para grifar)", type: "textarea", def: "A investidura em cargo ou emprego público ==depende de aprovação prévia em concurso público== de provas ou de provas e títulos, ==ressalvadas as nomeações para cargo em comissão== declarado em lei de livre nomeação e exoneração.", ex: "A lei penal ==não retroagirá==, ==salvo para beneficiar o réu==." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Salve esse artigo grifado para revisar!", ex: "Atenção às exceções grifadas! Salve este post." },
    ],
  },
  prazos: {
    heading: "3. Tabela de Prazos da Lei",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "TABELA DE PRAZOS • DECORE", ex: "PRAZOS QUE MAIS CAEM" },
      { id: "title", label: "Tema dos Prazos", type: "text", def: "Prazos na Lei 8.112/90", ex: "Prazos Constitucionais" },
      { id: "rows", label: "Prazos (1 por linha: PRAZO | Descrição)", type: "textarea", def: "30 DIAS | Posse após a publicação do ato de provimento\n15 DIAS | Entrar em exercício após a posse\n3 ANOS | Estágio probatório para estabilidade\n5 ANOS | Prescrição para demissão e cassação\n120 DIAS | Mandado de Segurança (prazo decadencial)", ex: "24 HORAS | Comunicação de prisão em flagrante ao juiz\n15 DIAS | Prazo recursal padrão no CPC\n2 ANOS | Validade máxima do concurso (prorrogável +2)" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Salve essa tabela para revisar antes da prova!", ex: "Qual prazo você sempre confunde?" },
    ],
  },
  glossario: {
    heading: "3. Glossário Jurídico",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "GLOSSÁRIO DE PROVA", ex: "DICIONÁRIO DO CONCURSEIRO" },
      { id: "term", label: "Termo / Palavra Difícil", type: "text", def: "PREVARICAÇÃO", ex: "PRECLUSÃO" },
      { id: "meaning", label: "Definição Simples", type: "textarea", def: "Retardar ou deixar de praticar, indevidamente, ato de ofício, ou praticá-lo contra disposição expressa de lei, para satisfazer interesse ou sentimento pessoal.", ex: "Perda da faculdade de praticar um ato processual pelo decurso do tempo (temporal), por já tê-lo praticado (consumativa) ou por ato incompatível (lógica)." },
      { id: "example", label: "Exemplo / Macete", type: "textarea", def: "Macete: Não há dinheiro/vantagem indevida! O servidor age por preguiça, amizade ou raiva (interesse pessoal).", ex: "Exemplo: Perder o prazo de 15 dias para recorrer gera preclusão temporal." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Já conhecia esse termo? Salve para revisar!", ex: "Deixe outro termo difícil nos comentários!" },
    ],
  },
  redacao: {
    heading: "3. Redação Nota Máxima",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "REDAÇÃO NOTA MÁXIMA", ex: "DISCURSIVA DE CONCURSO" },
      { id: "title", label: "Estrutura / Tema", type: "text", def: "Como montar um parágrafo de desenvolvimento", ex: "Esqueleto para Discursiva" },
      { id: "p1", label: "Passo 1 (Tópico Frasal)", type: "text", def: "Apresente o argumento central em 1 frase direta.", ex: "Retome o comando da questão logo na 1ª linha." },
      { id: "p2", label: "Passo 2 (Fundamentação / Lei)", type: "text", def: "Cite artigo da CF/88, lei específica ou dado real.", ex: "Fundamente com a Constituição, Súmula ou Doutrina." },
      { id: "p3", label: "Passo 3 (Fechamento Crítico)", type: "text", def: "Conecte a base legal ao problema proposto pela banca.", ex: "Conclua respondendo objetivamente ao caso concreto." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Salve esse roteiro para seu próximo treino!", ex: "Qual sua maior dificuldade na discursiva?" },
    ],
  },
  notacorte: {
    heading: "3. Nota de Corte (Comparativo)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "HISTÓRICO • NOTA DE CORTE", ex: "TERMÔMETRO DE CONCORRÊNCIA" },
      { id: "title", label: "Concurso de Referência", type: "text", def: "Último Concurso • Tribunal Regional", ex: "Polícia Federal • Último Edital" },
      { id: "rows", label: "Notas (1 por linha: Cargo/Região | Nota | %)", type: "textarea", def: "Técnico Judiciário (Ampla) | 86,5 pts | 86\nTécnico Judiciário (PPP) | 78,0 pts | 78\nAnalista Área Judiciária | 82,0 pts | 82\nAnalista Administrativo | 79,5 pts | 79", ex: "Agente PF (Ampla) | 75 pts líq. | 63\nEscrivão PF (Ampla) | 71 pts líq. | 59\nPapiloscopista PF | 68 pts líq. | 57" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Sua meta nos simulados já passa dessa nota?", ex: "Salve para ter referência real nos treinos!" },
    ],
  },
  termometro: {
    heading: "3. Termômetro do Edital",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "TERMÔMETRO DO CONCURSO", ex: "ANDAMENTO OFICIAL" },
      { id: "exam", label: "Nome do Concurso", type: "text", def: "Concurso INSS • Técnico do Seguro Social", ex: "Receita Federal • Analista" },
      { id: "stage", label: "Estágio Atual (1 a 6)", type: "text", def: "4", ex: "5" },
      { id: "note", label: "Status Detalhado", type: "textarea", def: "Estágio 4 de 6: Banca organizadora em fase de definição! Momento ideal para fechar a base teórica antes do edital.", ex: "Estágio 5 de 6: Edital publicado! Foco total em questões da banca e revisão." },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Você vai prestar esse concurso? Comenta!", ex: "Siga para acompanhar cada atualização!" },
    ],
  },
  calendario: {
    heading: "3. Calendário de Provas do Mês",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "AGENDA DO CONCURSEIRO", ex: "CALENDÁRIO DE PROVAS" },
      { id: "title", label: "Mês / Período", type: "text", def: "Provas e Prazos • Dezembro", ex: "Principais Editais • 1º Semestre" },
      { id: "rows", label: "Datas (1 por linha: DATA | Concurso • Evento)", type: "textarea", def: "06/12 | TRT 2ª Região • Prova Objetiva\n13/12 | Polícia Civil • Fim das Inscrições\n18/12 | Banco do Brasil • Previsão de Edital\n20/12 | TSE Unificado • Simulado Nacional\n27/12 | Revisão Geral • Balanço do Ano", ex: "10/01 | TRF • Prova\n18/01 | INSS • Inscrições\n25/01 | PRF • Teste Físico" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Salve para não perder nenhuma data importante!", ex: "Qual dessas provas você vai fazer?" },
    ],
  },
  kitprova: {
    heading: "3. Kit do Dia de Prova",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "DOMINGO DE PROVA", ex: "CHECKLIST PRESENCIAL" },
      { id: "title", label: "Título do Checklist", type: "text", def: "O que levar para o local de prova", ex: "Não esqueça antes de sair de casa!" },
      { id: "doList", label: "LEVAR (1 por linha)", type: "textarea", def: "2 canetas esferográficas pretas (tubo transparente)\nDocumento oficial com foto (original)\nCartão de confirmação impresso\nGarrafa de água transparente sem rótulo", ex: "Caneta preta transparente\nRG ou CNH original\nLanche em embalagem transparente" },
      { id: "dontList", label: "PROIBIDO / EVITAR (1 por linha)", type: "textarea", def: "Celular ligado ou despertador ativado\nBoné, óculos escuros ou relógio digital\nAtrasar na saída: chegue 1h antes!", ex: "Aparelhos eletrônicos ligados\nLápis, borracha ou corretivo" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Boa prova! Confie no que você estudou!", ex: "Mande para quem vai fazer prova domingo!" },
    ],
  },
  antesdepois: {
    heading: "3. Antes & Depois (Evolução)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "EVOLUÇÃO REAL", ex: "RESULTADO DE CONSTÂNCIA" },
      { id: "title", label: "Título da Jornada", type: "text", def: "90 dias ajustando o método de estudo", ex: "De iniciante a competitivo" },
      { id: "beforeVal", label: "ANTES (Número)", type: "text", def: "54%", ex: "120" },
      { id: "beforeLbl", label: "ANTES (Descrição)", type: "text", def: "de acertos • Só via videoaula e não revisava", ex: "questões/mês • Sem cronograma" },
      { id: "afterVal", label: "DEPOIS (Número)", type: "text", def: "84%", ex: "1.200" },
      { id: "afterLbl", label: "DEPOIS (Descrição)", type: "text", def: "de acertos • Ciclo + Lei Seca + Caderno de Erros", ex: "questões/mês • Ciclo fechado" },
      { id: "cta", label: "Chamada (CTA)", type: "text", def: "Método certo + tempo = evolução inevitável!", ex: "Qual foi sua maior virada nos estudos?" },
    ],
  },
  live: {
    heading: "3. Aviso de Live / Aula Gratuita",
    fields: [
      { id: "tag", label: "Selo Superior", type: "text", def: "AULA AO VIVO • GRATUITA", ex: "MENTORIA ABERTA" },
      { id: "title", label: "Tema da Live", type: "textarea", def: "Revisão de Véspera: 30 Questões Comentadas de Direito Administrativo", ex: "Como Montar Seu Ciclo de Estudos Pós-Edital" },
      { id: "when", label: "Data e Horário", type: "text", def: "HOJE • 20h00 (Horário de Brasília)", ex: "QUINTA-FEIRA • 19h30" },
      { id: "where", label: "Onde vai acontecer", type: "text", def: "Ao vivo aqui no Instagram + YouTube", ex: "Transmissão no YouTube DL Concurseiro" },
      { id: "cta", label: "Botão / Chamada", type: "text", def: "COMENTE 'EU VOU' PARA RECEBER O LINK!", ex: "ATIVE O LEMBRETE E NÃO PERCA!" },
    ],
  },
  indicacao: {
    heading: "3. Indicação de Material / App (Afiliado)",
    fields: [
      { id: "tag", label: "Etiqueta Superior", type: "text", def: "INDICAÇÃO DO DIA", ex: "FERRAMENTA RECOMENDADA" },
      { id: "product", label: "Nome do Material / Curso / App", type: "text", def: "Vade Mecum + Banco de Questões Comentadas", ex: "Mentoria & Cronograma Verticalizado" },
      { id: "rating", label: "Nota (1 a 5)", type: "text", def: "5", ex: "5" },
      { id: "pros", label: "Por que vale a pena (1 por linha)", type: "textarea", def: "Questões atualizadas de todas as bancas (2026)\nComentários direto ao ponto por professores\nFiltros por órgão, assunto e dificuldade", ex: "Edital 100% mapeado por incidência\nPlanilha automática de revisão\nSuporte direto para dúvidas" },
      { id: "cta", label: "Chamada (Link / Cupom)", type: "text", def: "Link com desconto no destaque / bio! 🔗", ex: "Comente 'QUERO' que te mando o acesso!" },
    ],
  },
};

function h() {
  return window.CS;
}

window.EXTRA_RENDERERS = {
  lacuna(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 48);
    const b = c.drawBadge(theme, c.getDyn("lacuna", "tag").toUpperCase(), padX, y);
    y += b.h + 22;

    c.ctx.fillStyle = theme.muted;
    c.ctx.font = `700 ${c.sc(26)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    c.ctx.fillText(c.getDyn("lacuna", "subject"), padX, y);
    y += 50;

    const sSize = c.sc(isCompact ? 31 : 36);
    const sLineH = Math.round(sSize * 1.42);
    c.ctx.font = `700 ${sSize}px Inter, Segoe UI, sans-serif`;
    const sLines = c.wrapText(c.ctx, c.getDyn("lacuna", "sentence"), contentW - 72);
    const boxH = Math.max(220, sLines.length * sLineH + 84);

    c.ctx.fillStyle = theme.card;
    c.ctx.strokeStyle = theme.accent;
    c.ctx.lineWidth = 3;
    c.roundRect(c.ctx, padX, y, contentW, boxH, 24);
    c.ctx.fill();
    c.ctx.stroke();

    c.ctx.fillStyle = theme.text;
    c.drawWrappedLines(c.ctx, sLines, padX + 36, y + 42, sLineH, theme);
    y += boxH + 28;

    const hint = c.getDyn("lacuna", "hint");
    if (hint) {
      c.ctx.fillStyle = theme.accent;
      c.ctx.font = `700 ${c.sc(26)}px Inter, Segoe UI, sans-serif`;
      c.ctx.fillText(hint, padX, y);
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("lacuna", "cta"), w / 2, bottom);
  },

  vf(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("vf", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 38 : 46)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("vf", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, c.sc(54), theme) + 28;

    const items = c.getDyn("vf", "items").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 4);
    const fSize = c.sc(isCompact ? 25 : 28);
    const lH = Math.round(fSize * 1.36);

    for (const item of items) {
      c.ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
      const lines = c.wrapText(c.ctx, item, contentW - 150);
      const boxH = Math.max(96, lines.length * lH + 40);

      c.ctx.fillStyle = theme.card;
      c.ctx.strokeStyle = theme.cardBorder;
      c.ctx.lineWidth = 2;
      c.roundRect(c.ctx, padX, y, contentW, boxH, 20);
      c.ctx.fill();
      c.ctx.stroke();

      c.ctx.fillStyle = theme.text;
      c.drawWrappedLines(c.ctx, lines, padX + 28, y + 20, lH, theme);

      // V / F pill on right
      const px = w - padX - 104;
      const py = y + boxH / 2 - 22;
      c.ctx.fillStyle = theme.accent;
      c.roundRect(c.ctx, px, py, 80, 44, 12);
      c.ctx.fill();
      c.ctx.fillStyle = theme.accentText;
      c.ctx.font = "800 22px Inter, Segoe UI, sans-serif";
      c.ctx.textAlign = "center";
      c.ctx.textBaseline = "middle";
      c.ctx.fillText("V / F", px + 40, py + 23);
      c.ctx.textAlign = "left";
      c.ctx.textBaseline = "top";

      y += boxH + 16;
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("vf", "cta"), w / 2, bottom);
  },

  meme(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("meme", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `900 ${c.sc(isCompact ? 44 : 54)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("meme", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, c.sc(60), theme) + 32;

    const colGap = 22;
    const colW = (contentW - colGap) / 2;
    const boxH = Math.max(340, bottom - 70 - y);
    const panels = [
      { x: padX, title: c.getDyn("meme", "leftTitle"), text: c.getDyn("meme", "leftText"), col: theme.accent },
      { x: padX + colW + colGap, title: c.getDyn("meme", "rightTitle"), text: c.getDyn("meme", "rightText"), col: "#f43f5e" },
    ];

    for (const p of panels) {
      c.ctx.fillStyle = theme.card;
      c.ctx.strokeStyle = p.col;
      c.ctx.lineWidth = 3;
      c.roundRect(c.ctx, p.x, y, colW, boxH, 24);
      c.ctx.fill();
      c.ctx.stroke();

      c.ctx.fillStyle = p.col;
      c.roundRect(c.ctx, p.x, y, colW, 64, 20);
      c.ctx.fill();

      c.ctx.fillStyle = "#ffffff";
      c.ctx.font = "900 24px Inter, Segoe UI, sans-serif";
      c.ctx.textAlign = "center";
      c.ctx.textBaseline = "middle";
      c.ctx.fillText(p.title.toUpperCase(), p.x + colW / 2, y + 33);

      const fSize = c.sc(isCompact ? 28 : 33);
      c.ctx.fillStyle = theme.text;
      c.ctx.font = `700 ${fSize}px Inter, Segoe UI, sans-serif`;
      c.ctx.textAlign = "left";
      c.ctx.textBaseline = "top";
      const lines = c.wrapText(c.ctx, p.text, colW - 48);
      c.drawWrappedLines(c.ctx, lines, p.x + 24, y + 96, Math.round(fSize * 1.38), theme);
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("meme", "cta"), w / 2, bottom);
  },

  mito(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("mito", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("mito", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, c.sc(56), theme) + 30;

    const blocks = [
      { lbl: "✕  MITO", txt: c.getDyn("mito", "myth"), bg: "rgba(244, 63, 94, 0.14)", col: "#fb7185", border: "#f43f5e" },
      { lbl: "✓  VERDADE", txt: c.getDyn("mito", "truth"), bg: theme.successBg, col: theme.success, border: theme.success },
    ];

    for (const blk of blocks) {
      const fSize = c.sc(isCompact ? 27 : 31);
      const lH = Math.round(fSize * 1.38);
      c.ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
      const lines = c.wrapText(c.ctx, blk.txt, contentW - 64);
      const boxH = Math.max(170, lines.length * lH + 96);

      c.ctx.fillStyle = blk.bg;
      c.ctx.strokeStyle = blk.border;
      c.ctx.lineWidth = 3;
      c.roundRect(c.ctx, padX, y, contentW, boxH, 22);
      c.ctx.fill();
      c.ctx.stroke();

      c.ctx.fillStyle = blk.col;
      c.ctx.font = "900 24px Inter, Segoe UI, sans-serif";
      c.ctx.fillText(blk.lbl, padX + 32, y + 26);

      c.ctx.fillStyle = theme.text;
      c.ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
      c.drawWrappedLines(c.ctx, lines, padX + 32, y + 68, lH, theme);
      y += boxH + 24;
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("mito", "cta"), w / 2, bottom);
  },

  vademecum(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("vademecum", "tag").toUpperCase(), padX, y);
    y += b.h + 26;

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = `800 ${c.sc(isCompact ? 34 : 40)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const aLines = c.wrapText(c.ctx, c.getDyn("vademecum", "article"), contentW);
    y = c.drawWrappedLines(c.ctx, aLines, padX, y, c.sc(48), theme) + 28;

    const fSize = c.sc(isCompact ? 29 : 34);
    const lH = Math.round(fSize * 1.48);
    c.ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
    const tLines = c.wrapText(c.ctx, c.getDyn("vademecum", "text").replace(/==/g, ""), contentW - 96);
    const boxH = Math.max(260, tLines.length * lH + 88);

    c.ctx.fillStyle = theme.card;
    c.ctx.strokeStyle = theme.cardBorder;
    c.ctx.lineWidth = 2;
    c.roundRect(c.ctx, padX, y, contentW, boxH, 24);
    c.ctx.fill();
    c.ctx.stroke();

    c.ctx.fillStyle = theme.text;
    const rawWrapped = c.wrapTextPreserveHighlight(c.ctx, c.getDyn("vademecum", "text"), contentW - 96);
    c.drawWrappedLines(c.ctx, rawWrapped, padX + 42, y + 44, lH, theme);

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("vademecum", "cta"), w / 2, bottom);
  },

  prazos(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 32 : 44);
    const b = c.drawBadge(theme, c.getDyn("prazos", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("prazos", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, c.sc(56), theme) + 26;

    const rows = c.getDyn("prazos", "rows").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 6);
    const rowH = isCompact ? 80 : 94;
    for (const r of rows) {
      const [pz, ...rest] = r.split("|");
      const desc = rest.join("|").trim();

      c.ctx.fillStyle = theme.card;
      c.ctx.strokeStyle = theme.cardBorder;
      c.ctx.lineWidth = 2;
      c.roundRect(c.ctx, padX, y, contentW, rowH, 18);
      c.ctx.fill();
      c.ctx.stroke();

      const pw = 176;
      c.ctx.fillStyle = theme.accent;
      c.roundRect(c.ctx, padX + 14, y + 14, pw, rowH - 28, 12);
      c.ctx.fill();
      c.ctx.fillStyle = theme.accentText;
      c.ctx.font = "900 24px Inter, Segoe UI, sans-serif";
      c.ctx.textAlign = "center";
      c.ctx.textBaseline = "middle";
      c.ctx.fillText((pz || "").trim(), padX + 14 + pw / 2, y + rowH / 2 + 1);

      c.ctx.fillStyle = theme.text;
      c.ctx.font = `600 ${c.sc(isCompact ? 23 : 26)}px Inter, Segoe UI, sans-serif`;
      c.ctx.textAlign = "left";
      const dLines = c.wrapText(c.ctx, desc, contentW - pw - 60);
      c.ctx.textBaseline = "top";
      const blockH = dLines.length * 32;
      c.drawWrappedLines(c.ctx, dLines, padX + pw + 32, y + (rowH - blockH) / 2, 32, theme);

      y += rowH + 14;
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("prazos", "cta"), w / 2, bottom);
  },

  glossario(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("glossario", "tag").toUpperCase(), padX, y);
    y += b.h + 26;

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = `900 ${c.sc(isCompact ? 50 : 62)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    c.ctx.fillText(c.getDyn("glossario", "term").toUpperCase(), padX, y);
    y += c.sc(80);

    const mSize = c.sc(isCompact ? 26 : 30);
    const mLineH = Math.round(mSize * 1.4);
    c.ctx.font = `600 ${mSize}px Inter, Segoe UI, sans-serif`;
    const mLines = c.wrapText(c.ctx, c.getDyn("glossario", "meaning"), contentW - 68);
    const mH = Math.max(180, mLines.length * mLineH + 92);

    c.ctx.fillStyle = theme.card;
    c.ctx.strokeStyle = theme.cardBorder;
    c.ctx.lineWidth = 2;
    c.roundRect(c.ctx, padX, y, contentW, mH, 22);
    c.ctx.fill();
    c.ctx.stroke();

    c.ctx.fillStyle = theme.muted;
    c.ctx.font = "800 20px Inter, Segoe UI, sans-serif";
    c.ctx.fillText("O QUE SIGNIFICA", padX + 32, y + 24);
    c.ctx.fillStyle = theme.text;
    c.ctx.font = `600 ${mSize}px Inter, Segoe UI, sans-serif`;
    c.drawWrappedLines(c.ctx, mLines, padX + 32, y + 60, mLineH, theme);
    y += mH + 22;

    const eSize = c.sc(isCompact ? 24 : 28);
    const eLineH = Math.round(eSize * 1.38);
    c.ctx.font = `600 ${eSize}px Inter, Segoe UI, sans-serif`;
    const eLines = c.wrapText(c.ctx, c.getDyn("glossario", "example"), contentW - 68);
    const eH = Math.max(140, eLines.length * eLineH + 86);

    c.ctx.fillStyle = theme.successBg;
    c.ctx.strokeStyle = theme.success;
    c.ctx.lineWidth = 2;
    c.roundRect(c.ctx, padX, y, contentW, eH, 22);
    c.ctx.fill();
    c.ctx.stroke();

    c.ctx.fillStyle = theme.success;
    c.ctx.font = "800 20px Inter, Segoe UI, sans-serif";
    c.ctx.fillText("NA PRÁTICA / MACETE", padX + 32, y + 24);
    c.ctx.fillStyle = theme.text;
    c.ctx.font = `600 ${eSize}px Inter, Segoe UI, sans-serif`;
    c.drawWrappedLines(c.ctx, eLines, padX + 32, y + 58, eLineH, theme);

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("glossario", "cta"), w / 2, bottom);
  },

  redacao(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("redacao", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 38 : 46)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("redacao", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, c.sc(54), theme) + 30;

    const steps = [
      { n: "01", lbl: "TÓPICO FRASAL", txt: c.getDyn("redacao", "p1") },
      { n: "02", lbl: "FUNDAMENTAÇÃO", txt: c.getDyn("redacao", "p2") },
      { n: "03", lbl: "FECHAMENTO CRÍTICO", txt: c.getDyn("redacao", "p3") },
    ];

    for (const st of steps) {
      const fSize = c.sc(isCompact ? 25 : 28);
      const lH = Math.round(fSize * 1.36);
      c.ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
      const lines = c.wrapText(c.ctx, st.txt, contentW - 126);
      const boxH = Math.max(122, lines.length * lH + 80);

      c.ctx.fillStyle = theme.card;
      c.ctx.strokeStyle = theme.cardBorder;
      c.ctx.lineWidth = 2;
      c.roundRect(c.ctx, padX, y, contentW, boxH, 20);
      c.ctx.fill();
      c.ctx.stroke();

      c.ctx.fillStyle = theme.accent;
      c.roundRect(c.ctx, padX + 22, y + 26, 56, 56, 14);
      c.ctx.fill();
      c.ctx.fillStyle = theme.accentText;
      c.ctx.font = "900 24px Inter, Segoe UI, sans-serif";
      c.ctx.textAlign = "center";
      c.ctx.textBaseline = "middle";
      c.ctx.fillText(st.n, padX + 50, y + 55);

      c.ctx.fillStyle = theme.accent;
      c.ctx.font = "800 20px Inter, Segoe UI, sans-serif";
      c.ctx.textAlign = "left";
      c.ctx.textBaseline = "top";
      c.ctx.fillText(st.lbl, padX + 98, y + 24);

      c.ctx.fillStyle = theme.text;
      c.ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
      c.drawWrappedLines(c.ctx, lines, padX + 98, y + 56, lH, theme);
      y += boxH + 18;
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("redacao", "cta"), w / 2, bottom);
  },

  notacorte(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("notacorte", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("notacorte", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, c.sc(56), theme) + 30;

    const rows = c.getDyn("notacorte", "rows").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 5);
    const rowH = isCompact ? 104 : 122;
    for (const r of rows) {
      const [cargo, nota, pctRaw] = r.split("|").map((s) => (s || "").trim());
      const pct = Math.max(10, Math.min(100, Number(pctRaw) || 75));

      c.ctx.fillStyle = theme.card;
      c.ctx.strokeStyle = theme.cardBorder;
      c.ctx.lineWidth = 2;
      c.roundRect(c.ctx, padX, y, contentW, rowH, 18);
      c.ctx.fill();
      c.ctx.stroke();

      c.ctx.fillStyle = theme.text;
      c.ctx.font = `700 ${c.sc(25)}px Inter, Segoe UI, sans-serif`;
      c.ctx.textAlign = "left";
      c.ctx.fillText(cargo || "", padX + 26, y + 22);

      c.ctx.fillStyle = theme.accent;
      c.ctx.font = `900 ${c.sc(28)}px Inter, Segoe UI, sans-serif`;
      c.ctx.textAlign = "right";
      c.ctx.fillText(nota || "", w - padX - 26, y + 20);

      // Bar
      const barW = contentW - 52;
      const barY = y + rowH - 36;
      c.ctx.fillStyle = "rgba(255,255,255,0.08)";
      c.roundRect(c.ctx, padX + 26, barY, barW, 14, 7);
      c.ctx.fill();
      c.ctx.fillStyle = theme.accent;
      c.roundRect(c.ctx, padX + 26, barY, (barW * pct) / 100, 14, 7);
      c.ctx.fill();

      c.ctx.textAlign = "left";
      y += rowH + 16;
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("notacorte", "cta"), w / 2, bottom);
  },

  termometro(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("termometro", "tag").toUpperCase(), padX, y);
    y += b.h + 26;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const eLines = c.wrapText(c.ctx, c.getDyn("termometro", "exam"), contentW);
    y = c.drawWrappedLines(c.ctx, eLines, padX, y, c.sc(56), theme) + 32;

    const stages = ["Previsto", "Autorizado", "Comissão", "Banca", "Edital", "Prova"];
    const currentStage = Math.max(1, Math.min(6, Number(c.getDyn("termometro", "stage")) || 4));
    const stepH = isCompact ? 56 : 68;

    stages.forEach((st, idx) => {
      const active = idx + 1 <= currentStage;
      const isCurrent = idx + 1 === currentStage;
      c.ctx.fillStyle = isCurrent ? theme.accent : (active ? theme.successBg : theme.card);
      c.ctx.strokeStyle = isCurrent ? theme.accent : (active ? theme.success : theme.cardBorder);
      c.ctx.lineWidth = 2;
      c.roundRect(c.ctx, padX, y, contentW, stepH, 16);
      c.ctx.fill();
      c.ctx.stroke();

      c.ctx.fillStyle = isCurrent ? theme.accentText : theme.text;
      c.ctx.font = `${isCurrent ? 900 : 700} 25px Inter, Segoe UI, sans-serif`;
      c.ctx.textAlign = "left";
      c.ctx.textBaseline = "middle";
      c.ctx.fillText(`${idx + 1}. ${st.toUpperCase()}`, padX + 26, y + stepH / 2 + 1);

      c.ctx.textAlign = "right";
      c.ctx.fillText(isCurrent ? "ATUAL ◀" : (active ? "✓" : "○"), w - padX - 26, y + stepH / 2 + 1);
      y += stepH + 10;
    });

    y += 14;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    c.ctx.fillStyle = theme.muted;
    c.ctx.font = `600 ${c.sc(25)}px Inter, Segoe UI, sans-serif`;
    const nLines = c.wrapText(c.ctx, c.getDyn("termometro", "note"), contentW);
    c.drawWrappedLines(c.ctx, nLines, padX, y, 34, theme);

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("termometro", "cta"), w / 2, bottom);
  },

  calendario(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 32 : 44);
    const b = c.drawBadge(theme, c.getDyn("calendario", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("calendario", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, c.sc(56), theme) + 28;

    const rows = c.getDyn("calendario", "rows").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 6);
    const rowH = isCompact ? 80 : 94;
    for (const r of rows) {
      const [dt, ...rest] = r.split("|");
      const desc = rest.join("|").trim();
      c.ctx.fillStyle = theme.card;
      c.ctx.strokeStyle = theme.cardBorder;
      c.ctx.lineWidth = 2;
      c.roundRect(c.ctx, padX, y, contentW, rowH, 18);
      c.ctx.fill();
      c.ctx.stroke();

      const dw = 140;
      c.ctx.fillStyle = theme.accent;
      c.roundRect(c.ctx, padX + 14, y + 14, dw, rowH - 28, 12);
      c.ctx.fill();
      c.ctx.fillStyle = theme.accentText;
      c.ctx.font = "900 25px Inter, Segoe UI, sans-serif";
      c.ctx.textAlign = "center";
      c.ctx.textBaseline = "middle";
      c.ctx.fillText((dt || "").trim(), padX + 14 + dw / 2, y + rowH / 2 + 1);

      c.ctx.fillStyle = theme.text;
      c.ctx.font = `600 ${c.sc(isCompact ? 24 : 27)}px Inter, Segoe UI, sans-serif`;
      c.ctx.textAlign = "left";
      c.ctx.fillText(desc, padX + dw + 34, y + rowH / 2 + 1);
      y += rowH + 14;
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("calendario", "cta"), w / 2, bottom);
  },

  kitprova(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 32 : 44);
    const b = c.drawBadge(theme, c.getDyn("kitprova", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 38 : 46)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("kitprova", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, c.sc(54), theme) + 28;

    const doItems = c.getDyn("kitprova", "doList").split("\n").map((s) => s.trim()).filter(Boolean);
    const dontItems = c.getDyn("kitprova", "dontList").split("\n").map((s) => s.trim()).filter(Boolean);

    const blocks = [
      { lbl: "✓  OBRIGATÓRIO / RECOMENDADO", items: doItems, bg: theme.successBg, border: theme.success, col: theme.success, icon: "✓" },
      { lbl: "✕  PROIBIDO / EVITE", items: dontItems, bg: "rgba(244, 63, 94, 0.14)", border: "#f43f5e", col: "#fb7185", icon: "✕" },
    ];

    const fSize = c.sc(isCompact ? 23 : 26);
    const lH = Math.round(fSize * 1.45);
    for (const blk of blocks) {
      const boxH = Math.max(150, blk.items.length * lH + 86);
      c.ctx.fillStyle = blk.bg;
      c.ctx.strokeStyle = blk.border;
      c.ctx.lineWidth = 2;
      c.roundRect(c.ctx, padX, y, contentW, boxH, 22);
      c.ctx.fill();
      c.ctx.stroke();

      c.ctx.fillStyle = blk.col;
      c.ctx.font = "900 22px Inter, Segoe UI, sans-serif";
      c.ctx.fillText(blk.lbl, padX + 28, y + 24);

      c.ctx.fillStyle = theme.text;
      c.ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
      let iy = y + 64;
      for (const it of blk.items) {
        c.ctx.fillText(`${blk.icon}  ${it}`, padX + 28, iy);
        iy += lH;
      }
      y += boxH + 22;
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("kitprova", "cta"), w / 2, bottom);
  },

  antesdepois(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("antesdepois", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("antesdepois", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, c.sc(56), theme) + 34;

    const colGap = 24;
    const colW = (contentW - colGap) / 2;
    const boxH = Math.max(300, bottom - 80 - y);
    const cols = [
      { x: padX, lbl: "ANTES", val: c.getDyn("antesdepois", "beforeVal"), desc: c.getDyn("antesdepois", "beforeLbl"), col: "#fb7185" },
      { x: padX + colW + colGap, lbl: "DEPOIS", val: c.getDyn("antesdepois", "afterVal"), desc: c.getDyn("antesdepois", "afterLbl"), col: theme.success },
    ];

    for (const col of cols) {
      c.ctx.fillStyle = theme.card;
      c.ctx.strokeStyle = col.col;
      c.ctx.lineWidth = 3;
      c.roundRect(c.ctx, col.x, y, colW, boxH, 24);
      c.ctx.fill();
      c.ctx.stroke();

      c.ctx.fillStyle = col.col;
      c.ctx.font = "900 24px Inter, Segoe UI, sans-serif";
      c.ctx.textAlign = "center";
      c.ctx.textBaseline = "top";
      c.ctx.fillText(col.lbl, col.x + colW / 2, y + 32);

      c.ctx.font = `900 ${c.sc(isCompact ? 68 : 84)}px Inter, Segoe UI, sans-serif`;
      c.ctx.fillText(col.val, col.x + colW / 2, y + 92);

      c.ctx.fillStyle = theme.text;
      c.ctx.font = `600 ${c.sc(26)}px Inter, Segoe UI, sans-serif`;
      const dLines = c.wrapText(c.ctx, col.desc, colW - 48);
      c.drawWrappedLines(c.ctx, dLines, col.x + colW / 2, y + 210, 36, theme);
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "700 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("antesdepois", "cta"), w / 2, bottom);
  },

  live(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 38 : 54);
    // Live red badge
    c.ctx.font = "900 24px Inter, Segoe UI, sans-serif";
    const tagTxt = `●  ${c.getDyn("live", "tag").toUpperCase()}`;
    const bw = c.ctx.measureText(tagTxt).width + 44;
    c.ctx.fillStyle = "#ef4444";
    c.roundRect(c.ctx, padX, y, bw, 52, 26);
    c.ctx.fill();
    c.ctx.fillStyle = "#ffffff";
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(tagTxt, padX + 22, y + 27);
    y += 88;

    const tSize = c.sc(isCompact ? 42 : 52);
    c.ctx.fillStyle = theme.text;
    c.ctx.font = `900 ${tSize}px Inter, Segoe UI, sans-serif`;
    c.ctx.textBaseline = "top";
    const tLines = c.wrapText(c.ctx, c.getDyn("live", "title"), contentW);
    y = c.drawWrappedLines(c.ctx, tLines, padX, y, Math.round(tSize * 1.2), theme) + 38;

    const infoH = 180;
    c.ctx.fillStyle = theme.card;
    c.ctx.strokeStyle = theme.accent;
    c.ctx.lineWidth = 3;
    c.roundRect(c.ctx, padX, y, contentW, infoH, 24);
    c.ctx.fill();
    c.ctx.stroke();

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = `800 ${c.sc(32)}px Inter, Segoe UI, sans-serif`;
    c.ctx.fillText(c.getDyn("live", "when"), padX + 34, y + 40);

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `600 ${c.sc(27)}px Inter, Segoe UI, sans-serif`;
    c.ctx.fillText(c.getDyn("live", "where"), padX + 34, y + 102);

    // Bottom CTA pill
    const ctaTxt = c.getDyn("live", "cta");
    c.ctx.fillStyle = theme.accent;
    c.roundRect(c.ctx, padX, bottom - 34, contentW, 68, 34);
    c.ctx.fill();
    c.ctx.fillStyle = theme.accentText;
    c.ctx.font = "900 25px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(ctaTxt, w / 2, bottom + 1);
  },

  indicacao(theme, w, H) {
    const c = h();
    const padX = 72;
    const { top, bottom } = c.getSafeVerticalBounds(H);
    const headerBottom = c.drawProfileHeader(theme, w, padX, top);
    const contentW = w - padX * 2;
    const isCompact = c.state.format === "square";

    let y = headerBottom + (isCompact ? 34 : 46);
    const b = c.drawBadge(theme, c.getDyn("indicacao", "tag").toUpperCase(), padX, y);
    y += b.h + 24;

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `800 ${c.sc(isCompact ? 40 : 48)}px Inter, Segoe UI, sans-serif`;
    c.ctx.textAlign = "left";
    c.ctx.textBaseline = "top";
    const pLines = c.wrapText(c.ctx, c.getDyn("indicacao", "product"), contentW);
    y = c.drawWrappedLines(c.ctx, pLines, padX, y, c.sc(56), theme) + 14;

    const stars = Math.max(1, Math.min(5, Number(c.getDyn("indicacao", "rating")) || 5));
    c.ctx.fillStyle = "#facc15";
    c.ctx.font = "800 36px Inter, Segoe UI, sans-serif";
    c.ctx.fillText("★".repeat(stars) + "☆".repeat(5 - stars), padX, y);
    y += 62;

    const pros = c.getDyn("indicacao", "pros").split("\n").map((s) => s.trim()).filter(Boolean);
    const fSize = c.sc(isCompact ? 26 : 29);
    const lH = Math.round(fSize * 1.45);
    const boxH = Math.max(200, pros.length * lH + 92);

    c.ctx.fillStyle = theme.card;
    c.ctx.strokeStyle = theme.cardBorder;
    c.ctx.lineWidth = 2;
    c.roundRect(c.ctx, padX, y, contentW, boxH, 22);
    c.ctx.fill();
    c.ctx.stroke();

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "800 22px Inter, Segoe UI, sans-serif";
    c.ctx.fillText("POR QUE VALE A PENA", padX + 32, y + 26);

    c.ctx.fillStyle = theme.text;
    c.ctx.font = `600 ${fSize}px Inter, Segoe UI, sans-serif`;
    let py = y + 68;
    for (const pr of pros) {
      c.ctx.fillText(`✓  ${pr}`, padX + 32, py);
      py += lH;
    }

    c.ctx.fillStyle = theme.accent;
    c.ctx.font = "800 26px Inter, Segoe UI, sans-serif";
    c.ctx.textAlign = "center";
    c.ctx.textBaseline = "middle";
    c.ctx.fillText(c.getDyn("indicacao", "cta"), w / 2, bottom);
  },
};
