import { Equipamento } from '@/interfaces/Equipamento';
import { getEquipamentos } from '@/services/EquipamentoService';
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


export default function Eqipamentos() {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [id, setId] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [equipamentos, setEquipamentos] = useState<Equipamento[]>();

    const handleOpen = () => {
        setOpen(true);
    };


    const getEqui = async () => {
        const resp = await getEquipamentos();
        setEquipamentos(resp);
    }

    const handleClose = () => {
        setOpen(false);
        getEqui();
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
        getEqui();
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
        getEqui();
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
        { field: 'nome', headerName: 'Nome', flex: 1 },
        { field: 'editar', headerName: 'Editar', flex: 0.1, renderCell: renderCellEdit },
        { field: 'excluir', headerName: 'Excluir', flex: 0.1, renderCell: renderCellDelete }
    ];



    const rows = () => equipamentos?.map((d: any) => ({
        ...d,
        nome: d.nome,
    }))



    useEffect(() => {
        getEqui();
    }, [open, openEdit, openDelete]);


    return (
        <>
            <NovoEquipamento open={open} onClose={handleClose} />
            <EditarEquipamento open={openEdit} onClose={handleCloseEdit} id={id || ""} />
            <ExcluirEquipamento open={openDelete} onClose={handleCloseDelete} id={id || ""} nome={nome} />
            <Box sx={{ m: 3, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                <Typography variant="h4" color="initial">Equipamentos</Typography>
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
                        />
                    </Box>
                </Paper>

            </Box>
        </>

    )
}