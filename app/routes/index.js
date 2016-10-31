import Ember from 'ember';

export default Ember.Route.extend({
    lotId: '-KVOL19LxyXfmdnD8W2z',
    lot: null,
    spaces: null,
    spacesBySize: {
        1:[],
        2:[],
        3:[]
    },

    model() {
        return this.get('store').findRecord('lot',this.get('lotId'));
    },

    afterModel(lot) {
        this.set('lot',lot);
        lot.get('spaces').then((spaces)=>{
            this.set('spaces',spaces);
            this.get('spaces').forEach(space => {
                this.get('spacesBySize')[space.get('size')].pushObject(space);
            });
        });
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

    getValidSpaces(vehicleType) {
        let spaces = this.get('spaces');
        let availableSpaces = spaces.filter((space) => {
            return !space.get('occupied') && space.get('size') >= vehicleType;
        });
        return availableSpaces;
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
        },

        addVehicleToLot(vehicleType) {
            let store = this.get('store');
            let newVehicle = store.createRecord('vehicle', {type:vehicleType});
            let spaces = this.getValidSpaces(vehicleType);

            
            if(spaces.length > 0) { // Park the car
                let theSpace = spaces.objectAt(0);
                theSpace.set('vehicle',newVehicle);
                theSpace.set('occupied',true);
                newVehicle.save().then(()=>{
                    theSpace.save();
                });
            } else {  // Add to queue
                console.log('inserting into queue');
                let lot = this.get('lot');
                lot.get('queue').addObject(newVehicle);
                newVehicle.save().then(()=>{
                    lot.save();
                });
            }
        },

        removeVehicleFromLot(space) {
            let lot = this.get('lot');
            lot.get('queue').then((queue)=>{
                // See if the next vehicle in queue would fit in this space
                if(queue.length > 0 && queue.objectAt(0).get('type') <= space.get('size')) {
                    space.set('vehicle',queue.objectAt(0));
                    queue.removeAt(0);
                } else {
                    space.set('vehicle',null);
                    space.set('occupied',false);
                }
                space.save().then(()=> {
                    lot.save();
                });
            });
        }
    }
});
