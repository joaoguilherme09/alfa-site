async function abrirModal(id) {

    const response = await fetch(`/admin/aluno/${id}`);

    const aluno = await response.json();

    document.getElementById('conteudoAluno').innerHTML = `

        <p><strong>Nome:</strong> ${aluno.nome}</p>

        <p><strong>Email:</strong> ${aluno.email}</p>

        <p><strong>Telefone:</strong> ${aluno.telefone}</p>

        <p><strong>Idade:</strong> ${aluno.idade} anos</p>

        <p><strong>Curso:</strong> ${aluno.curso}</p>

        <p><strong>Status:</strong> ${aluno.status}</p>

        <p><strong>Data Matrícula:</strong> ${aluno.data_matricula}</p>

    `;

    document.getElementById('modalAluno').style.display = 'flex';
}

function fecharModal() {

    document.getElementById('modalAluno').style.display = 'none';
}