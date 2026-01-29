const dietPlan = [
    {
        day: 1,
        emoji: '🌅',
        meals: [
            {
                name: 'Pré-treino',
                emoji: '⚡',
                items: [
                    '1 banana',
                    'Café sem açúcar'
                ]
            },
            {
                name: 'Pós-treino / Café da manhã',
                emoji: '🍳',
                items: [
                    '2 ovos mexidos (ou cozidos)',
                    '1 fatia de pão integral'
                ]
            },
            {
                name: 'Almoço',
                emoji: '🍗',
                items: [
                    'Frango grelhado (ou pronto/desfiado)',
                    'Arroz',
                    'Feijão',
                    'Salada simples (alface + tomate)'
                ]
            },
            {
                name: 'Lanche da tarde',
                emoji: '🥛',
                items: [
                    'Iogurte natural',
                    'Aveia (1–2 colheres sopa)'
                ]
            },
            {
                name: 'Jantar',
                emoji: '🥪',
                items: [
                    'Sanduíche integral com atum/frango desfiado',
                    'Queijo branco',
                    'Folhas'
                ]
            }
        ]
    },
    {
        day: 2,
        emoji: '🌄',
        meals: [
            {
                name: 'Pré-treino',
                emoji: '⚡',
                items: [
                    '1 maçã'
                ]
            },
            {
                name: 'Pós-treino / Café da manhã',
                emoji: '🍌',
                items: [
                    'Iogurte natural',
                    'Banana',
                    'Aveia'
                ]
            },
            {
                name: 'Almoço',
                emoji: '🍽️',
                items: [
                    'Carne moída magra (marmita simples)',
                    'Arroz',
                    'Feijão',
                    'Legumes'
                ]
            },
            {
                name: 'Lanche da tarde',
                emoji: '🥜',
                items: [
                    'Pão integral',
                    'Pasta de amendoim (1 colher sopa)'
                ]
            },
            {
                name: 'Jantar',
                emoji: '🥞',
                items: [
                    'Omelete fria pronta ou',
                    'Wrap integral com frango ou ovo cozido'
                ]
            }
        ]
    },
    {
        day: 3,
        emoji: '🌆',
        meals: [
            {
                name: 'Pré-treino',
                emoji: '⚡',
                items: [
                    '1 banana pequena'
                ]
            },
            {
                name: 'Pós-treino / Café da manhã',
                emoji: '🥚',
                items: [
                    '2 ovos cozidos',
                    'Pão integral'
                ]
            },
            {
                name: 'Almoço',
                emoji: '🍲',
                items: [
                    'Frango ou peixe',
                    'Arroz integral',
                    'Lentilha ou feijão'
                ]
            },
            {
                name: 'Lanche da tarde',
                emoji: '🥜',
                items: [
                    'Fruta',
                    'Castanhas (pequena porção)'
                ]
            },
            {
                name: 'Jantar',
                emoji: '🥗',
                items: [
                    'Salada pronta de mercado',
                    'Atum em lata + azeite'
                ]
            }
        ]
    },
    {
        day: 4,
        emoji: '🌇',
        meals: [
            {
                name: 'Pré-treino',
                emoji: '⚡',
                items: [
                    'Café + banana'
                ]
            },
            {
                name: 'Pós-treino / Café da manhã',
                emoji: '🥤',
                items: [
                    'Vitamina: leite + banana + aveia'
                ]
            },
            {
                name: 'Almoço',
                emoji: '🍝',
                items: [
                    'Frango grelhado',
                    'Macarrão simples',
                    'Salada'
                ]
            },
            {
                name: 'Lanche da tarde',
                emoji: '🥣',
                items: [
                    'Iogurte',
                    'Granola simples'
                ]
            },
            {
                name: 'Jantar',
                emoji: '🥪',
                items: [
                    'Sanduíche integral de ovo cozido ou frango'
                ]
            }
        ]
    },
    {
        day: 5,
        emoji: '🌉',
        meals: [
            {
                name: 'Pré-treino',
                emoji: '⚡',
                items: [
                    'Maçã ou banana'
                ]
            },
            {
                name: 'Pós-treino / Café da manhã',
                emoji: '🥣',
                items: [
                    'Pão integral',
                    'Ovo',
                    'Queijo branco'
                ]
            },
            {
                name: 'Almoço',
                emoji: '🍚',
                items: [
                    'Arroz',
                    'Feijão',
                    'Carne ou frango',
                    'Salada'
                ]
            },
            {
                name: 'Lanche da tarde',
                emoji: '🥣',
                items: [
                    'Banana + aveia'
                ]
            },
            {
                name: 'Jantar',
                emoji: '🥛',
                items: [
                    'Iogurte proteico',
                    'Fruta',
                    '1 punhado de castanhas'
                ]
            }
        ]
    }
];

