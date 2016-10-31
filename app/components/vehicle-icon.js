import Ember from 'ember';

export default Ember.Component.extend({
    vehicleIcons: {
        1: 'motorcycle',
        2: 'car',
        3: 'truck'
    },
    icon: Ember.computed('vehicleType','vehicleIcons',function(){
        return this.get('vehicleIcons')[this.get('vehicleType')];
    })
});
