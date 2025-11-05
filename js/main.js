// Arquivo principal - Ponto de entrada da aplicação Palettor

class ColorExtractorApp {
    constructor() {
        this.uiManager = null;
        this.isInitialized = false;
    }

    // Método principal de inicialização da aplicação
    init() {
        if (this.isInitialized) return;

        try {
            console.log('Inicializando Palettor App...');

            // Cria partículas decorativas no background
            this.createParticles();

            // Inicializa o gerenciador de interface do usuário
            this.uiManager = new UIManager();

            // Verifica se o navegador suporta as APIs necessárias
            this.checkBrowserSupport();

            this.isInitialized = true;
            console.log('🎨 Palettor App inicializado com sucesso!');

        } catch (error) {
            console.error('Erro ao inicializar o app:', error);
            NotificationManager.show('Erro ao inicializar a aplicação', 'error');
        }
    }

    // Cria partículas animadas para efeito visual no fundo
    createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        // Cores suaves para as partículas (tons da paleta principal)
        const colors = [
            'rgba(99, 102, 241, 0.1)',    // Azul suave
            'rgba(139, 92, 246, 0.1)',    // Roxo suave
            'rgba(16, 185, 129, 0.05)',   // Verde suave
            'rgba(245, 158, 11, 0.05)'    // Laranja suave
        ];

        // Cria 15 partículas com propriedades aleatórias
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Propriedades aleatórias para variação visual
            const size = Math.random() * 100 + 50; // Tamanho entre 50px e 150px
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Aplica estilos CSS dinamicamente
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.left = `${Math.random() * 100}%`;   // Posição horizontal aleatória
            particle.style.top = `${Math.random() * 100}%`;    // Posição vertical aleatória
            particle.style.animationDelay = `${Math.random() * 5}s`;      // Delay aleatório
            particle.style.animationDuration = `${8 + Math.random() * 8}s`; // Duração entre 8-16s

            container.appendChild(particle);
        }
    }

    // Verifica se o navegador suporta APIs necessárias para funcionamento
    checkBrowserSupport() {
        const requiredAPIs = [
            'FileReader',          // Para leitura de arquivos de imagem
            'HTMLCanvasElement'    // Para análise e manipulação de pixels
        ];

        // Filtra APIs que não estão disponíveis no navegador atual
        const missingAPIs = requiredAPIs.filter(api => !window[api]);

        if (missingAPIs.length > 0) {
            console.warn('APIs não suportadas:', missingAPIs);
            NotificationManager.show(
                'Algumas funcionalidades podem não estar disponíveis no seu navegador.',
                'warning'
            );
        }
    }
}

// Inicializa a aplicação quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado, inicializando app...');
    const app = new ColorExtractorApp();
    app.init();
});

// Tratamento global de erros não capturados
window.addEventListener('error', (event) => {
    console.error('Erro global:', event.error);
});