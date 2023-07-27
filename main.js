const localBtn = document.getElementById('local');
const workerBtn = document.getElementById('worker');
const worker = new Worker('webworker.js');


const defaultText = document.querySelector('.text').value;

worker.onmessage = (e) => {
    if (e?.data) {
        const {type, result} = e.data;
        if (type === 'result') {
            document.querySelector('.text').value = result;
            console.timeEnd('worker');
        }
    }
}

function onClickLocal() {
    document.querySelector('.text').value = defaultText;
    console.time('local');
    const text = document.querySelector('.text').value;
    const longText = [...Array(20)].map(() => text).join('');
    const textArray = [...longText];
    let result = '';
    while (textArray.length > 0) {
        const idx = Math.floor(Math.random() * textArray.length);
        result = result + textArray.splice(idx, 1)[0];
    }
    document.querySelector('.text').value = result;
    console.timeEnd('local');
}

function onClickWorker() {
    document.querySelector('.text').value = defaultText;
    console.time('worker');
    const text = document.querySelector('.text').value;
    const longText = [...Array(20)].map(() => text).join('');
    worker.postMessage({text: longText});
}
function animateElement() {
    const element = document.querySelector('.animation');
    let position = 0;
    let rotation = 0;

    function moveElement() {
        // Изменяем позицию элемента и поворот на каждом шаге анимации
        element.style.transform = `translate(${position}px, 0) rotate(${rotation}deg)`;

        // Увеличиваем значение position и rotation для следующего шага анимации
        position += 85;
        rotation += 90;

        // Если достигнута максимальная позиция, сбрасываем значения
        if (position >= window.innerWidth) {
            position = 0;
            rotation = 0;
        }
    }

    // Запускаем анимацию с интервалом 50 миллисекунд
    setInterval(moveElement, 50);
}

animateElement()

localBtn.addEventListener('click', onClickLocal);
workerBtn.addEventListener('click', onClickWorker);

