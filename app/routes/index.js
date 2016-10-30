import Ember from 'ember';

export default Ember.Route.extend({
    lot: null,
    message: '',

    model() {
        let store = this.get('store');
        let lot = store.findRecord('lot','-KVLvNW-wh1lgIdL89m7');
        // let spaces = store.findAll('parking-space').find()
        // console.log(lot.id);

        return lot;
    },

    addSpacesBySize(lot,size,count) {
        let store = this.get('store');
        let tmpSpace;
        for(let i = 0; i < count; i++) {
            tmpSpace = store.createRecord('parking-space',{
                lot,
                size
            });
            lot.get('spaces').addObject(tmpSpace);
            tmpSpace.save().then(()=> {
                lot.save();
            });
        }
    },

    actions: {
        addNewLot(name,numberSmSpaces,numberMdSpaces,numberLgSpaces) {

            let store = this.get('store'); 
            //Create new lot
            let newLot = store.createRecord('lot',{
                name
            });
            newLot.save().then(() => {
                //Create spaces
                this.addSpacesBySize(newLot,1,numberSmSpaces);
                this.addSpacesBySize(newLot,2,numberMdSpaces);
                this.addSpacesBySize(newLot,3,numberLgSpaces);                
            });
        }
    }
});
