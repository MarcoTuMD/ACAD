import { Instrutor } from "@/interfaces/Instrutor";
import equipamentos from "@/pages/equipamentos";
import { postEquipamento } from "@/services/EquipamentoService";
import { getInstrutores, postInstrutor } from "@/services/InstrutorService";
import { postAluno } from "@/services/AlunoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";


interface NewEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
}

const NovoAluno: React.FC<NewEquipmentDialogProps> = ({
    open,
    onClose,
}) => {
    const [cpf, setCpf] = useState("");
    const [nome, setNome] = useState("");
    const [rg, setRg] = useState("");
    const [endereco, setEndereco] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [objetivo, setObjetivo] = useState("");
    const [instrutor, setInstrutor] = useState("");

    const [instrutores, setInstrutores] = useState<Instrutor[]>();

    const handleChange = (event: SelectChangeEvent) => {
        setInstrutor(event.target.value);
    };

    const resetCampos = () => {
        setCpf("");
        setNome("");
        setRg("");
        setEndereco("");
        setTelefone("");
        setEmail("");
        setPeso("");
        setAltura("");
        setObjetivo("");
        setInstrutor("");
    }

    const handleSaveClick = async () => {
        if (cpf != "" && nome != "" && rg != "" && endereco != "" && telefone != "" && peso != "" && altura != "" && objetivo != "" && instrutor != "") {
            let aluno;
            if (email == "") {
                aluno = {
                    cpf: cpf,
                    nome: nome,
                    rg: rg,
                    endereco: endereco,
                    telefone: telefone,
                    peso: +peso,
                    altura: +altura,
                    objetivo: objetivo,
                    instrutor: instrutor
                }
            } else {
                aluno = {
                    cpf: cpf,
                    nome: nome,
                    rg: rg,
                    endereco: endereco,
                    telefone: telefone,
                    email: email,
                    peso: +peso,
                    altura: +altura,
                    objetivo: objetivo,
                    instrutor: instrutor
                }
            }


            await postAluno(aluno);
            resetCampos();
            onClose();
        }
    };



    const handleCancelClick = () => {
        resetCampos();
        onClose();
    };

    const getInst = async () => {
        const resp = await getInstrutores();
        setInstrutores(resp);
    }

    useEffect(() => {
        getInst();
    }, []);

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Novo Aluno</DialogTitle>
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
                <TextField
                    autoFocus
                    margin="dense"
                    id="peso"
                    label="Peso"
                    type="number"
                    fullWidth
                    value={peso}
                    onChange={(ev) => { setPeso(ev.target.value); }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="altura"
                    label="Altura"
                    type="number"
                    fullWidth
                    value={altura}
                    onChange={(ev) => { setAltura(ev.target.value); }}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="onjetivo"
                    label="Objetivo"
                    type="text"
                    fullWidth
                    value={objetivo}
                    onChange={(ev) => { setObjetivo(ev.target.value); }}
                />
                <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="demo-simple-select-label">Instrutor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={instrutor}
                        label="Equipamento"
                        onChange={handleChange}
                    >
                        {instrutores?.map((item) => {
                            return <MenuItem key={item.cpf} value={item.cpf}>{item.nome}</MenuItem>
                        })}
                    </Select>
                </FormControl>
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

export default NovoAluno;