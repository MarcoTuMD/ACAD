import { postEquipamento } from "@/services/EquipamentoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import React, { useState } from "react";


interface NewEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
}

const NovoEquipamento: React.FC<NewEquipmentDialogProps> = ({
    open,
    onClose,
}) => {
    const [name, setName] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSaveClick = async () => {
        if (name != "") {
            await postEquipamento(name);
            setName("");
            onClose();
        }
    };

    const handleCancelClick = () => {
        setName("");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Novo Equipamento</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelClick} variant="contained" color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSaveClick} variant="contained" color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default NovoEquipamento;