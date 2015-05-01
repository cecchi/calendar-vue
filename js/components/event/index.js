var //Vue    = require('../../vendor/vue'),
    moment = require('../../vendor/moment');

module.exports = {
    'template' : require('./template.html'),

    'replace' : true,

    'data' : function() {
        return {
            'created_at'    : null,
            'edited'        : false,
            'moment'        : null,
            'description'   : 'New event...'
        };
    },

    'computed' : {
        'hours' : {
            'get' : function() {
                return this.moment.format('HH');
            },

            'set' : function(hours) {
                console.log('Setting hours', Math.min(hours, 23));
                var updated = moment(this.moment.hours(Math.min(hours, 23)));
                this.moment = moment();

                setTimeout(function() {
                    this.moment = updated;
                }, 500);
            }
        },

        'minutes' : {
            'get' : function() {
                return this.moment.format('mm');
            },

            'set' : function(minutes) {
                console.log('Setting minutes', Math.min(minutes, 59));
                var updated = moment(this.moment.minutes(Math.min(minutes, 59)));
                this.moment = moment();

                setTimeout(function() {
                    this.moment = updated;
                }, 100);
            }
        }
    },

    'created' : function() {
        this.created_at = moment();
    },

    'compiled' : function() {
        this.descriptionEl = this.$el.querySelector('.description');

        this.$watch('hours', function() {
            console.log('Hours changed: ', arguments);
        }, true);

        this.$watch('minutes', function() {
            console.log('Minutes changed: ', arguments);
        }, true);
    },

    'filters' : {
        'submit' : function(value) {
            return function(e) {
                if(e.keyCode === 13 || e.keyCode === 9) {
                    value(arguments);
                }
            };
        },
    },

    'methods' : {
        'blur' : function(e) {
            e.preventDefault();
            e.target.blur();
        },

        'isNumericKey' : function(e) {
            return (
                (e.keyCode >= 48 && e.keyCode <= 57) ||
                (e.keyCode >= 96 && e.keyCode <= 105)
            );
        },

        'isHelperKey' : function(e) {
            return (
                (e.keyCode >= 37 && e.keyCode <= 40) ||
                e.keyCode === 8 ||
                e.altKey ||
                e.metaKey ||
                e.shiftKey
            );
        },

        'validateTime' : function(e) {
            var numeric = this.isNumericKey(e),
                helper  = this.isHelperKey(e),
                selection = window.getSelection().toString();

            if(!numeric && !helper) {
                e.preventDefault();
            }

            if(numeric && !selection.length && e.target.textContent.trim().length >= 2) {
                e.preventDefault();
            }
        },

        'setHours' : function() {
            var input = this.$$.hours.textContent.replace(/[^\d]/g, '').trim().slice(0, 2);

            this.hours = input;
        },

        'setMinutes' : function() {
            var input = this.$$.minutes.textContent.replace(/[^\d]/g, '').trim().slice(0, 2);

            this.$set('minutes', input);
        },

        'moveCaret' : function() {
            var selection = window.getSelection();

            if(selection.anchorOffset === 0) {
                selection.selectAllChildren(selection.anchorNode);
                selection.collapseToEnd();
            }
        },

        'clearDescriptionPlaceholder' : function() {
            if(!this.edited) {
                this.descriptionEl.textContent = '';
                this.edited = true;
            }
        },

        'editDescription' : function() {
            this.descriptionEl.focus();
        },

        'setDescription' : function(e) {
            this.description = e.target.textContent.trim();
        }
    }
};