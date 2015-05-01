var Vue    = require('./vendor/vue'),
    moment = require('./vendor/moment');

window.Vue = Vue;

window.Calendar = new Vue({
    'el' : 'body',

    'components' : {
        'day'   : require('./components/day'),
        'event' : require('./components/event')
    },

    'data' : function() {
        var start = moment().startOf('month').startOf('week'),
            end   = moment().endOf('month').endOf('week'),
            weeks = [],
            data  = {};

        for(var i = 0; start <= end; i++) {
            data = {
                'moment' : start
            };

            if(i % 7 === 0) {
                weeks.push([]);
            }

            weeks[weeks.length - 1].push(data);

            start = moment(start).add(1, 'day');
        }

        return {
            'time'     : null,
            'days'     : weeks.reduce(function(a, b) { return a.concat(b); }),
            'weeks'    : weeks,
            'events'   : [{
                'moment' : moment().add('5', 'minutes'),
                'description' : 'Today!',
                'edited' : true
            }],
            'selected' : null
        };
    },

    'computed' : {
        'headline' : function() {
            if(!this.selected) {
                return false;
            }

            return this.selected.moment.format('dddd<br />MMMM Do').toUpperCase();
        },

        'schedule' : function() {
            var selected = this.selected;

            if(!selected) {
                return false;
            }

            return this.selected.events.slice(0).sort(function(a, b) {
                return a.moment - b.moment;
            });
        }
    },

    'ready' : function() {
        for(var i in this.days) {
            if(this.days[i].selected) {
                this.selected = this.days[i];
                break;
            }
        }
    },

    'methods' : {
        'select' : function(day) {
            if(day.disabled) {
                return;
            }

            this.selected = day;
        },

        'addEvent' : function() {
            var self = this,
                now  = moment();

            this.events.push({
                'moment' : moment(this.selected.moment)
                    .hour(now.hour())
                    .minute(now.minute())
            });

            Vue.nextTick(function() {
                self.$.events.sort(function(a, b) {
                    return a.created_at - b.created_at;
                }).slice(-1)[0].editDescription();
            });
        }
    }
});