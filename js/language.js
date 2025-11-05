// Sistema de Internacionalização

class LanguageManager {
    constructor() {
        this.currentLang = 'pt';
        this.translations = {
            'pt': {
                // Títulos e Textos Principais
                'title': 'Palettor',
                'tagline': 'Extraia a essência cromática das suas imagens',

                // Upload de Imagem
                'upload.title': '📁 Upload de Imagem',
                'upload.step': 'Passo 1',
                'upload.drag': 'Arraste e solte sua imagem',
                'upload.supported': 'Suporta JPG, PNG, WebP e GIF',
                'upload.select': 'Selecionar Arquivo',
                'upload.hint': 'Ou clique para procurar',

                // Preview da Imagem
                'preview.title': '🖼️ Preview',
                'preview.step': 'Passo 2',
                'preview.analyze': 'Extrair Paleta de Cores',
                'preview.change': 'Trocar Imagem',

                // Paleta de Cores
                'palette.title': '🎨 Paleta Extraída',
                'palette.result': 'Resultado',
                'palette.method': 'Método de Extração',
                'palette.predominant': '🎯 Predominantes',    // Cores mais frequentes na imagem
                'palette.vibrant': '⚡ Vibrantes',           // Cores mais saturadas e vivas
                'palette.balanced': '⚖️ Balanceadas',       // Variedade equilibrada de tons
                'palette.export': 'Exportar Paleta',
                'palette.stats': '📊 Estatísticas da Paleta',
                'palette.start': 'Selecione uma imagem para começar a análise cromática',

                // Ferramentas de Análise
                'tools.title': '🛠️ Ferramentas Profissionais',
                'tools.contrast': '🎯 Teste de Contraste',
                'tools.selectColors': 'Selecione duas cores',
                'tools.clickHint': 'Clique em duas cores da paleta para testar contraste',
                'tools.visualization': '🌈 Visualização',
                'tools.gradient': 'Gradiente',
                'tools.gradientTitle': 'Gradiente da Paleta',
                'tools.gradientDesc': 'Visualize a transição entre as cores',

                // Padrões de Acessibilidade WCAG
                'tools.aaa.title': 'Excelente (7:1+)',
                'tools.aaa.desc': 'Textos pequenos e longas leituras',
                'tools.aa.title': 'Bom (4.5:1+)',
                'tools.aa.desc': 'Textos normais e interfaces',
                'tools.fail.title': 'Ruim (&lt;4.5:1)',
                'tools.fail.desc': 'Não recomendado para textos',

                // Sistema de Notificações
                'notification.loadSuccess': 'Imagem carregada com sucesso! Clique em "Extrair Paleta de Cores" para analisar.',
                'notification.analyzeSuccess': 'Cores extraídas com sucesso! Clique nas cores para testar contraste.',
                'notification.noImage': 'Por favor, carregue uma imagem primeiro',
                'notification.invalidImage': 'Por favor, selecione uma imagem válida (JPEG, PNG, WebP, GIF)',
                'notification.exportSuccess': 'Paleta copiada para a área de transferência!',
                'notification.maxColors': 'Máximo de 2 cores selecionadas para teste de contraste',
                'notification.colorSelected': 'Cor selecionada para teste',
                'notification.colorDeselected': 'Cor desselecionada',
                'notification.ready': 'Pronto para nova imagem!',
                'notification.analyzing': 'Analisando cores...',
                'notification.error': 'Erro ao processar a imagem',
                'notification.downloadSuccess': 'Paleta baixada como arquivo texto!',
                'notification.noColors': 'Nenhuma cor foi encontrada na imagem.',

                // Catálogo de Nomes de Cores (classificação automática)
                'color.white': 'Branco',
                'color.black': 'Preto',
                'color.darkGray': 'Cinza Escuro',
                'color.gray': 'Cinza',
                'color.lightGray': 'Cinza Claro',
                'color.red': 'Vermelho',
                'color.darkRed': 'Vermelho Escuro',
                'color.lightRed': 'Vermelho Claro',
                'color.softRed': 'Vermelho Suave',
                'color.vibrantRed': 'Vermelho Vibrante',
                'color.orange': 'Laranja',
                'color.darkOrange': 'Laranja Escuro',
                'color.lightOrange': 'Laranja Claro',
                'color.softOrange': 'Laranja Suave',
                'color.vibrantOrange': 'Laranja Vibrante',
                'color.yellow': 'Amarelo',
                'color.darkYellow': 'Amarelo Escuro',
                'color.lightYellow': 'Amarelo Claro',
                'color.softYellow': 'Amarelo Suave',
                'color.vibrantYellow': 'Amarelo Vibrante',
                'color.green': 'Verde',
                'color.darkGreen': 'Verde Escuro',
                'color.lightGreen': 'Verde Claro',
                'color.softGreen': 'Verde Suave',
                'color.vibrantGreen': 'Verde Vibrante',
                'color.turquoise': 'Turquesa',
                'color.darkTurquoise': 'Turquesa Escuro',
                'color.lightTurquoise': 'Turquesa Claro',
                'color.softTurquoise': 'Turquesa Suave',
                'color.vibrantTurquoise': 'Turquesa Vibrante',
                'color.blue': 'Azul',
                'color.darkBlue': 'Azul Escuro',
                'color.lightBlue': 'Azul Claro',
                'color.softBlue': 'Azul Suave',
                'color.vibrantBlue': 'Azul Vibrante',
                'color.purple': 'Roxo',
                'color.darkPurple': 'Roxo Escuro',
                'color.lightPurple': 'Roxo Claro',
                'color.softPurple': 'Roxo Suave',
                'color.vibrantPurple': 'Roxo Vibrante',
                'color.pink': 'Rosa',
                'color.darkPink': 'Rosa Escuro',
                'color.lightPink': 'Rosa Claro',
                'color.softPink': 'Rosa Suave',
                'color.vibrantPink': 'Rosa Vibrante',
                'color.custom': 'Cor Personalizada' // Fallback para cores não classificadas
            },
            'en': {
                // Main Titles and Text
                'title': 'Palettor',
                'tagline': 'Extract the chromatic essence of your images',

                // Image Upload
                'upload.title': '📁 Image Upload',
                'upload.step': 'Step 1',
                'upload.drag': 'Drag and drop your image',
                'upload.supported': 'Supports JPG, PNG, WebP and GIF',
                'upload.select': 'Select File',
                'upload.hint': 'Or click to browse',

                // Image Preview
                'preview.title': '🖼️ Preview',
                'preview.step': 'Step 2',
                'preview.analyze': 'Extract Color Palette',
                'preview.change': 'Change Image',

                // Color Palette
                'palette.title': '🎨 Extracted Palette',
                'palette.result': 'Result',
                'palette.method': 'Extraction Method',
                'palette.predominant': '🎯 Predominant',      // Most frequent colors in image
                'palette.vibrant': '⚡ Vibrant',             // Most saturated and vivid colors
                'palette.balanced': '⚖️ Balanced',          // Balanced variety of tones
                'palette.export': 'Export Palette',
                'palette.stats': '📊 Palette Statistics',
                'palette.start': 'Select an image to start chromatic analysis',

                // Analysis Tools
                'tools.title': '🛠️ Professional Tools',
                'tools.contrast': '🎯 Contrast Test',
                'tools.selectColors': 'Select two colors',
                'tools.clickHint': 'Click two colors from the palette to test contrast',
                'tools.visualization': '🌈 Visualization',
                'tools.gradient': 'Gradient',
                'tools.gradientTitle': 'Palette Gradient',
                'tools.gradientDesc': 'Visualize the transition between colors',

                // WCAG Accessibility Standards
                'tools.aaa.title': 'Excellent (7:1+)',
                'tools.aaa.desc': 'Small text and long reading',
                'tools.aa.title': 'Good (4.5:1+)',
                'tools.aa.desc': 'Normal text and interfaces',
                'tools.fail.title': 'Poor (&lt;4.5:1)',
                'tools.fail.desc': 'Not recommended for text',

                // Notification System
                'notification.loadSuccess': 'Image loaded successfully! Click "Extract Color Palette" to analyze.',
                'notification.analyzeSuccess': 'Colors extracted successfully! Click on colors to test contrast.',
                'notification.noImage': 'Please load an image first',
                'notification.invalidImage': 'Please select a valid image (JPEG, PNG, WebP, GIF)',
                'notification.exportSuccess': 'Palette copied to clipboard!',
                'notification.maxColors': 'Maximum of 2 colors selected for contrast test',
                'notification.colorSelected': 'Color selected for testing',
                'notification.colorDeselected': 'Color deselected',
                'notification.ready': 'Ready for new image!',
                'notification.analyzing': 'Analyzing colors...',
                'notification.error': 'Error processing image',
                'notification.downloadSuccess': 'Palette downloaded as text file!',
                'notification.noColors': 'No colors were found in the image.',

                // Color Names Catalog (automatic classification)
                'color.white': 'White',
                'color.black': 'Black',
                'color.darkGray': 'Dark Gray',
                'color.gray': 'Gray',
                'color.lightGray': 'Light Gray',
                'color.red': 'Red',
                'color.darkRed': 'Dark Red',
                'color.lightRed': 'Light Red',
                'color.softRed': 'Soft Red',
                'color.vibrantRed': 'Vibrant Red',
                'color.orange': 'Orange',
                'color.darkOrange': 'Dark Orange',
                'color.lightOrange': 'Light Orange',
                'color.softOrange': 'Soft Orange',
                'color.vibrantOrange': 'Vibrant Orange',
                'color.yellow': 'Yellow',
                'color.darkYellow': 'Dark Yellow',
                'color.lightYellow': 'Light Yellow',
                'color.softYellow': 'Soft Yellow',
                'color.vibrantYellow': 'Vibrant Yellow',
                'color.green': 'Green',
                'color.darkGreen': 'Dark Green',
                'color.lightGreen': 'Light Green',
                'color.softGreen': 'Soft Green',
                'color.vibrantGreen': 'Vibrant Green',
                'color.turquoise': 'Turquoise',
                'color.darkTurquoise': 'Dark Turquoise',
                'color.lightTurquoise': 'Light Turquoise',
                'color.softTurquoise': 'Soft Turquoise',
                'color.vibrantTurquoise': 'Vibrant Turquoise',
                'color.blue': 'Blue',
                'color.darkBlue': 'Dark Blue',
                'color.lightBlue': 'Light Blue',
                'color.softBlue': 'Soft Blue',
                'color.vibrantBlue': 'Vibrant Blue',
                'color.purple': 'Purple',
                'color.darkPurple': 'Dark Purple',
                'color.lightPurple': 'Light Purple',
                'color.softPurple': 'Soft Purple',
                'color.vibrantPurple': 'Vibrant Purple',
                'color.pink': 'Pink',
                'color.darkPink': 'Dark Pink',
                'color.lightPink': 'Light Pink',
                'color.softPink': 'Soft Pink',
                'color.vibrantPink': 'Vibrant Pink',
                'color.custom': 'Custom Color' // Fallback for unclassified colors
            }
        };

        this.initialize();
    }