// Storage keys
const STORAGE_KEY = 'dietProgress';
let checkedItems = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderDays();
    setupEventListeners();
});

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    checkedItems = saved ? JSON.parse(saved) : {};
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    updateProgressBar();
}

// Render all days
function renderDays() {
    const container = document.getElementById('daysContainer');
    container.innerHTML = '';

    dietPlan.forEach(dayData => {
        const dayCard = createDayCard(dayData);
        container.appendChild(dayCard);
    });
}

// Create a day card
function createDayCard(dayData) {
    const card = document.createElement('div');
    card.className = 'day-card';

    const dayId = `day-${dayData.day}`;
    const isCollapsed = localStorage.getItem(`${dayId}-collapsed`) === 'true';

    const header = document.createElement('div');
    header.className = 'day-header';
    header.onclick = () => toggleDay(card, dayId);

    const dayProgress = calculateDayProgress(dayData.day);
    
    header.innerHTML = `
        <span class="day-title">${dayData.emoji} Dia ${dayData.day}</span>
        <span class="day-progress">${dayProgress.completed}/${dayProgress.total}</span>
    `;

    const content = document.createElement('div');
    content.className = `day-content ${isCollapsed ? 'collapsed' : ''}`;

    const mealsContainer = document.createElement('div');
    mealsContainer.className = 'meals';

    dayData.meals.forEach(meal => {
        const mealEl = createMealElement(dayData.day, meal);
        mealsContainer.appendChild(mealEl);
    });

    content.appendChild(mealsContainer);
    card.appendChild(header);
    card.appendChild(content);

    return card;
}

// Create a meal element
function createMealElement(dayNumber, meal) {
    const mealEl = document.createElement('div');
    mealEl.className = 'meal';

    const title = document.createElement('div');
    title.className = 'meal-title';
    title.innerHTML = `<span class="emoji">${meal.emoji}</span> <span>${meal.name}</span>`;

    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'meal-items';

    meal.items.forEach((item, index) => {
        const itemId = `day${dayNumber}-meal${meal.name.replace(/\s+/g, '')}-item${index}`;
        const isChecked = checkedItems[itemId] || false;

        const itemEl = document.createElement('div');
        itemEl.className = 'meal-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = itemId;
        checkbox.checked = isChecked;
        checkbox.onchange = () => {
            checkedItems[itemId] = checkbox.checked;
            saveProgress();
            updateDayProgress(dayNumber);
        };

        const label = document.createElement('label');
        label.htmlFor = itemId;
        label.textContent = item;

        itemEl.appendChild(checkbox);
        itemEl.appendChild(label);
        itemsContainer.appendChild(itemEl);
    });

    mealEl.appendChild(title);
    mealEl.appendChild(itemsContainer);

    return mealEl;
}

// Toggle day expansion
function toggleDay(dayCard, dayId) {
    const content = dayCard.querySelector('.day-content');
    content.classList.toggle('collapsed');
    
    const isCollapsed = content.classList.contains('collapsed');
    if (isCollapsed) {
        localStorage.setItem(`${dayId}-collapsed`, 'true');
    } else {
        localStorage.removeItem(`${dayId}-collapsed`);
    }
}

// Calculate progress for a day
function calculateDayProgress(dayNumber) {
    const day = dietPlan[dayNumber - 1];
    let total = 0;
    let completed = 0;

    day.meals.forEach(meal => {
        meal.items.forEach((item, index) => {
            const itemId = `day${dayNumber}-meal${meal.name.replace(/\s+/g, '')}-item${index}`;
            total++;
            if (checkedItems[itemId]) {
                completed++;
            }
        });
    });

    return { total, completed };
}

// Update progress bar for a day
function updateDayProgress(dayNumber) {
    const dayCard = document.querySelectorAll('.day-card')[dayNumber - 1];
    const progress = calculateDayProgress(dayNumber);
    const progressSpan = dayCard.querySelector('.day-progress');
    progressSpan.textContent = `${progress.completed}/${progress.total}`;
    
    updateProgressBar();
}

// Update overall progress bar
function updateProgressBar() {
    let totalItems = 0;
    let completedItems = 0;

    dietPlan.forEach(day => {
        day.meals.forEach(meal => {
            meal.items.forEach((item, index) => {
                const itemId = `day${day.day}-meal${meal.name.replace(/\s+/g, '')}-item${index}`;
                totalItems++;
                if (checkedItems[itemId]) {
                    completedItems++;
                }
            });
        });
    });

    const percentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
    document.getElementById('progressFill').style.width = percentage + '%';
    document.getElementById('progressText').textContent = `${completedItems}/${totalItems}`;
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('resetBtn').addEventListener('click', () => {
        if (confirm('Tem certeza que deseja limpar todo o progresso?')) {
            checkedItems = {};
            localStorage.removeItem(STORAGE_KEY);
            
            // Uncheck all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            updateProgressBar();
        }
    });
}
