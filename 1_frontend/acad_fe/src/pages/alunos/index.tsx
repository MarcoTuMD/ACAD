import { Box, Divider, Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { Instrutor } from '@/interfaces/Instrutor';
import { getInstrutores } from '@/services/InstrutorService';
import NovoInstrutor from '@/components/instrutores/NovoInstrutor';
import ExcluirInstrutor from '@/components/instrutores/ExcluirInstrutor';
import EditarInstrutor from '@/components/instrutores/EditarInstrutor';
import { Aluno } from '@/interfaces/Aluno';
import { getAlunos } from '@/services/AlunoService';
import NovoAluno from '@/components/alunos/NovoAluno';
import ExcluirAluno from '@/components/alunos/ExcluirAluno';
import EditarAluno from '@/components/alunos/EditarAluno';
import { useRouter } from 'next/router';

export default function Alunos() {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [alunos, setAlunos] = useState<Aluno[]>();
    const [id, setId] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const router = useRouter()

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getAlun();
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        getAlun();
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        getAlun();
    };

    const getAlun = async () => {
        const resp = await getAlunos();
        setAlunos(resp);
    }

    const rows = () => alunos?.map((d: any) => ({
        ...d,

        cpf: d.cpf,
        nome: d.nome,
        telefone: d.telefone
    }))

    const renderCellEdit = (params: GridRenderCellParams) => {
        return <Button
            variant="text"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => {
                setId(params.row.cpf);
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
                setId(params.row.cpf);
                setNome(params.row.nome);
                setOpenDelete(true);
            }}
        />
    };

    const renderCellDetail = (params: GridRenderCellParams) => {
        return <Button
            variant="text"
            color="primary"
            startIcon={<InfoIcon />}
            onClick={() => {
                router.push(`/alunos/${params.row.cpf}`);
            }}
        />
    };

    const columns: GridColDef[] = [
        { field: 'cpf', headerName: 'Cpf', flex: 0.2 },
        { field: 'nome', headerName: 'Nome', flex: 0.3 },
        { field: 'telefone', headerName: 'Telefone', flex: 0.3 },
        { field: 'detalhes', headerName: 'Detalhes', flex: 0.1, renderCell: renderCellDetail },
        { field: 'editar', headerName: 'Editar', flex: 0.1, renderCell: renderCellEdit },
        { field: 'excluir', headerName: 'Excluir', flex: 0.1, renderCell: renderCellDelete }
    ];

    useEffect(() => {
        getAlun();
    }, []);

    return (
        <>
            <NovoAluno open={open} onClose={handleClose} />
            <EditarAluno open={openEdit} onClose={handleCloseEdit} id={id} />
            <ExcluirAluno open={openDelete} onClose={handleCloseDelete} cpf={id} nome={nome} />
            <Box sx={{ m: 3, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                <Typography variant="h4" color="initial">Alunos</Typography>
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
                            getRowId={(row) => row.cpf}
                        />
                    </Box>
                </Paper>

            </Box>
        </>

    )
}


