CREATE DATABASE alfa_site;
USE alfa_site;

-- tabela cursos
CREATE TABLE cursos (
	id INT auto_increment primary key,
    nome varchar(100) not null,
    descricao text,
    duracao varchar(50),
    valor decimal(10,2),
    categoria varchar (50),
    created_at timestamp default current_timestamp
    );
    
-- tabela alunos
CREATE TABLE alunos (
	id INT auto_increment primary key,
    nome varchar(150) not null,
    email varchar(150) unique not null,
    telefone varchar(50),
    data_nascimento date,    
    created_at timestamp default current_timestamp
    );
    
CREATE TABLE matriculas (
	id INT auto_increment primary key,
    aluno_id int not null,
    cursos_id int not null,
    status enum ('pendente', 'ativa', 'cancelada') default 'pendente',
    data_matricula timestamp default current_timestamp,
    
    foreign key (aluno_id)
		references alunos(id)
        on delete cascade,
        
	foreign key (cursos_id)
		references cursos(id)
        on delete cascade
    );
    
create table administradores (
	id INT auto_increment primary key,
	nome varchar(150) not null,
    email varchar(150) unique not null,
    senha varchar(255) not null,
    created_at timestamp default current_timestamp
    );
        
INSERT INTO cursos (nome, descricao, duracao, valor, categoria) VALUES
('Inglês Instrumental e Fluência', 'Do básico ao avançado com foco em conversação e escrita profissional.', '18 meses', 250.00, 'Idiomas'),
('Informática Essencial', 'Domínio do Windows, Word, digitação e navegação segura na internet.', '6 meses', 120.00, 'Informática'),
('Preparatório ENEM e Concursos', 'Revisão intensiva de matérias básicas, redação e simulados.', '4 meses', 350.00, 'Preparatório'),
('Excel Avançado para Negócios', 'Fórmulas complexas, tabelas dinâmicas, dashboards e macros.', '40 horas', 180.00, 'Informática');

INSERT INTO alunos (nome, email, telefone, data_nascimento) VALUES
('Mariana Costa', 'mari.costa@email.com', '(11) 91111-2222', '2004-08-15'),
('Rodrigo Souza', 'rodrigo.souza@email.com', '(21) 92222-3333', '1992-03-30'),
('Juliana Lima', 'ju.lima@email.com', '(31) 93333-4444', '1999-11-05'),
('Lucas Gabriel', 'lucas.gabriel@email.com', '(41) 94444-5555', '2006-05-20');

INSERT INTO matriculas (aluno_id, cursos_id, status) VALUES
(1, 1, 'ativa'),     
(2, 3, 'ativa'),     
(3, 2, 'ativa'),     
(4, 4, 'pendente');

INSERT INTO administradores (nome, email, senha) VALUES
('Admin Geral', 'admin@alfasite.com', 'senha_super_segura_123'),
('Suporte Alfa', 'suporte@alfasite.com', 'suporte_alfa_2026');






----------------------

-criar aba para administradores
-criar dashboard para administradores
-cursos preparatórios
-alfabetização
  -> enem
  ->embraer
-deixar a foto png
-mostrar a localização
-mostrar unidades
-no final da tela inicial, mostrar os cursos de forma simples
-adicionar redes sociais
-(sobre nós) criar uma tela sobre a escola (blog)
-fotos em destaque (como a da fisk)
-contato
-termo de privacidade (politica de privacidade)
-fotos de alunos na tela principal (escola pnr)
-mural de aprovados
-outro botao bem chamativo convidando pro whatsapp
-horarios disponiveis
-agende sua visita / aula experimental
