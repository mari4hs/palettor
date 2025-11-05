// Classe principal para extração e análise de cores de imagens
class ColorExtractor {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error('Canvas element not found');
        }
        this.ctx = this.canvas.getContext('2d');

        // Define os métodos de extração disponíveis
        this.methods = {
            predominant: this.extractPredominantColors.bind(this),    // Cores mais frequentes
            vibrant: this.extractVibrantColors.bind(this),           // Cores mais saturadas
            balanced: this.extractBalancedColors.bind(this)          // Variedade de tons
        };
    }

    // Prepara o canvas com a imagem para análise
    setupImage(image) {
        this.canvas.width = image.width;
        this.canvas.height = image.height;
        this.ctx.drawImage(image, 0, 0, image.width, this.canvas.height);
    }

    // Captura os dados de pixels da imagem (RGBA)
    getImageData() {
        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    // Método principal: escolhe o algoritmo e extrai cores
    extractColors(image, method = 'predominant', colorCount = 6) {
        this.setupImage(image);
        const extractor = this.methods[method] || this.methods.predominant;
        return extractor(colorCount);
    }

    // Algoritmo 1: Encontra as cores que mais aparecem na imagem
    extractPredominantColors(colorCount) {
        const imageData = this.getImageData();
        const pixels = imageData.data;
        const colorMap = new Map(); // Mapa para contar frequência das cores

        // Amostragem: analisa 1 a cada 10 pixels para melhor performance
        const sampleRate = 10;

        for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            // Agrupa cores similares reduzindo precisão (quantização)
            const quantized = this.quantizeColor(r, g, b, 20);
            const key = `${quantized.r},${quantized.g},${quantized.b}`;

            // Conta quantas vezes cada cor aparece
            colorMap.set(key, (colorMap.get(key) || 0) + 1);
        }

        return this.sortAndLimitColors(colorMap, colorCount);
    }

    // Algoritmo 2: Foca em cores vivas e saturadas
    extractVibrantColors(colorCount) {
        const imageData = this.getImageData();
        const pixels = imageData.data;
        const vibrantColors = [];

        // Amostragem mais densa para capturar cores raras
        for (let i = 0; i < pixels.length; i += 4 * 5) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const hsl = ColorUtils.rgbToHsl(r, g, b);

            // Filtra cores com boa saturação e luminosidade balanceada
            // Evita pretos puros, brancos puros e cores muito escuras
            if (hsl.s > 40 && hsl.l > 20 && hsl.l < 80) {
                vibrantColors.push({
                    r, g, b,
                    saturation: hsl.s,
                    luminance: ColorUtils.getLuminance({ r, g, b })
                });
            }
        }

        // Ordena da mais saturada para a menos saturada
        vibrantColors.sort((a, b) => b.saturation - a.saturation);

        // Retorna apenas as N cores mais vibrantes
        return vibrantColors.slice(0, colorCount).map(color => ({
            r: color.r, g: color.g, b: color.b
        }));
    }

    // Algoritmo 3: Busca variedade de cores (um pouco de cada tom)
    extractBalancedColors(colorCount) {
        const imageData = this.getImageData();
        const pixels = imageData.data;

        // Divide o círculo cromático em 12 setores de 30 graus cada
        const hueBuckets = new Array(12).fill().map(() => []);

        for (let i = 0; i < pixels.length; i += 4 * 5) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const hsl = ColorUtils.rgbToHsl(r, g, b);

            // Classifica a cor em um dos 12 setores de matiz
            const hueIndex = Math.floor(hsl.h / 30);
            hueBuckets[hueIndex].push({ r, g, b, saturation: hsl.s });
        }

        // Para cada setor de cor, pega a versão mais saturada
        const bestColors = hueBuckets
            .filter(bucket => bucket.length > 0) // Ignora setores vazios
            .map(bucket => bucket.sort((a, b) => b.saturation - a.saturation)[0])
            .slice(0, colorCount); // Limita ao número desejado

        return bestColors;
    }

    // Reduz a precisão das cores para agrupar tons similares
    // Exemplo: factor=20 agrupa cores como 255,0,0 e 245,10,5
    quantizeColor(r, g, b, factor) {
        return {
            r: Math.round(r / factor) * factor,
            g: Math.round(g / factor) * factor,
            b: Math.round(b / factor) * factor
        };
    }

    // Ordena cores por frequência e limita a quantidade
    sortAndLimitColors(colorMap, limit) {
        return Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1]) // Ordena do mais frequente para o menos
            .slice(0, limit) // Pega apenas as N mais frequentes
            .map(([key]) => {
                const [r, g, b] = key.split(',').map(Number);
                return { r, g, b };
            });
    }

    // Cria string CSS para gradiente linear com as cores extraídas
    generateGradient(colors, direction = '90deg') {
        const colorStops = colors.map((color, index) => {
            const hex = ColorUtils.rgbToHex(color.r, color.g, color.b);
            // Distribui as cores uniformemente no gradiente
            const percentage = Math.round((index / (colors.length - 1)) * 100);
            return `${hex} ${percentage}%`;
        }).join(', ');

        return `linear-gradient(${direction}, ${colorStops})`;
    }
}