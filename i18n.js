const APP_TR = {
  pt: {
    tabs: { inicio:'Início', licoes:'Lições', quiz:'Quiz', simulado:'Simulado', historico:'Histórico' },
    topbar: { subtitle:'Plataforma de Estudos', reset:'Resetar', home:'Início' },
    inicio: {
      metrics: { lessons:'Lições', attempts:'Tentativas', avg:'Média Geral', questions:'Questões' },
      title: 'Progresso Rápido',
      noAttempts: 'Nenhuma tentativa ainda. Comece pelo Quiz!',
      lastAttempt: 'Última tentativa',
      hint: 'Use <strong>Lições</strong> para estudar por tema e <strong>Quiz / Simulado</strong> para avaliar domínio.'
    },
    licoes: {
      title: 'Catálogo de Lições',
      search: 'Buscar por título ou resumo',
      allTopics: 'Todos',
      markDone: 'Marcar como concluída',
      alreadyDone: 'Concluída',
      unmarkDone: 'Desmarcar',
      source: 'Fonte',
      noResults: 'Sem resultados para os filtros.',
      loading: 'Carregando conteúdo…',
      loadError: 'Não foi possível carregar o conteúdo desta lição.'
    },
    session: {
      question: 'Pergunta', of: 'de',
      timeLeft: 'Tempo restante',
      prev: 'Anterior', next: 'Próxima', finish: 'Finalizar',
      lastResult: 'Último Resultado',
      retry: 'Tentar Novamente',
      viewHistory: 'Ver Histórico',
      timeout: 'Encerrado por tempo.',
      opportunities: 'Maiores oportunidades',
      confirmFinish: 'questão(ões) sem resposta. Finalizar mesmo assim?'
    },
    quiz:     { title:'Quiz Rápido',  desc:'10 questões aleatórias para verificação rápida de domínio.', start:'Iniciar Quiz' },
    simulado: { title:'Simulado',     desc:'20 questões, tempo total de 25 minutos.',                   start:'Iniciar Simulado' },
    historico: {
      title: 'Histórico de Avaliações',
      noHistory: 'Sem tentativas registradas ainda.',
      noHistoryCta: 'Faça seu primeiro quiz para começar!',
      total: 'Tentativas', avg: 'Média', best: 'Melhor',
      opportunities: 'Oportunidades'
    },
    levels: { ok:'Avançado', warn:'Intermediário', bad:'Fundacional' }
  },

  en: {
    tabs: { inicio:'Home', licoes:'Lessons', quiz:'Quiz', simulado:'Mock Exam', historico:'History' },
    topbar: { subtitle:'Study Platform', reset:'Reset', home:'Home' },
    inicio: {
      metrics: { lessons:'Lessons', attempts:'Attempts', avg:'Avg Score', questions:'Questions' },
      title: 'Quick Progress',
      noAttempts: 'No attempts yet. Start with the Quiz!',
      lastAttempt: 'Last attempt',
      hint: 'Use <strong>Lessons</strong> to study by topic and <strong>Quiz / Mock Exam</strong> to assess your knowledge.'
    },
    licoes: {
      title: 'Lessons Catalog',
      search: 'Search by title or summary',
      allTopics: 'All',
      markDone: 'Mark as completed',
      alreadyDone: 'Completed',
      unmarkDone: 'Unmark',
      source: 'Source',
      noResults: 'No results for the current filters.',
      loading: 'Loading content…',
      loadError: 'Could not load the content of this lesson.'
    },
    session: {
      question: 'Question', of: 'of',
      timeLeft: 'Time left',
      prev: 'Previous', next: 'Next', finish: 'Finish',
      lastResult: 'Last Result',
      retry: 'Try Again',
      viewHistory: 'View History',
      timeout: 'Time ran out.',
      opportunities: 'Top opportunities',
      confirmFinish: 'question(s) unanswered. Finish anyway?'
    },
    quiz:     { title:'Quick Quiz',   desc:'10 random questions for quick knowledge verification.', start:'Start Quiz' },
    simulado: { title:'Mock Exam',    desc:'20 questions, 25-minute time limit.',                   start:'Start Mock Exam' },
    historico: {
      title: 'Assessment History',
      noHistory: 'No attempts recorded yet.',
      noHistoryCta: 'Take your first quiz to get started!',
      total: 'Attempts', avg: 'Average', best: 'Best',
      opportunities: 'Opportunities'
    },
    levels: { ok:'Advanced', warn:'Intermediate', bad:'Foundational' }
  },

  es: {
    tabs: { inicio:'Inicio', licoes:'Lecciones', quiz:'Quiz', simulado:'Simulacro', historico:'Historial' },
    topbar: { subtitle:'Plataforma de Estudios', reset:'Resetear', home:'Inicio' },
    inicio: {
      metrics: { lessons:'Lecciones', attempts:'Intentos', avg:'Promedio', questions:'Preguntas' },
      title: 'Progreso Rápido',
      noAttempts: '¡Sin intentos aún. Comienza con el Quiz!',
      lastAttempt: 'Último intento',
      hint: 'Usa <strong>Lecciones</strong> para estudiar por tema y <strong>Quiz / Simulacro</strong> para evaluar tu dominio.'
    },
    licoes: {
      title: 'Catálogo de Lecciones',
      search: 'Buscar por título o resumen',
      allTopics: 'Todos',
      markDone: 'Marcar como completada',
      alreadyDone: 'Completada',
      unmarkDone: 'Desmarcar',
      source: 'Fuente',
      noResults: 'Sin resultados para los filtros.',
      loading: 'Cargando contenido…',
      loadError: 'No se pudo cargar el contenido de esta lección.'
    },
    session: {
      question: 'Pregunta', of: 'de',
      timeLeft: 'Tiempo restante',
      prev: 'Anterior', next: 'Siguiente', finish: 'Finalizar',
      lastResult: 'Último Resultado',
      retry: 'Intentar de nuevo',
      viewHistory: 'Ver Historial',
      timeout: 'Tiempo agotado.',
      opportunities: 'Principales oportunidades',
      confirmFinish: 'pregunta(s) sin respuesta. ¿Finalizar de todas formas?'
    },
    quiz:     { title:'Quiz Rápido',  desc:'10 preguntas aleatorias para verificación rápida de dominio.', start:'Iniciar Quiz' },
    simulado: { title:'Simulacro',    desc:'20 preguntas, tiempo total de 25 minutos.',                    start:'Iniciar Simulacro' },
    historico: {
      title: 'Historial de Evaluaciones',
      noHistory: 'Sin intentos registrados aún.',
      noHistoryCta: '¡Realiza tu primer quiz para empezar!',
      total: 'Intentos', avg: 'Promedio', best: 'Mejor',
      opportunities: 'Oportunidades'
    },
    levels: { ok:'Avanzado', warn:'Intermedio', bad:'Fundacional' }
  }
};

window.getLang = () => localStorage.getItem('lang') || 'pt';

window.t = (key) => {
  const lang = window.getLang();
  const tr = APP_TR[lang] || APP_TR.pt;
  const keys = key.split('.');
  let val = tr;
  for (const k of keys) val = val?.[k];
  if (val !== undefined) return val;
  // fallback to pt
  let fb = APP_TR.pt;
  for (const k of keys) fb = fb?.[k];
  return fb ?? key;
};

window.setLang = (lang) => {
  if (!APP_TR[lang]) return;
  localStorage.setItem('lang', lang);
  // update static data-i18n elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = window.t(el.dataset.i18n);
  });
  // update lang-btn active state
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang)
  );
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en' : 'es-419';
  // re-render dynamic content
  if (typeof render === 'function') render();
};

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const lang = window.getLang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = window.t(el.dataset.i18n);
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
    b.addEventListener('click', () => window.setLang(b.dataset.lang));
  });
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en' : 'es-419';
});
