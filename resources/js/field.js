Nova.booting((Vue, router, store) => {
    Vue.component('index-nova-idnumber-field', require('./components/IndexField'))
    Vue.component('detail-nova-idnumber-field', require('./components/DetailField'))
    Vue.component('form-nova-idnumber-field', require('./components/FormField'))
})
