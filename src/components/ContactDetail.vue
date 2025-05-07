<template>
    <div class="contact-detail-container">
        <div class="card">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <h5 class="mb-0">Contact Details</h5>
                    <router-link to="/" class="btn btn-secondary">
                        <i class="fas fa-arrow-left me-2"></i>Back to List
                    </router-link>
                </div>
            </div>
            <div class="card-body" v-if="contact">
                <div class="contact-info">
                    <div class="info-group">
                        <label>Name</label>
                        <div class="info-value">{{ contact.name }}</div>
                    </div>
                    <div class="info-group">
                        <label>Email</label>
                        <div class="info-value">{{ contact.email }}</div>
                    </div>
                    <div class="info-group">
                        <label>Designation</label>
                        <div class="info-value">{{ contact.designation }}</div>
                    </div>
                    <div class="info-group">
                        <label>Contact Number</label>
                        <div class="info-value">{{ contact.contact_no }}</div>
                    </div>
                </div>
                <div class="action-buttons">
                    <router-link :to="'/edit-contact/{id}' + contact.id" class="btn btn-warning">
                        <i class="fas fa-edit me-2"></i>Edit 
                    </router-link>
                    <button @click="deleteContact" class="btn btn-danger">
                        <i class="fas fa-trash me-2"></i>Delete Contact
                    </button>
                </div>
            </div>
            <div class="card-body" v-else>
                <div class="loading-spinner">
                    <i class="fas fa-spinner fa-spin"></i> Loading contact details...
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ContactDetail',
    data() {
        return {
            contact: null
        }
    },
    methods: {
        async fetchContact() {
            try {
                const id = this.$route.params.id;
                const response = await axios.get(`http://localhost:8000/api/contacts/${id}`);
                this.contact = response.data;
            } catch (error) {
                console.error('Error fetching contact:', error);
                // You might want to add proper error handling here
            }
        },
        async deleteContact() {
            if (confirm('Are you sure you want to delete this contact?')) {
                try {
                    await axios.delete(`http://localhost:8000/api/contacts/${this.contact.id}`);
                    this.$router.push('/');
                } catch (error) {
                    console.error('Error deleting contact:', error);
                }
            }
        }
    },
    created() {
        this.fetchContact();
    }
}
</script>

<style scoped>
.contact-detail-container {
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

.contact-info {
    background: #3d3d3d;
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 2rem;
}

.info-group {
    margin-bottom: 1.5rem;
}

.info-group:last-child {
    margin-bottom: 0;
}

.info-group label {
    color: #ff0000;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
    display: block;
}

.info-value {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 0.5rem;
    background: #2d2d2d;
    border-radius: 5px;
    border-left: 3px solid #ff0000;
}

.action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.btn {
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    border: none;
    transition: all 0.3s ease;
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
}

.btn-warning {
    background: #ffc107;
    color: #000;
}

.btn-warning:hover {
    background: #ffb300;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
}

.btn-danger {
    background: #dc3545;
    color: white;
}

.btn-danger:hover {
    background: #c82333;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
}

.loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 1.2rem;
    padding: 2rem;
}

.loading-spinner i {
    margin-right: 1rem;
    color: #ff0000;
}
</style>