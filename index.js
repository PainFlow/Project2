class ImageSlider {
    constructor() {
        // Массив с изображениями (можно заменить на свои URL)
        this.images = [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWNTq0DaRwHySW2ZBzghBhf9sPHyvl5WpX0A&s', // Горы
            'https://www.forestprotection.com/images/orman-cesitleri.jpg', // Лес
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctoR_y8QOj2XAKktwQu7biy6ovcW_t01Arw&s', // Лес с солнцем
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcjtFBTOBsF-u6JxCdYcXh0T7OIKKaKOL02Q&s', // Озеро
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSwmEMxsb7zabJNkXdp-CKUWVYngJEY4Z4A&s', // Закат
            'https://cdn.ingos.ru/images/blog/samye-krasivye-vodopady-mira.jpg'  // Водопад
        ];
        
        this.currentIndex = 0;
        this.isTransitioning = false;
        
        // Получаем элементы DOM
        this.imageElement = document.getElementById('slider-image');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorElement = document.getElementById('imageIndicator');
        this.currentElement = document.getElementById('currentImage');
        this.totalElement = document.getElementById('totalImages');
        
        // Инициализация
        this.init();
    }
    
    init() {
        // Устанавливаем общее количество изображений
        this.totalElement.textContent = this.images.length;
        
        // Загружаем первое изображение
        this.loadImage(this.currentIndex);
        
        // Добавляем обработчики событий
        this.addEventListeners();
        
        // Добавляем поддержку клавиатуры
        this.addKeyboardSupport();
    }
    
    loadImage(index) {
        // Проверяем, не происходит ли уже анимация перехода
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Добавляем класс анимации загрузки
        this.imageElement.classList.add('loading');
        
        // Создаем новый объект Image для предзагрузки
        const img = new Image();
        img.src = this.images[index];
        
        img.onload = () => {
            // Когда изображение загружено, обновляем src
            this.imageElement.src = this.images[index];
            this.imageElement.classList.remove('loading');
            
            // Обновляем индикаторы
            this.updateIndicators();
            
            // Снимаем флаг перехода через небольшую задержку
            setTimeout(() => {
                this.isTransitioning = false;
            }, 300);
        };
        
        img.onerror = () => {
            // Если ошибка загрузки, показываем заглушку
            console.error('Ошибка загрузки изображения');
            this.imageElement.src = 'https://via.placeholder.com/600x400?text=Ошибка+загрузки';
            this.imageElement.classList.remove('loading');
            this.isTransitioning = false;
        };
    }
    
    nextImage() {
        if (this.isTransitioning) return;
        
        // Добавляем анимацию перехода
        this.imageElement.style.transform = 'scale(1.05)';
        this.imageElement.style.opacity = '0.7';
        
        setTimeout(() => {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.loadImage(this.currentIndex);
            
            // Возвращаем нормальный вид
            this.imageElement.style.transform = 'scale(1)';
            this.imageElement.style.opacity = '1';
        }, 200);
    }
    
    prevImage() {
        if (this.isTransitioning) return;
        
        // Добавляем анимацию перехода
        this.imageElement.style.transform = 'scale(0.95)';
        this.imageElement.style.opacity = '0.7';
        
        setTimeout(() => {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.loadImage(this.currentIndex);
            
            // Возвращаем нормальный вид
            this.imageElement.style.transform = 'scale(1)';
            this.imageElement.style.opacity = '1';
        }, 200);
    }
    
    updateIndicators() {
        // Обновляем текстовый индикатор
        this.indicatorElement.textContent = `Изображение ${this.currentIndex + 1} из ${this.images.length}`;
        this.currentElement.textContent = this.currentIndex + 1;
    }
    
    addEventListeners() {
        // Обработчики для кнопок
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        // Добавляем эффект наведения на кнопки
        [this.prevBtn, this.nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });
        });
        
        // Добавляем обработчик для предзагрузки следующего изображения
        this.imageElement.addEventListener('load', () => {
            // Предзагружаем следующее изображение
            const nextIndex = (this.currentIndex + 1) % this.images.length;
            const nextImg = new Image();
            nextImg.src = this.images[nextIndex];
            
            // Предзагружаем предыдущее изображение
            const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            const prevImg = new Image();
            prevImg.src = this.images[prevIndex];
        });
    }
    
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Игнорируем, если пользователь вводит текст в поле
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault(); // Предотвращаем прокрутку страницы
                    this.prevImage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextImage();
                    break;
            }
        });
    }
}

// Инициализация слайдера после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
});