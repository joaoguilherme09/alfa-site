async function abrirModal(id) {

    const response = await fetch(`/admin/aluno/${id}`);

    const aluno = await response.json();

    document.getElementById('conteudoAluno').innerHTML = `

        <p><strong>Aluno:</strong> ${aluno.nome}</p>

        <p><strong>Idade:</strong> ${aluno.idade} anos</p>

        <hr>

        <p><strong>Responsável:</strong> ${aluno.responsavel ?? '-'}</p>

        <p><strong>CPF:</strong> ${aluno.cpf ?? '-'}</p>

        <p><strong>Email:</strong> ${aluno.email ?? '-'}</p>

        <p><strong>Telefone:</strong> ${aluno.telefone ?? '-'}</p>

        <p>
            <strong>Endereço:</strong>
            ${aluno.rua ?? ''},
            ${aluno.numero ?? ''}
            ${aluno.complemento ?? ''}
            - CEP: ${aluno.cep ?? ''}
        </p>

        <hr>

        <p><strong>Curso:</strong> ${aluno.curso}</p>

        <p><strong>Status:</strong> ${aluno.status}</p>

    `;

    document.getElementById('modalAluno').style.display = 'flex';
}

function fecharModal() {

    document.getElementById('modalAluno').style.display = 'none';
}