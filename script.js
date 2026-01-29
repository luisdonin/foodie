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
const CUSTOM_ITEMS_KEY = 'dietCustomItems';
const PROFILE_KEY = 'userProfile';
let checkedItems = {};
let customItems = {};
let currentEditingItemId = null;
let userProfile = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    loadProfile();
    renderDays();
    setupEventListeners();
    setupTabNavigation();
    setupProfileListeners();
});

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    checkedItems = saved ? JSON.parse(saved) : {};
    
    const savedCustom = localStorage.getItem(CUSTOM_ITEMS_KEY);
    customItems = savedCustom ? JSON.parse(savedCustom) : {};
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    localStorage.setItem(CUSTOM_ITEMS_KEY, JSON.stringify(customItems));
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
        
        // Get custom text if exists
        const displayText = customItems[itemId] || item;

        const itemEl = document.createElement('div');
        itemEl.className = 'meal-item';

        const wrapper = document.createElement('div');
        wrapper.className = 'meal-item-wrapper';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'meal-item-content';

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
        label.textContent = displayText;

        contentDiv.appendChild(checkbox);
        contentDiv.appendChild(label);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'meal-item-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'btn-icon edit';
        editBtn.textContent = '✏️';
        editBtn.onclick = (e) => {
            e.preventDefault();
            openEditModal(itemId, displayText);
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-icon delete';
        deleteBtn.textContent = '🗑️';
        deleteBtn.onclick = (e) => {
            e.preventDefault();
            deleteCustomItem(itemId, itemEl, dayNumber);
        };

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        wrapper.appendChild(contentDiv);
        wrapper.appendChild(actionsDiv);
        itemEl.appendChild(wrapper);
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

    // Modal listeners
    const modal = document.getElementById('editModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const editInput = document.getElementById('editInput');

    const closeEditModal = () => {
        modal.classList.remove('active');
        currentEditingItemId = null;
        editInput.value = '';
    };

    closeModal.onclick = closeEditModal;
    cancelBtn.onclick = closeEditModal;

    saveBtn.onclick = () => {
        const newText = editInput.value.trim();
        if (newText && currentEditingItemId) {
            customItems[currentEditingItemId] = newText;
            saveProgress();
            
            // Find the day number from itemId
            const dayMatch = currentEditingItemId.match(/day(\d+)/);
            if (dayMatch) {
                updateDayProgress(parseInt(dayMatch[1]));
                
                // Update label text
                const label = document.querySelector(`label[for="${currentEditingItemId}"]`);
                if (label) {
                    label.textContent = newText;
                }
            }
            
            closeEditModal();
        }
    };

    deleteBtn.onclick = () => {
        if (currentEditingItemId) {
            delete customItems[currentEditingItemId];
            saveProgress();
            
            const dayMatch = currentEditingItemId.match(/day(\d+)/);
            if (dayMatch) {
                // Reset to original item text
                const label = document.querySelector(`label[for="${currentEditingItemId}"]`);
                if (label) {
                    // Find original item text from dietPlan
                    const dayNum = parseInt(dayMatch[1]);
                    const originalItem = findOriginalItemText(currentEditingItemId);
                    if (originalItem) {
                        label.textContent = originalItem;
                    }
                }
                updateDayProgress(parseInt(dayMatch[1]));
            }
            
            closeEditModal();
        }
    };

    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveBtn.click();
        }
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEditModal();
        }
    });
}

// Open edit modal
function openEditModal(itemId, currentText) {
    const modal = document.getElementById('editModal');
    const editInput = document.getElementById('editInput');
    
    currentEditingItemId = itemId;
    editInput.value = currentText;
    modal.classList.add('active');
    editInput.focus();
    editInput.select();
}

