import { Equipamento } from "@/interfaces/Equipamento";
import { getEquipamento, getEquipamentos, postEquipamento } from "@/services/EquipamentoService";
import { getExercicios, postExercicio } from "@/services/ExercicioService";
import { postInstrutor } from "@/services/InstrutorService";
import { postTreino } from "@/services/TreinoService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, OutlinedInput, Checkbox, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";


interface NewEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    cpf: any;
}

const NovoTreino: React.FC<NewEquipmentDialogProps> = ({
    open,
    onClose,
    cpf
}) => {
    const [nome, setNome] = useState("");

    const [exercicios, setExercicios] = useState<string[]>([]);

    const [exerciciosApi, setExerciciosApi] = useState<any>();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const handleChangeExer = (event: SelectChangeEvent<typeof exercicios>) => {
        const {
            target: { value },
        } = event;
        setExercicios(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    const getExer = async () => {
        const resp = await getExercicios();
        setExerciciosApi(resp);
    }

    const resetCampos = () => {
        setNome("");
        setExercicios([]);
    }

    const handleSaveClick = async () => {
        if (nome != "" && exercicios.length > 0) {

            const apiData = {
                nome: nome,
                data_cricao: "",
                aluno: cpf,
                exercicios: exercicios,
            }
            await postTreino(apiData);
            resetCampos();
            onClose();
        }
    };

    useEffect(() => {
        getExer();
    }, []);



    const handleCancelClick = () => {
        resetCampos();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Novo Treino</DialogTitle>
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

                <FormControl sx={{ mt: 1, width: "100%" }}>
                    <InputLabel id="demo-multiple-checkbox-label">Exercícios</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={exercicios}
                        onChange={handleChangeExer}
                        input={<OutlinedInput label="Exercicios" />}
                        renderValue={(selected: any) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {exerciciosApi?.map((exercicio: any) => (
                            <MenuItem key={exercicio.id} value={exercicio.id}>
                                <Checkbox checked={exercicios.indexOf(exercicio.id) > -1} />
                                <ListItemText primary={exercicio.nome} />
                            </MenuItem>
                        ))}
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

export default NovoTreino;