    // Inicializa o gerenciador de idiomas
    initialize() {
        // Carrega idioma salvo ou detecta preferência do navegador
        const savedLang = localStorage.getItem('palettor-lang');
        const browserLang = navigator.language.split('-')[0];

        if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
            this.currentLang = savedLang;
        } else if (browserLang === 'pt' || browserLang === 'en') {
            this.currentLang = browserLang;
        } else {
            // Default para inglês se o browser não for pt ou en
            this.currentLang = 'en';
        }

        this.setupEventListeners();
        this.applyLanguage();
    }

    // Configura os event listeners para botões de idioma
    setupEventListeners() {
        const langButtons = document.querySelectorAll('.lang-btn');

        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });

        // Escuta por mudanças de idioma de outros componentes
        document.addEventListener('languageChanged', (e) => {
            this.currentLang = e.detail.lang;
            this.applyLanguage();
            this.updateActiveButton();
        });
    }

    // Troca o idioma atual
    switchLanguage(lang) {
        if (lang !== this.currentLang && (lang === 'pt' || lang === 'en')) {
            this.currentLang = lang;
            localStorage.setItem('palettor-lang', lang);
            this.applyLanguage();
            this.updateActiveButton();
            this.notifyLanguageChange();
        }
    }

    // Aplica as traduções a todos os elementos da página
    applyLanguage() {
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[this.currentLang][key];

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Atualiza o atributo lang do HTML para acessibilidade
        document.documentElement.lang = this.currentLang;

        // Atualiza notificações se houver alguma
        this.updateNotifications();

        // Atualiza textos dinâmicos
        this.updateDynamicTexts();

        // Atualiza nomes das cores na paleta
        this.updateColorNames();
    }

    // Atualiza o botão do idioma ativo
    updateActiveButton() {
        const langButtons = document.querySelectorAll('.lang-btn');

        langButtons.forEach(btn => {
            if (btn.dataset.lang === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateNotifications() {
        // Esta função será chamada pelo UIManager quando necessário
        console.log('Language updated to:', this.currentLang);
    }

    // Atualiza textos que são gerados dinamicamente pelo JavaScript
    updateDynamicTexts() {
        const paletteInfo = document.getElementById('paletteInfo');
        if (!paletteInfo) return;

        const colorCards = document.querySelectorAll('.color-card');

        if (colorCards.length > 0) {
            const methodSelect = document.getElementById('methodSelect');
            let methodName = '';

            if (methodSelect) {
                const selectedOption = methodSelect.options[methodSelect.selectedIndex];
                methodName = selectedOption.textContent;
            }

            // Textos traduzidos dinamicamente
            const colorsText = this.currentLang === 'pt'
                ? `${colorCards.length} cores extraídas`
                : `${colorCards.length} colors extracted`;

            const hintText = this.currentLang === 'pt'
                ? '💡 Clique em duas cores da paleta para testar contraste'
                : '💡 Click two colors from the palette to test contrast';

            paletteInfo.innerHTML = `
                <div class="info-card">
                    <h4>${this.t('palette.stats')}</h4>
                    <p><strong>${colorsText}</strong> | ${methodName}</p>
                    <p><strong>${hintText}</strong></p>
                </div>
            `;
        } else {
            paletteInfo.innerHTML = `
                <div class="info-card">
                    <h4>${this.t('palette.stats')}</h4>
                    <p>${this.t('palette.start')}</p>
                </div>
            `;
        }

        // Atualiza o texto do contraste se estiver ativo
        this.updateContrastText();
    }

    // Atualiza os nomes das cores quando o idioma muda
    updateColorNames() {
        const colorCards = document.querySelectorAll('.color-card');

        colorCards.forEach(card => {
            const hex = card.dataset.hex;
            const rgb = card.dataset.rgb;

            if (hex && rgb) {
                // Extrai os valores RGB
                const [r, g, b] = rgb.split(',').map(val => parseInt(val.trim()));

                // Gera o novo nome traduzido
                const colorName = this.generateTranslatedColorName(r, g, b);
                const colorNameElement = card.querySelector('.color-name');

                if (colorNameElement) {
                    colorNameElement.textContent = colorName;
                }
            }
        });
    }

    // Atualiza o texto do teste de contraste WCAG
    updateContrastText() {
        const contrastTest = document.getElementById('contrastTest');
        if (!contrastTest) return;

        const selectedColors = Array.from(document.querySelectorAll('.color-card.selected'));

        if (selectedColors.length === 2) {
            const [color1, color2] = selectedColors;
            const hex1 = color1.dataset.hex;
            const hex2 = color2.dataset.hex;

            if (hex1 && hex2) {
                const contrastRatio = ColorUtils.getContrastRatio(hex1, hex2);
                const wcagCompliance = ColorUtils.checkWcagCompliance(contrastRatio);

                const complianceColor = wcagCompliance.passed ?
                    (wcagCompliance.level === 'AAA' ? '#10b981' : '#f59e0b') :
                    '#ef4444';

                const complianceIcon = wcagCompliance.passed ? '✅' : '❌';

                const contrastText = this.currentLang === 'pt' ? 'Contraste' : 'Contrast';
                const passText = this.currentLang === 'pt' ? 'APROVADO' : 'PASS';
                const failText = this.currentLang === 'pt' ? 'REPROVADO' : 'FAIL';

                contrastTest.innerHTML = `
                    <div style="text-align: center; padding: 1rem; width: 100%;">
                        <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 0.5rem;">
                            ${complianceIcon} ${contrastText}: ${contrastRatio.toFixed(2)}:1
                        </div>
                        <div style="font-size: 0.9rem; padding: 0.5rem; background: ${complianceColor}; color: white; border-radius: 4px; margin-bottom: 0.5rem; font-weight: bold;">
                            WCAG ${wcagCompliance.level} ${wcagCompliance.passed ? ` - ${passText}` : ` - ${failText}`}
                        </div>
                    </div>
                `;
                contrastTest.style.background = `linear-gradient(90deg, ${hex1} 50%, ${hex2} 50%)`;
            }
        } else {
            contrastTest.innerHTML = `
                <div class="contrast-placeholder">
                    <div class="placeholder-icon">👆</div>
                    <p>${this.t('tools.selectColors')}</p>
                    <small>${this.t('tools.clickHint')}</small>
                </div>
            `;
            contrastTest.style.background = 'var(--color-bg-tertiary)';
        }
    }

    // Gera nomes de cores traduzidos baseado nos valores RGB
    generateTranslatedColorName(r, g, b) {
        const hsl = ColorUtils.rgbToHsl(r, g, b);
        const { h, s, l } = hsl;

        // Cores acromáticas (sem saturação - tons de cinza)
        if (s < 10) {
            if (l > 90) return this.t('color.white');
            if (l < 10) return this.t('color.black');
            if (l < 30) return this.t('color.darkGray');
            if (l < 60) return this.t('color.gray');
            return this.t('color.lightGray');
        }

        // Determina a cor base baseada no matiz (hue)
        let baseColor = '';
        let baseColorKey = '';

        if (h >= 0 && h < 15) baseColorKey = 'red';
        else if (h >= 15 && h < 45) baseColorKey = 'orange';
        else if (h >= 45 && h < 65) baseColorKey = 'yellow';
        else if (h >= 65 && h < 150) baseColorKey = 'green';
        else if (h >= 150 && h < 195) baseColorKey = 'turquoise';
        else if (h >= 195 && h < 255) baseColorKey = 'blue';
        else if (h >= 255 && h < 330) baseColorKey = 'purple';
        else baseColorKey = 'pink';

        // Adjetivos baseados na luminosidade e saturação
        let adjective = '';

        if (l < 25) adjective = 'dark';
        else if (l > 75) adjective = 'light';
        else if (s < 40) adjective = 'soft';
        else if (s > 80) adjective = 'vibrant';

        // Constrói a chave de tradução
        const colorKey = adjective ? `color.${adjective}${this.capitalizeFirst(baseColorKey)}` : `color.${baseColorKey}`;

        // Retorna a tradução ou fallback
        return this.t(colorKey) || this.t('color.custom');
    }

    // Método auxiliar para capitalizar a primeira letra
    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Notifica outros componentes sobre mudança de idioma
    notifyLanguageChange() {
        // Dispara um evento customizado para que outros componentes saibam que o idioma mudou
        const event = new CustomEvent('languageChanged', {
            detail: { lang: this.currentLang }
        });
        document.dispatchEvent(event);
    }

    // Método para obter traduções para uso no JavaScript
    t(key) {
        return this.translations[this.currentLang][key] || key;
    }

    // Método para obter o idioma atual
    getCurrentLang() {
        return this.currentLang;
    }

    // Método para verificar se é português
    isPortuguese() {
        return this.currentLang === 'pt';
    }

    // Método para verificar se é inglês
    isEnglish() {
        return this.currentLang === 'en';
    }
}

// Instância global
const i18n = new LanguageManager();

// Export para uso em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LanguageManager, i18n };
}