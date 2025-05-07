<template>
    <div class="contact-list-container">
        
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Employee List</h5>
                    <router-link to="/add-contact" class="btn btn-primary">
                        <i class="fas fa-plus me-2"></i>Add New Contact
                    </router-link>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Designation</th>
                                <th>Contact</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(contact, index) in contacts" :key="contact.id" 
                                @click="viewContact(contact.id)" 
                                class="contact-row">
                                <td>{{ index + 1 }}</td>
                                <td>{{ contact.name }}</td>
                                <td>{{ contact.email }}</td>
                                <td>{{ contact.designation }}</td>
                                <td>{{ contact.contact_no }}</td>
                                <td>
                                    <div class="btn-group" @click.stop>
                                        <button @click="openEditDialog(contact)" class="btn btn-warning btn-sm">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button @click="deleteContact(contact.id)" class="btn btn-danger btn-sm">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Edit Dialog -->
        <div v-if="showEditDialog" class="dialog-overlay">
            <div class="dialog-content">
                <div class="dialog-header">
                    <h5>Edit Contact</h5>
                    <button @click="closeEditDialog" class="close-btn">&times;</button>
                </div>
                <div class="dialog-body">
                    <form @submit.prevent="updateContact">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" v-model="editingContact.name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" v-model="editingContact.email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Designation</label>
                            <input type="text" v-model="editingContact.designation" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Contact</label>
                            <input type="text" v-model="editingContact.contact_no" class="form-control">
                        </div>
                    </form>
                </div>
                <div class="dialog-footer">
                    <button @click="closeEditDialog" class="btn btn-secondary">Cancel</button>
                    <button @click="updateContact" class="btn btn-primary">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ContactList',
    data() {
        return {
            contacts: [],
            showEditDialog: false,
            editingContact: {}
        }
    },
    methods: {

        viewContact(id) {
            this.$router.push(`/contact-detail/${id}`);
        },

        async getContacts() {
            try {
                const url = 'http://localhost:8000/api/contacts';
                const response = await axios.get(url);
                this.contacts = response.data;
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        },
        
        openEditDialog(contact) {
            this.editingContact = { ...contact };
            this.showEditDialog = true;
        },

        closeEditDialog() {
            this.showEditDialog = false;
            this.editingContact = {};
        },
        
        async updateContact() {
            try {
                const url = `http://localhost:8000/api/contacts/${this.editingContact.id}`;
                await axios.put(url, this.editingContact);
                await this.getContacts();
                this.closeEditDialog();
            } catch (error) {
                console.error('Error updating contact:', error);
            }
        },

        async deleteContact(id) {
            if (confirm('Are you sure you want to delete this contact?')) {
                try {
                    const url = `http://localhost:8000/api/contacts/${id}`;
                    await axios.delete(url);
                    this.contacts = this.contacts.filter(contact => contact.id !== id);
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            }
        }
    },
    created() {
        this.getContacts();
    }
}
</script>

<style scoped>
.contact-list-container {
    padding: 2rem;
    background: #1a1a1a;
    min-height: 100vh;
}

.card {
    background: #2d2d2d;
    border: none;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.1);
}

.card-header {
    background: linear-gradient(45deg, #ff0000, #990000);
    color: white;
    border-radius: 15px 15px 0 0 !important;
    padding: 1.5rem;
    border-bottom: 2px solid #ff0000;
}

.card-header h5 {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.card-body {
    padding: 2rem;
    background: #2d2d2d;
}

.table {
    color: #ffffff;
    margin-bottom: 0;
}

.table thead th {
    background: #3d3d3d;
    background: linear-gradient(45deg, #000000, #333333);
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 2px solid #ff0000;
    padding: 1rem;
    font-size: 0.9rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.table tbody td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #3d3d3d;
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 500;
    background: linear-gradient(45deg, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    /* -webkit-text-fill-color: transparent; */
    /* text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.2); */
}

.table tbody tr {
    transition: all 0.3s ease;
}

.table tbody tr:hover {
    background: #3d3d3d;
    transform: scale(1.01);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.1);
}

.table tbody tr:hover td {
    color: #ffffff;
}

.btn {
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    transition: all 0.3s ease;
}

.btn-primary {
    background: linear-gradient(45deg, #ff0000, #990000);
    color: white;
}

.btn-primary:hover {
    background: linear-gradient(45deg, #990000, #ff0000);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
}

.btn-warning {
    background: #ffc107;
}

.btn-warning:hover {
    background: #ffb300;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
}

.btn-danger {
    background: #dc3545;
}

.btn-danger:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

.btn-group {
    gap: 0.5rem;
}

.btn-group .btn {
    border-radius: 8px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
}

.btn-group .btn i {
    font-size: 1.2rem;
    font-weight: 900;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.btn-warning {
    background: #ffc107;
}

.btn-warning i {
    color: #000000 !important;
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
}

.btn-danger {
    background: #dc3545;
}

.btn-danger i {
    color: #ffffff !important;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.8);
}

.table-responsive {
    border-radius: 8px;
    overflow: hidden;
    background: #2d2d2d;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

/* Add alternating row colors */
.table tbody tr:nth-child(odd) {
    background: linear-gradient(45deg, #1a1a1a, #2d2d2d);
}

.table tbody tr:nth-child(even) {
    background: linear-gradient(45deg, #2d2d2d, #1a1a1a);
}

/* Add hover effect for buttons */
.btn-group .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.dialog-content {
    background: #2d2d2d;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
}

.dialog-header {
    background: linear-gradient(45deg, #ff0000, #990000);
    color: white;
    padding: 1rem;
    border-radius: 15px 15px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dialog-header h5 {
    margin: 0;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
}

.dialog-body {
    padding: 1.5rem;
}

.dialog-footer {
    padding: 1rem;
    border-top: 1px solid #3d3d3d;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    color: #ffffff;
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
}

.form-control {
    background: #3d3d3d;
    border: 1px solid #4d4d4d;
    color: #ffffff;
    width: 100%;
    padding: 0.5rem;
    border-radius: 4px;
}

.form-control:focus {
    background: #3d3d3d;
    border-color: #ff0000;
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.25);
}

.contact-row {
    cursor: pointer;
    transition: all 0.3s ease;
}

.contact-row:hover {
    background: #3d3d3d;
    transform: scale(1.01);
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.1);
}

.btn-group {
    position: relative;
    z-index: 2;
}
</style>

