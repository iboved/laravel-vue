class Errors {
    constructor() {
        this.errors = {};
    }

    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    record(errors) {
        this.errors = errors;
    }

    clear(field) {
        delete this.errors[field];
    }
}

new Vue({
    el: '#app',
    data: {
        skills: [],
        name: '',
        description: '',
        errors: new Errors()
    },
    methods: {
        onSubmit() {
            axios.post('/projects', this.$data)
                .then(this.onSuccess)
                .catch(error => this.errors.record(error.response.data.errors));
        },
        onSuccess(response) {
            alert(response.data.message);

            this.name = '';
            this.description = '';
        }
    },
    mounted() {
        axios.get('/skills').then(response => this.skills = response.data);
    }
});
