const Handlrbars = require('handlebars')

module.exports = {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
            default: 'fa-solid fa-sort',
            asc: 'fa-solid fa-sort-up',
            desc: 'fa-solid fa-sort-down'
        };

        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        }
        const icon = icons[sortType];
        const type = types[sortType];

        const href = Handlrbars.escapeExpression(`?_sort&column=${field}&type=${type}`)

        const output = `<a class="ps-1" href="${href}">
                    <i class="${icon}"></i>
                </a>`;
        return new Handlrbars.SafeString(output);
    }
};