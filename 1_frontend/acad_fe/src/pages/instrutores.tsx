import { Box, Divider, Button, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useEffect, useState } from 'react';
import equipamentos from './equipamentos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Instrutor } from '@/interfaces/Instrutor';
import { getInstrutores } from '@/services/InstrutorService';
import NovoInstrutor from '@/components/instrutores/NovoInstrutor';
import ExcluirInstrutor from '@/components/instrutores/ExcluirInstrutor';
import EditarInstrutor from '@/components/instrutores/EditarInstrutor';

export default function Instrutores() {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [instrutores, setInstrutores] = useState<Instrutor[]>();
    const [id, setId] = useState<string>("");
    const [nome, setNome] = useState<string>("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        getInst();
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        getInst();
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        getInst();
    };

    const getInst = async () => {
        const resp = await getInstrutores();
        setInstrutores(resp);
    }

    const rows = () => instrutores?.map((d: any) => ({
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

    const columns: GridColDef[] = [
        { field: 'cpf', headerName: 'Cpf', flex: 0.2 },
        { field: 'nome', headerName: 'Nome', flex: 0.3 },
        { field: 'telefone', headerName: 'Telefone', flex: 0.3 },
        { field: 'editar', headerName: 'Editar', flex: 0.1, renderCell: renderCellEdit },
        { field: 'excluir', headerName: 'Excluir', flex: 0.1, renderCell: renderCellDelete }
    ];

    useEffect(() => {
        getInst();
    }, []);

    return (
        <>
            <NovoInstrutor open={open} onClose={handleClose} />
            <EditarInstrutor open={openEdit} onClose={handleCloseEdit} id={id} />
            <ExcluirInstrutor open={openDelete} onClose={handleCloseDelete} cpf={id} nome={nome} />
            <Box sx={{ m: 3, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                <Typography variant="h4" color="initial">Instrutores</Typography>
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


