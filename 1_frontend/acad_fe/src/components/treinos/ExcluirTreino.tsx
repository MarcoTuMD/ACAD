import { deleteEquipamento, getEquipamento, postEquipamento, putEquipamento } from "@/services/EquipamentoService";
import { deleteTreino } from "@/services/TreinoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
    nome: string
}

const ExcluirTreino: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
    nome,
}) => {


    const handleSaveClick = async () => {
        await deleteTreino(id);
        onClose();
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Excluir Treino</DialogTitle>
            <DialogContent>
                <Typography variant="h6" color="initial">Voce realmente deseja excluir o treino <strong>{nome}</strong> ?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClick} variant="contained" color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSaveClick} variant="contained" color="primary">
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExcluirTreino;

