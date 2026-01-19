import React, { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import api from '../api/axios';

const Members = () => {
    const [members, setMembers] = useState([]);
    const [visible, setVisible] = useState(false); // New/Edit Dialog visibility
    const [editMode, setEditMode] = useState(false);
    
    // Form State
    const [currentMember, setCurrentMember] = useState({ name: '', phone_number: '' });
    
    const toast = useRef(null);

    const fetchMembers = async () => {
        try {
            const response = await api.get('/members');
            setMembers(response.data);
        } catch (error) {
            console.error("Failed to fetch members", error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const openNew = () => {
        setEditMode(false);
        setCurrentMember({ name: '', phone_number: '' });
        setVisible(true);
    };

    const openEdit = (member) => {
        setEditMode(true);
        setCurrentMember({ ...member });
        setVisible(true);
    };

    const handleDelete = (member) => {
        confirmDialog({
            message: `Are you sure you want to delete ${member.name}?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                try {
                    await api.delete(`/members/${member.id}`);
                    toast.current.show({ severity: 'success', summary: 'Deleted', detail: 'Member deleted' });
                    fetchMembers();
                } catch (error) {
                    console.error("Delete failed details:", error);
                    const msg = error.response?.data?.detail || error.message || 'Delete failed';
                    toast.current.show({ severity: 'error', summary: 'Error', detail: msg });
                }
            }
        });
    };

    const saveMember = async () => {
        try {
            if (editMode) {
                await api.put(`/members/${currentMember.id}`, currentMember);
                toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Member updated successfully' });
            } else {
                await api.post('/members', currentMember);
                toast.current.show({ severity: 'success', summary: 'Saved', detail: 'Member added successfully' });
            }
            setVisible(false);
            fetchMembers();
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Operation failed' });
        }
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button 
                    icon="pi pi-pencil" 
                    className="p-button-rounded p-button-text p-button-warning p-mr-2" 
                    onClick={() => openEdit(rowData)} 
                    aria-label="Edit"
                />
                <Button 
                    icon="pi pi-trash" 
                    className="p-button-rounded p-button-text p-button-danger" 
                    onClick={() => handleDelete(rowData)} 
                    aria-label="Delete"
                />
            </React.Fragment>
        );
    };

    return (
        <div className="p-grid p-justify-center">
            <Toast ref={toast} />
            <ConfirmDialog />
            
            <div className="p-col-12">
                <Card title="Member Management" className="p-shadow-4">
                    <div className="p-d-flex p-jc-between p-mb-3" style={{ marginBottom: '1rem' }}>
                        <span className="p-text-secondary">Manage your broadcast list</span>
                        <Button 
                            label="New" 
                            icon="pi pi-plus" 
                            className="p-button-success" 
                            onClick={openNew} 
                            aria-label="New"
                        />
                    </div>

                    <DataTable value={members} paginator rows={10} emptyMessage="No members found.">
                        <Column field="name" header="Name" sortable></Column>
                        <Column field="phone_number" header="Phone Number" sortable></Column>
                        <Column body={actionBodyTemplate} header="Actions" style={{ width: '10rem', textAlign: 'center' }}></Column>
                    </DataTable>
                </Card>
            </div>

            <Dialog 
                header={editMode ? "Edit Member" : "New Member"} 
                visible={visible} 
                style={{ width: '90vw', maxWidth: '450px' }} 
                onHide={() => setVisible(false)}
            >
                <div className="p-fluid">
                    <div className="p-field p-mb-3">
                        <label htmlFor="name" className="p-d-block p-mb-2">Name</label>
                        <InputText 
                            id="name" 
                            value={currentMember.name} 
                            onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})} 
                            autoFocus 
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="phone" className="p-d-block p-mb-2">Phone</label>
                        <InputText 
                            id="phone" 
                            value={currentMember.phone_number} 
                            onChange={(e) => setCurrentMember({...currentMember, phone_number: e.target.value})} 
                        />
                    </div>
                    <div className="p-d-flex p-jc-end p-mt-4" style={{ marginTop: '2rem' }}>
                        <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text p-mr-2" />
                        <Button label="Save" icon="pi pi-check" onClick={saveMember} autoFocus />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default Members;
