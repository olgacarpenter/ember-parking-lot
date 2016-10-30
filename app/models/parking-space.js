import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({

    lot: DS.belongsTo('lot'),
    size: DS.attr('number'), // 1=small, 2=medium, 3=large
    vehicle: DS.belongsTo('vehicle'),
    isEmpty: Ember.computed.empty('vehicle')

});
