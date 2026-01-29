// Foodie Diet Plan App - JavaScript

class FoodieApp {
    constructor() {
        this.meals = this.loadMeals();
        this.init();
    }

    init() {
        // Set up event listeners
        document.getElementById('mealForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addMeal();
        });

        // Render initial meals
        this.renderMeals();
        this.updateSummary();
    }

    loadMeals() {
        const stored = localStorage.getItem('foodie-meals');
        return stored ? JSON.parse(stored) : [];
    }

    saveMeals() {
        localStorage.setItem('foodie-meals', JSON.stringify(this.meals));
    }

    addMeal() {
        const name = document.getElementById('mealName').value.trim();
        const food = document.getElementById('mealFood').value.trim();
        const calories = parseInt(document.getElementById('mealCalories').value);
        const protein = parseInt(document.getElementById('mealProtein').value);

        if (!name || !food || !calories || !protein) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const meal = {
            id: Date.now(),
            name,
            food,
            calories,
            protein,
            timestamp: new Date().toISOString()
        };

        this.meals.push(meal);
        this.saveMeals();
        this.renderMeals();
        this.updateSummary();

        // Reset form
        document.getElementById('mealForm').reset();
        document.getElementById('mealName').focus();
    }

    deleteMeal(id) {
        if (confirm('Deseja realmente excluir esta refeição?')) {
            this.meals = this.meals.filter(meal => meal.id !== id);
            this.saveMeals();
            this.renderMeals();
            this.updateSummary();
        }
    }

    renderMeals() {
        const mealsList = document.getElementById('mealsList');

        if (this.meals.length === 0) {
            mealsList.innerHTML = `
                <div class="empty-state">
                    <p>Nenhuma refeição adicionada ainda.</p>
                    <p>Comece adicionando sua primeira refeição!</p>
                </div>
            `;
            return;
        }

        mealsList.innerHTML = this.meals
            .sort((a, b) => b.id - a.id)
            .map(meal => `
                <div class="meal-item">
                    <div class="meal-header">
                        <div class="meal-name">${this.escapeHtml(meal.name)}</div>
                        <button class="btn-delete" onclick="app.deleteMeal(${meal.id})">
                            Excluir
                        </button>
                    </div>
                    <div class="meal-food">${this.escapeHtml(meal.food)}</div>
                    <div class="meal-stats">
                        <div class="meal-stat">
                            🔥 <strong>${meal.calories}</strong> cal
                        </div>
                        <div class="meal-stat">
                            💪 <strong>${meal.protein}g</strong> proteína
                        </div>
                    </div>
                </div>
            `)
            .join('');
    }

    updateSummary() {
        const totalCalories = this.meals.reduce((sum, meal) => sum + meal.calories, 0);
        const totalProtein = this.meals.reduce((sum, meal) => sum + meal.protein, 0);
        const totalMeals = this.meals.length;

        document.getElementById('totalCalories').textContent = totalCalories;
        document.getElementById('totalMeals').textContent = totalMeals;
        document.getElementById('totalProtein').textContent = totalProtein + 'g';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new FoodieApp();
});
