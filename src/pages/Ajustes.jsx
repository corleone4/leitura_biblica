import Navbar from "../components/Navbar";
import "../css/ajustes.css"
export default function Ajustes() {

    function exportProgresso() {
        const progresso = JSON.parse(localStorage.getItem("progress") || "{}");
        const data = localStorage.getItem("date") || "";
        const chapters = JSON.parse(localStorage.getItem("chapters") || "{}");

        const exportObj = { progresso, data, chapters };

        const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");

        const dataObj = new Date();
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        const formatoManual = `${dia}-${mes}-${ano}`;

        a.href = url;
        a.download = `progresso_leitura_${formatoManual}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function importProgresso(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const result = e.target.result;
                const parsed = JSON.parse(result);

                if (parsed.progresso) localStorage.setItem("progress", JSON.stringify(parsed.progresso));
                if (parsed.data) localStorage.setItem("date", parsed.data);
                if (parsed.chapters) localStorage.setItem("chapters", JSON.stringify(parsed.chapters));

                window.location.reload();
            } catch (err) {
                alert(`Arquivo inválido! ${err}`);
            }
        };
        reader.readAsText(file);
    }


    return (
        <>
            <Navbar />
            <div className="container ajustes-page">
                <h2 className="ajustes-title">Ajustes</h2>

                <div className="ajustes-card">
                    <h3>Backup do Progresso</h3>
                    <p>Exporte seu progresso atual ou importe de um arquivo JSON.</p>
                    <div className="ajustes-actions">
                        <button className="btn-export" onClick={exportProgresso}>
                            Exportar Progresso
                        </button>

                        <label className="btn-import">
                            Importar Progresso
                            <input
                                type="file"
                                accept=".json"
                                onChange={importProgresso}
                                style={{ display: "none" }}
                            />
                        </label>
                    </div>
                </div>

                {/* espaço para futuras opções */}
                <div className="ajustes-card placeholder">
                    <h3> Futuras opções</h3>
                    <p>Mais ferramentas serão adicionadas aqui.</p>
                </div>
            </div>
        </>
    );
}
