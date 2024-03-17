import React, { useState } from "react";
import Navbar from "../../layouts/Navbar/Navbar"
import './ExportImport.css'
import ExportPages from './Export/ExportPages.jsx'
import ImportPages from './Import/ImportPages.jsx'

function Groups() {

    const [importPages, setImportPages] = useState(true);
    

    function handleExport(){
        setImportPages(true);
    }
    function handleImport(){
        setImportPages(false);
    }

    return (
        <div>
            <Navbar />
            <div className="home-grp-box">
                <div className="box-options">
                    <span onClick={handleExport}>Export Tabs</span>
                    <span>|</span>
                    <span onClick={handleImport}>Import Tabs</span>
                </div>
                <div className="line"></div>
                {importPages ? <ExportPages/> : <ImportPages/>}
            </div>
        </div>
    );
}

export default Groups;
