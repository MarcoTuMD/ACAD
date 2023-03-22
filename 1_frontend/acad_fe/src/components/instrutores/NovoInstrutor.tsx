import { postEquipamento } from "@/services/EquipamentoService";
import { postInstrutor } from "@/services/InstrutorService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import React, { useState } from "react";


interface NewEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
}

const NovoInstrutor: React.FC<NewEquipmentDialogProps> = ({
    open,
    onClose,
}) => {
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [rg, setRg] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

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


            await postInstrutor(instrutor);
            resetCampos();
            onClose();
        }
    };



    const handleCancelClick = () => {
        resetCampos();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Novo Instrutor</DialogTitle>
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

export default NovoInstrutor;