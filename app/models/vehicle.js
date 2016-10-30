import DS from 'ember-data';

export default DS.Model.extend({

    type: DS.attr('number'),  // 1=Motorcyle, 2=Sedan, 3=Truck

});
