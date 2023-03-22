import { Equipamento } from '@/interfaces/Equipamento';
import { getEquipamento, getEquipamentos } from '@/services/EquipamentoService';
import { Box, Divider, Paper, Button } from '@mui/material';
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import NovoEquipamento from '@/components/equipamento/NovoEquipamento';
import EditarEquipamento from '@/components/equipamento/EditarEquipamento';
import ExcluirEquipamento from '@/components/equipamento/ExcluirEquipamento';
import { Exercicio } from '@/interfaces/Exercicio';
import equipamentos from './equipamentos';
import { getExercicios } from '@/services/ExercicioService';
import NovoExercicio from '@/components/exercicios/NovoExercicio';
import ExcluirExercicio from '@/components/exercicios/ExcluirExercicio';
import EditarExercicio from '@/components/exercicios/EditarExercicio';


export default function Exercicios() {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [id, setId] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [exercicios, setExercicios] = useState<Exercicio[]>();

    const [equipamentos, setEquipamentos] = useState<any>();

    const handleOpen = () => {
        setOpen(true);
    };

    const getExer = async () => {
        const resp = await getExercicios();
        setExercicios(resp);
    }

    const getEqui = async () => {
        const resp = await getEquipamentos();
        setEquipamentos(resp);
    }

    const handleClose = () => {
        setOpen(false);
        getExer();
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        getExer();
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        getExer();
    };

    const renderCellEdit = (params: GridRenderCellParams) => {
        return <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
                setId(params.row.id);
                setOpenEdit(true);
            }}
        />
    };

    const renderCellDelete = (params: GridRenderCellParams) => {
        return <Button
            variant="text"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={() => {
                setId(params.row.id);
                setNome(params.row.nome)
                setOpenDelete(true);
            }}
        />
    };


    const columns: GridColDef[] = [
        { field: 'nome', headerName: 'Nome', flex: 0.5 },
        { field: 'repeticoes', headerName: 'Repetições', flex: 0.3 },
        { field: 'equipamento', headerName: 'Equipamento', flex: 0.5 },
        { field: 'editar', headerName: 'Editar', flex: 0.1, renderCell: renderCellEdit },
        { field: 'excluir', headerName: 'Excluir', flex: 0.1, renderCell: renderCellDelete }
    ];



    const rows = () => exercicios?.map((d: any) => ({
        ...d,
        nome: d.nome,
        repeticoes: d.repeticoes,
        equipamento: getEquipamento(d.equipamento),
    }))

    const getEquipamento = (id: number) => {
        for (let i = 0; i < equipamentos?.length; i++) {
            if (equipamentos[i]?.id == id) {
                return equipamentos[i].nome;
            }

        }
    }



    useEffect(() => {
        getExer();
        getEqui();
    }, [open, openEdit, openDelete,]);

    useEffect(() => {
        getExer();
        getEqui();
    }, []);


    return (
        <>
            <NovoExercicio open={open} onClose={handleClose} />
            <EditarExercicio open={openEdit} onClose={handleCloseEdit} id={id} />
            <ExcluirExercicio open={openDelete} onClose={handleCloseDelete} id={id} nome={nome} />
            <Box sx={{ m: 3, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                <Typography variant="h4" color="initial">Exercicios</Typography>
                <Divider sx={{ bgcolor: "#AED6F1", height: 2, mt: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                    >
                        Novo
                    </Button>
                </Box>

                <Paper elevation={3}>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows() || []}
                            columns={columns}
                            hideFooter
                            getRowId={(row) => row.nome}
                        />
                    </Box>
                </Paper>

            </Box>
        </>

    )
}