import { Instrutor } from "@/interfaces/Instrutor";
import instrutores from "@/pages/instrutores";
import { getAluno, putAluno } from "@/services/AlunoService";
import { getEquipamento, postEquipamento, putEquipamento } from "@/services/EquipamentoService";
import { getInstrutores } from "@/services/InstrutorService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
}

const EditarAluno: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
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

    useEffect(() => {
        getAlun();
        getInst();
    }, [open]);

    const getInst = async () => {
        const resp = await getInstrutores();
        setInstrutores(resp);
    }


    const handleSaveClick = async () => {
        if (cpf != "" && nome != "" && rg != "" && endereco != "" && telefone != "" && peso != "" && altura != "" && objetivo != "" && instrutor != "") {

            let apiData;
            if (email == "") {
                apiData = {
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
                apiData = {
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

            await putAluno(id, apiData);
            onClose();
            resetCampos();
        }

    };

    const handleCancelClick = () => {
        resetCampos();
        onClose();
    };

    const getAlun = async () => {
        const resp = await getAluno(id);
        setCpf(resp?.data.cpf);
        setNome(resp?.data.nome);
        setRg(resp?.data.rg);
        setEndereco(resp?.data.endereco);
        setTelefone(resp?.data.telefone);
        setEmail(resp?.data.email);
        setPeso(resp?.data.peso);
        setAltura(resp?.data.altura);
        setObjetivo(resp?.data.objetivo);
        setInstrutor(resp?.data.instrutor);
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
                    disabled
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

export default EditarAluno;