// Find original item text from dietPlan
function findOriginalItemText(itemId) {
    const dayMatch = itemId.match(/day(\d+)/);
    if (!dayMatch) return null;
    
    const dayNum = parseInt(dayMatch[1]);
    const day = dietPlan[dayNum - 1];
    
    if (!day) return null;
    
    for (const meal of day.meals) {
        for (let i = 0; i < meal.items.length; i++) {
            const testId = `day${dayNum}-meal${meal.name.replace(/\s+/g, '')}-item${i}`;
            if (testId === itemId) {
                return meal.items[i];
            }
        }
    }
    
    return null;
}

// Delete custom item
function deleteCustomItem(itemId, itemElement, dayNumber) {
    delete customItems[itemId];
    saveProgress();
    updateDayProgress(dayNumber);
    
    // Reset label text to original
    const label = document.querySelector(`label[for="${itemId}"]`);
    const originalText = findOriginalItemText(itemId);
    if (label && originalText) {
        label.textContent = originalText;
    }
}

// Carregar perfil
function loadProfile() {
    const saved = localStorage.getItem(PROFILE_KEY);
    userProfile = saved ? JSON.parse(saved) : {
        name: '',
        weight: '',
        height: '',
        photo: ''
    };
    
    // Carregar dados nos inputs
    document.getElementById('profileName').value = userProfile.name || '';
    document.getElementById('profileWeight').value = userProfile.weight || '';
    document.getElementById('profileHeight').value = userProfile.height || '';
    
    if (userProfile.photo) {
        document.getElementById('profileImage').src = userProfile.photo;
    }
    
    updateIMC();
}

// Salvar perfil
function saveProfile() {
    userProfile = {
        name: document.getElementById('profileName').value,
        weight: document.getElementById('profileWeight').value,
        height: document.getElementById('profileHeight').value,
        photo: document.getElementById('profileImage').src
    };
    
    localStorage.setItem(PROFILE_KEY, JSON.stringify(userProfile));
    updateIMC();
    alert('✅ Perfil salvo com sucesso!');
}

// Calcular e atualizar IMC
function updateIMC() {
    const weight = parseFloat(document.getElementById('profileWeight').value);
    const height = parseFloat(document.getElementById('profileHeight').value) / 100; // converter para metros
    
    if (weight > 0 && height > 0) {
        const imc = (weight / (height * height)).toFixed(1);
        document.getElementById('imcValue').textContent = imc;
        
        let category = '';
        if (imc < 18.5) {
            category = 'Abaixo do peso';
        } else if (imc < 25) {
            category = 'Peso normal';
        } else if (imc < 30) {
            category = 'Sobrepeso';
        } else {
            category = 'Obesidade';
        }
        
        document.getElementById('imcCategory').textContent = category;
    } else {
        document.getElementById('imcValue').textContent = '--';
        document.getElementById('imcCategory').textContent = '';
    }
}

// Setup abas de navegação
function setupTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona active ao clicado
            button.classList.add('active');
            document.getElementById(tabName + 'Tab').classList.add('active');
        });
    });
}

// Setup event listeners do perfil
function setupProfileListeners() {
    document.getElementById('photoInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('profileImage').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    document.getElementById('profileWeight').addEventListener('input', updateIMC);
    document.getElementById('profileHeight').addEventListener('input', updateIMC);
    
    document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
    
    document.getElementById('clearProfileBtn').addEventListener('click', () => {
        if (confirm('Deseja limpar todos os dados do perfil?')) {
            document.getElementById('profileName').value = '';
            document.getElementById('profileWeight').value = '';
            document.getElementById('profileHeight').value = '';
            document.getElementById('profileImage').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='100' cy='100' r='100' fill='%23e9ecef'/%3E%3Ccircle cx='100' cy='70' r='35' fill='%23999'/%3E%3Cellipse cx='100' cy='160' rx='50' ry='40' fill='%23999'/%3E%3C/svg%3E";
            localStorage.removeItem(PROFILE_KEY);
            userProfile = {};
            updateIMC();
            alert('✅ Dados do perfil limpos!');
        }
    });
}
