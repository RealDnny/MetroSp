export function fatalError(err, req, res, next) {
    if (err) {
        console.error(err.stack);
        return res.status(500).json({
            success: false, // Corrigido de "sucess" para "success"
            message: 'Erro Fatal do servidor'
        });
    }
    next();
}

export function erroDeEnderecamento(req, res, next) {
   return res.status(404).json({ message: 'Endereço não encontrado' });
}
