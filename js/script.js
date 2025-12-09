// ========== КОНФИГУРАЦИЯ ==========
const ACCESS_KEY = 'ВАШ_НОВЫЙ_КЛЮЧ_WEB3FORMS'; // ВСТАВЬТЕ НОВЫЙ КЛЮЧ
const FORM_URL = 'https://api.web3forms.com/submit';

// ========== ЭЛЕМЕНТЫ ФОРМЫ ==========
const form = document.getElementById('magicForm');
const submitBtn = document.querySelector('.spell-button');

// ========== ОТПРАВКА ФОРМЫ ==========
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Показываем загрузку
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
    submitBtn.disabled = true;
    
    const formData = {
        access_key: ACCESS_KEY,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        
        // ОТПРАВЛЯЕМ НА НЕСКОЛЬКО ПОЧТ
        to: 'основная-почта@mail.ru',
        cc: 'вторая-почта@gmail.com,третья-почта@yandex.ru',
        
        // Автоответ
        autoreply: true,
        autoreply_subject: '✅ Подтверждение получения',
        autoreply_message: `Уважаемый(ая) ${document.getElementById('name').value}, благодарим за обращение!`,
        
        subject: '✉️ Новое сообщение с сайта',
        from_name: 'Сайт Гарри Поттер'
    };
    
    try {
        const response = await fetch(FORM_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✅ Сообщение отправлено! Проверьте почту.');
            form.reset();
        } else {
            alert('❌ Ошибка: ' + result.message);
        }
        
    } catch (error) {
        alert('❌ Ошибка сети');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});