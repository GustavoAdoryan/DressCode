const { Agendamento } = require('../model');

class AgendamentoController {
    async criarAgendamento(req, res) {
        try {
            const { DataHora, EstilistaID, AtelieID } = req.body;
            const novoAgendamento = await Agendamento.create({ DataHora, EstilistaID, AtelieID, Status: 'ativo' });
            res.status(201).json(novoAgendamento);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar agendamento', error: error.message });
        }
    }

    async listarAgendamentos(req, res) {
        try {
            const agendamentos = await Agendamento.findAll();
            res.status(200).json(agendamentos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar agendamentos', error: error.message });
        }
    }

    async atualizarAgendamento(req, res) {
        try {
            const { id } = req.params;
            const { DataHora, EstilistaID, AtelieID, Status } = req.body;

            const agendamento = await Agendamento.findByPk(id);
            if (agendamento) {
                if (DataHora !== undefined) agendamento.DataHora = DataHora;
                if (EstilistaID !== undefined) agendamento.EstilistaID = EstilistaID;
                if (AtelieID !== undefined) agendamento.AtelieID = AtelieID;
                if (Status !== undefined) agendamento.Status = Status;

                await agendamento.save();
                res.status(200).json(agendamento);
            } else {
                res.status(404).json({ message: 'Agendamento não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar agendamento', error: error.message });
        }
    }

    async deletarAgendamento(req, res) {
        try {
            const { id } = req.params;
            const agendamento = await Agendamento.findByPk(id);
            if (agendamento) {
                await agendamento.destroy();
                res.status(200).json({ message: 'Agendamento deletado com sucesso' });
            } else {
                res.status(404).json({ message: 'Agendamento não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar agendamento', error: error.message });
        }
    }

    async listarAgendamentosPorStatus(req, res) {
        try {
            const { status } = req.params;
            const agendamentos = await Agendamento.findAll({ where: { Status: status } });
            res.status(200).json(agendamentos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar agendamentos por status', error: error.message });
        }
    }

    async listarAgendamentosPorEstilista(req, res) {
        try {
            const { estilistaId } = req.params;
            const agendamentos = await Agendamento.findAll({ where: { EstilistaID: estilistaId } });
            res.status(200).json(agendamentos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar agendamentos do estilista', error: error.message });
        }
    }

    async listarAgendamentosPorAtelie(req, res) {
        try {
            const { atelieId } = req.params;
            const agendamentos = await Agendamento.findAll({ where: { AtelieID: atelieId } });
            res.status(200).json(agendamentos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar agendamentos do ateliê', error: error.message });
        }
    }

    async listarAgendamentosPorEstilistaEStatus(req, res) {
        try {
            const { estilistaId, status } = req.params;
            const agendamentos = await Agendamento.findAll({ where: { EstilistaID: estilistaId, Status: status } });
            res.status(200).json(agendamentos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar agendamentos do estilista por status', error: error.message });
        }
    }

    async listarAgendamentosPorAtelieEStatus(req, res) {
        try {
            const { atelieId, status } = req.params;
            const agendamentos = await Agendamento.findAll({ where: { AtelieID: atelieId, Status: status } });
            res.status(200).json(agendamentos);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar agendamentos do ateliê por status', error: error.message });
        }
    }
}

module.exports = new AgendamentoController();
