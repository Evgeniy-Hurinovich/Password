"use strict";
window.addEventListener('DOMContentLoaded', function() {
    // ---------------------------create_modal-----------------------------
    const   modalTrigger = document.querySelector('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');
    modalTrigger.addEventListener('click', ()=>{
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow='hidden';
    });
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow='';
    }
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e)=>{
        if(e.target === modal){closeModal();
        }
    });
    document.addEventListener('keydown', (e)=>{
        if (e.code === "Escape") {
            closeModal();
        }
    });
    //--------------------------------------------------проверка работы сервера 
    fetch('http://localhost:3000/content')
    .then(data=>data.json())
    .then(res=>console.log(res));
    
    fetch('http://localhost:3000/requests')
    .then(data=>data.json())
    .then(res=>console.log(res));


// ______________________value_forms________________________________________________________________________________
    const   forms = document.querySelectorAll('#contacts-form');          
    const   messages = {
                            loading: 'Загрузка....',
                            success: 'Спасибо, Вы зарегистрированы!',            
                            failure: 'Вы накосячили !!!'}
    forms.forEach(item=>{bindpostData(item);}); //перебираем все формы  в документе 
    const postData = async (url, data)=>{
        const res= await fetch (url, {
            method: "POST",
            headers: {'Content-type': 'application/json'}, 
            body: data 
            });
        return await res.json();
    };
    function bindpostData (form) {
        form.addEventListener('submit', (e) =>{//слушает объект инпут с именем Форм и берет его сущность 
                e.preventDefault();//выкл перезагрузки страницы
                const statusMessage = document.createElement('div');//создает в документе ХТМЛ контейнер див 
                statusMessage.classList.add('status');//присваивает этому объекту состояние статус 
                statusMessage.textContent=messages.loading;//присваивает статусу значение поля лоадинг из объекта меседж  
                form.append(statusMessage);                 
                const formData = new FormData(form);
                const json= JSON.stringify(Object.fromEntries(formData.entries()));
                postData('http://localhost:3000/requests', json)
                    .then(data =>{
                    console.log(data);
                    statusMessage.textContent=messages.success;
                    resetModal();
                })//.then
                    .catch(()=>{
                        console.log(data);
                        statusMessage.textContent=messages.failure;
                        resetModal();
                    }).finally(()=>{
                        resetModal();
                    })     
                function resetModal(){form.reset(); setTimeout(()=>{statusMessage.remove();}, 2000);}//убирает сообщение 
            });
        }   
// ______________________________________-----_____________________________________
        
    const arr = [];
    
    const   inputLogin = document.querySelector('#login'), //переменные логина и пароля 
            checkInput = document.querySelector('#confirm'),
            inputPassword = document.querySelector('#password');//--
    
            fetch('http://localhost:3000/requests')
            .then(data=>data.json())            
            .then(res=>res.forEach((obj,i)=> {
                arr[i] = {name: obj.name, password: obj.password, id: obj.id};                
                    })
                );
    

        checkInput.addEventListener('click', () => {           
                arr.forEach((obj) => {
                if ((obj.name == inputLogin.value) && (obj.password == inputPassword.value) ) {
                    alert ('вы успешно авторищзировались');                    
                    } else {
                        alert ('вы не состоите на учте !!');
                    } 
                    bindpostData();                
                });             
        });
  
});

