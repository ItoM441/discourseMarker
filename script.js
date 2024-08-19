const conjunctions = {
    "順接": ["だから", "なので", "そのため", "このため", "それで", "これで", "そこで", "したがって", "ゆえに", "それゆえ", "よって", "すると", "その結果"],
    "逆接": ["しかし", "だが", "けれども", "ところが", "にもかかわらず", "でも", "それでも"],
    "並列・列挙": ["また", "および", "そして", "さらに", "かつ"],
    "添加・累加": ["そして", "それから", "その上で", "さらに"],
    "対比": ["一方", "逆に", "反対に", "かえって", "そのかわり"],
    "選択": ["または", "もしくは", "あるいは", "それとも", "はたまた"],
    "説明・補足": ["なぜならば", "なぜなら", "というのは", "だって", "ただし", "ちなみに"],
    "言換・例示": ["つまり", "すなわち", "要するに", "例えば"],
    "転換": ["さて", "ところで", "そういえば"],
    "条件": ["それなら", "では", "なら", "もし"],
    "胸中": ["とにかく", "いずれにしても", "結局"],
    "他述": ["そのほか", "このほか"],
    "状況": ["この際", "その際", "こうした中"],
    "延及": ["ひいては"],
    "適当": ["むしろ", "それより"],
    "帰納": ["このように"],
    "企図": ["そのために"],
    "要点": ["そのためには"],
    "強調": ["だからこそ"],
    "情報": ["これによると"],
    "否定": ["いや"]
};

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            highlightConjunctions(content);
        };
        reader.readAsText(file);
    }
});

function highlightConjunctions(text) {
    Object.keys(conjunctions).forEach(type => {
        conjunctions[type].forEach(conjunction => {
            const regex = new RegExp(`(${conjunction})`, 'g');
            text = text.replace(regex, `<span class="highlight" data-type="${type}">${conjunction}</span>`);
        });
    });

    document.getElementById('text-content').innerHTML = text;
    addTooltipFunctionality();
}

function addTooltipFunctionality() {
    const highlights = document.querySelectorAll('.highlight');
    const tooltip = document.getElementById('tooltip');

    highlights.forEach(highlight => {
        highlight.addEventListener('mouseover', function(event) {
            const type = this.getAttribute('data-type');
            const sameTypeConjunctions = conjunctions[type].join(", ");
            tooltip.innerHTML = `種類: ${type}<br>同種: ${sameTypeConjunctions}`;
            tooltip.style.display = 'block';
            tooltip.style.left = event.pageX + 'px';
            tooltip.style.top = event.pageY + 20 + 'px';
        });

        highlight.addEventListener('mouseout', function() {
            tooltip.style.display = 'none';
        });
    });
}
