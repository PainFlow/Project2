class ImageSlider {
    constructor() {
        this.images = [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWNTq0DaRwHySW2ZBzghBhf9sPHyvl5WpX0A&s', 
            'https://www.forestprotection.com/images/orman-cesitleri.jpg', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRctoR_y8QOj2XAKktwQu7biy6ovcW_t01Arw&s', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcjtFBTOBsF-u6JxCdYcXh0T7OIKKaKOL02Q&s', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSwmEMxsb7zabJNkXdp-CKUWVYngJEY4Z4A&s', 
            'https://cdn.ingos.ru/images/blog/samye-krasivye-vodopady-mira.jpg'  
        ];
        
        this.currentIndex = 0;
        this.isTransitioning = false;
        
        this.imageElement = document.getElementById('slider-image');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicatorElement = document.getElementById('imageIndicator');
        this.currentElement = document.getElementById('currentImage');
        this.totalElement = document.getElementById('totalImages');
        
        
        this.init();
    }
    
    init() {
        this.totalElement.textContent = this.images.length;
        
      
        this.loadImage(this.currentIndex);
        
        this.addEventListeners();
    
        this.addKeyboardSupport();
    }
    
    loadImage(index) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        this.imageElement.classList.add('loading');
        
        const img = new Image();
        img.src = this.images[index];
        
        img.onload = () => {
            this.imageElement.src = this.images[index];
            this.imageElement.classList.remove('loading');
            
            this.updateIndicators();
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 300);
        };
        
        img.onerror = () => {
            console.error('Ошибка загрузки изображения');
            this.imageElement.src = 'https://w7.pngwing.com/pngs/82/638/png-transparent-minimalist-download-failed-error-triangle-warning-sign-thumbnail.png';
            this.imageElement.classList.remove('loading');
            this.isTransitioning = false;
        };
    }
    
    nextImage() {
        if (this.isTransitioning) return;
        
        this.imageElement.style.transform = 'scale(1.05)';
        this.imageElement.style.opacity = '0.7';
        
        setTimeout(() => {
            this.currentIndex = (this.currentIndex + 1) % this.images.length;
            this.loadImage(this.currentIndex);
            
            this.imageElement.style.transform = 'scale(1)';
            this.imageElement.style.opacity = '1';
        }, 200);
    }
    
    prevImage() {
        if (this.isTransitioning) return;
        
        this.imageElement.style.transform = 'scale(0.95)';
        this.imageElement.style.opacity = '0.7';
        
        setTimeout(() => {
            this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            this.loadImage(this.currentIndex);
            
            this.imageElement.style.transform = 'scale(1)';
            this.imageElement.style.opacity = '1';
        }, 200);
    }
    
    updateIndicators() {
        this.indicatorElement.textContent = `Изображение ${this.currentIndex + 1} из ${this.images.length}`;
        this.currentElement.textContent = this.currentIndex + 1;
    }
    
    addEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevImage());
        this.nextBtn.addEventListener('click', () => this.nextImage());
        
        [this.prevBtn, this.nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
            });
        });
        
        this.imageElement.addEventListener('load', () => {
            const nextIndex = (this.currentIndex + 1) % this.images.length;
            const nextImg = new Image();
            nextImg.src = this.images[nextIndex];
            
            const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
            const prevImg = new Image();
            prevImg.src = this.images[prevIndex];
        });
    }
    
    addKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault(); 
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

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider();
});