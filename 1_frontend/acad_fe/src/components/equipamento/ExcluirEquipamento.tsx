import { deleteEquipamento, getEquipamento, postEquipamento, putEquipamento } from "@/services/EquipamentoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
    nome: string
}

const ExcluirEquipamento: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
    nome,
}) => {


    const handleSaveClick = async () => {
        await deleteEquipamento(id);
        onClose();
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Excluir Equipamento</DialogTitle>
            <DialogContent>
                <Typography variant="h6" color="initial">Voce realmente deseja excluir o equipamento <strong>{nome}</strong> ?</Typography>
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

export default ExcluirEquipamento;

