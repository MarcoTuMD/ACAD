import { deleteAluno } from "@/services/AlunoService";
import { deleteInstrutor } from "@/services/InstrutorService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography } from "@mui/material";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    cpf: string;
    nome: string
}

const ExcluirInstrutor: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    cpf,
    nome,
}) => {


    const handleSaveClick = async () => {
        await deleteAluno(cpf);
        onClose();
    };

    const handleCancelClick = () => {
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Excluir Aluno</DialogTitle>
            <DialogContent>
                <Typography variant="h6" color="initial">Voce realmente deseja excluir o aluno <strong>{nome}</strong> ?</Typography>
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

export default ExcluirInstrutor;

