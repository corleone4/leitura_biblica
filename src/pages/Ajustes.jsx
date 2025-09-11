import Navbar from "../components/Navbar";

export default function Ajustes() {

    function exportProgresso() {
        const progresso = localStorage.getItem("progress") || "{}";
        const blob = new Blob([progresso], { type: "application/json" });
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
                JSON.parse(result);
                localStorage.setItem("progress", result);
                window.location.reload();
            } catch (err) {
                alert(`Arquivo inválido! ${err}`);
            }
        };
        reader.readAsText(file);
    }

    return (<>
        <Navbar />
        <div className="container">
            {/* a fazer */}

            Ajustes

            <div>
                <button className="progress-buttons" onClick={exportProgresso}>Exportar Progresso</button>
                <input
                    type="file"
                    accept=".json"
                    onChange={importProgresso}
                    className="progress-buttons"
                    style={{ display: "inline-block", marginLeft: "10px" }}
                />
            </div>

        </div>
    </>
    );
}