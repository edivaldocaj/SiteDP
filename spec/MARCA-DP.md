# MARCA-DP.md — identidade visual na web

A identidade do Instagram é preto dominante com dourado de acento. **Na web a
proporção se inverte:** papel domina, preto é o texto, dourado é acento.

Não é liberdade criativa — é medição. Os números abaixo foram calculados sobre
os arquivos reais em `public/marca/`.

---

## 1. Contraste medido

| Combinação | Razão | Uso permitido |
|---|---|---|
| `#0a0a0a` sobre `#faf8f3` | **18,6:1** | texto corrido, qualquer tamanho |
| `#f5f1e8` sobre `#0a0a0a` | 17,4:1 | texto sobre faixa escura |
| `#c9a961` sobre `#0a0a0a` | **8,8:1** | texto e ícone sobre escuro |
| `#8a7339` sobre `#faf8f3` | **4,3:1** | só título ≥ 24px. **Nunca parágrafo.** |
| `#c9a961` sobre `#faf8f3` | **2,1:1** | ❌ nunca como texto |
| dourado do logo sobre `#faf8f3` | **1,5:1** | ❌ decorativo apenas |

**A regra que resume tudo:** dourado sobre claro é ornamento — filete, borda,
selo, marca d'água. Nunca carrega informação sozinho.

## 2. Tokens

```css
--preto:       #0a0a0a;   /* texto */
--preto-suave: #161616;   /* faixas escuras */
--papel:       #faf8f3;   /* fundo padrão do site */
--creme:       #f5f1e8;   /* texto sobre escuro */
--ouro:        #c9a961;   /* acento sobre escuro */
--ouro-escuro: #8a7339;   /* acento sobre claro, só ≥24px */
--ouro-claro:  #e8c976;   /* realce sobre escuro */
```

Nunca branco puro `#ffffff`. Nunca mais de três cores por bloco.

## 3. Tipografia

```
Display  Cormorant Garamond   títulos ≥ 28px, peso ≥ 400
Corpo    Montserrat           peso ≥ 400, mínimo 18px
```

O manual do Instagram usa Cormorant 300 e entreletras de 12–14px. **Nada disso
vai para o site.** Peso 300 numa tela lida por pessoa de 70 anos é ilegível;
entreletras larga só serve para etiqueta curta em caixa alta.

| Elemento | Fonte | Tamanho | Peso |
|---|---|---|---|
| H1 | Cormorant Garamond | 40–56px | 500 |
| H2 | Cormorant Garamond | 30–36px | 500 |
| H3 | Montserrat | 22px | 600 |
| Corpo | Montserrat | **18px**, altura 1,7 | 400 |
| Etiqueta | Montserrat | 14px, caixa alta, entreletras 2px | 600 |
| Botão | Montserrat | 18px | 600 |

Itálico do Cormorant só em destaque de uma linha. Não em bloco.

## 4. Arquivos da marca

Os originais vieram em 1563×1563 com o conteúdo ocupando de 5% a 6% da tela —
o resto era vazio. Já foram recortados e normalizados. **Use os de
`public/marca/`, não os originais.**

| Arquivo | Conteúdo | Onde |
|---|---|---|
| `dp-horizontal.png` | símbolo + nome, nome em preto | cabeçalho, sobre fundo claro |
| `dp-vertical.png` | símbolo sobre nome, nome em preto | páginas de abertura |
| `dp-horizontal-claro.png` | nome em creme | rodapé e faixas escuras |
| `dp-vertical-claro.png` | nome em creme | faixas escuras |
| `dp-simbolo.png` | só o D no anel dourado | selo, marca d'água, avatar |
| `icone-32/180/512.png` | favicon, touch icon, PWA | `<head>` e manifest |

### A regra que mais será violada

**O símbolo dourado sozinho não pode aparecer sobre fundo claro.** Dá 1,5:1 —
some para quem tem baixa visão. Sobre fundo claro, use sempre uma das versões
com o nome, porque é o nome em preto que carrega a leitura.

Sobre fundo escuro o símbolo sozinho fica excelente: 12,5:1.

Nunca reconstruir o logo em CSS, texto ou SVG desenhado à mão. Nunca aplicar
sombra, contorno, rotação ou mudança de cor.

## 5. Composição

Do manual, o que se traduz bem para web: espaços generosos, filete dourado
fino como divisor, selo com borda dupla em depoimento e resultado.

O que **não** se traduz: grão, vinheta radial, brilho dourado atrás do logo.
São efeitos de peça estática — na web pesam, borram em tela de baixa densidade
e atrapalham a leitura.

## 6. Acessibilidade como piso

- Corpo 18px, altura de linha 1,7
- Alvo de toque 48×48px, espaçamento mínimo de 8px entre alvos
- Foco visível em tudo que recebe teclado, com contorno de 3px
- Contraste AA em todo texto; AAA no corpo sempre que der
- A página funciona com zoom de 200% sem rolagem horizontal
- Nenhuma informação transmitida só por cor
- Nenhum carrossel, modal ou rolagem infinita

Este público é idoso, rural, com baixa visão e telefone antigo em rede lenta.
Decisão de design que assume o contrário está errada.
