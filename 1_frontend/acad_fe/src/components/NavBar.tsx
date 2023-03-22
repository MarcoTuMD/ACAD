import { AppBar, Toolbar, Typography, Button, Divider, Box } from "@mui/material";
import { useRouter } from 'next/router'


const Navbar: React.FC = () => {
    const router = useRouter()
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    ACAD+
                </Typography>
                <Box sx={{ px: 6, m: "auto" }}>
                    <Button color="inherit" onClick={() => router.push("/alunos")}>Alunos</Button>
                    <Button color="inherit" onClick={() => router.push("/exercicios")}>Exercícios</Button>
                    <Button color="inherit" onClick={() => router.push("/equipamentos")}>Equipamentos</Button>
                    <Button color="inherit" onClick={() => router.push("/instrutores")}>Instrutores</Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;