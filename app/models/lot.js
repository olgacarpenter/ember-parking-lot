import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

    name: DS.attr('string'),
    spaces: DS.hasMany('parking-space'),
    queue: DS.hasMany('vehicle'),
    isFull: Ember.computed('spaces',function() {
        let availableSpaces = this.get('spaces').filter((space) => {
            return space.vehicle == null;
        });
        return availableSpaces.length === 0;
    })

});
