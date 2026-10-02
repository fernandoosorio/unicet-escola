const Estudante = require('../models/Estudante');

// Lista temporária em memória simulando o armazenamento
let estudantes = [
  new Estudante(1, "Maria Silva", "2005-03-15", "86999991111"),
  new Estudante(2, "João Santos", "2004-07-22", "86988882222")
];

// Contador para simular incremento de ID
let proximoId = 3;

class EstudanteController {
  
  // 1. GET /estudantes - Listar todos
  static listarTodos(req, res) {
    return res.status(200).json(estudantes);
  }

  // 2. GET /estudantes/:id - Buscar por ID
  static listarPorId(req, res) {
    const id = parseInt(req.params.id);
    const estudante = estudantes.find(e => e.id === id);

    if (!estudante) {
      return res.status(404).json({ mensagem: "Estudante não encontrado." });
    }

    return res.status(200).json(estudante);
  }

  // 3. POST /estudantes - Salvar novo estudante
  static salvar(req, res) {
    const { nome, dataNascimento, telefone } = req.body;

    if (!nome || !dataNascimento) {
      return res.status(400).json({ mensagem: "Nome e data de nascimento são obrigatórios." });
    }

    // Instancia um novo objeto a partir da Classe Estudante
    const novoEstudante = new Estudante(proximoId++, nome, dataNascimento, telefone);
    estudantes.push(novoEstudante);

    return res.status(201).json({
      mensagem: "Estudante registado com sucesso!",
      estudante: novoEstudante
    });
  }

  // 4. PUT /estudantes/:id - Atualizar dados existentes
  static editar(req, res) {
    const id = parseInt(req.params.id);
    const { nome, dataNascimento, telefone } = req.body;

    const index = estudantes.findIndex(e => e.id === id);

    if (index === -1) {
      return res.status(404).json({ mensagem: "Estudante não encontrado para atualização." });
    }

    // Atualiza os dados preservando o ID original
    estudantes[index].nome = nome || estudantes[index].nome;
    estudantes[index].dataNascimento = dataNascimento || estudantes[index].dataNascimento;
    estudantes[index].telefone = telefone || estudantes[index].telefone;

    return res.status(200).json({
      mensagem: "Dados atualizados com sucesso!",
      estudante: estudantes[index]
    });
  }

  // 5. DELETE /estudantes/:id - Remover estudante
  static deletar(req, res) {
    const id = parseInt(req.params.id);
    const index = estudantes.findIndex(e => e.id === id);

    if (index === -1) {
      return res.status(404).json({ mensagem: "Estudante não encontrado para exclusão." });
    }

    // Remove 1 item a partir da posição index
    const removido = estudantes.splice(index, 1);

    return res.status(200).json({
      mensagem: "Estudante removido com sucesso!",
      estudanteRemovido: removido[0]
    });
  }
}

module.exports = EstudanteController;