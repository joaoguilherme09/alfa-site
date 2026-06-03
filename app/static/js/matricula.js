

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

        if (rg.length !==9) {

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

        const quantidadeAtual =
            document.querySelectorAll('.aluno-bloco').length;

        if (quantidadeAtual >= 4) {

            document.getElementById(
                'limiteAlunosMsg'
            ).style.display = 'block';

            return;
        }

        const blocoOriginal =
            document.querySelector('.aluno-bloco');

        const novoBloco =
            blocoOriginal.cloneNode(true);

        const quantidade =
            quantidadeAtual + 1;

        novoBloco.dataset.aluno =
            quantidade;

        novoBloco.querySelector('h2').innerText =
            `Dados do Aluno ${quantidade}`;

        /* limpa inputs */

        novoBloco.querySelectorAll('input').forEach(input => {

            if (
                input.type === 'checkbox' ||
                input.type === 'radio'
            ) {

                input.checked = false;

            } else {

                input.value = '';
            }

        });

        /* limpa selects */

        novoBloco.querySelectorAll('select').forEach(select => {

            select.selectedIndex = 0;

        });

        /* renomeia os campos do aluno */

        novoBloco
            .querySelectorAll('select[name^="curso_"]')
            .forEach(select => {

                select.name =
                    `curso_${quantidade}[]`;

            });

        novoBloco
            .querySelectorAll('select[name^="periodo_"]')
            .forEach(select => {

                select.name =
                    `periodo_${quantidade}[]`;

            });

        /* remove cursos extras clonados */

        const cursosAluno =
            novoBloco.querySelector('.cursos-do-aluno');

        const cursosExtras =
            cursosAluno.querySelectorAll('.curso-item');

        cursosExtras.forEach((curso, index) => {

            if (index > 0) {
                curso.remove();
            }

        });

        container.appendChild(novoBloco);

        if (quantidade === 4) {

            document.getElementById(
                'adicionarAluno'
            ).style.display = 'none';
        }

        const campoData =
            novoBloco.querySelector('.dataNascimentoAluno');

        const hoje =
            new Date().toISOString().split('T')[0];

        campoData.max = hoje;

        campoData.addEventListener(
            'change',
            function () {
                validarDataNascimento(this);
            }
        );

    }

    function validarDatas() {

        const hoje = new Date();

        const dataResponsavel =
            document.getElementById(
                'dataNascimentoResponsavel'
            ).value;

        if (dataResponsavel) {

            const data =
                new Date(dataResponsavel);

            if (data > hoje) {

                alert(
                    'A data de nascimento do responsável não pode estar no futuro.'
                );

                return false;
            }
        }

        const alunos =
            document.querySelectorAll(
                '.dataNascimentoAluno'
            );

        for (let aluno of alunos) {

            if (aluno.value) {

                const data =
                    new Date(aluno.value);

                if (data > hoje) {

                    alert(
                        'A data de nascimento do aluno não pode estar no futuro.'
                    );

                    return false;
                }
            }
        }

        return true;
    }


    function validarTelefone() {

        const telefone =
            document.querySelector(
                'input[name="telefone"]'
            );

        let numero =
            telefone.value.replace(
                /\D/g,
                ''
            );

        if (numero.length !== 11) {

            telefone.style.border =
                '2px solid red';

            alert(
                'Telefone deve conter DDD + número (11 dígitos).'
            );

            return false;
        }

        telefone.style.border =
            '2px solid green';

        return true;
    }


    function validarNome(input) {

        input.value =
            input.value.replace(
                /[^a-zA-ZÀ-ÿ\s]/g,
                ''
            );
    }
        

    function somenteNumeros(input) {

        input.value =
            input.value.replace(
                /\D/g,
                ''
            );
    }


    function validarComplemento(input) {

        input.value =
            input.value.replace(
                /[^a-zA-ZÀ-ÿ0-9\s\-]/g,
                ''
            );
    }

    function validarDataNascimento(campo) {

        const dataSelecionada =
            new Date(campo.value);

        const hoje =
            new Date();

        hoje.setHours(0, 0, 0, 0);

        if (dataSelecionada > hoje) {

            campo.style.border =
                '2px solid red';

            alert(
                'A data de nascimento não pode ser no futuro.'
            );

            campo.value = '';

            return false;
        }

        campo.style.border =
            '2px solid green';

        return true;
    }

    const hoje =
        new Date().toISOString().split('T')[0];

    /* Responsável */

    document
        .getElementById('dataNascimentoResponsavel')
        .max = hoje;

    document
        .getElementById('dataNascimentoResponsavel')
        .addEventListener(
            'change',
            function () {
                validarDataNascimento(this);
            }
        );

    /* Alunos */

    document
        .querySelectorAll('.dataNascimentoAluno')
        .forEach(campo => {

            campo.max = hoje;

            campo.addEventListener(
                'change',
                function () {
                    validarDataNascimento(this);
                }
            );

        });

    document.addEventListener('click', function(e) {

        if (!e.target.classList.contains('btnAdicionarCurso')) {
            return;
        }

        const alunoBloco =
            e.target.closest('.aluno-bloco');

        const numeroAluno =
            alunoBloco.dataset.aluno;

        const cursosAluno =
            alunoBloco.querySelector('.cursos-do-aluno');

        const quantidadeCursos =
            cursosAluno.querySelectorAll('.curso-item').length + 1;

        if (quantidadeCursos > 4) {

            alert(
                'Cada aluno pode escolher no máximo 4 cursos.'
            );

            return;
        }

        cursosAluno.insertAdjacentHTML(
            'beforeend',
            `
            <div class="curso-item">

                <label>
                    Curso de Interesse
                </label>

                <select name="curso[]" required>

                    <option value="">
                        Selecione um curso
                    </option>

                    <option value="1">Informática Básica</option>
                    <option value="2">Informática Completa</option>
                    <option value="3">Informática VIP</option>
                    <option value="4">Inglês</option>
                    <option value="5">Reforço Escolar</option>
                    <option value="6">Preparatório Embraer</option>
                    <option value="7">Preparatório ENEM</option>
                    <option value="8">Alfabetização</option>

                </select>

                <label>
                    Turno
                </label>

                <select name="periodo[]" required>

                    <option value="">
                        Selecione um período
                    </option>

                    <option value="1">Manhã</option>
                    <option value="2">Tarde</option>
                    <option value="3">Noite</option>

                </select>

            </div>
            `
        );

    });