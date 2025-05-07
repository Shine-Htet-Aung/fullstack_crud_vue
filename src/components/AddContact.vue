<template>
    <div class="add-contact-container">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Add New Contact</h5>
            </div>
            <div class="card-body">
                <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="fas fa-check-circle me-2"></i>
                    {{ successMessage }}
                    <button type="button" class="btn-close" @click="successMessage = ''"></button>
                </div>

                <form class="contact-form" @submit.prevent="addContact" novalidate>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="name" class="form-label">Full Name</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-user"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        :class="{'is-invalid': errors.name}"
                                        id="name" 
                                        placeholder="Enter full name"
                                        v-model="contact.name"
                                    >
                                </div>
                                <div class="invalid-feedback" v-if="errors.name">
                                    {{ errors.name }}
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="email" class="form-label">Email Address</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-envelope"></i>
                                    </span>
                                    <input 
                                        type="email" 
                                        class="form-control" 
                                        :class="{'is-invalid': errors.email}"
                                        id="email" 
                                        placeholder="Enter email address"
                                        v-model="contact.email"
                                    >
                                </div>
                                <div class="invalid-feedback" v-if="errors.email">
                                    {{ errors.email }}
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="designation" class="form-label">Designation</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-briefcase"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        :class="{'is-invalid': errors.designation}"
                                        id="designation" 
                                        placeholder="Enter designation"
                                        v-model="contact.designation"
                                    >
                                </div>
                                <div class="invalid-feedback" v-if="errors.designation">
                                    {{ errors.designation }}
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="contact" class="form-label">Contact Number</label>
                                <div class="input-group">
                                    <span class="input-group-text">
                                        <i class="fas fa-phone"></i>
                                    </span>
                                    <input 
                                        type="tel" 
                                        class="form-control" 
                                        :class="{'is-invalid': errors.contact_no}"
                                        id="contact" 
                                        placeholder="Enter contact number"
                                        v-model="contact.contact_no"
                                    >
                                </div>
                                <div class="invalid-feedback" v-if="errors.contact_no">
                                    {{ errors.contact_no }}
                                </div>
                            </div>
                        </div>

                        <div class="col-12 mt-4">
                            <div class="d-flex justify-content-end gap-2">
                                <button type="button" class="btn btn-secondary" @click="goBack">
                                    <i class="fas fa-times me-2"></i>Cancel
                                </button>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fas fa-save me-2"></i>Save Contact
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AddContact',
    data(){
        return {
            contact: {},
            errors: {},
            successMessage: ''
        }
    },
    methods: {
        async addContact(){
            this.errors = {};
            let hasErrors = false;

            if(!this.contact.name){
                this.errors.name = "Name is required";
                hasErrors = true;
            }
            if(!this.contact.email){
                this.errors.email = "Email is required";
                hasErrors = true;
            }
            if(!this.contact.designation){
                this.errors.designation = "Designation is required";
                hasErrors = true;
            }
            if(!this.contact.contact_no){
                this.errors.contact_no = "Contact is required";
                hasErrors = true;
            }         

            if(!hasErrors){
                const url = 'http://localhost:8000/api/contacts';
                const data = {
                    name: this.contact.name,
                    email: this.contact.email,
                    designation: this.contact.designation,
                    contact_no: this.contact.contact_no
                };
                await axios.post(url, data).then(() => {
                    this.successMessage = "Contact added successfully!";
                    this.contact = {};
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 1500);
                    
                }).catch(error => {
                    console.error('Error adding contact:', error);
                    if (error.response?.data?.errors) {
                        this.errors = error.response.data.errors;
                    } else {
                        this.errors.general = error.response?.data?.message || 'Failed to add contact';
                    }
                })
            }
        },
        goBack() {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.add-contact-container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    background: #1a1a1a;
    min-height: 100vh;
}

/* Add this new style to make the entire page background gray */
:deep(body) {
    background: #1a1a1a;
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

.form-label {
    color: #ffffff;
    font-weight: 500;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
}

.input-group-text {
    background: #3d3d3d;
    border: 1px solid #4d4d4d;
    color: #ff0000;
}

.form-control {
    background: #3d3d3d;
    border: 1px solid #4d4d4d;
    color: #ffffff;
    padding: 0.75rem;
}

.form-control:focus {
    background: #3d3d3d;
    border-color: #ff0000;
    color: #ffffff;
    box-shadow: 0 0 0 0.25rem rgba(255, 0, 0, 0.25);
}

.form-control::placeholder {
    color: #888888;
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

.btn-secondary {
    background: #3d3d3d;
    color: #ffffff;
}

.btn-secondary:hover {
    background: #4d4d4d;
    transform: translateY(-2px);
}

.alert {
    border: none;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.alert-success {
    background: linear-gradient(45deg, #28a745, #1e7e34);
    color: white;
}

.alert-danger {
    background: linear-gradient(45deg, #dc3545, #bd2130);
    color: white;
}

.invalid-feedback {
    color: #ff6b6b;
    font-size: 0.875rem;
    margin-top: 0.25rem;
}

.form-control.is-invalid {
    border-color: #ff6b6b;
    background: #3d3d3d;
}

.form-control.is-invalid:focus {
    box-shadow: 0 0 0 0.25rem rgba(255, 107, 107, 0.25);
}

.input-group:focus-within {
    box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
}

.gap-2 {
    gap: 1rem;
}

.form-group {
    margin-bottom: 1.5rem;
}
</style>
