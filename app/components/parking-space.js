import Ember from 'ember';

export default Ember.Component.extend({

    
    vehicleSizes: {
        1: 'small',
        2: 'medium',
        3: 'large'
    },
    sizeStr: Ember.computed('vehicleSizes',function() {
        return this.get('vehicleSizes')[this.get('space.size')];
    })
});
