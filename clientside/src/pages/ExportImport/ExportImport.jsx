import React, { useState } from "react";
import Navbar from "../../layouts/Navbar/Navbar"
import ExportPages from './Export/ExportPages.jsx'
import ImportPages from './Import/ImportPages.jsx'
import './ExportImport.css'

function Groups() {

    const [importPages, setImportPages] = useState(false);
    
    function handleExport(){
        setImportPages(false);
    }
    function handleImport(){
        setImportPages(true);
    }

    return (
        <div>
            <Navbar />
            <div className="home7-grp-box">
                <div className="box7-options">
                    <span onClick={handleExport} 
                          className={`export ${importPages===true ? '' : 'on'}`}>Export Tabs</span>
                    <span>|</span>
                    <span onClick={handleImport}
                          className={`import ${importPages===true ? 'on' : ''}`}>Import Tabs</span>
                </div>
                <div className="line7"></div>
                {importPages ? <ImportPages/> : <ExportPages/>}
            </div>
        </div>
    );
}

export default Groups;
