// Sinaliza para o ConcursoStudio que a extensão está ativa
document.documentElement.dataset.tecExtension = "ready";

window.addEventListener("message", (event) => {
  if (event.source !== window || !event.data) return;
  if (event.data.type === "CONCURSOSTUDIO_FETCH_TEC" && event.data.url) {
    chrome.runtime.sendMessage(
      { type: "FETCH_TEC_QUESTION", url: event.data.url },
      (response) => {
        window.postMessage(
          {
            type: "CONCURSOSTUDIO_TEC_RESULT",
            requestId: event.data.requestId,
            ok: Boolean(response && response.ok),
            data: response ? response.data : null,
            error: response ? response.error : "Sem resposta da extensão.",
          },
          "*"
        );
      }
    );
  }
});
