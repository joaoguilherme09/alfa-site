

        function formatarTelefone(input) {

            let telefone = input.value;

            telefone = telefone.replace(/\D/g, '');

            telefone = telefone.substring(0, 11);

            telefone = telefone.replace(
                /^(\d{2})(\d)/g,
                '($1) $2'
            );

            telefone = telefone.replace(
                /(\d{5})(\d)/,
                '$1-$2'
            );

            input.value = telefone;
        }

        function formatarCPF(input) {

            let cpf = input.value;

            cpf = cpf.replace(/\D/g, '');

            cpf = cpf.substring(0, 11);

            cpf = cpf.replace(
                /(\d{3})(\d)/,
                '$1.$2'
            );

            cpf = cpf.replace(
                /(\d{3})(\d)/,
                '$1.$2'
            );

            cpf = cpf.replace(
                /(\d{3})(\d{1,2})$/,
                '$1-$2'
            );

            input.value = cpf;
        }

        function formatarCEP(input) {

            let cep = input.value;

            cep = cep.replace(/\D/g, '');

            cep = cep.substring(0, 8);

            cep = cep.replace(
                /(\d{5})(\d)/,
                '$1-$2'
            );

            input.value = cep;
        }

        
        

        const horarios = {

            // Informática Básica
            1: [
                { id: 4, descricao: 'Segunda a Sábado - 09h às 11h' },
                { id: 5, descricao: 'Segunda a Sábado - 14h às 16h' },
                { id: 6, descricao: 'Segunda a Sábado - 16h às 18h' },
                { id: 7, descricao: 'Terça e Quinta - 18h às 20h' }
            ],

            // Informática Completa
            2: [
                { id: 8, descricao: 'Segunda a Sábado - 09h às 11h' },
                { id: 9, descricao: 'Segunda a Sábado - 14h às 16h' },
                { id: 10, descricao: 'Segunda a Sábado - 16h às 18h' },
                { id: 11, descricao: 'Terça e Quinta - 18h às 20h' }
            ],

            // Informática VIP
            3: [
                { id: 12, descricao: 'Segunda a Sábado - 09h às 11h' },
                { id: 13, descricao: 'Segunda a Sábado - 14h às 16h' },
                { id: 14, descricao: 'Segunda a Sábado - 16h às 18h' },
                { id: 15, descricao: 'Terça e Quinta - 18h às 20h' }
            ],

            // Inglês
            4: [
                { id: 1, descricao: 'Terça a Sexta - 09h às 11h' },
                { id: 2, descricao: 'Segunda a Quinta - 14h às 16h' },
                { id: 3, descricao: 'Terça e Quinta - 19h às 20h' }
            ],

            // Reforço Escolar
            5: [
                { id: 20, descricao: 'Segunda a Sexta - 09h às 11h' },
                { id: 21, descricao: 'Sábado - 09h às 12h' },
                { id: 22, descricao: 'Segunda a Sexta - 14h às 16h' },
                { id: 23, descricao: 'Terça e Quinta - 18h às 20h' }
            ],

            // Preparatório Embraer
            6: [
                { id: 17, descricao: 'Segunda, Quarta e Sexta - 16h às 18h' },
                { id: 18, descricao: 'Terça, Quinta e Sexta - 14h às 16h' },
                { id: 19, descricao: 'Terça, Quinta e Sexta - 16h às 18h' }
            ],

            // Preparatório ENEM
            7: [
                { id: 16, descricao: 'Segunda, Quarta e Sexta - 18h às 20h' }
            ],

            // Alfabetização
            8: [
                { id: 24, descricao: 'Segunda a Sexta - 09h às 11h' },
                { id: 25, descricao: 'Sábado - 09h às 12h' },
                { id: 26, descricao: 'Segunda a Sexta - 14h às 16h' },
                { id: 27, descricao: 'Terça e Quinta - 18h às 20h' }
            ]

        };
        function configurarCursos() {

            document
                .querySelectorAll('.curso-select')
                .forEach(cursoSelect => {

                    cursoSelect.onchange = function () {

                        const cursoId = this.value;

                        const bloco =
                            this.closest('.aluno-bloco');

                        const horarioSelect =
                            bloco.querySelector('.horario-select');

                        horarioSelect.innerHTML = `
                            <option value="">
                                Selecione um horário
                            </option>
                        `;

                        if (horarios[cursoId]) {

                            horarios[cursoId].forEach(horario => {

                                horarioSelect.innerHTML += `
                                    <option value="${horario.id}">
                                        ${horario.descricao}
                                    </option>
                                `;
                            });

                        }

                    };

                });

        }

        configurarCursos();


        document
            .getElementById('cep')
            .addEventListener('blur', buscarCEP);

        async function buscarCEP() {

            let cep = document.getElementById('cep').value;

            cep = cep.replace(/\D/g, '');

            if (cep.length !== 8) {
                return;
            }

            try {

                const response = await fetch(
                    `https://viacep.com.br/ws/${cep}/json/`
                );

                const dados = await response.json();

                if (dados.erro) {

                    alert('CEP não encontrado.');

                    document.getElementById('rua').value = '';

                    return;
                }

                document.getElementById('rua').value =
                    dados.logradouro;

            }

            catch (erro) {

                console.error(erro);

                alert('Erro ao consultar CEP.');

            }
        }


        function validarCPF() {

            const campoCPF =
                document.getElementById('cpf');

            const erroCPF =
                document.getElementById('cpfErro');

            let cpf = campoCPF.value;

            cpf = cpf.replace(/\D/g, '');

            campoCPF.style.border = '';
            erroCPF.style.display = 'none';

            if (cpf.length !== 11) {

                campoCPF.style.border =
                    '2px solid red';

                erroCPF.style.display =
                    'block';

                return false;
            }

            if (/^(\d)\1+$/.test(cpf)) {

                campoCPF.style.border =
                    '2px solid red';

                erroCPF.style.display =
                    'block';

                return false;
            }

            let soma = 0;

            for (let i = 0; i < 9; i++) {

                soma +=
                    parseInt(cpf.charAt(i))
                    * (10 - i);
            }

            let resto = 11 - (soma % 11);

            if (resto >= 10) {
                resto = 0;
            }

            if (
                resto !==
                parseInt(cpf.charAt(9))
            ) {

                campoCPF.style.border =
                    '2px solid red';

                erroCPF.style.display =
                    'block';

                return false;
            }

            soma = 0;

            for (let i = 0; i < 10; i++) {

                soma +=
                    parseInt(cpf.charAt(i))
                    * (11 - i);
            }

            resto = 11 - (soma % 11);

            if (resto >= 10) {
                resto = 0;
            }

            if (
                resto !==
                parseInt(cpf.charAt(10))
            ) {

                campoCPF.style.border =
                    '2px solid red';

                erroCPF.style.display =
                    'block';

                return false;
            }

            campoCPF.style.border =
                '2px solid green';

            erroCPF.style.display =
                'none';

            return true;
        }

        document
            .getElementById('cpf')
            .addEventListener(
                'blur',
                validarCPF
            );

   function formatarRG(input) {

        let rg = input.value;

        rg = rg.toUpperCase();

        rg = rg.replace(/[^0-9X]/g, '');

        rg = rg.substring(0, 9);

        if (rg.length > 2) {
            rg = rg.replace(
                /^(\d{2})(\d)/,
                '$1.$2'
            );
        }

        if (rg.length > 6) {
            rg = rg.replace(
                /^(\d{2})\.(\d{3})(\d)/,
                '$1.$2.$3'
            );
        }

        if (rg.length > 10) {
            rg = rg.replace(
                /^(\d{2})\.(\d{3})\.(\d{3})([0-9X])/,
                '$1.$2.$3-$4'
            );
        }

        input.value = rg;
    } 
    
    document
        .getElementById('rg')
        .addEventListener('blur', validarRG);

    function validarRG() {

        const campoRG =
            document.getElementById('rg');

        const erroRG =
            document.getElementById('rgErro');

        let rg = campoRG.value;

        rg = rg.replace(/[^0-9X]/g, '');

        if (rg.length < 8) {

            campoRG.style.border =
                '2px solid red';

            erroRG.style.display =
                'block';

            return false;
        }

        campoRG.style.border =
            '2px solid green';

        erroRG.style.display =
            'none';

        return true;
    }

    document
        .getElementById('email')
        .addEventListener('blur', validarEmail);

    function validarEmail() {

        const campoEmail =
            document.getElementById('email');

        const erroEmail =
            document.getElementById('emailErro');

        const email =
            campoEmail.value.trim();

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(email)) {

            campoEmail.style.border =
                '2px solid red';

            erroEmail.style.display =
                'block';

            return false;
        }

        campoEmail.style.border =
            '2px solid green';

        erroEmail.style.display =
            'none';

        return true;
    }

    document
        .getElementById('adicionarAluno')
        .addEventListener('click', adicionarAluno);

    function adicionarAluno() {

        const container =
            document.getElementById('alunos-container');

        const blocoOriginal =
            document.querySelector('.aluno-bloco');

        const novoBloco =
            blocoOriginal.cloneNode(true);

        const quantidade =
            document.querySelectorAll('.aluno-bloco').length + 1;

        novoBloco.querySelector('h2').innerText =
            `Dados do Aluno ${quantidade}`;

        novoBloco.querySelectorAll('input').forEach(input => {
            input.value = '';
        });

        novoBloco.querySelectorAll('select').forEach(select => {

            select.selectedIndex = 0;

            if (select.classList.contains('horario-select')) {

                select.innerHTML = `
                    <option value="">
                        Selecione um horário
                    </option>
                `;
            }

        });

        container.appendChild(novoBloco);

        configurarCursos();
    }