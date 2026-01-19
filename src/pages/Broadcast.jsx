import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Tag } from 'primereact/tag';
import api from '../api/axios';

const Broadcast = () => {
    const [broadcasts, setBroadcasts] = useState([]);
    const [dialog, setDialog] = useState(false);
    const [content, setContent] = useState('');
    const toast = React.useRef(null);

    const fetchBroadcasts = async () => {
        try {
            const res = await api.get('/broadcasts');
            const sorted = res.data.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
            setBroadcasts(sorted);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchBroadcasts();
    }, []);

    const sendBroadcast = async () => {
        try {
            await api.post('/broadcasts', {
                content: content,
                message_type: 'text'
            });
            toast.current.show({ severity: 'success', summary: 'Sent', detail: 'Broadcast started', life: 3000 });
            setDialog(false);
            setContent('');
            fetchBroadcasts(); // Refresh list to see new one
        } catch (e) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to send', life: 3000 });
        }
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)}></Tag>;
    };

    const getSeverity = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'processing': return 'warning';
            case 'failed': return 'danger';
            default: return 'info';
        }
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={<Button label="New Broadcast" icon="pi pi-megaphone" onClick={() => setDialog(true)} />}></Toolbar>
                <DataTable value={broadcasts} paginator rows={10}>
                    <Column field="created_at" header="Date" sortable></Column>
                    <Column field="content" header="Message" style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}></Column>
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable></Column>
                </DataTable>
            </div>

            <Dialog visible={dialog} style={{ width: '450px' }} header="Compose Message" modal onHide={() => setDialog(false)}>
                <div className="field">
                    <label htmlFor="content">Message</label>
                    <InputTextarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required rows={5} cols={30} className="w-full" />
                </div>
                <Button label="Send to All Members" icon="pi pi-send" onClick={sendBroadcast} disabled={!content} />
            </Dialog>
        </div>
    );
};

export default Broadcast;
