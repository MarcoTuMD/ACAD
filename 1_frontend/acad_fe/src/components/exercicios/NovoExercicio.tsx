import { Equipamento } from "@/interfaces/Equipamento";
import { getEquipamento, getEquipamentos, postEquipamento } from "@/services/EquipamentoService";
import { postExercicio } from "@/services/ExercicioService";
import { postInstrutor } from "@/services/InstrutorService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";


interface NewEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
}

const NovoExercicio: React.FC<NewEquipmentDialogProps> = ({
    open,
    onClose,
}) => {
    const [nome, setNome] = useState("");
    const [repeticoes, setRepeticoes] = useState("");

    const [equipamentos, setEquipamentos] = useState<Equipamento[]>();
    const [equipamento, setEquipamento] = useState<string>("0");


    const handleChange = (event: SelectChangeEvent) => {
        setEquipamento(event.target.value as string);
    };

    const resetCampos = () => {
        setNome("");
        setRepeticoes("");
        setEquipamento("0");
    }

    const handleSaveClick = async () => {
        if (nome != "" && repeticoes != "") {

            const apiData = {
                nome: nome,
                repeticoes: repeticoes,
                equipamento: equipamento,
            }
            await postExercicio(apiData);
            resetCampos();
            onClose();
        }
    };

    const getEqui = async () => {
        const resp = await getEquipamentos();
        setEquipamentos(resp);
    }

    useEffect(() => {
        getEqui();
    }, []);



    const handleCancelClick = () => {
        resetCampos();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Novo Exercicio</DialogTitle>
            <DialogContent>
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
                    id="repeticoes"
                    label="Repeticoes"
                    type="text"
                    fullWidth
                    value={repeticoes}
                    onChange={(ev) => { setRepeticoes(ev.target.value); }}
                    required
                />
                <FormControl fullWidth sx={{ mt: 1 }}>
                    <InputLabel id="demo-simple-select-label">Equipamento</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={equipamento}
                        label="Equipamento"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>--</MenuItem>
                        {equipamentos?.map((item) => {
                            return <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
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

export default NovoExercicio;