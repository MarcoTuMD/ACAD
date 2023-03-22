import { Equipamento } from "@/interfaces/Equipamento";
import { getEquipamento, getEquipamentos, postEquipamento, putEquipamento } from "@/services/EquipamentoService";
import { getExercicio, postExercicio, putExercicio } from "@/services/ExercicioService";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

interface EditEquipmentDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
}

const EditarExercicio: React.FC<EditEquipmentDialogProps> = ({
    open,
    onClose,
    id,
}) => {
    const [nome, setNome] = useState("");
    const [repeticoes, setRepeticoes] = useState("");
    const [equipamento, setEquipamento] = useState("0");


    const [equipamentos, setEquipamentos] = useState<Equipamento[]>();


    const getEqui = async () => {
        const resp = await getEquipamentos();
        setEquipamentos(resp);
    }

    const resetCampos = () => {
        setNome("");
        setRepeticoes("");
        setEquipamento("0");
    }

    const getExer = async () => {
        const resp = await getExercicio(id);
        setNome(resp?.data.nome);
        setRepeticoes(resp?.data.repeticoes);
        setEquipamento(resp?.data.equipamento);
    }


    useEffect(() => {
        getEqui();
        getExer();
    }, [open]);


    const handleSaveClick = async () => {
        if (nome != "" && repeticoes != "") {
            const apiData = {
                id: +id,
                nome: nome,
                repeticoes: repeticoes,
                equipamento: +equipamento,
            }
            await putExercicio(id, apiData);
            resetCampos();
            onClose();
        }
    };

    const handleCancelClick = () => {
        onClose();
    };

    const handleChange = (event: SelectChangeEvent) => {
        setEquipamento(event.target.value as string);
    };



    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Editar Exercicio</DialogTitle>
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

export default EditarExercicio;

