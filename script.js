'use strict'

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(event) {
        event.preventDefault();

        let error = formValidate(form)

        let formData = new FormData(form);
        formData.append('image',formImage.files[0])

        if (error === 0) {
            form.classList.add('sending');
            let response = await fetch('sendmail.php', {
                method:'POST',
                 body:formData
            });
            if(response.ok){
                let result = await response.json();
                alert(result.message);
                formPreview.innerHTML = ' ';
                form.reset();
                form.classList.remove('sending');
            }else{
                alert('Error');
                form.classList.remove('sending');
            }
        }else{
            alert('Input your info')
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('.req');

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];

            formRemoveError(input);

            if (input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === ' ') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error
    }

    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    const formImage = document.getElementById('formImage');
    const formPreview = document.getElementById('formPreview');

    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });

    function uploadFile(file) {
        if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Required only images!');
            formImage.value = ' ';
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            alert('Max image size 2Mb!');
            return;
        }

        var reader = new FileReader();
        reader.onload = function (event) {
            formPreview.innerHTML = `<img src="${event.target.result}" alt="Photo"`;
        };
        reader.onerror = function (event) {
            alert('Error!');
        };
        reader.readAsDataURL(file);
    }
});