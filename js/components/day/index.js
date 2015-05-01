var moment = require('../../vendor/moment');

module.exports = {
    'template' : require('./template.html'),

    'replace' : true,

    'data' : function() {
        return {
            'moment'   : null
        };
    },

    'computed' : {
        'selected' : {
            'get' : function() {
                return this === this.$parent.selected;
            },
            'set' : function(value) {
                this.$parent.selected = value ? this : null;
            }
        },

        'today' : function() {
            return this.moment.isSame(moment(), 'day');
        },

        'disabled' : function() {
            return !this.moment.isSame(moment(), 'month');
        },

        'events' : function() {
            return this.$root.events.filter(function(event) {
                return this.moment.isSame(event.moment, 'day');
            }, this);
        }
    },

    'compiled' : function() {
        if(this.today) {
            this.selected = true;
        }
    }
};