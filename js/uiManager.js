// Gerenciador de Interface do Usuário - ATUALIZADO COM TRADUÇÕES DINÂMICAS

class UIManager {
    constructor() {
        this.selectedColors = new Set(); // Armazena cores selecionadas para teste de contraste
        this.initializeEventListeners();
        console.log('UIManager inicializado');
    }

    // Configura todos os event listeners da interface
    initializeEventListeners() {
        console.log('Inicializando event listeners...');

        // ========== UPLOAD DE ARQUIVO ==========
        // CORRIGIDO: usa apenas um botão para abrir o seletor de arquivos
        const selectBtn = document.getElementById('selectBtn');
        const fileInput = document.getElementById('fileInput');

        if (selectBtn && fileInput) {
            selectBtn.addEventListener('click', () => {
                fileInput.click(); // Simula clique no input de arquivo
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files[0]) {
                    this.handleFileSelect(e.target.files[0]);
                }
            });
        }

        // ========== DRAG AND DROP ==========
        const dropZone = document.getElementById('dropZone');
        if (dropZone) {
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault(); // Permite soltar o arquivo
                dropZone.classList.add('dragover'); // Feedback visual
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('dragover'); // Remove feedback visual
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('dragover');
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    this.handleFileSelect(e.dataTransfer.files[0]);
                }
            });
        }

        // ========== BOTÕES DE CONTROLE ==========
        const analyzeBtn = document.getElementById('analyzeBtn');
        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', () => {
                this.analyzeImage(); // Aciona análise da imagem
            });
        }

        const newImageBtn = document.getElementById('newImageBtn');
        if (newImageBtn) {
            newImageBtn.addEventListener('click', () => {
                this.resetToUpload(); // Volta para tela de upload
            });
        }

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportPalette(); // Exporta paleta de cores
            });
        }

        // ========== SELEÇÃO DE MÉTODO DE EXTRAÇÃO ==========
        const methodSelect = document.getElementById('methodSelect');
        if (methodSelect) {
            methodSelect.addEventListener('change', () => {
                const previewSection = document.getElementById('previewSection');
                // Re-analisa a imagem apenas se já houver uma imagem carregada
                if (previewSection && previewSection.style.display !== 'none') {
                    this.analyzeImage();
                }
            });
        }

        console.log('Event listeners configurados com sucesso');
    }

    // Processa arquivo selecionado via upload ou drag & drop
    async handleFileSelect(file) {
        console.log('Arquivo selecionado:', file);

        if (!file) {
            NotificationManager.show(i18n.t('notification.noImage'), 'error');
            return;
        }

        if (!FileUtils.isValidImage(file)) {
            NotificationManager.show(i18n.t('notification.invalidImage'), 'error');
            return;
        }

        try {
            const dataUrl = await FileUtils.readFileAsDataURL(file);
            this.displayImagePreview(dataUrl);
            NotificationManager.show(i18n.t('notification.loadSuccess'));
        } catch (error) {
            console.error('Erro ao carregar imagem:', error);
            NotificationManager.show(i18n.t('notification.error'), 'error');
        }
    }

    // Exibe preview da imagem e mostra seções de preview e paleta
    displayImagePreview(dataUrl) {
        const imagePreview = document.getElementById('imagePreview');
        const previewSection = document.getElementById('previewSection');
        const uploadSection = document.querySelector('.upload-section');
        const paletteSection = document.getElementById('paletteSection');

        if (imagePreview && previewSection && uploadSection && paletteSection) {
            imagePreview.src = dataUrl;
            previewSection.style.display = 'block';     // Mostra preview
            uploadSection.style.display = 'none';       // Esconde upload
            paletteSection.style.display = 'block';     // Mostra seção da paleta

            // Limpa paleta anterior se houver
            const colorPalette = document.getElementById('colorPalette');
            const paletteInfo = document.getElementById('paletteInfo');
            if (colorPalette) colorPalette.innerHTML = '';
            if (paletteInfo) paletteInfo.innerHTML = '';
        }
    }

    // Analisa a imagem e extrai cores usando o método selecionado
    async analyzeImage() {
        const imagePreview = document.getElementById('imagePreview');

        if (!imagePreview || !imagePreview.src || imagePreview.src === window.location.href) {
            NotificationManager.show(i18n.t('notification.noImage'), 'error');
            return;
        }

        try {
            // ========== FEEDBACK VISUAL DE CARREGAMENTO ==========
            const analyzeBtn = document.getElementById('analyzeBtn');
            const originalText = analyzeBtn.innerHTML;
            analyzeBtn.innerHTML = '<span class="btn-icon">⏳</span> ' + i18n.t('notification.analyzing');
            analyzeBtn.disabled = true;

            // Aguarda a imagem carregar completamente
            await this.waitForImageLoad(imagePreview);

            const extractor = new ColorExtractor('imageCanvas');
            const methodSelect = document.getElementById('methodSelect');
            const method = methodSelect ? methodSelect.value : 'predominant';

            const colors = extractor.extractColors(imagePreview, method, 6);

            this.displayColorPalette(colors);
            this.updateTools(colors, extractor);

            NotificationManager.show(i18n.t('notification.analyzeSuccess'));

        } catch (error) {
            console.error('Erro ao analisar imagem:', error);
            NotificationManager.show(i18n.t('notification.error'), 'error');
        } finally {
            // Restaura o botão independente de sucesso ou erro
            const analyzeBtn = document.getElementById('analyzeBtn');
            if (analyzeBtn) {
                analyzeBtn.innerHTML = '<span class="btn-icon">🎨</span> ' + i18n.t('preview.analyze');
                analyzeBtn.disabled = false;
            }
        }
    }

    // Aguarda o carregamento completo da imagem
    waitForImageLoad(image) {
        return new Promise((resolve) => {
            if (image.complete && image.naturalHeight !== 0) {
                resolve(); // Imagem já está carregada
            } else {
                image.onload = () => resolve();
                image.onerror = () => resolve(); // Não rejeita para não quebrar o app
            }
        });
    }

    // Exibe a paleta de cores extraída na interface
    displayColorPalette(colors) {
        const paletteContainer = document.getElementById('colorPalette');
        const paletteInfo = document.getElementById('paletteInfo');

        if (!paletteContainer) return;

        paletteContainer.innerHTML = '';
        this.selectedColors.clear(); // Limpa seleções anteriores

        if (colors.length === 0) {
            paletteContainer.innerHTML = `<p>${i18n.t('notification.noColors')}</p>`;
            return;
        }

        colors.forEach((color) => {
            const hex = ColorUtils.rgbToHex(color.r, color.g, color.b);

            // Usa o sistema de tradução para gerar o nome da cor
            const colorName = i18n.generateTranslatedColorName(color.r, color.g, color.b);

            const hsl = ColorUtils.rgbToHsl(color.r, color.g, color.b);

            const colorCard = document.createElement('div');
            colorCard.className = 'color-card';
            colorCard.style.backgroundColor = hex;
            colorCard.dataset.hex = hex;
            colorCard.dataset.rgb = `${color.r}, ${color.g}, ${color.b}`;

            // Escolhe cor do texto baseado no contraste (preto ou branco)
            const textColor = ColorUtils.getLuminance(color) > 0.5 ? '#000000' : '#FFFFFF';

            colorCard.innerHTML = `
            <div class="color-name" style="color: ${textColor}">${colorName}</div>
            <div class="color-value" style="color: ${textColor}">${hex}</div>
            <div class="color-value" style="color: ${textColor}">RGB: ${color.r}, ${color.g}, ${color.b}</div>
        `;

            colorCard.addEventListener('click', () => this.toggleColorSelection(colorCard, hex));
            paletteContainer.appendChild(colorCard);
        });

        // Atualiza informações da paleta com textos traduzidos
        i18n.updateDynamicTexts();
    }

    // Atualiza o teste de contraste entre duas cores selecionadas
    updateContrastTest() {
        const contrastTest = document.getElementById('contrastTest');
        if (!contrastTest) return;

        const selectedColors = Array.from(this.selectedColors);

        if (selectedColors.length !== 2) {
            // Mostra instruções se não tiver 2 cores selecionadas
            contrastTest.innerHTML = `
                <div class="contrast-placeholder">
                    <div class="placeholder-icon">👆</div>
                    <p>${i18n.t('tools.selectColors')}</p>
                    <small>${i18n.t('tools.clickHint')}</small>
                </div>
            `;
            contrastTest.style.background = 'var(--color-bg-tertiary)';
            return;
        }

        const [color1, color2] = selectedColors;
        const contrastRatio = ColorUtils.getContrastRatio(color1, color2);
        const wcagCompliance = ColorUtils.checkWcagCompliance(contrastRatio);

        // Cores de feedback baseado no resultado WCAG
        const complianceColor = wcagCompliance.passed ?
            (wcagCompliance.level === 'AAA' ? '#10b981' : '#f59e0b') : // Verde ou amarelo
            '#ef4444'; // Vermelho

        const complianceIcon = wcagCompliance.passed ? '✅' : '❌';

        // Texto do contraste traduzido
        const contrastText = i18n.currentLang === 'pt' ? 'Contraste' : 'Contrast';

        contrastTest.innerHTML = `
            <div style="text-align: center; padding: 1rem; width: 100%;">
                <div style="font-size: 1.2rem; font-weight: bold; margin-bottom: 0.5rem;">
                    ${complianceIcon} ${contrastText}: ${contrastRatio.toFixed(2)}:1
                </div>
                <div style="font-size: 0.9rem; padding: 0.5rem; background: ${complianceColor}; color: white; border-radius: 4px; margin-bottom: 0.5rem; font-weight: bold;">
                    WCAG ${wcagCompliance.level} ${wcagCompliance.passed ? ' - PASS' : ' - FAIL'}
                </div>
            </div>
        `;
        // Background com as duas cores sendo testadas
        contrastTest.style.background = `linear-gradient(90deg, ${color1} 50%, ${color2} 50%)`;
    }

    // Atualiza ferramentas visuais (gradiente)
    updateTools(colors, extractor) {
        const gradientPreview = document.getElementById('gradientPreview');
        if (gradientPreview && colors.length > 1) {
            const gradient = extractor.generateGradient(colors);
            gradientPreview.style.background = gradient;

            const gradientText = i18n.currentLang === 'pt'
                ? 'Gradiente Gerado'
                : 'Generated Gradient';

            gradientPreview.innerHTML = `<span style="background: rgba(0,0,0,0.7); padding: 0.5rem; border-radius: 4px; color: white;">${gradientText}</span>`;
        } else if (gradientPreview) {
            // Mostra placeholder se não tiver cores suficientes
            gradientPreview.innerHTML = `
                <div class="gradient-placeholder">
                    <div class="placeholder-icon">🎨</div>
                    <p>${i18n.t('tools.gradientTitle')}</p>
                    <small>${i18n.t('tools.gradientDesc')}</small>
                </div>
            `;
            gradientPreview.style.background = 'var(--color-bg-tertiary)';
        }
    }

    // Exporta paleta para clipboard ou arquivo
    exportPalette() {
        const colorCards = document.querySelectorAll('.color-card');
        if (colorCards.length === 0) {
            NotificationManager.show(i18n.t('notification.noImage'), 'error');
            return;
        }

        const palette = Array.from(colorCards).map(card => ({
            name: card.querySelector('.color-name').textContent,
            hex: card.dataset.hex,
            rgb: card.dataset.rgb
        }));

        // Textos traduzidos para o export
        const headerText = i18n.currentLang === 'pt'
            ? 'Paleta de Cores - Palettor'
            : 'Color Palette - Palettor';

        const generatedText = i18n.currentLang === 'pt'
            ? 'Gerado em'
            : 'Generated on';

        const createdText = i18n.currentLang === 'pt'
            ? 'Criado com Palettor by Mariah Santos'
            : 'Created with Palettor by Mariah Santos';

        const paletteText = `${headerText}\n` +
            `${generatedText}: ${new Date().toLocaleString(i18n.currentLang === 'pt' ? 'pt-BR' : 'en-US')}\n\n` +
            palette.map(color =>
                `▫️ ${color.name}: ${color.hex} (RGB: ${color.rgb})`
            ).join('\n') +
            `\n\n---\n${createdText}`;

        // Tenta copiar para área de transferência
        navigator.clipboard.writeText(paletteText).then(() => {
            NotificationManager.show(i18n.t('notification.exportSuccess'));
        }).catch(() => {
            // Fallback para download se clipboard falhar
            this.downloadPalette(paletteText);
        });
    }

    // Download da paleta como arquivo de texto
    downloadPalette(paletteText) {
        const blob = new Blob([paletteText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        // Nome do arquivo traduzido
        const filename = i18n.currentLang === 'pt'
            ? `paleta-cores-${new Date().getTime()}.txt`
            : `color-palette-${new Date().getTime()}.txt`;

        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        const downloadText = i18n.currentLang === 'pt'
            ? 'Paleta baixada como arquivo texto!'
            : 'Palette downloaded as text file!';

        NotificationManager.show(downloadText);
    }

    // Reseta a aplicação para o estado inicial de upload
    resetToUpload() {
        const previewSection = document.getElementById('previewSection');
        const uploadSection = document.querySelector('.upload-section');
        const paletteSection = document.getElementById('paletteSection');
        const fileInput = document.getElementById('fileInput');

        if (previewSection) previewSection.style.display = 'none';
        if (uploadSection) uploadSection.style.display = 'block';
        if (paletteSection) paletteSection.style.display = 'none';
        if (fileInput) fileInput.value = '';

        this.selectedColors.clear();
        NotificationManager.show(i18n.t('notification.ready'));
    }

    // Método para atualizar textos dinâmicos quando o idioma mudar
    updateDynamicTexts(colors = []) {
        const paletteInfo = document.getElementById('paletteInfo');
        if (!paletteInfo) return;

        if (colors.length > 0) {
            const methodSelect = document.getElementById('methodSelect');
            let methodName = '';

            if (methodSelect) {
                const selectedOption = methodSelect.options[methodSelect.selectedIndex];
                methodName = selectedOption.textContent;
            }

            // Textos traduzidos dinamicamente
            const colorsText = i18n.currentLang === 'pt'
                ? `${colors.length} cores extraídas`
                : `${colors.length} colors extracted`;

            const hintText = i18n.currentLang === 'pt'
                ? '💡 Clique em duas cores da paleta para testar contraste'
                : '💡 Click two colors from the palette to test contrast';

            paletteInfo.innerHTML = `
                <div class="info-card">
                    <h4>${i18n.t('palette.stats')}</h4>
                    <p><strong>${colorsText}</strong> | ${methodName}</p>
                    <p><strong>${hintText}</strong></p>
                </div>
            `;
        } else {
            paletteInfo.innerHTML = `
                <div class="info-card">
                    <h4>${i18n.t('palette.stats')}</h4>
                    <p>${i18n.t('palette.start')}</p>
                </div>
            `;
        }
    }
}