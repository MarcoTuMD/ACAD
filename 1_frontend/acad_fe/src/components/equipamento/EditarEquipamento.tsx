import { getEquipamento, postEquipamento, putEquipamento } from "@/services/EquipamentoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from "react";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
}

const EditarEquipamento: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
}) => {
    const [name, setName] = useState("");

    useEffect(() => {
        getEqui();
    }, [open]);

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSaveClick = async () => {
        if (name != "") {
            await putEquipamento(id, name);
            onClose();
            setName("");
            onClose();
        }
    };

    const handleCancelClick = () => {
        setName("");
        onClose();
    };

    const getEqui = async () => {
        const resp = await getEquipamento(id);
        setName(resp?.data.nome);
    }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Editar Equipamento</DialogTitle>
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

export default EditarEquipamento;

