// Funções utilitárias gerais - Conversões, cálculos e helpers

class ColorUtils {
    // Converte valores RGB (0-255) para código hexadecimal (#RRGGBB)
    static rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    // Converte código hexadecimal (#RRGGBB) para valores RGB
    static hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Converte RGB para HSL (Matiz, Saturação, Luminosidade)
    static rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // Cor acromática (tons de cinza)
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),     // Matiz: 0-360 graus
            s: Math.round(s * 100),     // Saturação: 0-100%
            l: Math.round(l * 100)      // Luminosidade: 0-100%
        };
    }

    // Calcula o contraste entre duas cores seguindo padrão WCAG
    static getContrastRatio(color1, color2) {
        const luminance1 = this.getLuminance(color1);
        const luminance2 = this.getLuminance(color2);

        const brightest = Math.max(luminance1, luminance2);
        const darkest = Math.min(luminance1, luminance2);

        return (brightest + 0.05) / (darkest + 0.05);
    }

    // Calcula luminância relativa para contraste WCAG
    static getLuminance(color) {
        const rgb = typeof color === 'string' ? this.hexToRgb(color) : color;
        const [r, g, b] = [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(c =>
            c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
        );
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    // Verifica se o contraste atende aos padrões de acessibilidade WCAG
    static checkWcagCompliance(contrastRatio) {
        if (contrastRatio >= 7) return { level: 'AAA', passed: true };    // Excelente contraste
        if (contrastRatio >= 4.5) return { level: 'AA', passed: true };   // Bom contraste
        return { level: 'Falha', passed: false };                         // Contraste insuficiente
    }

    // Gera nome descritivo para cores baseado em valores RGB
    static generateColorName(r, g, b) {
        const hsl = this.rgbToHsl(r, g, b);
        const { h, s, l } = hsl;

        // ========== CORES ACROMÁTICAS (tons de cinza) ==========
        if (s < 10) {
            if (l > 90) return "Branco";
            if (l < 10) return "Preto";
            if (l < 30) return "Cinza Escuro";
            if (l < 60) return "Cinza";
            return "Cinza Claro";
        }

        // ========== CORES CROMÁTICAS ==========
        // Mapeamento de faixas de matiz para nomes de cores
        const hues = [
            [0, 15, "Vermelho"],    // 0-15°: Vermelho
            [15, 45, "Laranja"],    // 15-45°: Laranja
            [45, 65, "Amarelo"],    // 45-65°: Amarelo
            [65, 150, "Verde"],     // 65-150°: Verde
            [150, 195, "Turquesa"], // 150-195°: Turquesa
            [195, 255, "Azul"],     // 195-255°: Azul
            [255, 330, "Roxo"],     // 255-330°: Roxo
            [330, 360, "Rosa"]      // 330-360°: Rosa
        ];

        const hueName = hues.find(([start, end, name]) => h >= start && h < end)?.[2] || "Cor";

        // Adjetivos baseados na luminosidade e saturação
        if (l < 25) return `${hueName} Escuro`;     // Cores escuras
        if (l > 75) return `${hueName} Claro`;      // Cores claras
        if (s < 40) return `${hueName} Suave`;      // Cores pouco saturadas
        if (s > 80) return `${hueName} Vibrante`;   // Cores muito saturadas
        return hueName;                             // Cor base sem adjetivo
    }
}

class FileUtils {
    // Valida se o arquivo é uma imagem suportada
    static isValidImage(file) {
        if (!file) return false;
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        return validTypes.includes(file.type);
    }

    // Lê arquivo como Data URL (base64) para preview
    static readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

class NotificationManager {
    // Exibe notificações temporárias na interface
    static show(message, type = 'success') {
        const notification = document.getElementById('notification');
        if (!notification) {
            console.log('Notification:', message); // Fallback para console
            return;
        }

        notification.textContent = message;
        notification.className = `notification ${type} show`;

        // Remove a notificação após 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}