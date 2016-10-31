import DS from 'ember-data';

export default DS.Model.extend({

    lot: DS.belongsTo('lot'),
    size: DS.attr('number'), // 1=small, 2=medium, 3=large
    vehicle: DS.belongsTo('vehicle'),
    occupied: DS.attr('boolean', { defaultValue: false })

});
