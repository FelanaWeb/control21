export class Diagram {

    constructor() {
        this.init();
    }

    async init() {
        // Находим наш элемент canvas и получаем его 2D-контекст для рисования
        const income = document.getElementById('income').getContext('2d');

        // Создаем новую диаграмму
        new Chart(income, {
            type: 'pie',
            data: {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue']
                }]
            },
            options: {
                responsive: true,         // Адаптация под размер контейнера
                maintainAspectRatio: true, // Сохранять пропорции
                plugins: {
                    legend: {
                        labels: {
                            font: { size: 12 },
                            color: '#000000'
                        },
                        title: {
                            display: true,      // Включить заголовок легенды
                            text: 'Доходы',
                            font: { size: 28, family: "Roboto Medium" },
                            color: '#290661'
                        }
                    }
                }
            },
            plugins: [{
                beforeInit(chart) {
                    // Сохраняем оригинальную функцию расчета размера легенды
                    const originalFit = chart.legend.fit;

                    // Подменяем её своей
                    chart.legend.fit = function fit() {
                        // Сначала вызываем оригинальную логику
                        originalFit.bind(chart.legend)();
                        // А затем просто добавляем нужное значение к её высоте
                        // Число 50 — это расстояние в пикселях между легендой и диаграммой
                        this.height += 40;
                    };
                }
            }]
        });

        // Находим наш элемент canvas и получаем его 2D-контекст для рисования
        const expenses = document.getElementById('expenses').getContext('2d');

        // Создаем новую диаграмму
        new Chart(expenses, {
            type: 'pie',
            data: {
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [{
                    data: [30, 25, 20, 15, 10],
                    backgroundColor: ['red', 'orange', 'yellow', 'green', 'blue']
                }]
            },
            options: {
                responsive: true,         // Адаптация под размер контейнера
                maintainAspectRatio: true, // Сохранять пропорции
                plugins: {
                    legend: {
                        labels: {
                            font: { size: 12 },
                            color: '#000000'
                        },
                        title: {
                            display: true,      // Включить заголовок легенды
                            text: 'Расходы',
                            font: { size: 28, family: "Roboto Medium" },
                            color: '#290661'
                        }
                    }
                }
            },
            plugins: [{
                beforeInit(chart) {
                    // Сохраняем оригинальную функцию расчета размера легенды
                    const originalFit = chart.legend.fit;

                    // Подменяем её своей
                    chart.legend.fit = function fit() {
                        // Сначала вызываем оригинальную логику
                        originalFit.bind(chart.legend)();
                        // А затем просто добавляем нужное значение к её высоте
                        // Число 50 — это расстояние в пикселях между легендой и диаграммой
                        this.height += 40;
                    };
                }
            }]
        });

    }
}


















