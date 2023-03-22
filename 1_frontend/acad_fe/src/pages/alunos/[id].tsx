import { Box, Divider, Button, Paper, TableCell, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useEffect, useRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { getAluno, getAlunos } from '@/services/AlunoService';
import { useRouter } from 'next/router';
import { getTreinosPorAluno } from '@/services/TreinoService';
import { getExercicios } from '@/services/ExercicioService';
import NovoTreino from '@/components/treinos/NovoTreino';
import ExcluirTreino from '@/components/treinos/ExcluirTreino';
import PrintIcon from '@mui/icons-material/Print';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReactToPrint } from 'react-to-print';
import { getEquipamentos } from '@/services/EquipamentoService';

export default function AlunoDetalhes() {
    const [aluno, setAluno] = useState<any>();
    const [treinos, setTreinos] = useState<any>();
    const [exercicios, setExercicios] = useState<any>();
    const [equipamentos, setEquipamentos] = useState<any>();

    const router = useRouter();
    const cpf = router.query.id || "";

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");



    const handleClose = () => {
        setOpen(false);
        getAlun();
        getTre();
    };


    const handleCloseDelete = () => {
        setOpenDelete(false);
        getAlun();
        getTre();
    };

    const getAlun = async () => {
        const resp = await getAluno(cpf);
        setAluno(resp?.data);
    }

    const getExer = async () => {
        const resp = await getExercicios();
        setExercicios(resp);
    }

    const getEqui = async () => {
        const resp = await getEquipamentos();
        setEquipamentos(resp);
    }

    const getTre = async () => {
        const resp = await getTreinosPorAluno(cpf);
        setTreinos(resp);
        console.log(treinos);
    }

    const getExercicio = (id: number) => {
        for (let i = 0; i < exercicios?.length; i++) {
            if (exercicios[i]?.id == id) {
                return exercicios[i];
            }

        }
    }


    useEffect(() => {
        getAlun();
        getTre();
        getExer();
        getEqui();
    }, []);

    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "detalhamento",
        onAfterPrint: () => { }
    });

    const getEquipamento = (id: number) => {
        for (let i = 0; i < equipamentos?.length; i++) {
            if (equipamentos[i]?.id == id) {
                return equipamentos[i];
            }

        }
    }

    return (
        <div ref={componentRef}>


            <NovoTreino open={open} onClose={handleClose} cpf={cpf} />
            <ExcluirTreino open={openDelete} onClose={handleCloseDelete} id={id} nome={nome} />
            <Box sx={{ m: 3, bgcolor: '#ECF0F1', borderRadius: 2, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h4" color="initial">{aluno?.nome}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<PrintIcon />}
                            onClick={handlePrint}
                        >
                            Imprimir
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ bgcolor: "#AED6F1", height: 2, mt: 3 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => { setOpen(true) }}
                    >
                        Novo
                    </Button>
                </Box>

                {treinos?.map((treino: any) => {
                    return (
                        <Paper elevation={3} sx={{ m: 3, p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h5" color="initial">{treino.nome}</Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => {
                                        setId(treino.id);
                                        setNome(treino.nome);
                                        setOpenDelete(true);
                                    }}
                                    sx={{ mb: 2 }}
                                >
                                    Excluir
                                </Button>
                            </Box>

                            <TableContainer sx={{ border: 1 }}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Exercício</TableCell>
                                            <TableCell>Repeticoes</TableCell>
                                            <TableCell>Equipamento</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {treino.exercicios.map((exercicio: any) => {
                                            const exercicioDt = getExercicio(exercicio);
                                            const equipamento = getEquipamento(exercicioDt?.equipamento);
                                            return (<TableRow
                                                key={exercicio}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{exercicioDt?.nome}</TableCell>
                                                <TableCell component="th" scope="row">{exercicioDt?.repeticoes}</TableCell>
                                                <TableCell component="th" scope="row">{equipamento?.nome}</TableCell>
                                            </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Paper>
                    )
                })}
            </Box>
        </div>

    )
}


