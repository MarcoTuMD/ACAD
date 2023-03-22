import { Instrutor } from "@/interfaces/Instrutor";
import { getEquipamento, postEquipamento, putEquipamento } from "@/services/EquipamentoService";
import { getInstrutor, putInstrutor } from "@/services/InstrutorService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from "react";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
}

const EditarInstrutor: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
}) => {
    const [instrutor, setInstrutor] = useState<Instrutor>();
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [rg, setRg] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        getInst();
    }, [open]);

    const resetCampos = () => {
        setCpf("");
        setNome("");
        setRg("");
        setEndereco("");
        setTelefone("");
        setEmail("");
    }
    const handleSaveClick = async () => {
        if (cpf != "" && nome != "" && rg != "" && endereco != "" && telefone != "") {
            let instrutor;
            if (email == "") {
                instrutor = {
                    cpf: cpf,
                    nome: nome,
                    rg: rg,
                    endereco: endereco,
                    telefone: telefone,
                }
            } else {
                instrutor = {
                    cpf: cpf,
                    nome: nome,
                    rg: rg,
                    endereco: endereco,
                    telefone: telefone,
                    email: email
                }
            }


            await putInstrutor(cpf, instrutor);
            resetCampos();
            onClose();
        }
    };

    const handleCancelClick = () => {
        resetCampos();
        onClose();
    };

    const getInst = async () => {
        const resp = await getInstrutor(id);
        console.log(resp);

        setCpf(resp?.data.cpf);
        setNome(resp?.data.nome);
        setRg(resp?.data.rg);
        setEndereco(resp?.data.endereco);
        setTelefone(resp?.data.telefone);
        setEmail(resp?.data.email);
    }

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Editar Equipamento</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="cpf"
                    label="CPF"
                    type="number"
                    fullWidth
                    value={cpf}
                    onChange={(ev) => { setCpf(ev.target.value); }}
                    required
                    disabled
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome"
                    type="text"
                    fullWidth
                    value={nome}
                    onChange={(ev) => { setNome(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="rg"
                    label="RG"
                    type="text"
                    fullWidth
                    value={rg}
                    onChange={(ev) => { setRg(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="endereco"
                    label="Endereço"
                    type="text"
                    fullWidth
                    value={endereco}
                    onChange={(ev) => { setEndereco(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="telefone"
                    label="Telefone"
                    type="text"
                    fullWidth
                    value={telefone}
                    onChange={(ev) => { setTelefone(ev.target.value); }}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth
                    value={email}
                    onChange={(ev) => { setEmail(ev.target.value); }}
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

export default EditarInstrutor;

